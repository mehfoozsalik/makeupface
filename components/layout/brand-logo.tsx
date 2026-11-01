import Link from "next/link";
import { cn } from "@/lib/utils/cn";

type BrandLogoProps = {
  href?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: {
    top: "text-[0.65rem] tracking-[0.32em] leading-none",
    bottom: "text-base tracking-[0.02em] leading-none",
    gap: "gap-0",
  },
  md: {
    top: "text-[0.7rem] tracking-[0.36em] leading-none",
    bottom: "text-lg tracking-[0.04em] leading-none",
    gap: "gap-px",
  },
  lg: {
    top: "text-xs tracking-[0.40em] leading-none",
    bottom: "text-2xl tracking-[0.06em] leading-none",
    gap: "gap-0.5",
  },
};

export function BrandLogo({
  href = "/",
  className,
  size = "md",
}: BrandLogoProps) {
  const s = sizes[size];

  const mark = (
    <span
      className={cn(
        "inline-flex flex-col items-start leading-none",
        s.gap,
        className,
      )}
    >
      <span
        className={cn(
          "font-sans font-medium uppercase text-[var(--foreground-muted)]",
          s.top,
        )}
      >
        Makeup
      </span>
      <span
        className={cn(
          "font-serif font-medium uppercase text-[var(--foreground)]",
          s.bottom,
        )}
      >
        Face <span className="normal-case text-[var(--dusty-rose)]">Ai</span>
      </span>
    </span>
  );

  if (!href) return mark;

  return (
    <Link
      href={href}
      className="inline-flex shrink-0 transition-opacity duration-150 hover:opacity-80"
      aria-label="MakeUp Face Ai home"
    >
      {mark}
    </Link>
  );
}
