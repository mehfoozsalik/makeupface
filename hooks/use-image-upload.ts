"use client";

import { useCallback, useState } from "react";
import { loadImage, validateImageDimensions, validateImageFile } from "@/lib/validation/upload";

export interface ImageTransform {
  scale: number;
  offsetX: number;
  offsetY: number;
}

const DEFAULT_TRANSFORM: ImageTransform = {
  scale: 1,
  offsetX: 0,
  offsetY: 0,
};

export interface UseImageUploadResult {
  previewDataUrl: string | null;
  fileName: string | null;
  width: number | null;
  height: number | null;
  transform: ImageTransform;
  error: string | null;
  isLoading: boolean;
  setFromFile: (file: File) => Promise<boolean>;
  setFromDataUrl: (dataUrl: string, name?: string) => Promise<boolean>;
  setTransform: (patch: Partial<ImageTransform>) => void;
  resetTransform: () => void;
  renderTransformedDataUrl: () => Promise<string | null>;
  remove: () => void;
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Could not read file."));
    reader.readAsDataURL(file);
  });
}

export function drawTransformedImage(
  img: HTMLImageElement,
  transform: ImageTransform,
  maxSide = 1600
): { dataUrl: string; width: number; height: number } {
  const srcW = img.naturalWidth;
  const srcH = img.naturalHeight;
  const scaleToMax = Math.min(1, maxSide / Math.max(srcW, srcH));
  const outW = Math.round(srcW * scaleToMax);
  const outH = Math.round(srcH * scaleToMax);

  const canvas = document.createElement("canvas");
  canvas.width = outW;
  canvas.height = outH;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported.");

  ctx.fillStyle = "#faf8f5";
  ctx.fillRect(0, 0, outW, outH);

  const zoom = transform.scale;
  const drawW = outW * zoom;
  const drawH = outH * zoom;
  const dx = (outW - drawW) / 2 + transform.offsetX * outW * 0.25;
  const dy = (outH - drawH) / 2 + transform.offsetY * outH * 0.25;

  ctx.drawImage(img, dx, dy, drawW, drawH);

  return {
    dataUrl: canvas.toDataURL("image/jpeg", 0.92),
    width: outW,
    height: outH,
  };
}

export function useImageUpload(): UseImageUploadResult {
  const [previewDataUrl, setPreviewDataUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [width, setWidth] = useState<number | null>(null);
  const [height, setHeight] = useState<number | null>(null);
  const [transform, setTransformState] = useState<ImageTransform>(DEFAULT_TRANSFORM);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const applyDataUrl = useCallback(async (dataUrl: string, name: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const img = await loadImage(dataUrl);
      setPreviewDataUrl(dataUrl);
      setFileName(name);
      setWidth(img.naturalWidth);
      setHeight(img.naturalHeight);
      setTransformState(DEFAULT_TRANSFORM);
      return true;
    } catch {
      setError("Could not load image.");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const setFromFile = useCallback(
    async (file: File) => {
      const typeErr = validateImageFile(file);
      if (typeErr) {
        setError(typeErr);
        return false;
      }
      const dims = await validateImageDimensions(file);
      if (dims.error) {
        setError(dims.error);
        return false;
      }
      try {
        const dataUrl = await fileToDataUrl(file);
        return applyDataUrl(dataUrl, file.name);
      } catch {
        setError("Could not read file.");
        return false;
      }
    },
    [applyDataUrl]
  );

  const setFromDataUrl = useCallback(
    async (dataUrl: string, name = "camera-capture.jpg") => {
      return applyDataUrl(dataUrl, name);
    },
    [applyDataUrl]
  );

  const setTransform = useCallback((patch: Partial<ImageTransform>) => {
    setTransformState((t) => ({
      ...t,
      ...patch,
      scale: Math.min(2.5, Math.max(0.75, patch.scale ?? t.scale)),
      offsetX: Math.min(1, Math.max(-1, patch.offsetX ?? t.offsetX)),
      offsetY: Math.min(1, Math.max(-1, patch.offsetY ?? t.offsetY)),
    }));
  }, []);

  const resetTransform = useCallback(() => {
    setTransformState(DEFAULT_TRANSFORM);
  }, []);

  const renderTransformedDataUrl = useCallback(async () => {
    if (!previewDataUrl) return null;
    const img = await loadImage(previewDataUrl);
    const { dataUrl, width: w, height: h } = drawTransformedImage(img, transform);
    setPreviewDataUrl(dataUrl);
    setWidth(w);
    setHeight(h);
    setTransformState(DEFAULT_TRANSFORM);
    return dataUrl;
  }, [previewDataUrl, transform]);

  const remove = useCallback(() => {
    setPreviewDataUrl(null);
    setFileName(null);
    setWidth(null);
    setHeight(null);
    setTransformState(DEFAULT_TRANSFORM);
    setError(null);
  }, []);

  return {
    previewDataUrl,
    fileName,
    width,
    height,
    transform,
    error,
    isLoading,
    setFromFile,
    setFromDataUrl,
    setTransform,
    resetTransform,
    renderTransformedDataUrl,
    remove,
  };
}
