export type BlogReference = {
  title: string;
  url: string;
  author?: string;
  note?: string;
};

export type BlogImageCredit = {
  photographer: string;
  photographerUrl: string;
  photoUrl: string;
  alt?: string;
};

export type BlogImage = {
  src: string;
  alt: string;
  photographer?: string;
  photographerUrl?: string;
  photoUrl?: string;
  downloadLocation?: string;
  query?: string;
  role?: "cover" | "inline";
  afterHeading?: string;
};

export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level?: 2 | 3; text: string }
  | {
      type: "image";
      src: string;
      alt: string;
      caption?: string;
      photographer?: string;
      photographerUrl?: string;
      photoUrl?: string;
    }
  | { type: "quote"; text: string }
  | { type: "list"; ordered?: boolean; items: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readMinutes: number;
  content: string[];
  author: string;
  coverImage?: string;
  blocks?: BlogBlock[];
  references?: BlogReference[];
  imageCredits?: BlogImageCredit[];
  generated?: boolean;
  relatedToolHref?: string;
  relatedToolLabel?: string;
  topicId?: string;
  /** True when this post includes planned Rizz Assist backlinks (every 4th post). */
  rizzBacklinks?: boolean;
};

export type BlogTopic = {
  id: string;
  titleHint: string;
  category: string;
  angle: string;
  relatedToolHref?: string;
  relatedToolLabel?: string;
  inspiration?: BlogReference;
  imageQueries: string[];
};

export type GeneratedArticleSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  quote?: string;
};

export type GeneratedArticleLike = {
  title: string;
  excerpt: string;
  slug: string;
  readMinutes: number;
  usedInspiration?: boolean;
  sections: GeneratedArticleSection[];
};

export type ImageBrief = {
  query: string;
  visual: string;
  role: "cover" | "inline";
  afterHeading?: string;
};

export type GeneratedBlogStore = {
  posts: BlogPost[];
  topicHistory: string[];
  lastGeneratedDate: string | null;
};
