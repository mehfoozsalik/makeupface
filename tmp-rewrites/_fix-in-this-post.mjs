import fs from "node:fs";

const path = "./data/blog/generated.json";
const d = JSON.parse(fs.readFileSync(path, "utf8"));

function rebuild(blocks) {
  return (blocks || [])
    .filter((b) => b.type === "heading" || b.type === "paragraph")
    .map((b) => b.text);
}

const preferred = {
  "lip-liner-shapes-without-looking-drawn-on-2026-11-25": {
    match: /In this post|Below: shaping the cupid bow/i,
    text: "Think of liner as a shadow, not a border. Your lips already have curves and edges. Liner should follow them, maybe nudge them a little, but never fight them. Below: shaping the cupid bow, defining the corners, and filling so it looks soft and real, plus shade pairing for thin, full, and uneven lips.",
  },
  "contour-natural-daylight": {
    match: /In this post|Below: sheer cream/i,
    text: "You don't have to give up contour. Adjust the products, the placement, and how you check it. Aim to mimic natural shadows, not draw them on. Below: sheer cream or powder on the cheek hollows, jaw, and nose sides, plus a mirror test that catches overdoing it before you leave the house.",
  },
};

const updated = [];

for (const p of d.posts) {
  let changed = false;

  if (preferred[p.slug]) {
    const rule = preferred[p.slug];
    for (const b of p.blocks || []) {
      if (b.type === "paragraph" && rule.match.test(b.text)) {
        b.text = rule.text;
        changed = true;
      }
    }
  }

  for (const b of p.blocks || []) {
    if (b.type === "paragraph" && /In this post/i.test(b.text || "")) {
      b.text = b.text
        .replace(/In this post, I'll walk you through /gi, "Below: ")
        .replace(/In this post, I will walk you through /gi, "Below: ")
        .replace(/In this post, we'll /gi, "Below, we ")
        .replace(/In this post, /gi, "")
        .replace(/We'll also cover /gi, "Also covered: ")
        .replace(/\s{2,}/g, " ")
        .trim();
      changed = true;
    }
  }

  if (changed) {
    p.content = rebuild(p.blocks);
    updated.push(p.slug);
  }
}

fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
JSON.parse(fs.readFileSync(path, "utf8"));

console.log("updated:", updated);
for (const p of d.posts) {
  if (/In this post/i.test(JSON.stringify(p.blocks))) {
    console.log("STILL", p.slug);
  }
}
console.log("json ok");
