import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { CEFRLevel, UserProgress } from "@/types";
import { CEFR_LEVELS, XP_THRESHOLDS } from "./constants";

// Tailwind class merging utility
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Get CEFR level from XP
export function getCEFRLevel(xp: number): CEFRLevel {
  for (const lvl of CEFR_LEVELS) {
    if (xp >= lvl.minXP && xp < lvl.maxXP) {
      return lvl.level;
    }
  }
  return "C2";
}

// Get level number from XP
export function getLevelFromXP(xp: number): number {
  for (let i = 0; i < XP_THRESHOLDS.length - 1; i++) {
    if (xp < XP_THRESHOLDS[i + 1]) {
      return i + 1;
    }
  }
  return 50;
}

// Get XP needed for next level
export function getXPForNextLevel(currentLevel: number): number {
  if (currentLevel >= 50) return XP_THRESHOLDS[49];
  return XP_THRESHOLDS[currentLevel];
}

// Format number with K suffix
export function formatNumber(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toString();
}

// Get percentage progress to next level
export function getLevelProgress(xp: number, level: number): number {
  const currentThreshold = XP_THRESHOLDS[level - 1] || 0;
  const nextThreshold = XP_THRESHOLDS[level] || XP_THRESHOLDS[49];
  const progress = ((xp - currentThreshold) / (nextThreshold - currentThreshold)) * 100;
  return Math.min(Math.max(progress, 0), 100);
}

// Format date for display
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// Check if today
export function isToday(dateStr: string): boolean {
  const today = new Date().toDateString();
  const date = new Date(dateStr).toDateString();
  return today === date;
}

// Check if yesterday
export function isYesterday(dateStr: string): boolean {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toDateString() === new Date(dateStr).toDateString();
}

// Get day of week short name
export function getDayShort(dayIndex: number): string {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[dayIndex % 7];
}

// Calculate category score percentage
export function getCategoryScorePercent(
  progress: UserProgress,
  category: keyof UserProgress["categoryScores"]
): number {
  return Math.min(progress.categoryScores[category] || 0, 100);
}

// Get difficulty color
export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case "easy":
      return "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400";
    case "medium":
      return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400";
    case "hard":
      return "text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400";
    default:
      return "text-gray-600 bg-gray-100 dark:bg-gray-900/30 dark:text-gray-400";
  }
}

// Get level badge color
export function getLevelBadgeColor(level: string): string {
  switch (level) {
    case "beginner":
      return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
    case "intermediate":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
    case "advanced":
      return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
    default:
      return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
  }
}

// Shuffle array (for quiz randomization)
export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Truncate text
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}
