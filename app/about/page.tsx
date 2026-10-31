import Link from "next/link";
import { PageShell } from "@/components/content/page-shell";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "About MakeUp Face Ai",
  description:
    "MakeUp Face Ai offers makeup how-tos and on-device facial analysis. Learn how we handle privacy, AI recommendations, and editorial standards.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <PageShell
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      eyebrow="Our approach"
      title="About MakeUp Face Ai"
      lead="We write makeup education you can use at the vanity, plus optional AI analysis when you want placement matched to your features. We are not a cosmetics brand, retailer, or medical provider."
    >
      <div className="prose-beauty mt-12">
        <h2 id="mission">What we do</h2>
        <p>
          MakeUp Face Ai helps you see where blush lifts, where contour belongs, and how hooded lids change
          crease maps. Guides, look tutorials, and free tools cover the technique. When you upload a photo,
          landmark detection estimates face and feature geometry, and structured results can shape personalized
          text recommendations.
        </p>

        <h2 id="standards">Content standards</h2>
        <p>
          Articles describe techniques and product categories. We do not invent brand partnerships, celebrity
          endorsements, or star ratings. Product-specific guides (like pressed powder foundations) explain how
          formulas behave in real life, not as official brand copy.
        </p>

        <h2 id="not-advice">Not medical advice</h2>
        <p>
          Skin conditions, allergies, and infections need licensed professionals. Shade finders and undertone quizzes
          are starting points. Always patch-test new products.
        </p>

        <h2 id="contact">Contact</h2>
        <p>
          Questions about the site or privacy practices? Email{" "}
          <a href="mailto:hello@luminaface.example" className="text-[var(--dusty-rose)] hover:underline">
            hello@luminaface.example
          </a>{" "}
          (placeholder until you wire up your inbox). For data requests, see our{" "}
          <Link href="/privacy" className="text-[var(--dusty-rose)] hover:underline">
            privacy policy
          </Link>
          .
        </p>
      </div>

      <p className="mt-12 text-sm text-[var(--foreground-muted)]">
        Explore{" "}
        <Link href="/guides" className="text-[var(--dusty-rose)] hover:underline">
          guides
        </Link>
        ,{" "}
        <Link href="/tools" className="text-[var(--dusty-rose)] hover:underline">
          tools
        </Link>
        , or{" "}
        <Link href="/analyze" className="text-[var(--dusty-rose)] hover:underline">
          analyze your face
        </Link>
        .
      </p>
    </PageShell>
  );
}
