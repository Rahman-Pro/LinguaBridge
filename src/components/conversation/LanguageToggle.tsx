"use client";

import type { Language } from "@/types";
import { LANGUAGES } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface LanguageToggleProps {
  active: Language;
  onChange: (lang: Language) => void;
  size?: "sm" | "md";
}

export function LanguageToggle({ active, onChange, size = "md" }: LanguageToggleProps) {
  return (
    <div className="flex items-center gap-0.5 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          onClick={() => onChange(lang.code)}
          className={cn(
            "rounded-lg font-medium transition-all",
            size === "sm" ? "px-2 py-1 text-xs" : "px-3 py-1.5 text-sm",
            active === lang.code
              ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white"
          )}
        >
          {lang.flag} {lang.code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
