import { AnalysisWizard } from "@/components/analysis/analysis-wizard";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "AI Makeup Assistant",
  description:
    "Upload a selfie for private, on-device face analysis and a makeup routine mapped to your features.",
  path: "/analyze",
});

export default function AnalyzePage() {
  return <AnalysisWizard />;
}
