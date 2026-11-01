"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

export function Hero() {
  const reduce = useReducedMotion();
  const ease = [0.23, 1, 0.32, 1] as const;

  return (
    <section className="relative overflow-hidden">
      <div className="border-b relative mx-auto grid max-w-6xl items-center gap-8 px-4 sm:px-6 md:grid-cols-2 md:gap-12 lg:gap-16">
        <motion.div
          initial={
            reduce
              ? false
              : { opacity: 0, transform: "translateY(18px) scale(0.98)" }
          }
          animate={{ opacity: 1, transform: "translateY(0px) scale(1)" }}
          transition={{ duration: 0.45, ease }}
          className=" relative order-1 aspect-12/14 w-full overflow-hidden rounded-3xl md:order-0"
        >
          <Image
            src="/images/hero/greekgoddess.png"
            alt="Classical marble goddess statue with gold jewelry and a basket of fruit"
            fill
            priority
            className="object-contain object-bottom"
            sizes="(max-width: 708px) 90vw, 50vw"
          />
        </motion.div>
        <motion.div
          initial={
            reduce ? false : { opacity: 0, transform: "translateY(16px)" }
          }
          animate={{ opacity: 1, transform: "translateY(0px)" }}
          transition={{ duration: 0.4, delay: reduce ? 0 : 0.06, ease }}
          className="order-2 rounded-3xl p-6 sm:p-8 md:order-none md:p-10"
        >
          <h4 className="font-sans text-[0.9rem] font-medium uppercase tracking-widest! text-foreground-muted">
            makeup eyes lips face
          </h4>
          <h1 className="mt-1 font-serif text-5xl leading-[0.95] tracking-[0.04em] text-[var(--foreground)] sm:text-6xl">
            With{" "}
            <span className="normal-case tracking-normal text-[var(--dusty-rose)]">
              Ai
            </span>
          </h1>
          <p className="mt-6 max-w-md font-serif text-2xl leading-none! text-[var(--foreground)] sm:text-3xl">
            Discover the makeup that truly suits you.
          </p>
          <p className="mt-4 max-w-md text-base leading-relaxed text-[var(--foreground-muted)]">
            Upload a selfie, see how your features read on camera, and get
            placement tips mapped to your face. Your photo stays on this device.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/analyze"
              className="glass-button inline-flex h-12 items-center rounded-xl px-6 text-sm font-medium text-[var(--on-accent)] transition-colors duration-150 hover:bg-[var(--dusty-rose-hover)] active:scale-[0.98]"
            >
              Analyze My Face
            </Link>
            <Link
              href="/guides"
              className="glass-button-ghost inline-flex h-12 items-center rounded-xl px-6 text-sm font-medium text-[var(--foreground)] transition-colors duration-150 hover:border-[var(--champagne)]"
            >
              Explore Makeup Guides
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
