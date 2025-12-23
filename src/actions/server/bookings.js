"use server";

import { collections, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function getBookingsForUser(userId = null) {
  const bookingsCollection = await dbConnect(collections.BOOKINGS);

  const query = {};
  if (userId && userId.length === 24) {
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
}
