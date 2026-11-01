import Link from "next/link";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Page Not Found",
  description: "That page is not on MakeUp Face Ai. Browse makeup guides, looks, and tools instead.",
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 py-20 text-center">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--dusty-rose)]">404</p>
      <h1 className="mt-3 font-serif text-4xl text-[var(--foreground)]">This page isn&apos;t in our mirror</h1>
      <p className="mt-4 text-[var(--foreground-muted)]">
        The URL may have moved or never existed. Try the makeup hub, guides library, or AI analyzer.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="border border-[var(--border)] bg-[var(--white)] px-5 py-2.5 text-sm hover:border-[var(--dusty-rose)]/50"
        >
          Home
        </Link>
        <Link
          href="/makeup"
          className="border border-[var(--border)] bg-[var(--white)] px-5 py-2.5 text-sm hover:border-[var(--dusty-rose)]/50"
        >
          Makeup hub
        </Link>
        <Link href="/analyze" className="bg-[var(--dusty-rose)] px-5 py-2.5 text-sm font-medium text-[var(--on-accent)] hover:bg-[var(--dusty-rose-hover)]">
          Analyze my face
        </Link>
      </div>
    </div>
  );
}
