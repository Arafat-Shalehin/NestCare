import { NextResponse } from "next/server";
import { createBooking } from "@/actions/server/bookings";
import logger from "@/lib/logger";
import { safeApi } from "@/lib/safeApi";
import { ApiError } from "@/lib/errors";
import { collections, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

/**
 * POST /api/bookings
 * Hardened API entry point using shared atomic logic
 */
export const POST = safeApi(async (req) => {
  const body = await req.json();
  logger.info("POST /api/bookings entry", { serviceSlug: body.serviceSlug });

  // Delegate to the hardened Server Action logic (already wrapped in safeAction)
  const result = await createBooking(body);

  if (!result.success) {
    // Re-throw to be caught by safeApi for consistent status codes
    throw new ApiError(
      result.error?.message || "Validation failed", 
      result.error?.code || "VALIDATION_ERROR", 
      400, 
      result.error?.details
    );
  }

  return NextResponse.json({ 
    id: result.bookingId, 
    message: result.message 
  }, { status: 201 });
});

/**
 * GET /api/bookings

    const bookingsCollection = await dbConnect(collections.BOOKINGS);
    const query = {};

    if (userIdParam && userIdParam.length === 24) {
      query.userId = new ObjectId(userIdParam);
    }

    const docs = await bookingsCollection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    const bookings = docs.map((b) => ({
      ...b,
      _id: b._id.toString(),
      userId: b.userId ? b.userId.toString() : null,
      serviceId: b.serviceId.toString(),
    }));

    return NextResponse.json(bookings);
  } catch (error) {
    console.error("GET /api/bookings error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
