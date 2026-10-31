import type { BlogTopic } from "@/types/blog";

/** Rotating makeup education topics for daily AI posts. */
export const BLOG_TOPICS: BlogTopic[] = [
  {
    id: "blush-placement-round",
    titleHint: "Where blush actually belongs on a rounder face",
    category: "Face",
    angle:
      "Teach blush placement that lifts instead of widening, with daylight checks and common mistakes.",
    relatedToolHref: "/tools/blush-placement-finder",
    relatedToolLabel: "Blush placement finder",
    imageQueries: [
      "woman applying blush mirror daylight",
      "makeup brush soft pink cheeks portrait",
      "beauty desk blush palette close up",
      "natural makeup portrait soft window light",
    ],
  },
  {
    id: "hooded-eye-shadow",
    titleHint: "Eyeshadow that still shows on hooded lids",
    category: "Eyes",
    angle:
      "Map crease work with eyes open, outer corner depth, and liner that does not vanish when you blink.",
    relatedToolHref: "/tools/eye-shape-detector",
    relatedToolLabel: "Eye shape detector",
    imageQueries: [
      "close up eye makeup soft neutrals",
      "woman eyeshadow brush eyelid portrait",
      "makeup artist blending eyeshadow salon",
      "neutral eye makeup natural light portrait",
    ],
  },
  {
    id: "undertone-foundation",
    titleHint: "Warm cool or neutral foundation without the orange cast",
    category: "Skin",
    angle:
      "Walk through vein test limits, jawline swatching, and fixing a shade that looked fine indoors.",
    relatedToolHref: "/tools/foundation-shade-finder",
    relatedToolLabel: "Foundation shade finder",
    imageQueries: [
      "foundation swatches on jawline daylight",
      "makeup sponge blending foundation portrait",
      "beauty counter foundation bottles soft light",
      "natural skin texture portrait window light",
    ],
  },
  {
    id: "soft-glam-beginner",
    titleHint: "Soft glam in under thirty minutes for beginners",
    category: "Looks",
    angle:
      "A realistic soft glam order: skin, brows, eyes, cheeks, lips, with time boxes and skip options.",
    relatedToolHref: "/tools/makeup-routine-generator",
    relatedToolLabel: "Routine generator",
    imageQueries: [
      "soft glam makeup portrait studio light",
      "woman mascara wand close up",
      "nude pink lipstick application mirror",
      "vanity table makeup products soft light",
    ],
  },
  {
    id: "contour-daylight",
    titleHint: "Contour that still looks natural in daylight",
    category: "Face",
    angle:
      "Cheek hollows, jaw, and nose sides with a sheer cream or powder, plus the mirror test outdoors.",
    relatedToolHref: "/tools/contour-placement-guide",
    relatedToolLabel: "Contour placement guide",
    imageQueries: [
      "woman contour makeup brush cheek",
      "sculpted makeup portrait soft daylight",
      "cream contour stick on beauty desk",
      "natural contour makeup outdoor portrait",
    ],
  },
  {
    id: "lip-liner-shape",
    titleHint: "Lip liner that shapes without looking drawn on",
    category: "Lips",
    angle:
      "Cupid bow, corners, and filling technique for thin full or uneven lips with shade pairing tips.",
    relatedToolHref: "/tools/lip-liner-guide",
    relatedToolLabel: "Lip liner guide",
    imageQueries: [
      "lip liner pencil close up lips",
      "woman applying lipstick mirror",
      "nude lipstick texture close up",
      "beauty portrait soft lip makeup",
    ],
  },
  {
    id: "brow-mapping-face",
    titleHint: "Brows that match your face shape without overplucking",
    category: "Eyes",
    angle:
      "Simple mapping with a pencil, filling sparse spots, and when a soft arch beats a hard angle.",
    relatedToolHref: "/tools/eyebrow-shaping-guide",
    relatedToolLabel: "Eyebrow shaping guide",
    imageQueries: [
      "eyebrow pencil mapping close up",
      "woman brushing brows spoolie",
      "natural brows portrait soft light",
      "makeup artist filling eyebrows salon",
    ],
  },
  {
    id: "office-makeup-lasting",
    titleHint: "Office makeup that lasts through fluorescent lights",
    category: "Looks",
    angle:
      "Sheer base, soft eyes, and a lip that survives coffee, with touch up kit ideas that stay professional.",
    relatedToolHref: "/tools/everyday-makeup-finder",
    relatedToolLabel: "Everyday makeup finder",
    imageQueries: [
      "professional woman natural makeup office",
      "compact powder touch up mirror",
      "nude makeup portrait daylight indoor",
      "lipstick coffee cup desk soft light",
    ],
  },
  {
    id: "primer-when-to-skip",
    titleHint: "When primer helps and when you should skip it",
    category: "Basics",
    angle:
      "Grip vs blur vs hydrating primers, pilling causes, and a simple test before buying another tube.",
    relatedToolHref: "/guides/face-primer-makeup-primer",
    relatedToolLabel: "Face primer guide",
    imageQueries: [
      "woman applying face primer fingers",
      "makeup primer bottle beauty desk",
      "smooth skin portrait soft daylight",
      "foundation brush blending cheek",
    ],
  },
  {
    id: "clean-girl-realistic",
    titleHint: "Clean girl makeup that does not look unfinished",
    category: "Looks",
    angle:
      "Skin focus, brow gel, cream blush, mascara, and lip oil with tips for dry and oily skin.",
    relatedToolHref: "/makeup-looks/clean-girl-makeup",
    relatedToolLabel: "Clean girl look",
    imageQueries: [
      "clean girl makeup dewy skin portrait",
      "cream blush fingers on cheeks",
      "clear lip gloss close up",
      "fresh face natural makeup window light",
    ],
  },
  {
    id: "eyeliner-wing-hooded",
    titleHint: "A winged liner that works when lids are hooded",
    category: "Eyes",
    angle:
      "Draw with eyes open, short wing angles, and waterproof vs gel choices for all day wear.",
    relatedToolHref: "/tools/eyeliner-style-finder",
    relatedToolLabel: "Eyeliner style finder",
    imageQueries: [
      "winged eyeliner close up eye",
      "liquid eyeliner pen application",
      "makeup artist drawing eyeliner",
      "dramatic eye makeup portrait soft light",
    ],
  },
  {
    id: "wedding-guest-makeup",
    titleHint: "Wedding guest makeup that photographs kindly",
    category: "Occasion",
    angle:
      "Flash friendly base, soft shimmer limits, and a lip that survives dinner without looking heavy.",
    relatedToolHref: "/tools/wedding-makeup-finder",
    relatedToolLabel: "Wedding makeup finder",
    imageQueries: [
      "elegant guest makeup portrait soft light",
      "bridesmaid getting makeup brush",
      "soft glam eyeshadow close up",
      "rose lipstick smile outdoor wedding",
    ],
  },
];
