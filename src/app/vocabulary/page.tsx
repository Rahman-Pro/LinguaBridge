"use client";

import { useState, useMemo } from "react";
import { WordCard } from "@/components/vocabulary/WordCard";
import { CategoryFilter } from "@/components/vocabulary/CategoryFilter";
import { LevelFilter } from "@/components/vocabulary/LevelFilter";
import { beginnerWords } from "@/data/vocabulary/beginner";
import { intermediateWords } from "@/data/vocabulary/intermediate";
import { advancedWords } from "@/data/vocabulary/advanced";
import type { CategoryType, VocabularyWord } from "@/types";
import { Search, LayoutGrid, List } from "lucide-react";
import { cn } from "@/lib/utils";

const allWords = [...beginnerWords, ...intermediateWords, ...advancedWords];

type Level = "all" | "beginner" | "intermediate" | "advanced";

export default function VocabularyPage() {
  const [level, setLevel] = useState<Level>("all");
  const [category, setCategory] = useState<CategoryType | "all">("all");
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered = useMemo(() => {
    return allWords.filter((w: VocabularyWord) => {
      const matchLevel = level === "all" || w.level === level;
      const matchCategory = category === "all" || w.categories.includes(category);
      const matchSearch =
        !search ||
        w.word.toLowerCase().includes(search.toLowerCase()) ||
        w.meaningBN.includes(search) ||
        w.meaningAR.includes(search);
      return matchLevel && matchCategory && matchSearch;
    });
  }, [level, category, search]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
          📚 Vocabulary
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          {allWords.length}+ words in English, Bangla & Arabic
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search words in English, Bangla or Arabic..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:border-primary-500 outline-none transition-colors"
        />
      </div>

      {/* Filters */}
      <div className="space-y-3 mb-5">
        <LevelFilter selected={level} onChange={setLevel} />
        <CategoryFilter selected={category} onChange={setCategory} />
      </div>

      {/* Results header */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {filtered.length} words found
        </p>
        <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          <button
            onClick={() => setView("grid")}
            className={cn(
              "p-1.5 rounded-md transition-colors",
              view === "grid"
                ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                : "text-gray-400"
            )}
          >
            <LayoutGrid size={16} />
          </button>
          <button
            onClick={() => setView("list")}
            className={cn(
              "p-1.5 rounded-md transition-colors",
              view === "list"
                ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                : "text-gray-400"
            )}
          >
            <List size={16} />
          </button>
        </div>
      </div>

      {/* Word Grid */}
      {filtered.length > 0 ? (
        <div
          className={cn(
            view === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              : "space-y-3"
          )}
        >
          {filtered.map((word) => (
            <WordCard key={word.id} word={word} compact={view === "list"} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-5xl mb-4">🔍</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            No words found
          </p>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Try adjusting your filters or search term
          </p>
        </div>
      )}
    </div>
  );
}
