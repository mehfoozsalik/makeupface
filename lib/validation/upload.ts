const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024; // 8MB
export const MIN_DIMENSION = 200;
export const MAX_DIMENSION = 4096;

export function validateImageFile(file: File): string | null {
  if (!ALLOWED_TYPES.has(file.type)) {
    return "Please upload a JPEG, PNG, or WebP image.";
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return "Image must be 8MB or smaller.";
  }
  if (file.size < 1024) {
    return "File appears too small to be a valid photo.";
  }
  return null;
}

export async function validateImageDimensions(
  file: File
): Promise<{ width: number; height: number; error: string | null }> {
  const url = URL.createObjectURL(file);
  try {
    const img = await loadImage(url);
    const { width, height } = img;
    if (width < MIN_DIMENSION || height < MIN_DIMENSION) {
      return {
        width,
        height,
        error: `Image is too small (${width}×${height}). Use at least ${MIN_DIMENSION}px on each side.`,
      };
    }
    if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
      return {
        width,
        height,
        error: `Image is too large (${width}×${height}). Maximum is ${MAX_DIMENSION}px per side.`,
      };
    }
    return { width, height, error: null };
  } finally {
    URL.revokeObjectURL(url);
  }
}

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Could not load image."));
    img.src = src;
  });
}
