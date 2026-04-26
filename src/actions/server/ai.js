"use server";

import OpenAI from "openai";
import { AIOutputSchema } from "@/lib/schemas/ai";

/**
 * Utility to wait for exponential backoff
 */
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Deterministic Fallback Matcher (Keyword Heuristics)
 * Used when AI fails all retry attempts or API is down.
 */
function deterministicHeuristicMatch(selections, services) {
  const need = (selections.need || "").toLowerCase();
  
  let targetSlug = "sick-care"; // Default general fallback
  
  if (need.includes("baby") || need.includes("infant") || need.includes("child")) {
    targetSlug = "baby-care";
  } else if (need.includes("elderly") || need.includes("senior") || need.includes("grand")) {
    targetSlug = "elderly-care";
  } else if (need.includes("adult") || need.includes("sick") || need.includes("patient")) {
    targetSlug = "sick-care";
  }

  // Ensure the slug actually exists in the available services list
  const exists = services.some(s => s.slug === targetSlug);
  
  return {
    serviceSlug: exists ? targetSlug : (services[0]?.slug || "general-care"),
    confidence: 0.1, // Low confidence signal for heuristic matches
    reason: "Automated match based on primary category selection (AI system fallback)."
  };
}

/**
 * Internal helper to execute OpenAI calls with strict JSON enforcement
 */
async function callOpenAI(openai, selections, services, attempt = 1) {
  const systemPrompt = `You are a specialized Care Assistant for NestCare.
  You MUST return ONLY a strictly valid JSON object matching the requested schema.
  DO NOT include any conversational text, markdown formatting, or explanations.
  Choose the best serviceSlug ONLY from the provided list.`;

  const userPrompt = `
User Selections:
- Need: ${selections.need}
- Timing: ${selections.timing}
- Specificity: ${selections.specificity}
- Style: ${selections.style}

Available Service Slugs:
${services.map((s) => `- ${s.slug}`).join("\n")}

Required JSON Structure:
{
  "serviceSlug": "string",
  "confidence": number (0-1),
  "reason": "string"
}
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    response_format: { type: "json_object" },
    temperature: 0, // Maximum determinism for consistency
    max_tokens: 250,
  });

  const content = response.choices[0].message.content;
  return JSON.parse(content);
}

import logger from "@/lib/logger";

/**
 * Main AI Match Wizard Logic (Hardened Reliability with Retry & Heuristic Fallback)
 */
export const getAIRecommendation = async (selections, services) => {
  if (!process.env.OPENAI_API_KEY) {
    logger.error("AI_CRITICAL: OPENAI_API_KEY is missing from environment.");
    // Immediate fallback if API key is missing
    const fallback = deterministicHeuristicMatch(selections, services);
    return mapToService(fallback, services);
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const maxAttempts = 2;
  const backoffDelays = [0, 200]; // Delays before each attempt (0ms for 1st, 200ms for 2nd)

  let finalRecommendation = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      // Apply backoff if needed
      if (backoffDelays[attempt - 1] > 0) {
        await sleep(backoffDelays[attempt - 1]);
      }

      const aiResponse = await callOpenAI(openai, selections, services, attempt);
      const validation = AIOutputSchema.safeParse(aiResponse);

      if (validation.success && services.some(s => s.slug === validation.data.serviceSlug)) {
        finalRecommendation = validation.data;
        logger.info("AI match successful", { attempt, serviceSlug: finalRecommendation.serviceSlug });
        break; // Success reached
      } else {
        const errorDetail = !validation.success 
          ? JSON.stringify(validation.error.flatten().fieldErrors)
          : "AI returned invalid slug";
        throw new Error(errorDetail);
      }
    } catch (error) {
      // LOG FAILURE FOR OBSERVABILITY
      logger.warn("AI match attempt failed", {
        attempt,
        reason: error.message,
        selections: { need: selections.need, timing: selections.timing }
      });
      
      if (attempt === maxAttempts) {
        logger.error("AI_MATCH_CRITICAL: Max retries exhausted. Triggering heuristic fallback.", { selections });
        finalRecommendation = deterministicHeuristicMatch(selections, services);
      }
    }
  }


  return mapToService(finalRecommendation, services);
};

/**
 * Helper to map the raw recommendation data back to a full Service object
 */
function mapToService(recommendation, services) {
  const matchedService = services.find(s => s.slug === recommendation.serviceSlug) || services[0];
  
  // Clone to avoid mutation and attach AI metadata
  const result = JSON.parse(JSON.stringify(matchedService));
  
  result._aiMetadata = {
    confidence: recommendation.confidence,
    reason: recommendation.reason,
    processedAt: new Date().toISOString(),
    engine: recommendation.confidence > 0.1 ? "openai-gpt-4o-mini" : "heuristic-fallback-v1"
  };

  return result;
}
