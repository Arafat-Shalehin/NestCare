import logger from "@/lib/logger";

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
      logger.warn("Booking unauthorized attempt");
      return { success: false, errors: { auth: ["Unauthorized: Please log in to book care."] } };
    }

    const validation = BookingPayloadSchema.safeParse(data);
    if (!validation.success) {
      logger.warn("Booking validation failed", { errors: validation.error.flatten().fieldErrors });
      return { success: false, errors: validation.error.flatten().fieldErrors };
    }

    const { serviceSlug, caregiverId, startTime, durationUnit, durationValue, idempotencyKey } = validation.data;

    // 2) Idempotency Check (Fast check)
    const bookingsCollection = await dbConnect(collections.BOOKINGS);
    const existing = await bookingsCollection.findOne({ idempotencyKey });
    if (existing) {
      logger.info("Booking idempotency hit", { idempotencyKey, bookingId: existing._id });
      return { 
        success: true, 
        bookingId: existing._id.toString(), 
        message: "Duplicate request handled (Idempotent)." 
      };
    }
...
    // 5) Standardize Response & Trigger Async Notification
    if (createdBooking) {
      logger.info("Booking created successfully", { bookingId: createdBooking._id, userId: authSession.user.id });
...
  } catch (error) {
    logger.error("Atomic Booking Failed", { error: error.message, userId: data.userId });
    const userFriendlyMessage = error.message === "CAREGIVER_BUSY" 
...
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
      if (!validation.success) {
        logger.warn("Invalid userId provided to getBookingsForUser", { userId });
        return [];
      }
    }
...
  } catch (error) {
    logger.error("getBookingsForUser error", { error: error.message, userId });
    return [];
  }
}

