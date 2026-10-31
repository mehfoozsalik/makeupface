import { NextResponse } from "next/server";
import { DeepSeekError, generateLookTryOnGuide } from "@/lib/ai/deepseek";
import { lookTryOnRequestSchema } from "@/lib/ai/schemas";

const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 6;
const WINDOW_MS = 60_000;

function getClientIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "anonymous"
  );
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count += 1;
  return true;
}

function rejectsPhotos(body: unknown): boolean {
  if (!body || typeof body !== "object") return false;
  const raw = body as Record<string, unknown>;
  return (
    "image" in raw ||
    "photo" in raw ||
    "imageBase64" in raw ||
    "dataUrl" in raw ||
    "inspirationImage" in raw ||
    "selfie" in raw
  );
}

export async function POST(req: Request) {
  const ip = getClientIp(req);
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a minute and try again." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (rejectsPhotos(body)) {
    return NextResponse.json(
      {
        error:
          "Photographs are not accepted. Send structured look colors and face data only.",
      },
      { status: 400 }
    );
  }

  const parsed = lookTryOnRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid look try-on payload.", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  try {
    const result = await generateLookTryOnGuide(parsed.data);
    return NextResponse.json(result);
  } catch (err) {
    if (err instanceof DeepSeekError) {
      return NextResponse.json(
        { error: err.message, code: err.code },
        { status: err.status ?? 502 }
      );
    }
    return NextResponse.json(
      { error: "Failed to generate look recreation guide." },
      { status: 502 }
    );
  }
}
