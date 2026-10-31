"use client";

import { useCallback, useState } from "react";
import type { LandmarkerResult } from "@/lib/mediapipe/face-landmarker";
import { loadImage } from "@/lib/validation/upload";

export interface UseFaceLandmarkerResult {
  isLoading: boolean;
  error: string | null;
  result: LandmarkerResult | null;
  detectFromDataUrl: (dataUrl: string) => Promise<LandmarkerResult | null>;
  detectFromElement: (
    source: HTMLImageElement | HTMLCanvasElement
  ) => Promise<LandmarkerResult | null>;
  reset: () => void;
}

export function useFaceLandmarker(): UseFaceLandmarkerResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<LandmarkerResult | null>(null);

  const runDetect = useCallback(
    async (source: HTMLImageElement | HTMLCanvasElement) => {
      setIsLoading(true);
      setError(null);
      try {
        const { detectFaceLandmarks } = await import(
          "@/lib/mediapipe/face-landmarker"
        );
        const out = await detectFaceLandmarks(source);
        setResult(out);
        if (out.landmarks.length === 0) {
          setError(
            out.faceCount > 1
              ? "Multiple faces detected. Use a photo with one clear face."
              : "No face detected. Try better lighting and face the camera."
          );
          return null;
        }
        return out;
      } catch (err) {
        const raw =
          err instanceof Error ? err.message : "Face detection failed.";
        setError(
          raw.length > 180
            ? "Face detection failed. Try another photo (JPEG/PNG/WebP, clear front-facing selfie)."
            : raw
        );
        setResult(null);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const detectFromDataUrl = useCallback(
    async (dataUrl: string) => {
      const img = await loadImage(dataUrl);
      return runDetect(img);
    },
    [runDetect]
  );

  const detectFromElement = useCallback(
    async (source: HTMLImageElement | HTMLCanvasElement) => runDetect(source),
    [runDetect]
  );

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    result,
    detectFromDataUrl,
    detectFromElement,
    reset,
  };
}
