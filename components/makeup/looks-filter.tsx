"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { MakeupLook } from "@/types/makeup";

const OCCASION_LABELS: Record<string, string> = {
  daily: "Daily",
  office: "Office",
  date_night: "Date night",
  party: "Party",
  wedding: "Wedding",
  special_event: "Special event",
};

const INTENSITY_LABELS: Record<string, string> = {
  sheer: "Sheer",
  medium: "Medium",
  bold: "Bold",
};

export function LooksFilter({ looks }: { looks: MakeupLook[] }) {
  const [occasion, setOccasion] = useState<string>("all");
  const [intensity, setIntensity] = useState<string>("all");

  const occasions = useMemo(() => {
    const set = new Set<string>();
    looks.forEach((l) => l.occasions.forEach((o) => set.add(o)));
    return Array.from(set).sort();
  }, [looks]);

  const filtered = useMemo(() => {
    return looks.filter((l) => {
      const okOcc =
        occasion === "all" || l.occasions.includes(occasion as MakeupLook["occasions"][number]);
      const okInt = intensity === "all" || l.intensity === intensity;
      return okOcc && okInt;
    });
  }, [looks, occasion, intensity]);

  return (
    <div>
      <div className="flex flex-col gap-4 border border-[var(--border)] bg-[var(--white)] p-4 sm:flex-row sm:flex-wrap sm:items-end sm:gap-6">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="text-[var(--foreground-muted)]">Occasion</span>
          <select
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
            className="min-w-[160px] border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-[var(--foreground)]"
          >
            <option value="all">All occasions</option>
            {occasions.map((o) => (
              <option key={o} value={o}>
                {OCCASION_LABELS[o] ?? o}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="text-[var(--foreground-muted)]">Intensity</span>
          <select
            value={intensity}
            onChange={(e) => setIntensity(e.target.value)}
            className="min-w-[160px] border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-[var(--foreground)]"
          >
            <option value="all">All levels</option>
            {(["sheer", "medium", "bold"] as const).map((i) => (
              <option key={i} value={i}>
                {INTENSITY_LABELS[i]}
              </option>
            ))}
          </select>
        </label>
        <p className="text-sm text-[var(--foreground-muted)] sm:ml-auto sm:pb-2">
          {filtered.length} look{filtered.length === 1 ? "" : "s"}
        </p>
      </div>

      <ul className="mt-10 grid gap-6 sm:grid-cols-2">
        {filtered.map((look) => (
          <li key={look.slug}>
            <Link
              href={`/makeup-looks/${look.slug}`}
              className="group block h-full border border-[var(--border)] bg-[var(--white)] p-6 transition-colors hover:border-[var(--dusty-rose)]/50"
            >
              <div className="flex flex-wrap gap-2">
                <span className="text-xs uppercase tracking-wide text-[var(--dusty-rose)]">
                  {INTENSITY_LABELS[look.intensity]}
                </span>
                {look.occasions.slice(0, 2).map((o) => (
                  <span
                    key={o}
                    className="text-xs text-[var(--foreground-muted)]"
                  >
                    {OCCASION_LABELS[o] ?? o}
                  </span>
                ))}
              </div>
              <h2 className="mt-3 font-serif text-2xl text-[var(--foreground)] group-hover:text-[var(--dusty-rose)]">
                {look.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--foreground-muted)] line-clamp-3">
                {look.description}
              </p>
              <span className="mt-4 inline-block text-sm font-medium text-[var(--dusty-rose)]">
                Read tutorial →
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {filtered.length === 0 && (
        <p className="mt-8 text-center text-[var(--foreground-muted)]">
          No looks match those filters. Try resetting occasion or intensity.
        </p>
      )}
    </div>
  );
}
