import { collections, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { safeAction } from "@/lib/safeAction";
import { ApiError } from "@/lib/errors";
import { TimelineEventSchema } from "@/lib/schemas/timeline";
import { IdSchema } from "@/lib/schemas/common";
import logger from "@/lib/logger";

/**
 * Fetch timeline events for a specific booking (Role-Protected)
 */
export const getTimelineEvents = safeAction(async (bookingId) => {
    const session = await getServerSession(authOptions);
    if (!session) throw ApiError.unauthorized();

    const idValidation = IdSchema.safeParse(bookingId);
    if (!idValidation.success) throw ApiError.badRequest("Invalid Booking ID");

    const bId = new ObjectId(bookingId);
    const bookingsCollection = await dbConnect(collections.BOOKINGS);
    
    // 1. Verify Access
    const booking = await bookingsCollection.findOne({ _id: bId });
    if (!booking) throw ApiError.notFound("Booking not found");

    const isOwner = booking.userId.toString() === session.user.id;
    const isCaregiver = booking.caregiverId.toString() === session.user.id;
    const isAdmin = session.user.role === "admin";

    if (!isOwner && !isCaregiver && !isAdmin) {
        throw ApiError.forbidden("You do not have access to this timeline.");
    }

    const timelineCollection = await dbConnect(collections.TIMELINE);
    const events = await timelineCollection
        .find({ bookingId: bId })
        .sort({ timestamp: -1 })
        .toArray();

    return events.map(e => ({
        ...e,
        _id: e._id.toString(),
        bookingId: e.bookingId.toString(),
        timestamp: e.timestamp.toISOString(),
    }));
});

/**
 * Add a new timeline event (Strict Role-Based Validation)
 */
export const addTimelineEvent = safeAction(async (bookingId, eventData) => {
    const session = await getServerSession(authOptions);
    if (!session) throw ApiError.unauthorized();

    const idValidation = IdSchema.safeParse(bookingId);
    if (!idValidation.success) throw ApiError.badRequest("Invalid Booking ID");

    const validation = TimelineEventSchema.safeParse(eventData);
    if (!validation.success) {
        throw ApiError.badRequest("Invalid event data", "VALIDATION_ERROR", validation.error.flatten().fieldErrors);
    }

    const bId = new ObjectId(bookingId);
    const bookingsCollection = await dbConnect(collections.BOOKINGS);
    
    // 1. Verify Role & Assignment
    const booking = await bookingsCollection.findOne({ _id: bId });
    if (!booking) throw ApiError.notFound("Booking not found");

    const isAssignedCaregiver = booking.caregiverId.toString() === session.user.id;
    const isAdmin = session.user.role === "admin";

    if (!isAssignedCaregiver && !isAdmin) {
        throw ApiError.forbidden("Only assigned caregivers can post timeline updates.");
    }

    const timelineCollection = await dbConnect(collections.TIMELINE);
    const newEvent = {
        bookingId: bId,
        type: validation.data.type,
        title: validation.data.title,
        note: validation.data.note,
        timestamp: new Date(),
        addedBy: {
            id: new ObjectId(session.user.id),
            name: session.user.name,
            role: session.user.role
        },
    };

    const result = await timelineCollection.insertOne(newEvent);
    logger.info("Timeline event added", { bookingId, eventId: result.insertedId, addedBy: session.user.id });

    return {
        ...newEvent,
        _id: result.insertedId.toString(),
        bookingId: bookingId,
        timestamp: newEvent.timestamp.toISOString(),
        addedBy: { ...newEvent.addedBy, id: newEvent.addedBy.id.toString() }
    };
});

/**
 * Get aggregated timeline summary for a user's dashboard
 * Groups events by booking using MongoDB Aggregation
 */
export const getTimelineSummary = safeAction(async () => {
    const session = await getServerSession(authOptions);
    if (!session) throw ApiError.unauthorized();

    const timelineCollection = await dbConnect(collections.TIMELINE);
    const userId = new ObjectId(session.user.id);

    // Dynamic match based on role
    const matchStage = session.user.role === "admin" 
        ? {} 
        : session.user.role === "caregiver"
            ? { "booking.caregiverId": userId }
            : { "booking.userId": userId };

    const pipeline = [
        // 1. Lookup Booking info first to filter by access
        {
            $lookup: {
                from: collections.BOOKINGS,
                localField: "bookingId",
                foreignField: "_id",
                as: "booking"
            }
        },
        { $unwind: "$booking" },
        // 2. Role-based filter
        { $match: matchStage },
        // 3. Group by booking
        {
            $group: {
                _id: "$bookingId",
                bookingName: { $first: "$booking.serviceName" },
                customerName: { $first: "$booking.customer.name" },
                lastEvent: { $first: "$title" },
                lastType: { $first: "$type" },
                eventCount: { $sum: 1 },
                latestTimestamp: { $max: "$timestamp" }
            }
        },
        { $sort: { latestTimestamp: -1 } }
    ];

    const summary = await timelineCollection.aggregate(pipeline).toArray();
    return summary.map(s => ({ ...s, _id: s._id.toString() }));
});

