import type { FaceMeasurements, LandmarkPoint } from "@/types/face-analysis";
import { LM, dist, getPoint, midpoint } from "./landmarks";

/**
 * Compute normalized facial ratios from MediaPipe landmarks.
 * All width ratios are normalized to cheekbone width = 1.0.
 * Length ratios use face length (forehead top → chin) as denominator where noted.
 */
export function computeMeasurements(
  landmarks: LandmarkPoint[]
): FaceMeasurements {
  const foreheadL = getPoint(landmarks, LM.foreheadLeft);
  const foreheadR = getPoint(landmarks, LM.foreheadRight);
  const foreheadTop = getPoint(landmarks, LM.foreheadTop);
  const chin = getPoint(landmarks, LM.chin);
  const leftCheek = getPoint(landmarks, LM.leftCheek);
  const rightCheek = getPoint(landmarks, LM.rightCheek);
  const leftJaw = getPoint(landmarks, LM.leftJaw);
  const rightJaw = getPoint(landmarks, LM.rightJaw);

  const cheekWidth = dist(leftCheek, rightCheek) || 1;
  const foreheadWidth = dist(foreheadL, foreheadR);
  const jawWidth = dist(leftJaw, rightJaw);
  const faceLength = dist(foreheadTop, chin) || 1;

  const leftEyeOuter = getPoint(landmarks, LM.leftEyeOuter);
  const leftEyeInner = getPoint(landmarks, LM.leftEyeInner);
  const leftEyeTop = getPoint(landmarks, LM.leftEyeTop);
  const leftEyeBottom = getPoint(landmarks, LM.leftEyeBottom);
  const rightEyeOuter = getPoint(landmarks, LM.rightEyeOuter);
  const rightEyeInner = getPoint(landmarks, LM.rightEyeInner);
  const rightEyeTop = getPoint(landmarks, LM.rightEyeTop);
  const rightEyeBottom = getPoint(landmarks, LM.rightEyeBottom);

  const leftEyeW = dist(leftEyeOuter, leftEyeInner);
  const rightEyeW = dist(rightEyeOuter, rightEyeInner);
  const leftEyeH = dist(leftEyeTop, leftEyeBottom);
  const rightEyeH = dist(rightEyeTop, rightEyeBottom);
  const eyeWidth = (leftEyeW + rightEyeW) / 2;
  const eyeHeight = (leftEyeH + rightEyeH) / 2;

  const leftEyeMid = midpoint(leftEyeInner, leftEyeOuter);
  const rightEyeMid = midpoint(rightEyeInner, rightEyeOuter);
  const eyeSpacing = dist(leftEyeInner, rightEyeInner) / (eyeWidth || 1);

  const leftEyeAngle = Math.atan2(
    leftEyeOuter.y - leftEyeInner.y,
    leftEyeOuter.x - leftEyeInner.x
  );
  const rightEyeAngle = Math.atan2(
    rightEyeInner.y - rightEyeOuter.y,
    rightEyeInner.x - rightEyeOuter.x
  );
  const eyeAngleDegrees =
    ((leftEyeAngle + rightEyeAngle) / 2) * (180 / Math.PI);

  const leftBrowArch = getPoint(landmarks, LM.leftBrowArch);
  const browToEyeDistance =
    dist(leftBrowArch, leftEyeTop) / (faceLength || 1);

  const upperLipTop = getPoint(landmarks, LM.upperLipTop);
  const lipMid = getPoint(landmarks, LM.upperLipBottom);
  const lowerLipBottom = getPoint(landmarks, LM.lowerLipBottom);
  const mouthLeft = getPoint(landmarks, LM.mouthLeft);
  const mouthRight = getPoint(landmarks, LM.mouthRight);

  const upperLipHeight = dist(upperLipTop, lipMid);
  const lowerLipHeight = dist(lipMid, lowerLipBottom);
  const mouthWidth = dist(mouthLeft, mouthRight);
  const lipRatio = upperLipHeight / (lowerLipHeight || 0.001);

  // Symmetry: compare left/right distances from vertical midline
  const midX = (leftCheek.x + rightCheek.x) / 2;
  const leftOffsets = [leftCheek, leftJaw, leftEyeOuter].map((p) =>
    Math.abs(p.x - midX)
  );
  const rightOffsets = [rightCheek, rightJaw, rightEyeOuter].map((p) =>
    Math.abs(p.x - midX)
  );
  let symDiff = 0;
  for (let i = 0; i < leftOffsets.length; i++) {
    const l = leftOffsets[i]!;
    const r = rightOffsets[i]!;
    symDiff += Math.abs(l - r) / ((l + r) / 2 || 1);
  }
  const symmetryScore = Math.max(0, Math.min(1, 1 - symDiff / leftOffsets.length));

  return {
    faceLengthRatio: faceLength / cheekWidth,
    foreheadWidthRatio: foreheadWidth / cheekWidth,
    cheekboneWidthRatio: 1,
    jawWidthRatio: jawWidth / cheekWidth,
    faceWidthToLength: cheekWidth / faceLength,
    eyeWidth,
    eyeHeight,
    eyeAspectRatio: eyeWidth / (eyeHeight || 0.001),
    eyeAngleDegrees,
    eyeSpacing,
    browToEyeDistance,
    upperLipHeight,
    lowerLipHeight,
    mouthWidth: mouthWidth / cheekWidth,
    lipRatio,
    foreheadToFaceRatio: foreheadWidth / faceLength,
    cheekToJawRatio: cheekWidth / (jawWidth || 0.001),
    symmetryScore,
  };
}
