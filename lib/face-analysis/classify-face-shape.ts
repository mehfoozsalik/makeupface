import type {
  ClassificationResult,
  FaceMeasurements,
  FaceShape,
} from "@/types/face-analysis";

/**
 * Heuristic face-shape classification from geometric ratios.
 *
 * Rules (documented):
 * - Oblong: length/width (faceLengthRatio) ≥ 1.5
 * - Round: length/width ≈ 1.0-1.15 AND jaw ≈ cheek AND soft proportions
 * - Square: length/width ≈ 1.0-1.2 AND jaw ≈ cheek (jaw/cheek ≥ 0.9)
 * - Heart: forehead ≥ cheek AND jaw noticeably narrower (jaw/cheek ≤ 0.78)
 * - Diamond: cheek widest; forehead and jaw both narrower
 * - Oval: length/width ≈ 1.3-1.5, forehead ≈ jaw, cheek slightly wider
 */
export function classifyFaceShape(
  m: FaceMeasurements
): ClassificationResult<FaceShape> {
  const scores: Record<FaceShape, number> = {
    oval: 0,
    round: 0,
    square: 0,
    heart: 0,
    diamond: 0,
    oblong: 0,
  };

  const L = m.faceLengthRatio;
  const forehead = m.foreheadWidthRatio;
  const jaw = m.jawWidthRatio;
  const cheekToJaw = m.cheekToJawRatio;

  // Oblong / long
  if (L >= 1.55) scores.oblong += 0.55;
  else if (L >= 1.45) scores.oblong += 0.35;
  else if (L >= 1.38) scores.oblong += 0.15;

  // Round
  if (L <= 1.18 && L >= 0.95) {
    scores.round += 0.35;
    if (jaw >= 0.88 && forehead >= 0.85) scores.round += 0.3;
    if (cheekToJaw < 1.15) scores.round += 0.15;
  }

  // Square
  if (L <= 1.25 && L >= 0.95) {
    scores.square += 0.25;
    if (jaw >= 0.9) scores.square += 0.35;
    if (Math.abs(forehead - jaw) < 0.1) scores.square += 0.2;
  }

  // Heart
  if (forehead >= jaw + 0.08) scores.heart += 0.3;
  if (jaw <= 0.8) scores.heart += 0.3;
  if (forehead >= 0.9 && jaw <= 0.78) scores.heart += 0.25;

  // Diamond
  if (forehead < 0.92 && jaw < 0.88) scores.diamond += 0.3;
  if (cheekToJaw >= 1.15 && forehead < jaw + 0.05) scores.diamond += 0.25;
  if (forehead <= 0.88 && jaw <= 0.85) scores.diamond += 0.2;

  // Oval (balanced default)
  if (L >= 1.25 && L <= 1.5) scores.oval += 0.35;
  if (Math.abs(forehead - jaw) < 0.12) scores.oval += 0.25;
  if (jaw >= 0.75 && jaw <= 0.92 && forehead >= 0.8 && forehead <= 0.98) {
    scores.oval += 0.25;
  }

  const ranked = (Object.entries(scores) as [FaceShape, number][]).sort(
    (a, b) => b[1] - a[1]
  );
  const [primary, primaryScore] = ranked[0]!;
  const alternatives = ranked
    .slice(1)
    .filter(([, s]) => s >= primaryScore * 0.75 && s > 0.25)
    .map(([shape]) => shape);

  const maxPossible = 0.85;
  const confidence = Math.min(0.95, Math.max(0.35, primaryScore / maxPossible));
  const uncertain = confidence < 0.55 || alternatives.length > 1;

  const rationale = buildRationale(primary, m);

  return {
    primary,
    alternatives,
    confidence: Number(confidence.toFixed(2)),
    rationale,
    uncertain,
  };
}

function buildRationale(shape: FaceShape, m: FaceMeasurements): string {
  const L = m.faceLengthRatio.toFixed(2);
  const f = m.foreheadWidthRatio.toFixed(2);
  const j = m.jawWidthRatio.toFixed(2);
  switch (shape) {
    case "oval":
      return `Your proportions look balanced (length/cheek ${L}; forehead ${f}; jaw ${j}), which usually reads as oval.`;
    case "round":
      return `Length and width sit close together (ratio ${L}) with a softer jaw (${j}), which often reads as round.`;
    case "square":
      return `Forehead (${f}) and jaw (${j}) are similar in width with moderate length (${L}), which can read as square.`;
    case "heart":
      return `Forehead (${f}) is wider than jaw (${j}), tapering toward the chin, which fits a heart-shaped read.`;
    case "diamond":
      return `Cheekbones look widest next to forehead (${f}) and jaw (${j}), which fits a diamond-shaped read.`;
    case "oblong":
      return `Face length runs longer than width (ratio ${L}), which fits oblong or long face descriptions.`;
  }
}
