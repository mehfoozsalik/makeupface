import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import path from "path";
import type { BlogPost, GeneratedBlogStore } from "@/types/blog";

const STORE_PATH = path.join(process.cwd(), "data", "blog", "generated.json");

const EMPTY: GeneratedBlogStore = {
  posts: [],
  topicHistory: [],
  lastGeneratedDate: null,
};

export function getStorePath() {
  return STORE_PATH;
}

export function loadBlogStore(): GeneratedBlogStore {
  try {
    if (!existsSync(STORE_PATH)) return { ...EMPTY, posts: [] };
    const raw = readFileSync(STORE_PATH, "utf8");
    const parsed = JSON.parse(raw) as GeneratedBlogStore;
    return {
      posts: Array.isArray(parsed.posts) ? parsed.posts : [],
      topicHistory: Array.isArray(parsed.topicHistory) ? parsed.topicHistory : [],
      lastGeneratedDate: parsed.lastGeneratedDate ?? null,
    };
  } catch {
    return { ...EMPTY, posts: [] };
  }
}

export function saveBlogStore(store: GeneratedBlogStore) {
  const dir = path.dirname(STORE_PATH);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(STORE_PATH, JSON.stringify(store, null, 2) + "\n", "utf8");
}

export function listGeneratedPosts(): BlogPost[] {
  return [...loadBlogStore().posts].sort((a, b) =>
    a.date < b.date ? 1 : a.date > b.date ? -1 : 0
  );
}

export function getGeneratedPost(slug: string): BlogPost | undefined {
  return loadBlogStore().posts.find((p) => p.slug === slug);
}

export function todayUtc(): string {
  return new Date().toISOString().slice(0, 10);
}
