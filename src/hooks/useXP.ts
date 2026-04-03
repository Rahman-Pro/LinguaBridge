"use client";

import { useUserContext } from "@/context/UserContext";
import { XP_REWARDS, XP_THRESHOLDS } from "@/lib/constants";

export function useXP() {
  const { progress, addXP } = useUserContext();

  const awardXP = (type: keyof typeof XP_REWARDS) => {
    const amount = XP_REWARDS[type];
    addXP(amount);
    return amount;
  };

  const xpForNextLevel = XP_THRESHOLDS[progress.level] || XP_THRESHOLDS[49];
  const xpCurrentLevel = XP_THRESHOLDS[progress.level - 1] || 0;
  const xpInCurrentLevel = progress.xp - xpCurrentLevel;
  const xpNeededForLevel = xpForNextLevel - xpCurrentLevel;
  const levelProgress = Math.min(
    Math.round((xpInCurrentLevel / xpNeededForLevel) * 100),
    100
  );

  return {
    xp: progress.xp,
    level: progress.level,
    levelProgress,
    xpForNextLevel,
    awardXP,
  };
}
