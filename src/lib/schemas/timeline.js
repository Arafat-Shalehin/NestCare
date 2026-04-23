import { z } from "zod";
import { IdSchema } from "./common.js";


export const TimelineEventSchema = z.object({
  bookingId: IdSchema.optional(), // Usually passed in URL or as separate arg
  type: z.enum(["arrival", "feeding", "medication", "activity", "departure", "update", "other"]),
  title: z.string().min(3, "Title must be at least 3 characters"),
  note: z.string().optional().default(""),
  addedBy: z.string().optional().default("Caregiver"),
});
