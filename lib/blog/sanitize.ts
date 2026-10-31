/** Strip em/en dashes and common AI tells from generated text. */
export function stripDashes(text: string): string {
  return text
    .replace(/\u2014/g, ",")
    .replace(/\u2013/g, ",")
    .replace(/\s+-\s+/g, ", ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

export function sanitizeDeep<T>(value: T): T {
  if (typeof value === "string") {
    return stripDashes(value) as T;
  }
  if (Array.isArray(value)) {
    return value.map((v) => sanitizeDeep(v)) as T;
  }
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      out[k] = sanitizeDeep(v);
    }
    return out as T;
  }
  return value;
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}
