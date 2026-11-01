import type {
  FaceAnalysisResult,
  LandmarkPoint,
} from "@/types/face-analysis";
import { classifyFaceShape } from "./classify-face-shape";
import {
  classifyEyeShape,
  classifyEyebrowShape,
  classifyLipShape,
} from "./classify-features";
import { buildLandmarkSpots } from "./landmark-spots";
import { computeMeasurements } from "./measurements";
import { assessPhotoQuality } from "./quality";

export function analyzeFaceFromLandmarks(
  landmarks: LandmarkPoint[],
  faceCount: number,
  imageWidth: number,
  imageHeight: number,
  imageData?: ImageData
): FaceAnalysisResult {
  const quality = assessPhotoQuality(
    landmarks,
    faceCount,
    imageWidth,
    imageHeight,
    imageData
  );

  const measurements = computeMeasurements(landmarks);
  const faceShape = classifyFaceShape(measurements);
  const eyeShape = classifyEyeShape(measurements, landmarks);
  const eyebrowShape = classifyEyebrowShape(landmarks);
  const lipShape = classifyLipShape(measurements, landmarks);

  return {
    faceShape,
    eyeShape,
    eyebrowShape,
    lipShape,
    measurements,
    quality,
    analyzedAt: new Date().toISOString(),
    landmarkSpots: buildLandmarkSpots(landmarks),
  };
}
