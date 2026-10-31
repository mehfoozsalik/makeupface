import type { MakeupAnalysisRequest } from "@/types/ai";
import type { FaceAnalysisResult } from "@/types/face-analysis";
import type { UserPreferences } from "@/types/makeup";

function collectUncertain(analysis: FaceAnalysisResult): string[] {
  const fields: string[] = [];
  if (analysis.faceShape.uncertain) fields.push("faceShape");
  if (analysis.eyeShape.uncertain) fields.push("eyeShape");
  if (analysis.eyebrowShape.uncertain) fields.push("eyebrowShape");
  if (analysis.lipShape.uncertain) fields.push("lipShape");
  return fields;
}

export function buildMakeupAnalysisRequest(
  analysis: FaceAnalysisResult,
  preferences: UserPreferences
): MakeupAnalysisRequest {
  return {
    faceAnalysis: {
      faceShape: analysis.faceShape.primary,
      eyeShape: analysis.eyeShape.primary,
      eyebrowShape: analysis.eyebrowShape.primary,
      lipShape: analysis.lipShape.primary,
      confidence: {
        faceShape: analysis.faceShape.confidence,
        eyeShape: analysis.eyeShape.confidence,
        eyebrowShape: analysis.eyebrowShape.confidence,
        lipShape: analysis.lipShape.confidence,
      },
      measurements: analysis.measurements,
      uncertainFields: collectUncertain(analysis),
    },
    preferences,
  };
}
