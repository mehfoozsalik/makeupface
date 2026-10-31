"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  Camera,
  Sparkles,
  Eye,
  Smile,
  Layers,
  Wrench,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
import { homepageFaqs } from "@/data/faqs";
import { makeupLooks } from "@/data/makeup-styles";
import { beautyTools } from "@/data/tools";
import { guides } from "@/data/guides";

function FadeIn({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, transform: "translateY(16px)" }}
      whileInView={{ opacity: 1, transform: "translateY(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.35, delay: reduce ? 0 : delay, ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function HomeSections() {
  const featuredLooks = makeupLooks.slice(0, 6);
  const featuredTools = beautyTools.slice(0, 6);
  const trendingGuides = guides.slice(0, 4);

  return (
    <>
      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <FadeIn>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--dusty-rose)]">
            How it works
          </p>
          <h2 className="mt-3 font-serif text-3xl text-[var(--foreground)] sm:text-4xl">
            What happens after you upload
          </h2>
          <p className="mt-3 max-w-2xl text-[var(--foreground-muted)]">
            Your selfie never leaves this device for face mapping. We measure
            proportions here, then use those numbers (not the photo) to shape
            your routine.
          </p>
        </FadeIn>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {[
            {
              icon: Camera,
              title: "Upload a selfie",
              body: "Face the camera in soft daylight. Skip filters and sunglasses so we can see your features clearly.",
            },
            {
              icon: Sparkles,
              title: "We read your features",
              body: "Landmarks on cheekbones, eyes, brows, and lips help us guess shape and spacing. You can confirm anything that feels off.",
            },
            {
              icon: Layers,
              title: "Get a routine that fits",
              body: "Base, eyes, cheeks, and lips with placement notes tied to what we found on your face.",
            },
          ].map((step, i) => (
            <FadeIn key={step.title} delay={i * 0.06}>
              <div className="border border-[var(--border)] bg-[var(--white)] p-6">
                <step.icon className="size-6 text-[var(--dusty-rose)]" strokeWidth={1.5} />
                <h3 className="mt-4 font-serif text-xl">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--foreground-muted)]">
                  {step.body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Upload CTA band */}
      <section className="bg-[var(--background-secondary)]">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-16 sm:px-6 md:flex-row md:items-center">
          <div>
            <h2 className="font-serif text-3xl text-[var(--foreground)]">
              Upload Your Photo
            </h2>
            <p className="mt-2 max-w-lg text-[var(--foreground-muted)]">
              Start with a clear selfie. We validate lighting, face size, and
              position before analysis begins.
            </p>
          </div>
          <Link
            href="/analyze"
            className="inline-flex h-12 items-center gap-2 bg-[var(--dusty-rose)] px-6 text-sm font-medium text-white transition-colors hover:bg-[#b8757c]"
          >
            Begin analysis <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      {/* Face shape */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <FadeIn>
          <h2 className="font-serif text-3xl sm:text-4xl">Discover Your Face Shape</h2>
          <p className="mt-3 max-w-2xl text-[var(--foreground-muted)]">
            Oval, round, square, heart, diamond, or oblong: each silhouette
            gets a slightly different contour, blush, and highlight map.
          </p>
        </FadeIn>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {["Oval", "Round", "Square", "Heart", "Diamond", "Oblong"].map((shape) => (
            <Link
              key={shape}
              href="/makeup-looks-by-face-shape"
              className="border border-[var(--border)] bg-[var(--white)] p-4 text-center transition-colors duration-150 hover:border-[var(--dusty-rose)]"
            >
              <div className="mx-auto mb-3 flex h-16 w-12 items-center justify-center">
                <FaceShapeIcon shape={shape} />
              </div>
              <span className="text-sm font-medium">{shape}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Eyes lips face */}
      <section className="border-y border-[var(--border)] bg-[var(--white)]">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-20 sm:px-6 md:grid-cols-3">
          {[
            {
              href: "/face-makeup",
              icon: Smile,
              title: "Face Makeup",
              body: "Primer, foundation, contour, blush, and highlight tutorials.",
            },
            {
              href: "/eye-makeup",
              icon: Eye,
              title: "Eye Makeup",
              body: "Eyeshadow, eyeliner, and mascara by eye shape.",
            },
            {
              href: "/lip-makeup",
              icon: Sparkles,
              title: "Lip Makeup",
              body: "Lip liner, lipstick, and shade guidance for every lip shape.",
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group block p-2 transition-opacity hover:opacity-90"
            >
              <item.icon className="size-7 text-[var(--dusty-rose)]" strokeWidth={1.4} />
              <h3 className="mt-4 font-serif text-2xl group-hover:text-[var(--dusty-rose)]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-[var(--foreground-muted)]">{item.body}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Looks */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl">Personalized Makeup Looks</h2>
            <p className="mt-2 text-[var(--foreground-muted)]">
              From clean girl to soft glam. Browse looks, then personalize with analysis.
            </p>
          </div>
          <Link href="/makeup-looks" className="hidden text-sm text-[var(--dusty-rose)] sm:block">
            View all
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredLooks.map((look) => (
            <Link
              key={look.slug}
              href={`/makeup-looks/${look.slug}`}
              className="group border border-[var(--border)] bg-[var(--white)] transition-[border-color] duration-150 hover:border-[var(--dusty-rose)]"
            >
              <div className="aspect-[4/3] bg-[var(--background-secondary)]">
                <LookSwatch title={look.title} intensity={look.intensity} />
              </div>
              <div className="p-5">
                <h3 className="font-serif text-xl group-hover:text-[var(--dusty-rose)]">
                  {look.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-[var(--foreground-muted)]">
                  {look.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Tutorials */}
      <section className="bg-[var(--background-secondary)]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="font-serif text-3xl sm:text-4xl">Visual Makeup Tutorials</h2>
          <p className="mt-3 max-w-2xl text-[var(--foreground-muted)]">
            Placement diagrams show where products go, not just what to buy.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Contour placement",
              "Blush placement",
              "Highlight zones",
              "Eyeshadow map",
            ].map((label) => (
              <Link
                key={label}
                href="/analyze"
                className="border border-[var(--border)] bg-[var(--white)] p-5 text-sm font-medium transition-colors hover:border-[var(--dusty-rose)]"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex items-center gap-3">
          <Wrench className="size-5 text-[var(--dusty-rose)]" />
          <h2 className="font-serif text-3xl sm:text-4xl">Popular Free Beauty Tools</h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="border border-[var(--border)] bg-[var(--white)] p-5 transition-colors duration-150 hover:border-[var(--dusty-rose)]"
            >
              <h3 className="font-medium text-[var(--foreground)]">{tool.title}</h3>
              <p className="mt-2 text-sm text-[var(--foreground-muted)] line-clamp-2">
                {tool.description}
              </p>
            </Link>
          ))}
        </div>
        <Link
          href="/tools"
          className="mt-6 inline-flex items-center gap-1 text-sm text-[var(--dusty-rose)]"
        >
          Browse all 25 tools <ArrowRight className="size-3.5" />
        </Link>
      </section>

      {/* Guides */}
      <section className="border-t border-[var(--border)] bg-[var(--white)]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="flex items-center gap-3">
            <BookOpen className="size-5 text-[var(--dusty-rose)]" />
            <h2 className="font-serif text-3xl sm:text-4xl">Trending Makeup Guides</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {trendingGuides.map((g) => (
              <Link
                key={g.slug}
                href={`/guides/${g.slug}`}
                className="border-b border-[var(--border)] pb-6 transition-opacity hover:opacity-80"
              >
                <p className="text-xs uppercase tracking-wider text-[var(--foreground-muted)]">
                  {g.category}, {g.readTimeMinutes} min read
                </p>
                <h3 className="mt-2 font-serif text-2xl">{g.title}</h3>
                <p className="mt-2 text-sm text-[var(--foreground-muted)]">{g.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Styles explore */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="font-serif text-3xl sm:text-4xl">Explore Makeup Styles</h2>
        <div className="mt-8 flex flex-wrap gap-2">
          {makeupLooks.map((l) => (
            <Link
              key={l.slug}
              href={`/makeup-looks/${l.slug}`}
              className="border border-[var(--border)] px-4 py-2 text-sm text-[var(--foreground-muted)] transition-colors hover:border-[var(--dusty-rose)] hover:text-[var(--foreground)]"
            >
              {l.title}
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--background-secondary)]">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
          <h2 className="text-center font-serif text-3xl sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <Accordion items={homepageFaqs} className="mt-10" />
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-6xl px-4 py-24 text-center sm:px-6">
        <h2 className="font-serif text-3xl sm:text-5xl">
          Ready to find your makeup match?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[var(--foreground-muted)]">
          Analyze your features in minutes on your device, privately, and walk
          away with a routine you can actually follow tomorrow morning.
        </p>
        <Link
          href="/analyze"
          className="mt-8 inline-flex h-12 items-center bg-[var(--dusty-rose)] px-8 text-sm font-medium text-white transition-colors hover:bg-[#b8757c]"
        >
          Analyze My Face
        </Link>
      </section>
    </>
  );
}

function FaceShapeIcon({ shape }: { shape: string }) {
  const paths: Record<string, string> = {
    Oval: "M20 4 C32 4 36 20 36 32 C36 48 28 60 20 60 C12 60 4 48 4 32 C4 20 8 4 20 4Z",
    Round: "M20 8 C32 8 36 18 36 32 C36 46 32 56 20 56 C8 56 4 46 4 32 C4 18 8 8 20 8Z",
    Square: "M8 10 H32 V54 H8 Z",
    Heart: "M20 58 L6 28 C2 18 8 8 16 10 C20 4 28 4 32 10 C40 8 46 18 42 28 Z",
    Diamond: "M20 6 L36 32 L20 58 L4 32 Z",
    Oblong: "M14 4 H26 V60 H14 Z",
  };
  return (
    <svg viewBox="0 0 40 64" className="h-14 w-10" aria-hidden>
      <path
        d={paths[shape] ?? paths.Oval}
        fill="none"
        stroke="var(--dusty-rose)"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function LookSwatch({
  title,
  intensity,
}: {
  title: string;
  intensity: string;
}) {
  const tones =
    intensity === "bold"
      ? ["#4A3728", "#C9878D", "#292522"]
      : intensity === "medium"
        ? ["#D9C3A1", "#C9878D", "#B9A0AA"]
        : ["#F0EBE4", "#E8D5C4", "#D9C3A1"];
  return (
    <div className="flex h-full flex-col justify-end p-4">
      <div className="flex gap-2">
        {tones.map((c) => (
          <span key={c} className="h-8 w-8 rounded-full" style={{ background: c }} />
        ))}
      </div>
      <p className="mt-3 text-xs text-[var(--foreground-muted)]">{title}</p>
    </div>
  );
}
