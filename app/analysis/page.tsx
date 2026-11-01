"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useAnalysisStore } from "@/store/analysis-store";

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export default function AnalysisLibraryPage() {
  const router = useRouter();
  const savedReports = useAnalysisStore((s) => s.savedReports);
  const deleteReport = useAnalysisStore((s) => s.deleteReport);
  const setStep = useAnalysisStore((s) => s.setStep);
  const setAnalysis = useAnalysisStore((s) => s.setAnalysis);
  const setPreferences = useAnalysisStore((s) => s.setPreferences);
  const setRecommendations = useAnalysisStore((s) => s.setRecommendations);

  const openReport = (id: string) => {
    const report = savedReports.find((r) => r.id === id);
    if (!report) return;
    setAnalysis(report.faceAnalysis);
    setPreferences(report.preferences);
    setRecommendations(report.recommendations);
    setStep("results");
  };

  if (savedReports.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <h1 className="font-serif text-3xl">Saved analyses</h1>
        <p className="mt-3 text-[var(--foreground-muted)]">
          Complete the AI Makeup Assistant and save a report to see it here. Photos
          are never stored. Only your feature analysis and recommendations are saved.
        </p>
        <Link
          href="/analyze"
          className="mt-8 inline-flex h-12 items-center justify-center bg-[var(--dusty-rose)] px-7 text-base font-medium text-[var(--on-accent)] transition-colors hover:bg-[var(--dusty-rose-hover)]"
        >
          Start analysis
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl">Saved analyses</h1>
          <p className="mt-2 text-sm text-[var(--foreground-muted)]">
            Up to 20 reports kept on this device.
          </p>
        </div>
        <Link
          href="/analyze"
          className="inline-flex h-11 items-center justify-center border border-[var(--border)] px-5 text-sm font-medium text-[var(--foreground)] transition-colors hover:border-[var(--dusty-rose)] hover:text-[var(--dusty-rose)]"
        >
          New analysis
        </Link>
      </div>

      <ul className="divide-y divide-[var(--border)] border border-[var(--border)] bg-[var(--white)]">
        {savedReports.map((report) => (
          <li
            key={report.id}
            className="flex flex-wrap items-center justify-between gap-3 p-4"
          >
            <div>
              <p className="font-medium capitalize text-[var(--foreground)]">
                {report.recommendations.summary.title}
              </p>
              <p className="text-xs text-[var(--foreground-muted)]">
                {formatDate(report.createdAt)},{" "}
                {report.faceAnalysis.faceShape.primary} face,{" "}
                {report.preferences.style.replace(/_/g, " ")}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                size="sm"
                variant="secondary"
                onClick={() => {
                  openReport(report.id);
                  router.push("/analyze");
                }}
              >
                View
              </Button>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                aria-label="Delete report"
                onClick={() => {
                  deleteReport(report.id);
                  toast.success("Report removed");
                }}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-center text-sm text-[var(--foreground-muted)]">
        <Link href="/analyze" className="text-[var(--dusty-rose)] hover:underline">
          Open AI Makeup Assistant
        </Link>{" "}
        to view loaded reports on the results step.
      </p>
    </div>
  );
}
