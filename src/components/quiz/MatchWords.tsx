"use client";

import { useState, useEffect } from "react";
import type { MatchingQuestion } from "@/types";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";
import { shuffleArray } from "@/lib/utils";

interface MatchWordsProps {
  question: MatchingQuestion;
  onAnswer: (correct: boolean, xp: number) => void;
}

export function MatchWordsComponent({ question, onAnswer }: MatchWordsProps) {
  const [shuffledTargets, setShuffledTargets] = useState<string[]>([]);
  const [selectedEnglish, setSelectedEnglish] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [completed, setCompleted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    setShuffledTargets(shuffleArray(question.pairs.map((p) => p.target)));
  }, [question]);

  const handleEnglishClick = (english: string) => {
    if (completed || matches[english]) return;
    setSelectedEnglish(english === selectedEnglish ? null : english);
  };

  const handleTargetClick = (target: string) => {
    if (completed || !selectedEnglish) return;
    if (Object.values(matches).includes(target)) return;

    const newMatches = { ...matches, [selectedEnglish]: target };
    setMatches(newMatches);
    setSelectedEnglish(null);

    if (Object.keys(newMatches).length === question.pairs.length) {
      const allCorrect = question.pairs.every(
        (pair) => newMatches[pair.english] === pair.target
      );
      setIsCorrect(allCorrect);
      setCompleted(true);
      onAnswer(allCorrect, allCorrect ? question.xpReward : Math.floor(question.xpReward / 2));
    }
  };

  const getMatchStatus = (english: string) => {
    if (!matches[english]) return "unmatched";
    const pair = question.pairs.find((p) => p.english === english);
    if (completed) {
      return matches[english] === pair?.target ? "correct" : "wrong";
    }
    return "matched";
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
        {question.language === "bn" ? "🇧🇩" : "🇸🇦"} Match English with{" "}
        {question.language === "bn" ? "Bangla" : "Arabic"}
      </p>

      <div className="grid grid-cols-2 gap-3">
        {/* English column */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-center text-gray-400 dark:text-gray-500 uppercase">English</p>
          {question.pairs.map((pair) => {
            const status = getMatchStatus(pair.english);
            return (
              <button
                key={pair.english}
                onClick={() => handleEnglishClick(pair.english)}
                disabled={completed || !!matches[pair.english]}
                className={cn(
                  "w-full px-3 py-2.5 rounded-xl text-sm font-medium border-2 transition-all",
                  status === "unmatched" && selectedEnglish !== pair.english
                    ? "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-primary-300"
                    : "",
                  selectedEnglish === pair.english
                    ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                    : "",
                  status === "matched"
                    ? "border-accent-400 bg-accent-50 dark:bg-accent-900/20 text-accent-700 dark:text-accent-400"
                    : "",
                  status === "correct"
                    ? "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                    : "",
                  status === "wrong"
                    ? "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400"
                    : ""
                )}
              >
                {pair.english}
                {status === "correct" && <CheckCircle2 size={14} className="inline ml-1" />}
              </button>
            );
          })}
        </div>

        {/* Target column */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-center text-gray-400 dark:text-gray-500 uppercase">
            {question.language === "bn" ? "Bangla" : "Arabic"}
          </p>
          {shuffledTargets.map((target) => {
            const isMatched = Object.values(matches).includes(target);
            const matchedEnglish = Object.entries(matches).find(([, t]) => t === target)?.[0];
            const pair = question.pairs.find((p) => p.english === matchedEnglish);
            const isCorrectMatch = completed && pair?.target === target;
            const isWrongMatch = completed && matchedEnglish && pair?.target !== target;

            return (
              <button
                key={target}
                onClick={() => handleTargetClick(target)}
                disabled={completed || isMatched}
                className={cn(
                  "w-full px-3 py-2.5 rounded-xl text-sm font-medium border-2 transition-all",
                  question.language === "ar" && "font-arabic",
                  !isMatched && selectedEnglish
                    ? "border-secondary-300 bg-secondary-50 dark:bg-secondary-900/20 hover:border-secondary-500"
                    : "",
                  !isMatched && !selectedEnglish
                    ? "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                    : "",
                  isMatched && !completed
                    ? "border-accent-400 bg-accent-50 dark:bg-accent-900/20 opacity-60"
                    : "",
                  isCorrectMatch
                    ? "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                    : "",
                  isWrongMatch
                    ? "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400"
                    : ""
                )}
              >
                {target}
              </button>
            );
          })}
        </div>
      </div>

      {completed && (
        <div className={cn(
          "p-3 rounded-xl text-center",
          isCorrect
            ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
            : "bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400"
        )}>
          <p className="font-bold">
            {isCorrect ? "🎉 Perfect match!" : "⭐ Good try! Review the correct pairs."}
          </p>
          <p className="text-sm mt-0.5">+{isCorrect ? question.xpReward : Math.floor(question.xpReward / 2)} XP earned</p>
        </div>
      )}
    </div>
  );
}
