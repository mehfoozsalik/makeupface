export type FaceShape =
  | "oval"
  | "round"
  | "square"
  | "heart"
  | "diamond"
  | "oblong";

export type EyeShape =
  | "almond"
  | "round"
  | "hooded"
  | "monolid"
  | "upturned"
  | "downturned"
  | "uncertain";

export type EyebrowShape =
  | "straight"
  | "soft_arch"
  | "high_arch"
  | "rounded"
  | "angled"
  | "uncertain";

export type LipShape =
  | "full"
  | "thin"
  | "wide"
  | "heart"
  | "balanced"
  | "uncertain";

export interface LandmarkPoint {
  x: number;
  y: number;
  z: number;
}

export interface FaceMeasurements {
  faceLengthRatio: number;
  foreheadWidthRatio: number;
  cheekboneWidthRatio: number;
  jawWidthRatio: number;
  faceWidthToLength: number;
  eyeWidth: number;
  eyeHeight: number;
  eyeAspectRatio: number;
  eyeAngleDegrees: number;
  eyeSpacing: number;
  browToEyeDistance: number;
  upperLipHeight: number;
  lowerLipHeight: number;
  mouthWidth: number;
  lipRatio: number;
  foreheadToFaceRatio: number;
  cheekToJawRatio: number;
  symmetryScore: number;
}

export interface ClassificationResult<T extends string> {
  primary: T;
  alternatives: T[];
  confidence: number;
  rationale: string;
  uncertain: boolean;
}

export interface PhotoQualityResult {
  ok: boolean;
  faceDetected: boolean;
  faceCount: number;
  faceSizeOk: boolean;
  faceCentered: boolean;
  headRotationOk: boolean;
  landmarksVisible: boolean;
  lightingOk: boolean;
  issues: string[];
}

export interface FaceAnalysisResult {
  faceShape: ClassificationResult<FaceShape>;
  eyeShape: ClassificationResult<EyeShape>;
  eyebrowShape: ClassificationResult<EyebrowShape>;
  lipShape: ClassificationResult<LipShape>;
  measurements: FaceMeasurements;
  quality: PhotoQualityResult;
  analyzedAt: string;
}

export type AnalysisStep =
  | "upload"
  | "validate"
  | "analyze"
  | "preferences"
  | "recommend"
  | "results";
