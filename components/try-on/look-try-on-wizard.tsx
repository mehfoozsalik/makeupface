"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { Loader2, Sparkles, Upload } from "lucide-react";
import { toast } from "sonner";
import { PhotoUploader } from "@/components/upload/photo-uploader";
import { Button } from "@/components/ui/button";
import { useFaceLandmarker } from "@/hooks/use-face-landmarker";
import { useImageUpload } from "@/hooks/use-image-upload";
import { analyzeFaceFromLandmarks } from "@/lib/face-analysis/analyze";
import {
  imageElementToImageData,
  sampleInspirationLook,
} from "@/lib/face-analysis/look-sampler";
import { lookTryOnResponseSchema } from "@/lib/ai/schemas";
import { loadImage } from "@/lib/validation/upload";
import type { FaceAnalysisResult } from "@/types/face-analysis";
import type {
  InspirationLookProfile,
  LookTryOnResponse,
} from "@/types/look-try-on";
import { cn } from "@/lib/utils/cn";

type Step = "inspiration" | "selfie" | "prefs" | "results";

function bindUploader(upload: ReturnType<typeof useImageUpload>) {
  return {
    previewDataUrl: upload.previewDataUrl,
    fileName: upload.fileName,
    transform: upload.transform,
    error: upload.error,
    isLoading: upload.isLoading,
    onFile: upload.setFromFile,
    onCameraCapture: upload.setFromDataUrl,
    onTransformChange: upload.setTransform,
    onApplyTransform: upload.renderTransformedDataUrl,
    onRemove: upload.remove,
  };
}

export function LookTryOnWizard() {
  const inspirationUpload = useImageUpload();
  const selfieUpload = useImageUpload();
  const landmarker = useFaceLandmarker();

  const [step, setStep] = useState<Step>("inspiration");
  const [inspirationProfile, setInspirationProfile] =
    useState<InspirationLookProfile | null>(null);
  const [userAnalysis, setUserAnalysis] = useState<FaceAnalysisResult | null>(
    null
  );
  const [experience, setExperience] = useState<
    "beginner" | "intermediate" | "advanced"
  >("beginner");
  const [undertone, setUndertone] = useState<
    "warm" | "cool" | "neutral" | "unsure"
  >("unsure");
  const [timeMinutes, setTimeMinutes] = useState(25);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [guide, setGuide] = useState<LookTryOnResponse | null>(null);

  const analyzeInspiration = useCallback(async () => {
    const dataUrl = inspirationUpload.previewDataUrl;
    if (!dataUrl) {
      setError("Upload an inspiration photo first.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const img = await loadImage(dataUrl);
      const lm = await landmarker.detectFromElement(img);
      if (!lm || lm.landmarks.length === 0) {
        setError(
          "Could not find a clear face in the inspiration photo. Use a front-facing portrait with visible makeup."
        );
        return;
      }
      const imageData = imageElementToImageData(img);
      const profile = sampleInspirationLook(imageData, lm.landmarks);
      const face = analyzeFaceFromLandmarks(
        lm.landmarks,
        lm.faceCount,
        img.naturalWidth,
        img.naturalHeight,
        imageData
      );
      profile.inspirationFace = {
        faceShape: face.faceShape.primary,
        eyeShape: face.eyeShape.primary,
        lipShape: face.lipShape.primary,
        confidence: face.faceShape.confidence,
      };
      setInspirationProfile(profile);
      toast.success("Inspiration look sampled on-device.");
      setStep("selfie");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not analyze inspiration photo."
      );
    } finally {
      setBusy(false);
    }
  }, [inspirationUpload.previewDataUrl, landmarker]);

  const analyzeSelfie = useCallback(async () => {
    const dataUrl = selfieUpload.previewDataUrl;
    if (!dataUrl) {
      setUserAnalysis(null);
      setStep("prefs");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const img = await loadImage(dataUrl);
      const lm = await landmarker.detectFromElement(img);
      if (!lm || lm.landmarks.length === 0) {
        setError(
          "No face found in your selfie. Skip this step or try another photo."
        );
        return;
      }
      const imageData = imageElementToImageData(img);
      const analysis = analyzeFaceFromLandmarks(
        lm.landmarks,
        lm.faceCount,
        img.naturalWidth,
        img.naturalHeight,
        imageData
      );
      setUserAnalysis(analysis);
      toast.success("Your features analyzed for personalization.");
      setStep("prefs");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not analyze your selfie."
      );
    } finally {
      setBusy(false);
    }
  }, [landmarker, selfieUpload.previewDataUrl]);

  const generateGuide = useCallback(async () => {
    if (!inspirationProfile) {
      setError("Analyze an inspiration look first.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const payload = {
        inspiration: inspirationProfile,
        preferences: { experience, undertone, timeMinutes },
        ...(userAnalysis
          ? {
              userFace: {
                faceShape: userAnalysis.faceShape.primary,
                eyeShape: userAnalysis.eyeShape.primary,
                eyebrowShape: userAnalysis.eyebrowShape.primary,
                lipShape: userAnalysis.lipShape.primary,
                confidence: {
                  faceShape: userAnalysis.faceShape.confidence,
                  eyeShape: userAnalysis.eyeShape.confidence,
                  eyebrowShape: userAnalysis.eyebrowShape.confidence,
                  lipShape: userAnalysis.lipShape.confidence,
                },
                measurements: userAnalysis.measurements,
                uncertainFields: [
                  userAnalysis.faceShape.uncertain ? "faceShape" : "",
                  userAnalysis.eyeShape.uncertain ? "eyeShape" : "",
                  userAnalysis.eyebrowShape.uncertain ? "eyebrowShape" : "",
                  userAnalysis.lipShape.uncertain ? "lipShape" : "",
                ].filter((f) => f.length > 0),
              },
            }
          : {}),
      };

      const res = await fetch("/api/ai/look-try-on", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json: unknown = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg =
          typeof json === "object" &&
          json &&
          "error" in json &&
          typeof (json as { error: unknown }).error === "string"
            ? (json as { error: string }).error
            : "Could not generate your look guide.";
        setError(msg);
        return;
      }
      const parsed = lookTryOnResponseSchema.safeParse(json);
      if (!parsed.success) {
        setError("Received an invalid guide from the assistant.");
        return;
      }
      setGuide(parsed.data);
      setStep("results");
      toast.success("Your recreation guide is ready.");
    } catch {
      setError("Network error. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }, [experience, inspirationProfile, timeMinutes, undertone, userAnalysis]);

  const resetAll = () => {
    inspirationUpload.remove();
    selfieUpload.remove();
    setInspirationProfile(null);
    setUserAnalysis(null);
    setGuide(null);
    setError(null);
    setStep("inspiration");
  };

  return (
    <div className="space-y-8">
      <ol className="flex flex-wrap gap-2 text-xs">
        {(
          [
            ["inspiration", "1. Inspiration"],
            ["selfie", "2. Your face"],
            ["prefs", "3. Preferences"],
            ["results", "4. Guide"],
          ] as const
        ).map(([id, label]) => (
          <li
            key={id}
            className={cn(
              "rounded-full border px-3 py-1.5",
              step === id
                ? "border-[var(--dusty-rose)] bg-[var(--dusty-rose)]/10 text-[var(--foreground)]"
                : "border-[var(--border)] text-[var(--foreground-muted)]"
            )}
          >
            {label}
          </li>
        ))}
      </ol>

      {error && (
        <p
          role="alert"
          className="border border-[var(--destructive)]/30 bg-[var(--destructive)]/5 px-4 py-3 text-sm text-[var(--destructive)]"
        >
          {error}
        </p>
      )}

      {step === "inspiration" && (
        <section className="space-y-4">
          <div>
            <h2 className="font-serif text-2xl">Upload the look you want</h2>
            <p className="mt-1 text-sm text-[var(--foreground-muted)]">
              Choose a clear photo of someone wearing the makeup you like. We
              sample colors on your device. The photo is never sent to AI.
            </p>
          </div>
          <PhotoUploader {...bindUploader(inspirationUpload)} />
          <Button
            type="button"
            disabled={!inspirationUpload.previewDataUrl || busy}
            onClick={() => void analyzeInspiration()}
            className="rounded-full"
          >
            {busy ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Sampling look…
              </>
            ) : (
              <>
                <Sparkles className="size-4" /> Analyze inspiration look
              </>
            )}
          </Button>
        </section>
      )}

      {step === "selfie" && inspirationProfile && (
        <section className="space-y-5">
          <InspirationSwatches profile={inspirationProfile} preview={inspirationUpload.previewDataUrl} />
          <div>
            <h2 className="font-serif text-2xl">Add your selfie (optional)</h2>
            <p className="mt-1 text-sm text-[var(--foreground-muted)]">
              Personalizes placement for your face and eye shape. Skip if you
              only want a general recreation guide.
            </p>
          </div>
          <PhotoUploader {...bindUploader(selfieUpload)} />
          <div className="flex flex-wrap gap-3">
            <Button
              type="button"
              variant="secondary"
              className="rounded-full"
              disabled={busy}
              onClick={() => {
                setUserAnalysis(null);
                setStep("prefs");
              }}
            >
              Skip for now
            </Button>
            <Button
              type="button"
              className="rounded-full"
              disabled={busy || !selfieUpload.previewDataUrl}
              onClick={() => void analyzeSelfie()}
            >
              {busy ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Analyzing…
                </>
              ) : (
                <>
                  <Upload className="size-4" /> Use my features
                </>
              )}
            </Button>
          </div>
        </section>
      )}

      {step === "prefs" && (
        <section className="space-y-6">
          <h2 className="font-serif text-2xl">How should we teach this look?</h2>
          <fieldset className="space-y-2">
            <legend className="text-sm font-medium">Experience</legend>
            <div className="flex flex-wrap gap-2">
              {(["beginner", "intermediate", "advanced"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setExperience(v)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm capitalize",
                    experience === v
                      ? "border-[var(--dusty-rose)] bg-[var(--dusty-rose)] text-[var(--on-accent)]"
                      : "border-[var(--border)] text-[var(--foreground-muted)]"
                  )}
                >
                  {v}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset className="space-y-2">
            <legend className="text-sm font-medium">Your undertone</legend>
            <div className="flex flex-wrap gap-2">
              {(["warm", "cool", "neutral", "unsure"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setUndertone(v)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm capitalize",
                    undertone === v
                      ? "border-[var(--dusty-rose)] bg-[var(--dusty-rose)] text-[var(--on-accent)]"
                      : "border-[var(--border)] text-[var(--foreground-muted)]"
                  )}
                >
                  {v}
                </button>
              ))}
            </div>
          </fieldset>
          <label className="block space-y-2 text-sm">
            <span className="font-medium">Time available: {timeMinutes} min</span>
            <input
              type="range"
              min={10}
              max={60}
              step={5}
              value={timeMinutes}
              onChange={(e) => setTimeMinutes(Number(e.target.value))}
              className="w-full accent-[var(--dusty-rose)]"
            />
          </label>
          {userAnalysis && (
            <p className="text-sm text-[var(--foreground-muted)]">
              Personalizing for{" "}
              <span className="text-[var(--foreground)]">
                {userAnalysis.faceShape.primary}
              </span>{" "}
              face and{" "}
              <span className="text-[var(--foreground)]">
                {userAnalysis.eyeShape.primary}
              </span>{" "}
              eyes.
            </p>
          )}
          <div className="flex flex-wrap gap-3">
            <Button
              type="button"
              variant="secondary"
              className="rounded-full"
              onClick={() => setStep("selfie")}
            >
              Back
            </Button>
            <Button
              type="button"
              className="rounded-full"
              disabled={busy}
              onClick={() => void generateGuide()}
            >
              {busy ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Writing your guide…
                </>
              ) : (
                <>
                  <Sparkles className="size-4" /> Get my try-on guide
                </>
              )}
            </Button>
          </div>
        </section>
      )}

      {step === "results" && guide && (
        <section className="space-y-8">
          <div className="border border-[var(--border)] bg-[var(--white)] p-6 sm:p-8">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--dusty-rose)]">
              Look try-on guide
            </p>
            <h2 className="mt-2 font-serif text-3xl">{guide.summary.title}</h2>
            <p className="mt-3 text-[var(--foreground-muted)]">
              {guide.summary.lookDescription}
            </p>
            <p className="mt-3 text-sm text-[var(--foreground)]">
              {guide.summary.howCloseYouCanGet}
            </p>
            <p className="mt-2 text-sm text-[var(--foreground-muted)]">
              {guide.summary.overallAdvice}
            </p>
          </div>

          {inspirationProfile && (
            <InspirationSwatches
              profile={inspirationProfile}
              preview={inspirationUpload.previewDataUrl}
            />
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            {(
              [
                ["Lips", guide.colorGuide.lips],
                ["Eyes", guide.colorGuide.eyes],
                ["Cheeks", guide.colorGuide.cheeks],
                ["Base", guide.colorGuide.base],
              ] as const
            ).map(([label, text]) => (
              <div
                key={label}
                className="border border-[var(--border)] bg-[var(--background-secondary)]/40 p-4"
              >
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--foreground-muted)]">
                  {label}
                </p>
                <p className="mt-2 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>

          <ol className="space-y-4">
            {guide.steps.map((s) => (
              <li
                key={s.step}
                className="border border-[var(--border)] bg-[var(--white)] p-5"
              >
                <p className="text-xs font-medium text-[var(--dusty-rose)]">
                  Step {s.step}
                </p>
                <h3 className="mt-1 font-serif text-xl">{s.title}</h3>
                <p className="mt-1 text-sm text-[var(--foreground-muted)]">
                  Goal: {s.goal}
                </p>
                <p className="mt-3 text-sm leading-relaxed">{s.instructions}</p>
                <p className="mt-3 text-sm">
                  <span className="font-medium">Match tip:</span> {s.matchTip}
                </p>
                <p className="mt-1 text-sm text-[var(--foreground-muted)]">
                  <span className="font-medium text-[var(--foreground)]">
                    For your features:
                  </span>{" "}
                  {s.adaptForYourFeatures}
                </p>
                {s.products.length > 0 && (
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {s.products.map((p) => (
                      <li
                        key={p}
                        className="rounded-full bg-[var(--background-secondary)] px-3 py-1 text-xs"
                      >
                        {p}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-serif text-xl">Product checklist</h3>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[var(--foreground-muted)]">
                {guide.productChecklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-xl">Adaptations</h3>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[var(--foreground-muted)]">
                {guide.adaptations.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-xl">Common mistakes</h3>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[var(--foreground-muted)]">
              {guide.commonMistakes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <p className="text-xs text-[var(--foreground-muted)]">
            {guide.disclaimer}
          </p>

          <div className="flex flex-wrap gap-3">
            <Button type="button" className="rounded-full" onClick={resetAll}>
              Try another look
            </Button>
            <Link
              href="/analyze"
              className="inline-flex h-11 items-center rounded-full border border-[var(--border)] px-5 text-sm"
            >
              Full face analysis
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}

function InspirationSwatches({
  profile,
  preview,
}: {
  profile: InspirationLookProfile;
  preview: string | null;
}) {
  const swatches = [
    { label: "Lips", swatch: profile.lip },
    { label: "Eyes", swatch: profile.eyeshadow },
    { label: "Cheeks", swatch: profile.blush },
    { label: "Liner", swatch: profile.eyeliner },
    { label: "Highlight", swatch: profile.highlight },
  ];

  return (
    <div className="overflow-hidden border border-[var(--border)] bg-[var(--white)]">
      <div className="grid md:grid-cols-[140px_1fr]">
        {preview && (
          <div className="relative min-h-[140px] bg-[var(--background-secondary)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="Inspiration look preview"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        )}
        <div className="p-4">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--foreground-muted)]">
            Sampled here: {profile.intensity}, {profile.finish} finish
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            {swatches.map(({ label, swatch }) => (
              <div key={label} className="flex items-center gap-2 text-xs">
                <span
                  className="size-8 rounded-full border border-[var(--border)]"
                  style={{ background: swatch.hex }}
                  title={swatch.hex}
                />
                <span>
                  <span className="block font-medium text-[var(--foreground)]">
                    {label}
                  </span>
                  <span className="text-[var(--foreground-muted)]">
                    {swatch.family}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
