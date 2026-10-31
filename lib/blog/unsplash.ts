import type { BlogImage, ImageBrief } from "@/types/blog";

const UTM = "utm_source=makeupfaceai&utm_medium=referral";

const FALLBACKS: BlogImage[] = [
  {
    src: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1400&q=80",
    alt: "Makeup brushes and soft lighting on a vanity",
    photographer: "Unsplash",
    photographerUrl: `https://unsplash.com?${UTM}`,
    photoUrl: `https://unsplash.com/photos/1487412947147-5cebf100ffc2?${UTM}`,
    role: "cover",
    query: "makeup vanity",
  },
  {
    src: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1400&q=80",
    alt: "Close up of eye makeup application",
    photographer: "Unsplash",
    photographerUrl: `https://unsplash.com?${UTM}`,
    photoUrl: `https://unsplash.com/photos/1512496015851-a90fb38ba796?${UTM}`,
    role: "inline",
    query: "eye makeup",
  },
  {
    src: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1400&q=80",
    alt: "Beauty products arranged on a desk",
    photographer: "Unsplash",
    photographerUrl: `https://unsplash.com?${UTM}`,
    photoUrl: `https://unsplash.com/photos/1522335789203-aabd1fc54bc9?${UTM}`,
    role: "inline",
    query: "beauty products",
  },
  {
    src: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1400&q=80",
    alt: "Soft natural makeup portrait",
    photographer: "Unsplash",
    photographerUrl: `https://unsplash.com?${UTM}`,
    photoUrl: `https://unsplash.com/photos/1596462502278-27bfdc403348?${UTM}`,
    role: "inline",
    query: "natural makeup portrait",
  },
];

type UnsplashResult = {
  id: string;
  alt_description: string | null;
  description: string | null;
  urls: { regular: string; full: string };
  links: { html: string; download_location: string };
  user: { name: string; links: { html: string } };
  tags?: Array<{ title: string }>;
};

function scorePhoto(photo: UnsplashResult, brief: ImageBrief): number {
  const hay = [
    photo.alt_description ?? "",
    photo.description ?? "",
    ...(photo.tags ?? []).map((t) => t.title),
  ]
    .join(" ")
    .toLowerCase();
  const needles = `${brief.query} ${brief.visual}`
    .toLowerCase()
    .split(/\W+/)
    .filter((w) => w.length > 2);
  let score = 0;
  for (const w of needles) {
    if (hay.includes(w)) score += 1;
  }
  return score;
}

async function searchUnsplash(
  query: string,
  accessKey: string
): Promise<UnsplashResult[]> {
  const url = new URL("https://api.unsplash.com/search/photos");
  url.searchParams.set("query", query);
  url.searchParams.set("page", "1");
  url.searchParams.set("per_page", "12");
  url.searchParams.set("orientation", "landscape");
  url.searchParams.set("content_filter", "high");
  url.searchParams.set("order_by", "relevant");

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Client-ID ${accessKey}` },
  });
  if (!res.ok) return [];
  const data = (await res.json()) as { results?: UnsplashResult[] };
  return data.results ?? [];
}

async function pingDownload(downloadLocation: string, accessKey: string) {
  try {
    await fetch(downloadLocation, {
      headers: { Authorization: `Client-ID ${accessKey}` },
    });
  } catch {
    /* guideline best-effort */
  }
}

function withUtm(url: string): string {
  if (!url) return url;
  return url.includes("?") ? `${url}&${UTM}` : `${url}?${UTM}`;
}

export async function resolveImagesForBriefs(
  briefs: ImageBrief[],
  fallbackQueries: string[]
): Promise<BlogImage[]> {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  const usedIds = new Set<string>();
  const images: BlogImage[] = [];

  for (let i = 0; i < briefs.length; i++) {
    const brief = briefs[i]!;
    let picked: BlogImage | null = null;

    if (accessKey) {
      const results = await searchUnsplash(brief.query, accessKey);
      const ranked = [...results].sort(
        (a, b) => scorePhoto(b, brief) - scorePhoto(a, brief)
      );
      const best =
        ranked.find((p) => !usedIds.has(p.id) && scorePhoto(p, brief) >= 2) ??
        ranked.find((p) => !usedIds.has(p.id));

      if (best) {
        usedIds.add(best.id);
        await pingDownload(best.links.download_location, accessKey);
        picked = {
          src: best.urls.regular,
          alt: best.alt_description || brief.visual,
          photographer: best.user.name,
          photographerUrl: withUtm(best.user.links.html),
          photoUrl: withUtm(best.links.html),
          downloadLocation: best.links.download_location,
          query: brief.query,
          role: brief.role,
          afterHeading: brief.afterHeading,
        };
      }
    }

    if (!picked) {
      const fb =
        FALLBACKS[i % FALLBACKS.length] ??
        FALLBACKS[0]!;
      const q = fallbackQueries[i] ?? brief.query;
      picked = {
        ...fb,
        role: brief.role,
        afterHeading: brief.afterHeading,
        query: q,
        alt: brief.visual || fb.alt,
      };
    }

    images.push(picked);
  }

  return images;
}
