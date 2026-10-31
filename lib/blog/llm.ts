import { z } from "zod";
import type { RizzBacklinkPlan } from "@/data/blog/rizz-assist";
import type { BlogTopic, ImageBrief } from "@/types/blog";
import { ensureRizzBacklinks } from "./backlinks";
import { sanitizeDeep, slugify } from "./sanitize";

const DEEPSEEK_URL = "https://api.deepseek.com/chat/completions";

const articleSchema = z.object({
  title: z.string(),
  excerpt: z.string(),
  slug: z.string(),
  readMinutes: z.number(),
  usedInspiration: z.boolean().optional(),
  sections: z
    .array(
      z.object({
        heading: z.string(),
        paragraphs: z.array(z.string()),
        bullets: z.array(z.string()).optional(),
        quote: z.string().optional(),
      })
    )
    .min(4),
});

const briefsSchema = z.object({
  briefs: z
    .array(
      z.object({
        query: z.string(),
        visual: z.string(),
        role: z.enum(["cover", "inline"]),
        afterHeading: z.string().optional(),
      })
    )
    .min(4)
    .max(4),
});

export type GeneratedArticle = z.infer<typeof articleSchema>;

async function chatJson(system: string, user: string): Promise<unknown> {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  const model = process.env.DEEPSEEK_MODEL || "deepseek-chat";
  if (!apiKey) {
    throw new Error("DEEPSEEK_API_KEY is not set.");
  }

  const res = await fetch(DEEPSEEK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.7,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`DeepSeek error ${res.status}: ${body.slice(0, 200)}`);
  }

  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("Empty DeepSeek response");

  try {
    return JSON.parse(content);
  } catch {
    const start = content.indexOf("{");
    const end = content.lastIndexOf("}");
    if (start >= 0 && end > start) {
      return JSON.parse(content.slice(start, end + 1));
    }
    throw new Error("DeepSeek returned non-JSON");
  }
}

const ARTICLE_SYSTEM = `You are a makeup educator writing for MakeUp Face Ai.
Voice: warm practical friend who has coached this in real life. Contractions OK. Mix short and long sentences. Concrete examples.
Hard bans: no em dashes, no en dashes, no AI fluff words like delve, landscape, robust, in today's world, it's important to note, unlock your potential, game-changer.
No medical claims. Original wording only. Return JSON only.`;

const RIZZ_BACKLINK_SYSTEM = `${ARTICLE_SYSTEM}

This article must naturally recommend Rizz Assist (https://rizzassistgo.com) as a free practical tool or deeper guide.
Rules:
1. Write for the reader first. Do not spam links.
2. Include exactly 3 contextual backlinks using ONLY the URLs provided in the user prompt.
3. Prefer specific blog posts or tool pages, not only the homepage. At most one homepage link.
4. Anchor text must be descriptive and varied (not always "click here" or "Rizz Assist").
5. Disclose lightly when useful: e.g. "free tool", "guide on Rizz Assist".
6. Do not copy Rizz Assist article wording. Summarize in your own voice, then link.
7. Place each link as Markdown inside a paragraph string: [anchor text](https://rizzassistgo.com/...).
8. Do not invent Rizz Assist URLs.`;

export async function generateArticle(
  topic: BlogTopic,
  options?: { rizzBacklinks?: RizzBacklinkPlan[] }
): Promise<GeneratedArticle> {
  const backlinks = options?.rizzBacklinks;
  const backlinkBlock =
    backlinks && backlinks.length > 0
      ? `
Include exactly 3 natural Markdown backlinks to Rizz Assist using ONLY these URLs:
${backlinks
  .slice(0, 3)
  .map(
    (b, i) =>
      `${i + 1}) ${b.url}
   Suggested anchor: ${b.suggestedAnchor}
   Placement hint: ${b.placement}`
  )
  .join("\n")}

For each link: put descriptive anchor text in a full sentence where a reader would actually need that guide or free tool.
`
      : "";

  const raw = await chatJson(
    backlinks?.length ? RIZZ_BACKLINK_SYSTEM : ARTICLE_SYSTEM,
    `Write a long-form makeup blog post.
Topic hint: ${topic.titleHint}
Category: ${topic.category}
Angle: ${topic.angle}
${topic.inspiration ? `Optional inspiration (do not copy): ${topic.inspiration.title} ${topic.inspiration.url}` : ""}
${backlinkBlock}
Return JSON:
{
  "title": string,
  "excerpt": string,
  "slug": "kebab-case",
  "readMinutes": number (8-12),
  "usedInspiration": boolean,
  "sections": [
    {
      "heading": string,
      "paragraphs": string[],
      "bullets": string[] (optional),
      "quote": string (optional)
    }
  ]
}

Need 6 to 9 H2 sections and roughly 1400 to 2200 words of substance.
Paragraph strings may contain Markdown links of the form [text](url) when backlinks are required.`
  );

  const cleaned = sanitizeDeep(raw);
  const parsed = articleSchema.safeParse(cleaned);
  if (!parsed.success) {
    throw new Error(`Article schema failed: ${parsed.error.message}`);
  }
  let article = parsed.data;
  article.slug = slugify(article.slug || article.title);
  article.title = article.title.replace(/\s+-\s+/g, ": ");
  article = sanitizeDeep(article);

  if (backlinks?.length) {
    article = ensureRizzBacklinks(article, backlinks) as GeneratedArticle;
    article = sanitizeDeep(article);
  }

  return article;
}

export async function generateImageBriefs(
  title: string,
  headings: string[],
  fallbackQueries: string[]
): Promise<ImageBrief[]> {
  try {
    const raw = await chatJson(
      `You write Unsplash search briefs for a makeup blog. Queries must be 3 to 6 concrete visual words a photographer would shoot. Never abstract nouns. Return JSON only.`,
      `Article title: ${title}
Section headings: ${headings.join(" | ")}

Return exactly 4 briefs:
{
  "briefs": [
    { "query": string, "visual": string, "role": "cover" },
    { "query": string, "visual": string, "role": "inline", "afterHeading": "<exact H2>" },
    { "query": string, "visual": string, "role": "inline", "afterHeading": "<exact H2>" },
    { "query": string, "visual": string, "role": "inline", "afterHeading": "<exact H2>" }
  ]
}`
    );
    const cleaned = sanitizeDeep(raw);
    const parsed = briefsSchema.safeParse(cleaned);
    if (parsed.success) return parsed.data.briefs;
  } catch {
    /* fall through */
  }

  const [a, b, c, d] = [
    fallbackQueries[0] ?? "makeup portrait soft light",
    fallbackQueries[1] ?? "makeup brush application close up",
    fallbackQueries[2] ?? "lipstick mirror beauty desk",
    fallbackQueries[3] ?? "natural makeup daylight portrait",
  ];
  return [
    { query: a, visual: "Editorial beauty cover related to the topic", role: "cover" },
    {
      query: b,
      visual: "Inline scene matching the first technique section",
      role: "inline",
      afterHeading: headings[1] ?? headings[0],
    },
    {
      query: c,
      visual: "Inline product or application detail",
      role: "inline",
      afterHeading: headings[3] ?? headings[2] ?? headings[0],
    },
    {
      query: d,
      visual: "Inline finished look or portrait",
      role: "inline",
      afterHeading: headings[5] ?? headings[4] ?? headings[0],
    },
  ];
}
