import Link from "next/link";
import { PageShell } from "@/components/content/page-shell";
import { AnalyzeCta } from "@/components/content/analyze-cta";
import { guides, type GuideArticle } from "@/data/guides";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Makeup Guides: Skin, Face, Eyes & Lips",
  description:
    "Editorial makeup guides on primer, undertone, hooded eyes, bridal timelines, and product hygiene. Filter by category and read time.",
  path: "/guides",
});

const CATEGORY_LABELS: Record<GuideArticle["category"], string> = {
  basics: "Basics",
  face: "Face",
  eyes: "Eyes",
  lips: "Lips",
  skin: "Skin",
  products: "Products",
  celebrity: "Celebrity style",
  occasion: "Occasion",
};

export default function GuidesDirectoryPage() {
  const byCategory = guides.reduce(
    (acc, g) => {
      (acc[g.category] ||= []).push(g);
      return acc;
    },
    {} as Record<string, GuideArticle[]>
  );

  return (
    <PageShell
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Guides" }]}
      eyebrow="Library"
      title="Makeup guides written for real routines"
      lead="Technique and product categories, no fake reviews or paid partnerships. Pick a topic below or start with skin prep and undertone matching."
    >
      <p className="mt-8 text-[var(--foreground-muted)]">
        New to makeup? Begin with{" "}
        <Link href="/guides/skin-prep-before-makeup" className="text-[var(--dusty-rose)] hover:underline">
          skin prep
        </Link>
        ,{" "}
        <Link href="/guides/undertone-vs-surface-tone" className="text-[var(--dusty-rose)] hover:underline">
          undertone basics
        </Link>
        , and the{" "}
        <Link href="/makeup" className="text-[var(--dusty-rose)] hover:underline">
          makeup hub
        </Link>
        .
      </p>

      <div className="mt-14 space-y-14">
        {(Object.keys(CATEGORY_LABELS) as GuideArticle["category"][]).map((cat) => {
          const items = byCategory[cat];
          if (!items?.length) return null;
          return (
            <section key={cat}>
              <h2 className="font-serif text-2xl text-[var(--foreground)]">{CATEGORY_LABELS[cat]}</h2>
              <ul className="mt-6 divide-y divide-[var(--border)] border border-[var(--border)] bg-[var(--white)]">
                {items.map((g) => (
                  <li key={g.slug}>
                    <Link
                      href={`/guides/${g.slug}`}
                      className="flex flex-col gap-1 px-5 py-5 transition-colors hover:bg-[var(--background-secondary)]/50 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <span className="font-serif text-xl text-[var(--foreground)]">{g.title}</span>
                        <p className="mt-1 text-sm text-[var(--foreground-muted)] line-clamp-2">{g.excerpt}</p>
                      </div>
                      <span className="shrink-0 text-xs text-[var(--foreground-muted)]">
                        {g.readTimeMinutes} min read
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      <div className="mt-16">
        <AnalyzeCta body="Landmark-based analysis complements these guides with placement maps for your face and eyes." />
      </div>
    </PageShell>
  );
}
