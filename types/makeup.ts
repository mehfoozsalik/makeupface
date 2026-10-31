export type ExperienceLevel = "beginner" | "intermediate" | "advanced";

export type MakeupStyle =
  | "natural"
  | "everyday"
  | "soft_glam"
  | "full_glam"
  | "bridal"
  | "party"
  | "professional"
  | "korean"
  | "clean_girl"
  | "minimalist";

export type Occasion =
  | "daily"
  | "office"
  | "wedding"
  | "party"
  | "date_night"
  | "special_event";

export type BudgetPreference = "minimal" | "full" | "affordable" | "luxury" | "no_makeup";

export type Undertone = "warm" | "cool" | "neutral" | "unsure";

export interface UserPreferences {
  experience: ExperienceLevel;
  style: MakeupStyle;
  occasion: Occasion;
  additional: BudgetPreference[];
  undertone: Undertone;
}

export interface MakeupLook {
  slug: string;
  title: string;
  description: string;
  occasions: string[];
  intensity: "sheer" | "medium" | "bold";
  styleTags: string[];
  products: string[];
  steps: { title: string; instruction: string }[];
  faceShapeNotes: string;
  eyeShapeNotes: string;
  relatedSlugs: string[];
  relatedTools: string[];
  seoTitle: string;
  seoDescription: string;
}
