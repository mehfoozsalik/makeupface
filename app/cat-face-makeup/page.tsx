import Image from "next/image";
import Link from "next/link";
import { AnalyzeCta } from "@/components/content/analyze-cta";
import { PageShell } from "@/components/content/page-shell";
import { makeupLooks } from "@/data/makeup-styles";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Cat Face Makeup Tutorial: Halloween & Costume",
  description:
    "Step-by-step cat face makeup: extended wing liner, optional nose and whisker details, and base tips for parties. Pair with our cat eye look tutorial and eye shape tools.",
  path: "/cat-face-makeup",
  image: "/images/makeup-styles/cat-makeup.jpg",
});

const catLook = makeupLooks.find((l) => l.slug === "cat-makeup")!;

export default function CatFaceMakeupPage() {
  return (
    <PageShell
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Makeup looks", href: "/makeup-looks" },
        { label: "Cat face makeup" },
      ]}
      eyebrow="Costume night"
      title="Cat face makeup for parties and costume nights"
      lead="Graphic, playful, not your everyday liner. Plan extra time for symmetry, patch-test any face paint, and keep remover handy around the eyes."
    >
      <div className="relative mt-10 aspect-[16/10] w-full overflow-hidden bg-[var(--background-secondary)]">
        <Image
          src="/images/makeup-styles/cat-makeup.jpg"
          alt="Cat face makeup with winged liner, nose detail, and whiskers"
          fill
          className="object-cover object-top"
          sizes="(max-width: 1024px) 100vw, 960px"
          priority
        />
      </div>
      <div className="prose-beauty mt-12">
        <h2>Before you start</h2>
        <p>
          Matte skin helps paint and liner adhere. If you use white or black face paint on cheeks, set with translucent
          powder first on oily zones. Do not share eye products; use fresh sponges for paint near the eye. For a
          lighter version, skip paint and focus on an exaggerated wing. See our{" "}
          <Link href="/makeup-looks/cat-makeup" className="text-[var(--dusty-rose)] hover:underline">
            cat eye makeup look
          </Link>
          .
        </p>

        <h2>The cat eye wing</h2>
        <p>
          Look straight ahead in the mirror. Mark wing direction from outer corner following the lower lash line
          upward. Hooded lids need the wing drawn with eyes open so it clears the fold. Build thickness on the outer
          third only; a thin inner line keeps eyes from looking smaller. Liquid liner gives precision; gel with brush
          forgives edits. The{" "}
          <Link href="/tools/eyeliner-style-finder" className="text-[var(--dusty-rose)] hover:underline">
            eyeliner style finder
          </Link>{" "}
          suggests wing length by eye shape.
        </p>

        <h2>Nose and whisker details</h2>
        <p>
          Optional: dot shadow or face paint on the nose tip, draw a soft line to the cupid's bow, and add three to
          five whisker strokes on each cheek with a fine brush. Keep whiskers light. Hair-thin lines read better than
          heavy strokes in flash photos. Symmetry matters more than quantity; step back every few strokes.
        </p>

        <h2>Lashes and lips</h2>
        <p>
          Dramatic outer-corner lashes reinforce the feline silhouette. Balance with nude or black lip depending on
          whether eyes or lips are your focal point. If you wear colored shadow, keep lips neutral to avoid
          costume-clutter.
        </p>
      </div>

      <section className="mt-12 border border-[var(--border)] bg-[var(--white)] p-6">
        <h2 className="font-serif text-2xl text-[var(--foreground)]">Quick step list</h2>
        <ol className="mt-4 list-decimal space-y-3 pl-5 text-[var(--foreground-muted)]">
          {catLook.steps.map((s) => (
            <li key={s.title}>
              <strong className="text-[var(--foreground)]">{s.title}:</strong> {s.instruction}
            </li>
          ))}
        </ol>
        <p className="mt-4 text-sm text-[var(--foreground-muted)]">{catLook.faceShapeNotes}</p>
        <p className="mt-2 text-sm text-[var(--foreground-muted)]">{catLook.eyeShapeNotes}</p>
      </section>

      <div className="mt-14">
        <AnalyzeCta
          title="Check wing placement for hooded lids"
          body="Upload a selfie to see eye shape traits before you commit to a long Halloween wing."
        />
      </div>

      <p className="mt-10 text-sm text-[var(--foreground-muted)]">
        More evening looks:{" "}
        <Link href="/makeup-looks/party-makeup" className="text-[var(--dusty-rose)] hover:underline">
          party makeup
        </Link>{" "}
        ,{" "}
        <Link href="/makeup-looks/full-glam" className="text-[var(--dusty-rose)] hover:underline">
          full glam
        </Link>
        , and{" "}
        <Link href="/eye-makeup" className="text-[var(--dusty-rose)] hover:underline">
          eye makeup guide
        </Link>
      </p>
    </PageShell>
  );
}
