import { NextResponse } from "next/server";
import { DeepSeekError, generateMakeupRecommendations } from "@/lib/ai/deepseek";
import { makeupAnalysisRequestSchema } from "@/lib/ai/schemas";

const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 8;
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

  const parsed = makeupAnalysisRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid analysis payload.", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  // Privacy: never accept or forward image data
  const raw = body as Record<string, unknown>;
  if (
    "image" in raw ||
    "photo" in raw ||
    "imageBase64" in raw ||
    "dataUrl" in raw
  ) {
    return NextResponse.json(
      { error: "Photographs are not accepted. Send structured analysis only." },
      { status: 400 }
    );
  }

  try {
    const result = await generateMakeupRecommendations(parsed.data);
    return NextResponse.json(result);
  } catch (err) {
    if (err instanceof DeepSeekError) {
      return NextResponse.json(
        { error: err.message, code: err.code },
        { status: err.status ?? 502 }
      );
    }
    return NextResponse.json(
      { error: "Failed to generate recommendations." },
      { status: 502 }
    );
  }
}
