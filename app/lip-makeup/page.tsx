import Link from "next/link";
import { AnalyzeCta } from "@/components/content/analyze-cta";
import { PageShell } from "@/components/content/page-shell";
import { Accordion } from "@/components/ui/accordion";
import { guides } from "@/data/guides";
import { beautyTools } from "@/data/tools";
import { JsonLd, faqJsonLd } from "@/components/seo/json-ld";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Lip Makeup Guide: Liner, Color & Long Wear",
  description:
    "Learn lip liner, undertone-friendly lipstick, gradient and gloss techniques, and symmetry tips. Pair with our lip shape and shade tools.",
  path: "/lip-makeup",
});

const lipFaqs = [
  beautyTools.find((t) => t.slug === "lip-shape-detector")!.faqs[0],
  beautyTools.find((t) => t.slug === "lipstick-shade-finder")!.faqs[0],
  beautyTools.find((t) => t.slug === "lip-liner-guide")!.faqs[0],
];

export default function LipMakeupPage() {
  const lipGuides = guides.filter((g) => g.category === "lips" || g.slug === "undertone-vs-surface-tone");
  const lipTools = beautyTools.filter((t) => t.category === "lip");

  return (
    <>
      <JsonLd data={faqJsonLd(lipFaqs)} />
      <PageShell
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Makeup", href: "/makeup" },
          { label: "Lip makeup" },
        ]}
        eyebrow="Lips"
        title="Lip makeup that matches your undertone and lip shape"
        lead="Lips change a look's mood in one swipe. The wrong undertone turns chalky or orange fast. Shape-aware liner keeps enhancements believable in daylight."
      >
        <div className="prose-beauty mt-12">
          <h2>Undertone before shade name</h2>
          <p>
            Blue-reds flatter cool undertones; coral and tomato red often suit warm skin; mauves bridge neutral
            wardrobes. Your natural lip pigment changes how bullet color reads. Swatch on lips, not hands. Start with{" "}
            <Link href="/guides/undertone-vs-surface-tone" className="text-[var(--dusty-rose)] hover:underline">
              undertone vs surface tone
            </Link>{" "}
            and the{" "}
            <Link href="/tools/lipstick-shade-finder" className="text-[var(--dusty-rose)] hover:underline">
              lipstick shade finder
            </Link>
            .
          </p>

          <h2>Liner for definition and wear time</h2>
          <p>
            Liner one shade deeper than lipstick adds dimension; an exact match increases longevity. Blur the border
            when slightly overlining. Harsh outlines outside the vermilion border show up in photos.{" "}
            <Link href="/guides/lip-liner-for-definition" className="text-[var(--dusty-rose)] hover:underline">
              Lip liner techniques
            </Link>{" "}
            and the{" "}
            <Link href="/tools/lip-liner-guide" className="text-[var(--dusty-rose)] hover:underline">
              interactive lip liner guide
            </Link>{" "}
            walk through symmetry fixes.
          </p>

          <h2>Finishes and trends</h2>
          <p>
            Matte lips photograph crisp but emphasize texture; satin and balm finishes forgive dry skin. K-beauty
            gradient lips concentrate tint at the center. See{" "}
            <Link href="/makeup-looks/korean-makeup" className="text-[var(--dusty-rose)] hover:underline">
              Korean-inspired makeup
            </Link>
            . Clean girl aesthetics favor gloss over heavy liner.{" "}
            <Link href="/makeup-looks/clean-girl-makeup" className="text-[var(--dusty-rose)] hover:underline">
              clean girl makeup
            </Link>
            .
          </p>

          <h2>Balance with eyes</h2>
          <p>
            Strong smokey eyes pair with nude or mauve lips; a bold lip often needs softer shadow. Monochromatic looks
            use one color family across cheeks and lips.{" "}
            <Link href="/guides/monochromatic-makeup-how-to" className="text-[var(--dusty-rose)] hover:underline">
              monochromatic makeup how-to
            </Link>
            .
          </p>
        </div>

        <section className="mt-14">
          <h2 className="font-serif text-2xl text-[var(--foreground)]">Lip guides</h2>
          <ul className="mt-6 space-y-4">
            {lipGuides.map((g) => (
              <li key={g.slug}>
                <Link href={`/guides/${g.slug}`} className="font-medium hover:text-[var(--dusty-rose)]">
                  {g.title}
                </Link>
                <p className="text-sm text-[var(--foreground-muted)]">{g.excerpt}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="font-serif text-2xl text-[var(--foreground)]">Lip tools</h2>
          <ul className="mt-6 space-y-3">
            {lipTools.map((t) => (
              <li key={t.slug}>
                <Link href={`/tools#${t.slug}`} className="text-[var(--foreground)] hover:text-[var(--dusty-rose)]">
                  {t.title}
                </Link>
                <span className="text-sm text-[var(--foreground-muted)]">
                  {" "}
                  {t.description.slice(0, 100)}…
                </span>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-14">
          <AnalyzeCta
            title="Analyze lip shape from your selfie"
            body="Landmarks outline cupid's bow and corners so liner tips target your symmetry, not generic overlining advice."
          />
        </div>

        <Accordion items={lipFaqs} className="mt-14" />
      </PageShell>
    </>
  );
}
