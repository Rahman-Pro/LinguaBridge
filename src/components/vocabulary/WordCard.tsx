"use client";

import Link from "next/link";
import type { VocabularyWord } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { SpeakButton } from "@/components/ui/SpeakButton";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";

interface WordCardProps {
  word: VocabularyWord;
  compact?: boolean;
}

export function WordCard({ word, compact = false }: WordCardProps) {
  const { language } = useLanguage();

  const meaning =
    language === "bn"
      ? word.meaningBN
      : language === "ar"
      ? word.meaningAR
      : `${word.meaningBN} / ${word.meaningAR}`;

  return (
    <Link href={`/vocabulary/${word.id}`}>
      <div className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">
              {word.word}
            </h3>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              {word.pronunciation}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <Badge variant={word.level as "beginner" | "intermediate" | "advanced"} size="sm">
              {word.level}
            </Badge>
            <Badge variant="default" size="sm">
              {word.partOfSpeech}
            </Badge>
            <SpeakButton text={word.word} lang="en" size="sm" />
          </div>
        </div>

        {/* Meaning */}
        <div
          className={cn(
            "mt-2 text-sm font-medium text-gray-700 dark:text-gray-300",
            language === "ar" && "font-arabic text-right",
            language === "bn" && "font-bengali"
          )}
        >
          {meaning}
        </div>

        {!compact && (
          <>
            {/* Example */}
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 italic line-clamp-2">
              &quot;{word.exampleSentence}&quot;
            </p>

            {/* Categories */}
            <div className="flex flex-wrap gap-1 mt-3">
              {word.categories.slice(0, 2).map((cat) => (
                <span
                  key={cat}
                  className="text-[10px] bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded-full"
                >
                  {cat.replace("_", " ")}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    </Link>
  );
}
