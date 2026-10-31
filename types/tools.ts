export interface BeautyTool {
  slug: string;
  title: string;
  description: string;
  category: "face" | "eye" | "lip" | "skin" | "makeup";
  usesMediaPipe: boolean;
  seoTitle: string;
  seoDescription: string;
  relatedGuides: string[];
  relatedTools: string[];
  faqs: { question: string; answer: string }[];
}
