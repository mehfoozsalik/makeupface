"use client";

import type { BeautyTool } from "@/types/tools";
import {
  BlushPlacementFinderRunner,
  CheekboneAnalyzerRunner,
  ContourPlacementGuideRunner,
  EyeShapeDetectorRunner,
  EyebrowShapeDetectorRunner,
  EyeshadowPlacementGuideRunner,
  FaceRatioCalculatorRunner,
  FaceShapeDetectorRunner,
  FaceSymmetryTestRunner,
  ForeheadShapeAnalyzerRunner,
  JawlineShapeDetectorRunner,
  LipShapeDetectorRunner,
} from "@/components/tools/runners/photo-runners";
import {
  EverydayMakeupFinderRunner,
  EyebrowShapingGuideRunner,
  EyelinerStyleFinderRunner,
  FoundationShadeFinderRunner,
  LipLinerGuideRunner,
  LipstickShadeFinderRunner,
  MakeupBudgetCalculatorRunner,
  MakeupProductChecklistRunner,
  MakeupRoutineGeneratorRunner,
  MakeupStyleFinderRunner,
  MakeupTimeCalculatorRunner,
  SkinUndertoneTestRunner,
  WeddingMakeupFinderRunner,
} from "@/components/tools/runners/quiz-runners";

export function ToolRunner({ slug }: { slug: BeautyTool["slug"] }) {
  switch (slug) {
    case "face-shape-detector":
      return <FaceShapeDetectorRunner />;
    case "face-symmetry-test":
      return <FaceSymmetryTestRunner />;
    case "face-ratio-calculator":
      return <FaceRatioCalculatorRunner />;
    case "forehead-shape-analyzer":
      return <ForeheadShapeAnalyzerRunner />;
    case "jawline-shape-detector":
      return <JawlineShapeDetectorRunner />;
    case "cheekbone-analyzer":
      return <CheekboneAnalyzerRunner />;
    case "eye-shape-detector":
      return <EyeShapeDetectorRunner />;
    case "eyebrow-shape-detector":
      return <EyebrowShapeDetectorRunner />;
    case "lip-shape-detector":
      return <LipShapeDetectorRunner />;
    case "blush-placement-finder":
      return <BlushPlacementFinderRunner />;
    case "contour-placement-guide":
      return <ContourPlacementGuideRunner />;
    case "eyeshadow-placement-guide":
      return <EyeshadowPlacementGuideRunner />;
    case "skin-undertone-test":
      return <SkinUndertoneTestRunner />;
    case "foundation-shade-finder":
      return <FoundationShadeFinderRunner />;
    case "lipstick-shade-finder":
      return <LipstickShadeFinderRunner />;
    case "makeup-style-finder":
      return <MakeupStyleFinderRunner />;
    case "makeup-product-checklist":
      return <MakeupProductChecklistRunner />;
    case "makeup-routine-generator":
      return <MakeupRoutineGeneratorRunner />;
    case "makeup-budget-calculator":
      return <MakeupBudgetCalculatorRunner />;
    case "makeup-time-calculator":
      return <MakeupTimeCalculatorRunner />;
    case "wedding-makeup-finder":
      return <WeddingMakeupFinderRunner />;
    case "everyday-makeup-finder":
      return <EverydayMakeupFinderRunner />;
    case "eyeliner-style-finder":
      return <EyelinerStyleFinderRunner />;
    case "eyebrow-shaping-guide":
      return <EyebrowShapingGuideRunner />;
    case "lip-liner-guide":
      return <LipLinerGuideRunner />;
    default:
      return null;
  }
}
