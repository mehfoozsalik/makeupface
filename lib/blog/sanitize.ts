/** Strip em/en dashes, curly quotes, and common AI writing tells. */
export function stripDashes(text: string): string {
  return humanizeAiTells(text);
}

/** Lightweight humanizer pass for generated blog copy (Wikipedia AI-writing tells). */
export function humanizeAiTells(text: string): string {
  return text
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/\u2014/g, ",")
    .replace(/\u2013/g, ",")
    .replace(/\s+-\s+/g, ", ")
    .replace(/\bAdditionally,\s+/gi, "")
    .replace(/\bFurthermore,\s+/gi, "")
    .replace(/\bMoreover,\s+/gi, "")
    .replace(/\bIn conclusion,\s*/gi, "")
    .replace(/\bAt its core,\s*/gi, "")
    .replace(/\bIn order to\s+/gi, "To ")
    .replace(/\bDue to the fact that\s+/gi, "Because ")
    .replace(/\bstands as a\s+/gi, "is a ")
    .replace(/\bserves as a\s+/gi, "is a ")
    .replace(/\bserves as\s+/gi, "is ")
    .replace(/\bboasts\s+/gi, "has ")
    .replace(/\bdelve into\s+/gi, "look at ")
    .replace(/\btestament to\s+/gi, "sign of ")
    .replace(/\bunderscoring\s+/gi, "showing ")
    .replace(/\bhighlighting\s+/gi, "showing ")
    .replace(/\bfostering\s+/gi, "building ")
    .replace(/\bseamless(?:ly)?\b/gi, (m) =>
      m.toLowerCase().endsWith("y") ? "evenly" : "even"
    )
    .replace(
      /\bIt(?:['’]s| is) not just about ([^.;]+);\s*it(?:['’]s| is) about\s+/gi,
      "It comes down to "
    )
    .replace(/\bI hope this helps!?/gi, "")
    .replace(/\bLet me know if you(?:['’]d| would) like[^.]*\./gi, "")
    .replace(/\bGreat question!?/gi, "")
    .replace(/\bExciting times lie ahead[^.]*\./gi, "")
    .replace(/\bThe future looks bright[^.]*\./gi, "")
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([,.;:!?])/g, "$1")
    .trim();
}

export function sanitizeDeep<T>(value: T): T {
  if (typeof value === "string") {
    return humanizeAiTells(value) as T;
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
