import type { BeautyTool } from "@/types/tools";

export const beautyTools: BeautyTool[] = [
  {
    slug: "face-shape-detector",
    title: "Face Shape Detector",
    description:
      "Upload a front-facing photo to estimate whether your face reads oval, round, square, heart, oblong, or diamond based on forehead, cheek, and jaw proportions.",
    category: "face",
    usesMediaPipe: true,
    seoTitle: "Free AI Face Shape Detector Online",
    seoDescription:
      "Detect your face shape from a selfie and get contour, blush, and hairstyle tips matched to your proportions.",
    relatedGuides: ["contour-for-round-faces", "blush-placement-by-face-shape"],
    relatedTools: ["face-ratio-calculator", "cheekbone-analyzer", "contour-placement-guide"],
    faqs: [
      {
        question: "How accurate is AI face shape detection?",
        answer:
          "Angle and hairline matter. Pull hair back, look straight at the camera, and treat the label as a styling guide, not a box you have to fit.",
      },
      {
        question: "Can my face shape change with weight or age?",
        answer:
          "Soft tissue volume shifts over time, but bone structure stays similar. Re-test if your jawline or cheeks change noticeably.",
      },
    ],
  },
  {
    slug: "face-symmetry-test",
    title: "Face Symmetry Test",
    description:
      "Compare left and right halves to spot subtle asymmetry in brows, eyes, and mouth. Almost everyone has it, and heavy makeup rarely fixes it well.",
    category: "face",
    usesMediaPipe: true,
    seoTitle: "Face Symmetry Test with Photo Analysis",
    seoDescription:
      "Check facial symmetry online and learn makeup tricks to balance uneven brows, lips, or jawline.",
    relatedGuides: ["eyebrow-mapping-basics", "lip-liner-for-definition"],
    relatedTools: ["face-shape-detector", "face-ratio-calculator"],
    faqs: [
      {
        question: "Is perfect symmetry realistic?",
        answer:
          "Almost everyone has mild asymmetry. Makeup can balance brows or lips slightly; chasing mirror-perfect symmetry often looks unnatural.",
      },
    ],
  },
  {
    slug: "face-ratio-calculator",
    title: "Face Ratio Calculator",
    description:
      "Measure vertical thirds (hairline to brow, brow to nose, nose to chin) and horizontal fifths to see how classical proportions apply to your features.",
    category: "face",
    usesMediaPipe: true,
    seoTitle: "Facial Proportion Ratio Calculator",
    seoDescription:
      "Calculate face ratios from landmarks for makeup placement, brow mapping, and contour planning.",
    relatedGuides: ["eyebrow-mapping-basics", "contour-for-round-faces"],
    relatedTools: ["face-shape-detector", "forehead-shape-analyzer", "jawline-shape-detector"],
    faqs: [
      {
        question: "What if my thirds are uneven?",
        answer:
          "Uneven thirds are normal. Tweak brow arch or highlight placement to balance length visually. Makeup cannot change bone structure.",
      },
    ],
  },
  {
    slug: "forehead-shape-analyzer",
    title: "Forehead Shape Analyzer",
    description:
      "Evaluate forehead width and height relative to cheekbones to suggest brow shapes and hairline-contouring techniques that harmonize with your upper face.",
    category: "face",
    usesMediaPipe: true,
    seoTitle: "Forehead Shape Analysis for Brows and Contour",
    seoDescription:
      "Analyze forehead shape from a photo and get brow and highlight recommendations.",
    relatedGuides: ["eyebrow-mapping-basics"],
    relatedTools: ["face-ratio-calculator", "eyebrow-shape-detector", "face-shape-detector"],
    faqs: [
      {
        question: "Does a high forehead need bangs?",
        answer:
          "Not necessarily. Strong brows or soft highlight at the hairline can balance height without a haircut change.",
      },
    ],
  },
  {
    slug: "jawline-shape-detector",
    title: "Jawline Shape Detector",
    description:
      "Classify soft, angular, tapered, or square jaw tendencies to guide bronzer placement and blush direction without over-sculpting.",
    category: "face",
    usesMediaPipe: true,
    seoTitle: "Jawline Shape Detector Online",
    seoDescription:
      "Identify jawline shape and learn contour and bronzer techniques for your lower face.",
    relatedGuides: ["contour-for-round-faces"],
    relatedTools: ["face-shape-detector", "cheekbone-analyzer", "contour-placement-guide"],
    faqs: [
      {
        question: "Can contour permanently change my jaw?",
        answer:
          "No. Contour creates temporary shadow; blending along the actual bone edge looks most believable.",
      },
    ],
  },
  {
    slug: "cheekbone-analyzer",
    title: "Cheekbone Analyzer",
    description:
      "Locate cheekbone height and prominence from landmarks to place blush, bronzer, and highlight where they lift rather than flatten your face.",
    category: "face",
    usesMediaPipe: true,
    seoTitle: "Cheekbone Structure Analyzer",
    seoDescription:
      "Find your cheekbone placement for blush, contour, and highlight with AI landmark mapping.",
    relatedGuides: ["blush-placement-by-face-shape", "cream-vs-powder-blush"],
    relatedTools: ["blush-placement-finder", "contour-placement-guide", "face-shape-detector"],
    faqs: [
      {
        question: "Where should blush sit on high cheekbones?",
        answer:
          "Sweep from apple toward temple, below the bone highlight. Save the highest point for highlight unless you want an editorial look.",
      },
    ],
  },
  {
    slug: "eye-shape-detector",
    title: "Eye Shape Detector",
    description:
      "Identify almond, round, hooded, monolid, downturned, or upturned tendencies to tailor crease placement, liner, and lash focus.",
    category: "eye",
    usesMediaPipe: true,
    seoTitle: "AI Eye Shape Detector",
    seoDescription:
      "Detect eye shape from a photo and get eyeshadow and eyeliner tips for your lid structure.",
    relatedGuides: ["eyeshadow-for-hooded-eyes", "tightlining-basics"],
    relatedTools: ["eyeshadow-placement-guide", "eyeliner-style-finder", "eyebrow-shape-detector"],
    faqs: [
      {
        question: "Can I have more than one eye shape trait?",
        answer:
          "Yes. Many people are hooded-almond or slightly downturned. Use the dominant trait for placement rules.",
      },
    ],
  },
  {
    slug: "eyeliner-style-finder",
    title: "Eyeliner Style Finder",
    description:
      "Answer a few questions about lid space, skill level, and occasion to recommend wing shapes, tightline focus, or smudged pencil styles.",
    category: "eye",
    usesMediaPipe: false,
    seoTitle: "Best Eyeliner Style for Your Eyes",
    seoDescription:
      "Find your ideal eyeliner style (wing, fox eye, smudge, or tightline) based on eye shape and how steady your hand is.",
    relatedGuides: ["tightlining-basics", "eyeshadow-for-hooded-eyes"],
    relatedTools: ["eye-shape-detector", "eyeshadow-placement-guide"],
    faqs: [
      {
        question: "Which liner is easiest for beginners?",
        answer:
          "Dark brown pencil smudged along the lash line forgives shaky hands better than long liquid wings.",
      },
    ],
  },
  {
    slug: "eyeshadow-placement-guide",
    title: "Eyeshadow Placement Guide",
    description:
      "Get a personalized map for transition, crease, lid, and inner-corner shades based on eye shape and hood depth when you upload a photo.",
    category: "eye",
    usesMediaPipe: true,
    seoTitle: "Eyeshadow Placement by Eye Shape",
    seoDescription:
      "Interactive eyeshadow placement guide for hooded, deep-set, and monolid eyes.",
    relatedGuides: ["eyeshadow-for-hooded-eyes", "soft-glam-eyes"],
    relatedTools: ["eye-shape-detector", "eyeliner-style-finder"],
    faqs: [
      {
        question: "Do I need many eyeshadow shades?",
        answer:
          "A matte medium brown, a lighter bone shade, and one shimmer cover most everyday looks.",
      },
    ],
  },
  {
    slug: "eyebrow-shape-detector",
    title: "Eyebrow Shape Detector",
    description:
      "Analyze brow arch, tail length, and thickness from your photo to suggest grooming goals that match your face length and eye spacing.",
    category: "eye",
    usesMediaPipe: true,
    seoTitle: "Eyebrow Shape Detector Online",
    seoDescription:
      "Detect natural brow shape and get mapping tips for fill, trim, and arch placement.",
    relatedGuides: ["eyebrow-mapping-basics"],
    relatedTools: ["eyebrow-shaping-guide", "forehead-shape-analyzer", "eye-shape-detector"],
    faqs: [
      {
        question: "Should I follow trends like soap brows?",
        answer:
          "Trends can inspire texture, but arch and length should follow your bone structure for balanced expressions.",
      },
    ],
  },
  {
    slug: "eyebrow-shaping-guide",
    title: "Eyebrow Shaping Guide",
    description:
      "Step-by-step grooming plan: what to trim, what to fill, and where not to over-pluck based on your detected brow shape and skill level.",
    category: "eye",
    usesMediaPipe: false,
    seoTitle: "How to Shape Eyebrows at Home",
    seoDescription:
      "Personalized eyebrow shaping guide with mapping, trim, and fill instructions.",
    relatedGuides: ["eyebrow-mapping-basics"],
    relatedTools: ["eyebrow-shape-detector", "face-ratio-calculator"],
    faqs: [
      {
        question: "How often should I trim brows?",
        answer:
          "Trim only long hairs sticking up; snip every few weeks beats aggressive tweezing.",
      },
    ],
  },
  {
    slug: "lip-shape-detector",
    title: "Lip Shape Detector",
    description:
      "Outline your lip corners, cupid's bow, and lower lip volume to suggest liner tricks and lipstick application for symmetry and fullness.",
    category: "lip",
    usesMediaPipe: true,
    seoTitle: "Lip Shape Analysis Tool",
    seoDescription:
      "Analyze lip shape from a photo for liner, overlining, and shade placement tips.",
    relatedGuides: ["lip-liner-for-definition"],
    relatedTools: ["lip-liner-guide", "lipstick-shade-finder"],
    faqs: [
      {
        question: "Is overlining bad for thin lips?",
        answer:
          "Slight overlining with blurred edges can look natural; harsh lines outside the vermilion border often read obvious in daylight.",
      },
    ],
  },
  {
    slug: "lipstick-shade-finder",
    title: "Lipstick Shade Finder",
    description:
      "Answer a few questions on undertone, depth, and occasion to narrow lipstick families (blue-red, coral, mauve, brown-nude) before you swatch in store.",
    category: "lip",
    usesMediaPipe: false,
    seoTitle: "Find Your Best Lipstick Shade",
    seoDescription:
      "Lipstick color finder based on skin undertone, depth, and makeup style preferences.",
    relatedGuides: ["undertone-vs-surface-tone", "monochromatic-makeup-how-to"],
    relatedTools: ["skin-undertone-test", "lip-shape-detector", "makeup-style-finder"],
    faqs: [
      {
        question: "Why does the same lipstick look different on me and my friend?",
        answer:
          "Undertone and natural lip pigment change how color reads. Always swatch on your lips, not your hand.",
      },
    ],
  },
  {
    slug: "lip-liner-guide",
    title: "Lip Liner Guide",
    description:
      "Custom liner workflow: shade match, border correction, and long-wear layering for your lip shape and desired finish (matte vs glossy).",
    category: "lip",
    usesMediaPipe: false,
    seoTitle: "Lip Liner Guide for Long-Lasting Color",
    seoDescription:
      "Learn lip liner techniques for definition, symmetry, and lipstick longevity.",
    relatedGuides: ["lip-liner-for-definition"],
    relatedTools: ["lip-shape-detector", "lipstick-shade-finder"],
    faqs: [
      {
        question: "Liner darker or lighter than lipstick?",
        answer:
          "One shade deeper adds dimension; exact match increases wear time; lighter liner can soften bold lips.",
      },
    ],
  },
  {
    slug: "skin-undertone-test",
    title: "Skin Undertone Test",
    description:
      "Guided quiz plus optional photo check to classify warm, cool, or neutral undertone so foundation and lip shades stop turning gray or orange.",
    category: "skin",
    usesMediaPipe: false,
    seoTitle: "Skin Undertone Test Online",
    seoDescription:
      "Free undertone quiz for warm, cool, and neutral skin with foundation and jewelry tips.",
    relatedGuides: ["undertone-vs-surface-tone", "skin-prep-before-makeup"],
    relatedTools: ["foundation-shade-finder", "lipstick-shade-finder"],
    faqs: [
      {
        question: "Can undertone change with tan?",
        answer:
          "Tan changes surface depth, not usually undertone. You may need a deeper foundation shade while keeping the same undertone letter.",
      },
    ],
  },
  {
    slug: "foundation-shade-finder",
    title: "Foundation Shade Finder",
    description:
      "Match depth and undertone to narrow liquid, powder, and skin-tint families and learn jawline swatch technique for daylight checks.",
    category: "skin",
    usesMediaPipe: false,
    seoTitle: "Foundation Shade Matcher",
    seoDescription:
      "Find foundation shade and undertone matches for liquid, powder, and tint formulas.",
    relatedGuides: ["undertone-vs-surface-tone", "brush-vs-sponge-foundation"],
    relatedTools: ["skin-undertone-test", "makeup-budget-calculator"],
    faqs: [
      {
        question: "Should foundation match neck or face?",
        answer:
          "Match jawline where face meets neck in daylight; blend down so face and neck harmonize.",
      },
    ],
  },
  {
    slug: "blush-placement-finder",
    title: "Blush Placement Finder",
    description:
      "Uses face landmarks to suggest draping vs apple placement and whether to sweep toward temples or keep color forward on the cheeks.",
    category: "makeup",
    usesMediaPipe: true,
    seoTitle: "Where to Apply Blush: AI Map",
    seoDescription:
      "Personalized blush placement for your face shape with cream and powder tips.",
    relatedGuides: ["blush-placement-by-face-shape", "cream-vs-powder-blush"],
    relatedTools: ["cheekbone-analyzer", "face-shape-detector", "contour-placement-guide"],
    faqs: [
      {
        question: "Blush on nose for sun-kissed look?",
        answer:
          "Tap lightly across bridge and nose tip with same blush; keep it sheer to avoid sunburn effect.",
      },
    ],
  },
  {
    slug: "contour-placement-guide",
    title: "Contour Placement Guide",
    description:
      "See contour zones for hollows, temples, jaw, and nose based on your face shape. Cool taupe reads more like real shadow than orange bronzer.",
    category: "makeup",
    usesMediaPipe: true,
    seoTitle: "Contour Map for Your Face Shape",
    seoDescription:
      "AI contour placement guide for cheek hollows, jaw, and nose with blending tips.",
    relatedGuides: ["contour-for-round-faces"],
    relatedTools: ["face-shape-detector", "jawline-shape-detector", "blush-placement-finder"],
    faqs: [
      {
        question: "Cream or powder contour first?",
        answer:
          "Cream contour before powder foundation or after sheer base; powder contour after foundation is set.",
      },
    ],
  },
  {
    slug: "makeup-style-finder",
    title: "Makeup Style Finder",
    description:
      "Quiz your vibe, maintenance tolerance, and occasions to point you toward looks like clean girl, soft glam, K-beauty, or minimalist caps.",
    category: "makeup",
    usesMediaPipe: false,
    seoTitle: "What Makeup Style Suits Me?",
    seoDescription:
      "Find your makeup aesthetic with a quick style quiz and linked tutorials.",
    relatedGuides: ["monochromatic-makeup-how-to", "carrie-underwood-makeup-style"],
    relatedTools: ["everyday-makeup-finder", "wedding-makeup-finder", "makeup-routine-generator"],
    faqs: [
      {
        question: "Can I mix styles?",
        answer:
          "Yes. Clean girl base with soft glam eyes is a classic evening combo.",
      },
    ],
  },
  {
    slug: "makeup-product-checklist",
    title: "Makeup Product Checklist",
    description:
      "Build a starter or upgrade kit by experience level: base, tools, eye basics, and removal. Check off what you need and take the list shopping.",
    category: "makeup",
    usesMediaPipe: false,
    seoTitle: "Essential Makeup Product Checklist",
    seoDescription:
      "Printable makeup checklist for beginners through advanced kits by category.",
    relatedGuides: ["makeup-expiration-hygiene", "brush-vs-sponge-foundation"],
    relatedTools: ["makeup-budget-calculator", "makeup-routine-generator"],
    faqs: [
      {
        question: "What should beginners buy first?",
        answer:
          "Skin tint or foundation match, concealer, brow gel, mascara, lip balm, and gentle remover beat a huge palette you cannot blend yet.",
      },
    ],
  },
  {
    slug: "makeup-routine-generator",
    title: "Makeup Routine Generator",
    description:
      "Input time budget, skin type, and finish preference to output an ordered AM or PM makeup routine with optional skincare steps.",
    category: "makeup",
    usesMediaPipe: false,
    seoTitle: "Personalized Makeup Routine Generator",
    seoDescription:
      "Generate a custom morning or evening makeup routine based on time and skin type.",
    relatedGuides: ["skin-prep-before-makeup", "face-primer-makeup-primer", "spf-under-makeup"],
    relatedTools: ["makeup-time-calculator", "makeup-product-checklist", "everyday-makeup-finder"],
    faqs: [
      {
        question: "How long should skincare wait before makeup?",
        answer:
          "Let moisturizer absorb a few minutes; rushing causes pilling under primer and foundation.",
      },
    ],
  },
  {
    slug: "makeup-budget-calculator",
    title: "Makeup Budget Calculator",
    description:
      "Split your budget across base, eyes, lips, and tools for drugstore, mid-range, or luxury tiers. See where one splurge actually pays off.",
    category: "makeup",
    usesMediaPipe: false,
    seoTitle: "Makeup Budget Planner Calculator",
    seoDescription:
      "Plan makeup spending by category with drugstore vs luxury swap suggestions.",
    relatedGuides: ["makeup-product-checklist"],
    relatedTools: ["makeup-product-checklist", "foundation-shade-finder"],
    faqs: [
      {
        question: "Where is splurging worth it?",
        answer:
          "Many users prioritize foundation match, concealer, and brushes; trend eyeshadows can stay budget.",
      },
    ],
  },
  {
    slug: "makeup-time-calculator",
    title: "Makeup Time Calculator",
    description:
      "Estimate how long each step in your look takes. Handy for wedding timelines, commute mornings, and gym-to-office touch-ups.",
    category: "makeup",
    usesMediaPipe: false,
    seoTitle: "How Long Does My Makeup Take?",
    seoDescription:
      "Calculate makeup application time by look and skill level for busy schedules.",
    relatedGuides: ["wedding-makeup-timeline"],
    relatedTools: ["makeup-routine-generator", "everyday-makeup-finder", "wedding-makeup-finder"],
    faqs: [
      {
        question: "How long for everyday vs full glam?",
        answer:
          "Everyday routines often fit 10-20 minutes; full glam with lashes may need 45-60 minutes for beginners.",
      },
    ],
  },
  {
    slug: "wedding-makeup-finder",
    title: "Wedding Makeup Finder",
    description:
      "Venue, dress tone, photography style, and comfort with lashes feed recommendations for bridal, guest, or bridal-party makeup intensity.",
    category: "makeup",
    usesMediaPipe: false,
    seoTitle: "Wedding Makeup Look Finder",
    seoDescription:
      "Find wedding-appropriate makeup for brides and guests with trial prep tips.",
    relatedGuides: ["wedding-makeup-timeline", "setting-powder-vs-spray"],
    relatedTools: ["makeup-style-finder", "makeup-time-calculator", "skin-undertone-test"],
    faqs: [
      {
        question: "Matte or dewy for outdoor weddings?",
        answer:
          "Dewy can photograph beautifully but set strategically; matte with setting spray handles humidity for some skin types.",
      },
    ],
  },
  {
    slug: "everyday-makeup-finder",
    title: "Everyday Makeup Finder",
    description:
      "Tell us dress code, skin concerns, and coverage level. We’ll suggest a repeatable daily look by product type, not brand hype.",
    category: "makeup",
    usesMediaPipe: false,
    seoTitle: "Everyday Makeup Look Finder",
    seoDescription:
      "Get an everyday makeup recommendation based on lifestyle, skin, and time.",
    relatedGuides: ["makeup-for-oily-skin", "spf-under-makeup"],
    relatedTools: ["makeup-routine-generator", "foundation-shade-finder", "makeup-style-finder"],
    faqs: [
      {
        question: "Same look five days a week?",
        answer:
          "Keep a core routine and swap one thing (lip or liner) when you want variety without losing time.",
      },
    ],
  },
];
