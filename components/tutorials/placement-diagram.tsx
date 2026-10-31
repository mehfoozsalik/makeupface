"use client";

import { useMemo, useState } from "react";
import type { FaceShape } from "@/types/face-analysis";
import { cn } from "@/lib/utils/cn";

export type PlacementType =
  | "contour"
  | "blush"
  | "highlight"
  | "eyes"
  | "lips";

const TYPE_LABELS: Record<PlacementType, string> = {
  contour: "Contour",
  blush: "Blush",
  highlight: "Highlight",
  eyes: "Eyes",
  lips: "Lips",
};

const TYPE_HINTS: Record<PlacementType, string> = {
  contour: "Sculpt hollows, temples, jaw & nose sides",
  blush: "Lift color on the upper cheeks",
  highlight: "Catch light on high points",
  eyes: "Lid, crease & outer corner",
  lips: "Liner edge then fill the lips",
};

/** Face outline path tuned per shape (viewBox 0 0 320 400). */
function faceOutline(shape: FaceShape | undefined): string {
  switch (shape) {
    case "round":
      return "M160 48 C232 48 268 118 268 200 C268 292 232 358 160 358 C88 358 52 292 52 200 C52 118 88 48 160 48Z";
    case "square":
      return "M92 62 C132 42 188 42 228 62 L248 110 C258 160 258 240 248 290 L228 348 C188 368 132 368 92 348 L72 290 C62 240 62 160 72 110Z";
    case "heart":
      return "M160 52 C230 52 270 110 268 168 C266 230 240 290 200 330 C180 348 140 348 120 330 C80 290 54 230 52 168 C50 110 90 52 160 52Z";
    case "diamond":
      return "M160 48 C200 48 230 90 248 140 C268 190 268 230 248 280 C230 330 200 358 160 358 C120 358 90 330 72 280 C52 230 52 190 72 140 C90 90 120 48 160 48Z";
    case "oblong":
      return "M160 36 C218 36 248 90 250 160 C252 240 248 320 220 360 C200 378 120 378 100 360 C72 320 68 240 70 160 C72 90 102 36 160 36Z";
    default:
      // oval
      return "M160 44 C228 44 262 108 262 190 C262 286 228 360 160 360 C92 360 58 286 58 190 C58 108 92 44 160 44Z";
  }
}

interface ZoneSpec {
  id: string;
  type: PlacementType;
  d: string;
  label: string;
  /** Label anchor inside the diagram */
  lx: number;
  ly: number;
}

function zonesForShape(shape: FaceShape | undefined): ZoneSpec[] {
  const cheekY = shape === "oblong" ? 228 : 220;
  const jawY = shape === "heart" ? 318 : shape === "oblong" ? 330 : 310;
  const hollowSpread = shape === "round" || shape === "square" ? 8 : 0;

  return [
    // Contour - temples
    {
      id: "c-temple-l",
      type: "contour",
      label: "Temples",
      lx: 78,
      ly: 118,
      d: "M78 88 C92 78 108 92 104 112 C100 128 86 132 74 120 C68 108 70 96 78 88Z",
    },
    {
      id: "c-temple-r",
      type: "contour",
      label: "Temples",
      lx: 242,
      ly: 118,
      d: "M242 88 C228 78 212 92 216 112 C220 128 234 132 246 120 C252 108 250 96 242 88Z",
    },
    // Contour - cheek hollows
    {
      id: "c-hollow-l",
      type: "contour",
      label: "Cheek hollows",
      lx: 86,
      ly: cheekY + 10,
      d: `M${70 + hollowSpread} 198 C${88 + hollowSpread} 188 ${108 + hollowSpread} 198 ${112 + hollowSpread} 222 C${108 + hollowSpread} 248 ${90 + hollowSpread} 258 ${74 + hollowSpread} 246 C${62 + hollowSpread} 230 ${60 + hollowSpread} 210 ${70 + hollowSpread} 198Z`,
    },
    {
      id: "c-hollow-r",
      type: "contour",
      label: "Cheek hollows",
      lx: 234,
      ly: cheekY + 10,
      d: `M${250 - hollowSpread} 198 C${232 - hollowSpread} 188 ${212 - hollowSpread} 198 ${208 - hollowSpread} 222 C${212 - hollowSpread} 248 ${230 - hollowSpread} 258 ${246 - hollowSpread} 246 C${258 - hollowSpread} 230 ${260 - hollowSpread} 210 ${250 - hollowSpread} 198Z`,
    },
    // Contour - jaw
    {
      id: "c-jaw",
      type: "contour",
      label: "Jawline",
      lx: 160,
      ly: jawY + 8,
      d: `M96 ${jawY - 18} C120 ${jawY + 8} 200 ${jawY + 8} 224 ${jawY - 18} C228 ${jawY + 6} 200 ${jawY + 28} 160 ${jawY + 30} C120 ${jawY + 28} 92 ${jawY + 6} 96 ${jawY - 18}Z`,
    },
    // Contour - nose sides
    {
      id: "c-nose",
      type: "contour",
      label: "Nose sides",
      lx: 160,
      ly: 210,
      d: "M148 168 C146 190 146 214 150 232 C152 236 156 234 156 228 C154 210 154 190 156 172Z M172 168 C174 190 174 214 170 232 C168 236 164 234 164 228 C166 210 166 190 164 172Z",
    },
    // Blush
    {
      id: "b-l",
      type: "blush",
      label: "Upper cheeks",
      lx: 100,
      ly: cheekY - 8,
      d: `M88 ${cheekY - 28} C108 ${cheekY - 36} 128 ${cheekY - 24} 130 ${cheekY - 4} C128 ${cheekY + 16} 108 ${cheekY + 22} 92 ${cheekY + 12} C78 ${cheekY} 76 ${cheekY - 16} 88 ${cheekY - 28}Z`,
    },
    {
      id: "b-r",
      type: "blush",
      label: "Upper cheeks",
      lx: 220,
      ly: cheekY - 8,
      d: `M232 ${cheekY - 28} C212 ${cheekY - 36} 192 ${cheekY - 24} 190 ${cheekY - 4} C192 ${cheekY + 16} 212 ${cheekY + 22} 228 ${cheekY + 12} C242 ${cheekY} 244 ${cheekY - 16} 232 ${cheekY - 28}Z`,
    },
    // Highlight
    {
      id: "h-cheek-l",
      type: "highlight",
      label: "Cheekbones",
      lx: 112,
      ly: 198,
      d: "M96 186 C112 178 128 184 132 196 C128 208 112 212 98 204 C90 196 90 190 96 186Z",
    },
    {
      id: "h-cheek-r",
      type: "highlight",
      label: "Cheekbones",
      lx: 208,
      ly: 198,
      d: "M224 186 C208 178 192 184 188 196 C192 208 208 212 222 204 C230 196 230 190 224 186Z",
    },
    {
      id: "h-nose",
      type: "highlight",
      label: "Nose bridge",
      lx: 176,
      ly: 188,
      d: "M156 150 C158 170 158 200 158 228 C159 232 161 232 162 228 C162 200 162 170 164 150 C162 146 158 146 156 150Z",
    },
    {
      id: "h-brow-l",
      type: "highlight",
      label: "Brow bone",
      lx: 112,
      ly: 148,
      d: "M92 142 C108 136 124 140 128 148 C122 154 108 156 94 150Z",
    },
    {
      id: "h-brow-r",
      type: "highlight",
      label: "Brow bone",
      lx: 208,
      ly: 148,
      d: "M228 142 C212 136 196 140 192 148 C198 154 212 156 226 150Z",
    },
    {
      id: "h-cupid",
      type: "highlight",
      label: "Cupid's bow",
      lx: 160,
      ly: 268,
      d: "M148 272 C154 266 166 266 172 272 C166 276 154 276 148 272Z",
    },
    {
      id: "h-chin",
      type: "highlight",
      label: "Chin tip",
      lx: 160,
      ly: 338,
      d: "M148 332 C154 326 166 326 172 332 C166 340 154 340 148 332Z",
    },
    // Eyes
    {
      id: "e-lid-l",
      type: "eyes",
      label: "Lid",
      lx: 112,
      ly: 168,
      d: "M84 162 C100 152 124 152 138 162 C124 172 100 172 84 162Z",
    },
    {
      id: "e-lid-r",
      type: "eyes",
      label: "Lid",
      lx: 208,
      ly: 168,
      d: "M236 162 C220 152 196 152 182 162 C196 172 220 172 236 162Z",
    },
    {
      id: "e-crease-l",
      type: "eyes",
      label: "Crease",
      lx: 112,
      ly: 154,
      d: "M86 156 C102 148 124 148 136 156 C124 150 102 150 86 156Z",
    },
    {
      id: "e-crease-r",
      type: "eyes",
      label: "Crease",
      lx: 208,
      ly: 154,
      d: "M234 156 C218 148 196 148 184 156 C196 150 218 150 234 156Z",
    },
    {
      id: "e-outer-l",
      type: "eyes",
      label: "Outer corner",
      lx: 78,
      ly: 168,
      d: "M78 158 C86 156 90 164 88 170 C84 174 76 168 78 158Z",
    },
    {
      id: "e-outer-r",
      type: "eyes",
      label: "Outer corner",
      lx: 242,
      ly: 168,
      d: "M242 158 C234 156 230 164 232 170 C236 174 244 168 242 158Z",
    },
    // Lips
    {
      id: "lips",
      type: "lips",
      label: "Lips",
      lx: 160,
      ly: 292,
      d: "M118 286 C136 276 152 274 160 278 C168 274 184 276 202 286 C188 298 172 306 160 306 C148 306 132 298 118 286Z",
    },
  ];
}

const FILL: Record<PlacementType, string> = {
  contour: "#8B6B5A",
  blush: "#C9878D",
  highlight: "#E8D4A8",
  eyes: "#6B5E78",
  lips: "#C9878D",
};

const STEPS: Record<PlacementType, string[]> = {
  contour: [
    "Sweep under cheekbones toward ears",
    "Softly shade temples & hairline edges",
    "Define jaw in short strokes",
    "Optional: thin lines along nose sides",
  ],
  blush: [
    "Smile lightly to find the upper apples",
    "Place color on the top of the cheek",
    "Blend upward toward the temple",
    "Keep product above the hollow contour",
  ],
  highlight: [
    "Tap tops of cheekbones",
    "Thin line down the nose bridge",
    "Dust brow bone under the arch",
    "Touch cupid's bow & chin tip",
  ],
  eyes: [
    "All-over lid in a light shade",
    "Deepen the crease with a soft matte",
    "Deepen the outer corner for shape",
    "Blend edges so no hard lines remain",
  ],
  lips: [
    "Line the natural lip border",
    "Optional: soft overline only at center",
    "Fill with lipstick or gloss",
    "Blot and reapply for longevity",
  ],
};

function FaceBase({ outline }: { outline: string }) {
  return (
    <g aria-hidden>
      {/* Soft backdrop */}
      <rect width="320" height="400" fill="#FAF8F5" />

      {/* Neck */}
      <path
        d="M128 348 C132 372 148 392 160 396 C172 392 188 372 192 348"
        fill="#E2CDB8"
        stroke="#D4B89E"
        strokeWidth="1"
      />

      {/* Face skin */}
      <path d={outline} fill="#E8D5C4" stroke="#D4B89E" strokeWidth="1.5" />

      {/* Subtle cheek warmth (always on, under zones) */}
      <ellipse cx="108" cy="230" rx="28" ry="16" fill="#E5B8B4" opacity="0.25" />
      <ellipse cx="212" cy="230" rx="28" ry="16" fill="#E5B8B4" opacity="0.25" />

      {/* Hair - soft top silhouette */}
      <path
        d="M78 120 C72 70 110 36 160 34 C210 36 248 70 242 120 C236 88 210 58 160 56 C110 58 84 88 78 120Z"
        fill="#4A3728"
        opacity="0.92"
      />
      <path
        d="M70 140 C64 100 90 58 130 48 C118 78 96 110 88 150Z"
        fill="#4A3728"
        opacity="0.88"
      />
      <path
        d="M250 140 C256 100 230 58 190 48 C202 78 224 110 232 150Z"
        fill="#4A3728"
        opacity="0.88"
      />

      {/* Brows */}
      <path
        d="M86 148 C104 138 128 140 140 150"
        fill="none"
        stroke="#3D2B1F"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M234 148 C216 138 192 140 180 150"
        fill="none"
        stroke="#3D2B1F"
        strokeWidth="3.2"
        strokeLinecap="round"
      />

      {/* Eyes */}
      <ellipse cx="112" cy="168" rx="26" ry="11" fill="#FFF" />
      <ellipse cx="208" cy="168" rx="26" ry="11" fill="#FFF" />
      <ellipse cx="114" cy="168" rx="9" ry="9" fill="#5C4033" />
      <ellipse cx="206" cy="168" rx="9" ry="9" fill="#5C4033" />
      <circle cx="116" cy="166" r="3" fill="#FAF8F5" />
      <circle cx="208" cy="166" r="3" fill="#FAF8F5" />
      {/* Upper lash line */}
      <path
        d="M86 164 C100 156 124 156 138 164"
        fill="none"
        stroke="#292522"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M234 164 C220 156 196 156 182 164"
        fill="none"
        stroke="#292522"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      {/* Nose */}
      <path
        d="M160 168 C156 198 152 218 148 232"
        fill="none"
        stroke="#C4A88A"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M160 168 C164 198 168 218 172 232"
        fill="none"
        stroke="#C4A88A"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M148 232 C154 240 166 240 172 232"
        fill="none"
        stroke="#C4A88A"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <ellipse cx="152" cy="234" rx="5" ry="3.5" fill="#D4B89E" opacity="0.7" />
      <ellipse cx="168" cy="234" rx="5" ry="3.5" fill="#D4B89E" opacity="0.7" />

      {/* Lips (base - zones overlay when active) */}
      <path
        d="M122 286 C138 276 152 274 160 278 C168 274 182 276 198 286 C186 300 172 308 160 308 C148 308 134 300 122 286Z"
        fill="#D4A09E"
        opacity="0.85"
      />
      <path
        d="M128 286 C144 282 156 280 160 282 C164 280 176 282 192 286"
        fill="none"
        stroke="#C9878D"
        strokeWidth="1"
        opacity="0.6"
      />

      {/* Soft center line guide */}
      <line
        x1="160"
        y1="70"
        x2="160"
        y2="350"
        stroke="#C9878D"
        strokeWidth="0.75"
        strokeDasharray="3 5"
        opacity="0.25"
      />
    </g>
  );
}

export function PlacementDiagram({
  faceShape,
  activeType,
  onTypeChange,
  className,
}: {
  faceShape?: FaceShape;
  activeType?: PlacementType;
  onTypeChange?: (type: PlacementType) => void;
  className?: string;
}) {
  const [internal, setInternal] = useState<PlacementType>("contour");
  const selected = activeType ?? internal;
  const zones = useMemo(() => zonesForShape(faceShape), [faceShape]);
  const outline = useMemo(() => faceOutline(faceShape), [faceShape]);

  const pick = (t: PlacementType) => {
    setInternal(t);
    onTypeChange?.(t);
  };

  const activeZones = zones.filter((z) => z.type === selected);
  const labelPoints = useMemo(() => {
    const seen = new Set<string>();
    return activeZones.filter((z) => {
      if (seen.has(z.label)) return false;
      seen.add(z.label);
      return true;
    });
  }, [activeZones]);

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Placement product">
        {(Object.keys(TYPE_LABELS) as PlacementType[]).map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={selected === t}
            onClick={() => pick(t)}
            className={cn(
              "border px-3 py-1.5 text-xs font-medium transition-[border-color,background-color,color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]",
              selected === t
                ? "border-[var(--dusty-rose)] bg-[var(--dusty-rose)] text-white"
                : "border-[var(--border)] text-[var(--foreground-muted)] hover:border-[var(--dusty-rose)]/50"
            )}
          >
            {TYPE_LABELS[t]}
          </button>
        ))}
      </div>

      <div className="overflow-hidden border border-[var(--border)] bg-[var(--white)]">
        <svg
          viewBox="0 0 320 400"
          role="img"
          aria-label={`${TYPE_LABELS[selected]} placement on a ${faceShape ?? "oval"} face`}
          className="mx-auto block w-full max-w-[340px]"
        >
          <FaceBase outline={outline} />

          {/* Dim inactive product zones slightly when not selected */}
          {zones.map((z) => {
            const on = z.type === selected;
            return (
              <path
                key={z.id}
                d={z.d}
                fill={FILL[z.type]}
                fillOpacity={on ? 0.55 : 0}
                stroke={on ? FILL[z.type] : "transparent"}
                strokeWidth={on ? 1.25 : 0}
                strokeOpacity={on ? 0.9 : 0}
                className="transition-opacity duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]"
                style={{ opacity: on ? 1 : 0 }}
              />
            );
          })}

          {/* Callout dots + labels for active zones */}
          {labelPoints.map((z) => (
            <g key={`label-${z.id}`}>
              <circle
                cx={z.lx}
                cy={z.ly}
                r="4"
                fill="#FAF8F5"
                stroke={FILL[z.type]}
                strokeWidth="2"
              />
              <circle cx={z.lx} cy={z.ly} r="1.5" fill={FILL[z.type]} />
            </g>
          ))}
        </svg>

        {/* Color key under the face */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t border-[var(--border)] px-3 py-3">
          {labelPoints.map((z) => (
            <span
              key={z.label}
              className="inline-flex items-center gap-1.5 text-xs text-[var(--foreground)]"
            >
              <span
                className="size-2.5 shrink-0 rounded-full"
                style={{ background: FILL[z.type] }}
                aria-hidden
              />
              {z.label}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-[var(--foreground)]">
          <span className="font-medium">{TYPE_LABELS[selected]}:</span>{" "}
          <span className="text-[var(--foreground-muted)]">
            {TYPE_HINTS[selected]}
            {faceShape ? `, tuned for a ${faceShape} face` : ""}
          </span>
        </p>
        <ol className="space-y-1.5 text-sm text-[var(--foreground-muted)]">
          {STEPS[selected].map((step, i) => (
            <li key={step} className="flex gap-2">
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center bg-[var(--background-secondary)] text-[0.65rem] font-medium text-[var(--foreground)]">
                {i + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
