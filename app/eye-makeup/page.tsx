import Link from "next/link";
import { AnalyzeCta } from "@/components/content/analyze-cta";
import { PageShell } from "@/components/content/page-shell";
import { Accordion } from "@/components/ui/accordion";
import { guides } from "@/data/guides";
import { beautyTools } from "@/data/tools";
import { JsonLd, faqJsonLd } from "@/components/seo/json-ld";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Eye Makeup Guide: Shadow, Liner & Brows",
  description:
    "Eye makeup for hooded, almond, and deep-set lids. Eyeshadow placement, tightlining, brow mapping, and tools that respect your lid space.",
  path: "/eye-makeup",
});

const eyeFaqs = [
  beautyTools.find((t) => t.slug === "eye-shape-detector")!.faqs[0],
  beautyTools.find((t) => t.slug === "eyeliner-style-finder")!.faqs[0],
  {
    question: "Why does eyeshadow disappear on hooded eyes?",
    answer:
      "Color placed only in the mobile lid hides when you open your eyes. Blend transition shade above the visible crease line you see when looking straight ahead.",
  },
];

const eyeGuides = guides.filter((g) => g.category === "eyes");

export default function EyeMakeupPage() {
  const eyeTools = beautyTools.filter((t) => t.category === "eye");

  return (
    <>
      <JsonLd data={faqJsonLd(eyeFaqs)} />
      <PageShell
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Makeup", href: "/makeup" },
          { label: "Eye makeup" },
        ]}
        eyebrow="Eyes & brows"
        title="Eye makeup shaped to your lid space"
        lead="The same smoky palette reads dramatic on wide lids and heavy on hooded ones. Nail your shape first, then pick depth, liner, and lash focus."
      >
        <div className="prose-beauty mt-12">
          <h2>Know your eye shape first</h2>
          <p>
            Almond, hooded, monolid, downturned, and upturned traits overlap. Identify what limits your lid visibility
            and where your crease folds when eyes are open. The{" "}
            <Link href="/tools/eye-shape-detector" className="text-[var(--dusty-rose)] hover:underline">
              eye shape detector
            </Link>{" "}
            uses landmarks from a front-facing photo; treat the label as a placement guide, not a box.
          </p>

          <h2>Eyeshadow structure</h2>
          <p>
            A three-shade stack covers most days: bone or light matte on the brow bone, medium transition in the crease,
            deeper shade on the outer third. Shimmer belongs on the center lid or inner corner for openness, not always
            all over. Hooded eyes benefit from{" "}
            <Link href="/guides/eyeshadow-for-hooded-eyes" className="text-[var(--dusty-rose)] hover:underline">
              crease placement above the fold
            </Link>
            . For event looks, see{" "}
            <Link href="/guides/soft-glam-eyes" className="text-[var(--dusty-rose)] hover:underline">
              soft glam eye structure
            </Link>
            .
          </p>

          <h2>Liner and lashes</h2>
          <p>
            Tightlining deposits pigment between upper lashes for density without eating lid space. Ideal for office and
            natural looks (
            <Link href="/guides/tightlining-basics" className="text-[var(--dusty-rose)] hover:underline">
              tightlining basics
            </Link>
            ). Wings should clear hooded folds when eyes are open; the{" "}
            <Link href="/tools/eyeliner-style-finder" className="text-[var(--dusty-rose)] hover:underline">
              eyeliner style finder
            </Link>{" "}
            suggests wing length, smudge, or pencil styles by skill and occasion.
          </p>

          <h2>Brows frame everything</h2>
          <p>
            Brows balance face length and eye spacing. Map start, arch, and tail before tweezing.{" "}
            <Link href="/guides/eyebrow-mapping-basics" className="text-[var(--dusty-rose)] hover:underline">
              eyebrow mapping for beginners
            </Link>
            . Fill sparse gaps with hair-like strokes; soap brows add texture but should still follow your bone
            structure.
          </p>
        </div>

        <section className="mt-14">
          <h2 className="font-serif text-2xl text-[var(--foreground)]">Eye makeup tutorials</h2>
          <ul className="mt-6 space-y-4">
            {eyeGuides.map((g) => (
              <li key={g.slug}>
                <Link href={`/guides/${g.slug}`} className="font-serif text-xl text-[var(--foreground)] hover:text-[var(--dusty-rose)]">
                  {g.title}
                </Link>
                <p className="mt-1 text-sm text-[var(--foreground-muted)]">{g.excerpt}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="font-serif text-2xl text-[var(--foreground)]">Looks with strong eye focus</h2>
          <ul className="mt-4 space-y-2 text-[var(--foreground-muted)]">
            <li>
              <Link href="/makeup-looks/smokey-eye" className="text-[var(--foreground)] hover:text-[var(--dusty-rose)]">
                Smokey eye
              </Link>
              : gradated depth with nude lip balance
            </li>
            <li>
              <Link href="/makeup-looks/soft-glam" className="text-[var(--foreground)] hover:text-[var(--dusty-rose)]">
                Soft glam
              </Link>
              : neutrals and fluttery lashes
            </li>
            <li>
              <Link href="/makeup-looks/office-makeup" className="text-[var(--foreground)] hover:text-[var(--dusty-rose)]">
                Office makeup
              </Link>
              : matte lids for long screen days
            </li>
            <li>
              <Link href="/cat-face-makeup" className="text-[var(--foreground)] hover:text-[var(--dusty-rose)]">
                Cat face makeup
              </Link>
              : graphic wings for costume events
            </li>
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="font-serif text-2xl text-[var(--foreground)]">Eye tools</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {eyeTools.map((t) => (
              <li key={t.slug}>
                <Link href={`/tools#${t.slug}`} className="block border border-[var(--border)] bg-[var(--white)] p-4 hover:border-[var(--dusty-rose)]/50">
                  <span className="font-medium">{t.title}</span>
                  <p className="mt-1 text-sm text-[var(--foreground-muted)] line-clamp-2">{t.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-14">
          <AnalyzeCta
            title="See eyeshadow zones on your photo"
            body="The eyeshadow placement guide overlays transition, crease, and lid zones based on your detected eye shape."
          />
        </div>

        <Accordion items={eyeFaqs} className="mt-14" />
      </PageShell>
    </>
  );
}
