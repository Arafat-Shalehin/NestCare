import logger from "@/lib/logger";
import { safeAction } from "@/lib/safeAction";
import { ApiError } from "@/lib/errors";

/**
 * Create a new booking (Hardened with Transactions, Conflict Detection & Idempotency)
 */
export const createBooking = safeAction(async (data) => {
  const client = await getMongoClient();
  const session = client.startSession();

  try {
    // 1) Auth & Validation
    const authSession = await getServerSession(authOptions);
    if (!authSession || !authSession.user) {
      throw ApiError.unauthorized("Please log in to book care.");
    }

    const validation = BookingPayloadSchema.safeParse(data);
    if (!validation.success) {
      throw ApiError.badRequest("Invalid booking data", "VALIDATION_ERROR", validation.error.flatten().fieldErrors);
    }

    const { serviceSlug, caregiverId, startTime, durationUnit, durationValue, idempotencyKey } = validation.data;

    // 2) Idempotency Check
    const bookingsCollection = await dbConnect(collections.BOOKINGS);
    const existing = await bookingsCollection.findOne({ idempotencyKey });
    if (existing) {
      logger.info("Booking idempotency hit", { idempotencyKey, bookingId: existing._id });
      return { 
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
      const service = await getServiceBySlug(serviceSlug);
      if (!service) throw ApiError.notFound("Service not found", "SERVICE_UNAVAILABLE");

      const conflict = await bookingsCollection.findOne({
        caregiverId: new ObjectId(caregiverId),
        status: { $in: ["PENDING", "CONFIRMED"] },
        $or: [{ startTime: { $lt: end }, endTime: { $gt: start } }]
      }, { session });

      if (conflict) {
        throw ApiError.conflict("Caregiver is unavailable for the selected time slot.", "CAREGIVER_BUSY");
      }

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

    if (createdBooking) {
      sendBookingInvoiceEmail({
        to: authSession.user.email,
        userName: authSession.user.name || "Valued Member",
        booking: { ...createdBooking, _id: createdBooking._id.toString() },
        service: await getServiceBySlug(serviceSlug),
      }).catch(err => logger.error("Invoice email failed", { error: err.message }));

      logger.info("Booking created successfully", { bookingId: createdBooking._id, userId: authSession.user.id });
      return { 
        bookingId: createdBooking._id.toString(),
        message: "Booking confirmed safely!" 
      };
    }

    throw new ApiError("Failed to finalize booking", "CREATE_FAILURE", 500);
  } finally {
    await session.endSession();
  }
});

/**
 * Fetch bookings for a specific user
 */
export const getBookingsForUser = safeAction(async (userId = null) => {
  if (userId) {
    const validation = IdSchema.safeParse(userId);
    if (!validation.success) {
      throw ApiError.badRequest("Invalid user ID", "INVALID_ID");
    }
  }

  const bookingsCollection = await dbConnect(collections.BOOKINGS);
  const query = userId ? { userId: new ObjectId(userId) } : {};

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
});
