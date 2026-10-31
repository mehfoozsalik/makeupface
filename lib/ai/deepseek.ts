import {
  LOOK_TRY_ON_SYSTEM_PROMPT,
  MAKEUP_SYSTEM_PROMPT,
  buildLookTryOnPrompt,
  buildUserPrompt,
} from "./prompts";
import {
  lookTryOnResponseSchema,
  makeupAIResponseSchema,
  type LookTryOnResponseParsed,
  type MakeupAIResponseParsed,
} from "./schemas";

const DEEPSEEK_URL = "https://api.deepseek.com/chat/completions";

export class DeepSeekError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = "DeepSeekError";
  }
}

function extractJson(text: string): unknown {
  const trimmed = text.trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (fenced?.[1]) {
      return JSON.parse(fenced[1].trim());
    }
    const start = trimmed.indexOf("{");
    const end = trimmed.lastIndexOf("}");
    if (start >= 0 && end > start) {
      return JSON.parse(trimmed.slice(start, end + 1));
    }
    throw new DeepSeekError("Model response was not valid JSON", 502, "invalid_json");
  }
}

export async function generateMakeupRecommendations(
  payload: unknown,
  options?: { timeoutMs?: number; retries?: number }
): Promise<MakeupAIResponseParsed> {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  const model = process.env.DEEPSEEK_MODEL || "deepseek-chat";

  if (!apiKey) {
    throw new DeepSeekError(
      "DeepSeek API key is not configured. Set DEEPSEEK_API_KEY in your environment.",
      503,
      "missing_key"
    );
  }

  const timeoutMs = options?.timeoutMs ?? 45000;
  const retries = options?.retries ?? 1;
  let lastError: unknown;

  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const res = await fetch(DEEPSEEK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: "system", content: MAKEUP_SYSTEM_PROMPT },
            { role: "user", content: buildUserPrompt(payload) },
          ],
          temperature: 0.6,
          response_format: { type: "json_object" },
        }),
        signal: controller.signal,
      });

      if (!res.ok) {
        const body = await res.text().catch(() => "");
        throw new DeepSeekError(
          `DeepSeek request failed (${res.status}). ${body.slice(0, 200)}`,
          res.status,
          "api_error"
        );
      }

      const data = (await res.json()) as {
        choices?: Array<{ message?: { content?: string } }>;
      };
      const content = data.choices?.[0]?.message?.content;
      if (!content) {
        throw new DeepSeekError("Empty response from DeepSeek", 502, "empty");
      }

      const parsed = extractJson(content);
      const validated = makeupAIResponseSchema.safeParse(parsed);
      if (!validated.success) {
        throw new DeepSeekError(
          `AI response failed schema validation: ${validated.error.message}`,
          502,
          "schema"
        );
      }
      return validated.data;
    } catch (err) {
      lastError = err;
      if (err instanceof DeepSeekError && err.status && err.status < 500) {
        throw err;
      }
      if (attempt === retries) break;
    } finally {
      clearTimeout(timer);
    }
  }

  if (lastError instanceof DeepSeekError) throw lastError;
  if (lastError instanceof Error && lastError.name === "AbortError") {
    throw new DeepSeekError("DeepSeek request timed out", 504, "timeout");
  }
  throw new DeepSeekError(
    lastError instanceof Error ? lastError.message : "Unknown DeepSeek error",
    502,
    "unknown"
  );
}

export async function generateLookTryOnGuide(
  payload: unknown,
  options?: { timeoutMs?: number; retries?: number }
): Promise<LookTryOnResponseParsed> {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  const model = process.env.DEEPSEEK_MODEL || "deepseek-chat";

  if (!apiKey) {
    throw new DeepSeekError(
      "DeepSeek API key is not configured. Set DEEPSEEK_API_KEY in your environment.",
      503,
      "missing_key"
    );
  }

  const timeoutMs = options?.timeoutMs ?? 45000;
  const retries = options?.retries ?? 1;
  let lastError: unknown;

  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const res = await fetch(DEEPSEEK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: "system", content: LOOK_TRY_ON_SYSTEM_PROMPT },
            { role: "user", content: buildLookTryOnPrompt(payload) },
          ],
          temperature: 0.55,
          response_format: { type: "json_object" },
        }),
        signal: controller.signal,
      });

      if (!res.ok) {
        const body = await res.text().catch(() => "");
        throw new DeepSeekError(
          `DeepSeek request failed (${res.status}). ${body.slice(0, 200)}`,
          res.status,
          "api_error"
        );
      }

      const data = (await res.json()) as {
        choices?: Array<{ message?: { content?: string } }>;
      };
      const content = data.choices?.[0]?.message?.content;
      if (!content) {
        throw new DeepSeekError("Empty response from DeepSeek", 502, "empty");
      }

      const parsed = extractJson(content);
      const validated = lookTryOnResponseSchema.safeParse(parsed);
      if (!validated.success) {
        throw new DeepSeekError(
          `AI response failed schema validation: ${validated.error.message}`,
          502,
          "schema"
        );
      }
      return validated.data;
    } catch (err) {
      lastError = err;
      if (err instanceof DeepSeekError && err.status && err.status < 500) {
        throw err;
      }
      if (attempt === retries) break;
    } finally {
      clearTimeout(timer);
    }
  }

  if (lastError instanceof DeepSeekError) throw lastError;
  if (lastError instanceof Error && lastError.name === "AbortError") {
    throw new DeepSeekError("DeepSeek request timed out", 504, "timeout");
  }
  throw new DeepSeekError(
    lastError instanceof Error ? lastError.message : "Unknown DeepSeek error",
    502,
    "unknown"
  );
}
