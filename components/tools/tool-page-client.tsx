"use client";

import Link from "next/link";
import { AnalyzeCta } from "@/components/content/analyze-cta";
import { Accordion } from "@/components/ui/accordion";
import { ToolRunner } from "@/components/tools/tool-runners";
import { guides } from "@/data/guides";
import { beautyTools } from "@/data/tools";
import type { BeautyTool } from "@/types/tools";

export function ToolPageClient({ tool }: { tool: BeautyTool }) {
  const relatedTools = tool.relatedTools
    .map((s) => beautyTools.find((t) => t.slug === s))
    .filter(Boolean);
  const relatedGuideLinks = tool.relatedGuides
    .map((s) => guides.find((g) => g.slug === s))
    .filter(Boolean);

  return (
    <>
      {tool.usesMediaPipe && (
        <p className="mt-6 text-xs uppercase tracking-wide text-[var(--dusty-rose)]">
          Photo analysis runs on your device. Nothing gets uploaded to our servers.
        </p>
      )}

      <div className={tool.usesMediaPipe ? "mt-6" : "mt-10"}>
        <ToolRunner slug={tool.slug} />
      </div>

      {(relatedTools.length > 0 || relatedGuideLinks.length > 0) && (
        <section className="mt-16 grid gap-10 sm:grid-cols-2">
          {relatedTools.length > 0 && (
            <div>
              <h2 className="font-serif text-xl text-[var(--foreground)]">Related tools</h2>
              <ul className="mt-4 space-y-2">
                {relatedTools.map((t) => (
                  <li key={t!.slug}>
                    <Link
                      href={`/tools/${t!.slug}`}
                      className="text-sm font-medium text-[var(--dusty-rose)] hover:underline"
                    >
                      {t!.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {relatedGuideLinks.length > 0 && (
            <div>
              <h2 className="font-serif text-xl text-[var(--foreground)]">Related guides</h2>
              <ul className="mt-4 space-y-2">
                {relatedGuideLinks.map((g) => (
                  <li key={g!.slug}>
                    <Link
                      href={`/guides/${g!.slug}`}
                      className="text-sm text-[var(--foreground-muted)] hover:text-[var(--dusty-rose)]"
                    >
                      {g!.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      {tool.faqs.length > 0 && (
        <section className="mt-16">
          <h2 className="font-serif text-2xl text-[var(--foreground)]">FAQ</h2>
          <Accordion items={tool.faqs} className="mt-4" />
        </section>
      )}

      <div className="mt-16">
        <AnalyzeCta title="Want a full AI recommendation pass?" />
      </div>
    </>
  );
}
