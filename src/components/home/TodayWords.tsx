"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { beginnerWords } from "@/data/vocabulary/beginner";
import { useLanguage } from "@/hooks/useLanguage";
import { ChevronLeft, ChevronRight } from "lucide-react";

const todayWords = beginnerWords.slice(0, 10);

export function TodayWords() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { language } = useLanguage();

  const word = todayWords[currentIndex];

  const meaning =
    language === "bn"
      ? word.meaningBN
      : language === "ar"
      ? word.meaningAR
      : word.meaningBN;

  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900 dark:text-white">
            📖 Today&apos;s 10 Words
          </h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {currentIndex + 1} / {todayWords.length}
          </span>
        </div>

        {/* Word Card */}
        <div className="bg-gradient-to-br from-secondary-50 to-primary-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-4 mb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <Link href={`/vocabulary/${word.id}`}>
                <h4 className="text-2xl font-black text-gray-900 dark:text-white hover:text-primary-600 transition-colors">
                  {word.word}
                </h4>
              </Link>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                {word.pronunciation}
              </p>
              <p
                className={`mt-2 font-semibold text-gray-700 dark:text-gray-300 ${
                  language === "ar" ? "font-arabic text-right" : language === "bn" ? "font-bengali" : ""
                }`}
              >
                {meaning}
              </p>
            </div>
            <Badge variant={word.level as "beginner" | "intermediate" | "advanced"} size="sm">
              {word.partOfSpeech}
            </Badge>
          </div>

          {/* Example */}
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 italic border-t border-gray-200 dark:border-gray-600 pt-2">
            &quot;{word.exampleSentence}&quot;
          </p>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
            disabled={currentIndex === 0}
            className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40 transition-colors"
          >
            <ChevronLeft size={16} />
            Prev
          </button>

          {/* Dots */}
          <div className="flex items-center gap-1">
            {todayWords.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  i === currentIndex
                    ? "bg-primary-500"
                    : "bg-gray-200 dark:bg-gray-700"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentIndex((i) => Math.min(todayWords.length - 1, i + 1))}
            disabled={currentIndex === todayWords.length - 1}
            className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40 transition-colors"
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
