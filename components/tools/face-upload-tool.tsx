"use client";

import { useCallback, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PhotoUploader } from "@/components/upload/photo-uploader";
import { useFaceLandmarker } from "@/hooks/use-face-landmarker";
import { useImageUpload } from "@/hooks/use-image-upload";
import { analyzeFaceFromLandmarks } from "@/lib/face-analysis/analyze";
import { loadImage } from "@/lib/validation/upload";
import type { FaceAnalysisResult } from "@/types/face-analysis";

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

export interface FaceUploadToolProps {
  instructions?: string[];
  children: (ctx: {
    analysis: FaceAnalysisResult;
    previewDataUrl: string | null;
  }) => React.ReactNode;
}

export function FaceUploadTool({ instructions, children }: FaceUploadToolProps) {
  const upload = useImageUpload();
  const landmarker = useFaceLandmarker();
  const [analysis, setAnalysis] = useState<FaceAnalysisResult | null>(null);
  const [analyzeError, setAnalyzeError] = useState<string | null>(null);

  const runAnalyze = useCallback(async () => {
    const dataUrl = upload.previewDataUrl;
    if (!dataUrl) {
      setAnalyzeError("Upload a photo first.");
      return;
    }
    setAnalyzeError(null);
    const img = await loadImage(dataUrl);
    const lm = await landmarker.detectFromElement(img);
    if (!lm?.landmarks.length) return;
    const imageData = sampleImageData(img);
    const result = analyzeFaceFromLandmarks(
      lm.landmarks,
      lm.faceCount,
      img.naturalWidth,
      img.naturalHeight,
      imageData
    );
    setAnalysis(result);
  }, [landmarker, upload.previewDataUrl]);

  const resetAll = useCallback(() => {
    upload.remove();
    landmarker.reset();
    setAnalysis(null);
    setAnalyzeError(null);
  }, [landmarker, upload]);

  const displayError =
    analyzeError || upload.error || landmarker.error;

  return (
    <div className="space-y-6">
      {instructions && instructions.length > 0 && (
        <div className="border border-[var(--border)] bg-[var(--white)] p-4 sm:p-5">
          <h3 className="font-serif text-lg text-[var(--foreground)]">How to use</h3>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-[var(--foreground-muted)]">
            {instructions.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
      )}

      <PhotoUploader
        previewDataUrl={upload.previewDataUrl}
        fileName={upload.fileName}
        transform={upload.transform}
        error={displayError}
        isLoading={upload.isLoading || landmarker.isLoading}
        onFile={upload.setFromFile}
        onCameraCapture={upload.setFromDataUrl}
        onTransformChange={upload.setTransform}
        onApplyTransform={upload.renderTransformedDataUrl}
        onRemove={() => {
          upload.remove();
          landmarker.reset();
          setAnalysis(null);
        }}
      />

      {upload.previewDataUrl && !analysis && (
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            onClick={() => void runAnalyze()}
            disabled={landmarker.isLoading}
          >
            {landmarker.isLoading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : null}
            Analyze photo
          </Button>
        </div>
      )}

      {analysis && (
        <>
          {children({ analysis, previewDataUrl: upload.previewDataUrl })}
          <Button type="button" variant="secondary" onClick={resetAll}>
            Reset
          </Button>
        </>
      )}
    </div>
  );
}
