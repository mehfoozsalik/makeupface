"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { beautyTools } from "@/data/tools";
import { cn } from "@/lib/utils/cn";

const NAV = [
  { href: "/makeup", label: "Makeup Hub" },
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

function ToolsDropdown({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, right: 0 });
  const [menuPath, setMenuPath] = useState(pathname);
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toolsActive = pathname.startsWith("/tools");
  const canPortal = typeof document !== "undefined";

  // Close on route change during render (avoid setState-in-effect lint).
  if (pathname !== menuPath) {
    setMenuPath(pathname);
    if (open) setOpen(false);
  }

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  const openMenu = () => {
    clearCloseTimer();
    setOpen(true);
  };

  const updateCoords = () => {
    const el = triggerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setCoords({
      top: rect.bottom + 8,
      right: Math.max(12, window.innerWidth - rect.right),
    });
  };

  useEffect(() => () => clearCloseTimer(), []);

  useLayoutEffect(() => {
    if (!open) return;
    updateCoords();
    const onWin = () => updateCoords();
    window.addEventListener("resize", onWin);
    window.addEventListener("scroll", onWin, true);
    return () => {
      window.removeEventListener("resize", onWin);
      window.removeEventListener("scroll", onWin, true);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      const t = e.target as Node;
      if (triggerRef.current?.contains(t) || panelRef.current?.contains(t)) {
        return;
      }
      setOpen(false);
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

  const panel =
    canPortal &&
    open &&
    createPortal(
      <div
        ref={panelRef}
        id={panelId}
        role="menu"
        className="fixed z-[80] w-[min(92vw,560px)] rounded-2xl border border-white/50 bg-white/45 p-4 shadow-[0_16px_48px_rgba(28,25,22,0.16)] backdrop-blur-xl dark:border-white/10 dark:bg-black/45 dark:shadow-[0_16px_48px_rgba(0,0,0,0.5)]"
        style={{
          top: coords.top,
          right: coords.right,
          WebkitBackdropFilter: "blur(24px) saturate(1.4)",
          backdropFilter: "blur(24px) saturate(1.4)",
        }}
        onMouseEnter={openMenu}
        onMouseLeave={scheduleClose}
      >
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
                          className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm text-[var(--foreground-muted)] transition-colors duration-150 hover:bg-[var(--background-secondary)]/80 hover:text-[var(--foreground)]"
                          onClick={() => {
                            setOpen(false);
                            onNavigate?.();
                          }}
                        >
                          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--background-secondary)]/80 text-[var(--dusty-rose)]">
                            <Icon
                              className="size-3.5"
                              strokeWidth={1.75}
                              aria-hidden
                            />
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
      </div>,
      document.body
    );

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        className={cn(
          "inline-flex items-center gap-1 px-3 py-2 text-sm transition-colors duration-150",
          toolsActive || open
            ? "text-[var(--foreground)]"
            : "text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
        )}
        onClick={() => {
          if (open) setOpen(false);
          else {
            updateCoords();
            openMenu();
          }
        }}
        onMouseEnter={() => {
          updateCoords();
          openMenu();
        }}
        onMouseLeave={scheduleClose}
      >
        Tools
        <ChevronDown
          className={cn(
            "size-3.5 transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]",
            open && "rotate-180"
          )}
        />
      </button>
      {panel}
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
  const [navPath, setNavPath] = useState(pathname);
  const reduce = useReducedMotion();

  if (pathname !== navPath) {
    setNavPath(pathname);
    if (mobileOpen) setMobileOpen(false);
    if (mobileToolsOpen) setMobileToolsOpen(false);
  }

  return (
    <header className="fixed top-4 left-1/2 z-50 w-[min(100%-1.5rem,72rem)] -translate-x-1/2 rounded-2xl border border-[var(--border)] bg-background/20 backdrop-blur-sm">
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
                  : "text-[var(--foreground-muted)] hover:text-[var(--foreground)]",
              )}
            >
              {item.label}
            </Link>
          ))}
          <ToolsDropdown />
          <ThemeToggle className="ml-1" />
          <Link
            href="/analyze"
            className="glass-button ml-1 inline-flex h-9 items-center rounded-full px-5 text-xs font-medium tracking-wide text-[var(--on-accent)] transition-colors duration-150 hover:bg-[var(--dusty-rose-hover)]"
          >
            Analyze My Face
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center text-foreground"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
            className="overflow-hidden border-t border-border bg-background lg:hidden"
          >
            <nav className="flex flex-col px-4 py-3" aria-label="Mobile">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "border-b border-border/60 py-3.5 text-sm",
                    linkActive(pathname, item.href)
                      ? "text-foreground"
                      : "text-foreground-muted",
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
                    mobileToolsOpen && "rotate-180",
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
                    className="overflow-hidden border-b bg-background/20 border-[var(--border)]/60"
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
                                <Icon
                                  className="size-3.5"
                                  strokeWidth={1.75}
                                  aria-hidden
                                />
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
                className="glass-button mt-3 rounded-full py-3 text-center text-sm font-medium text-[var(--on-accent)] hover:bg-[var(--dusty-rose-hover)]"
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
