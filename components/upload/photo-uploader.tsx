"use client";

import { useCallback, useRef, useState } from "react";
import { Camera, ImagePlus, Loader2, Trash2, ZoomIn, ZoomOut } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { ImageTransform } from "@/hooks/use-image-upload";
import { cn } from "@/lib/utils/cn";

export interface PhotoUploaderProps {
  previewDataUrl: string | null;
  fileName: string | null;
  transform: ImageTransform;
  error: string | null;
  isLoading: boolean;
  onFile: (file: File) => Promise<boolean>;
  onCameraCapture: (dataUrl: string) => Promise<boolean>;
  onTransformChange: (patch: Partial<ImageTransform>) => void;
  onApplyTransform: () => Promise<string | null>;
  onRemove: () => void;
  className?: string;
}

export function PhotoUploader({
  previewDataUrl,
  fileName,
  transform,
  error,
  isLoading,
  onFile,
  onCameraCapture,
  onTransformChange,
  onApplyTransform,
  onRemove,
  className,
}: PhotoUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraBusy, setCameraBusy] = useState(false);
  const streamRef = useRef<MediaStream | null>(null);
  const reduce = useReducedMotion();

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setCameraOpen(false);
  }, []);

  const startCamera = useCallback(async () => {
    setCameraBusy(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = stream;
      setCameraOpen(true);
      requestAnimationFrame(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          void videoRef.current.play();
        }
      });
    } catch {
      toast.error("Camera access was denied or unavailable.");
    } finally {
      setCameraBusy(false);
    }
  }, []);

  const capturePhoto = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;
    const w = video.videoWidth;
    const h = video.videoHeight;
    if (!w || !h) return;
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, w, h);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
    stopCamera();
    const ok = await onCameraCapture(dataUrl);
    if (ok) toast.success("Photo captured");
  }, [onCameraCapture, stopCamera]);

  const handleFiles = useCallback(
    async (files: FileList | null) => {
      const file = files?.[0];
      if (!file) return;
      const ok = await onFile(file);
      if (ok) toast.success("Photo uploaded");
    },
    [onFile]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      void handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  return (
    <div className={cn("space-y-4", className)}>
      <div className="border border-[var(--border)] bg-[var(--white)] p-4 sm:p-6">
        <h2 className="font-serif text-xl text-[var(--foreground)]">
          Upload a clear selfie
        </h2>
        <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-[var(--foreground-muted)]">
          <li>Face the camera with even, natural light</li>
          <li>Remove glasses; keep hair off your face if possible</li>
          <li>JPEG, PNG, or WebP, up to 8MB</li>
          <li>Your photo stays on this device and is never sent to our servers</li>
        </ul>
      </div>

      {!previewDataUrl && !cameraOpen && (
        <motion.div
          initial={reduce ? false : { opacity: 0, transform: "translateY(6px)" }}
          animate={{ opacity: 1, transform: "translateY(0px)" }}
          transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          className={cn(
            "flex min-h-[220px] flex-col items-center justify-center gap-4 border-2 border-dashed p-8 transition-colors duration-150",
            dragOver
              ? "border-[var(--dusty-rose)] bg-[var(--dusty-rose)]/5"
              : "border-[var(--border)] bg-[var(--background-secondary)]"
          )}
        >
          <ImagePlus className="size-10 text-[var(--soft-mauve)]" />
          <p className="text-center text-sm text-[var(--foreground-muted)]">
            Drag and drop a photo here, or choose a file
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Button
              type="button"
              variant="primary"
              onClick={() => inputRef.current?.click()}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <ImagePlus className="size-4" />
              )}
              Choose file
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => void startCamera()}
              disabled={cameraBusy || isLoading}
            >
              <Camera className="size-4" />
              Use camera
            </Button>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="sr-only"
            onChange={(e) => void handleFiles(e.target.files)}
          />
        </motion.div>
      )}

      {cameraOpen && (
        <div className="space-y-3 border border-[var(--border)] bg-[var(--white)] p-4">
          <video
            ref={videoRef}
            playsInline
            muted
            className="aspect-[4/3] w-full max-h-[360px] bg-black object-cover"
          />
          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => void capturePhoto()}>
              Capture
            </Button>
            <Button type="button" variant="ghost" onClick={stopCamera}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {previewDataUrl && (
        <div className="space-y-4 border border-[var(--border)] bg-[var(--white)] p-4">
          <div className="relative overflow-hidden bg-[var(--background-secondary)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewDataUrl}
              alt="Preview"
              className="mx-auto max-h-[420px] w-full object-contain"
              style={{
                transform: `scale(${transform.scale}) translate(${transform.offsetX * 12}%, ${transform.offsetY * 12}%)`,
                transition: reduce ? "none" : "transform 150ms cubic-bezier(0.23, 1, 0.32, 1)",
              }}
            />
          </div>
          {fileName && (
            <p className="truncate text-xs text-[var(--foreground-muted)]">
              {fileName}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-[var(--foreground-muted)]">Adjust</span>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              aria-label="Zoom out"
              onClick={() =>
                onTransformChange({ scale: transform.scale - 0.1 })
              }
            >
              <ZoomOut className="size-4" />
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              aria-label="Zoom in"
              onClick={() =>
                onTransformChange({ scale: transform.scale + 0.1 })
              }
            >
              <ZoomIn className="size-4" />
            </Button>
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={() => void onApplyTransform().then((url) => url && toast.message("Crop applied"))}
            >
              Apply crop
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => inputRef.current?.click()}
            >
              Replace
            </Button>
            <Button type="button" size="sm" variant="ghost" onClick={onRemove}>
              <Trash2 className="size-4" />
              Remove
            </Button>
          </div>

          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="sr-only"
            onChange={(e) => void handleFiles(e.target.files)}
          />
        </div>
      )}

      {error && (
        <p className="text-sm text-[var(--destructive)]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
