import { z } from "zod";

/**
 * Helper for MongoDB ObjectId strings
 */
export const IdSchema = z.string().length(24, "Invalid ID format (must be 24 characters)").regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format");

/**
 * User Role Validation
 */
export const UserUpdateSchema = z.object({
  id: IdSchema,
  role: z.enum(["admin", "user", "caregiver"], {
    errorMap: () => ({ message: "Role must be one of: admin, user, caregiver" }),
  }),
});

/**
 * Booking Status Validation
 */
export const BookingStatusSchema = z.object({
  id: IdSchema,
  status: z.enum(["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"], {
    errorMap: () => ({ message: "Invalid status value" }),
  }),
});

/**
 * Service Package Validation
 */
export const ServicePackageSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  slug: z.string().regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  pricing: z.object({
    baseRate: z.number().positive("Base rate must be a positive number"),
    unit: z.enum(["hour", "day"]),
    currency: z.string().default("BDT"),
  }),
  image: z.string().url("Must be a valid image URL").optional().or(z.literal("")),
  status: z.enum(["active", "inactive"]).default("active"),
});

/**
 * Booking Creation Validation
 */
export const BookingSchema = z.object({
  customerName: z.string().min(2, "Customer name is required"),
  customerEmail: z.string().email("Invalid email address"),
  customerPhone: z.string().min(10, "Invalid phone number"),
  serviceSlug: z.string().min(1, "Service slug is required"),
  durationUnit: z.enum(["hour", "day"]),
  durationValue: z.number().positive("Duration must be a positive number"),
  division: z.string().min(1, "Division is required"),
  district: z.string().min(1, "District is required"),
  city: z.string().min(1, "City is required"),
  area: z.string().optional(),
  address: z.string().min(5, "Full address is required"),
});
