import { makeupLooks } from "@/data/makeup-styles";

export type Undertone = "warm" | "cool" | "neutral";

export function scoreUndertone(answers: {
  veins: "green" | "blue" | "mixed";
  jewelry: "gold" | "silver" | "both";
  sun: "tan_easy" | "burn" | "both";
}): { undertone: Undertone; explanation: string } {
  let warm = 0;
  let cool = 0;
  if (answers.veins === "green") warm += 2;
  else if (answers.veins === "blue") cool += 2;
  else {
    warm += 1;
    cool += 1;
  }
  if (answers.jewelry === "gold") warm += 2;
  else if (answers.jewelry === "silver") cool += 2;
  else {
    warm += 1;
    cool += 1;
  }
  if (answers.sun === "tan_easy") warm += 2;
  else if (answers.sun === "burn") cool += 2;
  else {
    warm += 1;
    cool += 1;
  }
  let undertone: Undertone = "neutral";
  if (warm >= cool + 2) undertone = "warm";
  else if (cool >= warm + 2) undertone = "cool";

  const explanation =
    undertone === "warm"
      ? "Golden, peach, and olive-leaning foundations and coral or brick lips usually flatter you. Avoid heavy pink-gray bases that look ashy."
      : undertone === "cool"
        ? "Pink, rose, and blue-red lip families and neutral-cool foundations tend to sit more naturally. Avoid orange-heavy bronzers on the face."
        : "You likely suit a wide range. Focus on depth (light, medium, or deep) and swatch on the jaw in daylight.";

  return { undertone, explanation };
}

export function foundationGuidance(
  undertone: Undertone,
  depth: "fair" | "light" | "medium" | "tan" | "deep"
): { families: string[]; swatchTips: string[] } {
  const depthLabel = {
    fair: "fair to light",
    light: "light",
    medium: "medium",
    tan: "medium-deep to tan",
    deep: "deep",
  }[depth];

  const undertoneLabel =
    undertone === "warm"
      ? "warm (golden/olive lean)"
      : undertone === "cool"
        ? "cool (pink/rosy lean)"
        : "neutral (balanced)";

  const families = [
    `Liquid foundation in ${depthLabel} ${undertoneLabel} range`,
    `Skin tint or serum foundation for sheer ${depthLabel} coverage`,
    undertone === "warm"
      ? "Peach or golden correctors for dark circles"
      : undertone === "cool"
        ? "Pink or salmon correctors for dark circles"
        : "Peach-pink correctors as needed",
    "Setting powder one shade lighter than base for under-eye, not whole face",
  ];

  return {
    families,
    swatchTips: [
      "Swatch three shades on the jawline in natural daylight.",
      "Wait 5 to 10 minutes. Oxidation can shift depth.",
      "Match where face meets neck; blend down into décolletage for events.",
    ],
  };
}

export function lipstickFamilies(
  undertone: Undertone,
  occasion: "daily" | "work" | "evening" | "special"
): string[] {
  const base =
    undertone === "warm"
      ? ["Coral", "Warm red", "Brick", "Peach nude", "Terracotta brown"]
      : undertone === "cool"
        ? ["Blue-red", "Berry", "Mauve", "Rose nude", "Plum"]
        : ["Rose", "Soft red", "Nude pink-brown", "MLBB mauve", "Sheer balm tints"];

  if (occasion === "work") return base.map((b) => `${b} (sheer or satin finish)`).slice(0, 4);
  if (occasion === "evening" || occasion === "special")
    return [...base.slice(0, 3), "Deep version of your best family", "Stain or matte for longevity"];
  return base.slice(0, 4);
}

export function scoreMakeupStyle(answers: Record<string, string>): typeof makeupLooks {
  const scores = new Map<string, number>();
  for (const look of makeupLooks) scores.set(look.slug, 0);

  const bump = (slug: string, n: number) => {
    scores.set(slug, (scores.get(slug) ?? 0) + n);
  };

  if (answers.vibe === "minimal") {
    bump("no-makeup-makeup", 3);
    bump("natural-makeup", 3);
    bump("clean-girl-makeup", 2);
    bump("minimalist-makeup", 3);
  }
  if (answers.vibe === "glam") {
    bump("soft-glam", 4);
    bump("full-glam", 3);
    bump("date-night-makeup", 2);
    bump("party-makeup", 2);
  }
  if (answers.vibe === "creative") {
    bump("smokey-eye", 3);
    bump("monochromatic-makeup", 2);
    bump("cat-makeup", 2);
  }
  if (answers.time === "under15") {
    bump("everyday-makeup", 2);
    bump("natural-makeup", 2);
  }
  if (answers.time === "45plus") {
    bump("soft-glam", 2);
    bump("full-glam", 2);
    bump("bridal-makeup", 1);
  }
  if (answers.finish === "dewy") {
    bump("clean-girl-makeup", 2);
    bump("natural-makeup", 1);
    bump("korean-makeup", 2);
  }
  if (answers.finish === "matte") {
    bump("full-glam", 2);
    bump("office-makeup", 1);
  }

  const ranked = [...scores.entries()]
    .sort((a, b) => b[1] - a[1])
    .filter(([, s]) => s > 0)
    .slice(0, 4)
    .map(([slug]) => makeupLooks.find((l) => l.slug === slug)!)
    .filter(Boolean);

  return ranked.length > 0 ? ranked : makeupLooks.filter((l) => l.slug === "everyday-makeup");
}

export interface ChecklistItem {
  id: string;
  category: string;
  label: string;
  essential: boolean;
}

export function buildProductChecklist(
  level: "beginner" | "intermediate" | "advanced",
  focus: "base" | "eyes" | "full"
): ChecklistItem[] {
  const items: ChecklistItem[] = [
    { id: "remover", category: "Skincare", label: "Gentle makeup remover or cleansing balm", essential: true },
    { id: "moisturizer", category: "Skincare", label: "Moisturizer suited to skin type", essential: true },
    { id: "spf", category: "Skincare", label: "SPF (morning)", essential: true },
  ];
  if (focus === "base" || focus === "full") {
    items.push(
      { id: "foundation", category: "Base", label: "Foundation or skin tint matched to undertone", essential: true },
      { id: "concealer", category: "Base", label: "Concealer for spots and under-eye", essential: level !== "advanced" },
      { id: "primer", category: "Base", label: "Primer (optional, for longevity)", essential: false },
      { id: "powder", category: "Base", label: "Setting powder for T-zone", essential: level !== "beginner" }
    );
  }
  if (focus === "eyes" || focus === "full") {
    items.push(
      { id: "brow", category: "Eyes", label: "Brow pencil or gel", essential: true },
      { id: "mascara", category: "Eyes", label: "Mascara", essential: true },
      { id: "shadow", category: "Eyes", label: "Neutral eyeshadow trio or quad", essential: level !== "beginner" },
      { id: "liner", category: "Eyes", label: "Eyeliner pencil or gel", essential: level === "advanced" }
    );
  }
  items.push(
    { id: "blush", category: "Color", label: "Blush (cream or powder)", essential: focus === "full" },
    { id: "lip", category: "Lips", label: "Lipstick, balm, or gloss", essential: true },
    { id: "tools", category: "Tools", label: "Sponge or foundation brush", essential: true },
    { id: "brushes", category: "Tools", label: "Eye and face brush set", essential: level !== "beginner" }
  );
  return items;
}

export function buildRoutine(input: {
  period: "am" | "pm";
  minutes: number;
  skin: "dry" | "oily" | "combo" | "normal";
  coverage: "sheer" | "medium" | "full";
}): string[] {
  const steps: string[] = [];
  if (input.period === "am") {
    steps.push("Cleanse or rinse face");
    steps.push("Moisturizer + SPF (wait before makeup)");
  } else {
    steps.push("Remove makeup with balm or oil");
    steps.push("Second cleanse if needed");
    steps.push("Treatment or moisturizer");
    if (input.minutes >= 20) steps.push("Optional mask or exfoliant (not nightly)");
    return steps;
  }
  if (input.minutes >= 25) steps.push("Primer on T-zone or dry patches");
  if (input.coverage === "sheer") steps.push("Skin tint or spot concealer");
  else if (input.coverage === "medium") steps.push("Foundation + concealer where needed");
  else steps.push("Foundation, concealer, cream contour optional");
  steps.push("Brows: gel or fill");
  if (input.minutes >= 15) steps.push("Neutral eyeshadow + mascara");
  else steps.push("Mascara only");
  steps.push("Blush on apples toward temple");
  if (input.skin === "oily" && input.minutes >= 20) steps.push("Light powder on T-zone");
  steps.push("Lip balm or lipstick");
  if (input.minutes >= 30) steps.push("Setting spray for long days");
  return steps;
}

export const BUDGET_TIERS = {
  drugstore: { base: 35, eyes: 25, lips: 15, tools: 30 },
  mid: { base: 75, eyes: 55, lips: 28, tools: 65 },
  luxury: { base: 145, eyes: 110, lips: 55, tools: 120 },
} as const;

export function computeBudget(
  tier: keyof typeof BUDGET_TIERS,
  categories: { base: boolean; eyes: boolean; lips: boolean; tools: boolean },
  multiplier = 1
): { total: number; lines: { label: string; amount: number }[] } {
  const t = BUDGET_TIERS[tier];
  const lines: { label: string; amount: number }[] = [];
  if (categories.base) lines.push({ label: "Base (foundation, concealer, primer)", amount: t.base });
  if (categories.eyes) lines.push({ label: "Eyes (shadow, liner, mascara, brows)", amount: t.eyes });
  if (categories.lips) lines.push({ label: "Lips", amount: t.lips });
  if (categories.tools) lines.push({ label: "Tools & brushes", amount: t.tools });
  const sub = lines.reduce((s, l) => s + l.amount, 0);
  const total = Math.round(sub * multiplier);
  return { total, lines: lines.map((l) => ({ ...l, amount: Math.round(l.amount * multiplier) })) };
}

export const STEP_MINUTES: Record<string, number> = {
  skincare: 3,
  primer: 2,
  foundation: 5,
  concealer: 3,
  contour: 4,
  blush: 2,
  brows: 4,
  eyeshadow: 8,
  liner: 6,
  mascara: 3,
  lashes: 10,
  lips: 3,
  setting: 2,
};

export function weddingRecommendations(answers: {
  role: "bride" | "guest" | "party";
  venue: "indoor" | "outdoor" | "mixed";
  photo: "natural" | "flash" | "video";
  lashes: "none" | "individual" | "strip";
}): { title: string; notes: string[] } {
  const intensity =
    answers.role === "bride" ? "Polished long-wear bridal" : answers.role === "party" ? "Photo-ready glam" : "Elevated guest look";
  const notes: string[] = [
    `${intensity}: build base in thin layers and set strategically.`,
  ];
  if (answers.venue === "outdoor") {
    notes.push("Humidity and sun: prioritize setting spray and blotting; avoid heavy dew on oily skin.");
  }
  if (answers.photo === "flash") {
    notes.push("Avoid SPF flashback and heavy silica on center face; test in photos at trial.");
  }
  if (answers.lashes === "strip") notes.push("Allow 10-15 extra minutes for lash application and drying.");
  if (answers.role === "bride") notes.push("Schedule makeup 60-90 minutes before departure with touch-up kit packed.");
  return { title: intensity, notes };
}

export function everydayLook(input: {
  dressCode: "casual" | "business" | "uniform";
  concerns: "redness" | "dark_circles" | "oil" | "dry";
  coverage: "minimal" | "medium";
}): { summary: string; steps: string[] } {
  const steps = ["SPF moisturizer or primer", "Concealer on concerns only"];
  if (input.coverage === "medium") steps.push("Light foundation or skin tint on center face");
  if (input.concerns === "oil") steps.push("Powder T-zone only");
  if (input.concerns === "dry") steps.push("Cream blush and avoid heavy powder");
  steps.push("Brow gel", "Mascara", "MLBB lip");
  const summary =
    input.dressCode === "business"
      ? "Polished neutral face in under 15 minutes, no heavy contour."
      : input.dressCode === "uniform"
        ? "Minimal, long-wear base with defined brows and one lip color."
        : "Fresh skin-first look with optional soft color.";
  return { summary, steps };
}
