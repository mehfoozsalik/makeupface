import type { FaceShape } from "@/types/face-analysis";
import type { MakeupStyle } from "@/types/makeup";

export interface RelatedGuide {
  href: string;
  label: string;
}

const FACE_SHAPE_GUIDES: Partial<Record<FaceShape, RelatedGuide>> = {
  oval: {
    href: "/makeup-looks-by-face-shape",
    label: "Makeup by face shape",
  },
  round: {
    href: "/guides/contour-for-round-faces",
    label: "Contouring round faces",
  },
  heart: {
    href: "/makeup-looks-by-face-shape#heart",
    label: "Balance a heart-shaped face",
  },
};

const STYLE_GUIDES: Partial<Record<MakeupStyle, RelatedGuide>> = {
  natural: {
    href: "/makeup-looks/natural-makeup",
    label: "Natural makeup tutorial",
  },
  everyday: {
    href: "/makeup-looks/everyday-makeup",
    label: "Everyday makeup guide",
  },
  soft_glam: {
    href: "/guides",
    label: "Soft glam techniques",
  },
  full_glam: {
    href: "/makeup-looks",
    label: "Full glam looks",
  },
  korean: {
    href: "/makeup-looks",
    label: "K-beauty inspiration",
  },
};

export function getRelatedGuides(
  faceShape: FaceShape,
  style: MakeupStyle
): RelatedGuide[] {
  const links: RelatedGuide[] = [
    { href: "/tools/face-shape-detector", label: "Face shape detector" },
    { href: "/tools/skin-undertone-test", label: "Undertone test" },
    { href: "/guides/face-primer-makeup-primer", label: "Face primer guide" },
  ];

  const shapeGuide = FACE_SHAPE_GUIDES[faceShape];
  if (shapeGuide) links.unshift(shapeGuide);

  const styleGuide = STYLE_GUIDES[style];
  if (styleGuide) links.unshift(styleGuide);

  const seen = new Set<string>();
  return links.filter((l) => {
    if (seen.has(l.href)) return false;
    seen.add(l.href);
    return true;
  });
}
