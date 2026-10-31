"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  AnalysisStep,
  FaceAnalysisResult,
} from "@/types/face-analysis";
import type { MakeupAIResponse, SavedReport } from "@/types/ai";
import type { UserPreferences } from "@/types/makeup";

interface AnalysisState {
  step: AnalysisStep;
  imageDataUrl: string | null;
  analysis: FaceAnalysisResult | null;
  preferences: UserPreferences | null;
  recommendations: MakeupAIResponse | null;
  error: string | null;
  isProcessing: boolean;
  savedReports: SavedReport[];
  setStep: (step: AnalysisStep) => void;
  setImage: (dataUrl: string | null) => void;
  setAnalysis: (analysis: FaceAnalysisResult | null) => void;
  setPreferences: (preferences: UserPreferences | null) => void;
  setRecommendations: (rec: MakeupAIResponse | null) => void;
  setError: (error: string | null) => void;
  setProcessing: (v: boolean) => void;
  saveCurrentReport: () => string | null;
  deleteReport: (id: string) => void;
  reset: () => void;
}

const defaultPreferences: UserPreferences = {
  experience: "beginner",
  style: "natural",
  occasion: "daily",
  additional: ["affordable"],
  undertone: "unsure",
};

export const useAnalysisStore = create<AnalysisState>()(
  persist(
    (set, get) => ({
      step: "upload",
      imageDataUrl: null,
      analysis: null,
      preferences: defaultPreferences,
      recommendations: null,
      error: null,
      isProcessing: false,
      savedReports: [],
      setStep: (step) => set({ step }),
      setImage: (imageDataUrl) => set({ imageDataUrl }),
      setAnalysis: (analysis) => set({ analysis }),
      setPreferences: (preferences) => set({ preferences }),
      setRecommendations: (recommendations) => set({ recommendations }),
      setError: (error) => set({ error }),
      setProcessing: (isProcessing) => set({ isProcessing }),
      saveCurrentReport: () => {
        const { analysis, preferences, recommendations, savedReports } = get();
        if (!analysis || !preferences || !recommendations) return null;
        const id = crypto.randomUUID();
        const report: SavedReport = {
          id,
          createdAt: new Date().toISOString(),
          faceAnalysis: analysis,
          preferences,
          recommendations,
        };
        set({ savedReports: [report, ...savedReports].slice(0, 20) });
        return id;
      },
      deleteReport: (id) =>
        set({ savedReports: get().savedReports.filter((r) => r.id !== id) }),
      reset: () =>
        set({
          step: "upload",
          imageDataUrl: null,
          analysis: null,
          preferences: defaultPreferences,
          recommendations: null,
          error: null,
          isProcessing: false,
        }),
    }),
    {
      name: "lumina-analysis",
      partialize: (s) => ({
        savedReports: s.savedReports,
        // Intentionally omit imageDataUrl - photos stay ephemeral
      }),
    }
  )
);
