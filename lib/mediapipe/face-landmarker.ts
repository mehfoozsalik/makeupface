import type { LandmarkPoint } from "@/types/face-analysis";

export interface LandmarkerResult {
  landmarks: LandmarkPoint[];
  faceCount: number;
}

type FaceLandmarkerInstance = {
  detect: (input: HTMLCanvasElement | HTMLImageElement | ImageBitmap) => {
    faceLandmarks: Array<Array<{ x: number; y: number; z: number }>>;
  };
  close: () => void;
};

let landmarkerPromise: Promise<FaceLandmarkerInstance> | null = null;

const MODEL_URL =
  "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task";

/** Keep WASM fileset version aligned with the installed npm package. */
const PACKAGE_VERSION = "1.2.0";
const LOCAL_WASM = "/mediapipe/wasm";
const CDN_WASM = `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${PACKAGE_VERSION}/wasm`;

const NOISE =
  /XNNPACK|TensorFlow Lite|OpenGL error checking|FaceBlendshapesGraph|gl_context\.cc|face_landmarker_graph\.cc/i;

/**
 * MediaPipe writes TFLite INFO lines through stderr → console.error,
 * which Next.js overlays as a red "Console Error" even when detection works.
 */
async function withSilencedMediaPipeNoise<T>(fn: () => Promise<T> | T): Promise<T> {
  const keys = ["log", "info", "warn", "error", "debug"] as const;
  const originals = keys.map((k) => console[k]);

  const ignore = (args: unknown[]) =>
    NOISE.test(args.map((a) => (typeof a === "string" ? a : String(a))).join(" "));

  for (const k of keys) {
    console[k] = (...args: unknown[]) => {
      if (ignore(args)) return;
      (originals[keys.indexOf(k)] as (...a: unknown[]) => void)(...args);
    };
  }

  try {
    return await fn();
  } finally {
    keys.forEach((k, i) => {
      console[k] = originals[i] as typeof console.log;
    });
  }
}

async function createLandmarker(
  wasmPath: string,
  delegate: "CPU" | "GPU"
): Promise<FaceLandmarkerInstance> {
  const vision = await import("@mediapipe/tasks-vision");
  const { FaceLandmarker, FilesetResolver } = vision;
  const fileset = await FilesetResolver.forVisionTasks(wasmPath);
  return FaceLandmarker.createFromOptions(fileset, {
    baseOptions: {
      modelAssetPath: MODEL_URL,
      delegate,
    },
    runningMode: "IMAGE",
    numFaces: 3,
    outputFaceBlendshapes: false,
    outputFacialTransformationMatrixes: false,
  }) as Promise<FaceLandmarkerInstance>;
}

/**
 * Lazily load MediaPipe Face Landmarker in the browser only.
 * Never import this module from a Server Component.
 */
export async function getFaceLandmarker(): Promise<FaceLandmarkerInstance> {
  if (typeof window === "undefined") {
    throw new Error("Face Landmarker can only run in the browser.");
  }

  if (!landmarkerPromise) {
    landmarkerPromise = (async () => {
      const attempts: Array<{ wasm: string; delegate: "CPU" | "GPU" }> = [
        { wasm: LOCAL_WASM, delegate: "CPU" },
        { wasm: CDN_WASM, delegate: "CPU" },
        { wasm: LOCAL_WASM, delegate: "GPU" },
        { wasm: CDN_WASM, delegate: "GPU" },
      ];

      let lastError: unknown;
      for (const attempt of attempts) {
        try {
          return await withSilencedMediaPipeNoise(() =>
            createLandmarker(attempt.wasm, attempt.delegate)
          );
        } catch (err) {
          lastError = err;
        }
      }
      throw lastError instanceof Error
        ? lastError
        : new Error("Could not initialize face detection.");
    })().catch((err) => {
      landmarkerPromise = null;
      throw err;
    });
  }

  return landmarkerPromise;
}

/** Draw the source into a canvas so MediaPipe always receives decoded pixel data. */
async function toDetectionCanvas(
  source: HTMLImageElement | HTMLCanvasElement
): Promise<HTMLCanvasElement> {
  if (source instanceof HTMLCanvasElement) {
    if (source.width < 1 || source.height < 1) {
      throw new Error("Image canvas is empty. Please re-upload your photo.");
    }
    return source;
  }

  if ("decode" in source && typeof source.decode === "function") {
    try {
      await source.decode();
    } catch {
      /* already complete or decode unsupported */
    }
  }

  const w = source.naturalWidth || source.width;
  const h = source.naturalHeight || source.height;
  if (!w || !h) {
    throw new Error(
      "Photo is still loading. Wait a moment and try again, or re-upload."
    );
  }

  const maxSide = 1280;
  const scale = Math.min(1, maxSide / Math.max(w, h));
  const cw = Math.max(1, Math.round(w * scale));
  const ch = Math.max(1, Math.round(h * scale));

  const canvas = document.createElement("canvas");
  canvas.width = cw;
  canvas.height = ch;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) {
    throw new Error("Could not prepare the image for face detection.");
  }
  ctx.drawImage(source, 0, 0, cw, ch);
  return canvas;
}

export async function detectFaceLandmarks(
  source: HTMLImageElement | HTMLCanvasElement
): Promise<LandmarkerResult> {
  const landmarker = await getFaceLandmarker();
  const canvas = await toDetectionCanvas(source);

  const result = await withSilencedMediaPipeNoise(() => landmarker.detect(canvas));
  const faces = result.faceLandmarks ?? [];
  const first = faces[0];

  if (!first || first.length === 0) {
    return { landmarks: [], faceCount: faces.length };
  }

  const landmarks: LandmarkPoint[] = first.map((p) => ({
    x: p.x,
    y: p.y,
    z: p.z,
  }));

  return { landmarks, faceCount: faces.length };
}

export function releaseFaceLandmarker() {
  landmarkerPromise?.then((l) => l.close()).catch(() => undefined);
  landmarkerPromise = null;
}
