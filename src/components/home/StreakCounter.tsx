"use client";

import { Card, CardContent } from "@/components/ui/Card";
import { useStreak } from "@/hooks/useStreak";

export function StreakCounter() {
  const { streak, longestStreak } = useStreak();

  return (
    <Card className="text-center">
      <CardContent className="p-5">
        <div className="text-4xl mb-1">
          {streak > 0 ? "🔥" : "❄️"}
        </div>
        <div className="text-3xl font-black text-gray-900 dark:text-white">
          {streak}
        </div>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
          Day Streak
        </div>
        <div className="flex justify-center gap-1 mt-3">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                i < streak % 7
                  ? "bg-primary-500 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-400"
              }`}
            >
              {i < streak % 7 ? "🔥" : "·"}
            </div>
          ))}
        </div>
        {longestStreak > 0 && (
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
            Best: {longestStreak} days
          </p>
        )}
      </CardContent>
    </Card>
  );
}
