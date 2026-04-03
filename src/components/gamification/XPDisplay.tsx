"use client";

import { useXP } from "@/hooks/useXP";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { formatNumber } from "@/lib/utils";

interface XPDisplayProps {
  compact?: boolean;
}

export function XPDisplay({ compact = false }: XPDisplayProps) {
  const { xp, level, levelProgress, xpForNextLevel } = useXP();

  if (compact) {
    return (
      <div className="flex items-center gap-2 bg-primary-50 dark:bg-primary-900/20 px-3 py-1.5 rounded-xl">
        <span className="text-sm">⭐</span>
        <span className="text-sm font-bold text-primary-700 dark:text-primary-400">
          {formatNumber(xp)} XP
        </span>
        <span className="text-xs text-gray-500">Lv.{level}</span>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-xl">⭐</span>
          <div>
            <div className="font-bold text-gray-900 dark:text-white">Level {level}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {formatNumber(xp)} / {formatNumber(xpForNextLevel)} XP
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {100 - levelProgress}% to next level
          </div>
        </div>
      </div>
      <ProgressBar value={levelProgress} color="#4CAF50" size="md" />
    </div>
  );
}
