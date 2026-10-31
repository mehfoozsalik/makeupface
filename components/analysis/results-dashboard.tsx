"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Download, Printer, RotateCcw, Save } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";
import { PlacementDiagram } from "@/components/tutorials/placement-diagram";
import { getRelatedGuides } from "@/lib/analysis/related-guides";
import type { MakeupAIResponse } from "@/types/ai";
import type { FaceAnalysisResult } from "@/types/face-analysis";
import type { UserPreferences } from "@/types/makeup";
import { cn } from "@/lib/utils/cn";

function formatLabel(value: string) {
  return value.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function ConfidenceBar({ value }: { value: number }) {
  const pct = Math.round(Math.min(100, Math.max(0, value * 100)));
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 flex-1 bg-[var(--background-secondary)]">
        <div
          className="h-full bg-[var(--dusty-rose)] transition-[width] duration-200"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs tabular-nums text-[var(--foreground-muted)]">
        {pct}%
      </span>
    </div>
  );
}

export function ResultsDashboard({
  analysis,
  preferences,
  recommendations,
  onSave,
  onReset,
  className,
}: {
  analysis: FaceAnalysisResult;
  preferences: UserPreferences;
  recommendations: MakeupAIResponse;
  onSave: () => string | null;
  onReset: () => void;
  className?: string;
}) {
  const printRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);
  const related = getRelatedGuides(
    analysis.faceShape.primary,
    preferences.style
  );

  const recEntries = Object.entries(recommendations.recommendations) as [
    string,
    (typeof recommendations.recommendations)[keyof typeof recommendations.recommendations],
  ][];

  const handleSave = () => {
    const id = onSave();
    if (id) toast.success("Report saved to your library");
    else toast.error("Nothing to save yet");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportPdf = async () => {
    const el = printRef.current;
    if (!el) return;
    setExporting(true);
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);
      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#faf8f5",
      });
      const img = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "p", unit: "mm", format: "a4" });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const ratio = Math.min(
        pageW / canvas.width,
        pageH / canvas.height
      );
      const w = canvas.width * ratio;
      const h = canvas.height * ratio;
      pdf.addImage(img, "PNG", (pageW - w) / 2, 8, w, h);
      pdf.save("lumina-makeup-report.pdf");
      toast.success("PDF downloaded");
    } catch {
      toast.error("Could not export PDF");
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className={cn("space-y-8", className)}>
      <div className="flex flex-wrap gap-2 print:hidden">
        <Button type="button" variant="champagne" onClick={handleSave}>
          <Save className="size-4" />
          Save report
        </Button>
        <Button type="button" variant="secondary" onClick={handlePrint}>
          <Printer className="size-4" />
          Print
        </Button>
        <Button
          type="button"
          variant="secondary"
          disabled={exporting}
          onClick={() => void handleExportPdf()}
        >
          <Download className="size-4" />
          {exporting ? "Exporting…" : "Export PDF"}
        </Button>
        <Button type="button" variant="ghost" onClick={onReset}>
          <RotateCcw className="size-4" />
          Start over
        </Button>
      </div>

      <div
        ref={printRef}
        className="space-y-8 border border-[var(--border)] bg-[var(--white)] p-6 sm:p-8 print:border-0 print:p-0"
      >
        <header className="space-y-2 border-b border-[var(--border)] pb-6">
          <p className="text-xs uppercase tracking-wide text-[var(--foreground-muted)]">
            Personalized plan
          </p>
          <h2 className="font-serif text-3xl text-[var(--foreground)]">
            {recommendations.summary.title}
          </h2>
          <p className="text-[var(--foreground-muted)]">
            {recommendations.summary.description}
          </p>
          <p className="text-sm text-[var(--foreground)]">
            {recommendations.summary.overallAdvice}
          </p>
        </header>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <h3 className="font-serif text-xl">Your facial profile</h3>
            <dl className="space-y-3 text-sm">
              {(
                [
                  ["Face shape", analysis.faceShape],
                  ["Eye shape", analysis.eyeShape],
                  ["Brow shape", analysis.eyebrowShape],
                  ["Lip shape", analysis.lipShape],
                ] as const
              ).map(([label, result]) => (
                <div key={label}>
                  <dt className="text-[var(--foreground-muted)]">{label}</dt>
                  <dd className="mt-0.5 font-medium capitalize text-[var(--foreground)]">
                    {formatLabel(result.primary)}
                    {result.uncertain && (
                      <span className="ml-2 text-xs font-normal text-[var(--foreground-muted)]">
                        (estimate)
                      </span>
                    )}
                  </dd>
                  <ConfidenceBar value={result.confidence} />
                  <p className="mt-1 text-xs text-[var(--foreground-muted)]">
                    {result.rationale}
                  </p>
                </div>
              ))}
            </dl>
          </div>

          <div className="border border-[var(--border)] bg-[var(--background)] p-4">
            <h3 className="mb-2 font-serif text-xl">Placement map</h3>
            <PlacementDiagram faceShape={analysis.faceShape.primary} />
          </div>
        </section>

        <section>
          <h3 className="font-serif text-xl">Step-by-step routine</h3>
          <ol className="mt-4 space-y-4">
            {recommendations.routine.map((step) => (
              <li
                key={step.step}
                className="border border-[var(--border)] p-4"
              >
                <p className="text-xs font-medium text-[var(--dusty-rose)]">
                  Step {step.step}
                </p>
                <p className="font-serif text-lg">{step.title}</p>
                <p className="mt-2 text-sm text-[var(--foreground-muted)]">
                  {step.instructions}
                </p>
                <p className="mt-2 text-sm text-[var(--foreground)]">
                  <span className="font-medium">Why:</span> {step.why}
                </p>
                {step.products.length > 0 && (
                  <p className="mt-2 text-xs text-[var(--foreground-muted)]">
                    Products: {step.products.join(", ")}
                  </p>
                )}
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h3 className="font-serif text-xl">Product guidance</h3>
          <div className="mt-4">
            <Accordion
              items={recEntries.map(([key, rec]) => ({
                question: formatLabel(key),
                answer: `${rec.what}\n\nWhere: ${rec.where}\nHow: ${rec.how}\nTechnique: ${rec.technique}`,
              }))}
            />
          </div>
        </section>

        {recommendations.commonMistakes.length > 0 && (
          <section>
            <h3 className="font-serif text-xl">Avoid these mistakes</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--foreground-muted)]">
              {recommendations.commonMistakes.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </section>
        )}

        <p className="text-xs text-[var(--foreground-muted)]">
          {recommendations.disclaimer}
        </p>
      </div>

      <section className="print:hidden">
        <h3 className="font-serif text-xl">Related tutorials</h3>
        <ul className="mt-3 flex flex-wrap gap-2">
          {related.map((g) => (
            <li key={g.href}>
              <Link
                href={g.href}
                className="inline-flex border border-[var(--border)] px-3 py-2 text-sm text-[var(--foreground-muted)] transition-colors hover:border-[var(--dusty-rose)] hover:text-[var(--foreground)]"
              >
                {g.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
