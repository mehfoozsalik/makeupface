export interface GuideArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: "basics" | "face" | "eyes" | "lips" | "skin" | "products" | "celebrity" | "occasion";
  readTimeMinutes: number;
  relatedTools: string[];
  relatedGuides: string[];
  relatedLooks: string[];
  seoTitle: string;
  seoDescription: string;
  sections: { heading: string; body: string }[];
  faqs: { question: string; answer: string }[];
}

export const guides: GuideArticle[] = [
  {
    slug: "face-primer-makeup-primer",
    title: "Face Primer vs Makeup Primer: What Actually Matters",
    excerpt:
      "Primers can smooth texture, extend wear, or add grip. You do not need one in every routine. Here is when to skip, when to color-correct, and how to layer without pilling.",
    category: "basics",
    readTimeMinutes: 7,
    relatedTools: ["makeup-routine-generator", "makeup-product-checklist"],
    relatedGuides: ["skin-prep-before-makeup", "color-correction-basics"],
    relatedLooks: ["natural-makeup", "office-makeup"],
    seoTitle: "Face Primer Guide: Types, Order, and Mistakes",
    seoDescription:
      "Understand silicone vs water-based primers, pore blur, gripping primers, and how to pair primer with foundation for longer wear.",
    sections: [
      {
        heading: "What primer does",
        body:
          "Primer sits between skincare and pigment. It can fill micro-texture, add slip for blending, or increase adhesion so foundation moves less. It does not replace moisturizer; apply on hydrated skin and let each layer dry briefly.",
      },
      {
        heading: "Choosing by skin concern",
        body:
          "Oily areas often benefit from mattifying or blurring primers on the T-zone only. Dry patches need hydrating primers or skip primer there and use a dewy base. Redness may need a green-tinted corrector primer instead of a generic blur formula.",
      },
      {
        heading: "Application order",
        body:
          "Skincare → sunscreen (if AM) → primer → color corrector → foundation. Use a pea-sized amount; excess primer is a common cause of pilling when you rub foundation in.",
      },
    ],
    faqs: [
      {
        question: "Can I use primer without foundation?",
        answer:
          "Yes. A blurring primer with tinted moisturizer or spot concealer is a valid light-coverage look.",
      },
    ],
  },
  {
    slug: "face-wash-before-makeup",
    title: "Should You Wash Your Face Before Makeup?",
    excerpt:
      "Clean skin helps makeup adhere evenly, but over-cleansing strips barrier lipids. Match your wash to your skin type and time of day.",
    category: "skin",
    readTimeMinutes: 6,
    relatedTools: ["skin-undertone-test", "foundation-shade-finder"],
    relatedGuides: ["skin-prep-before-makeup", "spf-under-makeup"],
    relatedLooks: ["no-makeup-makeup", "clean-girl-makeup"],
    seoTitle: "Face Wash Before Makeup: Morning vs Evening Routine",
    seoDescription:
      "When to cleanse before applying makeup, how double cleansing fits in, and what to do if you have dry or acne-prone skin.",
    sections: [
      {
        heading: "Morning vs pre-application",
        body:
          "Many people rinse or use a gentle cleanser in the morning, then apply moisturizer and SPF before makeup. If you wore heavy products overnight or sweated, a full cleanse prevents clogged pores under base makeup.",
      },
      {
        heading: "Avoid stripping the barrier",
        body:
          "If skin feels tight after washing, switch to a cream or micellar cleanse and follow with humectants (glycerin, hyaluronic acid) before primer. Makeup on flaky skin emphasizes texture.",
      },
      {
        heading: "When to skip a full wash",
        body:
          "After an evening routine, a light splash or toner refresh may be enough before daytime makeup unless you need oil control. Always remove makeup fully at night.",
      },
    ],
    faqs: [
      {
        question: "Should I exfoliate right before makeup?",
        answer:
          "Avoid strong acids or scrubs immediately before makeup; they can increase sensitivity and uneven absorption. Exfoliate the night before instead.",
      },
    ],
  },
  {
    slug: "clinique-superpowder-double-face-makeup",
    title: "Clinique Superpowder Double Face Makeup: How to Use It Well",
    excerpt:
      "This pressed powder foundation goes on dry for light coverage or damp for a smoother, fuller finish. Here is how to work with the texture in real life, not on a spec sheet.",
    category: "products",
    readTimeMinutes: 8,
    relatedTools: ["foundation-shade-finder", "makeup-budget-calculator"],
    relatedGuides: ["brush-vs-sponge-foundation", "setting-powder-vs-spray"],
    relatedLooks: ["office-makeup", "natural-makeup"],
    seoTitle: "Clinique Superpowder Double Face: Dry vs Wet Application",
    seoDescription:
      "Application tips for Clinique Superpowder Double Face Makeup, shade testing, and pairing with primer on combination skin.",
    sections: [
      {
        heading: "What kind of product it is",
        body:
          "Superpowder Double Face is a pressed powder foundation in a compact, marketed for flexible coverage depending on application method. Dry application with a brush tends to read lighter and more matte; using a damp sponge or brush can melt powder into a more foundation-like finish.",
      },
      {
        heading: "Shade matching",
        body:
          "Test on the jaw in daylight. Powders can oxidize slightly as skin oils mix in. If between shades, choose the lighter for dry application and adjust with bronzer or a deeper wet pass on the perimeter.",
      },
      {
        heading: "Best use cases",
        body:
          "Travel, touch-ups, and oily T-zones benefit from powder foundation. Dry patches need moisturizer first and sparing product; building in thin layers prevents chalkiness.",
      },
    ],
    faqs: [
      {
        question: "Does it replace liquid foundation entirely?",
        answer:
          "For many people it can for everyday coverage, but severe dryness or high coverage events may still need liquid or cream base in problem areas.",
      },
    ],
  },
  {
    slug: "carrie-underwood-makeup-style",
    title: "Carrie Underwood Makeup Style: Polished Stage-Ready Glam",
    excerpt:
      "Her public looks blend country warmth with camera-ready definition: even skin, sculpted eyes, and balanced lips. Break down the recurring elements without copying one single red-carpet photo.",
    category: "celebrity",
    readTimeMinutes: 9,
    relatedTools: ["makeup-style-finder", "eye-shape-detector", "contour-placement-guide"],
    relatedGuides: ["soft-glam-eyes", "wedding-makeup-timeline"],
    relatedLooks: ["soft-glam", "full-glam", "bridal-makeup"],
    seoTitle: "Carrie Underwood Inspired Makeup Elements",
    seoDescription:
      "Learn the structure behind Carrie Underwood's typical makeup: brow shape, liner placement, lash focus, and neutral-to-rose lips.",
    sections: [
      {
        heading: "Base and finish",
        body:
          "Looks are typically medium-to-full coverage with a satin or soft-matte finish that survives stage lighting. Contour stays structured along cheek hollows and jaw; highlight sits high on cheekbones and down the nose bridge in controlled strips.",
      },
      {
        heading: "Eyes",
        body:
          "Defined crease depth in neutral browns or soft metallics, tightlined upper lashes, and full mascara or strip lashes for stage. Lower lash line stays soft, not smudged out, so eyes read open on camera.",
      },
      {
        heading: "Lips and cheeks",
        body:
          "Blush tends toward rose or peach with placement lifted toward temples. Lips are often nude-rose or classic red with crisp liner for award shows; day appearances may use gloss or balm over mauve.",
      },
    ],
    faqs: [
      {
        question: "How do I adapt this for everyday?",
        answer:
          "Use one crease shade, skip strip lashes, and swap heavy contour for cream bronzer. Keep lip color one step above your natural flush.",
      },
    ],
  },
  {
    slug: "skin-prep-before-makeup",
    title: "Skin Prep Layer Order Before Makeup",
    excerpt: "Hydration, wait times, and SPF placement determine whether foundation sits smoothly or separates by midday.",
    category: "skin",
    readTimeMinutes: 7,
    relatedTools: ["skin-undertone-test", "makeup-time-calculator"],
    relatedGuides: ["face-wash-before-makeup", "spf-under-makeup"],
    relatedLooks: ["everyday-makeup", "korean-makeup"],
    seoTitle: "Makeup Skin Prep: Layering Skincare Correctly",
    seoDescription: "Step-by-step skin prep before primer and foundation for dry, oily, and combination skin.",
    sections: [
      {
        heading: "Thin to thick rule",
        body: "Apply watery serums first, then moisturizer, then occlusive balms only on lips or dry spots. Thick creams under silicone primer can pill.",
      },
      {
        heading: "Wait for absorption",
        body: "Give moisturizer 3-5 minutes before primer. Rushing traps moisture and causes foundation to slide.",
      },
    ],
    faqs: [],
  },
  {
    slug: "color-correction-basics",
    title: "Color Correction Before Concealer",
    excerpt: "Neutralize redness, darkness, and sallowness with peach, green, and lavender correctors. Less is more.",
    category: "face",
    readTimeMinutes: 8,
    relatedTools: ["foundation-shade-finder", "contour-placement-guide"],
    relatedGuides: ["face-primer-makeup-primer"],
    relatedLooks: ["office-makeup", "natural-makeup"],
    seoTitle: "Makeup Color Correction Guide",
    seoDescription: "When to use green, peach, orange, and lavender correctors under foundation and concealer.",
    sections: [
      {
        heading: "Redness",
        body: "Sheer green or green-tinted primer on cheeks and around nose; follow with skin-tone foundation rather than thick green concealer everywhere.",
      },
      {
        heading: "Under-eye circles",
        body: "Peach or salmon correctors on medium to deep skin; pink-peach on fair cool undertones. Pat a thin layer before concealer.",
      },
    ],
    faqs: [],
  },
  {
    slug: "undertone-vs-surface-tone",
    title: "Undertone vs Surface Tone: Stop Matching Wrong",
    excerpt: "Your summer tan changes surface tone; undertone usually stays the same. Match foundation to both.",
    category: "skin",
    readTimeMinutes: 6,
    relatedTools: ["skin-undertone-test", "foundation-shade-finder", "lipstick-shade-finder"],
    relatedGuides: ["skin-prep-before-makeup"],
    relatedLooks: ["natural-makeup"],
    seoTitle: "Skin Undertone vs Overtone Explained",
    seoDescription: "Learn to separate undertone from surface color for better foundation and lipstick matches.",
    sections: [
      {
        heading: "Quick undertone checks",
        body: "Compare how gold vs silver jewelry flatters you, and whether sun leaves you golden or pink. Veins on wrist are a hint, not a diagnosis.",
      },
    ],
    faqs: [],
  },
  {
    slug: "contour-for-round-faces",
    title: "Contour Placement for Round and Soft Faces",
    excerpt: "Sculpt with shadow where bone structure naturally recedes. Skip muddy stripes on the cheek apple.",
    category: "face",
    readTimeMinutes: 7,
    relatedTools: ["contour-placement-guide", "face-shape-detector", "cheekbone-analyzer"],
    relatedGuides: ["blush-placement-by-face-shape"],
    relatedLooks: ["soft-glam", "everyday-makeup"],
    seoTitle: "Contour for Round Face Shapes",
    seoDescription: "Where to place contour and highlight on round faces for definition that still looks natural.",
    sections: [
      {
        heading: "Contour zones",
        body: "Apply cool taupe bronzer in the hollow under cheekbones, along temples, and lightly under jaw. Blend upward into hairline, not toward the nose.",
      },
    ],
    faqs: [],
  },
  {
    slug: "blush-placement-by-face-shape",
    title: "Blush Placement by Face Shape",
    excerpt: "Lift the face by moving blush toward temples; soften length by placing color on apples.",
    category: "face",
    readTimeMinutes: 6,
    relatedTools: ["blush-placement-finder", "face-shape-detector"],
    relatedGuides: ["contour-for-round-faces"],
    relatedLooks: ["clean-girl-makeup", "date-night-makeup"],
    seoTitle: "Where to Apply Blush for Your Face Shape",
    seoDescription: "Blush maps for oval, round, long, heart, and square faces.",
    sections: [
      {
        heading: "General rule",
        body: "Smile to find the apple, then sweep product back toward the ear for a lifted effect on most shapes.",
      },
    ],
    faqs: [],
  },
  {
    slug: "eyeshadow-for-hooded-eyes",
    title: "Eyeshadow Placement for Hooded Eyes",
    excerpt: "Open the lid by placing transition shade above the crease line visible when eyes are open.",
    category: "eyes",
    readTimeMinutes: 8,
    relatedTools: ["eye-shape-detector", "eyeshadow-placement-guide"],
    relatedGuides: ["tightlining-basics"],
    relatedLooks: ["soft-glam", "smokey-eye"],
    seoTitle: "Hooded Eye Makeup Tutorial",
    seoDescription: "Crease placement, liner techniques, and matte vs shimmer choices for hooded lids.",
    sections: [
      {
        heading: "Visible crease trick",
        body: "Look straight ahead in the mirror and mark where hood skin folds. That is where transition color should sit, blended upward.",
      },
    ],
    faqs: [],
  },
  {
    slug: "tightlining-basics",
    title: "Tightlining: Define Lashes Without a Thick Line",
    excerpt: "Deposit liner between upper waterline lashes for density that does not shrink the lid.",
    category: "eyes",
    readTimeMinutes: 5,
    relatedTools: ["eyeliner-style-finder", "eye-shape-detector"],
    relatedGuides: ["eyeshadow-for-hooded-eyes"],
    relatedLooks: ["office-makeup", "natural-makeup"],
    seoTitle: "How to Tightline Eyes Safely",
    seoDescription: "Step-by-step tightlining with pencil or gel and hygiene tips for waterline application.",
    sections: [
      {
        heading: "Technique",
        body: "Use a waterproof pencil, lift upper lid gently, and wiggle between lash roots. Avoid pulling on delicate waterline skin.",
      },
    ],
    faqs: [],
  },
  {
    slug: "eyebrow-mapping-basics",
    title: "Eyebrow Mapping for Beginners",
    excerpt: "Start, arch, and tail points balance your nose and eyes. Adjust for face length.",
    category: "eyes",
    readTimeMinutes: 7,
    relatedTools: ["eyebrow-shape-detector", "eyebrow-shaping-guide"],
    relatedGuides: ["eyeshadow-for-hooded-eyes"],
    relatedLooks: ["minimalist-makeup", "clean-girl-makeup"],
    seoTitle: "Eyebrow Mapping Guide",
    seoDescription: "Find brow start, peak, and tail placement using simple proportional guides.",
    sections: [
      {
        heading: "Three-point map",
        body: "Align brow start with nostril edge, arch with outer iris, tail with nostril-to-outer-eye angle. Soften angles for round faces.",
      },
    ],
    faqs: [],
  },
  {
    slug: "lip-liner-for-definition",
    title: "Lip Liner for Thin or Uneven Lips",
    excerpt: "Overlining works when you blur the border and match liner to lipstick. Harsh outlines give you away in daylight.",
    category: "lips",
    readTimeMinutes: 6,
    relatedTools: ["lip-liner-guide", "lip-shape-detector", "lipstick-shade-finder"],
    relatedGuides: ["undertone-vs-surface-tone"],
    relatedLooks: ["date-night-makeup", "old-money-makeup"],
    seoTitle: "Lip Liner Techniques and Shades",
    seoDescription: "Choose liner depth, correct asymmetry, and make lipstick last longer.",
    sections: [
      {
        heading: "Shade choice",
        body: "Pick liner one shade deeper than lipstick or an exact match for longevity. Nude liners should still have enough pigment to define.",
      },
    ],
    faqs: [],
  },
  {
    slug: "brush-vs-sponge-foundation",
    title: "Brush vs Sponge for Foundation",
    excerpt: "Brushes push coverage; damp sponges shear it out. Texture of base matters as much as tool.",
    category: "basics",
    readTimeMinutes: 5,
    relatedTools: ["foundation-shade-finder", "makeup-product-checklist"],
    relatedGuides: ["clinique-superpowder-double-face-makeup"],
    relatedLooks: ["everyday-makeup", "full-glam"],
    seoTitle: "Foundation Application: Brush or Beauty Sponge",
    seoDescription: "Compare finish and coverage from brushes, sponges, and fingers for liquid and cream foundation.",
    sections: [
      {
        heading: "When to use each",
        body: "Dense brush for full coverage creams; damp sponge for skin tints and dewy formulas. Fingers warm balms and tint serums.",
      },
    ],
    faqs: [],
  },
  {
    slug: "setting-powder-vs-spray",
    title: "Setting Powder vs Setting Spray",
    excerpt: "Powder locks oil; spray melds layers. Many routines need both in different zones.",
    category: "basics",
    readTimeMinutes: 6,
    relatedTools: ["makeup-routine-generator", "makeup-time-calculator"],
    relatedGuides: ["face-primer-makeup-primer"],
    relatedLooks: ["party-makeup", "bridal-makeup"],
    seoTitle: "Setting Powder and Spray: How to Use Both",
    seoDescription: "Prevent cakey makeup while extending wear with strategic powder and spray.",
    sections: [
      {
        heading: "Zone strategy",
        body: "Powder T-zone and under eyes; use setting spray over the whole face to reduce powderiness and add flexibility.",
      },
    ],
    faqs: [],
  },
  {
    slug: "makeup-expiration-hygiene",
    title: "Makeup Expiration and Hygiene",
    excerpt: "Mascara and liquid liners expire fastest; powders last longer but shared tools still spread bacteria.",
    category: "products",
    readTimeMinutes: 6,
    relatedTools: ["makeup-product-checklist"],
    relatedGuides: ["removing-makeup-gently"],
    relatedLooks: ["natural-makeup"],
    seoTitle: "When to Replace Makeup Products",
    seoDescription: "Typical shelf lives for mascara, foundation, sponges, and brushes plus cleaning cadence.",
    sections: [
      {
        heading: "Replace often",
        body: "Liquid eye products around three months after opening if used daily. Wash brushes weekly if acne-prone.",
      },
    ],
    faqs: [],
  },
  {
    slug: "removing-makeup-gently",
    title: "How to Remove Makeup Without Irritating Skin",
    excerpt: "Oil cleansers dissolve long-wear lip and eye color; follow with a gentle second cleanse.",
    category: "skin",
    readTimeMinutes: 6,
    relatedTools: ["face-wash-before-makeup"],
    relatedGuides: ["makeup-expiration-hygiene", "face-wash-before-makeup"],
    relatedLooks: ["no-makeup-makeup"],
    seoTitle: "Makeup Removal Routine",
    seoDescription: "Double cleanse, micellar water, and when to skip harsh scrubbing around eyes.",
    sections: [
      {
        heading: "Long-wear products",
        body: "Hold oil cleanser on lashes 30 seconds before wiping. Avoid tugging; use vertical strokes on lips.",
      },
    ],
    faqs: [],
  },
  {
    slug: "spf-under-makeup",
    title: "SPF Under Makeup: What Works",
    excerpt: "Makeup with SPF is rarely enough alone. Apply a dedicated sunscreen first and let it set.",
    category: "skin",
    readTimeMinutes: 7,
    relatedTools: ["makeup-routine-generator"],
    relatedGuides: ["skin-prep-before-makeup", "face-primer-makeup-primer"],
    relatedLooks: ["everyday-makeup", "office-makeup"],
    seoTitle: "Sunscreen Before Makeup Application",
    seoDescription: "Choose SPF textures that work under primer and reapply options over makeup.",
    sections: [
      {
        heading: "Texture pairing",
        body: "Gel or fluid sunscreens often layer best under silicone primers. Reapply with SPF mist or powder SPF midday if outdoors.",
      },
    ],
    faqs: [],
  },
  {
    slug: "cream-vs-powder-blush",
    title: "Cream vs Powder Blush",
    excerpt: "Creams melt into skin for dewy looks; powders set faster on oily skin. Order depends on base formula.",
    category: "face",
    readTimeMinutes: 5,
    relatedTools: ["blush-placement-finder"],
    relatedGuides: ["blush-placement-by-face-shape"],
    relatedLooks: ["clean-girl-makeup", "korean-makeup"],
    seoTitle: "Cream or Powder Blush: Which to Choose",
    seoDescription: "Layering rules for cream blush over foundation and when to use powder on top.",
    sections: [
      {
        heading: "Layering",
        body: "Cream blush before powder setting on dewy bases; powder blush after setting on matte routines.",
      },
    ],
    faqs: [],
  },
  {
    slug: "monochromatic-makeup-how-to",
    title: "Monochromatic Makeup: One Color Family",
    excerpt: "Use the same hue on eyes, cheeks, and lips in different depths for cohesive photos.",
    category: "basics",
    readTimeMinutes: 7,
    relatedTools: ["makeup-style-finder", "lipstick-shade-finder"],
    relatedGuides: ["undertone-vs-surface-tone"],
    relatedLooks: ["monochromatic-makeup", "soft-glam"],
    seoTitle: "Monochromatic Makeup Tutorial",
    seoDescription: "Build rose, peach, or mauve monochromatic looks without looking flat.",
    sections: [
      {
        heading: "Depth variation",
        body: "Keep cheeks and lips in the same family; use a deeper matte in the crease and shimmer on lid center for dimension.",
      },
    ],
    faqs: [],
  },
  {
    slug: "makeup-for-oily-skin",
    title: "Makeup That Lasts on Oily Skin",
    excerpt: "Mattify where you need it, not everywhere. Over-powdering often brings rebound shine by lunch.",
    category: "skin",
    readTimeMinutes: 8,
    relatedTools: ["foundation-shade-finder", "makeup-time-calculator"],
    relatedGuides: ["setting-powder-vs-spray", "skin-prep-before-makeup"],
    relatedLooks: ["office-makeup", "party-makeup"],
    seoTitle: "Oily Skin Makeup Tips",
    seoDescription: "Primers, foundations, and blotting strategy for combination and oily skin.",
    sections: [
      {
        heading: "Midday maintenance",
        body: "Blot first, then sheer powder on T-zone only. Cream touch-ups over heavy powder can patch. Use a damp sponge instead.",
      },
    ],
    faqs: [],
  },
  {
    slug: "wedding-makeup-timeline",
    title: "Wedding Day Makeup Timeline",
    excerpt: "Schedule trials, touch-up kits, and photography-friendly finishes with buffer time.",
    category: "occasion",
    readTimeMinutes: 9,
    relatedTools: ["wedding-makeup-finder", "makeup-time-calculator"],
    relatedGuides: ["carrie-underwood-makeup-style", "setting-powder-vs-spray"],
    relatedLooks: ["bridal-makeup", "soft-glam"],
    seoTitle: "Bridal Makeup Schedule and Trial Tips",
    seoDescription: "When to book trials, how early to start hair and makeup, and what to pack for touch-ups.",
    sections: [
      {
        heading: "Trial timing",
        body: "Book a trial 2-3 months out with the same lighting you expect indoors or outdoors. Photograph results in daylight and flash.",
      },
      {
        heading: "Day-of buffer",
        body: "Start makeup after first look photos if timeline allows; allow 60-90 minutes for bridal makeup with lashes.",
      },
    ],
    faqs: [],
  },
  {
    slug: "korean-glass-skin-prep",
    title: "Glass Skin Prep Before Lightweight Base",
    excerpt: "Hydrating layers and strategic highlight replace heavy contour for K-beauty inspired glow.",
    category: "skin",
    readTimeMinutes: 8,
    relatedTools: ["skin-undertone-test", "everyday-makeup-finder"],
    relatedGuides: ["cream-vs-powder-blush", "skin-prep-before-makeup"],
    relatedLooks: ["korean-makeup", "clean-girl-makeup"],
    seoTitle: "Glass Skin Makeup Prep Guide",
    seoDescription: "Layering toner, essence, and thin base for luminous skin without grease.",
    sections: [
      {
        heading: "Base choice",
        body: "Tinted moisturizers or cushion compacts with light coverage preserve skin texture. Spot-conceal only where needed.",
      },
    ],
    faqs: [],
  },
  {
    slug: "soft-glam-eyes",
    title: "Soft Glam Eye Makeup Structure",
    excerpt: "Blend neutral browns, soft shimmer on the lid, and wispy lashes. Glam without blackout smoke.",
    category: "eyes",
    readTimeMinutes: 8,
    relatedTools: ["eyeshadow-placement-guide", "eyeliner-style-finder"],
    relatedGuides: ["carrie-underwood-makeup-style", "wedding-makeup-timeline"],
    relatedLooks: ["soft-glam", "date-night-makeup"],
    seoTitle: "Soft Glam Eyeshadow Guide",
    seoDescription: "Transition shades, crease depth, and liner choices for soft glam eyes.",
    sections: [
      {
        heading: "Shade stack",
        body: "Matte bone on brow bone, medium taupe in crease, deeper brown outer V, champagne shimmer on center lid.",
      },
    ],
    faqs: [],
  },
];
