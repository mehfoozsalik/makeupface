/**
 * Generates favicon, apple touch, logo mark, sized icons, and OG image.
 * Run: node scripts/generate-brand-assets.mjs
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceIcon = path.join(root, "public", "icons", "source-full.png");
const hero = path.join(root, "public", "images", "hero", "greekgoddess.png");
const outPublic = path.join(root, "public");
const outIcons = path.join(outPublic, "icons");

/** Pack PNG buffers into a multi-size ICO (PNG-compressed entries). */
function pngsToIco(pngs) {
  const count = pngs.length;
  const headerSize = 6 + count * 16;
  let offset = headerSize;
  const entries = pngs.map((buf) => {
    const entry = { buf, offset, size: buf.length };
    offset += buf.length;
    return entry;
  });

  const out = Buffer.alloc(offset);
  out.writeUInt16LE(0, 0);
  out.writeUInt16LE(1, 2);
  out.writeUInt16LE(count, 4);

  let entryPos = 6;
  for (let i = 0; i < entries.length; i++) {
    const { buf, offset: dataOffset, size } = entries[i];
    // Width/height 0 means 256 in ICO format; we use 16/32/48 only.
    const metaW = [16, 32, 48][i] ?? 48;
    out.writeUInt8(metaW === 256 ? 0 : metaW, entryPos);
    out.writeUInt8(metaW === 256 ? 0 : metaW, entryPos + 1);
    out.writeUInt8(0, entryPos + 2);
    out.writeUInt8(0, entryPos + 3);
    out.writeUInt16LE(1, entryPos + 4);
    out.writeUInt16LE(32, entryPos + 6);
    out.writeUInt32LE(size, entryPos + 8);
    out.writeUInt32LE(dataOffset, entryPos + 12);
    entryPos += 16;
  }

  for (const { buf, offset: dataOffset } of entries) {
    buf.copy(out, dataOffset);
  }
  return out;
}

/** Face-focused crop: drop bottom wordmark band, then square cover. */
async function logoOnlyBuffer(size) {
  const meta = await sharp(sourceIcon).metadata();
  const w = meta.width ?? 512;
  const h = meta.height ?? 512;
  const cropH = Math.floor(h * 0.64);
  return sharp(sourceIcon)
    .extract({ left: 0, top: 0, width: w, height: cropH })
    .resize(size, size, { fit: "cover", position: "centre" })
    .png({ compressionLevel: 9 })
    .toBuffer();
}

async function main() {
  await fs.mkdir(outIcons, { recursive: true });

  const mark512 = await logoOnlyBuffer(512);
  const mark192 = await logoOnlyBuffer(192);
  const mark180 = await logoOnlyBuffer(180);
  const mark48 = await logoOnlyBuffer(48);
  const mark32 = await logoOnlyBuffer(32);
  const mark16 = await logoOnlyBuffer(16);

  await fs.writeFile(path.join(outPublic, "logo.png"), mark512);
  await fs.writeFile(path.join(outIcons, "icon-512.png"), mark512);
  await fs.writeFile(path.join(outIcons, "icon-192.png"), mark192);
  await fs.writeFile(path.join(outIcons, "icon-48.png"), mark48);
  await fs.writeFile(path.join(outPublic, "apple-touch-icon.png"), mark180);

  const ico = pngsToIco([mark16, mark32, mark48]);
  await fs.writeFile(path.join(outPublic, "favicon.ico"), ico);
  // Next.js app/ favicon convention (static file, no image pipeline)
  await fs.writeFile(path.join(root, "app", "favicon.ico"), ico);

  // Do not write app/icon.png or app/apple-icon.png — those metadata image
  // routes were returning 500 in production. Prefer public/ static files + metadata.icons.

  // OG 1200x630 from hero (cover crop) with subtle dark gradient for readability
  const ogBase = await sharp(hero)
    .resize(1200, 630, { fit: "cover", position: "centre" })
    .modulate({ brightness: 0.92, saturation: 0.95 })
    .toBuffer();

  const overlaySvg = Buffer.from(`
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#1a1210" stop-opacity="0.55"/>
          <stop offset="100%" stop-color="#1a1210" stop-opacity="0.25"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#g)"/>
      <text x="72" y="500" font-family="Georgia, serif" font-size="64" fill="#F7F1EA">MakeUp Face Ai</text>
      <text x="72" y="555" font-family="Arial, sans-serif" font-size="28" fill="#E8D5C4">Discover the makeup that truly suits you</text>
    </svg>
  `);

  const logoForOg = await sharp(mark512).resize(160, 160).png().toBuffer();

  await sharp(ogBase)
    .composite([
      { input: overlaySvg, top: 0, left: 0 },
      { input: logoForOg, top: 48, left: 72 },
    ])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(path.join(outPublic, "og-default.jpg"));

  console.log("Generated:");
  console.log("  public/favicon.ico, logo.png, apple-touch-icon.png, og-default.jpg");
  console.log("  public/icons/icon-{48,192,512}.png");
  console.log("  app/favicon.ico");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
