"use client";

import { Card, CardContent } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useProgress } from "@/hooks/useProgress";
import { useXP } from "@/hooks/useXP";
import { CEFR_LEVELS } from "@/lib/constants";

export function ProgressTracker() {
  const { cefrLevel, cefrProgress, cefrInfo } = useProgress();
  const { xp, level, levelProgress } = useXP();

  const currentIndex = CEFR_LEVELS.findIndex((l) => l.level === cefrLevel);
  const nextCEFR = CEFR_LEVELS[currentIndex + 1];

  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-900 dark:text-white">Progress</h3>
          <span className="text-2xl">📊</span>
        </div>

        {/* CEFR Level */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1.5">
            <div className="flex items-center gap-2">
              <span
                className="text-sm font-bold px-2 py-0.5 rounded-full text-white"
                style={{ backgroundColor: cefrInfo?.color || "#9CA3AF" }}
              >
                {cefrLevel}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {cefrInfo?.name || "Beginner"}
              </span>
            </div>
            {nextCEFR && (
              <span className="text-xs text-gray-400 dark:text-gray-500">
                → {nextCEFR.level}
              </span>
            )}
          </div>
          <ProgressBar
            value={cefrProgress}
            showValue
            color={cefrInfo?.color}
            size="md"
          />
        </div>

        {/* Level Progress */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Level {level}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              ⭐ {xp} XP
            </span>
          </div>
          <ProgressBar value={levelProgress} color="#4CAF50" size="sm" />
        </div>

        {/* CEFR Scale */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
          {CEFR_LEVELS.map((l) => (
            <div
              key={l.level}
              className="flex flex-col items-center gap-0.5"
            >
              <div
                className={`w-3 h-3 rounded-full ${
                  l.level === cefrLevel ? "ring-2 ring-offset-1 ring-primary-500" : ""
                }`}
                style={{
                  backgroundColor:
                    currentIndex >= CEFR_LEVELS.findIndex((ll) => ll.level === l.level)
                      ? l.color
                      : "#E5E7EB",
                }}
              />
              <span className="text-[9px] font-medium text-gray-400">{l.level}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
