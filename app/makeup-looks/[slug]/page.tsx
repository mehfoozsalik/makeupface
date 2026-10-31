import Link from "next/link";
import { notFound } from "next/navigation";
import { AnalyzeCta } from "@/components/content/analyze-cta";
import { PageShell } from "@/components/content/page-shell";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/json-ld";
import { makeupLooks } from "@/data/makeup-styles";
import { beautyTools } from "@/data/tools";
import { createMetadata } from "@/lib/seo/metadata";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return makeupLooks.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const look = makeupLooks.find((l) => l.slug === slug);
  if (!look) return {};
  return createMetadata({
    title: look.seoTitle,
    description: look.seoDescription,
    path: `/makeup-looks/${look.slug}`,
  });
}

export default async function MakeupLookPage({ params }: Props) {
  const { slug } = await params;
  const look = makeupLooks.find((l) => l.slug === slug);
  if (!look) notFound();

  const related = look.relatedSlugs
    .map((s) => makeupLooks.find((l) => l.slug === s))
    .filter(Boolean);
  const tools = look.relatedTools
    .map((s) => beautyTools.find((t) => t.slug === s))
    .filter(Boolean);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Makeup looks", path: "/makeup-looks" },
          { name: look.title, path: `/makeup-looks/${look.slug}` },
        ])}
      />
      <PageShell
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Makeup looks", href: "/makeup-looks" },
          { label: look.title },
        ]}
        eyebrow={`${look.intensity} look for ${look.occasions.join(", ").replace(/_/g, " ")}`}
        title={look.title}
        lead={look.description}
      >
        <section className="mt-12">
          <h2 className="font-serif text-2xl text-[var(--foreground)]">What you will need</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--foreground-muted)]">
            {look.products.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="font-serif text-2xl text-[var(--foreground)]">Steps</h2>
          <ol className="mt-6 space-y-8">
            {look.steps.map((step, i) => (
              <li key={step.title} className="border-l-2 border-[var(--dusty-rose)]/40 pl-6">
                <p className="text-xs font-medium uppercase tracking-wider text-[var(--dusty-rose)]">
                  Step {i + 1}
                </p>
                <h3 className="mt-1 font-serif text-xl text-[var(--foreground)]">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-[var(--foreground-muted)]">{step.instruction}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-12 grid gap-6 sm:grid-cols-2">
          <div className="border border-[var(--border)] bg-[var(--background-secondary)]/40 p-6">
            <h2 className="font-serif text-xl text-[var(--foreground)]">Face shape notes</h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--foreground-muted)]">{look.faceShapeNotes}</p>
            <Link
              href="/makeup-looks-by-face-shape"
              className="mt-3 inline-block text-sm text-[var(--dusty-rose)] hover:underline"
            >
              Makeup by face shape →
            </Link>
          </div>
          <div className="border border-[var(--border)] bg-[var(--background-secondary)]/40 p-6">
            <h2 className="font-serif text-xl text-[var(--foreground)]">Eye shape notes</h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--foreground-muted)]">{look.eyeShapeNotes}</p>
            <Link href="/eye-makeup" className="mt-3 inline-block text-sm text-[var(--dusty-rose)] hover:underline">
              Eye makeup guide →
            </Link>
          </div>
        </section>

        {tools.length > 0 && (
          <section className="mt-12">
            <h2 className="font-serif text-2xl text-[var(--foreground)]">Helpful tools</h2>
            <ul className="mt-4 space-y-2">
              {tools.map((t) => (
                <li key={t!.slug}>
                  <Link href={`/tools#${t!.slug}`} className="text-[var(--dusty-rose)] hover:underline">
                    {t!.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="font-serif text-2xl text-[var(--foreground)]">Related looks</h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              {related.map((r) => (
                <li key={r!.slug}>
                  <Link
                    href={`/makeup-looks/${r!.slug}`}
                    className="border border-[var(--border)] bg-[var(--white)] px-4 py-2 text-sm hover:border-[var(--dusty-rose)]/50"
                  >
                    {r!.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mt-14">
          <AnalyzeCta
            title={`Personalize this ${look.title.toLowerCase()} routine`}
            body="Upload a selfie to see whether your proportions suggest adjusting blush, liner, or contour for this look."
          />
        </div>
      </PageShell>
    </>
  );
}
