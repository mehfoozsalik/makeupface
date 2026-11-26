/**
 * Humanize generated blog posts + tighten titles/excerpts for Search Console CTR.
 * Run: node scripts/humanize-blog-posts.mjs
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const storePath = path.join(root, "data", "blog", "generated.json");

/** CTR-focused title + excerpt overrides keyed by slug (partial match). */
const CTR_OVERRIDES = [
  {
    match: /blush-placement-rounder/,
    title: "Where to Put Blush on a Rounder Face (Higher, Shorter Sweep)",
    excerpt:
      "If blush sits only on the apples of a rounder face, it can widen you. Here's the higher, shorter placement that reads like a flush, not a stripe.",
  },
  {
    match: /blush-placement-round-face/,
    title: "Where to Put Blush on a Round Face (Lift Toward the Temples)",
    excerpt:
      "Smile-and-swirl on the apples can widen a round face. Start under the outer eye, sweep up toward the temples, and check the flush in daylight.",
  },
  {
    match: /photograph-face-ai/,
    title: "How to Photograph Your Face So AI Makeup Tools Read You Correctly",
    excerpt:
      "Lighting, angle, and distance matter more than filters. A clear front-facing selfie helps face-shape, undertone, and shade tools stop guessing wrong.",
  },
  {
    match: /lip-liner-shapes/,
    title: "Lip Liner Without Looking Drawn On (Even Without Lipstick)",
    excerpt:
      "Shape the cupid bow and corners, fill lightly, and match liner to your lip so you get definition without a harsh ring. Works under lipstick or alone.",
  },
  {
    match: /when-primer-helps/,
    title: "When Face Primer Helps (and When You Should Skip It)",
    excerpt:
      "Primer is not mandatory. Use it for grip, blur, or oil control. Skip it when moisturizer plus foundation already sits well on your skin.",
  },
  {
    match: /clean-girl-makeup-not-unfinished/,
    title: "Clean Girl Makeup That Doesn't Look Unfinished",
    excerpt:
      "Skin-first makeup still needs brows, a real flush, and a lip. Here's how to look polished without full glam coverage.",
  },
  {
    match: /soft-glam-under-30/,
    title: "Soft Glam Makeup in Under 30 Minutes for Beginners",
    excerpt:
      "A realistic soft glam order: sheer base, soft eyes, blush, and a lip that photographs well without a full artist kit.",
  },
  {
    match: /winged-liner-hooded/,
    title: "Winged Liner for Hooded Eyes That Still Shows When Open",
    excerpt:
      "Draw the wing with eyes open, keep the angle short, and place ink where the lid stays visible so the wing doesn't disappear when you look forward.",
  },
  {
    match: /eyeshadow-hooded/,
    title: "Eyeshadow for Hooded Lids: Crease Map, Outer Depth, Soft Liner",
    excerpt:
      "Hooded lids hide shadow applied only on the closed lid. Map the crease you see when your eyes are open, then build depth on the outer corner.",
  },
  {
    match: /warm-cool-neutral-foundation/,
    title: "Find Your Foundation Undertone Without the Orange Cast",
    excerpt:
      "Warm, cool, or neutral: how to swatch at the jaw, spot an orange cast early, and use a foundation shade finder when store lighting lies.",
  },
  {
    match: /contour-natural-daylight/,
    title: "Contour Placement That Still Looks Natural in Daylight",
    excerpt:
      "Bathroom lighting hides stripes. Sheer contour in the cheek hollows, jaw, and nose, then check in daylight before you leave the house.",
  },
  {
    match: /eye-shape-eyeshadow-map/,
    title: "Eyeshadow Maps by Eye Shape: Hooded, Almond, Round, Monolid",
    excerpt:
      "The same palette lands differently on every eye shape. Use a placement map that matches how your crease and lid actually show when open.",
  },
  {
    match: /matching-lipstick-blush/,
    title: "Match Lipstick and Blush to Your Color Season",
    excerpt:
      "Stop guessing pink vs peach. Pair lip and blush families to your undertone so the face looks intentional in daylight, not random.",
  },
  {
    match: /calm-first-impression/,
    title: "A Calm Makeup Routine for Dates and Interviews",
    excerpt:
      "A short first-impression routine: even skin, soft brows, one flush of color, and a lip that lasts without looking like a full glam shoot.",
  },
  {
    match: /brows-match-face-shape|brows-frame-face/,
    title: "Brows That Match Your Face Shape Without Looking Stamped On",
    excerpt:
      "Shape and fill so brows frame your features. Soft edges beat Instagram stamps, and face shape changes where the arch should sit.",
  },
  {
    match: /contour-blush-face-shape/,
    title: "Contour and Blush by Face Shape (Skip the Viral Map)",
    excerpt:
      "Viral face maps ignore your bone structure. Place contour where shadow already falls and blush where it lifts your specific face shape.",
  },
  {
    match: /wedding-guest-makeup/,
    title: "Wedding Guest Makeup That Photographs Kindly Under Flash",
    excerpt:
      "Flash-friendly base, soft eyes, and a lip that survives dinner. Guest makeup that looks alive in photos without stealing the bridal look.",
  },
  {
    match: /office-makeup-fluorescent/,
    title: "Office Makeup That Survives Fluorescent Lights",
    excerpt:
      "Sheer base, soft eyes, coffee-proof lip. Makeup that holds under harsh office lighting without looking heavy on camera or in the elevator mirror.",
  },
];

function applyCtrOverride(post) {
  for (const rule of CTR_OVERRIDES) {
    if (rule.match.test(post.slug)) {
      post.title = rule.title;
      post.excerpt = rule.excerpt;
      return;
    }
  }
}

const AI_PHRASES = [
  [/Additionally,\s+/gi, ""],
  [/Furthermore,\s+/gi, ""],
  [/Moreover,\s+/gi, ""],
  [/In conclusion,\s*/gi, ""],
  [/At its core,\s*/gi, ""],
  [/It(?:['’]s| is) (?:important|crucial|essential) to (?:note|remember|understand) that\s+/gi, ""],
  [/In order to\s+/gi, "To "],
  [/Due to the fact that\s+/gi, "Because "],
  [/a (?:vital|crucial|pivotal|key) (?:role|moment|part)/gi, "a real part"],
  [/stands as a\s+/gi, "is a "],
  [/serves as a\s+/gi, "is a "],
  [/serves as\s+/gi, "is "],
  [/boasts\s+/gi, "has "],
  [/delve into\s+/gi, "look at "],
  [/dive into\s+/gi, "look at "],
  [/landscape of\s+/gi, "world of "],
  [/ever[- ]evolving\s+/gi, ""],
  [/groundbreaking\s+/gi, ""],
  [/breathtaking\s+/gi, ""],
  [/nestled (?:in|within)\s+/gi, "in "],
  [/in the heart of\s+/gi, "in "],
  [/testament to\s+/gi, "sign of "],
  [/underscoring\s+/gi, "showing "],
  [/highlighting\s+/gi, "showing "],
  [/fostering\s+/gi, "building "],
  [/enhancing\s+/gi, "improving "],
  [/seamless(?:ly)?/gi, (m) => (m.toLowerCase().endsWith("y") ? "evenly" : "even")],
  [/It(?:['’]s| is) not just about ([^.;]+);\s*it(?:['’]s| is) about\s+/gi, "It comes down to "],
  [/It(?:['’]s| is) not just ([^.;]+);\s*it(?:['’]s| is)\s+/gi, "It's "],
  [/Not only ([^,]+), but also\s+/gi, "$1, and "],
  [/Exciting times lie ahead[^.]*\./gi, ""],
  [/The future looks bright[^.]*\./gi, ""],
  [/I hope this helps!?/gi, ""],
  [/Let me know if you(?:['’]d| would) like[^.]*\./gi, ""],
  [/Great question!?/gi, ""],
  [/Practice makes perfect\.?/gi, "Reps help more than theory."],
  [/like a pro\.?/gi, "with a steadier hand."],
  [/don(?:['’]t) be afraid to make mistakes[^.]*\./gi, "Messy first tries are normal."],
];

const CLOSING_REWRITES = [
  {
    test: /soon, you(?:['’]ll| will) be lining your lips/i,
    text: "Do a few quiet practice rounds in daylight. The goal is a lip edge that looks like yours, just clearer.",
  },
  {
    test: /without fear of the sun(?:['’]s)? rays/i,
    text: "Check once by a window before you leave. If it still looks like stripes outside, sheer it out and blend again.",
  },
  {
    test: /journey toward excellence/i,
    text: "Keep the routine short enough that you will actually repeat it tomorrow.",
  },
];

function stripAiDecor(text) {
  if (typeof text !== "string" || !text) return text;
  let out = text
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/\u2014/g, ",")
    .replace(/\u2013/g, ",")
    .replace(/\s+-\s+/g, ", ")
    .replace(/\s{2,}/g, " ")
    .trim();

  for (const [re, rep] of AI_PHRASES) {
    out = out.replace(re, rep);
  }

  for (const rule of CLOSING_REWRITES) {
    if (rule.test.test(out)) out = rule.text;
  }

  // Soften formulaic final-thought headers when they appear as headings
  out = out.replace(/^Final Thoughts:?\s*/i, "");
  out = out.replace(/^In Summary:?\s*/i, "");
  out = out.replace(/^Key Takeaways:?\s*/i, "What to remember");

  // Title Case headings -> sentence case for short headings (humanizer #16)
  // Only when every word is capitalized and length is modest
  if (/^(?:[A-Z][a-z0-9']+\s+){2,}[A-Z][a-z0-9']+[.?!:]?$/.test(out) && out.split(/\s+/).length <= 10) {
    out = out.charAt(0) + out.slice(1).toLowerCase();
    // keep intentional acronyms
    out = out.replace(/\bai\b/g, "AI").replace(/\bspf\b/g, "SPF");
  }

  return out.replace(/\s{2,}/g, " ").replace(/\s+([,.;:!?])/g, "$1").trim();
}

function humanizeBlock(block) {
  if (!block || typeof block !== "object") return block;
  if (block.type === "heading" || block.type === "paragraph" || block.type === "quote") {
    return { ...block, text: stripAiDecor(block.text) };
  }
  if (block.type === "list" && Array.isArray(block.items)) {
    return {
      ...block,
      items: block.items.map((item) => stripAiDecor(item)),
    };
  }
  if (block.type === "image" && block.caption) {
    return { ...block, caption: stripAiDecor(block.caption) };
  }
  return block;
}

function rebuildContentFromBlocks(blocks) {
  const content = [];
  for (const b of blocks || []) {
    if (b.type === "heading" || b.type === "paragraph") {
      content.push(b.text);
    }
  }
  return content;
}

/** Light voice pass: break identical cadence in long paragraphs by splitting one compound sentence occasionally. */
function addBreathingRoom(text) {
  if (!text || text.length < 220) return text;
  // Prefer concrete "I" asides only in first paragraph-ish intros when they start with generic framing
  return text
    .replace(
      /^You've probably seen\b/i,
      "You've seen"
    )
    .replace(
      /^In this (?:post|guide|article), (?:I['’]ll|we['’]ll) walk you through\b/i,
      "Here's how to handle"
    )
    .replace(
      /^In this (?:post|guide|article), (?:I|we) (?:will|want to)\b/i,
      "This covers"
    );
}

function processPost(post) {
  applyCtrOverride(post);
  post.title = stripAiDecor(post.title);
  post.excerpt = addBreathingRoom(stripAiDecor(post.excerpt));

  if (Array.isArray(post.blocks)) {
    post.blocks = post.blocks.map((b) => {
      const next = humanizeBlock(b);
      if (next.type === "paragraph") {
        next.text = addBreathingRoom(next.text);
      }
      return next;
    });
    post.content = rebuildContentFromBlocks(post.blocks);
  } else if (Array.isArray(post.content)) {
    post.content = post.content.map((t) => addBreathingRoom(stripAiDecor(t)));
  }

  // Soft CTA for foundation/lipstick finder demand from Search Console
  if (/foundation|undertone|shade/.test(post.slug) && post.relatedToolHref) {
    const tip =
      "If store lighting keeps lying to you, use a foundation shade finder with a daylight photo before you buy another bottle.";
    const last = post.blocks?.[post.blocks.length - 1];
    if (last?.type === "paragraph" && !/shade finder/i.test(last.text)) {
      post.blocks.push({ type: "paragraph", text: tip });
      post.content = rebuildContentFromBlocks(post.blocks);
    }
  }
  if (/lip-liner|lipstick|blush-placement-round/.test(post.slug) && post.relatedToolHref) {
    const tip = post.relatedToolLabel
      ? `When you want a second opinion on placement or shade, try the ${post.relatedToolLabel.toLowerCase()} with a clear selfie.`
      : null;
    if (tip) {
      const exists = (post.blocks || []).some(
        (b) => b.type === "paragraph" && b.text.includes(post.relatedToolLabel)
      );
      if (!exists) {
        post.blocks.push({ type: "paragraph", text: tip });
        post.content = rebuildContentFromBlocks(post.blocks);
      }
    }
  }

  return post;
}

async function main() {
  const raw = await fs.readFile(storePath, "utf8");
  const store = JSON.parse(raw);
  const before = JSON.stringify(store);
  store.posts = (store.posts || []).map(processPost);
  const after = JSON.stringify(store, null, 2) + "\n";
  await fs.writeFile(storePath, after, "utf8");
  console.log(
    `Humanized ${store.posts.length} posts. Bytes ${before.length} -> ${after.length}`
  );
  for (const p of store.posts.slice(0, 8)) {
    console.log("-", p.slug, "=>", p.title);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
