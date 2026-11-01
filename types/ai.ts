import type { FaceAnalysisResult } from "./face-analysis";
import type { UserPreferences } from "./makeup";

export interface MakeupAnalysisRequest {
  faceAnalysis: {
    faceShape: string;
    eyeShape: string;
    eyebrowShape: string;
    lipShape: string;
    confidence: {
      faceShape: number;
      eyeShape: number;
      eyebrowShape: number;
      lipShape: number;
    };
    measurements: FaceAnalysisResult["measurements"];
    uncertainFields: string[];
  };
  preferences: UserPreferences;
}

export interface ProductRecommendation {
  what: string;
  why: string;
  where: string;
  how: string;
  technique: string;
  commonMistakes: string[];
  tips: string[];
}

export interface RoutineStep {
  step: number;
  title: string;
  instructions: string;
  why: string;
  products: string[];
  tips: string[];
  placement?: string;
}

export interface ShadeSwatch {
  area: string;
  name: string;
  hex: string;
  why: string;
}

export interface MakeupAIResponse {
  summary: {
    title: string;
    description: string;
    faceShape: string;
    overallAdvice: string;
  };
  recommendations: {
    skinPrep: ProductRecommendation;
    primer: ProductRecommendation;
    foundation: ProductRecommendation;
    concealer: ProductRecommendation;
    contour: ProductRecommendation;
    highlight: ProductRecommendation;
    blush: ProductRecommendation;
    eyebrows: ProductRecommendation;
    eyeshadow: ProductRecommendation;
    eyeliner: ProductRecommendation;
    mascara: ProductRecommendation;
    lipLiner: ProductRecommendation;
    lipstick: ProductRecommendation;
    finishing: ProductRecommendation;
  };
  routine: RoutineStep[];
  commonMistakes: string[];
  productChecklist: string[];
  disclaimer: string;
  /** Practical shade families for this face / undertone. */
  shadeGuide?: ShadeSwatch[];
}

export interface SavedReport {
  id: string;
  createdAt: string;
  faceAnalysis: FaceAnalysisResult;
  preferences: UserPreferences;
  recommendations: MakeupAIResponse;
}
