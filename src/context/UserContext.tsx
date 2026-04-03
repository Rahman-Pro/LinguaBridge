"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { UserProgress, CEFRLevel, CategoryType } from "@/types";
import { DEFAULT_USER } from "@/lib/constants";
import { getCEFRLevel, getLevelFromXP } from "@/lib/utils";

interface UserContextType {
  progress: UserProgress;
  addXP: (amount: number) => void;
  incrementStreak: () => void;
  resetStreak: () => void;
  learnWord: () => void;
  completeQuiz: () => void;
  earnBadge: (badgeId: string) => void;
  updateCategoryScore: (category: CategoryType, score: number) => void;
  completeDailyChallenge: () => void;
  updateWeeklyActivity: () => void;
}

const UserContext = createContext<UserContextType>({
  progress: DEFAULT_USER,
  addXP: () => {},
  incrementStreak: () => {},
  resetStreak: () => {},
  learnWord: () => {},
  completeQuiz: () => {},
  earnBadge: () => {},
  updateCategoryScore: () => {},
  completeDailyChallenge: () => {},
  updateWeeklyActivity: () => {},
});

const STORAGE_KEY = "linguabridge_user_progress";

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>(DEFAULT_USER);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as UserProgress;
        setProgress(parsed);
      }
    } catch {
      // Use defaults
    }
  }, []);

  // Save to localStorage on change
  const saveProgress = useCallback((newProgress: UserProgress) => {
    setProgress(newProgress);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
    } catch {
      // Ignore storage errors
    }
  }, []);

  const addXP = useCallback(
    (amount: number) => {
      setProgress((prev) => {
        const newXP = prev.xp + amount;
        const newLevel = getLevelFromXP(newXP);
        const newCEFR = getCEFRLevel(newXP);
        const updated = {
          ...prev,
          xp: newXP,
          level: newLevel,
          cefrLevel: newCEFR as CEFRLevel,
        };
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch {
          // ignore
        }
        return updated;
      });
    },
    []
  );

  const incrementStreak = useCallback(() => {
    setProgress((prev) => {
      const today = new Date().toDateString();
      if (prev.lastStudyDate === today) return prev;

      const newStreak = prev.streak + 1;
      const newLongest = Math.max(newStreak, prev.longestStreak);
      const updated = {
        ...prev,
        streak: newStreak,
        longestStreak: newLongest,
        lastStudyDate: today,
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  }, []);

  const resetStreak = useCallback(() => {
    setProgress((prev) => {
      const updated = { ...prev, streak: 0 };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  }, []);

  const learnWord = useCallback(() => {
    setProgress((prev) => {
      const updated = { ...prev, wordsLearned: prev.wordsLearned + 1 };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  }, []);

  const completeQuiz = useCallback(() => {
    setProgress((prev) => {
      const updated = { ...prev, quizzesCompleted: prev.quizzesCompleted + 1 };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  }, []);

  const earnBadge = useCallback(
    (badgeId: string) => {
      setProgress((prev) => {
        if (prev.badgesEarned.includes(badgeId)) return prev;
        const updated = {
          ...prev,
          badgesEarned: [...prev.badgesEarned, badgeId],
        };
        saveProgress(updated);
        return updated;
      });
    },
    [saveProgress]
  );

  const updateCategoryScore = useCallback(
    (category: CategoryType, score: number) => {
      setProgress((prev) => {
        const updated = {
          ...prev,
          categoryScores: {
            ...prev.categoryScores,
            [category]: Math.min(
              100,
              (prev.categoryScores[category] || 0) + score
            ),
          },
        };
        saveProgress(updated);
        return updated;
      });
    },
    [saveProgress]
  );

  const completeDailyChallenge = useCallback(() => {
    setProgress((prev) => {
      const updated = { ...prev, dailyChallengeCompleted: true };
      saveProgress(updated);
      return updated;
    });
  }, [saveProgress]);

  const updateWeeklyActivity = useCallback(() => {
    setProgress((prev) => {
      const dayIndex = new Date().getDay();
      const newActivity = [...prev.weeklyActivity];
      newActivity[dayIndex] = (newActivity[dayIndex] || 0) + 1;
      const updated = { ...prev, weeklyActivity: newActivity };
      saveProgress(updated);
      return updated;
    });
  }, [saveProgress]);

  return (
    <UserContext.Provider
      value={{
        progress,
        addXP,
        incrementStreak,
        resetStreak,
        learnWord,
        completeQuiz,
        earnBadge,
        updateCategoryScore,
        completeDailyChallenge,
        updateWeeklyActivity,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
