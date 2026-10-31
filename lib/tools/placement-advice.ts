import type {
  EyeShape,
  EyebrowShape,
  FaceShape,
  LipShape,
} from "@/types/face-analysis";

export interface PlacementAdvice {
  title: string;
  technique: string;
  steps: string[];
  tips: string[];
}

export const BLUSH_BY_FACE_SHAPE: Record<FaceShape, PlacementAdvice> = {
  round: {
    title: "Lifted draping",
    technique: "Sweep blush from upper cheek toward temple to elongate the face.",
    steps: [
      "Smile lightly to find the apple, then place color slightly above it.",
      "Blend upward and outward toward the hairline, not straight across the cheek.",
      "Keep nose contour minimal; optional soft bronzer on outer perimeter.",
    ],
    tips: ["Cream formulas blend more naturally for soft sculpting."],
  },
  square: {
    title: "Softened apples",
    technique: "Place blush on apples and blend with circular motion to soften angles.",
    steps: [
      "Apply on the fullest part of the cheek, avoiding the jaw corner.",
      "Feather toward temples without extending past the outer eye.",
      "Pair with bronzer only on hairline and jaw hollow, not square blocks.",
    ],
    tips: ["Avoid harsh horizontal stripes across the cheekbone."],
  },
  heart: {
    title: "Lower cheek focus",
    technique: "Keep color on apples and mid-cheek; balance a wider forehead visually.",
    steps: [
      "Apply blush below the cheekbone highlight zone.",
      "Blend toward the ear, not toward the nose.",
      "Optional soft wash on chin for balance on strong heart shapes.",
    ],
    tips: ["Skip heavy blush on temples if forehead is already prominent."],
  },
  diamond: {
    title: "Mid-cheek width",
    technique: "Add warmth to mid-cheek without widening the cheekbone peak.",
    steps: [
      "Place color between apple and ear, staying below the bone highlight.",
      "Use sheer layers; build slowly on prominent cheekbones.",
      "Blend toward hairline with a fluffy brush.",
    ],
    tips: ["Matte blush reads more natural on strong bone structure."],
  },
  oblong: {
    title: "Horizontal emphasis",
    technique: "Apply blush more horizontally across apples to visually shorten length.",
    steps: [
      "Place color on apples and blend toward nose and ear, not only upward.",
      "Optional light touch across nose bridge for sun-kissed balance.",
      "Keep highlight vertical on center face sparingly.",
    ],
    tips: ["Avoid dragging blush too high toward temples on long faces."],
  },
  oval: {
    title: "Classic apple placement",
    technique: "Standard apple-to-temple sweep suits balanced proportions.",
    steps: [
      "Smile, tap cream or powder on apples.",
      "Blend back toward the hairline following cheekbone curve.",
      "Match intensity to occasion: one sheer layer for daily wear.",
    ],
    tips: ["Most face shapes read well with this default placement."],
  },
};

export const CONTOUR_BY_FACE_SHAPE: Record<FaceShape, PlacementAdvice> = {
  round: {
    title: "Perimeter sculpt",
    technique: "Shadow below cheekbones, temples, and jaw to add definition.",
    steps: [
      "Use cool taupe (not orange bronzer) in the hollow under cheekbones.",
      "Soft shade at temples and along jawline from ear toward chin.",
      "Blend in small circles until edges disappear.",
    ],
    tips: ["PlacementDiagram highlights hollows tuned to your shape."],
  },
  square: {
    title: "Soften corners",
    technique: "Contour jaw corners and temples; keep cheek hollows subtle.",
    steps: [
      "Blend along the jaw from earlobe toward chin. Avoid a harsh line.",
      "Light contour at temples to round the hairline visually.",
      "Cheek hollow: thin stripe, blended upward, not downward onto the apple.",
    ],
    tips: ["Powder contour after foundation is set for easier blending."],
  },
  heart: {
    title: "Jaw and temple balance",
    technique: "Light jaw and temple contour; minimal forehead shading.",
    steps: [
      "Soft shadow along narrow jawline to add width illusion at chin.",
      "Optional temple contour if forehead reads very wide in photos.",
      "Skip heavy cheek hollow contour if cheeks are already narrow.",
    ],
    tips: ["Highlight center chin and cupid's bow instead of heavy jaw shade."],
  },
  diamond: {
    title: "Forehead and jaw width",
    technique: "Contour forehead sides and jaw; leave cheek peak highlighted.",
    steps: [
      "Shade outer forehead near hairline slightly.",
      "Jawline from ear toward chin with a diffused edge.",
      "Do not mattify the highest cheek point. That is your highlight zone.",
    ],
    tips: ["Use cream contour for seamless blending on bone structure."],
  },
  oblong: {
    title: "Width at sides",
    technique: "Contour temples, jaw, and under chin; avoid lengthening the face.",
    steps: [
      "Temples and hairline sides for subtle width.",
      "Under jaw and chin shadow to shorten the lower third visually.",
      "Cheek hollows: horizontal blend, not dragged toward mouth.",
    ],
    tips: ["Skip stripe contour down the nose unless correcting width."],
  },
  oval: {
    title: "Light definition",
    technique: "Optional hollow and jaw definition for photos or evening looks.",
    steps: [
      "Thin line in cheek hollow, blended toward hairline.",
      "Optional jaw and nose side shading for dimension.",
      "Keep product sheer for daytime oval faces.",
    ],
    tips: ["Many oval faces need only blush and highlight for daily makeup."],
  },
};

export const EYESHADOW_BY_EYE_SHAPE: Record<
  Exclude<EyeShape, "uncertain">,
  PlacementAdvice
> = {
  almond: {
    title: "Balanced wash + crease",
    technique: "Transition in crease, medium shade on lid, shimmer on center.",
    steps: [
      "Matte transition shade above crease, blended to brow bone.",
      "Medium tone on mobile lid; deepen outer V slightly for depth.",
      "Inner corner highlight or shimmer for openness.",
    ],
    tips: ["Wings follow the lower lash line angle for almond eyes."],
  },
  round: {
    title: "Elongate outer lid",
    technique: "Darken outer third and keep crease extended outward.",
    steps: [
      "Transition shade in crease, pulled toward temple.",
      "Deep shade on outer lid and lower outer third.",
      "Keep inner lid lighter to avoid emphasizing roundness.",
    ],
    tips: ["Tightline upper lashes instead of thick liner all around."],
  },
  hooded: {
    title: "Above-crease placement",
    technique: "Place crease color with eyes open so it shows when looking forward.",
    steps: [
      "Transition shade above the fold, blended toward brow.",
      "Lid color on visible mobile lid; deepen outer corner upward.",
      "Highlight brow bone and inner corner; skip heavy shimmer on fold.",
    ],
    tips: ["Landmarks cannot confirm hood depth. Verify in a mirror."],
  },
  monolid: {
    title: "Gradient lid",
    technique: "Single gradient from lash line upward; avoid harsh crease cuts.",
    steps: [
      "Darkest shade closest to lashes, diffused upward.",
      "Optional thin liner or tightline for definition.",
      "Shimmer on center lid only if it does not crease on you.",
    ],
    tips: ["Patch test shimmer formulas if lids are oily."],
  },
  upturned: {
    title: "Balance outer lift",
    technique: "Soften outer corner downward slightly or keep lower liner balanced.",
    steps: [
      "Crease depth at outer V, not overly winged upward on lower lash.",
      "Liner: follow upper lash; optional small smudge on outer lower lash.",
      "Inner corner light shade for width.",
    ],
    tips: ["Fox-eye liner exaggerates natural lift. Use sparingly for everyday."],
  },
  downturned: {
    title: "Lift outer corner",
    technique: "Focus depth and liner lift at outer upper lid.",
    steps: [
      "Transition blended upward toward temple at outer third.",
      "Liner or shadow wing angled up from outer corner.",
      "Inner lid highlight; avoid heavy lower outer corner shadow.",
    ],
    tips: ["Mascara focus on outer lashes enhances lift."],
  },
};

export const EYELINER_BY_EYE_SHAPE: Record<
  Exclude<EyeShape, "uncertain">,
  { styles: string[]; avoid: string[]; beginner: string }
> = {
  almond: {
    styles: ["Classic thin wing", "Smudged pencil along lash line", "Brown tightline"],
    avoid: ["Over-thick wings that shorten the eye"],
    beginner: "Dark brown pencil smudged on upper lash line.",
  },
  round: {
    styles: ["Extended wing toward temple", "Cat eye with elongated flick"],
    avoid: ["Rounded thick liner on lower waterline only"],
    beginner: "Wing drawn from outer corner toward end of brow tail.",
  },
  hooded: {
    styles: ["Thin wing with eyes open", "Tightline upper waterline", "Smudged kohl on upper lash only"],
    avoid: ["Thick lines on mobile lid that disappear when eyes open"],
    beginner: "Tightline with gel pencil. Skip the wing until you test lid space with eyes open.",
  },
  monolid: {
    styles: ["Micro wing from mid-lid", "Dot liner between lashes", "Gradient shadow as liner"],
    avoid: ["Heavy liquid liner blocks without practice"],
    beginner: "Brown gel liner pressed into upper lash roots.",
  },
  upturned: {
    styles: ["Soft straight wing", "Lower lash smudge balanced with upper"],
    avoid: ["Extra-long upward flicks on already lifted corners"],
    beginner: "Pencil liner only on upper lash, no extended wing.",
  },
  downturned: {
    styles: ["Upward wing from outer corner", "Skipped lower outer liner"],
    avoid: ["Downward trailing wings"],
    beginner: "Small upward flick using outer lash as guide.",
  },
};

export const EYEBROW_BY_SHAPE: Record<
  Exclude<EyebrowShape, "uncertain">,
  PlacementAdvice
> = {
  straight: {
    title: "Soft length, minimal arch",
    technique: "Fill sparse areas; keep top line clean without adding peak.",
    steps: [
      "Map start, arch, and tail; arch should stay low for straight brows.",
      "Fill with hair strokes parallel to growth.",
      "Set with clear or tinted gel.",
    ],
    tips: ["Long faces pair well with straight brows for balance."],
  },
  soft_arch: {
    title: "Natural peak",
    technique: "Enhance existing arch; do not over-pluck underside.",
    steps: [
      "Fill tail first, then sparse mid-brow.",
      "Peak at highest natural hair, not drawn above bone.",
      "Blend front upward for fluffy effect if desired.",
    ],
    tips: ["Match pencil one shade lighter than hair for soft glam."],
  },
  high_arch: {
    title: "Structured but not thin",
    technique: "Support arch with fill below peak; avoid over-tapering tail.",
    steps: [
      "Define underside of arch with feathery strokes.",
      "Keep tail length to outer eye corner alignment.",
      "Trim only long stray hairs.",
    ],
    tips: ["Round faces benefit from a higher arch visually. Do not over-thin."],
  },
  rounded: {
    title: "Gentle curve",
    technique: "Follow rounded bone; avoid sharp angular peaks.",
    steps: [
      "Fill with soft circular brushing at arch zone.",
      "Keep front lighter than tail.",
      "Gel brush-up for texture.",
    ],
    tips: ["Square jawlines soften with rounded brow curves."],
  },
  angled: {
    title: "Defined peak",
    technique: "Emphasize outer third angle without harsh block.",
    steps: [
      "Under-arch fill with small strokes.",
      "Tail tapers naturally toward temple.",
      "Avoid starting the arch too far inner. It reads surprised.",
    ],
    tips: ["Soften angle with spoolie for everyday wear."],
  },
};

export const LIP_LINER_BY_SHAPE: Record<
  Exclude<LipShape, "uncertain">,
  PlacementAdvice
> = {
  full: {
    title: "Define without shrinking",
    technique: "Liner at true border or slightly inside; blur for soft glam.",
    steps: [
      "Match liner to lipstick or one shade deeper.",
      "Trace vermilion border; fill lightly before lipstick.",
      "Blot and reapply for longevity without overlining.",
    ],
    tips: ["Matte lipstick on full lips: hydrate first to avoid cracking."],
  },
  thin: {
    title: "Soft expansion",
    technique: "Slight overline with blurred edges, not a sharp outer ring.",
    steps: [
      "Overline center of upper and lower lip only, fade at corners.",
      "Use nude liner close to natural tone for everyday.",
      "Add gloss on center for dimension.",
    ],
    tips: ["Avoid dark liner far outside border in daylight."],
  },
  wide: {
    title: "Corner balance",
    technique: "Focus liner on cupid's bow and center lower lip; soften outer corners.",
    steps: [
      "Define cupid's bow with small strokes.",
      "Do not extend corners outward aggressively.",
      "Fill with lipstick toward center first.",
    ],
    tips: ["Deep shades on outer corners can pull mouth wider visually."],
  },
  heart: {
    title: "Cupid's bow emphasis",
    technique: "Sharpen bow slightly; keep lower lip rounded.",
    steps: [
      "Trace bow with X or small peaks as desired.",
      "Fill upper lip before lower for symmetry.",
      "Blot upper lip to prevent feathering.",
    ],
    tips: ["Lighter lipstick on lower lip balances strong bow."],
  },
  balanced: {
    title: "Symmetry maintenance",
    technique: "Liner at natural border for wear time and even lipstick.",
    steps: [
      "Outline full mouth; fill corners carefully.",
      "Apply lipstick with brush from center outward.",
      "Optional clear gloss on top.",
    ],
    tips: ["One shade deeper liner adds dimension on balanced lips."],
  },
};

export function interpretForehead(foreheadWidthRatio: number, foreheadToFaceRatio: number) {
  const width =
    foreheadWidthRatio >= 0.98
      ? "wide"
      : foreheadWidthRatio <= 0.88
        ? "narrow"
        : "average";
  const height =
    foreheadToFaceRatio >= 0.42 ? "tall" : foreheadToFaceRatio <= 0.34 ? "short" : "average";
  return { width, height };
}

export function interpretJaw(jawWidthRatio: number, cheekToJawRatio: number) {
  let type: "soft" | "angular" | "tapered" | "square" = "soft";
  if (jawWidthRatio >= 0.92 && cheekToJawRatio < 1.12) type = "square";
  else if (jawWidthRatio <= 0.78) type = "tapered";
  else if (cheekToJawRatio >= 1.18) type = "angular";
  return type;
}

export function cheekboneAdvice(cheekToJawRatio: number, faceShape: FaceShape): string {
  const prominent = cheekToJawRatio >= 1.12;
  if (prominent) {
    return "Cheekbones read prominent relative to jaw. Place blush below the peak and highlight on the bone, not the apple.";
  }
  if (faceShape === "round") {
    return "Cheeks and jaw are close in width. Lift blush upward and use contour in the hollow to add structure.";
  }
  return "Follow apple-to-temple blush with highlight on the upper cheekbone for lift.";
}
