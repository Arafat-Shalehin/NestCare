import { z } from "zod";

/**
 * MongoDB ObjectId Validation
 */
export const IdSchema = z.string()
  .length(24, "Invalid ID format (must be 24 characters)")
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format (hex only)");
