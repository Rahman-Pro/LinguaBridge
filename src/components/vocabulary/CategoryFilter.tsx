"use client";

import { CATEGORIES } from "@/lib/constants";
import type { CategoryType } from "@/types";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  selected: CategoryType | "all";
  onChange: (category: CategoryType | "all") => void;
}

export function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange("all")}
        className={cn(
          "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
          selected === "all"
            ? "bg-primary-500 text-white"
            : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
        )}
      >
        🌐 All Categories
      </button>
      {CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          className={cn(
            "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
            selected === cat.id
              ? "bg-primary-500 text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
          )}
        >
          {cat.emoji} {cat.label}
        </button>
      ))}
    </div>
  );
}
