import fs from "node:fs";

const d = JSON.parse(fs.readFileSync("./data/blog/generated.json", "utf8"));
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
  "In this post",
  "In this guide",
  "You've got this",
  "non-negotiable",
];

for (const p of d.posts) {
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
  if (flags.length || !contentOk) {
    console.log(p.slug, flags.join(", ") || "", "contentOk=" + contentOk);
  }
}
console.log("total posts", d.posts.length);
console.log("sample intros:");
for (const slug of [
  "eye-shape-eyeshadow-map-hooded-almond-round-monolid",
  "office-makeup-fluorescent-lights-sheer-base-soft-eyes-coffee-proof-lip",
  "brows-frame-face-without-stamped-on",
]) {
  const p = d.posts.find((x) => x.slug === slug);
  const para = p.blocks.find((b) => b.type === "paragraph");
  console.log("\n" + slug + "\n" + p.title + "\n" + para.text.slice(0, 220));
}
