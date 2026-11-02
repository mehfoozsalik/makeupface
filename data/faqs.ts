export interface HomepageFaq {
  question: string;
  answer: string;
}

export const homepageFaqs: HomepageFaq[] = [
  {
    question: "How does AI analyze my face for makeup recommendations?",
    answer:
      "Upload a selfie and your browser maps landmarks: cheekbones, eye corners, lip line, and more. Those measurements feed classifiers for face shape, eye shape, and symmetry. You get placement tips and product categories to try. This is makeup guidance, not medical advice.",
  },
  {
    question: "Do I need a professional photo or special lighting?",
    answer:
      "A clear front-facing selfie in natural daylight is enough. Skip heavy filters, wild angles, and sunglasses. If the image is blurry or dim, we’ll ask you to retake it so the landmarks stay accurate.",
  },
  {
    question: "Is my photo stored or shared with third parties?",
    answer:
      "Your photo stays in the browser for landmark analysis. We never send the image to DeepSeek, only structured measurements and your preferences. Saved reports live in localStorage as text (no photo attached), and you can delete them anytime. See our Privacy Policy for the full picture.",
  },
  {
    question: "Can these tools replace a makeup artist or dermatologist?",
    answer:
      "No. Guides and calculators are here to teach technique. For skin conditions, allergies, or big-day glam, talk to a licensed pro. Online shade matching is a head start. Always patch-test new products.",
  },
  {
    question: "What is the difference between undertone and skin depth?",
    answer:
      "Depth is how light or deep your skin looks (fair through deep). Undertone is the hue underneath: warm (golden or peach), cool (pink or blue), or neutral. You need both right in foundation, or base can turn gray or orange.",
  },
  {
    question: "Which tools use camera-based face detection?",
    answer:
      "Face shape, eye shape, symmetry, and contour or blush maps use MediaPipe-style landmark detection on your photo. Budget calculators, routine generators, and shade finders run on your quiz answers instead.",
  },
  {
    question: "I'm a beginner. Where should I start?",
    answer:
      "Try the undertone test and foundation shade finder, then the everyday makeup finder or natural look guide. Build a short routine with the product checklist before you dive into glam or bridal tools.",
  },
  {
    question: "How often should I update my makeup for seasonal changes?",
    answer:
      "Re-check foundation when you notice a mismatch after sun or winter paleness. Eyeshadow and lip picks can shift with your wardrobe. Undertone usually stays the same year to year.",
  },
  {
    question: "What is face makeup?",
    answer:
      "Face makeup is everything that evens and shapes the canvas: primer, foundation or tinted moisturizer, concealer, powder, bronzer, contour, blush, and highlighter. Eyes and lips sit on top of that base. Good face makeup matches your undertone and follows your bone structure instead of covering every freckle.",
  },
  {
    question: "What are some good face makeup products?",
    answer:
      "Start with a moisturizer and SPF, then pick a sheer-to-medium base (tinted moisturizer, skin tint, or foundation), a creamy concealer for spots, translucent or finishing powder where you get shiny, cream or powder blush, and a soft bronzer. Add primer only if you need grip or oil control. Match shades in daylight and patch-test new formulas.",
  },
  {
    question: "What are the 7 steps of a basic makeup routine?",
    answer:
      "1) Skincare and SPF. 2) Primer if you use it. 3) Foundation or skin tint. 4) Concealer on spots and under-eyes. 5) Set with light powder where needed. 6) Brows, blush, and a touch of bronzer or highlight. 7) Eyes (mascara or soft shadow) and lips last so you can balance intensity. Skip steps on low-energy days.",
  },
  {
    question: "What are the 20 types of makeup?",
    answer:
      "Common product types include: primer, foundation, concealer, color corrector, setting powder, setting spray, bronzer, contour, blush, highlighter, brow pencil or gel, eyeshadow, eyeliner, mascara, false lashes, lip liner, lipstick, lip gloss, lip oil, and cream or powder multi-use sticks. Kits and palettes combine several of these in one compact.",
  },
  {
    question: "How does Gen Z do makeup?",
    answer:
      "Gen Z leans into skin-first looks: glass skin or soft matte, fluffy brows, soft blush higher on the cheek, lip oils and stains, and “clean girl” or “no-makeup makeup.” Bold moments still show up—graphic liner, blush-heavy flush, and statement lips—but everyday looks often prioritize texture and skincare over full glam coverage.",
  },
  {
    question: "What are the top 5 cosmetic brands?",
    answer:
      "Lists change by year and region, but shoppers and market roundups often highlight L’Oréal (and its portfolio), Estée Lauder Companies brands, Maybelline, e.l.f. Cosmetics, and Fenty Beauty for range, shade diversity, or value. “Top” depends on whether you care about drugstore price, luxury finish, or clean formulas—try what matches your skin and budget.",
  },
  {
    question: "What is the No. 1 beauty brand?",
    answer:
      "By global beauty revenue, L’Oréal Group is frequently ranked the world’s largest beauty company. That does not mean one lipstick or foundation is best for everyone. The “number one” product for you is the shade and formula that match your undertone, skin type, and how long you need wear to last.",
  },
  {
    question: "Which makeup is best for daily use?",
    answer:
      "Lightweight base (skin tint or sheer foundation), cream blush, brow gel, mascara, and a lip tint or balm. Skip heavy contour and full-coverage layers unless you want them. Focus on even skin and one feature so the look holds through work, school, or errands without constant touch-ups.",
  },
  {
    question: "Which makeup brand is good and cheap?",
    answer:
      "Drugstore lines like e.l.f., Maybelline, NYX, Wet n Wild, and Essence often deliver strong everyday performance for less. Spend a bit more on foundation shade match and mascara if those matter most to you; save on trend shades and one-off glitter. Always check return policies and patch-test.",
  },
  {
    question: "What makeup should I apply first?",
    answer:
      "After skincare (and SPF in the daytime), apply primer if you use it, then foundation or tinted moisturizer, then concealer. Powder only where you need it. Next come brows and cheeks, then eyes, then lips. Applying lips last keeps the rest of the face balanced and avoids smudging when you blend eyes.",
  },
  {
    question: "How to apply foundation on face?",
    answer:
      "Dot a small amount on the center of the face—cheeks, forehead, chin—and blend outward with a damp sponge, brush, or clean fingers. Build thin layers only where you need coverage. Check the jawline in natural light so the neck matches. Set oily zones lightly; leave dry areas more dewy.",
  },
  {
    question: "How do I do my makeup every day?",
    answer:
      "Keep a 5–10 minute kit: moisturizer, sheer base, concealer for one or two spots, brows, cream blush, mascara, and lip balm or tint. Use the same order each morning so it becomes muscle memory. Save full eyeshadow and contour for nights out. Our analyze flow can suggest a short routine for your features.",
  },
  {
    question: "How to apply makeup for a natural look?",
    answer:
      "Use sheer coverage, match your real skin depth, soft brown or clear brow gel, blush that looks like a real flush, brown mascara or one coat of black, and a lip color close to your natural lip. Skip harsh contour lines. Blend edges until you cannot see where product starts.",
  },
  {
    question: "What is the most attractive makeup look?",
    answer:
      "Attraction is personal and cultural. Looks that tend to read polished on camera and in person are healthy-looking skin, defined but soft brows, a touch of color on cheeks, and balanced lips—not one trend for everyone. The most flattering look for you follows your features; try our face analysis for placement that fits your shape.",
  },
  {
    question: "What makeup lasts the longest?",
    answer:
      "Long-wear liquid foundations, waterproof mascara, stain-style blush and lip tints, and cream-to-powder formulas usually outlast sheer balms and glosses. Prep skin, set strategic zones with powder, and finish with setting spray. Longevity also depends on climate, oiliness, and whether you touch your face.",
  },
  {
    question: "Does Gen Z wear red lipstick?",
    answer:
      "Yes—red lips still appear in Gen Z looks, often with softer skin and brows so the mouth is the focus, or as a sheer cherry stain instead of opaque classic red. Trends cycle; lip oils and MLBB shades are common day-to-day, while bold red shows up for nights, photos, and fashion moments.",
  },
  {
    question: "How to look 10x prettier?",
    answer:
      "Sleep, hydration, SPF, and a hairstyle that frames your face do more than any single product. For makeup, even the skin lightly, groom brows, add blush for life, curl lashes, and pick one feature to emphasize. Confidence and a smile change how makeup reads—technique just supports what is already there.",
  },
  {
    question: "Should a 14 year old do makeup?",
    answer:
      "That is a family decision. Many teens start with skincare, SPF, tinted balm, clear brow gel, or light mascara. Keep products non-comedogenic when possible, remove makeup before bed, and skip pressure to look like influencers. Parents or guardians should guide shade choices and screen for allergies. Makeup can be creative play, not a requirement.",
  },
];
