import type {
  LandmarkPoint,
  PhotoQualityResult,
} from "@/types/face-analysis";
import { LM, dist, getPoint } from "./landmarks";

export function assessPhotoQuality(
  landmarks: LandmarkPoint[] | null,
  faceCount: number,
  imageWidth: number,
  imageHeight: number,
  imageData?: ImageData
): PhotoQualityResult {
  const issues: string[] = [];

  if (faceCount === 0 || !landmarks) {
    return {
      ok: false,
      faceDetected: false,
      faceCount,
      faceSizeOk: false,
      faceCentered: false,
      headRotationOk: false,
      landmarksVisible: false,
      lightingOk: true,
      issues: [
        "No face was detected. Use a clear, front-facing photo with good lighting.",
      ],
    };
  }

  if (faceCount > 1) {
    issues.push(
      `Detected ${faceCount} faces. Please upload a photo with only one face.`
    );
  }

  let faceSizeOk = false;
  let faceCentered = false;
  let headRotationOk = false;
  let landmarksVisible = true;

  try {
    const top = getPoint(landmarks, LM.foreheadTop);
    const chin = getPoint(landmarks, LM.chin);
    const left = getPoint(landmarks, LM.leftCheek);
    const right = getPoint(landmarks, LM.rightCheek);

    const faceH = dist(top, chin);
    const faceW = dist(left, right);
    faceSizeOk = faceH >= 0.25 && faceW >= 0.2;
    if (!faceSizeOk) {
      issues.push(
        "Face appears too small in the frame. Move closer or crop so your face fills more of the photo."
      );
    }

    const centerX = (left.x + right.x) / 2;
    const centerY = (top.y + chin.y) / 2;
    faceCentered =
      centerX > 0.25 && centerX < 0.75 && centerY > 0.2 && centerY < 0.8;
    if (!faceCentered) {
      issues.push(
        "Face is not centered. Reposition so your face is near the middle of the frame."
      );
    }

    // Rough yaw/roll from cheek depth and eye heights
    const leftCheek = getPoint(landmarks, LM.leftCheek);
    const rightCheek = getPoint(landmarks, LM.rightCheek);
    const yawProxy = Math.abs(leftCheek.z - rightCheek.z);
    const leftEye = getPoint(landmarks, LM.leftEyeOuter);
    const rightEye = getPoint(landmarks, LM.rightEyeOuter);
    const rollProxy = Math.abs(leftEye.y - rightEye.y);
    headRotationOk = yawProxy < 0.12 && rollProxy < 0.06;
    if (!headRotationOk) {
      issues.push(
        "Head appears turned or tilted. Face the camera directly with a level head."
      );
    }

    // Landmark visibility: ensure key points are within image bounds
    const keyIdx = [
      LM.foreheadTop,
      LM.chin,
      LM.leftCheek,
      LM.rightCheek,
      LM.leftEyeOuter,
      LM.rightEyeOuter,
      LM.mouthLeft,
      LM.mouthRight,
    ];
    for (const i of keyIdx) {
      const p = getPoint(landmarks, i);
      if (p.x < 0.02 || p.x > 0.98 || p.y < 0.02 || p.y > 0.98) {
        landmarksVisible = false;
      }
    }
    if (!landmarksVisible) {
      issues.push(
        "Some facial features are near the edge or possibly obscured. Keep hair and accessories clear of your face."
      );
    }
  } catch {
    landmarksVisible = false;
    issues.push("Could not read facial landmarks clearly.");
  }

  let lightingOk = true;
  if (imageData) {
    lightingOk = estimateLighting(imageData);
    if (!lightingOk) {
      issues.push(
        "Lighting looks too dark or uneven. Try natural light facing your face, without heavy shadows."
      );
    }
  }

  // Suppress unused dims warning while keeping signature useful for future checks
  void imageWidth;
  void imageHeight;

  const ok =
    faceCount === 1 &&
    faceSizeOk &&
    faceCentered &&
    headRotationOk &&
    landmarksVisible &&
    lightingOk;

  return {
    ok,
    faceDetected: true,
    faceCount,
    faceSizeOk,
    faceCentered,
    headRotationOk,
    landmarksVisible,
    lightingOk,
    issues,
  };
}

function estimateLighting(imageData: ImageData): boolean {
  const { data } = imageData;
  let sum = 0;
  let count = 0;
  // Sample every 32nd pixel for speed
  for (let i = 0; i < data.length; i += 128) {
    const r = data[i]!;
    const g = data[i + 1]!;
    const b = data[i + 2]!;
    sum += 0.299 * r + 0.587 * g + 0.114 * b;
    count++;
  }
  const avg = sum / (count || 1);
  return avg > 40 && avg < 230;
}
