"use client";

import { useProgress } from "@/hooks/useProgress";

export function RetentionRate() {
  const { progress } = useProgress();

  const retention = progress.wordsLearned > 0
    ? Math.min(Math.round((progress.quizzesCompleted / Math.max(progress.wordsLearned, 1)) * 100), 100)
    : 0;

  const level =
    retention >= 80 ? { label: "Excellent", color: "text-green-600 dark:text-green-400", emoji: "🌟" } :
    retention >= 60 ? { label: "Good", color: "text-blue-600 dark:text-blue-400", emoji: "⭐" } :
    retention >= 40 ? { label: "Fair", color: "text-yellow-600 dark:text-yellow-400", emoji: "💛" } :
    { label: "Needs Work", color: "text-red-600 dark:text-red-400", emoji: "📚" };

  return (
    <div className="text-center">
      <div className="text-4xl mb-2">{level.emoji}</div>
      <div className={`text-3xl font-black ${level.color}`}>{retention}%</div>
      <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">
        Word Retention Rate
      </div>
      <div className={`text-xs font-semibold mt-1 ${level.color}`}>
        {level.label}
      </div>
      <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
        Based on {progress.wordsLearned} words & {progress.quizzesCompleted} quizzes
      </p>
    </div>
  );
}
