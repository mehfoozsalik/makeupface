import { Suspense } from "react";
import Link from "next/link";
import { AnalyzeCta } from "@/components/content/analyze-cta";
import { MakeupHubBlog } from "@/components/makeup/hub-blog";
import { Accordion } from "@/components/ui/accordion";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { homepageFaqs } from "@/data/faqs";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Makeup Hub for Eyes, Lips and Face",
  description:
    "Fresh AI written makeup guides each day, with Unsplash photos and tips you can take to the mirror. Face, eyes, lips, and looks.",
  path: "/makeup",
});

const hubFaqs = [
  homepageFaqs[6] ?? {
    question: "Where should a beginner start?",
    answer:
      "Start with skin prep and a light base, then brows and a lip tint. Add eye makeup once the face looks even.",
  },
  homepageFaqs[4] ?? {
    question: "What is the difference between undertone and skin depth?",
    answer:
      "Depth is how light or deep skin appears. Undertone is the hue beneath: warm, cool, or neutral.",
  },
  {
    question: "Should I start with face, eyes, or lips?",
    answer:
      "Most routines build outward: even base and brows first, then eyes, then lips last so you can balance intensity. If you only have five minutes, skip shadow and focus on skin, brows, and a lip tint.",
  },
];

export default function MakeupHubPage() {
  return (
    <article className="pb-20">
      <header className="border-b border-[var(--border)] bg-[var(--background-secondary)]/50">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Makeup Hub" }]}
            className="mb-6"
          />
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--dusty-rose)]">
            From the beauty desk
          </p>
          <h1 className="mt-3 font-serif text-4xl text-[var(--foreground)] sm:text-5xl md:text-6xl">
            Makeup Hub
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--foreground-muted)]">
            A new long makeup guide most days, written for real mirrors. No
            recycled filler cards. Just the latest desk posts.
          </p>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[var(--foreground-muted)]">
            <Link href="/face-makeup" className="hover:text-[var(--dusty-rose)]">
              Face
            </Link>
            <span aria-hidden className="text-[var(--border)]">
              /
            </span>
            <Link href="/eye-makeup" className="hover:text-[var(--dusty-rose)]">
              Eyes
            </Link>
            <span aria-hidden className="text-[var(--border)]">
              /
            </span>
            <Link href="/lip-makeup" className="hover:text-[var(--dusty-rose)]">
              Lips
            </Link>
            <span aria-hidden className="text-[var(--border)]">
              /
            </span>
            <Link href="/guides" className="hover:text-[var(--dusty-rose)]">
              All guides
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <Suspense
          fallback={
            <div className="border border-[var(--border)] bg-[var(--white)] px-6 py-14 text-center text-sm text-[var(--foreground-muted)]">
              Loading latest posts…
            </div>
          }
        >
          <MakeupHubBlog />
        </Suspense>

        <div className="mt-16">
          <AnalyzeCta />
        </div>

        <section className="mx-auto mt-16 max-w-3xl">
          <h2 className="font-serif text-2xl text-[var(--foreground)]">
            Common questions
          </h2>
          <Accordion items={hubFaqs} className="mt-4" />
        </section>

        <p className="mt-12 text-center text-sm text-[var(--foreground-muted)]">
          Also explore{" "}
          <Link
            href="/makeup-looks-by-face-shape"
            className="text-[var(--dusty-rose)] hover:underline"
          >
            makeup by face shape
          </Link>
          ,{" "}
          <Link href="/tools" className="text-[var(--dusty-rose)] hover:underline">
            beauty tools
          </Link>
          , and{" "}
          <Link
            href="/cat-face-makeup"
            className="text-[var(--dusty-rose)] hover:underline"
          >
            cat face makeup
          </Link>
          .
        </p>
      </div>
    </article>
  );
}
