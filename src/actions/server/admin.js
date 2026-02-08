"use server";

import { collections, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

// Security helper: Throws error if not admin
async function ensureAdmin() {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== "admin") {
        throw new Error("Unauthorized: Admin access required");
    }
}

/** 📊 Overview Stats */
export async function getAdminStats() {
    await ensureAdmin();

    const bookingsCollection = await dbConnect(collections.BOOKINGS);
    const usersCollection = await dbConnect(collections.USERS);
    const servicesCollection = await dbConnect(collections.SERVICES);

    const [totalBookings, totalUsers, totalServices, revenueData] = await Promise.all([
        bookingsCollection.countDocuments(),
        usersCollection.countDocuments(),
        servicesCollection.countDocuments(),
        bookingsCollection.aggregate([
            { $match: { status: "COMPLETED" } },
            { $group: { _id: null, total: { $sum: "$totalCost" } } }
        ]).toArray()
    ]);

    const totalRevenue = revenueData[0]?.total || 0;

    return {
        totalBookings,
        totalUsers,
        totalServices,
        totalRevenue,
    };
}

/** 📅 Booking Management */
export async function getAllBookings() {
    await ensureAdmin();
    const bookingsCollection = await dbConnect(collections.BOOKINGS);

    const docs = await bookingsCollection.find({}).sort({ createdAt: -1 }).toArray();

    return docs.map(b => ({
        ...b,
        _id: b._id.toString(),
        userId: b.userId?.toString(),
        createdAt: b.createdAt?.toISOString(),
    }));
}

export async function updateBookingStatus(id, status) {
    await ensureAdmin();
    const bookingsCollection = await dbConnect(collections.BOOKINGS);

    await bookingsCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { status, updatedAt: new Date() } }
    );

    return { success: true };
}

/** 🛠 Service Management */
export async function manageService(id, data) {
    await ensureAdmin();
    const servicesCollection = await dbConnect(collections.SERVICES);

    if (id) {
        // Update
        await servicesCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { ...data, updatedAt: new Date() } }
        );
    } else {
        // Create
        await servicesCollection.insertOne({
            ...data,
            status: "active",
            createdAt: new Date(),
            updatedAt: new Date()
        });
    }

    return { success: true };
}

/** 🧑‍🤝‍🧑 User Management */
export async function getAllUsers() {
    await ensureAdmin();
    const usersCollection = await dbConnect(collections.USERS);

    const docs = await usersCollection.find({}).sort({ createdAt: -1 }).toArray();

    return docs.map(u => ({
        ...u,
        _id: u._id.toString(),
        createdAt: u.createdAt?.toISOString(),
    }));
}

export async function updateUserRole(id, role) {
    await ensureAdmin();
    const usersCollection = await dbConnect(collections.USERS);

    await usersCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { role, updatedAt: new Date() } }
    );

    return { success: true };
}
