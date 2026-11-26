import fs from "node:fs";

const d = JSON.parse(fs.readFileSync("./data/blog/generated.json", "utf8"));
const targets = [
  "eye-shape-eyeshadow-map-hooded-almond-round-monolid",
  "eyeshadow-hooded-lids-crease-depth-liner",
  "eyeshadow-hooded-lids-crease-map-outer-depth-liner",
  "matching-lipstick-blush-personal-color-season",
  "calm-first-impression-makeup-routine",
  "brows-match-face-shape-without-overplucking",
  "brows-frame-face-without-stamped-on",
  "contour-blush-face-shape-not-viral-map",
  "wedding-guest-makeup-photographs-kindly",
  "office-makeup-fluorescent-lights-sheer-base-soft-eyes-coffee-proof-lip",
];

const words = [
  "Additionally",
  "crucial",
  "seamless",
  "In conclusion",
  "Moreover",
  "Furthermore",
  "delve",
  "pivotal",
  "testament",
  "practice makes perfect",
  "It's not just",
  "It is not just",
  "In this post",
  "In this guide",
  "You've got this",
  "non-negotiable",
];

let ok = true;
for (const slug of targets) {
  const p = d.posts.find((x) => x.slug === slug);
  if (!p) {
    console.log("MISSING", slug);
    ok = false;
    continue;
  }
  const all = JSON.stringify(p.blocks) + p.title + p.excerpt;
  const flags = words.filter((w) => all.toLowerCase().includes(w.toLowerCase()));
  if (/[\u2014\u2013]/.test(all)) flags.push("emdash");
  if (/[\u201c\u201d]/.test(all)) flags.push("curly");
  const tc = (p.blocks || []).filter(
    (b) => b.type === "heading" && /^(?:[A-Z][a-z0-9']*\s+){2,}[A-Z]/.test(b.text)
  );
  if (tc.length) flags.push("titlecase:" + tc.length);
  const rebuilt = (p.blocks || [])
    .filter((b) => b.type === "heading" || b.type === "paragraph")
    .map((b) => b.text);
  const contentOk = JSON.stringify(rebuilt) === JSON.stringify(p.content);
  console.log(slug);
  console.log("  title:", p.title);
  console.log("  head0:", p.blocks.find((b) => b.type === "heading")?.text);
  console.log(
    "  lastH:",
    [...p.blocks].reverse().find((b) => b.type === "heading")?.text
  );
  console.log("  flags:", flags.join(", ") || "clean");
  console.log("  contentOk:", contentOk);
  if (tc.length) tc.forEach((h) => console.log("   TC:", h.text));
  if (flags.length || !contentOk) ok = false;
}

// validate whole JSON
JSON.parse(fs.readFileSync("./data/blog/generated.json", "utf8"));
console.log("\nJSON valid. overall:", ok ? "PASS" : "NEEDS FIXES");
