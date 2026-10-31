"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PreferencesForm } from "@/components/analysis/preferences-form";
import { QualityCheck } from "@/components/analysis/quality-check";
import { ResultsDashboard } from "@/components/analysis/results-dashboard";
import { PhotoUploader } from "@/components/upload/photo-uploader";
import { useFaceLandmarker } from "@/hooks/use-face-landmarker";
import { useImageUpload } from "@/hooks/use-image-upload";
import { useMakeupAnalysis } from "@/hooks/use-makeup-analysis";
import { analyzeFaceFromLandmarks } from "@/lib/face-analysis/analyze";
import { loadImage } from "@/lib/validation/upload";
import { useAnalysisStore } from "@/store/analysis-store";
import type { AnalysisStep, FaceAnalysisResult } from "@/types/face-analysis";
import type { UserPreferences } from "@/types/makeup";
import { cn } from "@/lib/utils/cn";

const STEPS: { id: AnalysisStep; label: string }[] = [
  { id: "upload", label: "Upload" },
  { id: "validate", label: "Validate" },
  { id: "analyze", label: "Analyze" },
  { id: "preferences", label: "Preferences" },
  { id: "recommend", label: "Recommend" },
  { id: "results", label: "Results" },
];

function sampleImageData(
  img: HTMLImageElement,
  maxSide = 512
): ImageData | undefined {
  const scale = Math.min(1, maxSide / Math.max(img.naturalWidth, img.naturalHeight));
  const w = Math.round(img.naturalWidth * scale);
  const h = Math.round(img.naturalHeight * scale);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return undefined;
  ctx.drawImage(img, 0, 0, w, h);
  return ctx.getImageData(0, 0, w, h);
}

export function AnalysisWizard() {
  const reduce = useReducedMotion();
  const upload = useImageUpload();
  const landmarker = useFaceLandmarker();
  const makeup = useMakeupAnalysis();

  const step = useAnalysisStore((s) => s.step);
  const setStep = useAnalysisStore((s) => s.setStep);
  const setImage = useAnalysisStore((s) => s.setImage);
  const analysis = useAnalysisStore((s) => s.analysis);
  const setAnalysis = useAnalysisStore((s) => s.setAnalysis);
  const preferences = useAnalysisStore((s) => s.preferences);
  const setPreferences = useAnalysisStore((s) => s.setPreferences);
  const recommendations = useAnalysisStore((s) => s.recommendations);
  const setRecommendations = useAnalysisStore((s) => s.setRecommendations);
  const storeError = useAnalysisStore((s) => s.error);
  const setError = useAnalysisStore((s) => s.setError);
  const isProcessing = useAnalysisStore((s) => s.isProcessing);
  const setProcessing = useAnalysisStore((s) => s.setProcessing);
  const saveCurrentReport = useAnalysisStore((s) => s.saveCurrentReport);
  const resetStore = useAnalysisStore((s) => s.reset);

  const [qualityPreview, setQualityPreview] = useState<
    FaceAnalysisResult["quality"] | null
  >(null);

  const stepIndex = STEPS.findIndex((s) => s.id === step);

  const displayError =
    storeError || upload.error || landmarker.error || makeup.error;

  useEffect(() => {
    if (upload.previewDataUrl) setImage(upload.previewDataUrl);
  }, [upload.previewDataUrl, setImage]);

  const runValidation = useCallback(async () => {
    const dataUrl = upload.previewDataUrl;
    if (!dataUrl) {
      setError("Upload a photo first.");
      return false;
    }
    setProcessing(true);
    setError(null);
    try {
      const img = await loadImage(dataUrl);
      const lm = await landmarker.detectFromElement(img);
      if (!lm) return false;
      const imageData = sampleImageData(img);
      const partial = analyzeFaceFromLandmarks(
        lm.landmarks,
        lm.faceCount,
        img.naturalWidth,
        img.naturalHeight,
        imageData
      );
      setQualityPreview(partial.quality);
      if (!partial.quality.ok) {
        setError(
          "Photo quality issues detected. Improve lighting or framing, or continue at your own risk."
        );
      }
      return true;
    } finally {
      setProcessing(false);
    }
  }, [landmarker, setError, setProcessing, upload.previewDataUrl]);

  const runFullAnalysis = useCallback(async () => {
    const dataUrl = upload.previewDataUrl;
    if (!dataUrl) {
      setError("Upload a photo first.");
      return false;
    }
    setProcessing(true);
    setError(null);
    try {
      const img = await loadImage(dataUrl);
      const lm =
        landmarker.result?.landmarks.length
          ? landmarker.result
          : await landmarker.detectFromElement(img);
      if (!lm || lm.landmarks.length === 0) return false;

      const imageData = sampleImageData(img);
      const result = analyzeFaceFromLandmarks(
        lm.landmarks,
        lm.faceCount,
        img.naturalWidth,
        img.naturalHeight,
        imageData
      );
      setAnalysis(result);
      setQualityPreview(result.quality);
      return true;
    } finally {
      setProcessing(false);
    }
  }, [landmarker, setAnalysis, setError, setProcessing, upload.previewDataUrl]);

  const goNext = useCallback(async () => {
    setError(null);
    switch (step) {
      case "upload": {
        if (!upload.previewDataUrl) {
          setError("Choose or capture a photo to continue.");
          return;
        }
        setStep("validate");
        break;
      }
      case "validate": {
        const ok = await runValidation();
        if (ok) setStep("analyze");
        break;
      }
      case "analyze": {
        const ok = await runFullAnalysis();
        if (ok) setStep("preferences");
        break;
      }
      case "preferences":
        setStep("recommend");
        break;
      default:
        break;
    }
  }, [
    runFullAnalysis,
    runValidation,
    setError,
    setStep,
    step,
    upload.previewDataUrl,
  ]);

  const handlePreferences = useCallback(
    async (values: UserPreferences) => {
      if (!analysis) {
        setError("Complete face analysis first.");
        setStep("analyze");
        return;
      }
      setPreferences(values);
      setStep("recommend");
      setProcessing(true);
      setError(null);
      const rec = await makeup.fetchRecommendations(analysis, values);
      setProcessing(false);
      if (rec) {
        setRecommendations(rec);
        setStep("results");
        toast.success("Your personalized plan is ready");
      } else {
        setError(makeup.error ?? "Could not load recommendations.");
      }
    },
    [
      analysis,
      makeup,
      setError,
      setPreferences,
      setProcessing,
      setRecommendations,
      setStep,
    ]
  );

  const handleReset = useCallback(() => {
    resetStore();
    upload.remove();
    landmarker.reset();
    makeup.reset();
    setQualityPreview(null);
    toast.message("Session cleared");
  }, [landmarker, makeup, resetStore, upload]);

  const busy = isProcessing || landmarker.isLoading || makeup.isLoading;

  const stepContent = useMemo(() => {
    switch (step) {
      case "upload":
        return (
          <PhotoUploader
            previewDataUrl={upload.previewDataUrl}
            fileName={upload.fileName}
            transform={upload.transform}
            error={upload.error}
            isLoading={upload.isLoading}
            onFile={upload.setFromFile}
            onCameraCapture={upload.setFromDataUrl}
            onTransformChange={upload.setTransform}
            onApplyTransform={upload.renderTransformedDataUrl}
            onRemove={() => {
              upload.remove();
              setImage(null);
            }}
          />
        );
      case "validate":
        return (
          <div className="space-y-6">
            {qualityPreview ? (
              <QualityCheck quality={qualityPreview} />
            ) : (
              <p className="text-sm text-[var(--foreground-muted)]">
                We will check lighting, framing, and face visibility using on-device
                detection. Your photo never leaves this browser.
              </p>
            )}
            {!qualityPreview && (
              <Button type="button" onClick={() => void runValidation()} disabled={busy}>
                {busy ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> Checking…
                  </>
                ) : (
                  "Run quality check"
                )}
              </Button>
            )}
          </div>
        );
      case "analyze":
        return (
          <div className="space-y-4">
            <p className="text-sm text-[var(--foreground-muted)]">
              We analyze facial proportions locally to estimate face shape and
              features. This is guidance, not a medical assessment.
            </p>
            {analysis && qualityPreview && (
              <QualityCheck quality={analysis.quality} />
            )}
            {!analysis && (
              <Button type="button" onClick={() => void runFullAnalysis()} disabled={busy}>
                {busy ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> Analyzing…
                  </>
                ) : (
                  "Analyze my features"
                )}
              </Button>
            )}
            {analysis && (
              <div className="grid gap-3 sm:grid-cols-2">
                {(
                  [
                    ["Face", analysis.faceShape.primary],
                    ["Eyes", analysis.eyeShape.primary],
                    ["Brows", analysis.eyebrowShape.primary],
                    ["Lips", analysis.lipShape.primary],
                  ] as const
                ).map(([label, value]) => (
                  <div
                    key={label}
                    className="border border-[var(--border)] bg-[var(--white)] p-3 text-sm capitalize"
                  >
                    <span className="text-[var(--foreground-muted)]">{label}</span>
                    <p className="font-medium">{value.replace(/_/g, " ")}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case "preferences":
        return (
          <PreferencesForm
            defaultValues={
              preferences ?? {
                experience: "beginner",
                style: "natural",
                occasion: "daily",
                additional: ["affordable"],
                undertone: "unsure",
              }
            }
            onSubmit={(v) => void handlePreferences(v)}
            isSubmitting={makeup.isLoading}
          />
        );
      case "recommend":
        return (
          <div className="flex flex-col items-center gap-4 py-12 text-center">
            <Loader2 className="size-8 animate-spin text-[var(--dusty-rose)]" />
            <p className="text-[var(--foreground-muted)]">
              Building your routine with AI (structured analysis only, no photo
              uploaded)…
            </p>
          </div>
        );
      case "results":
        if (!analysis || !preferences || !recommendations) {
          return (
            <p className="text-sm text-[var(--destructive)]">
              Missing results. Go back and complete analysis.
            </p>
          );
        }
        return (
          <ResultsDashboard
            analysis={analysis}
            preferences={preferences}
            recommendations={recommendations}
            onSave={saveCurrentReport}
            onReset={handleReset}
          />
        );
      default:
        return null;
    }
  }, [
    analysis,
    busy,
    handlePreferences,
    handleReset,
    makeup.isLoading,
    preferences,
    qualityPreview,
    recommendations,
    runFullAnalysis,
    runValidation,
    saveCurrentReport,
    setImage,
    step,
    upload,
  ]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="mb-8 text-center">
        <h1 className="font-serif text-3xl sm:text-4xl">AI Makeup Assistant</h1>
        <p className="mt-2 text-[var(--foreground-muted)]">
          Private on-device analysis with personalized recommendations
        </p>
      </div>

      <nav aria-label="Progress" className="mb-8">
        <ol className="flex flex-wrap justify-center gap-1 sm:gap-2">
          {STEPS.map((s, i) => {
            const done = i < stepIndex;
            const current = s.id === step;
            return (
              <li
                key={s.id}
                className={cn(
                  "flex items-center gap-1 text-xs sm:text-sm",
                  current
                    ? "text-[var(--foreground)]"
                    : done
                      ? "text-[var(--dusty-rose)]"
                      : "text-[var(--foreground-muted)]"
                )}
              >
                <span
                  className={cn(
                    "flex size-6 items-center justify-center border text-[10px] font-medium sm:size-7",
                    current && "border-[var(--dusty-rose)] bg-[var(--dusty-rose)]/10",
                    done && !current && "border-[var(--dusty-rose)]",
                    !done && !current && "border-[var(--border)]"
                  )}
                >
                  {i + 1}
                </span>
                <span className="hidden sm:inline">{s.label}</span>
              </li>
            );
          })}
        </ol>
      </nav>

      {displayError && (
        <div
          className="mb-6 border border-[var(--destructive)]/30 bg-[var(--destructive)]/5 px-4 py-3 text-sm text-[var(--destructive)]"
          role="alert"
        >
          {displayError}
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={reduce ? false : { opacity: 0, transform: "translateY(8px)" }}
          animate={{ opacity: 1, transform: "translateY(0px)" }}
          exit={reduce ? undefined : { opacity: 0, transform: "translateY(-4px)" }}
          transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
          className="min-h-[280px]"
        >
          {stepContent}
        </motion.div>
      </AnimatePresence>

      {step !== "results" && step !== "preferences" && step !== "recommend" && (
        <div className="mt-8 flex flex-wrap justify-between gap-3 border-t border-[var(--border)] pt-6">
          <Button
            type="button"
            variant="ghost"
            disabled={step === "upload" || busy}
            onClick={() => {
              const prev = STEPS[Math.max(0, stepIndex - 1)];
              if (prev) setStep(prev.id);
            }}
          >
            Back
          </Button>
          <Button type="button" onClick={() => void goNext()} disabled={busy}>
            {busy ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Working…
              </>
            ) : step === "analyze" && analysis ? (
              "Continue"
            ) : step === "validate" && qualityPreview ? (
              "Continue"
            ) : step === "upload" ? (
              "Continue"
            ) : step === "validate" ? (
              "Check & continue"
            ) : (
              "Continue"
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
