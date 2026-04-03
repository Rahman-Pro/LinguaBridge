"use client";

import { cn } from "@/lib/utils";

type Level = "all" | "beginner" | "intermediate" | "advanced";

interface LevelFilterProps {
  selected: Level;
  onChange: (level: Level) => void;
}

const levels: { id: Level; label: string; emoji: string; color: string }[] = [
  { id: "all", label: "All Levels", emoji: "📚", color: "bg-gray-500" },
  { id: "beginner", label: "Beginner", emoji: "🌱", color: "bg-green-500" },
  { id: "intermediate", label: "Intermediate", emoji: "⭐", color: "bg-blue-500" },
  { id: "advanced", label: "Advanced", emoji: "🔥", color: "bg-purple-500" },
];

export function LevelFilter({ selected, onChange }: LevelFilterProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {levels.map((level) => (
        <button
          key={level.id}
          onClick={() => onChange(level.id)}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
            selected === level.id
              ? `${level.color} text-white shadow-sm`
              : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
          )}
        >
          {level.emoji} {level.label}
        </button>
      ))}
    </div>
  );
}
