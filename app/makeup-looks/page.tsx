import Link from "next/link";
import { AnalyzeCta } from "@/components/content/analyze-cta";
import { PageShell } from "@/components/content/page-shell";
import { LooksFilter } from "@/components/makeup/looks-filter";
import { makeupLooks } from "@/data/makeup-styles";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Makeup Looks & Tutorials: Natural to Full Glam",
  description:
    "Browse makeup looks with step-by-step tutorials, product categories, and face or eye notes. Filter by occasion and intensity, then personalize with AI analysis.",
  path: "/makeup-looks",
});

export default function MakeupLooksPage() {
  return (
    <PageShell
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Makeup looks" }]}
      eyebrow="Tutorials"
      title="Makeup looks you can actually repeat"
      lead="Each tutorial lists product types, not brand hype, and notes how placement shifts for different face and eye shapes. Filter by occasion or intensity, or open a look for the full step list."
    >
      <p className="mt-10 text-[var(--foreground-muted)]">
        Not sure where to start? Try{" "}
        <Link href="/makeup-looks/natural-makeup" className="text-[var(--dusty-rose)] hover:underline">
          natural makeup
        </Link>
        ,{" "}
        <Link href="/makeup-looks/everyday-makeup" className="text-[var(--dusty-rose)] hover:underline">
          everyday makeup
        </Link>
        , or use the{" "}
        <Link href="/tools/makeup-style-finder" className="text-[var(--dusty-rose)] hover:underline">
          makeup style finder
        </Link>{" "}
        quiz.
      </p>

      <div className="mt-10">
        <LooksFilter looks={makeupLooks} />
      </div>

      <div className="mt-16">
        <AnalyzeCta
          title="Match looks to your features"
          body="After you pick a tutorial, run analysis to see whether your face shape or eye shape suggests tweaks to blush, liner, or contour."
        />
      </div>

      <p className="mt-12 text-sm text-[var(--foreground-muted)]">
        Related:{" "}
        <Link href="/makeup-looks-by-face-shape" className="text-[var(--dusty-rose)] hover:underline">
          makeup by face shape
        </Link>{" "}
        and{" "}
        <Link href="/guides" className="text-[var(--dusty-rose)] hover:underline">
          makeup guides
        </Link>
      </p>
    </PageShell>
  );
}
