"use client";

import { useProgress } from "@/hooks/useProgress";
import { getDayShort } from "@/lib/utils";

export function PerformanceChart() {
  const { progress } = useProgress();
  const maxActivity = Math.max(...progress.weeklyActivity, 1);

  return (
    <div>
      <h3 className="font-bold text-gray-900 dark:text-white mb-4">📈 Weekly Activity</h3>
      <div className="flex items-end gap-2 h-24">
        {progress.weeklyActivity.map((activity, i) => {
          const height = maxActivity > 0 ? (activity / maxActivity) * 100 : 0;
          const isToday = new Date().getDay() === i;
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex items-end" style={{ height: "80px" }}>
                <div
                  className={`w-full rounded-t-lg transition-all ${
                    isToday
                      ? "bg-primary-500"
                      : activity > 0
                      ? "bg-primary-300 dark:bg-primary-700"
                      : "bg-gray-100 dark:bg-gray-700"
                  }`}
                  style={{ height: `${Math.max(height, 5)}%` }}
                />
              </div>
              <span className={`text-[10px] ${isToday ? "font-bold text-primary-600 dark:text-primary-400" : "text-gray-400 dark:text-gray-500"}`}>
                {getDayShort(i)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
