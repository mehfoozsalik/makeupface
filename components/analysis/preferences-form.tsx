"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import type {
  BudgetPreference,
  ExperienceLevel,
  MakeupStyle,
  Occasion,
  Undertone,
  UserPreferences,
} from "@/types/makeup";
import { cn } from "@/lib/utils/cn";

const preferencesSchema = z.object({
  experience: z.enum(["beginner", "intermediate", "advanced"]),
  style: z.enum([
    "natural",
    "everyday",
    "soft_glam",
    "full_glam",
    "bridal",
    "party",
    "professional",
    "korean",
    "clean_girl",
    "minimalist",
  ]),
  occasion: z.enum([
    "daily",
    "office",
    "wedding",
    "party",
    "date_night",
    "special_event",
  ]),
  additional: z
    .array(
      z.enum(["minimal", "full", "affordable", "luxury", "no_makeup"])
    )
    .min(1, "Pick at least one preference"),
  undertone: z.enum(["warm", "cool", "neutral", "unsure"]),
});

type FormValues = z.infer<typeof preferencesSchema>;

const EXPERIENCE: { value: ExperienceLevel; label: string }[] = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

const STYLES: { value: MakeupStyle; label: string }[] = [
  { value: "natural", label: "Natural" },
  { value: "everyday", label: "Everyday" },
  { value: "soft_glam", label: "Soft glam" },
  { value: "full_glam", label: "Full glam" },
  { value: "clean_girl", label: "Clean girl" },
  { value: "minimalist", label: "Minimalist" },
  { value: "korean", label: "K-beauty" },
  { value: "professional", label: "Professional" },
  { value: "bridal", label: "Bridal" },
  { value: "party", label: "Party" },
];

const OCCASIONS: { value: Occasion; label: string }[] = [
  { value: "daily", label: "Daily" },
  { value: "office", label: "Office" },
  { value: "date_night", label: "Date night" },
  { value: "party", label: "Party" },
  { value: "wedding", label: "Wedding" },
  { value: "special_event", label: "Special event" },
];

const BUDGET: { value: BudgetPreference; label: string }[] = [
  { value: "affordable", label: "Budget-friendly" },
  { value: "luxury", label: "Luxury picks" },
  { value: "minimal", label: "Minimal kit" },
  { value: "full", label: "Full kit" },
  { value: "no_makeup", label: "Skincare-first" },
];

const UNDERTONES: { value: Undertone; label: string }[] = [
  { value: "warm", label: "Warm" },
  { value: "cool", label: "Cool" },
  { value: "neutral", label: "Neutral" },
  { value: "unsure", label: "Not sure" },
];

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-sm font-medium text-[var(--foreground)]">
      {children}
    </span>
  );
}

function Chip({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "border px-3 py-2 text-sm transition-[border-color,background-color,color,transform,opacity] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]",
        selected
          ? "border-[var(--dusty-rose)] bg-[var(--dusty-rose)]/10 text-[var(--foreground)]"
          : "border-[var(--border)] bg-[var(--white)] text-[var(--foreground-muted)] hover:border-[var(--dusty-rose)]/50"
      )}
    >
      {children}
    </button>
  );
}

export function PreferencesForm({
  defaultValues,
  onSubmit,
  isSubmitting,
}: {
  defaultValues: UserPreferences;
  onSubmit: (values: UserPreferences) => void;
  isSubmitting?: boolean;
}) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(preferencesSchema),
    defaultValues,
  });

  const additional = watch("additional") ?? [];

  const toggleBudget = (value: BudgetPreference) => {
    const next = additional.includes(value)
      ? additional.filter((v) => v !== value)
      : [...additional, value];
    setValue("additional", next.length ? next : [value], {
      shouldValidate: true,
    });
  };

  return (
    <form
      onSubmit={handleSubmit((v) => onSubmit(v))}
      className="space-y-8"
    >
      <fieldset className="space-y-3">
        <FieldLabel>Experience level</FieldLabel>
        <div className="flex flex-wrap gap-2">
          {EXPERIENCE.map((opt) => (
            <label key={opt.value} className="cursor-pointer">
              <input
                type="radio"
                className="sr-only"
                value={opt.value}
                {...register("experience")}
              />
              <Chip selected={watch("experience") === opt.value} onClick={() => setValue("experience", opt.value)}>
                {opt.label}
              </Chip>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="space-y-3">
        <FieldLabel>Makeup style</FieldLabel>
        <div className="flex flex-wrap gap-2">
          {STYLES.map((opt) => (
            <label key={opt.value} className="cursor-pointer">
              <input
                type="radio"
                className="sr-only"
                value={opt.value}
                {...register("style")}
              />
              <Chip selected={watch("style") === opt.value} onClick={() => setValue("style", opt.value)}>
                {opt.label}
              </Chip>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="space-y-3">
        <FieldLabel>Occasion</FieldLabel>
        <div className="flex flex-wrap gap-2">
          {OCCASIONS.map((opt) => (
            <label key={opt.value} className="cursor-pointer">
              <input
                type="radio"
                className="sr-only"
                value={opt.value}
                {...register("occasion")}
              />
              <Chip selected={watch("occasion") === opt.value} onClick={() => setValue("occasion", opt.value)}>
                {opt.label}
              </Chip>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="space-y-3">
        <FieldLabel>Additional preferences</FieldLabel>
        <div className="flex flex-wrap gap-2">
          {BUDGET.map((opt) => (
            <Chip
              key={opt.value}
              selected={additional.includes(opt.value)}
              onClick={() => toggleBudget(opt.value)}
            >
              {opt.label}
            </Chip>
          ))}
        </div>
        {errors.additional && (
          <p className="text-sm text-[var(--destructive)]">
            {errors.additional.message}
          </p>
        )}
      </fieldset>

      <fieldset className="space-y-3">
        <FieldLabel>Skin undertone</FieldLabel>
        <div className="flex flex-wrap gap-2">
          {UNDERTONES.map((opt) => (
            <label key={opt.value} className="cursor-pointer">
              <input
                type="radio"
                className="sr-only"
                value={opt.value}
                {...register("undertone")}
              />
              <Chip selected={watch("undertone") === opt.value} onClick={() => setValue("undertone", opt.value)}>
                {opt.label}
              </Chip>
            </label>
          ))}
        </div>
      </fieldset>

      <Button type="submit" size="lg" disabled={isSubmitting}>
        {isSubmitting ? "Generating…" : "Get my recommendations"}
      </Button>
    </form>
  );
}
