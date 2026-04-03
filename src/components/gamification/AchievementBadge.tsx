"use client";

import type { Badge } from "@/types";
import { cn } from "@/lib/utils";

interface AchievementBadgeProps {
  badge: Badge;
  earned?: boolean;
  size?: "sm" | "md" | "lg";
}

const rarityColors = {
  common: "border-gray-200 dark:border-gray-600",
  rare: "border-blue-300 dark:border-blue-600",
  epic: "border-purple-400 dark:border-purple-500",
  legendary: "border-yellow-400 dark:border-yellow-500",
};

const rarityBg = {
  common: "bg-gray-50 dark:bg-gray-800",
  rare: "bg-blue-50 dark:bg-blue-900/20",
  epic: "bg-purple-50 dark:bg-purple-900/20",
  legendary: "bg-yellow-50 dark:bg-yellow-900/20",
};

export function AchievementBadge({ badge, earned = false, size = "md" }: AchievementBadgeProps) {
  const sizeClasses = {
    sm: "p-2 text-2xl",
    md: "p-3 text-3xl",
    lg: "p-5 text-5xl",
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-1.5 rounded-2xl border-2 transition-all",
        sizeClasses[size],
        rarityColors[badge.rarity],
        rarityBg[badge.rarity],
        !earned && "opacity-40 grayscale",
        earned && "shadow-md"
      )}
      title={badge.description}
    >
      <span className={cn(!earned && "grayscale")}>{badge.icon}</span>
      {size !== "sm" && (
        <div className="text-center">
          <p className="text-xs font-bold text-gray-900 dark:text-white leading-tight">
            {badge.name}
          </p>
          {size === "lg" && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {badge.description}
            </p>
          )}
          <p className="text-[10px] font-medium mt-0.5 capitalize"
            style={{
              color: badge.rarity === "legendary" ? "#F59E0B" :
                     badge.rarity === "epic" ? "#9333EA" :
                     badge.rarity === "rare" ? "#3B82F6" : "#6B7280"
            }}
          >
            {badge.rarity}
          </p>
        </div>
      )}
    </div>
  );
}
