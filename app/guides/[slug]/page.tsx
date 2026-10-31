import Link from "next/link";
import { notFound } from "next/navigation";
import { AnalyzeCta } from "@/components/content/analyze-cta";
import { PageShell } from "@/components/content/page-shell";
import { Accordion } from "@/components/ui/accordion";
import { JsonLd, articleJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/components/seo/json-ld";
import { guides } from "@/data/guides";
import { makeupLooks } from "@/data/makeup-styles";
import { beautyTools } from "@/data/tools";
import { createMetadata } from "@/lib/seo/metadata";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) return {};
  return createMetadata({
    title: guide.seoTitle,
    description: guide.seoDescription,
    path: `/guides/${guide.slug}`,
  });
}

function slugToAnchor(heading: string) {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default async function GuideArticlePage({ params }: Props) {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) notFound();

  const relatedGuideLinks = guide.relatedGuides
    .map((s) => guides.find((g) => g.slug === s))
    .filter(Boolean);
  const relatedLooks = guide.relatedLooks
    .map((s) => makeupLooks.find((l) => l.slug === s))
    .filter(Boolean);
  const relatedToolLinks = guide.relatedTools
    .map((s) => beautyTools.find((t) => t.slug === s))
    .filter(Boolean);

  const jsonLdItems: Record<string, unknown>[] = [
    articleJsonLd({
      title: guide.title,
      description: guide.seoDescription,
      path: `/guides/${guide.slug}`,
    }),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Guides", path: "/guides" },
      { name: guide.title, path: `/guides/${guide.slug}` },
    ]),
  ];
  if (guide.faqs.length > 0) jsonLdItems.push(faqJsonLd(guide.faqs));

  return (
    <>
      <JsonLd data={jsonLdItems} />
      <PageShell
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Guides", href: "/guides" },
          { label: guide.title },
        ]}
        eyebrow={`${guide.category}, ${guide.readTimeMinutes} min read`}
        title={guide.title}
        lead={guide.excerpt}
      >
        {guide.sections.length > 1 && (
          <nav aria-label="Table of contents" className="mt-10 border border-[var(--border)] bg-[var(--white)] p-5">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--foreground-muted)]">
              On this page
            </p>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm">
              {guide.sections.map((s) => {
                const id = slugToAnchor(s.heading);
                return (
                  <li key={s.heading}>
                    <a href={`#${id}`} className="text-[var(--dusty-rose)] hover:underline">
                      {s.heading}
                    </a>
                  </li>
                );
              })}
            </ol>
          </nav>
        )}

        <div className="prose-beauty mt-12">
          {guide.sections.map((s) => {
            const id = slugToAnchor(s.heading);
            return (
              <section key={s.heading} id={id} className="scroll-mt-24">
                <h2>{s.heading}</h2>
                <p>{s.body}</p>
              </section>
            );
          })}
        </div>

        {(relatedToolLinks.length > 0 || relatedLooks.length > 0 || relatedGuideLinks.length > 0) && (
          <aside className="mt-14 grid gap-8 border-t border-[var(--border)] pt-12 sm:grid-cols-3">
            {relatedToolLinks.length > 0 && (
              <div>
                <h2 className="text-xs font-medium uppercase tracking-wide text-[var(--foreground-muted)]">Tools</h2>
                <ul className="mt-3 space-y-2 text-sm">
                  {relatedToolLinks.map((t) => (
                    <li key={t!.slug}>
                      <Link href={`/tools#${t!.slug}`} className="hover:text-[var(--dusty-rose)]">
                        {t!.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {relatedLooks.length > 0 && (
              <div>
                <h2 className="text-xs font-medium uppercase tracking-wide text-[var(--foreground-muted)]">Looks</h2>
                <ul className="mt-3 space-y-2 text-sm">
                  {relatedLooks.map((l) => (
                    <li key={l!.slug}>
                      <Link href={`/makeup-looks/${l!.slug}`} className="hover:text-[var(--dusty-rose)]">
                        {l!.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {relatedGuideLinks.length > 0 && (
              <div>
                <h2 className="text-xs font-medium uppercase tracking-wide text-[var(--foreground-muted)]">
                  Related guides
                </h2>
                <ul className="mt-3 space-y-2 text-sm">
                  {relatedGuideLinks.map((g) => (
                    <li key={g!.slug}>
                      <Link href={`/guides/${g!.slug}`} className="hover:text-[var(--dusty-rose)]">
                        {g!.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        )}

        {guide.faqs.length > 0 && (
          <section className="mt-14">
            <h2 className="font-serif text-2xl text-[var(--foreground)]">FAQ</h2>
            <Accordion items={guide.faqs} className="mt-4" />
          </section>
        )}

        <div className="mt-14">
          <AnalyzeCta />
        </div>
      </PageShell>
    </>
  );
}
