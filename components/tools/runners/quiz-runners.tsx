"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { ResultPanel } from "@/components/tools/classification-card";
import {
  EYEBROW_BY_SHAPE,
  EYELINER_BY_EYE_SHAPE,
  LIP_LINER_BY_SHAPE,
} from "@/lib/tools/placement-advice";
import {
  STEP_MINUTES,
  buildProductChecklist,
  buildRoutine,
  computeBudget,
  everydayLook,
  foundationGuidance,
  lipstickFamilies,
  scoreMakeupStyle,
  scoreUndertone,
  weddingRecommendations,
  type Undertone,
} from "@/lib/tools/quiz-logic";
import type { EyeShape, EyebrowShape, LipShape } from "@/types/face-analysis";
import { cn } from "@/lib/utils/cn";

function QuizShell({
  title,
  children,
  onReset,
  showReset,
}: {
  title: string;
  children: React.ReactNode;
  onReset: () => void;
  showReset: boolean;
}) {
  return (
    <div className="space-y-6">
      <div className="border border-[var(--border)] bg-[var(--white)] p-4 sm:p-5">
        <h3 className="font-serif text-lg text-[var(--foreground)]">{title}</h3>
      </div>
      {children}
      {showReset && (
        <Button type="button" variant="secondary" onClick={onReset}>
          Reset
        </Button>
      )}
    </div>
  );
}

function OptionGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T | null;
  onChange: (v: T) => void;
}) {
  return (
    <fieldset className="space-y-2">
      <legend className="text-sm font-medium text-[var(--foreground)]">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            className={cn(
              "border px-3 py-2 text-sm transition-[border-color,background-color,opacity] duration-150",
              value === o.value
                ? "border-[var(--dusty-rose)] bg-[var(--dusty-rose)]/10 text-[var(--foreground)]"
                : "border-[var(--border)] text-[var(--foreground-muted)] hover:border-[var(--dusty-rose)]/40"
            )}
          >
            {o.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export function SkinUndertoneTestRunner() {
  const [veins, setVeins] = useState<"green" | "blue" | "mixed" | null>(null);
  const [jewelry, setJewelry] = useState<"gold" | "silver" | "both" | null>(null);
  const [sun, setSun] = useState<"tan_easy" | "burn" | "both" | null>(null);

  const result = useMemo(() => {
    if (!veins || !jewelry || !sun) return null;
    return scoreUndertone({ veins, jewelry, sun });
  }, [veins, jewelry, sun]);

  const reset = () => {
    setVeins(null);
    setJewelry(null);
    setSun(null);
  };

  return (
    <QuizShell title="Answer three quick questions" onReset={reset} showReset={!!result}>
      <div className="space-y-6 border border-[var(--border)] bg-[var(--background-secondary)] p-5">
        <OptionGroup
          label="Wrist veins in natural light look mostly…"
          value={veins}
          onChange={setVeins}
          options={[
            { value: "green", label: "Green / olive" },
            { value: "blue", label: "Blue / purple" },
            { value: "mixed", label: "Hard to tell" },
          ]}
        />
        <OptionGroup
          label="Which jewelry flatters your skin more?"
          value={jewelry}
          onChange={setJewelry}
          options={[
            { value: "gold", label: "Gold" },
            { value: "silver", label: "Silver" },
            { value: "both", label: "Both equally" },
          ]}
        />
        <OptionGroup
          label="In sun, you tend to…"
          value={sun}
          onChange={setSun}
          options={[
            { value: "tan_easy", label: "Tan easily" },
            { value: "burn", label: "Burn first" },
            { value: "both", label: "A bit of both" },
          ]}
        />
      </div>
      {result && (
        <ResultPanel title="Your undertone">
          <p className="font-serif text-2xl capitalize text-[var(--dusty-rose)]">{result.undertone}</p>
          <p className="text-sm leading-relaxed text-[var(--foreground-muted)]">{result.explanation}</p>
        </ResultPanel>
      )}
    </QuizShell>
  );
}

export function FoundationShadeFinderRunner() {
  const [undertone, setUndertone] = useState<Undertone | null>(null);
  const [depth, setDepth] = useState<"fair" | "light" | "medium" | "tan" | "deep" | null>(null);

  const result = useMemo(() => {
    if (!undertone || !depth) return null;
    return foundationGuidance(undertone, depth);
  }, [undertone, depth]);

  const reset = () => {
    setUndertone(null);
    setDepth(null);
  };

  return (
    <QuizShell title="Undertone + depth" onReset={reset} showReset={!!result}>
      <div className="space-y-6 border border-[var(--border)] p-5">
        <OptionGroup
          label="Undertone (from quiz or self-knowledge)"
          value={undertone}
          onChange={setUndertone}
          options={[
            { value: "warm", label: "Warm" },
            { value: "cool", label: "Cool" },
            { value: "neutral", label: "Neutral" },
          ]}
        />
        <OptionGroup
          label="Skin depth"
          value={depth}
          onChange={setDepth}
          options={[
            { value: "fair", label: "Fair" },
            { value: "light", label: "Light" },
            { value: "medium", label: "Medium" },
            { value: "tan", label: "Tan" },
            { value: "deep", label: "Deep" },
          ]}
        />
        <p className="text-xs text-[var(--foreground-muted)]">
          No brand SKUs here. Use this to narrow families before swatching in store.{" "}
          <Link href="/tools/skin-undertone-test" className="text-[var(--dusty-rose)] hover:underline">
            Take undertone quiz
          </Link>
        </p>
      </div>
      {result && (
        <ResultPanel title="Shade range guidance">
          <ul className="list-disc space-y-2 pl-5 text-sm text-[var(--foreground-muted)]">
            {result.families.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-[var(--foreground-muted)]">
            {result.swatchTips.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </ResultPanel>
      )}
    </QuizShell>
  );
}

export function LipstickShadeFinderRunner() {
  const [undertone, setUndertone] = useState<Undertone | null>(null);
  const [occasion, setOccasion] = useState<"daily" | "work" | "evening" | "special" | null>(null);

  const families = useMemo(() => {
    if (!undertone || !occasion) return null;
    return lipstickFamilies(undertone, occasion);
  }, [undertone, occasion]);

  const reset = () => {
    setUndertone(null);
    setOccasion(null);
  };

  return (
    <QuizShell title="Undertone + occasion" onReset={reset} showReset={!!families}>
      <div className="space-y-6 border border-[var(--border)] p-5">
        <OptionGroup
          label="Undertone"
          value={undertone}
          onChange={setUndertone}
          options={[
            { value: "warm", label: "Warm" },
            { value: "cool", label: "Cool" },
            { value: "neutral", label: "Neutral" },
          ]}
        />
        <OptionGroup
          label="Occasion"
          value={occasion}
          onChange={setOccasion}
          options={[
            { value: "daily", label: "Daily" },
            { value: "work", label: "Work" },
            { value: "evening", label: "Evening" },
            { value: "special", label: "Special event" },
          ]}
        />
      </div>
      {families && (
        <ResultPanel title="Lipstick families to swatch">
          <ul className="list-disc space-y-2 pl-5 text-sm text-[var(--foreground-muted)]">
            {families.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </ResultPanel>
      )}
    </QuizShell>
  );
}

export function MakeupStyleFinderRunner() {
  const [vibe, setVibe] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [finish, setFinish] = useState<string | null>(null);

  const looks = useMemo(() => {
    if (!vibe || !time || !finish) return null;
    return scoreMakeupStyle({ vibe, time, finish });
  }, [vibe, time, finish]);

  const reset = () => {
    setVibe(null);
    setTime(null);
    setFinish(null);
  };

  return (
    <QuizShell title="Style quiz" onReset={reset} showReset={!!looks}>
      <div className="space-y-6 border border-[var(--border)] p-5">
        <OptionGroup
          label="Your vibe"
          value={vibe}
          onChange={setVibe}
          options={[
            { value: "minimal", label: "Minimal / natural" },
            { value: "glam", label: "Glam" },
            { value: "creative", label: "Creative / bold" },
          ]}
        />
        <OptionGroup
          label="Time you will spend"
          value={time}
          onChange={setTime}
          options={[
            { value: "under15", label: "Under 15 min" },
            { value: "mid", label: "15-30 min" },
            { value: "45plus", label: "45+ min" },
          ]}
        />
        <OptionGroup
          label="Skin finish preference"
          value={finish}
          onChange={setFinish}
          options={[
            { value: "dewy", label: "Dewy" },
            { value: "natural", label: "Natural satin" },
            { value: "matte", label: "Matte" },
          ]}
        />
      </div>
      {looks && (
        <ResultPanel title="Recommended looks">
          <ul className="space-y-3">
            {looks.map((l) => (
              <li key={l.slug} className="border border-[var(--border)] bg-[var(--white)] p-4">
                <Link
                  href={`/makeup-looks/${l.slug}`}
                  className="font-medium text-[var(--dusty-rose)] hover:underline"
                >
                  {l.title}
                </Link>
                <p className="mt-1 text-sm text-[var(--foreground-muted)]">{l.description.slice(0, 120)}…</p>
              </li>
            ))}
          </ul>
        </ResultPanel>
      )}
    </QuizShell>
  );
}

export function MakeupProductChecklistRunner() {
  const [level, setLevel] = useState<"beginner" | "intermediate" | "advanced" | null>(null);
  const [focus, setFocus] = useState<"base" | "eyes" | "full" | null>(null);
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const items = useMemo(() => {
    if (!level || !focus) return null;
    return buildProductChecklist(level, focus);
  }, [level, focus]);

  const reset = () => {
    setLevel(null);
    setFocus(null);
    setChecked(new Set());
  };

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <QuizShell title="Build your kit checklist" onReset={reset} showReset={!!items}>
      <div className="space-y-6 border border-[var(--border)] p-5">
        <OptionGroup
          label="Experience level"
          value={level}
          onChange={setLevel}
          options={[
            { value: "beginner", label: "Beginner" },
            { value: "intermediate", label: "Intermediate" },
            { value: "advanced", label: "Advanced" },
          ]}
        />
        <OptionGroup
          label="Focus"
          value={focus}
          onChange={setFocus}
          options={[
            { value: "base", label: "Base only" },
            { value: "eyes", label: "Eyes only" },
            { value: "full", label: "Full face" },
          ]}
        />
      </div>
      {items && (
        <ResultPanel title="Your checklist">
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item.id}>
                <label className="flex cursor-pointer items-start gap-3 border border-[var(--border)] bg-[var(--white)] p-3 text-sm">
                  <input
                    type="checkbox"
                    checked={checked.has(item.id)}
                    onChange={() => toggle(item.id)}
                    className="mt-0.5"
                  />
                  <span>
                    <span className="text-[var(--foreground)]">{item.label}</span>
                    <span className="ml-2 text-xs text-[var(--foreground-muted)]">
                      {item.category}
                      {item.essential ? " (essential)" : ""}
                    </span>
                  </span>
                </label>
              </li>
            ))}
          </ul>
          <p className="text-xs text-[var(--foreground-muted)]">
            {checked.size} of {items.length} checked
          </p>
        </ResultPanel>
      )}
    </QuizShell>
  );
}

export function MakeupRoutineGeneratorRunner() {
  const [period, setPeriod] = useState<"am" | "pm" | null>(null);
  const [minutes, setMinutes] = useState<number | null>(null);
  const [skin, setSkin] = useState<"dry" | "oily" | "combo" | "normal" | null>(null);
  const [coverage, setCoverage] = useState<"sheer" | "medium" | "full" | null>(null);

  const steps = useMemo(() => {
    if (period === null || minutes === null) return null;
    if (period === "pm") {
      return buildRoutine({
        period,
        minutes,
        skin: "normal",
        coverage: "sheer",
      });
    }
    if (!skin || !coverage) return null;
    return buildRoutine({ period, minutes, skin, coverage });
  }, [period, minutes, skin, coverage]);

  const reset = () => {
    setPeriod(null);
    setMinutes(null);
    setSkin(null);
    setCoverage(null);
  };

  return (
    <QuizShell title="Routine inputs" onReset={reset} showReset={!!steps}>
      <div className="space-y-6 border border-[var(--border)] p-5">
        <OptionGroup
          label="Routine"
          value={period}
          onChange={setPeriod}
          options={[
            { value: "am", label: "Morning makeup" },
            { value: "pm", label: "Evening skincare" },
          ]}
        />
        {period === "am" && (
          <>
            <OptionGroup
              label="Time budget (minutes)"
              value={minutes === null ? null : String(minutes) as "10" | "20" | "30" | "45"}
              onChange={(v) => setMinutes(Number(v))}
              options={[
                { value: "10", label: "10" },
                { value: "20", label: "20" },
                { value: "30", label: "30" },
                { value: "45", label: "45" },
              ]}
            />
            <OptionGroup
              label="Skin type"
              value={skin}
              onChange={setSkin}
              options={[
                { value: "dry", label: "Dry" },
                { value: "oily", label: "Oily" },
                { value: "combo", label: "Combination" },
                { value: "normal", label: "Normal" },
              ]}
            />
            <OptionGroup
              label="Coverage"
              value={coverage}
              onChange={setCoverage}
              options={[
                { value: "sheer", label: "Sheer" },
                { value: "medium", label: "Medium" },
                { value: "full", label: "Full" },
              ]}
            />
          </>
        )}
        {period === "pm" && (
          <OptionGroup
            label="Time budget (minutes)"
            value={minutes === null ? null : String(minutes) as "10" | "20" | "30"}
            onChange={(v) => setMinutes(Number(v))}
            options={[
              { value: "10", label: "10" },
              { value: "20", label: "20" },
              { value: "30", label: "30" },
            ]}
          />
        )}
      </div>
      {steps && (
        <ResultPanel title="Your ordered routine">
          <ol className="list-decimal space-y-2 pl-5 text-sm text-[var(--foreground-muted)]">
            {steps.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        </ResultPanel>
      )}
    </QuizShell>
  );
}

export function MakeupBudgetCalculatorRunner() {
  const [tier, setTier] = useState<"drugstore" | "mid" | "luxury" | null>(null);
  const [cats, setCats] = useState({ base: true, eyes: true, lips: true, tools: true });

  const result = useMemo(() => {
    if (!tier) return null;
    return computeBudget(tier, cats);
  }, [tier, cats]);

  const reset = () => {
    setTier(null);
    setCats({ base: true, eyes: true, lips: true, tools: true });
  };

  return (
    <QuizShell title="Budget planner" onReset={reset} showReset={!!result}>
      <div className="space-y-6 border border-[var(--border)] p-5">
        <OptionGroup
          label="Price tier (typical kit spend)"
          value={tier}
          onChange={setTier}
          options={[
            { value: "drugstore", label: "Drugstore" },
            { value: "mid", label: "Mid-range" },
            { value: "luxury", label: "Luxury" },
          ]}
        />
        <fieldset className="space-y-2">
          <legend className="text-sm font-medium text-[var(--foreground)]">Categories</legend>
          {(
            [
              ["base", "Base"],
              ["eyes", "Eyes"],
              ["lips", "Lips"],
              ["tools", "Tools"],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={cats[key]}
                onChange={(e) => setCats((c) => ({ ...c, [key]: e.target.checked }))}
              />
              {label}
            </label>
          ))}
        </fieldset>
      </div>
      {result && (
        <ResultPanel title="Estimated budget">
          <ul className="space-y-2 text-sm text-[var(--foreground-muted)]">
            {result.lines.map((l) => (
              <li key={l.label} className="flex justify-between gap-4 border-b border-[var(--border)] py-2">
                <span>{l.label}</span>
                <span className="font-medium text-[var(--foreground)]">${l.amount}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-serif text-2xl text-[var(--dusty-rose)]">Total ≈ ${result.total}</p>
          <p className="text-xs text-[var(--foreground-muted)]">
            Tier averages are estimates, not live prices. Adjust for your market.
          </p>
        </ResultPanel>
      )}
    </QuizShell>
  );
}

export function MakeupTimeCalculatorRunner() {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const total = useMemo(() => {
    let sum = 0;
    for (const key of selected) sum += STEP_MINUTES[key] ?? 0;
    return sum;
  }, [selected]);

  const toggle = (key: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const reset = () => setSelected(new Set());

  return (
    <QuizShell title="Select steps in your look" onReset={reset} showReset={selected.size > 0}>
      <div className="grid gap-2 sm:grid-cols-2">
        {Object.entries(STEP_MINUTES).map(([key, min]) => (
          <label
            key={key}
            className="flex cursor-pointer items-center justify-between border border-[var(--border)] bg-[var(--white)] p-3 text-sm capitalize"
          >
            <span className="flex items-center gap-2">
              <input type="checkbox" checked={selected.has(key)} onChange={() => toggle(key)} />
              {key.replace(/_/g, " ")}
            </span>
            <span className="text-[var(--foreground-muted)]">{min} min</span>
          </label>
        ))}
      </div>
      {selected.size > 0 && (
        <ResultPanel title="Estimated time">
          <p className="font-serif text-3xl text-[var(--dusty-rose)]">{total} minutes</p>
          <p className="text-sm text-[var(--foreground-muted)]">
            Add 5-10 minutes buffer for beginners or lash application.
          </p>
        </ResultPanel>
      )}
    </QuizShell>
  );
}

export function WeddingMakeupFinderRunner() {
  const [role, setRole] = useState<"bride" | "guest" | "party" | null>(null);
  const [venue, setVenue] = useState<"indoor" | "outdoor" | "mixed" | null>(null);
  const [photo, setPhoto] = useState<"natural" | "flash" | "video" | null>(null);
  const [lashes, setLashes] = useState<"none" | "individual" | "strip" | null>(null);

  const result = useMemo(() => {
    if (!role || !venue || !photo || !lashes) return null;
    return weddingRecommendations({ role, venue, photo, lashes });
  }, [role, venue, photo, lashes]);

  const reset = () => {
    setRole(null);
    setVenue(null);
    setPhoto(null);
    setLashes(null);
  };

  return (
    <QuizShell title="Wedding makeup quiz" onReset={reset} showReset={!!result}>
      <div className="space-y-6 border border-[var(--border)] p-5">
        <OptionGroup
          label="Your role"
          value={role}
          onChange={setRole}
          options={[
            { value: "bride", label: "Bride" },
            { value: "party", label: "Bridal party" },
            { value: "guest", label: "Guest" },
          ]}
        />
        <OptionGroup
          label="Venue"
          value={venue}
          onChange={setVenue}
          options={[
            { value: "indoor", label: "Indoor" },
            { value: "outdoor", label: "Outdoor" },
            { value: "mixed", label: "Mixed" },
          ]}
        />
        <OptionGroup
          label="Photography"
          value={photo}
          onChange={setPhoto}
          options={[
            { value: "natural", label: "Natural light" },
            { value: "flash", label: "Flash / reception" },
            { value: "video", label: "Video-heavy" },
          ]}
        />
        <OptionGroup
          label="Lashes"
          value={lashes}
          onChange={setLashes}
          options={[
            { value: "none", label: "None" },
            { value: "individual", label: "Individual" },
            { value: "strip", label: "Strip lashes" },
          ]}
        />
      </div>
      {result && (
        <ResultPanel title={result.title}>
          <ul className="list-disc space-y-2 pl-5 text-sm text-[var(--foreground-muted)]">
            {result.notes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
          <Link href="/makeup-looks/bridal-makeup" className="mt-4 inline-block text-sm text-[var(--dusty-rose)] hover:underline">
            See bridal makeup look →
          </Link>
        </ResultPanel>
      )}
    </QuizShell>
  );
}

export function EverydayMakeupFinderRunner() {
  const [dressCode, setDressCode] = useState<"casual" | "business" | "uniform" | null>(null);
  const [concerns, setConcerns] = useState<"redness" | "dark_circles" | "oil" | "dry" | null>(null);
  const [coverage, setCoverage] = useState<"minimal" | "medium" | null>(null);

  const result = useMemo(() => {
    if (!dressCode || !concerns || !coverage) return null;
    return everydayLook({ dressCode, concerns, coverage });
  }, [dressCode, concerns, coverage]);

  const reset = () => {
    setDressCode(null);
    setConcerns(null);
    setCoverage(null);
  };

  return (
    <QuizShell title="Everyday builder" onReset={reset} showReset={!!result}>
      <div className="space-y-6 border border-[var(--border)] p-5">
        <OptionGroup
          label="Dress code"
          value={dressCode}
          onChange={setDressCode}
          options={[
            { value: "casual", label: "Casual" },
            { value: "business", label: "Business" },
            { value: "uniform", label: "Uniform / strict" },
          ]}
        />
        <OptionGroup
          label="Main skin concern"
          value={concerns}
          onChange={setConcerns}
          options={[
            { value: "redness", label: "Redness" },
            { value: "dark_circles", label: "Dark circles" },
            { value: "oil", label: "Oil / shine" },
            { value: "dry", label: "Dry patches" },
          ]}
        />
        <OptionGroup
          label="Coverage"
          value={coverage}
          onChange={setCoverage}
          options={[
            { value: "minimal", label: "Minimal" },
            { value: "medium", label: "Medium" },
          ]}
        />
      </div>
      {result && (
        <ResultPanel title="Your everyday look">
          <p className="text-sm text-[var(--foreground-muted)]">{result.summary}</p>
          <ol className="mt-4 list-decimal space-y-1 pl-5 text-sm text-[var(--foreground-muted)]">
            {result.steps.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        </ResultPanel>
      )}
    </QuizShell>
  );
}

export function EyelinerStyleFinderRunner() {
  const [eye, setEye] = useState<EyeShape | null>(null);
  const [skill, setSkill] = useState<"beginner" | "intermediate" | "advanced" | null>(null);

  const advice = useMemo(() => {
    if (!eye || !skill) return null;
    const key = eye === "uncertain" ? "almond" : eye;
    const base = EYELINER_BY_EYE_SHAPE[key];
    return { ...base, eye: key, skill };
  }, [eye, skill]);

  const reset = () => {
    setEye(null);
    setSkill(null);
  };

  return (
    <QuizShell title="Eyeliner matcher" onReset={reset} showReset={!!advice}>
      <div className="space-y-6 border border-[var(--border)] p-5">
        <OptionGroup
          label="Eye shape (from detector or self)"
          value={eye}
          onChange={setEye}
          options={[
            { value: "almond", label: "Almond" },
            { value: "round", label: "Round" },
            { value: "hooded", label: "Hooded" },
            { value: "monolid", label: "Monolid" },
            { value: "upturned", label: "Upturned" },
            { value: "downturned", label: "Downturned" },
            { value: "uncertain", label: "Not sure" },
          ]}
        />
        <OptionGroup
          label="Skill level"
          value={skill}
          onChange={setSkill}
          options={[
            { value: "beginner", label: "Beginner" },
            { value: "intermediate", label: "Intermediate" },
            { value: "advanced", label: "Advanced" },
          ]}
        />
        <Link href="/tools/eye-shape-detector" className="text-xs text-[var(--dusty-rose)] hover:underline">
          Detect eye shape from a photo →
        </Link>
      </div>
      {advice && (
        <ResultPanel title="Recommended styles">
          {skill === "beginner" && (
            <p className="text-sm text-[var(--foreground)]">
              Start here: {advice.beginner}
            </p>
          )}
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[var(--foreground-muted)]">
            {advice.styles.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-[var(--foreground-muted)]">
            Avoid: {advice.avoid.join("; ")}
          </p>
        </ResultPanel>
      )}
    </QuizShell>
  );
}

export function EyebrowShapingGuideRunner() {
  const [brow, setBrow] = useState<EyebrowShape | null>(null);
  const [faceLen, setFaceLen] = useState<"short" | "average" | "long" | null>(null);
  const [skill, setSkill] = useState<"beginner" | "experienced" | null>(null);

  const advice = useMemo(() => {
    if (!brow || !faceLen || !skill) return null;
    const key = brow === "uncertain" ? "soft_arch" : brow;
    const base = EYEBROW_BY_SHAPE[key];
    const extra =
      faceLen === "long"
        ? "Favor straighter or softer arches to avoid adding vertical length."
        : faceLen === "short"
          ? "A gentle arch can open the eye area vertically."
          : "Follow natural bone structure for arch height.";
    const skillNote =
      skill === "beginner"
        ? "Trim only obvious long hairs; skip aggressive tweezing for 4-6 weeks while you map."
        : "Use mapping string or pencil: align start to nostril, arch to outer iris, tail to outer eye.";
    return { base, extra, skillNote, key };
  }, [brow, faceLen, skill]);

  const reset = () => {
    setBrow(null);
    setFaceLen(null);
    setSkill(null);
  };

  return (
    <QuizShell title="Brow shaping inputs" onReset={reset} showReset={!!advice}>
      <div className="space-y-6 border border-[var(--border)] p-5">
        <OptionGroup
          label="Brow shape"
          value={brow}
          onChange={setBrow}
          options={[
            { value: "straight", label: "Straight" },
            { value: "soft_arch", label: "Soft arch" },
            { value: "high_arch", label: "High arch" },
            { value: "rounded", label: "Rounded" },
            { value: "angled", label: "Angled" },
            { value: "uncertain", label: "Not sure" },
          ]}
        />
        <OptionGroup
          label="Face length (visual)"
          value={faceLen}
          onChange={setFaceLen}
          options={[
            { value: "short", label: "Shorter / round" },
            { value: "average", label: "Average" },
            { value: "long", label: "Long / oblong" },
          ]}
        />
        <OptionGroup
          label="Grooming experience"
          value={skill}
          onChange={setSkill}
          options={[
            { value: "beginner", label: "Beginner" },
            { value: "experienced", label: "Experienced" },
          ]}
        />
        <Link href="/tools/eyebrow-shape-detector" className="text-xs text-[var(--dusty-rose)] hover:underline">
          Detect brow shape from photo →
        </Link>
      </div>
      {advice && (
        <ResultPanel title={advice.base.title}>
          <p className="text-sm text-[var(--foreground-muted)]">{advice.base.technique}</p>
          <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-[var(--foreground-muted)]">
            {advice.base.steps.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
          <p className="mt-3 text-sm text-[var(--foreground-muted)]">{advice.extra}</p>
          <p className="mt-2 text-sm text-[var(--foreground-muted)]">{advice.skillNote}</p>
        </ResultPanel>
      )}
    </QuizShell>
  );
}

export function LipLinerGuideRunner() {
  const [lip, setLip] = useState<LipShape | null>(null);
  const [finish, setFinish] = useState<"matte" | "gloss" | null>(null);

  const advice = useMemo(() => {
    if (!lip || !finish) return null;
    const key = lip === "uncertain" ? "balanced" : lip;
    const base = LIP_LINER_BY_SHAPE[key];
    const finishTip =
      finish === "matte"
        ? "Fill entire lip with liner before matte lipstick to reduce feathering."
        : "Use liner only on border; gloss on center for dimension.";
    return { base, finishTip, key };
  }, [lip, finish]);

  const reset = () => {
    setLip(null);
    setFinish(null);
  };

  return (
    <QuizShell title="Lip liner workflow" onReset={reset} showReset={!!advice}>
      <div className="space-y-6 border border-[var(--border)] p-5">
        <OptionGroup
          label="Lip shape"
          value={lip}
          onChange={setLip}
          options={[
            { value: "full", label: "Full" },
            { value: "thin", label: "Thin" },
            { value: "wide", label: "Wide" },
            { value: "heart", label: "Heart / strong bow" },
            { value: "balanced", label: "Balanced" },
            { value: "uncertain", label: "Not sure" },
          ]}
        />
        <OptionGroup
          label="Desired finish"
          value={finish}
          onChange={setFinish}
          options={[
            { value: "matte", label: "Matte / long-wear" },
            { value: "gloss", label: "Glossy / balm" },
          ]}
        />
        <Link href="/tools/lip-shape-detector" className="text-xs text-[var(--dusty-rose)] hover:underline">
          Analyze lip shape from photo →
        </Link>
      </div>
      {advice && (
        <ResultPanel title={advice.base.title}>
          <p className="text-sm text-[var(--foreground-muted)]">{advice.base.technique}</p>
          <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-[var(--foreground-muted)]">
            {advice.base.steps.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
          <p className="mt-3 text-sm text-[var(--foreground-muted)]">{advice.finishTip}</p>
        </ResultPanel>
      )}
    </QuizShell>
  );
}
