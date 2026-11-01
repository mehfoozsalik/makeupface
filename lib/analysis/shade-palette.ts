import type { ShadeSwatch } from "@/types/ai";
import type { FaceAnalysisResult } from "@/types/face-analysis";
import type { UserPreferences } from "@/types/makeup";

const BY_UNDERTONE: Record<
  string,
  { foundation: string; blush: string; lip: string; eye: string; contour: string }
> = {
  warm: {
    foundation: "#E8C4A8",
    blush: "#E08A6A",
    lip: "#C45C4A",
    eye: "#B8956C",
    contour: "#C4A07A",
  },
  cool: {
    foundation: "#E5C9BE",
    blush: "#D4849A",
    lip: "#B84A6A",
    eye: "#8B7BA8",
    contour: "#A8909A",
  },
  neutral: {
    foundation: "#E6C6B0",
    blush: "#D8928A",
    lip: "#C45E62",
    eye: "#A08B78",
    contour: "#B89A84",
  },
  unsure: {
    foundation: "#E6C6B0",
    blush: "#D8928A",
    lip: "#C45E62",
    eye: "#A08B78",
    contour: "#B89A84",
  },
};

/**
 * Practical shade swatches from undertone + style prefs.
 * Used when the model omits shadeGuide, and as a reliable baseline.
 */
export function buildShadeGuide(
  preferences: UserPreferences,
  analysis: FaceAnalysisResult
): ShadeSwatch[] {
  const tone = preferences.undertone || "unsure";
  const colors = BY_UNDERTONE[tone] ?? BY_UNDERTONE.unsure!;
  const style = preferences.style;
  const face = analysis.faceShape.primary;

  const eyeName =
    style === "soft_glam" || style === "full_glam" || style === "smokey"
      ? "Soft taupe / rose-brown lid"
      : style === "clean_girl" || style === "natural"
        ? "Sheer champagne-taupe wash"
        : "Neutral brown lid family";

  const lipName =
    style === "bold" || style === "full_glam"
      ? "Deeper berry or terracotta lip"
      : "Your-lips-but-better tint";

  return [
    {
      area: "Foundation",
      name:
        tone === "warm"
          ? "Golden / peach undertone base"
          : tone === "cool"
            ? "Rosy / pink undertone base"
            : "Neutral beige base",
      hex: colors.foundation,
      why: `Matched to your ${tone === "unsure" ? "likely neutral" : tone} undertone preference so the jawline blends instead of turning orange or ashy.`,
    },
    {
      area: "Contour",
      name: "Soft sculpt shade",
      hex: colors.contour,
      why: `A muted ${face}-friendly contour that stays cooler or warmer with your undertone without looking muddy.`,
    },
    {
      area: "Blush",
      name: tone === "cool" ? "Dusty rose blush" : "Peach-coral blush",
      hex: colors.blush,
      why: "Sits on the apples or toward the temples depending on your cheek map from analysis.",
    },
    {
      area: "Eyeshadow",
      name: eyeName,
      hex: colors.eye,
      why: `Works with a ${format(analysis.eyeShape.primary)} eye shape and your ${style.replace(/_/g, " ")} style preference.`,
    },
    {
      area: "Lips",
      name: lipName,
      hex: colors.lip,
      why: `Complements a ${format(analysis.lipShape.primary)} lip line without fighting your undertone.`,
    },
  ];
}

function format(value: string) {
  return value.replace(/_/g, " ");
}
