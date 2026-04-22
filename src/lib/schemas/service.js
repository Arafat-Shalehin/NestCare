import { z } from "zod";

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
