"use client";

import { useProgress } from "@/hooks/useProgress";
import { CATEGORIES } from "@/lib/constants";
import { ProgressBar } from "@/components/ui/ProgressBar";

export function WeakAreas() {
  const { progress, weakAreas } = useProgress();

  return (
    <div>
      <h3 className="font-bold text-gray-900 dark:text-white mb-4">📍 Category Progress</h3>
      <div className="space-y-3">
        {CATEGORIES.map((cat) => {
          const score = progress.categoryScores[cat.id] || 0;
          const isWeak = weakAreas.includes(cat.id);
          return (
            <div key={cat.id}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {cat.emoji} {cat.label}
                  {isWeak && (
                    <span className="ml-1 text-xs text-orange-500">⚠️</span>
                  )}
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-500">{score}%</span>
              </div>
              <ProgressBar
                value={score}
                color={
                  score < 30
                    ? "#F59E0B"
                    : score < 70
                    ? "#60A5FA"
                    : "#4CAF50"
                }
                size="sm"
              />
            </div>
          );
        })}
      </div>
      {weakAreas.length > 0 && (
        <p className="text-xs text-orange-500 dark:text-orange-400 mt-3">
          ⚠️ Focus on: {weakAreas.join(", ")}
        </p>
      )}
    </div>
  );
}
