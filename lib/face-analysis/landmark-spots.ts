import type { LandmarkPoint, LandmarkSpot } from "@/types/face-analysis";
import { LM, getPoint } from "./landmarks";

const SPOT_DEFS: Array<{ id: string; label: string; index: number }> = [
  { id: "forehead", label: "Forehead", index: LM.foreheadTop },
  { id: "left-brow", label: "Left brow", index: LM.leftBrowArch },
  { id: "right-brow", label: "Right brow", index: LM.rightBrowArch },
  { id: "left-eye", label: "Left eye", index: LM.leftEyeOuter },
  { id: "right-eye", label: "Right eye", index: LM.rightEyeOuter },
  { id: "nose", label: "Nose", index: LM.noseTip },
  { id: "left-cheek", label: "Left cheek", index: LM.leftCheek },
  { id: "right-cheek", label: "Right cheek", index: LM.rightCheek },
  { id: "cupid", label: "Cupid's bow", index: LM.cupidBowCenter },
  { id: "mouth-left", label: "Lip left", index: LM.mouthLeft },
  { id: "mouth-right", label: "Lip right", index: LM.mouthRight },
  { id: "chin", label: "Chin", index: LM.chin },
];

export function buildLandmarkSpots(landmarks: LandmarkPoint[]): LandmarkSpot[] {
  const spots: LandmarkSpot[] = [];
  for (const def of SPOT_DEFS) {
    try {
      const p = getPoint(landmarks, def.index);
      spots.push({
        id: def.id,
        label: def.label,
        x: Math.min(1, Math.max(0, p.x)),
        y: Math.min(1, Math.max(0, p.y)),
      });
    } catch {
      /* skip missing */
    }
  }
  return spots;
}
