import type { FaceAnalysisResult } from "./face-analysis";

export interface ColorSwatch {
  hex: string;
  rgb: { r: number; g: number; b: number };
  label: string;
  family: string;
}

export interface InspirationLookProfile {
  intensity: "sheer" | "medium" | "bold";
  finish: "matte" | "satin" | "dewy" | "mixed";
  lip: ColorSwatch;
  blush: ColorSwatch;
  eyeshadow: ColorSwatch;
  eyeliner: ColorSwatch;
  highlight: ColorSwatch;
  skinWarmth: "warm" | "cool" | "neutral" | "unclear";
  notes: string[];
  inspirationFace?: {
    faceShape: string;
    eyeShape: string;
    lipShape: string;
    confidence: number;
  };
}

export interface LookTryOnRequest {
  inspiration: InspirationLookProfile;
  userFace?: {
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
  preferences: {
    experience: "beginner" | "intermediate" | "advanced";
    undertone: "warm" | "cool" | "neutral" | "unsure";
    timeMinutes: number;
  };
}

export interface LookTryOnStep {
  step: number;
  title: string;
  goal: string;
  instructions: string;
  products: string[];
  matchTip: string;
  adaptForYourFeatures: string;
}

export interface LookTryOnResponse {
  summary: {
    title: string;
    lookDescription: string;
    howCloseYouCanGet: string;
    overallAdvice: string;
  };
  colorGuide: {
    lips: string;
    eyes: string;
    cheeks: string;
    base: string;
  };
  steps: LookTryOnStep[];
  productChecklist: string[];
  adaptations: string[];
  commonMistakes: string[];
  disclaimer: string;
}
