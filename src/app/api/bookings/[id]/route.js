import { NextResponse } from "next/server";
import { collections, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

/**
 * PATCH /api/bookings/[id]
 * Update booking status (Cancel, Confirm, Complete etc.)
 * Body: { status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED" }
 */
export async function PATCH(req, { params }) {
  try {
    const { id } = await params;
    // console.log("Cancel ID: ", id);

    if (!id) {
      return NextResponse.json(
        { error: "Invalid booking id." },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { status } = body;

    const allowedStatuses = ["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"];
    if (!status || !allowedStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status." }, { status: 400 });
    }

    const bookingsCollection = await dbConnect(collections.BOOKINGS);

    let filter;
    if (ObjectId.isValid(id)) {
      filter = { _id: new ObjectId(id) };
    } else {
      // If the _id is stored as string
      filter = { _id: id };
    }

    // TODO: With auth, ensure the current user owns this booking or is admin
    const result = await bookingsCollection.findOneAndUpdate(
      filter,
      {
        $set: {
          status,
          updatedAt: new Date(),
        },
      },
      { returnDocument: "after" }
    );

    const doc = result && result.value !== undefined ? result.value : result;

    if (!doc) {
      return NextResponse.json(
        { error: "Booking not found." },
        { status: 404 }
      );
    }

    const booking = {
      ...doc,
      _id: doc._id.toString(),
      userId: doc.userId ? doc.userId.toString() : null,
      serviceId: doc.serviceId ? doc.serviceId.toString() : null,
      createdAt: doc.createdAt ? doc.createdAt.toISOString() : null,
      updatedAt: doc.updatedAt ? doc.updatedAt.toISOString() : null,
    };

    return NextResponse.json(booking);
  } catch (error) {
    console.error("PATCH /api/bookings/[id] error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
