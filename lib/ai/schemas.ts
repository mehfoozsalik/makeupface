import { z } from "zod";

export const productRecommendationSchema = z.object({
  what: z.string(),
  why: z.string(),
  where: z.string(),
  how: z.string(),
  technique: z.string(),
  commonMistakes: z.array(z.string()),
  tips: z.array(z.string()),
});

export const routineStepSchema = z.object({
  step: z.number(),
  title: z.string(),
  instructions: z.string(),
  why: z.string(),
  products: z.array(z.string()),
  tips: z.array(z.string()),
  placement: z.string().optional(),
});

export const makeupAIResponseSchema = z.object({
  summary: z.object({
    title: z.string(),
    description: z.string(),
    faceShape: z.string(),
    overallAdvice: z.string(),
  }),
  recommendations: z.object({
    skinPrep: productRecommendationSchema,
    primer: productRecommendationSchema,
    foundation: productRecommendationSchema,
    concealer: productRecommendationSchema,
    contour: productRecommendationSchema,
    highlight: productRecommendationSchema,
    blush: productRecommendationSchema,
    eyebrows: productRecommendationSchema,
    eyeshadow: productRecommendationSchema,
    eyeliner: productRecommendationSchema,
    mascara: productRecommendationSchema,
    lipLiner: productRecommendationSchema,
    lipstick: productRecommendationSchema,
    finishing: productRecommendationSchema,
  }),
  routine: z.array(routineStepSchema).min(1),
  commonMistakes: z.array(z.string()),
  productChecklist: z.array(z.string()),
  disclaimer: z.string(),
});

export const makeupAnalysisRequestSchema = z.object({
  faceAnalysis: z.object({
    faceShape: z.string(),
    eyeShape: z.string(),
    eyebrowShape: z.string(),
    lipShape: z.string(),
    confidence: z.object({
      faceShape: z.number(),
      eyeShape: z.number(),
      eyebrowShape: z.number(),
      lipShape: z.number(),
    }),
    measurements: z.record(z.string(), z.number()),
    uncertainFields: z.array(z.string()),
  }),
  preferences: z.object({
    experience: z.enum(["beginner", "intermediate", "advanced"]),
    style: z.string(),
    occasion: z.string(),
    additional: z.array(z.string()),
    undertone: z.enum(["warm", "cool", "neutral", "unsure"]),
  }),
});

export type MakeupAIResponseParsed = z.infer<typeof makeupAIResponseSchema>;

const colorSwatchSchema = z.object({
  hex: z.string(),
  rgb: z.object({ r: z.number(), g: z.number(), b: z.number() }),
  label: z.string(),
  family: z.string(),
});

export const lookTryOnRequestSchema = z.object({
  inspiration: z.object({
    intensity: z.enum(["sheer", "medium", "bold"]),
    finish: z.enum(["matte", "satin", "dewy", "mixed"]),
    lip: colorSwatchSchema,
    blush: colorSwatchSchema,
    eyeshadow: colorSwatchSchema,
    eyeliner: colorSwatchSchema,
    highlight: colorSwatchSchema,
    skinWarmth: z.enum(["warm", "cool", "neutral", "unclear"]),
    notes: z.array(z.string()),
    inspirationFace: z
      .object({
        faceShape: z.string(),
        eyeShape: z.string(),
        lipShape: z.string(),
        confidence: z.number(),
      })
      .optional(),
  }),
  userFace: z
    .object({
      faceShape: z.string(),
      eyeShape: z.string(),
      eyebrowShape: z.string(),
      lipShape: z.string(),
      confidence: z.object({
        faceShape: z.number(),
        eyeShape: z.number(),
        eyebrowShape: z.number(),
        lipShape: z.number(),
      }),
      measurements: z.record(z.string(), z.number()),
      uncertainFields: z.array(z.string()),
    })
    .optional(),
  preferences: z.object({
    experience: z.enum(["beginner", "intermediate", "advanced"]),
    undertone: z.enum(["warm", "cool", "neutral", "unsure"]),
    timeMinutes: z.number().min(5).max(120),
  }),
});

export const lookTryOnResponseSchema = z.object({
  summary: z.object({
    title: z.string(),
    lookDescription: z.string(),
    howCloseYouCanGet: z.string(),
    overallAdvice: z.string(),
  }),
  colorGuide: z.object({
    lips: z.string(),
    eyes: z.string(),
    cheeks: z.string(),
    base: z.string(),
  }),
  steps: z
    .array(
      z.object({
        step: z.number(),
        title: z.string(),
        goal: z.string(),
        instructions: z.string(),
        products: z.array(z.string()),
        matchTip: z.string(),
        adaptForYourFeatures: z.string(),
      })
    )
    .min(1),
  productChecklist: z.array(z.string()),
  adaptations: z.array(z.string()),
  commonMistakes: z.array(z.string()),
  disclaimer: z.string(),
});

export type LookTryOnResponseParsed = z.infer<typeof lookTryOnResponseSchema>;
