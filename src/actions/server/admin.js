import { collections, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { revalidatePath } from "next/cache";
import { safeAction } from "@/lib/safeAction";
import { ApiError } from "@/lib/errors";
import logger from "@/lib/logger";

// Centralized Schemas
import { IdSchema } from "@/lib/schemas/common";
import { AdminBookingStatusUpdateSchema } from "@/lib/schemas/booking";
import { ServicePackageSchema } from "@/lib/schemas/service";
import { UserUpdateSchema } from "@/lib/schemas/auth";

/** 🔒 Security helper: Ensures caller is admin or throws ApiError */
async function ensureAdmin() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw ApiError.unauthorized("Authentication required");
  }
  if (session.user.role !== "admin") {
    logger.warn("Unauthorized admin access attempt", { userId: session.user.id });
    throw ApiError.forbidden("Admin access required");
  }
}

/** 📊 Overview Stats */
export const getAdminStats = safeAction(async () => {
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

  return {
    totalBookings,
    totalUsers,
    totalServices,
    totalRevenue: revenueData[0]?.total || 0,
  };
});

/** 📅 Booking Management */
export const getAllBookings = safeAction(async () => {
  await ensureAdmin();
  const bookingsCollection = await dbConnect(collections.BOOKINGS);

  const docs = await bookingsCollection.find({}).sort({ createdAt: -1 }).toArray();

  return docs.map(b => ({
    ...b,
    _id: b._id.toString(),
    userId: b.userId?.toString(),
    createdAt: b.createdAt?.toISOString(),
  }));
});

export const updateBookingStatus = safeAction(async (bookingId, status) => {
  await ensureAdmin();

  const validation = AdminBookingStatusUpdateSchema.safeParse({ id: bookingId, status });
  if (!validation.success) {
    throw ApiError.badRequest("Invalid status update", "VALIDATION_ERROR", validation.error.flatten().fieldErrors);
  }

  const collection = await dbConnect(collections.BOOKINGS);
  const result = await collection.updateOne(
    { _id: new ObjectId(bookingId) },
    { $set: { status, updatedAt: new Date() } }
  );

  if (result.matchedCount === 0) throw ApiError.notFound("Booking not found");

  revalidatePath("/admin/bookings");
  logger.info("Booking status updated by admin", { bookingId, status });
  return { message: "Status updated successfully" };
});

/** 🛠 Service Management */
export const manageService = safeAction(async (id, data) => {
  await ensureAdmin();

  // 1) Validate Payload (Strict Schema)
  const validation = ServicePackageSchema.safeParse(data);
  if (!validation.success) {
    throw ApiError.badRequest("Invalid service data", "VALIDATION_ERROR", validation.error.flatten().fieldErrors);
  }

  // 2) Validate ID if updating
  if (id) {
    const idValidation = IdSchema.safeParse(id);
    if (!idValidation.success) throw ApiError.badRequest("Invalid Service ID");
  }

  const servicesCollection = await dbConnect(collections.SERVICES);
  const { name, slug, description, pricing, image, status } = validation.data;

  // 3) Strict Field Mapping (Preventing _id or createdAt injection)
  const serviceDoc = {
    name,
    slug,
    description,
    pricing,
    image,
    status,
    updatedAt: new Date()
  };

  if (id) {
    const result = await servicesCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: serviceDoc }
    );
    if (result.matchedCount === 0) throw ApiError.notFound("Service not found");
    logger.info("Service updated by admin", { id, slug });
  } else {
    const result = await servicesCollection.insertOne({
      ...serviceDoc,
      createdAt: new Date()
    });
    logger.info("New service created by admin", { id: result.insertedId, slug });
  }

  revalidatePath("/admin/services");
  return { message: id ? "Service updated" : "Service created" };
});

/** 🧑‍🤝‍🧑 User Management */
export const getAllUsers = safeAction(async () => {
  await ensureAdmin();
  const usersCollection = await dbConnect(collections.USERS);

  const docs = await usersCollection.find({}).sort({ createdAt: -1 }).toArray();

  return docs.map(u => ({
    ...u,
    _id: u._id.toString(),
    createdAt: u.createdAt?.toISOString(),
  }));
});

export const updateUserRole = safeAction(async (id, role) => {
  await ensureAdmin();

  const validation = UserUpdateSchema.safeParse({ id, role });
  if (!validation.success) {
    throw ApiError.badRequest("Invalid role update", "VALIDATION_ERROR", validation.error.flatten().fieldErrors);
  }

  const usersCollection = await dbConnect(collections.USERS);
  const result = await usersCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { role, updatedAt: new Date() } }
  );

  if (result.matchedCount === 0) throw ApiError.notFound("User not found");

  revalidatePath("/admin/users");
  logger.info("User role updated by admin", { targetUserId: id, newRole: role });
  return { message: "Role updated successfully" };
});

