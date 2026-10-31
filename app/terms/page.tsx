import Link from "next/link";
import { PageShell } from "@/components/content/page-shell";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Terms of Use",
  description:
    "Terms for using MakeUp Face Ai makeup guides, beauty tools, and AI analysis. Educational use, acceptable conduct, and disclaimers.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <PageShell
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Terms" }]}
      title="Terms of Use"
      lead="Last updated: March 1, 2026. By using MakeUp Face Ai, you agree to these terms."
    >
      <div className="prose-beauty mt-12">
        <h2>Educational purpose</h2>
        <p>
          Guides, looks, and tool output are for general education and entertainment. They do not create a
          professional-client relationship with makeup artists, dermatologists, or other licensed providers.
        </p>

        <h2>Acceptable use</h2>
        <p>
          Do not upload unlawful content, others&apos; photos without permission, or attempt to disrupt the service.
          Automated scraping may be limited to protect infrastructure.
        </p>

        <h2>AI limitations</h2>
        <p>
          Analysis labels (face shape, eye shape, symmetry) are estimates from single photos. Lighting, hair covering
          the hairline, and camera angle affect results. You decide how to apply recommendations.
        </p>

        <h2>Intellectual property</h2>
        <p>
          Site text, layout, and branding belong to MakeUp Face Ai unless otherwise noted. You may link to our pages with
          accurate descriptions.
        </p>

        <h2>Disclaimer of warranties</h2>
        <p>
          The site is provided &quot;as is.&quot; We disclaim warranties to the fullest extent permitted by law. See{" "}
          <Link href="/privacy" className="text-[var(--dusty-rose)] hover:underline">
            Privacy Policy
          </Link>{" "}
          for data practices.
        </p>

        <h2>Changes</h2>
        <p>We may update these terms; continued use after changes constitutes acceptance.</p>
      </div>
    </PageShell>
  );
}
