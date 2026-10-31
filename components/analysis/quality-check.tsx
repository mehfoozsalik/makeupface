"use client";

import { AlertCircle, CheckCircle2 } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { PhotoQualityResult } from "@/types/face-analysis";
import { cn } from "@/lib/utils/cn";

const CHECKS: {
  key: keyof Omit<PhotoQualityResult, "ok" | "issues" | "faceCount">;
  label: string;
}[] = [
  { key: "faceDetected", label: "Face detected" },
  { key: "faceSizeOk", label: "Face size in frame" },
  { key: "faceCentered", label: "Face centered" },
  { key: "headRotationOk", label: "Head facing forward" },
  { key: "landmarksVisible", label: "Features visible" },
  { key: "lightingOk", label: "Even lighting" },
];

export function QualityCheck({
  quality,
  className,
}: {
  quality: PhotoQualityResult;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <div className={cn("space-y-4", className)}>
      <div
        className={cn(
          "flex items-start gap-3 border p-4",
          quality.ok
            ? "border-[var(--dusty-rose)]/40 bg-[var(--dusty-rose)]/5"
            : "border-[var(--destructive)]/30 bg-[var(--destructive)]/5"
        )}
      >
        {quality.ok ? (
          <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[var(--dusty-rose)]" />
        ) : (
          <AlertCircle className="mt-0.5 size-5 shrink-0 text-[var(--destructive)]" />
        )}
        <div>
          <p className="font-serif text-lg text-[var(--foreground)]">
            {quality.ok ? "Photo looks good" : "Photo needs improvement"}
          </p>
          <p className="mt-1 text-sm text-[var(--foreground-muted)]">
            {quality.faceCount > 1
              ? `${quality.faceCount} faces detected. Use a solo selfie for best results.`
              : quality.ok
                ? "We can analyze your features with this image."
                : "Fix the items below, then retake or upload a new photo."}
          </p>
        </div>
      </div>

      <ul className="grid gap-2 sm:grid-cols-2">
        {CHECKS.map((item, i) => {
          const pass = Boolean(quality[item.key]);
          return (
            <motion.li
              key={item.key}
              initial={reduce ? false : { opacity: 0, transform: "translateY(4px)" }}
              animate={{ opacity: 1, transform: "translateY(0px)" }}
              transition={{
                duration: 0.2,
                delay: reduce ? 0 : i * 0.04,
                ease: [0.23, 1, 0.32, 1],
              }}
              className={cn(
                "flex items-center gap-2 border px-3 py-2.5 text-sm",
                pass
                  ? "border-[var(--border)] bg-[var(--white)]"
                  : "border-[var(--destructive)]/25 bg-[var(--white)]"
              )}
            >
              {pass ? (
                <CheckCircle2 className="size-4 text-[var(--dusty-rose)]" />
              ) : (
                <AlertCircle className="size-4 text-[var(--destructive)]" />
              )}
              <span
                className={
                  pass
                    ? "text-[var(--foreground)]"
                    : "text-[var(--foreground)]"
                }
              >
                {item.label}
              </span>
            </motion.li>
          );
        })}
      </ul>

      {quality.issues.length > 0 && (
        <div className="border border-[var(--border)] bg-[var(--background-secondary)] p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--foreground-muted)]">
            Tips
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-[var(--foreground-muted)]">
            {quality.issues.map((issue) => (
              <li key={issue}>{issue}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
