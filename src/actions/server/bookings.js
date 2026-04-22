"use server";

import { collections, dbConnect } from "@/lib/dbConnect";
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
 * Create a new booking (Safe Action)
 */
export async function createBooking(data) {
  try {
    // 1) Auth Check
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return { success: false, errors: { auth: ["Unauthorized: Please log in to book care."] } };
    }

    // 2) Validation
    const validation = BookingPayloadSchema.safeParse(data);
    if (!validation.success) {
      return {
        success: false,
        errors: validation.error.flatten().fieldErrors,
      };
    }

    // 3) Prep Data
    const { serviceSlug, durationUnit, durationValue } = validation.data;
    const service = await getServiceBySlug(serviceSlug);
    if (!service) {
      return { success: false, errors: { service: ["The selected care service is currently unavailable."] } };
    }

    const pricing = service.pricing || {};
    const perUnitRate = computePerUnitRate(
      Number(pricing.baseRate || 0),
      pricing.unit || "hour",
      durationUnit
    );
    const totalCost = durationValue * perUnitRate;

    const bookingsCollection = await dbConnect(collections.BOOKINGS);
    const now = new Date();

    const doc = {
      userId: new ObjectId(session.user.id),
      serviceId: new ObjectId(service._id),
      serviceSlug: service.slug,
      serviceName: service.name,
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
      createdAt: now,
      updatedAt: now,
    };

    // 4) DB Persistence
    const result = await bookingsCollection.insertOne(doc);

    // 5) Async Email (don't block the UI)
    sendBookingInvoiceEmail({
      to: session.user.email,
      userName: session.user.name || "Valued Member",
      booking: { ...doc, _id: result.insertedId.toString() },
      service,
    }).catch((err) => console.error("Failsafe: Email notification failed", err));

    return { 
      success: true, 
      bookingId: result.insertedId.toString(),
      message: "Booking request submitted successfully!" 
    };

  } catch (error) {
    console.error("createBooking action error:", error);
    return { success: false, errors: { form: ["An unexpected error occurred while processing your booking."] } };
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
