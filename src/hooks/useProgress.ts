"use client";

import { useUserContext } from "@/context/UserContext";
import { CEFR_LEVELS } from "@/lib/constants";

export function useProgress() {
  const { progress } = useUserContext();

  const cefrInfo = CEFR_LEVELS.find((l) => l.level === progress.cefrLevel);
  const cefrProgress = cefrInfo
    ? Math.round(
        ((progress.xp - cefrInfo.minXP) / (cefrInfo.maxXP - cefrInfo.minXP)) * 100
      )
    : 0;

  const weakAreas = Object.entries(progress.categoryScores)
    .filter(([, score]) => score < 50)
    .sort(([, a], [, b]) => a - b)
    .slice(0, 3)
    .map(([category]) => category);

  return {
    progress,
    cefrLevel: progress.cefrLevel,
    cefrProgress: Math.min(Math.max(cefrProgress, 0), 100),
    cefrInfo,
    weakAreas,
    wordsLearned: progress.wordsLearned,
    quizzesCompleted: progress.quizzesCompleted,
    badgesCount: progress.badgesEarned.length,
  };
}
