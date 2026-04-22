"use server";

import { collections, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { revalidatePath } from "next/cache";

// Centralized Schemas
import { IdSchema } from "@/lib/schemas/common";
import { AdminBookingStatusUpdateSchema } from "@/lib/schemas/booking";
import { ServicePackageSchema } from "@/lib/schemas/service";
import { UserUpdateSchema } from "@/lib/schemas/auth";

/** 🔒 Security helper: Throws error if not admin */
async function ensureAdmin() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") {
    throw new Error("Unauthorized: Admin access required");
  }
}

/** 📊 Overview Stats */
export async function getAdminStats() {
  try {
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
  } catch (error) {
    console.error("getAdminStats error:", error);
    throw error;
  }
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

export const updateBookingStatus = async (bookingId, status) => {
  try {
    await ensureAdmin();

    const validation = AdminBookingStatusUpdateSchema.safeParse({ id: bookingId, status });
    if (!validation.success) {
      return { success: false, errors: validation.error.flatten().fieldErrors };
    }

    const collection = await dbConnect(collections.BOOKINGS);
    await collection.updateOne(
      { _id: new ObjectId(bookingId) },
      { $set: { status, updatedAt: new Date() } }
    );

    revalidatePath("/admin/bookings");
    return { success: true };
  } catch (error) {
    console.error("updateBookingStatus error:", error);
    return { success: false, errors: { form: [error.message] } };
  }
};

/** 🛠 Service Management */
export async function manageService(id, data) {
  try {
    await ensureAdmin();

    // 1) Validate Payload
    const validation = ServicePackageSchema.safeParse(data);
    if (!validation.success) {
      return { success: false, errors: validation.error.flatten().fieldErrors };
    }

    // 2) Validate ID if updating
    if (id) {
      const idValidation = IdSchema.safeParse(id);
      if (!idValidation.success) {
        return { success: false, errors: { id: ["Invalid Service ID"] } };
      }
    }

    const servicesCollection = await dbConnect(collections.SERVICES);

    if (id) {
      // Update
      await servicesCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { ...validation.data, updatedAt: new Date() } }
      );
    } else {
      // Create
      await servicesCollection.insertOne({
        ...validation.data,
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    revalidatePath("/admin/services");
    return { success: true };
  } catch (error) {
    console.error("manageService error:", error);
    return { success: false, errors: { form: [error.message] } };
  }
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
  try {
    await ensureAdmin();

    const validation = UserUpdateSchema.safeParse({ id, role });
    if (!validation.success) {
      return { success: false, errors: validation.error.flatten().fieldErrors };
    }

    const usersCollection = await dbConnect(collections.USERS);
    await usersCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { role, updatedAt: new Date() } }
    );

    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    console.error("updateUserRole error:", error);
    return { success: false, errors: { form: [error.message] } };
  }
}
