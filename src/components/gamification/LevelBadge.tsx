"use client";

import { useProgress } from "@/hooks/useProgress";
import { CEFR_LEVELS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface LevelBadgeProps {
  size?: "sm" | "md" | "lg";
}

export function LevelBadge({ size = "md" }: LevelBadgeProps) {
  const { cefrLevel, cefrInfo } = useProgress();

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-2",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-bold rounded-full text-white",
        sizeClasses[size]
      )}
      style={{ backgroundColor: cefrInfo?.color || "#9CA3AF" }}
    >
      {cefrLevel}
      <span className="opacity-80 font-normal">{cefrInfo?.name}</span>
    </span>
  );
}
