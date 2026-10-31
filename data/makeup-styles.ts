import type { MakeupLook } from "@/types/makeup";

export const makeupLooks: MakeupLook[] = [
  {
    slug: "natural-makeup",
    title: "Natural Makeup",
    description:
      "Enhance skin and features with sheer coverage, soft brow fill, and a your-lips-but-better tint. The goal is rested, not obvious.",
    occasions: ["daily", "office", "date_night"],
    intensity: "sheer",
    styleTags: ["natural", "minimal", "fresh"],
    products: [
      "Tinted moisturizer or light foundation",
      "Cream blush in rose or peach",
      "Brown mascara",
      "Tinted lip balm",
      "Brow gel",
    ],
    steps: [
      {
        title: "Even out skin",
        instruction:
          "Apply tinted moisturizer with fingers where redness shows; leave freckles visible. Conceal only under eyes or blemishes.",
      },
      {
        title: "Add warmth",
        instruction:
          "Tap cream blush on apples and blend back toward temples. Optional cream bronzer on outer cheeks only.",
      },
      {
        title: "Define softly",
        instruction: "Comb brows up with gel; one coat mascara on top lashes. Finish with balm on lips.",
      },
    ],
    faceShapeNotes:
      "Follow your natural blush placement. On round faces, skip heavy contour and use bronzer on the perimeter instead.",
    eyeShapeNotes:
      "A single wash of matte taupe on lid suits most shapes; skip heavy liner on hooded lids.",
    relatedSlugs: ["no-makeup-makeup", "everyday-makeup", "clean-girl-makeup"],
    relatedTools: ["foundation-shade-finder", "blush-placement-finder", "everyday-makeup-finder"],
    seoTitle: "Natural Makeup Look: Easy Everyday Tutorial",
    seoDescription:
      "Build a natural makeup look with light base, cream blush, and soft brows in under 15 minutes.",
  },
  {
    slug: "no-makeup-makeup",
    title: "No-Makeup Makeup",
    description:
      "Strategic concealer, brow shaping, and lip conditioning create polish without visible product layers.",
    occasions: ["daily", "office"],
    intensity: "sheer",
    styleTags: ["natural", "skin-first", "minimalist"],
    products: ["Spot concealer", "Clear or tinted brow gel", "Lip treatment", "Optional lash curl"],
    steps: [
      {
        title: "Prep and correct",
        instruction:
          "Hydrate, then pat concealer on inner corners, redness, and spots. Blend edges with a damp sponge.",
      },
      {
        title: "Brows and lashes",
        instruction: "Set brows; curl lashes and clear mascara or skip color entirely.",
      },
    ],
    faceShapeNotes: "Highlight cheekbones with a subtle balm instead of powder highlight on long faces.",
    eyeShapeNotes: "Tightline with brown pencil if lashes look sparse; skip shimmer on monolids if it creases.",
    relatedSlugs: ["natural-makeup", "minimalist-makeup", "clean-girl-makeup"],
    relatedTools: ["skin-undertone-test", "eyebrow-shape-detector"],
    seoTitle: "No-Makeup Makeup Tutorial",
    seoDescription: "Look polished without foundation using concealer, brows, and lip care.",
  },
  {
    slug: "everyday-makeup",
    title: "Everyday Makeup",
    description:
      "Reliable medium coverage, neutral eyes, and one lip color you can reapply at lunch. Built for work and errands.",
    occasions: ["daily", "office"],
    intensity: "medium",
    styleTags: ["everyday", "balanced", "quick"],
    products: [
      "Medium coverage foundation",
      "Setting powder for T-zone",
      "Neutral eyeshadow trio",
      "Brown eyeliner",
      "Mauve lipstick",
    ],
    steps: [
      {
        title: "Base",
        instruction: "Foundation where needed, powder on oily zones, cream bronzer in hollows.",
      },
      {
        title: "Eyes",
        instruction: "Matte medium brown in crease, lighter shade on lid, tightline upper waterline.",
      },
      {
        title: "Finish",
        instruction: "Blush on apples, lipstick straight from bullet, mist if you have time.",
      },
    ],
    faceShapeNotes: "Use our blush placement finder to lift or soften your face length.",
    eyeShapeNotes: "Place crease shade where fold shows when eyes are open for hooded shapes.",
    relatedSlugs: ["natural-makeup", "office-makeup"],
    relatedTools: ["everyday-makeup-finder", "makeup-routine-generator", "makeup-time-calculator"],
    seoTitle: "Everyday Makeup Routine",
    seoDescription: "Simple daily makeup with neutral eyes and long-wearing base.",
  },
  {
    slug: "soft-glam",
    title: "Soft Glam",
    description:
      "Flawless-but-skin-like base, blended neutrals, fluttery lashes, and a rose nude lip. Photogenic without full drama.",
    occasions: ["date_night", "party", "wedding"],
    intensity: "medium",
    styleTags: ["soft_glam", "romantic", "defined"],
    products: [
      "Full coverage foundation",
      "Cream contour",
      "Neutral shimmer palette",
      "False lashes or volumizing mascara",
      "Lip liner and nude-pink lipstick",
    ],
    steps: [
      {
        title: "Sculpt base",
        instruction: "Foundation, concealer, cream contour and highlight, set lightly under eyes.",
      },
      {
        title: "Eyes",
        instruction: "Blend transition through crease, deepen outer corner, shimmer on lid, liner close to lashes.",
      },
      {
        title: "Lips and glow",
        instruction: "Line and fill with complementary nude; add powder highlight on high points.",
      },
    ],
    faceShapeNotes: "Soften strong jaw contour with diffused bronzer; heart shapes can skip heavy temple contour.",
    eyeShapeNotes: "Winged liner short and thin on deep-set eyes to avoid shrinking the lid.",
    relatedSlugs: ["full-glam", "bridal-makeup", "date-night-makeup"],
    relatedTools: ["contour-placement-guide", "eyeliner-style-finder", "makeup-style-finder"],
    seoTitle: "Soft Glam Makeup Look",
    seoDescription: "Achieve soft glam with blended eyeshadow, lashes, and sculpted base.",
  },
  {
    slug: "full-glam",
    title: "Full Glam",
    description:
      "High coverage, sharp contour, bold eyes, and statement lips or lashes. Built for low light and cameras.",
    occasions: ["party", "special_event"],
    intensity: "bold",
    styleTags: ["full_glam", "dramatic", "evening"],
    products: [
      "Long-wear foundation",
      "Powder contour and highlight",
      "Bold eyeshadow palette",
      "Liquid liner",
      "Strip lashes",
      "Bold lip color",
    ],
    steps: [
      {
        title: "Full canvas",
        instruction: "Prime, full coverage base, bake under eyes if desired, set entire face.",
      },
      {
        title: "Dramatic eyes",
        instruction: "Layer crease depth, cut crease or smoked outer V, winged liner, lashes.",
      },
      {
        title: "Statement finish",
        instruction: "Strong cheek color or bold lip: pick one focal point if both feel heavy.",
      },
    ],
    faceShapeNotes: "Extend highlight along cheekbones toward ears on square faces to soften angles.",
    eyeShapeNotes: "Use matte transition shades on prominent lids before metallics to control fallout.",
    relatedSlugs: ["soft-glam", "party-makeup", "smokey-eye"],
    relatedTools: ["face-ratio-calculator", "eyeshadow-placement-guide"],
    seoTitle: "Full Glam Makeup Tutorial",
    seoDescription: "Step-by-step full glam with contour, bold eyes, and lashes.",
  },
  {
    slug: "bridal-makeup",
    title: "Bridal Makeup",
    description:
      "Timeless, tear-resistant base, soft definition, and photography-tested tones that read in daylight and flash.",
    occasions: ["wedding", "special_event"],
    intensity: "medium",
    styleTags: ["bridal", "timeless", "photogenic"],
    products: [
      "Long-wear foundation",
      "Waterproof concealer",
      "Soft neutral eyeshadows",
      "Waterproof liner and mascara",
      "Setting spray",
      "Rose or nude lip",
    ],
    steps: [
      {
        title: "Skin that lasts",
        instruction: "Hydrate, primer, thin foundation layers, set T-zone, waterproof under-eye concealer.",
      },
      {
        title: "Classic eyes",
        instruction: "Neutral crease, soft shimmer lid, brown or black liner tight to lashes, natural lashes or individuals.",
      },
      {
        title: "Seal the look",
        instruction: "Blush lifted on cheeks, lip color with liner, generous setting spray.",
      },
    ],
    faceShapeNotes: "Balance veil and dress neckline. More open necklines can carry slightly stronger cheek color.",
    eyeShapeNotes: "Avoid heavy lower-lid smoke if eyes are small; focus lift on upper lash line.",
    relatedSlugs: ["soft-glam", "wedding-makeup-finder"],
    relatedTools: ["wedding-makeup-finder", "makeup-time-calculator", "skin-undertone-test"],
    seoTitle: "Bridal Makeup Look Guide",
    seoDescription: "Long-wearing bridal makeup with neutral eyes and photo-ready skin.",
  },
  {
    slug: "korean-makeup",
    title: "Korean-Inspired Makeup",
    description:
      "Dewy skin, gradient lips, straight brows, and soft color washes. Youthful glow beats heavy sculpting.",
    occasions: ["daily", "date_night"],
    intensity: "sheer",
    styleTags: ["korean", "dewy", "youthful"],
    products: ["Cushion or skin tint", "Cream blush", "Light brown eyeshadow", "Lip tint", "Brow pencil"],
    steps: [
      {
        title: "Glow base",
        instruction: "Skincare layers, thin cushion coverage, concealer on trouble spots only.",
      },
      {
        title: "Soft color",
        instruction: "Peach or pink blush high on cheeks; wash of brown-pink on lids.",
      },
      {
        title: "Gradient lip",
        instruction: "Tint center of lips, blur outward with finger; balm on edges.",
      },
    ],
    faceShapeNotes: "Skip harsh jaw contour; use light blush across nose bridge for cohesive flush.",
    eyeShapeNotes: "Aegyo-sal highlight optional under eyes; keep shimmer fine to avoid texture.",
    relatedSlugs: ["clean-girl-makeup", "natural-makeup"],
    relatedTools: ["skin-undertone-test", "lipstick-shade-finder"],
    seoTitle: "Korean Makeup Style Tutorial",
    seoDescription: "Dewy base, gradient lips, and soft brows for K-beauty inspired looks.",
  },
  {
    slug: "clean-girl-makeup",
    title: "Clean Girl Makeup",
    description:
      "Glossy skin, brushed-up brows, peachy flush, and that healthy-hair energy. Minimal pigment, maximum glow.",
    occasions: ["daily", "office", "date_night"],
    intensity: "sheer",
    styleTags: ["clean_girl", "dewy", "minimal"],
    products: ["Skin tint", "Liquid highlight", "Cream blush", "Clear brow gel", "Lip gloss"],
    steps: [
      {
        title: "Skin tint and highlight",
        instruction: "Sheer base, tap liquid highlight on cheekbones and nose bridge.",
      },
      {
        title: "Peach flush",
        instruction: "Cream blush on apples and nose tip if desired; brush brows upward.",
      },
      {
        title: "Gloss",
        instruction: "Clear or rose gloss; skip powder on cheeks to keep dew.",
      },
    ],
    faceShapeNotes: "Vertical highlight on center face suits long faces; avoid heavy side contour.",
    eyeShapeNotes: "Brown mascara only; skip liner on close-set eyes to keep openness.",
    relatedSlugs: ["no-makeup-makeup", "korean-makeup", "minimalist-makeup"],
    relatedTools: ["blush-placement-finder", "eyebrow-shaping-guide"],
    seoTitle: "Clean Girl Makeup Aesthetic",
    seoDescription: "Get the clean girl look with glowing skin, peach blush, and glossy lips.",
  },
  {
    slug: "old-money-makeup",
    title: "Old Money Makeup",
    description:
      "Muted luxury: satin skin, subtle brown eyes, defined brows, and mauve or berry lips. Polished, never neon-trendy.",
    occasions: ["office", "special_event", "date_night"],
    intensity: "medium",
    styleTags: ["classic", "refined", "neutral"],
    products: [
      "Satin foundation",
      "Taupe eyeshadow",
      "Brown pencil liner",
      "Mauve lipstick",
      "Sheer powder",
    ],
    steps: [
      {
        title: "Refined base",
        instruction: "Even coverage with satin finish; subtle bronzer in hollows only.",
      },
      {
        title: "Understated eyes",
        instruction: "Matte taupe crease, smudged brown liner on upper lash line, groomed brows.",
      },
      {
        title: "Muted lip",
        instruction: "Lip liner in mauve, fill with satin lipstick, blot for stain effect.",
      },
    ],
    faceShapeNotes: "Keep highlight diffused. Skip glitter on cheekbones for this aesthetic.",
    eyeShapeNotes: "Smoked brown liner flatters deep-set eyes without heavy wings.",
    relatedSlugs: ["office-makeup", "minimalist-makeup"],
    relatedTools: ["lipstick-shade-finder", "makeup-style-finder"],
    seoTitle: "Old Money Makeup Look",
    seoDescription: "Classic old money makeup with taupe eyes and mauve lips.",
  },
  {
    slug: "smokey-eye",
    title: "Smokey Eye",
    description:
      "Gradated dark shades from lash line upward, balanced with clean skin and nude lips so eyes stay the focus.",
    occasions: ["party", "date_night"],
    intensity: "bold",
    styleTags: ["smokey", "evening", "dramatic"],
    products: ["Eyeshadow primer", "Black and gray shadows", "Kohl pencil", "Mascara", "Nude lip"],
    steps: [
      {
        title: "Prime lids",
        instruction: "Eyeshadow primer from lash to brow; set with translucent powder.",
      },
      {
        title: "Build smoke",
        instruction: "Pencil along lashes, smudge upward; layer dark shadow in outer V and lower lash line.",
      },
      {
        title: "Balance face",
        instruction: "Medium coverage skin, neutral cheek, nude lip to avoid competing with eyes.",
      },
    ],
    faceShapeNotes: "Strong cheek contour optional; round faces benefit from lifted blush instead.",
    eyeShapeNotes: "Keep darkest shadow on outer third for hooded eyes; avoid dark color on entire mobile lid.",
    relatedSlugs: ["full-glam", "party-makeup", "date-night-makeup"],
    relatedTools: ["eye-shape-detector", "eyeshadow-placement-guide"],
    seoTitle: "Classic Smokey Eye Tutorial",
    seoDescription: "Blend a wearable to dramatic smokey eye with balanced lips and skin.",
  },
  {
    slug: "party-makeup",
    title: "Party Makeup",
    description:
      "Extra shimmer, bolder lashes, and a lip or eye statement that survives dancing and flash photography.",
    occasions: ["party", "special_event"],
    intensity: "bold",
    styleTags: ["party", "glitter", "night_out"],
    products: ["Glitter or foil shadow", "Setting spray", "Bold lipstick or graphic liner", "Body glow optional"],
    steps: [
      {
        title: "Secure base",
        instruction: "Primer, full coverage, set with powder and spray before heavy eye work.",
      },
      {
        title: "Feature eyes or lips",
        instruction: "Glitter on lid with adhesive or foil shadow; pair with nude lip OR bold lip with simpler eyes.",
      },
      {
        title: "Lock it",
        instruction: "Mist setting spray; carry lipstick for touch-ups.",
      },
    ],
    faceShapeNotes: "Add highlight on shoulders and collarbones if the outfit is strapless. Match your face highlight tone.",
    eyeShapeNotes: "Glitter cut crease suits wide eyes; use smaller shimmer on protruding lids.",
    relatedSlugs: ["full-glam", "smokey-eye"],
    relatedTools: ["makeup-time-calculator", "makeup-product-checklist"],
    seoTitle: "Party Makeup Ideas",
    seoDescription: "Party-ready makeup with shimmer, lashes, and long-wear tips.",
  },
  {
    slug: "office-makeup",
    title: "Office Makeup",
    description:
      "Professional polish: even skin, neutral eyes, defined brows, and lipstick that survives coffee meetings.",
    occasions: ["office", "daily"],
    intensity: "medium",
    styleTags: ["professional", "neutral", "long-wear"],
    products: ["Medium foundation", "Neutral eyeshadow", "Brown liner", "Rose or berry lipstick", "Setting powder"],
    steps: [
      {
        title: "Quick base",
        instruction: "Cover redness, powder T-zone, neutral bronzer for dimension.",
      },
      {
        title: "Neutral eyes",
        instruction: "One crease shade, mascara, optional thin brown liner.",
      },
      {
        title: "Professional lip",
        instruction: "Satin lipstick in rose or mauve; blot to reduce transfer on masks or cups.",
      },
    ],
    faceShapeNotes: "Avoid extreme contour stripes under fluorescent light. Blend until the edges disappear.",
    eyeShapeNotes: "Matte lids reduce creasing during long screen days.",
    relatedSlugs: ["everyday-makeup", "old-money-makeup", "minimalist-makeup"],
    relatedTools: ["everyday-makeup-finder", "foundation-shade-finder"],
    seoTitle: "Office Appropriate Makeup",
    seoDescription: "Work-ready makeup that looks polished under office lighting.",
  },
  {
    slug: "monochromatic-makeup",
    title: "Monochromatic Makeup",
    description:
      "One color story (rose, terracotta, or mauve) across eyes, cheeks, and lips for effortless coordination.",
    occasions: ["date_night", "party", "daily"],
    intensity: "medium",
    styleTags: ["monochrome", "cohesive", "trend"],
    products: ["Single-family eyeshadow", "Matching cream blush", "Lipstick in same hue", "Bronzer optional"],
    steps: [
      {
        title: "Pick your family",
        instruction: "Choose rose, peach, or berry; use three depths: light lid, medium crease, deep outer corner.",
      },
      {
        title: "Cheeks and lips",
        instruction: "Same undertone on cheeks; lipstick one step deeper than blush.",
      },
    ],
    faceShapeNotes: "Monochrome blush swept toward temples elongates round faces.",
    eyeShapeNotes: "Use matte in crease and shimmer on lid center for dimension in single-hue looks.",
    relatedSlugs: ["soft-glam", "date-night-makeup"],
    relatedTools: ["lipstick-shade-finder", "makeup-style-finder"],
    seoTitle: "Monochromatic Makeup Tutorial",
    seoDescription: "Coordinate eyes, cheeks, and lips in one color family.",
  },
  {
    slug: "minimalist-makeup",
    title: "Minimalist Makeup",
    description: "Three to five products max: base, brow, cheek, lip. Every step has a clear job.",
    occasions: ["daily", "office"],
    intensity: "sheer",
    styleTags: ["minimalist", "capsule", "fast"],
    products: ["Skin tint", "Multi-stick for cheek and lip", "Brow pencil", "Mascara optional"],
    steps: [
      {
        title: "Multi-use cream",
        instruction: "Apply tint on cheeks and lips; blend with fingers for speed.",
      },
      {
        title: "Brows and lashes",
        instruction: "Fill sparse brow gaps; one mascara coat if needed.",
      },
    ],
    faceShapeNotes: "One cream color keeps placement simple. Focus on the upper cheek for lift.",
    eyeShapeNotes: "Skip eyeshadow; curl lashes for definition on monolids.",
    relatedSlugs: ["no-makeup-makeup", "clean-girl-makeup"],
    relatedTools: ["makeup-product-checklist", "makeup-budget-calculator"],
    seoTitle: "Minimalist Makeup Routine",
    seoDescription: "Five-product minimalist makeup for busy mornings.",
  },
  {
    slug: "date-night-makeup",
    title: "Date Night Makeup",
    description:
      "Romantic definition: glowing skin, enhanced eyes, and a lip shade that complements your undertone.",
    occasions: ["date_night"],
    intensity: "medium",
    styleTags: ["romantic", "defined", "evening"],
    products: ["Luminous foundation", "Rosy blush", "Shimmer eyeshadow", "Eyeliner", "Berry or red lip"],
    steps: [
      {
        title: "Glow base",
        instruction: "Hydrating primer, foundation with dewy finish, concealer where needed.",
      },
      {
        title: "Romantic eyes",
        instruction: "Rose or plum crease, shimmer inner corner, wing optional.",
      },
      {
        title: "Lip choice",
        instruction: "Match lip depth to eye intensity. Soft eyes can carry bolder lips.",
      },
    ],
    faceShapeNotes: "Soft contour and highlight photograph well in restaurant lighting.",
    eyeShapeNotes: "Inner-corner shimmer opens close-set eyes.",
    relatedSlugs: ["soft-glam", "monochromatic-makeup", "smokey-eye"],
    relatedTools: ["lip-shape-detector", "eyeliner-style-finder"],
    seoTitle: "Date Night Makeup Ideas",
    seoDescription: "Flattering date night makeup with glowing skin and defined eyes.",
  },
  {
    slug: "cat-makeup",
    title: "Cat Eye Makeup",
    description:
      "Graphic wing, lifted outer corners, and optional whisker dots. Playful costume or bold editorial, not everyday subtle.",
    occasions: ["party", "special_event"],
    intensity: "bold",
    styleTags: ["costume", "graphic", "creative"],
    products: [
      "White or black face paint optional",
      "Liquid liner",
      "Dramatic lashes",
      "Nude or black lip",
      "Colored eyeshadow optional",
    ],
    steps: [
      {
        title: "Base",
        instruction: "Even foundation; matte powder if applying paint over cheeks.",
      },
      {
        title: "Cat eye",
        instruction: "Extended wing following lower lash angle upward; thicken outer lash line.",
      },
      {
        title: "Details",
        instruction: "Optional small dots on nose tip and whisker lines with fine brush; keep symmetrical.",
      },
    ],
    faceShapeNotes: "Extend wing slightly upward to counter round face softness for feline silhouette.",
    eyeShapeNotes: "Draw wing with eyes open so line clears hooded fold.",
    relatedSlugs: ["party-makeup", "full-glam"],
    relatedTools: ["eyeliner-style-finder", "eye-shape-detector"],
    seoTitle: "Cat Makeup Tutorial for Costumes",
    seoDescription: "Cat eye liner, lashes, and face details for Halloween or themed events.",
  },
];
