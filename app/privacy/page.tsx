import Link from "next/link";
import { PageShell } from "@/components/content/page-shell";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description:
    "How MakeUp Face Ai handles photos, on-device facial analysis, DeepSeek AI requests, local storage, and your rights.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <PageShell
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Privacy" }]}
      title="Privacy Policy"
      lead="Last updated: October 31, 2026. Selfies are personal. This policy explains what MakeUp Face Ai does with your images and analysis data, and what we never do."
    >
      <div className="prose-beauty mt-12">
        <h2>Privacy-first analysis</h2>
        <p>
          Face detection and landmark measurement run <strong>locally in your browser</strong> using
          MediaPipe. Your photograph is not uploaded to our servers for facial recognition, and it is{" "}
          <strong>never sent to DeepSeek or any other AI provider</strong>.
        </p>
        <p>
          Only structured text may be sent to our API: face-shape labels, confidence scores, geometric ratios, and the
          preferences you select. That JSON goes to DeepSeek to generate educational makeup recommendations.
        </p>

        <h2>What we do not store by default</h2>
        <ul>
          <li>Original selfies or camera frames on our servers</li>
          <li>Persistent biometric identity profiles</li>
          <li>Landmark coordinates beyond your active browser session (unless you choose to save a text report locally)</li>
        </ul>

        <h2>Local storage on your device</h2>
        <p>
          If you save a report, we store recommendation text and analysis summaries in your browser&apos;s
          localStorage. Photos are intentionally omitted from that persistence. You can delete saved
          reports at any time from the Analysis page or by clearing site data in your browser.
        </p>

        <h2>Camera access</h2>
        <p>
          Camera permission is requested only when you choose to capture a photo. You can revoke access
          in your browser settings at any time. Capture is optional. File upload works without a camera.
        </p>

        <h2>Server logs and rate limiting</h2>
        <p>
          API requests may include standard request metadata (such as IP address used for rate limiting,
          timestamps, and user agent) for security and abuse prevention. We do not sell this data.
        </p>

        <h2>Third parties</h2>
        <p>
          DeepSeek processes structured recommendation prompts under its own terms when you run AI
          analysis. CDN hosts may serve the MediaPipe model files to your browser. Educational articles
          may mention cosmetics brands for search and learning purposes; mention does not imply
          affiliation, endorsement, or partnership.
        </p>

        <h2>Educational disclaimer</h2>
        <p>
          Facial measurements and makeup recommendations are approximate and educational. They are not
          medical, dermatological, or professional beauty advice, and results can vary with lighting,
          pose, and image quality.
        </p>

        <h2>Your choices</h2>
        <p>
          You can use guides, looks, and many tools without uploading a photo. To remove local data,
          use Reset / Delete in the app or clear this site&apos;s storage. Contact us via{" "}
          <Link href="/about#contact" className="text-[var(--dusty-rose)] hover:underline">
            About
          </Link>{" "}
          for privacy questions.
        </p>

        <h2>Children</h2>
        <p>
          The service is not directed at children under 13. Do not upload images of minors.
        </p>
      </div>

      <p className="mt-10 text-sm">
        See also{" "}
        <Link href="/terms" className="text-[var(--dusty-rose)] hover:underline">
          Terms of Use
        </Link>
        .
      </p>
    </PageShell>
  );
}
