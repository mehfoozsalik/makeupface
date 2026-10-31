import type { LandmarkPoint } from "@/types/face-analysis";
import type {
  ColorSwatch,
  InspirationLookProfile,
} from "@/types/look-try-on";
import { LM, getPoint } from "./landmarks";

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function toHex(r: number, g: number, b: number): string {
  const h = (v: number) =>
    Math.round(clamp(v, 0, 255))
      .toString(16)
      .padStart(2, "0");
  return `#${h(r)}${h(g)}${h(b)}`.toUpperCase();
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      default:
        h = ((r - g) / d + 4) / 6;
    }
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
}

function colorFamily(r: number, g: number, b: number): string {
  const { h, s, l } = rgbToHsl(r, g, b);
  if (s < 12) {
    if (l < 25) return "near-black";
    if (l < 45) return "taupe / brown-grey";
    if (l > 75) return "nude / soft beige";
    return "neutral grey-brown";
  }
  if (h < 20 || h >= 340) return l > 55 ? "soft pink / rose" : "berry / deep rose";
  if (h < 45) return l > 55 ? "peach / coral" : "terracotta / brick";
  if (h < 70) return "warm gold / bronze";
  if (h < 160) return "olive / green-leaning";
  if (h < 260) return "cool / blue-leaning";
  if (h < 310) return "mauve / plum";
  return "pink / fuchsia";
}

function colorLabel(r: number, g: number, b: number): string {
  const family = colorFamily(r, g, b);
  const { l, s } = rgbToHsl(r, g, b);
  const depth = l < 35 ? "deep" : l > 70 ? "light" : "medium";
  const sat = s > 45 ? "vivid" : s > 20 ? "soft" : "muted";
  return `${sat} ${depth} ${family}`;
}

function sampleRegion(
  imageData: ImageData,
  landmarks: LandmarkPoint[],
  indices: number[],
  pad = 0.012
): { r: number; g: number; b: number } | null {
  const pts = indices
    .map((i) => {
      try {
        return getPoint(landmarks, i);
      } catch {
        return null;
      }
    })
    .filter((p): p is LandmarkPoint => !!p);

  if (pts.length < 2) return null;

  const xs = pts.map((p) => p.x);
  const ys = pts.map((p) => p.y);
  const minX = clamp(Math.min(...xs) - pad, 0, 1);
  const maxX = clamp(Math.max(...xs) + pad, 0, 1);
  const minY = clamp(Math.min(...ys) - pad, 0, 1);
  const maxY = clamp(Math.max(...ys) + pad, 0, 1);

  const { width, height, data } = imageData;
  let r = 0;
  let g = 0;
  let b = 0;
  let n = 0;

  const x0 = Math.floor(minX * width);
  const x1 = Math.ceil(maxX * width);
  const y0 = Math.floor(minY * height);
  const y1 = Math.ceil(maxY * height);
  const step = Math.max(1, Math.floor(Math.min(x1 - x0, y1 - y0) / 24));

  for (let y = y0; y < y1; y += step) {
    for (let x = x0; x < x1; x += step) {
      const i = (y * width + x) * 4;
      const pr = data[i]!;
      const pg = data[i + 1]!;
      const pb = data[i + 2]!;
      const a = data[i + 3]!;
      if (a < 200) continue;
      // Skip near-white highlights / extreme shadows for makeup color
      const lum = 0.299 * pr + 0.587 * pg + 0.114 * pb;
      if (lum > 245 || lum < 18) continue;
      r += pr;
      g += pg;
      b += pb;
      n++;
    }
  }

  if (n < 8) return null;
  return { r: r / n, g: g / n, b: b / n };
}

function toSwatch(
  rgb: { r: number; g: number; b: number } | null,
  fallback: { r: number; g: number; b: number }
): ColorSwatch {
  const c = rgb ?? fallback;
  return {
    hex: toHex(c.r, c.g, c.b),
    rgb: { r: Math.round(c.r), g: Math.round(c.g), b: Math.round(c.b) },
    label: colorLabel(c.r, c.g, c.b),
    family: colorFamily(c.r, c.g, c.b),
  };
}

function estimateIntensity(swatches: ColorSwatch[]): InspirationLookProfile["intensity"] {
  const scores = swatches.map((s) => {
    const { s: sat, l } = rgbToHsl(s.rgb.r, s.rgb.g, s.rgb.b);
    return sat * 0.6 + (100 - l) * 0.4;
  });
  const avg = scores.reduce((a, b) => a + b, 0) / (scores.length || 1);
  if (avg > 55) return "bold";
  if (avg > 35) return "medium";
  return "sheer";
}

function estimateFinish(
  highlight: ColorSwatch,
  lip: ColorSwatch
): InspirationLookProfile["finish"] {
  const hl = rgbToHsl(highlight.rgb.r, highlight.rgb.g, highlight.rgb.b);
  const lipH = rgbToHsl(lip.rgb.r, lip.rgb.g, lip.rgb.b);
  if (hl.l > 72 && hl.s < 25) return "dewy";
  if (lipH.s < 20 && lipH.l < 50) return "matte";
  if (hl.l > 60) return "satin";
  return "mixed";
}

function estimateSkinWarmth(
  cheek: ColorSwatch
): InspirationLookProfile["skinWarmth"] {
  const { h, s } = rgbToHsl(cheek.rgb.r, cheek.rgb.g, cheek.rgb.b);
  if (s < 10) return "unclear";
  if (h >= 15 && h <= 55) return "warm";
  if (h >= 320 || h <= 20) return "cool";
  if (h > 55 && h < 80) return "warm";
  return "neutral";
}

/**
 * Sample makeup-relevant colors from an inspiration photo using landmarks.
 * Photos never leave the browser - only this structured profile is sent to AI.
 */
export function sampleInspirationLook(
  imageData: ImageData,
  landmarks: LandmarkPoint[]
): InspirationLookProfile {
  const lipRgb = sampleRegion(
    imageData,
    landmarks,
    [LM.mouthLeft, LM.mouthRight, LM.upperLipTop, LM.lowerLipBottom, LM.cupidBowCenter],
    0.008
  );
  const eyeRgb = sampleRegion(
    imageData,
    landmarks,
    [
      LM.leftEyeOuter,
      LM.leftEyeInner,
      LM.leftEyeTop,
      LM.leftBrowArch,
      LM.rightEyeOuter,
      LM.rightEyeInner,
      LM.rightEyeTop,
      LM.rightBrowArch,
    ],
    0.01
  );
  const blushRgb = sampleRegion(
    imageData,
    landmarks,
    [LM.leftCheek, LM.rightCheek, LM.noseTip],
    0.02
  );
  const linerRgb = sampleRegion(
    imageData,
    landmarks,
    [LM.leftEyeOuter, LM.leftEyeTop, LM.leftEyeBottom, LM.rightEyeOuter, LM.rightEyeTop],
    0.006
  );
  const highlightRgb = sampleRegion(
    imageData,
    landmarks,
    [LM.noseBridge, LM.cupidBowCenter, LM.foreheadTop],
    0.01
  );

  const lip = toSwatch(lipRgb, { r: 180, g: 110, b: 120 });
  const eyeshadow = toSwatch(eyeRgb, { r: 150, g: 130, b: 120 });
  const blush = toSwatch(blushRgb, { r: 210, g: 160, b: 155 });
  const eyeliner = toSwatch(linerRgb, { r: 40, g: 30, b: 28 });
  const highlight = toSwatch(highlightRgb, { r: 230, g: 210, b: 190 });

  const intensity = estimateIntensity([lip, eyeshadow, eyeliner]);
  const finish = estimateFinish(highlight, lip);
  const skinWarmth = estimateSkinWarmth(blush);

  const notes: string[] = [];
  notes.push(`Lip color reads as ${lip.label} (${lip.hex}).`);
  notes.push(`Eye area reads as ${eyeshadow.label} (${eyeshadow.hex}).`);
  notes.push(`Cheek color reads as ${blush.label} (${blush.hex}).`);
  notes.push(`Overall look intensity estimated as ${intensity} with a ${finish} finish.`);
  if (skinWarmth !== "unclear") {
    notes.push(`Visible makeup warmth leans ${skinWarmth}.`);
  }

  return {
    intensity,
    finish,
    lip,
    blush,
    eyeshadow,
    eyeliner,
    highlight,
    skinWarmth,
    notes,
  };
}

export function imageElementToImageData(
  img: HTMLImageElement,
  maxSide = 720
): ImageData {
  const scale = Math.min(1, maxSide / Math.max(img.naturalWidth, img.naturalHeight));
  const w = Math.max(1, Math.round(img.naturalWidth * scale));
  const h = Math.max(1, Math.round(img.naturalHeight * scale));
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Could not read inspiration image pixels.");
  ctx.drawImage(img, 0, 0, w, h);
  return ctx.getImageData(0, 0, w, h);
}
