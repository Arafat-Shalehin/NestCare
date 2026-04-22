import { z } from "zod";

export const RegisterSchema = z.object({
  nid: z.string().min(10, "National ID must be at least 10 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  contact: z.string().min(10, "Contact number must be at least 10 characters"),
  password: z.string()
    .min(6, "Password must be at least 6 characters long")
    .refine((val) => /[A-Z]/.test(val), "Password must contain at least one uppercase letter")
    .refine((val) => /[a-z]/.test(val), "Password must contain at least one lowercase letter"),
});

export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const UserUpdateSchema = z.object({
  id: z.string().optional(), // Used in admin actions
  role: z.enum(["admin", "user", "caregiver"]),
});
