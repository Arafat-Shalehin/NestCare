"use server";

import { collections, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function getTimelineEvents(bookingId) {
    if (!bookingId) return [];
    const timelineCollection = await dbConnect(collections.TIMELINE);

    const events = await timelineCollection
        .find({ bookingId: new ObjectId(bookingId) })
        .sort({ timestamp: -1 }) // Latest first
        .toArray();

    return events.map(e => ({
        ...e,
        _id: e._id.toString(),
        bookingId: e.bookingId.toString(),
        timestamp: e.timestamp.toISOString(),
    }));
}

export async function addTimelineEvent(bookingId, eventData) {
    if (!bookingId) throw new Error("Booking ID is required");
    const timelineCollection = await dbConnect(collections.TIMELINE);

    const newEvent = {
        bookingId: new ObjectId(bookingId),
        type: eventData.type || "update", // 'arrival', 'feeding', 'medication', 'activity', 'departure'
        title: eventData.title,
        note: eventData.note || "",
        timestamp: new Date(),
        addedBy: eventData.addedBy || "Caregiver",
    };

    const result = await timelineCollection.insertOne(newEvent);

    return {
        ...newEvent,
        _id: result.insertedId.toString(),
        bookingId: bookingId,
        timestamp: newEvent.timestamp.toISOString(),
    };
}

// Helper to seed initial events if none exist (for demo purposes)
export async function seedTimelineEvents(bookingId) {
    const events = await getTimelineEvents(bookingId);
    if (events.length > 0) return events;

    const initialEvents = [
        { type: "arrival", title: "Caregiver Arrived", note: "Arrived on time and greeted the family." },
        { type: "activity", title: "Morning Walk", note: "30-minute walk in the garden." },
        { type: "feeding", title: "Lunch Served", note: "Healthy meal as per dietary guidelines." },
    ];

    for (const event of initialEvents) {
        await addTimelineEvent(bookingId, event);
    }

    return getTimelineEvents(bookingId);
}
