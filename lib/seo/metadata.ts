import type { Metadata } from "next";

const APP_NAME = "MakeUp Face Ai";
const DEFAULT_DESCRIPTION =
  "Upload a selfie, learn your face shape and features, and get makeup recommendations with placement maps and tutorials you can use at home.";

/** Primary SEO keyword variants for makeup eyes / lips / face discovery. */
export const DEFAULT_KEYWORDS = [
  "makeup eyes lips face",
  "makeup eye lip face",
  "makeup eyes lip face",
  "makeup eye lips face",
  "AI makeup",
  "face shape makeup",
  "makeup tutorial",
  "natural makeup",
  "everyday makeup",
  "foundation shade",
  "blush placement",
  "MakeUp Face Ai",
];

export function absoluteUrl(path = "/"): string {
  const base = process.env.NEXT_PUBLIC_APP_URL || "https://makeupface.app";
  return new URL(path, base).toString();
}

export function createMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  image,
  noIndex = false,
  keywords = DEFAULT_KEYWORDS,
}: {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
  keywords?: string[];
}): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image ? absoluteUrl(image) : absoluteUrl("/og-default.jpg");

  return {
    title,
    description,
    keywords,
    metadataBase: new URL(absoluteUrl("/")),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: APP_NAME,
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export { APP_NAME, DEFAULT_DESCRIPTION };
