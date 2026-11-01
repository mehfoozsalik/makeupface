"use client";

import { useState } from "react";
import type { LandmarkSpot } from "@/types/face-analysis";
import { cn } from "@/lib/utils/cn";

export function FacePhotoMap({
  imageSrc,
  spots,
  className,
}: {
  imageSrc: string;
  spots: LandmarkSpot[];
  className?: string;
}) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className={cn("space-y-3", className)}>
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--background-secondary)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt="Your uploaded selfie with feature spots"
          className="h-full w-full object-cover"
        />
        {spots.map((spot) => {
          const isActive = active === spot.id;
          return (
            <button
              key={spot.id}
              type="button"
              aria-label={spot.label}
              className={cn(
                "absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_0_0_1px_rgba(184,137,142,0.5)] transition-transform duration-150",
                isActive ? "z-10 scale-125 bg-[var(--champagne)]" : "bg-[var(--dusty-rose)]"
              )}
              style={{ left: `${spot.x * 100}%`, top: `${spot.y * 100}%` }}
              onMouseEnter={() => setActive(spot.id)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(spot.id)}
              onBlur={() => setActive(null)}
            />
          );
        })}
        {active && (
          <p className="pointer-events-none absolute bottom-3 left-3 right-3 rounded-xl bg-[var(--background)]/85 px-3 py-2 text-center text-xs text-[var(--foreground)] backdrop-blur-sm">
            {spots.find((s) => s.id === active)?.label}
          </p>
        )}
      </div>
      <p className="text-xs text-[var(--foreground-muted)]">
        Spots mark brows, eyes, cheeks, lips, and jaw from on-device landmarks.
        Hover a dot to see the label. Your photo stayed in this browser.
      </p>
    </div>
  );
}
