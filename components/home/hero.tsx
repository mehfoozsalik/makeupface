"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

export function Hero() {
  const reduce = useReducedMotion();
  const ease = [0.23, 1, 0.32, 1] as const;

  return (
    <section className="relative overflow-hidden border-b border-[var(--border)]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(201,135,141,0.12),transparent_50%),radial-gradient(ellipse_at_10%_80%,rgba(217,195,161,0.18),transparent_45%)]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
        <div>
          <motion.p
            initial={reduce ? false : { opacity: 0, transform: "translateY(12px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ duration: 0.35, ease }}
            className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--dusty-rose)]"
          >
            AI Makeup & Beauty
          </motion.p>
          <motion.h1
            initial={reduce ? false : { opacity: 0, transform: "translateY(16px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ duration: 0.4, delay: reduce ? 0 : 0.05, ease }}
            className="mt-4 font-serif text-4xl leading-[1.1] text-[var(--foreground)] sm:text-5xl md:text-[3.4rem]"
          >
            Discover the Makeup That Truly Suits You.
          </motion.h1>
          <motion.p
            initial={reduce ? false : { opacity: 0, transform: "translateY(16px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ duration: 0.4, delay: reduce ? 0 : 0.1, ease }}
            className="mt-5 max-w-md text-base leading-relaxed text-[var(--foreground-muted)] sm:text-lg"
          >
            Upload a selfie, see how your features read on camera, and get makeup
            tips mapped to your face shape, eyes, and lips. No guesswork on where
            blush or contour should go.
          </motion.p>
          <motion.div
            initial={reduce ? false : { opacity: 0, transform: "translateY(12px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ duration: 0.35, delay: reduce ? 0 : 0.15, ease }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              href="/analyze"
              className="inline-flex h-12 items-center bg-[var(--dusty-rose)] px-6 text-sm font-medium text-white transition-colors duration-150 hover:bg-[#b8757c]"
            >
              Analyze My Face
            </Link>
            <Link
              href="/guides"
              className="inline-flex h-12 items-center border border-[var(--border)] bg-transparent px-6 text-sm font-medium text-[var(--foreground)] transition-colors duration-150 hover:border-[var(--dusty-rose)]"
            >
              Explore Makeup Guides
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, transform: "translateY(20px) scale(0.98)" }}
          animate={{ opacity: 1, transform: "translateY(0px) scale(1)" }}
          transition={{ duration: 0.45, delay: reduce ? 0 : 0.08, ease }}
          className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--background-secondary)]"
        >
          <Image
            src="/images/hero/natural-makeup-hero.jpg"
            alt="Woman with natural professional makeup"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* Subtle landmark overlay - educational, not a sticker badge */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
            viewBox="0 0 400 500"
            aria-hidden
          >
            <g stroke="#C9878D" strokeWidth="1" fill="none">
              <ellipse cx="200" cy="230" rx="100" ry="130" strokeDasharray="4 5" />
              <line x1="200" y1="110" x2="200" y2="360" strokeDasharray="3 5" />
            </g>
            <g fill="#C9878D">
              <circle cx="155" cy="210" r="2.5" />
              <circle cx="245" cy="210" r="2.5" />
              <circle cx="200" cy="250" r="2.5" />
              <circle cx="200" cy="300" r="2.5" />
            </g>
          </svg>
          <p className="absolute bottom-3 left-3 right-3 bg-[var(--background)]/85 px-3 py-2 text-xs text-[var(--foreground-muted)] backdrop-blur-sm">
            Face mapping stays on your phone. Your photo never goes to the AI.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
