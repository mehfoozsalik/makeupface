import type { LandmarkPoint } from "@/types/face-analysis";

/** MediaPipe Face Landmarker key indices (478-point model). */
export const LM = {
  foreheadLeft: 21,
  foreheadRight: 251,
  foreheadTop: 10,
  chin: 152,
  leftCheek: 234,
  rightCheek: 454,
  leftJaw: 172,
  rightJaw: 397,
  leftTemple: 54,
  rightTemple: 284,
  leftEyeOuter: 33,
  leftEyeInner: 133,
  leftEyeTop: 159,
  leftEyeBottom: 145,
  rightEyeOuter: 263,
  rightEyeInner: 362,
  rightEyeTop: 386,
  rightEyeBottom: 374,
  leftBrowInner: 55,
  leftBrowOuter: 70,
  leftBrowArch: 105,
  rightBrowInner: 285,
  rightBrowOuter: 300,
  rightBrowArch: 334,
  upperLipTop: 13,
  upperLipBottom: 14,
  lowerLipTop: 14,
  lowerLipBottom: 17,
  mouthLeft: 61,
  mouthRight: 291,
  cupidBowLeft: 37,
  cupidBowRight: 267,
  cupidBowCenter: 0,
  noseTip: 1,
  noseBridge: 6,
  leftIris: 468,
  rightIris: 473,
} as const;

export function dist(
  a: LandmarkPoint,
  b: LandmarkPoint,
  use3d = false
): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  if (!use3d) return Math.hypot(dx, dy);
  const dz = a.z - b.z;
  return Math.hypot(dx, dy, dz);
}

export function midpoint(a: LandmarkPoint, b: LandmarkPoint): LandmarkPoint {
  return {
    x: (a.x + b.x) / 2,
    y: (a.y + b.y) / 2,
    z: (a.z + b.z) / 2,
  };
}

export function angleDegrees(
  a: LandmarkPoint,
  b: LandmarkPoint
): number {
  return (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
}

export function getPoint(
  landmarks: LandmarkPoint[],
  index: number
): LandmarkPoint {
  const p = landmarks[index];
  if (!p) {
    throw new Error(`Missing landmark at index ${index}`);
  }
  return p;
}
