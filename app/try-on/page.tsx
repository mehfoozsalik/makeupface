import { LookTryOnWizard } from "@/components/try-on/look-try-on-wizard";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Look Try On, Recreate Any Makeup Look",
  description:
    "Upload a photo of a look you love. We sample the colors on your device, then walk you through recreating it. Your photos never go to the AI.",
  path: "/try-on",
});

export default function TryOnPage() {
  return (
    <article className="pb-20">
      <header className="border-b border-[var(--border)] bg-[var(--background-secondary)]/50">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-14">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Look Try On" }]}
            className="mb-6"
          />
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--dusty-rose)]">
            From their look to yours
          </p>
          <h1 className="mt-3 font-serif text-4xl text-[var(--foreground)] sm:text-5xl">
            Look Try On
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-[var(--foreground-muted)]">
            Saw a makeup look you want to copy? Upload it. We pull the colors
            here on your device, then tell you how to get close on your own face.
            Add a selfie if you want the steps tailored to your features.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <LookTryOnWizard />
      </div>
    </article>
  );
}
