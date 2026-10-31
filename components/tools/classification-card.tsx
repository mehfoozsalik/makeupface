"use client";

import { cn } from "@/lib/utils/cn";

export function ClassificationCard({
  label,
  primary,
  confidence,
  alternatives,
  rationale,
  uncertain,
  className,
}: {
  label: string;
  primary: string;
  confidence: number;
  alternatives: string[];
  rationale: string;
  uncertain?: boolean;
  className?: string;
}) {
  const pct = Math.round(confidence * 100);
  return (
    <div
      className={cn(
        "border border-[var(--border)] bg-[var(--white)] p-5 sm:p-6",
        className
      )}
    >
      <p className="text-xs uppercase tracking-wide text-[var(--foreground-muted)]">{label}</p>
      <p className="mt-1 font-serif text-2xl capitalize text-[var(--foreground)]">
        {primary.replace(/_/g, " ")}
      </p>
      <p className="mt-2 text-sm text-[var(--foreground-muted)]">
        Confidence: {pct}%
        {uncertain && (
          <span className="ml-2 text-[var(--dusty-rose)]">(double check in a mirror)</span>
        )}
      </p>
      {alternatives.length > 0 && (
        <p className="mt-2 text-sm text-[var(--foreground-muted)]">
          Also consider:{" "}
          <span className="capitalize text-[var(--foreground)]">
            {alternatives.map((a) => a.replace(/_/g, " ")).join(", ")}
          </span>
        </p>
      )}
      <p className="mt-4 text-sm leading-relaxed text-[var(--foreground-muted)]">{rationale}</p>
    </div>
  );
}

export function MetricGrid({
  metrics,
}: {
  metrics: { label: string; value: string; hint?: string }[];
}) {
  return (
    <dl className="grid gap-3 sm:grid-cols-2">
      {metrics.map((m) => (
        <div key={m.label} className="border border-[var(--border)] bg-[var(--background-secondary)] p-4">
          <dt className="text-xs text-[var(--foreground-muted)]">{m.label}</dt>
          <dd className="mt-1 font-medium text-[var(--foreground)]">{m.value}</dd>
          {m.hint && (
            <dd className="mt-1 text-xs text-[var(--foreground-muted)]">{m.hint}</dd>
          )}
        </div>
      ))}
    </dl>
  );
}

export function ResultPanel({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("space-y-4", className)}>
      <h3 className="font-serif text-xl text-[var(--foreground)]">{title}</h3>
      {children}
    </section>
  );
}
