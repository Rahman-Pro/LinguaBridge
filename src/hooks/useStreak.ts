"use client";

import { useUserContext } from "@/context/UserContext";

export function useStreak() {
  const { progress, incrementStreak, resetStreak } = useUserContext();

  const checkAndUpdateStreak = () => {
    const today = new Date().toDateString();
    const lastStudy = progress.lastStudyDate;

    if (!lastStudy) {
      incrementStreak();
      return;
    }

    if (lastStudy === today) {
      // Already studied today, no change
      return;
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();

    if (lastStudy === yesterdayStr) {
      // Studied yesterday, increment streak
      incrementStreak();
    } else {
      // Missed a day, reset streak and start new one
      resetStreak();
      incrementStreak();
    }
  };

  return {
    streak: progress.streak,
    longestStreak: progress.longestStreak,
    checkAndUpdateStreak,
  };
}
