import { z } from "zod";
import { IdSchema } from "./common";

export const BookingStatusSchema = z.enum(["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"]);

export const BookingPayloadSchema = z.object({
  customerName: z.string().min(2, "Customer name is required"),
  customerEmail: z.string().email("Invalid email address"),
  customerPhone: z.string().min(10, "Invalid phone number"),
  serviceSlug: z.string().min(1, "Service selection is required"),
  durationUnit: z.enum(["hour", "day"]),
  durationValue: z.number().positive("Duration must be a positive number"),
  division: z.string().min(1, "Division is required"),
  district: z.string().min(1, "District is required"),
  city: z.string().min(1, "City is required"),
  area: z.string().optional(),
  address: z.string().min(5, "Full address is required"),
});

export const AdminBookingStatusUpdateSchema = z.object({
  id: IdSchema,
  status: BookingStatusSchema,
});
