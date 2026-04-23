"use server";

import { collections, dbConnect, getMongoClient } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { getServiceBySlug } from "@/actions/server/services";
import { sendBookingInvoiceEmail } from "@/lib/sendEmail";

// Centralized Schemas
import { BookingPayloadSchema } from "@/lib/schemas/booking";
import { IdSchema } from "@/lib/schemas/common";

/**
 * Utility to normalize rates between different duration units
 */
function computePerUnitRate(baseRate, baseUnit, durationUnit) {
  if (!baseRate) return 0;

  if (durationUnit === "hour") {
    if (baseUnit === "day") return baseRate / 24;
    return baseRate;
  }

  if (durationUnit === "day") {
    if (baseUnit === "hour") return baseRate * 24;
    return baseRate;
  }

  return baseRate;
}

/**
 * Create a new booking (Hardened with Transactions, Conflict Detection & Idempotency)
 */
export async function createBooking(data) {
  const client = await getMongoClient();
  const session = client.startSession();

  try {
    // 1) Auth & Validation (Quick fail before transaction)
    const authSession = await getServerSession(authOptions);
    if (!authSession || !authSession.user) {
      return { success: false, errors: { auth: ["Unauthorized: Please log in to book care."] } };
    }

    const validation = BookingPayloadSchema.safeParse(data);
    if (!validation.success) {
      return { success: false, errors: validation.error.flatten().fieldErrors };
    }

    const { serviceSlug, caregiverId, startTime, durationUnit, durationValue, idempotencyKey } = validation.data;

    // 2) Idempotency Check (Fast check)
    const bookingsCollection = await dbConnect(collections.BOOKINGS);
    const existing = await bookingsCollection.findOne({ idempotencyKey });
    if (existing) {
      return { 
        success: true, 
        bookingId: existing._id.toString(), 
        message: "Duplicate request handled (Idempotent)." 
      };
    }

    // 3) Prep Timing Range
    const start = new Date(startTime);
    const durationMs = durationUnit === "hour" ? durationValue * 3600000 : durationValue * 86400000;
    const end = new Date(start.getTime() + durationMs);

    let createdBooking = null;

    // 4) Execute Atomic Transaction
    await session.withTransaction(async () => {
      // A) Cross-reference Service
      const service = await getServiceBySlug(serviceSlug);
      if (!service) throw new Error("SERVICE_UNAVAILABLE");

      // B) PRE-INSERT CONFLICT DETECTION (Caregiver overlap)
      const conflict = await bookingsCollection.findOne({
        caregiverId: new ObjectId(caregiverId),
        status: { $in: ["PENDING", "CONFIRMED"] },
        $or: [
          { 
            startTime: { $lt: end }, 
            endTime: { $gt: start } 
          }
        ]
      }, { session });

      if (conflict) {
        throw new Error("CAREGIVER_BUSY: The selected caregiver has an overlapping booking.");
      }

      // C) Pricing Calculation
      const pricing = service.pricing || {};
      const perUnitRate = computePerUnitRate(Number(pricing.baseRate || 0), pricing.unit || "hour", durationUnit);
      const totalCost = durationValue * perUnitRate;

      const doc = {
        userId: new ObjectId(authSession.user.id),
        serviceId: new ObjectId(service._id),
        serviceSlug: service.slug,
        serviceName: service.name,
        caregiverId: new ObjectId(caregiverId),
        startTime: start,
        endTime: end,
        durationUnit,
        durationValue,
        perUnitRate,
        totalCost,
        currency: pricing.currency || "BDT",
        location: {
          division: validation.data.division,
          district: validation.data.district,
          city: validation.data.city,
          area: validation.data.area || "",
          address: validation.data.address,
        },
        customer: {
          name: validation.data.customerName,
          email: validation.data.customerEmail,
          phone: validation.data.customerPhone,
        },
        status: "PENDING",
        idempotencyKey,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await bookingsCollection.insertOne(doc, { session });
      createdBooking = { ...doc, _id: result.insertedId };
    });

    // 5) Standardize Response & Trigger Async Notification
    if (createdBooking) {
      sendBookingInvoiceEmail({
        to: authSession.user.email,
        userName: authSession.user.name || "Valued Member",
        booking: { ...createdBooking, _id: createdBooking._id.toString() },
        service: await getServiceBySlug(serviceSlug),
      }).catch(err => console.error("Email notification deferred failure:", err));

      return { 
        success: true, 
        bookingId: createdBooking._id.toString(),
        message: "Booking confirmed safely!" 
      };
    }

  } catch (error) {
    console.error("Atomic Booking Failed:", error.message);
    const userFriendlyMessage = error.message === "CAREGIVER_BUSY" 
      ? "Caregiver is unavailable for the selected time slot." 
      : "Could not process booking. Please try again.";
    
    return { success: false, errors: { form: [userFriendlyMessage] } };
  } finally {
    await session.endSession();
  }
}

/**
 * Fetch bookings for a specific user
 */
export async function getBookingsForUser(userId = null) {
  try {
    if (userId) {
      const validation = IdSchema.safeParse(userId);
      if (!validation.success) return [];
    }

    const bookingsCollection = await dbConnect(collections.BOOKINGS);

    const query = {};
    if (userId) {
      query.userId = new ObjectId(userId);
    }

    const docs = await bookingsCollection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    return docs.map((b) => ({
      ...b,
      _id: b._id.toString(),
      userId: b.userId ? b.userId.toString() : null,
      serviceId: b.serviceId ? b.serviceId.toString() : null,
      createdAt: b.createdAt ? b.createdAt.toISOString() : null,
      updatedAt: b.updatedAt ? b.updatedAt.toISOString() : null,
    }));
  } catch (error) {
    console.error("getBookingsForUser error:", error);
    return [];
  }
}
