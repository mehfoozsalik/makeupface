"use client";

import { useCallback, useState } from "react";
import { buildMakeupAnalysisRequest } from "@/lib/analysis/build-makeup-request";
import { makeupAIResponseSchema } from "@/lib/ai/schemas";
import type { MakeupAIResponse } from "@/types/ai";
import type { FaceAnalysisResult } from "@/types/face-analysis";
import type { UserPreferences } from "@/types/makeup";

export interface UseMakeupAnalysisResult {
  isLoading: boolean;
  error: string | null;
  data: MakeupAIResponse | null;
  fetchRecommendations: (
    analysis: FaceAnalysisResult,
    preferences: UserPreferences
  ) => Promise<MakeupAIResponse | null>;
  reset: () => void;
}

export function useMakeupAnalysis(): UseMakeupAnalysisResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<MakeupAIResponse | null>(null);

  const fetchRecommendations = useCallback(
    async (analysis: FaceAnalysisResult, preferences: UserPreferences) => {
      setIsLoading(true);
      setError(null);
      const payload = buildMakeupAnalysisRequest(analysis, preferences);

      try {
        const res = await fetch("/api/ai/makeup-analysis", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const json: unknown = await res.json().catch(() => ({}));

        if (!res.ok) {
          const msg =
            typeof json === "object" &&
            json !== null &&
            "error" in json &&
            typeof (json as { error: unknown }).error === "string"
              ? (json as { error: string }).error
              : "Could not generate recommendations.";
          setError(msg);
          setData(null);
          return null;
        }

        const parsed = makeupAIResponseSchema.safeParse(json);
        if (!parsed.success) {
          setError("Received an invalid response from the assistant.");
          setData(null);
          return null;
        }

        setData(parsed.data);
        return parsed.data;
      } catch {
        setError("Network error. Check your connection and try again.");
        setData(null);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    data,
    fetchRecommendations,
    reset,
  };
}
