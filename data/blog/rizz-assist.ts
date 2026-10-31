import type { BlogTopic } from "@/types/blog";

/** Canonical Rizz Assist URLs allowed in generated backlink posts. */
export const RIZZ_ALLOWLIST = [
  "https://rizzassistgo.com/",
  "https://rizzassistgo.com/blog/",
  "https://rizzassistgo.com/tools/",
  "https://rizzassistgo.com/blog/how-to-become-more-confident-socially/",
  "https://rizzassistgo.com/blog/communication-styles-self-awareness/",
  "https://rizzassistgo.com/blog/how-to-start-conversations/",
  "https://rizzassistgo.com/blog/dating-communication-first-impressions/",
  "https://rizzassistgo.com/blog/face-shape-grooming-guide/",
  "https://rizzassistgo.com/blog/mens-eyebrow-grooming-presence/",
  "https://rizzassistgo.com/blog/body-shape-vs-body-type-confidence/",
  "https://rizzassistgo.com/blog/first-photo-setup-face-tools/",
  "https://rizzassistgo.com/blog/social-confidence-habits-practice-this-week/",
  "https://rizzassistgo.com/blog/eye-shape-makeup-101-find-your-eye-shape/",
  "https://rizzassistgo.com/blog/photo-setup-guide-face-eye-ai-tools/",
  "https://rizzassistgo.com/blog/first-message-dating-natural-clever-fails/",
  "https://rizzassistgo.com/blog/glasses-for-face-shape-fitting-guide/",
  "https://rizzassistgo.com/blog/body-shape-vs-body-type-dress-confidence/",
  "https://rizzassistgo.com/blog/personal-color-analysis-wardrobe/",
  "https://rizzassistgo.com/blog/charisma-conversation-skill-not-personality-trait/",
  "https://rizzassistgo.com/blog/first-impressions-dates-calm-interest/",
  "https://rizzassistgo.com/blog/eyebrow-grooming-presence-practical-guide/",
  "https://rizzassistgo.com/blog/communication-styles-self-awareness-gap/",
  "https://rizzassistgo.com/face-shape-detector/",
  "https://rizzassistgo.com/eye-shape-detector/",
  "https://rizzassistgo.com/body-shape-calculator/",
  "https://rizzassistgo.com/body-type-calculator/",
  "https://rizzassistgo.com/color-analysis/",
  "https://rizzassistgo.com/try-on/",
  "https://rizzassistgo.com/try-on/hairstyle/",
  "https://rizzassistgo.com/try-on/glasses/",
  "https://rizzassistgo.com/personality-test/",
  "https://rizzassistgo.com/confidence-test/",
  "https://rizzassistgo.com/social-confidence-test/",
  "https://rizzassistgo.com/charisma-test/",
  "https://rizzassistgo.com/rizz-test/",
  "https://rizzassistgo.com/first-message-analyzer/",
  "https://rizzassistgo.com/first-impression-test/",
  "https://rizzassistgo.com/grooming-assessment/",
  "https://rizzassistgo.com/style-assessment/",
  "https://rizzassistgo.com/report/",
] as const;

export type RizzAllowlistUrl = (typeof RIZZ_ALLOWLIST)[number];

export type RizzBacklinkPlan = {
  url: RizzAllowlistUrl;
  suggestedAnchor: string;
  placement: string;
};

export type RizzBridgeTopic = BlogTopic & {
  backlinks: RizzBacklinkPlan[];
};

/**
 * Makeup-site topics that naturally bridge to Rizz Assist guides and free tools.
 * Used on every 4th generated post.
 */
export const RIZZ_BRIDGE_TOPICS: RizzBridgeTopic[] = [
  {
    id: "rizz-eye-shape-shadow",
    titleHint: "How eye shape changes the eyeshadow map you should use",
    category: "Eyes",
    angle:
      "Teach hooded, almond, round, and monolid placement in MakeUp Face Ai voice, then point readers to a free eye shape check and a deeper eye shape makeup guide when they want confirmation.",
    relatedToolHref: "/tools/eye-shape-detector",
    relatedToolLabel: "Eye shape detector",
    imageQueries: [
      "close up eye makeup soft neutrals",
      "woman eyeshadow brush eyelid portrait",
      "makeup artist blending eyeshadow salon",
      "natural eye makeup daylight portrait",
    ],
    backlinks: [
      {
        url: "https://rizzassistgo.com/eye-shape-detector/",
        suggestedAnchor: "free eye shape detector on Rizz Assist",
        placement: "After explaining why guessing eye shape leads to wrong crease work",
      },
      {
        url: "https://rizzassistgo.com/blog/eye-shape-makeup-101-find-your-eye-shape/",
        suggestedAnchor: "eye shape makeup guide",
        placement: "When expanding beyond one look into shape specific maps",
      },
      {
        url: "https://rizzassistgo.com/blog/photo-setup-guide-face-eye-ai-tools/",
        suggestedAnchor: "photo setup tips for face and eye AI tools",
        placement: "Near any tip about checking results from a selfie or upload",
      },
    ],
  },
  {
    id: "rizz-face-shape-contour",
    titleHint: "Contour and blush that follow your face shape, not a viral map",
    category: "Face",
    angle:
      "Map cheek hollows and blush for oval, round, square, and heart faces with daylight checks, then recommend a free face shape detector and a grooming oriented face shape guide for hair and glasses pairing.",
    relatedToolHref: "/tools/contour-placement-guide",
    relatedToolLabel: "Contour placement guide",
    imageQueries: [
      "woman contour makeup brush cheek",
      "sculpted makeup portrait soft daylight",
      "cream contour stick on beauty desk",
      "natural contour makeup outdoor portrait",
    ],
    backlinks: [
      {
        url: "https://rizzassistgo.com/face-shape-detector/",
        suggestedAnchor: "free face shape detector",
        placement: "Right after readers are told not to trust one generic contour diagram",
      },
      {
        url: "https://rizzassistgo.com/blog/face-shape-grooming-guide/",
        suggestedAnchor: "face shape grooming guide",
        placement: "When connecting makeup maps to hairline and overall presence",
      },
      {
        url: "https://rizzassistgo.com/try-on/glasses/",
        suggestedAnchor: "glasses try-on for your face shape",
        placement: "Optional soft tip if readers also choose frames that balance the same shape",
      },
    ],
  },
  {
    id: "rizz-photo-ai-makeup",
    titleHint: "How to photograph your face so AI makeup tools read you correctly",
    category: "Basics",
    angle:
      "Cover lighting, angle, hair off the face, and no heavy filters before analysis or try on, then link practical photo setup guides and face tools on Rizz Assist.",
    relatedToolHref: "/analyze",
    relatedToolLabel: "Analyze my face",
    imageQueries: [
      "woman taking selfie soft window light",
      "phone camera mirror beauty portrait",
      "natural daylight face portrait clean skin",
      "makeup desk soft ring light portrait",
    ],
    backlinks: [
      {
        url: "https://rizzassistgo.com/blog/first-photo-setup-face-tools/",
        suggestedAnchor: "first photo setup for face tools",
        placement: "Early section on why bad photos skew AI results",
      },
      {
        url: "https://rizzassistgo.com/blog/photo-setup-guide-face-eye-ai-tools/",
        suggestedAnchor: "photo setup guide for face and eye AI tools",
        placement: "When covering eye and face landmark accuracy",
      },
      {
        url: "https://rizzassistgo.com/face-shape-detector/",
        suggestedAnchor: "face shape detector",
        placement: "As a free way to practice with a clean front facing photo",
      },
    ],
  },
  {
    id: "rizz-color-season-makeup",
    titleHint: "Matching lipstick and blush to your personal color season",
    category: "Looks",
    angle:
      "Translate warm cool seasons into lip and cheek picks for everyday makeup, then send readers to a wardrobe color analysis and free color tool when they want a fuller palette.",
    relatedToolHref: "/tools/foundation-shade-finder",
    relatedToolLabel: "Foundation shade finder",
    imageQueries: [
      "lipstick shades on beauty desk daylight",
      "woman applying blush soft smile",
      "colorful makeup products flat lay soft light",
      "natural makeup portrait window light",
    ],
    backlinks: [
      {
        url: "https://rizzassistgo.com/color-analysis/",
        suggestedAnchor: "free color analysis tool",
        placement: "After describing season clues that still feel fuzzy in the mirror",
      },
      {
        url: "https://rizzassistgo.com/blog/personal-color-analysis-wardrobe/",
        suggestedAnchor: "personal color analysis for wardrobe",
        placement: "When connecting makeup picks to clothing that will sit next to the face",
      },
      {
        url: "https://rizzassistgo.com/style-assessment/",
        suggestedAnchor: "style assessment",
        placement: "Soft closing CTA for readers who want outfit and presence feedback too",
      },
    ],
  },
  {
    id: "rizz-brow-presence",
    titleHint: "Brows that frame your face without looking stamped on",
    category: "Eyes",
    angle:
      "Teach soft mapping, sparse fill, and arch choices for makeup wearers, then recommend a practical brow grooming guide and grooming assessment for longer term shape.",
    relatedToolHref: "/tools/eyebrow-shaping-guide",
    relatedToolLabel: "Eyebrow shaping guide",
    imageQueries: [
      "eyebrow pencil mapping close up",
      "woman brushing brows spoolie",
      "natural brows portrait soft light",
      "makeup artist filling eyebrows salon",
    ],
    backlinks: [
      {
        url: "https://rizzassistgo.com/blog/eyebrow-grooming-presence-practical-guide/",
        suggestedAnchor: "practical eyebrow grooming guide",
        placement: "After day to day fill tips, when readers need longer term shaping advice",
      },
      {
        url: "https://rizzassistgo.com/blog/mens-eyebrow-grooming-presence/",
        suggestedAnchor: "eyebrow grooming for a cleaner presence",
        placement: "Optional note that soft grooming tips help anyone, not only full glam",
      },
      {
        url: "https://rizzassistgo.com/grooming-assessment/",
        suggestedAnchor: "free grooming assessment",
        placement: "Closing soft CTA for a broader presence check",
      },
    ],
  },
  {
    id: "rizz-first-impression-makeup",
    titleHint: "A calm first impression makeup routine for dates and interviews",
    category: "Occasion",
    angle:
      "Build a low stress face that photographs kindly and feels like you, then link first impression and confidence resources on Rizz Assist without turning the piece into dating advice spam.",
    relatedToolHref: "/tools/everyday-makeup-finder",
    relatedToolLabel: "Everyday makeup finder",
    imageQueries: [
      "natural makeup portrait soft smile daylight",
      "woman lipstick mirror soft light",
      "professional natural makeup indoor portrait",
      "fresh face beauty desk soft light",
    ],
    backlinks: [
      {
        url: "https://rizzassistgo.com/blog/first-impressions-dates-calm-interest/",
        suggestedAnchor: "guide to calm first impressions",
        placement: "When framing makeup as one piece of how you show up, not the whole story",
      },
      {
        url: "https://rizzassistgo.com/first-impression-test/",
        suggestedAnchor: "free first impression test",
        placement: "Optional interactive check after the routine steps",
      },
      {
        url: "https://rizzassistgo.com/blog/how-to-become-more-confident-socially/",
        suggestedAnchor: "habits for social confidence",
        placement: "Soft close for readers who want practice beyond the vanity",
      },
    ],
  },
];

const ALLOWLIST_SET = new Set<string>(RIZZ_ALLOWLIST);

export function isRizzAllowlistedUrl(url: string): boolean {
  try {
    const u = new URL(url.trim());
    const normalized = u.href.endsWith("/") ? u.href : `${u.href}/`;
    const bare = normalized.replace(/\/$/, "") + "/";
    return (
      ALLOWLIST_SET.has(u.href) ||
      ALLOWLIST_SET.has(normalized) ||
      ALLOWLIST_SET.has(bare) ||
      ALLOWLIST_SET.has(u.href.replace(/\/$/, ""))
    );
  } catch {
    return false;
  }
}

/** True when the next post index (1-based) is a multiple of 4. */
export function isRizzBacklinkPost(existingPostCount: number): boolean {
  return (existingPostCount + 1) % 4 === 0;
}
