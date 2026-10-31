import { BLOG_TOPICS } from "@/data/blog/topics";
import {
  isRizzBacklinkPost,
  RIZZ_BRIDGE_TOPICS,
  type RizzBridgeTopic,
} from "@/data/blog/rizz-assist";
import type {
  BlogBlock,
  BlogImage,
  BlogImageCredit,
  BlogPost,
  BlogTopic,
} from "@/types/blog";
import {
  listAllowlistedLinksInArticle,
  referencesFromBacklinks,
} from "./backlinks";
import { generateArticle, generateImageBriefs } from "./llm";
import { loadBlogStore, saveBlogStore, todayUtc } from "./store";
import { resolveImagesForBriefs } from "./unsplash";
import { sanitizeDeep } from "./sanitize";

function pickFromPool<T extends BlogTopic>(pool: T[], history: string[]): T {
  const unused = pool.filter((t) => !history.includes(t.id));
  if (unused.length > 0) {
    return unused[Math.floor(Math.random() * unused.length)]!;
  }
  const day = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
      86400000
  );
  return pool[day % pool.length]!;
}

function pickTopic(
  history: string[],
  withRizzBacklinks: boolean
): BlogTopic | RizzBridgeTopic {
  if (withRizzBacklinks) {
    return pickFromPool(RIZZ_BRIDGE_TOPICS, history);
  }
  return pickFromPool(BLOG_TOPICS, history);
}

function assembleBlocks(
  sections: Array<{
    heading: string;
    paragraphs: string[];
    bullets?: string[];
    quote?: string;
  }>,
  images: BlogImage[]
): BlogBlock[] {
  const blocks: BlogBlock[] = [];
  const inline = images.filter((i) => i.role === "inline");
  const usedInline = new Set<number>();

  sections.forEach((section, idx) => {
    blocks.push({ type: "heading", level: 2, text: section.heading });
    for (const p of section.paragraphs) {
      blocks.push({ type: "paragraph", text: p });
    }
    if (section.bullets?.length) {
      blocks.push({ type: "list", items: section.bullets });
    }
    if (section.quote) {
      blocks.push({ type: "quote", text: section.quote });
    }

    let imgIdx = inline.findIndex(
      (img, i) =>
        !usedInline.has(i) &&
        img.afterHeading &&
        img.afterHeading.toLowerCase() === section.heading.toLowerCase()
    );
    if (imgIdx < 0 && idx % 2 === 1) {
      imgIdx = inline.findIndex((_, i) => !usedInline.has(i));
    }
    if (imgIdx >= 0) {
      const img = inline[imgIdx]!;
      usedInline.add(imgIdx);
      blocks.push({
        type: "image",
        src: img.src,
        alt: img.alt,
        caption: img.photographer
          ? `Photo by ${img.photographer} on Unsplash`
          : undefined,
        photographer: img.photographer,
        photographerUrl: img.photographerUrl,
        photoUrl: img.photoUrl,
      });
    }
  });

  return blocks;
}

export type GenerateResult = {
  created: boolean;
  reason?: string;
  post?: BlogPost;
};

export async function generateDailyBlogPost(options?: {
  force?: boolean;
}): Promise<GenerateResult> {
  const store = loadBlogStore();
  const today = todayUtc();

  if (!options?.force && store.lastGeneratedDate === today) {
    return {
      created: false,
      reason: `Already generated a post for ${today}. Use force to override.`,
    };
  }

  const withRizzBacklinks = isRizzBacklinkPost(store.posts.length);
  const topic = pickTopic(store.topicHistory, withRizzBacklinks);
  const rizzPlan =
    withRizzBacklinks && "backlinks" in topic ? topic.backlinks : undefined;

  const article = await generateArticle(topic, {
    rizzBacklinks: rizzPlan,
  });
  const headings = article.sections.map((s) => s.heading);
  const briefs = await generateImageBriefs(
    article.title,
    headings,
    topic.imageQueries
  );
  const images = await resolveImagesForBriefs(briefs, topic.imageQueries);
  const cover = images.find((i) => i.role === "cover") ?? images[0];
  const blocks = assembleBlocks(article.sections, images);

  const imageCredits: BlogImageCredit[] = images
    .filter((i) => i.photographer && i.photographerUrl && i.photoUrl)
    .map((i) => ({
      photographer: i.photographer!,
      photographerUrl: i.photographerUrl!,
      photoUrl: i.photoUrl!,
      alt: i.alt,
    }));

  const plainContent = article.sections.flatMap((s) => [
    s.heading,
    ...s.paragraphs,
  ]);

  let slug = article.slug;
  if (store.posts.some((p) => p.slug === slug)) {
    slug = `${slug}-${today}`;
  }

  const inspirationRefs = topic.inspiration
    ? [
        {
          ...topic.inspiration,
          note: "Inspiration only. Wording is original to MakeUp Face Ai.",
        },
      ]
    : [];

  const rizzRefs =
    rizzPlan && rizzPlan.length > 0
      ? referencesFromBacklinks(
          rizzPlan,
          listAllowlistedLinksInArticle(article)
        )
      : [];

  const post: BlogPost = sanitizeDeep({
    slug,
    title: article.title,
    excerpt: article.excerpt,
    category: topic.category,
    date: today,
    readMinutes: Math.min(12, Math.max(8, article.readMinutes || 10)),
    content: plainContent,
    author: "MakeUp Face Ai",
    coverImage: cover?.src,
    blocks,
    references:
      inspirationRefs.length || rizzRefs.length
        ? [...inspirationRefs, ...rizzRefs]
        : undefined,
    imageCredits,
    generated: true,
    relatedToolHref: topic.relatedToolHref,
    relatedToolLabel: topic.relatedToolLabel,
    topicId: topic.id,
    rizzBacklinks: withRizzBacklinks || undefined,
  });

  store.posts = [post, ...store.posts.filter((p) => p.slug !== post.slug)];
  store.topicHistory = [...store.topicHistory, topic.id].slice(-50);
  store.lastGeneratedDate = today;
  saveBlogStore(store);

  return { created: true, post };
}
