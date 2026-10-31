import type { MetadataRoute } from "next";
import { guides } from "@/data/guides";
import { makeupLooks } from "@/data/makeup-styles";
import { beautyTools } from "@/data/tools";
import { listGeneratedPosts } from "@/lib/blog/store";
import { absoluteUrl } from "@/lib/seo/metadata";

const STATIC = [
  "",
  "/makeup",
  "/face-makeup",
  "/eye-makeup",
  "/lip-makeup",
  "/makeup-looks",
  "/makeup-looks-by-face-shape",
  "/cat-face-makeup",
  "/guides",
  "/tools",
  "/analyze",
  "/try-on",
  "/blog",
  "/about",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticEntries = STATIC.map((path) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const guideEntries = guides.map((g) => ({
    url: absoluteUrl(`/guides/${g.slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const lookEntries = makeupLooks.map((l) => ({
    url: absoluteUrl(`/makeup-looks/${l.slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const toolEntries = beautyTools.map((t) => ({
    url: absoluteUrl(`/tools/${t.slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const blogEntries = listGeneratedPosts().map((p) => ({
    url: absoluteUrl(`/blog/${p.slug}`),
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    ...staticEntries,
    ...guideEntries,
    ...lookEntries,
    ...toolEntries,
    ...blogEntries,
  ];
}
