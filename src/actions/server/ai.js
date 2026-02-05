"use server";

import OpenAI from "openai";

export const getAIRecommendation = async (selections, services) => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error(
      "OPENAI_API_KEY is not defined in environment variables. Please check your .env file."
    );
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const prompt = `
You are a specialized Care Assistant for NestCare. Your goal is to recommend the best care service based on user needs.

User Choices:
- Need: ${selections.need} (Baby/Elderly/Adult)
- Timing: ${selections.timing} (Daytime/Overnight/Short-term)
- Specificity: ${selections.specificity} (General/Newborn/Special Needs/Recovery/Post-surgery)
- Personality Style: ${selections.style} (Quiet/Active/Social)

Available Services Slugs:
${services.map((s) => `- ${s.slug}`).join("\n")}

Rules:
- Pick exactly ONE slug from the list above that best matches these 4 user choices.
- Return ONLY the slug in plain text.
- Do NOT include any explanation or extra characters.
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0,
      max_tokens: 20,
    });

    const recommendedSlug = response.choices[0].message.content.trim().toLowerCase();

    // Normalize and validate
    const matchedService = services.find((s) => s.slug === recommendedSlug);

    if (!matchedService) {
      console.warn("AI returned invalid slug:", recommendedSlug);
      // Fallback handled in client component
      throw new Error("Invalid recommendation from AI");
    }

    return JSON.parse(JSON.stringify(matchedService));
  } catch (error) {
    console.error("OpenAI API Error:", {
      message: error.message,
      status: error.status,
      code: error.code
    });
    throw new Error(error.message || "Failed to get AI recommendation");
  }
};
