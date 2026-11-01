import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function AnalyzeCta({
  title = "Get placement matched to your face",
  body = "Upload a selfie for on-device landmark mapping. You’ll get contour, blush, and feature tips you can use with whatever is already in your bag.",
  compact = false,
}: {
  title?: string;
  body?: string;
  compact?: boolean;
}) {
  return (
    <aside
      className={
        compact
          ? "glass-panel rounded-2xl p-6"
          : "glass-panel rounded-3xl p-8 sm:p-10"
      }
    >
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--dusty-rose)]">
        MakeUp Face Ai
      </p>
      <h2 className="mt-2 font-serif text-2xl text-[var(--foreground)] sm:text-3xl">{title}</h2>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--foreground-muted)] sm:text-base">
        {body}
      </p>
      <Link
        href="/analyze"
        className="glass-button mt-6 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-[var(--on-accent)] transition-colors hover:bg-[var(--dusty-rose-hover)]"
      >
        Analyze my face
        <ArrowRight className="size-4" aria-hidden />
      </Link>
    </aside>
  );
}
