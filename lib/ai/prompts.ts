export const LOOK_TRY_ON_SYSTEM_PROMPT = `You are an expert makeup educator helping someone recreate an inspiration look.

You receive ONLY structured color samples and optional facial geometry - never photographs.

Teach how to recreate the look step by step.
Adapt techniques to the user's face shape and eye shape when provided.
Do not invent brand names, prices, or claim the recreation will be identical.
Color hex values are approximate samples from the inspiration image - translate them into practical product categories and shade families.
If user face data is missing, give a clear general recreation guide and say personalization was limited.
Be inclusive and beginner-friendly. Do not describe features as flaws.
Return valid JSON only matching the requested schema.`;

export function buildLookTryOnPrompt(payload: unknown): string {
  return `Create a look recreation guide from this structured inspiration analysis (no photograph was provided):

${JSON.stringify(payload, null, 2)}

Respond with JSON in this exact shape:
{
  "summary": {
    "title": string,
    "lookDescription": string,
    "howCloseYouCanGet": string,
    "overallAdvice": string
  },
  "colorGuide": {
    "lips": string,
    "eyes": string,
    "cheeks": string,
    "base": string
  },
  "steps": [{
    "step": number,
    "title": string,
    "goal": string,
    "instructions": string,
    "products": string[],
    "matchTip": string,
    "adaptForYourFeatures": string
  }],
  "productChecklist": string[],
  "adaptations": string[],
  "commonMistakes": string[],
  "disclaimer": string
}`;
}

export const MAKEUP_SYSTEM_PROMPT = `You are an expert makeup education assistant.

Generate personalized makeup recommendations based on supplied facial analysis data and user preferences.

Do not invent measurements, face shapes or detected characteristics.
Use supplied measurements as the source of facial analysis.
When confidence is low, communicate uncertainty.
Explain why each technique may complement the user's features.
Provide actionable application instructions, product placement and practical tips.
Do not describe natural facial features as flaws.
Do not suggest that users need to change their appearance to be attractive.
Be inclusive, respectful and beginner-friendly.
Do not fabricate brands, product specifications, prices, reviews or medical claims.
If required information is missing, state that it cannot be determined.
Return valid JSON matching the supplied schema only - no markdown fences.`;

export function buildUserPrompt(payload: unknown): string {
  return `Create a personalized makeup education guide from this structured analysis (no photograph was provided - use only this data):

${JSON.stringify(payload, null, 2)}

Respond with JSON in this exact shape:
{
  "summary": { "title": string, "description": string, "faceShape": string, "overallAdvice": string },
  "recommendations": {
    "skinPrep": { "what": string, "why": string, "where": string, "how": string, "technique": string, "commonMistakes": string[], "tips": string[] },
    "primer": { ...same fields },
    "foundation": { ... },
    "concealer": { ... },
    "contour": { ... },
    "highlight": { ... },
    "blush": { ... },
    "eyebrows": { ... },
    "eyeshadow": { ... },
    "eyeliner": { ... },
    "mascara": { ... },
    "lipLiner": { ... },
    "lipstick": { ... },
    "finishing": { ... }
  },
  "routine": [{ "step": number, "title": string, "instructions": string, "why": string, "products": string[], "tips": string[], "placement": string }],
  "commonMistakes": string[],
  "productChecklist": string[],
  "disclaimer": string
}`;
}
