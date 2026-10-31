import Link from "next/link";
import { AnalyzeCta } from "@/components/content/analyze-cta";
import { PageShell } from "@/components/content/page-shell";
import { Accordion } from "@/components/ui/accordion";
import { beautyTools } from "@/data/tools";
import type { BeautyTool } from "@/types/tools";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Free Beauty Tools: Face, Eye, Lip & Makeup",
  description:
    "Free online beauty tools: face shape detector, eye shape analysis, undertone quiz, contour maps, and routine generators. Photo-based or quiz-based, with honest guidance.",
  path: "/tools",
});

const CATEGORY_ORDER: BeautyTool["category"][] = ["face", "eye", "lip", "skin", "makeup"];

const CATEGORY_TITLES: Record<BeautyTool["category"], string> = {
  face: "Face structure",
  eye: "Eyes & brows",
  lip: "Lips",
  skin: "Skin & base",
  makeup: "Looks & routines",
};

export default function ToolsDirectoryPage() {
  const grouped = CATEGORY_ORDER.map((cat) => ({
    cat,
    tools: beautyTools.filter((t) => t.category === cat),
  }));

  const featuredFaqs = beautyTools
    .flatMap((t) => t.faqs.slice(0, 1).map((f) => ({ ...f, tool: t.title })))
    .slice(0, 5);

  return (
    <PageShell
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Beauty tools" }]}
      eyebrow="Free tools"
      title="Beauty tools for placement, shade, and routine planning"
      lead="Some tools read a front-facing photo with on-device landmarks. Others use short quizzes. Everything here is makeup education, not medical diagnosis or a guaranteed shade match."
    >
      <p className="mt-8 text-[var(--foreground-muted)]">
        Ready for a full recommendation pass? Start at{" "}
        <Link href="/analyze" className="font-medium text-[var(--dusty-rose)] hover:underline">
          AI makeup analysis
        </Link>{" "}
        instead of individual calculators.
      </p>

      <div className="mt-14 space-y-16">
        {grouped.map(({ cat, tools }) => (
          <section key={cat} id={cat}>
            <h2 className="font-serif text-3xl text-[var(--foreground)]">{CATEGORY_TITLES[cat]}</h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {tools.map((tool) => (
                <li key={tool.slug} id={tool.slug} className="scroll-mt-24">
                  <div className="h-full border border-[var(--border)] bg-[var(--white)] p-5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-serif text-xl text-[var(--foreground)]">{tool.title}</h3>
                      {tool.usesMediaPipe && (
                        <span className="shrink-0 text-[10px] uppercase tracking-wide text-[var(--dusty-rose)]">
                          Photo
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--foreground-muted)]">
                      {tool.description}
                    </p>
                    <Link
                      href={`/tools/${tool.slug}`}
                      className="mt-4 inline-block text-sm font-medium text-[var(--dusty-rose)] hover:underline"
                    >
                      Open tool →
                    </Link>
                    {tool.relatedGuides[0] && (
                      <p className="mt-2 text-xs text-[var(--foreground-muted)]">
                        Guide:{" "}
                        <Link
                          href={`/guides/${tool.relatedGuides[0]}`}
                          className="text-[var(--foreground)] hover:text-[var(--dusty-rose)]"
                        >
                          {tool.relatedGuides[0].replace(/-/g, " ")}
                        </Link>
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <section className="mt-16">
        <h2 className="font-serif text-2xl text-[var(--foreground)]">Tool FAQ snippets</h2>
        <Accordion
          items={featuredFaqs.map((f) => ({
            question: `${f.tool}: ${f.question}`,
            answer: f.answer,
          }))}
          className="mt-4"
        />
      </section>

      <div className="mt-16">
        <AnalyzeCta title="Run all placement tools from one upload" />
      </div>
    </PageShell>
  );
}
