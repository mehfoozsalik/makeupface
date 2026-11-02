import Link from "next/link";
import { AnalyzeCta } from "@/components/content/analyze-cta";
import { PageShell } from "@/components/content/page-shell";
import { Accordion } from "@/components/ui/accordion";
import { guides } from "@/data/guides";
import { beautyTools } from "@/data/tools";
import { JsonLd, faqJsonLd } from "@/components/seo/json-ld";
import { homepageFaqs } from "@/data/faqs";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Face Makeup Guide: Base, Blush & Contour",
  description:
    "Learn face makeup from skin prep through foundation, color correction, blush placement, and contour. Editorial tips plus links to free AI placement tools.",
  path: "/face-makeup",
});

const faceFaqs = [
  homepageFaqs.find((f) => f.question === "What is face makeup?")!,
  homepageFaqs.find((f) => f.question === "How to apply foundation on face?")!,
  homepageFaqs.find((f) => f.question === "What are some good face makeup products?")!,
  {
    question: "Why does foundation look gray on my skin?",
    answer:
      "Usually the undertone is off. Cool foundation on warm skin reads ashy. Match at the jawline in daylight and adjust depth when you tan, not undertone.",
  },
  {
    question: "Do I need primer every day?",
    answer:
      "Only if you have a specific goal: oil control, blur, or grip. Many sheer routines skip primer and use a good moisturizer instead.",
  },
  beautyTools.find((t) => t.slug === "contour-placement-guide")!.faqs[0],
];

const relatedGuides = guides.filter((g) =>
  ["face", "skin", "basics"].includes(g.category)
).slice(0, 6);

export default function FaceMakeupPage() {
  const faceTools = beautyTools.filter((t) => t.category === "face" || t.slug.includes("blush") || t.slug.includes("contour"));

  return (
    <>
      <JsonLd data={faqJsonLd(faceFaqs)} />
      <PageShell
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Makeup", href: "/makeup" },
          { label: "Face makeup" },
        ]}
        eyebrow="Face"
        title="Face makeup that respects your structure"
        lead="Base makeup is not about erasing your face. It evens the canvas so blush, bronzer, and highlight sit where they lift. These principles work with drugstore or luxury formulas."
      >
        <div className="prose-beauty mt-12">
          <h2>Skin prep is face makeup</h2>
          <p>
            Hydrated skin accepts pigment evenly. Cleanse gently, layer moisturizer from thinnest to thickest, and
            wait a few minutes before primer. If you wear SPF in the morning, let it set. Rushing causes pilling under
            foundation. Read our{" "}
            <Link href="/guides/skin-prep-before-makeup" className="text-[var(--dusty-rose)] hover:underline">
              skin prep layering guide
            </Link>{" "}
            for dry, oily, and combination routines.
          </p>

          <h2>Foundation and undertone</h2>
          <p>
            Match at the jaw where face meets neck in natural light. Surface tone shifts with sun; undertone usually
            stays stable. When in doubt, compare two shades half on each cheek and check in a window, not bathroom
            LEDs. The{" "}
            <Link href="/tools/foundation-shade-finder" className="text-[var(--dusty-rose)] hover:underline">
              foundation shade finder
            </Link>{" "}
            narrows depth and undertone families before you swatch in store.
          </p>

          <h2>Color correction before concealer</h2>
          <p>
            Neutralize redness with sheer green primer on cheeks, not thick green all over. Under-eye circles often
            need peach or salmon correctors on medium to deep skin and pink-peach on fair cool tones. Follow with
            skin-tone concealer. See{" "}
            <Link href="/guides/color-correction-basics" className="text-[var(--dusty-rose)] hover:underline">
              color correction basics
            </Link>
            .
          </p>

          <h2>Blush and contour placement</h2>
          <p>
            Blush lifts when swept from the apple toward the temple. Contour belongs in hollows, temples, and along
            the jaw, not as stripes on the cheek apple. Face shape changes where those zones read best. Use the{" "}
            <Link href="/tools/face-shape-detector" className="text-[var(--dusty-rose)] hover:underline">
              face shape detector
            </Link>{" "}
            and{" "}
            <Link href="/makeup-looks-by-face-shape" className="text-[var(--dusty-rose)] hover:underline">
              makeup by face shape
            </Link>{" "}
            page for tailored maps.
          </p>

          <h2>Setting without cake</h2>
          <p>
            Powder where you get oily; setting spray over the whole face to meld layers. Over-powdering every zone
            creates rebound shine on oily skin by midday.{" "}
            <Link href="/guides/setting-powder-vs-spray" className="text-[var(--dusty-rose)] hover:underline">
              Setting powder vs spray
            </Link>{" "}
            explains zone strategy.
          </p>
        </div>

        <section className="mt-14">
          <h2 className="font-serif text-2xl text-[var(--foreground)]">Face-focused guides</h2>
          <ul className="mt-6 space-y-3">
            {relatedGuides.map((g) => (
              <li key={g.slug}>
                <Link href={`/guides/${g.slug}`} className="font-medium text-[var(--foreground)] hover:text-[var(--dusty-rose)]">
                  {g.title}
                </Link>
                <p className="text-sm text-[var(--foreground-muted)]">{g.excerpt}</p>
              </li>
            ))}
          </ul>
          <Link href="/guides" className="mt-4 inline-block text-sm text-[var(--dusty-rose)]">
            All guides →
          </Link>
        </section>

        <section className="mt-14">
          <h2 className="font-serif text-2xl text-[var(--foreground)]">Free face tools</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {faceTools.slice(0, 6).map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/tools#${t.slug}`}
                  className="block border border-[var(--border)] bg-[var(--white)] px-4 py-3 text-sm hover:border-[var(--dusty-rose)]/50"
                >
                  <span className="font-medium text-[var(--foreground)]">{t.title}</span>
                  <p className="mt-1 text-[var(--foreground-muted)] line-clamp-2">{t.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-14">
          <AnalyzeCta
            title="Map blush and contour to your proportions"
            body="Our analyzer reads cheekbone height and face width from a selfie so bronzer and blush land on your face, not a generic diagram."
          />
        </div>

        <section className="mt-14">
          <h2 className="font-serif text-2xl text-[var(--foreground)]">Face makeup FAQ</h2>
          <Accordion items={faceFaqs} className="mt-4" />
        </section>

        <p className="mt-10 text-sm text-[var(--foreground-muted)]">
          Next:{" "}
          <Link href="/eye-makeup" className="text-[var(--dusty-rose)] hover:underline">
            eye makeup
          </Link>{" "}
          ,{" "}
          <Link href="/lip-makeup" className="text-[var(--dusty-rose)] hover:underline">
            lip makeup
          </Link>
          , and{" "}
          <Link href="/makeup-looks/natural-makeup" className="text-[var(--dusty-rose)] hover:underline">
            natural makeup look
          </Link>
        </p>
      </PageShell>
    </>
  );
}
