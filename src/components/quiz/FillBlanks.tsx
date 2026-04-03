"use client";

import { useState } from "react";
import type { FillBlanksQuestion } from "@/types";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle } from "lucide-react";

interface FillBlanksProps {
  question: FillBlanksQuestion;
  onAnswer: (correct: boolean, xp: number) => void;
}

export function FillBlanksComponent({ question, onAnswer }: FillBlanksProps) {
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = () => {
    if (!answer.trim()) return;
    const correct = question.correctAnswers.some(
      (ans) => ans.toLowerCase() === answer.trim().toLowerCase()
    );
    setIsCorrect(correct);
    setSubmitted(true);
    onAnswer(correct, correct ? question.xpReward : 0);
  };

  const sentenceParts = question.sentence.split("_____");

  return (
    <div className="space-y-4">
      {/* Sentence Display */}
      <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
        <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
          {sentenceParts[0]}
          <span className={cn(
            "inline-block min-w-[120px] px-3 py-1 rounded-lg border-b-2 mx-1 font-semibold",
            !submitted && "border-primary-500 bg-primary-50 dark:bg-primary-900/20",
            submitted && isCorrect && "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400",
            submitted && !isCorrect && "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400"
          )}>
            {submitted ? (isCorrect ? answer : `${answer} ✗`) : answer || "_____"}
          </span>
          {sentenceParts[1]}
        </p>
      </div>

      {/* Input */}
      {!submitted && (
        <div className="flex gap-2">
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="Type your answer..."
            className="flex-1 px-4 py-2.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-primary-500 outline-none transition-colors"
          />
          <button
            onClick={handleSubmit}
            className="px-5 py-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-medium transition-colors"
          >
            Check
          </button>
        </div>
      )}

      {/* Hint */}
      {question.hint && !submitted && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Hint: {question.hint}
        </p>
      )}

      {/* Result */}
      {submitted && (
        <div className={cn(
          "flex items-center gap-2 p-3 rounded-xl",
          isCorrect
            ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
            : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400"
        )}>
          {isCorrect ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
          <span className="text-sm font-medium">
            {isCorrect
              ? `Correct! +${question.xpReward} XP`
              : `Correct answer: ${question.correctAnswers[0]}`}
          </span>
        </div>
      )}
    </div>
  );
}
