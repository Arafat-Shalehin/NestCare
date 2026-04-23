import { NextResponse } from "next/server";
import { createBooking } from "@/actions/server/bookings";

/**
 * POST /api/bookings
 * Hardened API entry point using shared atomic logic
 */
export async function POST(req) {
  try {
    const body = await req.json();

    // Delegate to the hardened Server Action logic
    const result = await createBooking(body);

    if (result.success) {
      return NextResponse.json({ 
        id: result.bookingId, 
        message: result.message 
      }, { status: 201 });
    } else {
      return NextResponse.json({ 
        error: result.errors?.form?.[0] || "Validation failed", 
        details: result.errors 
      }, { status: 400 });
    }
  } catch (error) {
    console.error("POST /api/bookings error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}

/**
 * GET /api/bookings
 * Existing logic preserved (Audit for security recommended)
 */
import { collections, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function GET(req) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const userIdParam = searchParams.get("userId");

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
