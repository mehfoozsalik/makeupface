"use client";

import Link from "next/link";
import { PlacementDiagram } from "@/components/tutorials/placement-diagram";
import {
  ClassificationCard,
  MetricGrid,
  ResultPanel,
} from "@/components/tools/classification-card";
import { FaceUploadTool } from "@/components/tools/face-upload-tool";
import {
  BLUSH_BY_FACE_SHAPE,
  CONTOUR_BY_FACE_SHAPE,
  EYESHADOW_BY_EYE_SHAPE,
  cheekboneAdvice,
  interpretForehead,
  interpretJaw,
} from "@/lib/tools/placement-advice";
import type { EyeShape, FaceShape } from "@/types/face-analysis";

const PHOTO_STEPS = [
  "Upload a front-facing selfie with hair pulled back from your hairline.",
  "Use even lighting and look straight at the camera.",
  "Tap Analyze photo to run on-device landmark detection.",
];

export function FaceShapeDetectorRunner() {
  return (
    <FaceUploadTool instructions={PHOTO_STEPS}>
      {({ analysis }) => (
        <ResultPanel title="Your face shape">
          <ClassificationCard
            label="Primary shape"
            primary={analysis.faceShape.primary}
            confidence={analysis.faceShape.confidence}
            alternatives={analysis.faceShape.alternatives}
            rationale={analysis.faceShape.rationale}
            uncertain={analysis.faceShape.uncertain}
          />
        </ResultPanel>
      )}
    </FaceUploadTool>
  );
}

export function FaceSymmetryTestRunner() {
  return (
    <FaceUploadTool instructions={PHOTO_STEPS}>
      {({ analysis }) => {
        const score = analysis.measurements.symmetryScore;
        const pct = Math.round(score * 100);
        let explanation =
          "Mild left-right differences in brows, eyes, or mouth are normal and rarely need heavy correction.";
        if (score >= 0.92) {
          explanation =
            "Your landmarks show very balanced proportions. Focus makeup on enhancement rather than correction.";
        } else if (score < 0.78) {
          explanation =
            "Noticeable asymmetry is common. Use brow fill, lip liner, or slightly stronger mascara on one side if you want balance. Keep changes subtle.";
        }
        return (
          <ResultPanel title="Symmetry score">
            <div className="border border-[var(--border)] bg-[var(--white)] p-6 text-center">
              <p className="font-serif text-4xl text-[var(--dusty-rose)]">{pct}%</p>
              <p className="mt-2 text-sm text-[var(--foreground-muted)]">Landmark-based balance score</p>
            </div>
            <p className="text-sm leading-relaxed text-[var(--foreground-muted)]">{explanation}</p>
          </ResultPanel>
        );
      }}
    </FaceUploadTool>
  );
}

export function FaceRatioCalculatorRunner() {
  return (
    <FaceUploadTool instructions={PHOTO_STEPS}>
      {({ analysis }) => {
        const m = analysis.measurements;
        return (
          <ResultPanel title="Key facial ratios">
            <MetricGrid
              metrics={[
                {
                  label: "Face length ÷ cheek width",
                  value: m.faceLengthRatio.toFixed(2),
                  hint: "Higher = longer face; ~1.3-1.5 often reads oval.",
                },
                {
                  label: "Forehead ÷ cheek width",
                  value: m.foreheadWidthRatio.toFixed(2),
                  hint: "Relative forehead width vs cheekbones.",
                },
                {
                  label: "Jaw ÷ cheek width",
                  value: m.jawWidthRatio.toFixed(2),
                  hint: "Lower = narrower jaw / heart tendency.",
                },
                {
                  label: "Cheek ÷ jaw width",
                  value: m.cheekToJawRatio.toFixed(2),
                  hint: "Higher = cheekbones wider than jaw.",
                },
                {
                  label: "Eye aspect ratio",
                  value: m.eyeAspectRatio.toFixed(2),
                  hint: "Width vs height of eye opening.",
                },
                {
                  label: "Symmetry score",
                  value: `${Math.round(m.symmetryScore * 100)}%`,
                },
              ]}
            />
            <p className="text-sm text-[var(--foreground-muted)]">
              Classical &quot;thirds&quot; are approximated from landmarks. Use for makeup mapping, not medical measurement.
            </p>
          </ResultPanel>
        );
      }}
    </FaceUploadTool>
  );
}

export function ForeheadShapeAnalyzerRunner() {
  return (
    <FaceUploadTool instructions={PHOTO_STEPS}>
      {({ analysis }) => {
        const { width, height } = interpretForehead(
          analysis.measurements.foreheadWidthRatio,
          analysis.measurements.foreheadToFaceRatio
        );
        const tips: string[] = [];
        if (width === "wide") tips.push("Soften temples with diffused bronzer; avoid heavy highlight on outer forehead.");
        if (width === "narrow") tips.push("Keep brows fuller; optional light highlight at center hairline.");
        if (height === "tall") tips.push("Strong brows or soft fringe can balance vertical length. Makeup can emphasize brows for the same effect.");
        if (height === "short") tips.push("Avoid blocking brows with heavy bangs in photos; arch can open the upper face.");
        return (
          <ResultPanel title="Forehead analysis">
            <MetricGrid
              metrics={[
                { label: "Forehead width vs cheeks", value: width },
                { label: "Forehead height tendency", value: height },
                {
                  label: "Forehead width ratio",
                  value: analysis.measurements.foreheadWidthRatio.toFixed(2),
                },
              ]}
            />
            <ul className="list-disc space-y-1 pl-5 text-sm text-[var(--foreground-muted)]">
              {tips.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </ResultPanel>
        );
      }}
    </FaceUploadTool>
  );
}

export function JawlineShapeDetectorRunner() {
  return (
    <FaceUploadTool instructions={PHOTO_STEPS}>
      {({ analysis }) => {
        const jawType = interpretJaw(
          analysis.measurements.jawWidthRatio,
          analysis.measurements.cheekToJawRatio
        );
        const copy: Record<typeof jawType, string> = {
          soft: "Jaw reads softly rounded. Use light bronzer under cheekbones rather than harsh jaw stripes.",
          angular: "Cheekbones are wider than jaw. Contour the jawline lightly to avoid over-narrowing.",
          tapered: "Tapered jaw. Balance with blush on apples and minimal jaw contour.",
          square: "Jaw width is close to cheek width. Blend contour along jaw corners with circular motions.",
        };
        return (
          <ResultPanel title="Jawline tendency">
            <ClassificationCard
              label="Jaw character"
              primary={jawType}
              confidence={0.65}
              alternatives={[]}
              rationale={copy[jawType]}
            />
            <MetricGrid
              metrics={[
                { label: "Jaw width ratio", value: analysis.measurements.jawWidthRatio.toFixed(2) },
                { label: "Cheek to jaw ratio", value: analysis.measurements.cheekToJawRatio.toFixed(2) },
              ]}
            />
          </ResultPanel>
        );
      }}
    </FaceUploadTool>
  );
}

export function CheekboneAnalyzerRunner() {
  return (
    <FaceUploadTool instructions={PHOTO_STEPS}>
      {({ analysis }) => (
        <ResultPanel title="Cheekbone placement">
          <p className="text-sm leading-relaxed text-[var(--foreground-muted)]">
            {cheekboneAdvice(
              analysis.measurements.cheekToJawRatio,
              analysis.faceShape.primary
            )}
          </p>
          <MetricGrid
            metrics={[
              { label: "Cheek to jaw", value: analysis.measurements.cheekToJawRatio.toFixed(2) },
              { label: "Face shape context", value: analysis.faceShape.primary },
            ]}
          />
        </ResultPanel>
      )}
    </FaceUploadTool>
  );
}

export function EyeShapeDetectorRunner() {
  return (
    <FaceUploadTool instructions={PHOTO_STEPS}>
      {({ analysis }) => (
        <ResultPanel title="Eye shape estimate">
          <ClassificationCard
            label="Eye shape"
            primary={analysis.eyeShape.primary}
            confidence={analysis.eyeShape.confidence}
            alternatives={analysis.eyeShape.alternatives}
            rationale={analysis.eyeShape.rationale}
            uncertain={analysis.eyeShape.uncertain}
          />
          {analysis.eyeShape.uncertain && (
            <p className="text-sm text-[var(--foreground-muted)]">
              Hooded and monolid types need a mirror check. Landmarks cannot see your crease. Try the{" "}
              <Link href="/tools/eyeshadow-placement-guide" className="text-[var(--dusty-rose)] hover:underline">
                eyeshadow placement guide
              </Link>{" "}
              after confirming shape.
            </p>
          )}
        </ResultPanel>
      )}
    </FaceUploadTool>
  );
}

export function EyebrowShapeDetectorRunner() {
  return (
    <FaceUploadTool instructions={PHOTO_STEPS}>
      {({ analysis }) => (
        <ResultPanel title="Brow shape">
          <ClassificationCard
            label="Eyebrow shape"
            primary={analysis.eyebrowShape.primary}
            confidence={analysis.eyebrowShape.confidence}
            alternatives={analysis.eyebrowShape.alternatives}
            rationale={analysis.eyebrowShape.rationale}
            uncertain={analysis.eyebrowShape.uncertain}
          />
        </ResultPanel>
      )}
    </FaceUploadTool>
  );
}

export function LipShapeDetectorRunner() {
  return (
    <FaceUploadTool instructions={PHOTO_STEPS}>
      {({ analysis }) => (
        <ResultPanel title="Lip shape">
          <ClassificationCard
            label="Lip shape"
            primary={analysis.lipShape.primary}
            confidence={analysis.lipShape.confidence}
            alternatives={analysis.lipShape.alternatives}
            rationale={analysis.lipShape.rationale}
            uncertain={analysis.lipShape.uncertain}
          />
        </ResultPanel>
      )}
    </FaceUploadTool>
  );
}

export function BlushPlacementFinderRunner() {
  return (
    <FaceUploadTool instructions={PHOTO_STEPS}>
      {({ analysis }) => {
        const shape = analysis.faceShape.primary;
        const advice = BLUSH_BY_FACE_SHAPE[shape];
        return (
          <ResultPanel title="Blush placement">
            <p className="text-sm text-[var(--foreground-muted)]">
              Based on {shape} face proportions:
            </p>
            <div className="border border-[var(--border)] bg-[var(--white)] p-5">
              <p className="font-medium text-[var(--foreground)]">{advice.title}</p>
              <p className="mt-2 text-sm text-[var(--foreground-muted)]">{advice.technique}</p>
              <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-[var(--foreground-muted)]">
                {advice.steps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
            </div>
            <PlacementDiagram faceShape={shape} activeType="blush" />
          </ResultPanel>
        );
      }}
    </FaceUploadTool>
  );
}

export function ContourPlacementGuideRunner() {
  return (
    <FaceUploadTool instructions={PHOTO_STEPS}>
      {({ analysis }) => {
        const shape = analysis.faceShape.primary;
        const advice = CONTOUR_BY_FACE_SHAPE[shape];
        return (
          <ResultPanel title="Contour map">
            <div className="border border-[var(--border)] bg-[var(--white)] p-5">
              <p className="font-medium text-[var(--foreground)]">{advice.title}</p>
              <p className="mt-2 text-sm text-[var(--foreground-muted)]">{advice.technique}</p>
              <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-[var(--foreground-muted)]">
                {advice.steps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
            </div>
            <PlacementDiagram faceShape={shape} activeType="contour" />
          </ResultPanel>
        );
      }}
    </FaceUploadTool>
  );
}

export function EyeshadowPlacementGuideRunner() {
  return (
    <FaceUploadTool instructions={PHOTO_STEPS}>
      {({ analysis }) => {
        const raw = analysis.eyeShape.primary;
        const eye: Exclude<EyeShape, "uncertain"> =
          raw === "uncertain" ? "almond" : raw;
        const advice = EYESHADOW_BY_EYE_SHAPE[eye];
        return (
          <ResultPanel title="Eyeshadow placement">
            {raw === "uncertain" && (
              <p className="text-sm text-[var(--dusty-rose)]">
                Eye shape uncertain from photo. We show almond placement. Confirm with{" "}
                <Link href="/tools/eye-shape-detector" className="underline">
                  eye shape detector
                </Link>{" "}
                or mirror.
              </p>
            )}
            <div className="border border-[var(--border)] bg-[var(--white)] p-5">
              <p className="font-medium capitalize text-[var(--foreground)]">
                {eye.replace(/_/g, " ")}: {advice.title}
              </p>
              <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-[var(--foreground-muted)]">
                {advice.steps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
            </div>
            <PlacementDiagram faceShape={analysis.faceShape.primary} activeType="eyes" />
          </ResultPanel>
        );
      }}
    </FaceUploadTool>
  );
}
