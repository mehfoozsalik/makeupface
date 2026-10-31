"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ChevronDown,
  Menu,
  X,
  ScanFace,
  Scale,
  Ruler,
  CircleDot,
  MoveVertical,
  Gem,
  Eye,
  PenLine,
  Palette,
  Spade,
  Scissors,
  Smile,
  Droplets,
  Paintbrush,
  Thermometer,
  Pipette,
  Flower2,
  Layers,
  Sparkles,
  ListChecks,
  ListOrdered,
  Wallet,
  Timer,
  Heart,
  Sun,
  type LucideIcon,
} from "lucide-react";
import { BrandLogo } from "@/components/layout/brand-logo";
import { beautyTools } from "@/data/tools";
import { cn } from "@/lib/utils/cn";

const NAV = [
  { href: "/makeup", label: "Makeup Hub" },
  { href: "/blog", label: "Blog" },
  { href: "/try-on", label: "Try On" },
  { href: "/makeup-looks", label: "Looks" },
  { href: "/guides", label: "Guides" },
];

const TOOL_ICONS: Record<string, LucideIcon> = {
  "face-shape-detector": ScanFace,
  "face-symmetry-test": Scale,
  "face-ratio-calculator": Ruler,
  "forehead-shape-analyzer": CircleDot,
  "jawline-shape-detector": MoveVertical,
  "cheekbone-analyzer": Gem,
  "eye-shape-detector": Eye,
  "eyeliner-style-finder": PenLine,
  "eyeshadow-placement-guide": Palette,
  "eyebrow-shape-detector": Spade,
  "eyebrow-shaping-guide": Scissors,
  "lip-shape-detector": Smile,
  "lipstick-shade-finder": Droplets,
  "lip-liner-guide": Paintbrush,
  "skin-undertone-test": Thermometer,
  "foundation-shade-finder": Pipette,
  "blush-placement-finder": Flower2,
  "contour-placement-guide": Layers,
  "makeup-style-finder": Sparkles,
  "makeup-product-checklist": ListChecks,
  "makeup-routine-generator": ListOrdered,
  "makeup-budget-calculator": Wallet,
  "makeup-time-calculator": Timer,
  "wedding-makeup-finder": Heart,
  "everyday-makeup-finder": Sun,
};

const CATEGORY_ORDER = ["face", "eye", "lip", "skin", "makeup"] as const;
const CATEGORY_LABEL: Record<(typeof CATEGORY_ORDER)[number], string> = {
  face: "Face",
  eye: "Eyes",
  lip: "Lips",
  skin: "Skin",
  makeup: "Makeup",
};

function linkActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function ToolsDropdown({
  onNavigate,
}: {
  onNavigate?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const toolsActive = pathname.startsWith("/tools");

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        className={cn(
          "inline-flex items-center gap-1 px-3 py-2 text-sm transition-colors duration-150",
          toolsActive || open
            ? "text-[var(--foreground)]"
            : "text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
        )}
        onClick={() => setOpen((v) => !v)}
      >
        Tools
        <ChevronDown
          className={cn(
            "size-3.5 transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]",
            open && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            role="menu"
            initial={reduce ? false : { opacity: 0, transform: "translateY(6px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            exit={reduce ? undefined : { opacity: 0, transform: "translateY(4px)" }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            className="absolute right-0 top-full z-50 pt-2"
          >
            <div className="w-[min(92vw,560px)] rounded-xl border border-[var(--border)] bg-[var(--white)] p-4 shadow-[0_12px_40px_rgba(41,37,34,0.08)]">
              <div className="mb-3 flex items-center justify-between gap-3 px-1">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--foreground-muted)]">
                  Beauty tools
                </p>
                <Link
                  href="/tools"
                  className="text-xs text-[var(--dusty-rose)] hover:underline"
                  onClick={() => {
                    setOpen(false);
                    onNavigate?.();
                  }}
                >
                  View all
                </Link>
              </div>

              <div className="grid max-h-[min(70vh,420px)] gap-4 overflow-y-auto sm:grid-cols-2">
                {CATEGORY_ORDER.map((cat) => {
                  const items = beautyTools.filter((t) => t.category === cat);
                  if (items.length === 0) return null;
                  return (
                    <div key={cat}>
                      <p className="mb-1.5 px-2 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-[var(--champagne)]">
                        {CATEGORY_LABEL[cat]}
                      </p>
                      <ul className="space-y-0.5">
                        {items.map((tool) => {
                          const Icon = TOOL_ICONS[tool.slug] ?? Sparkles;
                          return (
                            <li key={tool.slug}>
                              <Link
                                href={`/tools/${tool.slug}`}
                                role="menuitem"
                                className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm text-[var(--foreground-muted)] transition-colors duration-150 hover:bg-[var(--background-secondary)] hover:text-[var(--foreground)]"
                                onClick={() => {
                                  setOpen(false);
                                  onNavigate?.();
                                }}
                              >
                                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--background-secondary)] text-[var(--dusty-rose)]">
                                  <Icon className="size-3.5" strokeWidth={1.75} aria-hidden />
                                </span>
                                <span className="leading-snug">{tool.title}</span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    setMobileOpen(false);
    setMobileToolsOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6">
        <BrandLogo size="sm" />

        <nav
          className="ml-auto hidden items-center gap-1 lg:flex"
          aria-label="Primary"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-3 py-2 text-sm transition-colors duration-150",
                linkActive(pathname, item.href)
                  ? "text-[var(--foreground)]"
                  : "text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
              )}
            >
              {item.label}
            </Link>
          ))}
          <ToolsDropdown />
          <Link
            href="/analyze"
            className="ml-2 inline-flex h-9 items-center rounded-full bg-[var(--dusty-rose)] px-5 text-xs font-medium tracking-wide text-white transition-colors duration-150 hover:bg-[#b8757c]"
          >
            Analyze My Face
          </Link>
        </nav>

        <button
          type="button"
          className="ml-auto inline-flex size-10 items-center justify-center text-[var(--foreground)] lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
            className="overflow-hidden border-t border-[var(--border)] bg-[var(--background)] lg:hidden"
          >
            <nav className="flex flex-col px-4 py-3" aria-label="Mobile">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "border-b border-[var(--border)]/60 py-3.5 text-sm",
                    linkActive(pathname, item.href)
                      ? "text-[var(--foreground)]"
                      : "text-[var(--foreground-muted)]"
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <button
                type="button"
                className="flex w-full items-center justify-between border-b border-[var(--border)]/60 py-3.5 text-left text-sm text-[var(--foreground)]"
                aria-expanded={mobileToolsOpen}
                onClick={() => setMobileToolsOpen((v) => !v)}
              >
                Tools
                <ChevronDown
                  className={cn(
                    "size-4 text-[var(--foreground-muted)] transition-transform duration-150",
                    mobileToolsOpen && "rotate-180"
                  )}
                />
              </button>

              <AnimatePresence initial={false}>
                {mobileToolsOpen && (
                  <motion.div
                    initial={reduce ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={reduce ? undefined : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                    className="overflow-hidden border-b border-[var(--border)]/60"
                  >
                    <ul className="max-h-64 space-y-0.5 overflow-y-auto py-2">
                      <li>
                        <Link
                          href="/tools"
                          className="flex items-center gap-2.5 px-1 py-2 text-sm text-[var(--dusty-rose)]"
                          onClick={() => setMobileOpen(false)}
                        >
                          <span className="flex size-8 items-center justify-center rounded-full bg-[var(--background-secondary)]">
                            <Sparkles className="size-3.5" strokeWidth={1.75} />
                          </span>
                          All beauty tools
                        </Link>
                      </li>
                      {beautyTools.map((tool) => {
                        const Icon = TOOL_ICONS[tool.slug] ?? Sparkles;
                        return (
                          <li key={tool.slug}>
                            <Link
                              href={`/tools/${tool.slug}`}
                              className="flex items-center gap-2.5 px-1 py-2 text-sm text-[var(--foreground-muted)]"
                              onClick={() => setMobileOpen(false)}
                            >
                              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--background-secondary)] text-[var(--dusty-rose)]">
                                <Icon className="size-3.5" strokeWidth={1.75} aria-hidden />
                              </span>
                              {tool.title}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>

              <Link
                href="/analyze"
                className="mt-3 rounded-full bg-[var(--dusty-rose)] py-3 text-center text-sm font-medium text-white"
                onClick={() => setMobileOpen(false)}
              >
                Analyze My Face
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
