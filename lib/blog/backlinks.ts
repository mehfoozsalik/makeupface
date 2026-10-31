import {
  isRizzAllowlistedUrl,
  type RizzBacklinkPlan,
} from "@/data/blog/rizz-assist";
import type { BlogReference, GeneratedArticleLike } from "@/types/blog";

const MD_LINK_RE = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;

export function extractMarkdownLinks(
  text: string
): Array<{ anchor: string; url: string }> {
  const out: Array<{ anchor: string; url: string }> = [];
  for (const match of text.matchAll(MD_LINK_RE)) {
    out.push({ anchor: match[1]!, url: match[2]! });
  }
  return out;
}

export function collectArticleText(article: {
  title?: string;
  excerpt?: string;
  sections: Array<{
    heading: string;
    paragraphs: string[];
    bullets?: string[];
    quote?: string;
  }>;
}): string {
  const parts: string[] = [];
  if (article.title) parts.push(article.title);
  if (article.excerpt) parts.push(article.excerpt);
  for (const s of article.sections) {
    parts.push(s.heading);
    parts.push(...s.paragraphs);
    if (s.bullets) parts.push(...s.bullets);
    if (s.quote) parts.push(s.quote);
  }
  return parts.join("\n");
}

function normalizeUrl(url: string): string {
  try {
    const u = new URL(url.trim());
    let href = u.href;
    if (!href.endsWith("/")) href += "/";
    return href;
  } catch {
    return url;
  }
}

/** Strip non-allowlisted rizzassist links; leave other domains alone. */
export function scrubInvalidRizzLinks<T>(value: T): T {
  if (typeof value === "string") {
    return value.replace(MD_LINK_RE, (full, anchor: string, url: string) => {
      if (!url.includes("rizzassistgo.com")) return full;
      return isRizzAllowlistedUrl(url) ? full : anchor;
    }) as T;
  }
  if (Array.isArray(value)) {
    return value.map((v) => scrubInvalidRizzLinks(v)) as T;
  }
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      out[k] = scrubInvalidRizzLinks(v);
    }
    return out as T;
  }
  return value;
}

export function listAllowlistedLinksInArticle(article: {
  sections: Array<{
    heading: string;
    paragraphs: string[];
    bullets?: string[];
    quote?: string;
  }>;
}): Array<{ anchor: string; url: string }> {
  const text = collectArticleText(article);
  return extractMarkdownLinks(text).filter((l) => isRizzAllowlistedUrl(l.url));
}

/**
 * Ensure 2–4 allowlisted backlinks appear. Injects a short closing section
 * when the model under-delivered.
 */
export function ensureRizzBacklinks(
  article: GeneratedArticleLike,
  plan: RizzBacklinkPlan[]
): GeneratedArticleLike {
  const cleaned = scrubInvalidRizzLinks(article);
  const found = listAllowlistedLinksInArticle(cleaned);
  const foundNorm = new Set(found.map((l) => normalizeUrl(l.url)));

  const homepage = "https://rizzassistgo.com/";
  const homepageLinks = found.filter(
    (l) => normalizeUrl(l.url) === normalizeUrl(homepage)
  );
  // Keep at most one homepage link by converting extras later if needed.

  const missing = plan.filter((p) => !foundNorm.has(normalizeUrl(p.url)));
  const targetCount = Math.min(4, Math.max(2, plan.length));

  if (found.length >= 2 && found.length <= 4 && missing.length === 0) {
    return cleaned;
  }

  if (found.length >= targetCount) {
    return cleaned;
  }

  const toAdd = (missing.length ? missing : plan).slice(
    0,
    Math.max(0, targetCount - found.length)
  );

  if (toAdd.length === 0) return cleaned;

  const paragraphs = toAdd.map((p) => {
    const alreadyHome =
      normalizeUrl(p.url) === normalizeUrl(homepage) &&
      (foundNorm.has(normalizeUrl(homepage)) || homepageLinks.length > 0);
    if (alreadyHome) {
      return `If you want a broader toolkit beyond makeup, browse the free tools on Rizz Assist when you have a minute.`;
    }
    return `If you want a practical next step outside the vanity, try the [${p.suggestedAnchor}](${p.url}).`;
  });

  cleaned.sections = [
    ...cleaned.sections,
    {
      heading: "Helpful tools when you want a second opinion",
      paragraphs,
    },
  ];

  return cleaned;
}

export function referencesFromBacklinks(
  plan: RizzBacklinkPlan[],
  used: Array<{ anchor: string; url: string }>
): BlogReference[] {
  const byUrl = new Map<string, BlogReference>();
  for (const link of used) {
    const url = link.url.endsWith("/") ? link.url : `${link.url}/`;
    if (!byUrl.has(url)) {
      byUrl.set(url, {
        title: link.anchor,
        url,
        author: "Rizz Assist",
        note: "Related free guide or tool. Linked for the reader, not as a rewrite.",
      });
    }
  }
  for (const p of plan) {
    const url = p.url;
    if (!byUrl.has(url) && used.some((u) => normalizeUrl(u.url) === normalizeUrl(url))) {
      byUrl.set(url, {
        title: p.suggestedAnchor,
        url,
        author: "Rizz Assist",
        note: "Related free guide or tool. Linked for the reader, not as a rewrite.",
      });
    }
  }
  return [...byUrl.values()];
}
