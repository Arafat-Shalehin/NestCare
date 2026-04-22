import { z } from "zod";

/**
 * AI Recommendation Output Validation (JSON Mode)
 */
export const AIOutputSchema = z.object({
  serviceSlug: z.string().min(1, "Service slug is required"),
  confidence: z.number().min(0).max(1),
  reason: z.string().min(1, "Reasoning is required"),
});
