import type {
  ClassificationResult,
  EyeShape,
  EyebrowShape,
  FaceMeasurements,
  LandmarkPoint,
  LipShape,
} from "@/types/face-analysis";
import { LM, dist, getPoint } from "./landmarks";

/**
 * Eye shape from landmarks is inherently approximate.
 * Hooded / monolid especially need visual confirmation - landmarks
 * do not reliably encode eyelid crease visibility.
 */
export function classifyEyeShape(
  m: FaceMeasurements,
  landmarks?: LandmarkPoint[]
): ClassificationResult<EyeShape> {
  const scores: Partial<Record<EyeShape, number>> = {
    almond: 0,
    round: 0,
    upturned: 0,
    downturned: 0,
    hooded: 0,
    monolid: 0,
  };

  const ear = m.eyeAspectRatio;
  const angle = m.eyeAngleDegrees;

  if (ear >= 2.8 && ear <= 3.8) scores.almond! += 0.4;
  if (ear < 2.6) scores.round! += 0.45;
  if (ear > 3.8) scores.almond! += 0.2;

  if (angle < -4) scores.downturned! += 0.4;
  else if (angle > 4) scores.upturned! += 0.4;
  else scores.almond! += 0.15;

  // Brow-to-lid proximity can weakly suggest hooding - not definitive
  if (m.browToEyeDistance < 0.045) {
    scores.hooded! += 0.25;
  }

  // Very low eye height relative to width may suggest monolid-like aperture
  if (ear > 4.2) {
    scores.monolid! += 0.2;
  }

  if (landmarks) {
    try {
      const leftTop = getPoint(landmarks, LM.leftEyeTop);
      const leftBottom = getPoint(landmarks, LM.leftEyeBottom);
      const aperture = dist(leftTop, leftBottom);
      if (aperture < m.eyeWidth * 0.22) scores.monolid! += 0.15;
    } catch {
      /* ignore */
    }
  }

  const ranked = (Object.entries(scores) as [EyeShape, number][])
    .filter(([, s]) => s > 0)
    .sort((a, b) => b[1] - a[1]);

  if (ranked.length === 0) {
    return {
      primary: "uncertain",
      alternatives: ["almond", "round"],
      confidence: 0.3,
      rationale:
        "We could not read enough detail from this photo to call your eye shape. Check in a mirror and pick what fits best.",
      uncertain: true,
    };
  }

  const [primary, primaryScore] = ranked[0]!;
  const alternatives = ranked
    .slice(1)
    .filter(([, s]) => s >= primaryScore * 0.7)
    .map(([s]) => s);

  // Cap confidence - eye shape from landmarks alone is limited
  const confidence = Math.min(0.72, Math.max(0.35, primaryScore / 0.7));
  const needsConfirm =
    primary === "hooded" || primary === "monolid" || confidence < 0.55;

  return {
    primary: needsConfirm && confidence < 0.5 ? "uncertain" : primary,
    alternatives: needsConfirm
      ? [primary, ...alternatives].filter((v, i, a) => a.indexOf(v) === i)
      : alternatives,
    confidence: Number(confidence.toFixed(2)),
    rationale: needsConfirm
      ? `Measurements lean ${primary.replace("_", " ")} (aspect ${ear.toFixed(2)}, angle ${angle.toFixed(1)}°), but hooded and monolid lids need a mirror check. Please verify.`
      : `Your eye proportions (aspect ${ear.toFixed(2)}, angle ${angle.toFixed(1)}°) read closest to ${primary.replace("_", " ")}.`,
    uncertain: needsConfirm,
  };
}

export function classifyEyebrowShape(
  landmarks: LandmarkPoint[]
): ClassificationResult<EyebrowShape> {
  try {
    const inner = getPoint(landmarks, LM.leftBrowInner);
    const arch = getPoint(landmarks, LM.leftBrowArch);
    const outer = getPoint(landmarks, LM.leftBrowOuter);

    const midY = (inner.y + outer.y) / 2;
    const archRise = midY - arch.y; // positive = arch above line (note: y increases downward)
    // In normalized coords y increases downward, so higher arch = smaller y
    const rise = (inner.y + outer.y) / 2 - arch.y;
    const span = dist(inner, outer) || 1;
    const riseRatio = rise / span;

    let primary: EyebrowShape = "soft_arch";
    let confidence = 0.55;

    if (Math.abs(riseRatio) < 0.04) {
      primary = "straight";
      confidence = 0.6;
    } else if (riseRatio > 0.12) {
      primary = "high_arch";
      confidence = 0.62;
    } else if (riseRatio > 0.07) {
      primary = "soft_arch";
      confidence = 0.6;
    } else if (riseRatio > 0.04) {
      // Check if peak is closer to outer third (angled) vs center (rounded)
      const archPos = (arch.x - inner.x) / (outer.x - inner.x || 1);
      if (archPos > 0.55) {
        primary = "angled";
        confidence = 0.55;
      } else {
        primary = "rounded";
        confidence = 0.52;
      }
    }

    return {
      primary,
      alternatives: [],
      confidence,
      rationale: `Arch height from your landmarks reads like a ${primary.replace("_", " ")} brow (rise ratio ${riseRatio.toFixed(3)}).`,
      uncertain: confidence < 0.55,
    };
  } catch {
    return {
      primary: "uncertain",
      alternatives: ["soft_arch", "straight"],
      confidence: 0.3,
      rationale: "Brows were hard to measure in this photo. Try pulling hair back and retaking in even light.",
      uncertain: true,
    };
  }
}

export function classifyLipShape(
  m: FaceMeasurements,
  landmarks: LandmarkPoint[]
): ClassificationResult<LipShape> {
  const scores: Partial<Record<LipShape, number>> = {
    full: 0,
    thin: 0,
    wide: 0,
    heart: 0,
    balanced: 0,
  };

  const totalLip = m.upperLipHeight + m.lowerLipHeight;
  const fullness = totalLip / (m.mouthWidth * 0.15 || 0.01);

  if (fullness > 1.3) scores.full! += 0.45;
  else if (fullness < 0.7) scores.thin! += 0.45;
  else scores.balanced! += 0.35;

  if (m.mouthWidth > 0.42) scores.wide! += 0.35;
  if (m.lipRatio > 0.85 && m.lipRatio < 1.2) scores.balanced! += 0.15;

  try {
    const cupidL = getPoint(landmarks, LM.cupidBowLeft);
    const cupidC = getPoint(landmarks, LM.cupidBowCenter);
    const cupidR = getPoint(landmarks, LM.cupidBowRight);
    const bowDepth =
      (cupidL.y + cupidR.y) / 2 - cupidC.y;
    const mouthW = dist(
      getPoint(landmarks, LM.mouthLeft),
      getPoint(landmarks, LM.mouthRight)
    );
    if (bowDepth / (mouthW || 1) > 0.04 && m.upperLipHeight > m.lowerLipHeight * 0.7) {
      scores.heart! += 0.4;
    }
  } catch {
    /* ignore */
  }

  const ranked = (Object.entries(scores) as [LipShape, number][])
    .filter(([, s]) => s > 0)
    .sort((a, b) => b[1] - a[1]);

  const [primary, primaryScore] = ranked[0] ?? ["balanced", 0.4];
  const alternatives = ranked
    .slice(1)
    .filter(([, s]) => s >= primaryScore * 0.7)
    .map(([s]) => s);
  const confidence = Math.min(0.78, Math.max(0.4, primaryScore / 0.65));

  return {
    primary,
    alternatives,
    confidence: Number(confidence.toFixed(2)),
    rationale: `From your lip proportions (upper/lower ${m.lipRatio.toFixed(2)}, mouth width ${m.mouthWidth.toFixed(2)}), we read ${primary.replace("_", " ")} lips.`,
    uncertain: confidence < 0.5,
  };
}
