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
];
