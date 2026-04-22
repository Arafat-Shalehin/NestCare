"use server";

import OpenAI from "openai";
import { AIOutputSchema } from "@/lib/schemas/ai";


/**
 * Internal helper to execute OpenAI calls with structured JSON output
 */
async function callOpenAI(openai, selections, services, isRetry = false) {
  const systemPrompt = isRetry
    ? "You are a specialized Care Assistant for NestCare. You MUST return a strictly valid JSON object. Choose the best serviceSlug only from the provided list. No conversational filler."
    : "You are a specialized Care Assistant for NestCare. Your goal is to recommend the best care service based on user needs. You must respond in valid JSON format.";

  const userPrompt = `
User Choices:
- Need: ${selections.need} (Baby/Elderly/Adult)
- Timing: ${selections.timing} (Daytime/Overnight/Short-term)
- Specificity: ${selections.specificity} (General/Newborn/Special Needs/Recovery/Post-surgery)
- Personality Style: ${selections.style} (Quiet/Active/Social)

Available Services Slugs:
${services.map((s) => `- ${s.slug}`).join("\n")}

Rules:
1. Pick exactly ONE slug from the list.
2. Return a JSON object with: "serviceSlug", "confidence" (0-1), and "reason".

Example Output:
{
  "serviceSlug": "elderly-care",
  "confidence": 0.95,
  "reason": "User needs overnight support for an elderly parent with general care needs."
}
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    response_format: { type: "json_object" },
    temperature: isRetry ? 0 : 0.3, // Low temperature for consistency
  });

  return JSON.parse(response.choices[0].message.content);
}

/**
 * Main AI Match Wizard Logic (Refactored for JSON Mode & Robustness)
 */
export const getAIRecommendation = async (selections, services) => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error(
      "OPENAI_API_KEY is not defined in environment variables."
    );
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    let recommendationData;

    try {
      // --- ATTEMPT 1 ---
      const aiResponse = await callOpenAI(openai, selections, services, false);
      const validation = AIOutputSchema.safeParse(aiResponse);

      if (validation.success && services.some(s => s.slug === validation.data.serviceSlug)) {
        recommendationData = validation.data;
      } else {
        throw new Error("Validation failed or invalid slug returned");
      }
    } catch (firstAttemptError) {
      console.warn("AI Match Attempt 1 failed. Retrying with stricter constraints...");
      
      // --- ATTEMPT 2 (RETRY) ---
      try {
        const aiRetryResponse = await callOpenAI(openai, selections, services, true);
        const retryValidation = AIOutputSchema.safeParse(aiRetryResponse);

        if (retryValidation.success && services.some(s => s.slug === retryValidation.data.serviceSlug)) {
          recommendationData = retryValidation.data;
        } else {
          throw new Error("Retry failed validation");
        }
      } catch (retryError) {
        console.error("AI Match Retry failed. Falling back to safe default.");
        // --- FALLBACK ---
        recommendationData = {
          serviceSlug: services[0]?.slug || "general-care",
          confidence: 0,
          reason: "Default fallback due to AI processing error or invalid selection."
        };
      }
    }

    // Find and return the full service object to maintain compatibility with frontend
    const matchedService = services.find((s) => s.slug === recommendationData.serviceSlug) || services[0];

    // Deep clone to avoid proxy issues and attach AI metadata for transparency
    const result = JSON.parse(JSON.stringify(matchedService));
    result._aiMetadata = {
      confidence: recommendationData.confidence,
      reason: recommendationData.reason,
      processedAt: new Date().toISOString()
    };

    return result;

  } catch (error) {
    console.error("Deterministic AI Match Error:", error);
    // Ultimate failsafe: ensure we still return a valid service if possible
    return JSON.parse(JSON.stringify(services[0]));
  }
};
