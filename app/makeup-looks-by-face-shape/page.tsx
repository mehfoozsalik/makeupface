import Link from "next/link";
import { AnalyzeCta } from "@/components/content/analyze-cta";
import { PageShell } from "@/components/content/page-shell";
import { JsonLd, faqJsonLd } from "@/components/seo/json-ld";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Makeup by Face Shape: Oval, Round, Square & More",
  description:
    "Blush, contour, and highlight maps for oval, round, square, heart, diamond, and oblong face shapes. Placement tips only; makeup cannot change bone structure.",
  path: "/makeup-looks-by-face-shape",
});

const SHAPES = [
  {
    id: "oval",
    name: "Oval",
    summary:
      "Forehead and jaw width stay fairly balanced; cheekbones are often the widest point. You can follow classic placement maps without heavy corrective sculpting.",
    blush: "Sweep blush from apple toward temple along the cheekbone. Most standard tutorials assume this canvas.",
    contour: "Optional subtle hollow contour; avoid over-darkening temples unless you want to narrow width visually.",
    highlight: "Cheekbone tops, brow bone, and nose bridge in thin strips. Skip aggressive jaw shading unless you want it for photos.",
    looks: ["natural-makeup", "everyday-makeup", "soft-glam"],
  },
  {
    id: "round",
    name: "Round",
    summary:
      "Cheek width and face length feel similar; jawline is soft. Goal is gentle vertical lift, not harsh stripes.",
    blush: "Place color slightly higher and back toward temples rather than on the fullest apple only.",
    contour: "Cool taupe in cheek hollows, temples, and under jaw. Blend upward into the hairline, not toward the nose.",
    highlight: "Highlight above blush on cheekbones; skip heavy nose contour unless you prefer it for photos.",
    looks: ["everyday-makeup", "soft-glam", "smokey-eye"],
  },
  {
    id: "square",
    name: "Square",
    summary:
      "Forehead, cheekbones, and jaw read similar in width; jaw corners may feel angular. Soften edges with diffused shadow, not sharp lines.",
    blush: "Rounded blush placement on apples can soften angles; avoid horizontal blocks across the mid-face.",
    contour: "Blend contour along jaw corners and temples with a fluffy brush. Feather the edges so squares read softer on camera.",
    highlight: "Run highlight along cheekbones toward ears to draw the eye outward.",
    looks: ["office-makeup", "full-glam", "old-money-makeup"],
  },
  {
    id: "heart",
    name: "Heart",
    summary:
      "Forehead or cheek width may exceed a narrower chin. Balance the lower face with light contour and lifted blush. Avoid heavy forehead darkening.",
    blush: "Focus on mid-cheek and outer cheek lift; a touch of color on chin can balance a pointed chin if you want harmony in photos.",
    contour: "Soft shadow under cheekbones; very light jaw and chin contour only if chin reads sharply pointed in your mirror.",
    highlight: "Center-face highlight (nose, cupid's bow) can draw focus inward when forehead is wide.",
    looks: ["soft-glam", "bridal-makeup", "date-night-makeup"],
  },
  {
    id: "diamond",
    name: "Diamond",
    summary:
      "Cheekbones are the standout width; forehead and jaw are narrower. Contour minimally on cheeks. You already have structure.",
    blush: "Apply blush slightly under the cheekbone peak rather than on the highest point unless going editorial.",
    contour: "Light temple and jaw contour if you want to soften width at cheeks; many diamond faces need bronzer more than heavy sculpt.",
    highlight: "Forehead center and chin can add balance to narrower upper and lower thirds.",
    looks: ["minimalist-makeup", "clean-girl-makeup", "monochromatic-makeup"],
  },
  {
    id: "oblong",
    name: "Oblong",
    summary:
      "Face length exceeds width; forehead and jaw may feel similar. Horizontal placement tricks shorten the visual story.",
    blush: "Place blush more horizontally across apples and avoid dragging color too high toward hairline.",
    contour: "Optional light contour along hairline and chin to visually shorten; side-of-nose contour is optional.",
    highlight: "Keep highlight on cheekbones, not elongated down the full cheek vertical.",
    looks: ["korean-makeup", "clean-girl-makeup", "natural-makeup"],
  },
] as const;

const faqs = [
  {
    question: "Can face shape labels overlap?",
    answer:
      "Yes. Many people sit between round and oval or square and oblong. Use the closest label for placement, then adjust in a mirror.",
  },
  {
    question: "Does contour change my bone structure?",
    answer:
      "No. Makeup creates temporary shadow and light. Blend along real hollows for believable results.",
  },
];

export default function MakeupByFaceShapePage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <PageShell
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Makeup looks", href: "/makeup-looks" },
          { label: "By face shape" },
        ]}
        eyebrow="Placement"
        title="Makeup looks by face shape"
        lead="Where blush, contour, and highlight usually read best for six common shape descriptions. Confirm yours with a front-facing photo, not a celebrity side-by-side."
      >
        <p className="mt-10 text-[var(--foreground-muted)]">
          Read{" "}
          <Link href="/guides/blush-placement-by-face-shape" className="text-[var(--dusty-rose)] hover:underline">
            blush placement by face shape
          </Link>{" "}
          and{" "}
          <Link href="/guides/contour-for-round-faces" className="text-[var(--dusty-rose)] hover:underline">
            contour for round faces
          </Link>{" "}
          for deeper tutorials. The{" "}
          <Link href="/tools/face-shape-detector" className="text-[var(--dusty-rose)] hover:underline">
            face shape detector
          </Link>{" "}
          estimates proportions from landmarks.
        </p>

        <div className="mt-14 space-y-16">
          {SHAPES.map((shape) => (
            <section key={shape.id} id={shape.id} className="scroll-mt-24">
              <h2 className="font-serif text-3xl text-[var(--foreground)]">{shape.name} face</h2>
              <p className="mt-3 leading-relaxed text-[var(--foreground-muted)]">{shape.summary}</p>
              <dl className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="border border-[var(--border)] bg-[var(--white)] p-4">
                  <dt className="text-xs font-medium uppercase tracking-wide text-[var(--dusty-rose)]">Blush</dt>
                  <dd className="mt-2 text-sm text-[var(--foreground-muted)]">{shape.blush}</dd>
                </div>
                <div className="border border-[var(--border)] bg-[var(--white)] p-4">
                  <dt className="text-xs font-medium uppercase tracking-wide text-[var(--dusty-rose)]">Contour</dt>
                  <dd className="mt-2 text-sm text-[var(--foreground-muted)]">{shape.contour}</dd>
                </div>
                <div className="border border-[var(--border)] bg-[var(--white)] p-4">
                  <dt className="text-xs font-medium uppercase tracking-wide text-[var(--dusty-rose)]">Highlight</dt>
                  <dd className="mt-2 text-sm text-[var(--foreground-muted)]">{shape.highlight}</dd>
                </div>
              </dl>
              <p className="mt-4 text-sm text-[var(--foreground-muted)]">
                Suggested looks:{" "}
                {shape.looks.map((slug, i) => (
                  <span key={slug}>
                    {i > 0 && ", "}
                    <Link href={`/makeup-looks/${slug}`} className="text-[var(--dusty-rose)] hover:underline">
                      {slug.replace(/-/g, " ")}
                    </Link>
                  </span>
                ))}
              </p>
            </section>
          ))}
        </div>

        <div className="mt-16">
          <AnalyzeCta
            title="Detect your face shape from a selfie"
            body="Pull hair off your hairline, face the camera, and get a proportion-based label plus contour and blush overlays."
          />
        </div>
      </PageShell>
    </>
  );
}
