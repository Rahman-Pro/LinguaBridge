"use client";

import { useState } from "react";
import type { MCQQuestion } from "@/types";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle } from "lucide-react";

interface MCQQuestionProps {
  question: MCQQuestion;
  onAnswer: (correct: boolean, xp: number) => void;
}

export function MCQQuestionComponent({ question, onAnswer }: MCQQuestionProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  const handleSelect = (option: string) => {
    if (revealed) return;
    setSelected(option);
    setRevealed(true);
    const correct = option === question.correctAnswer;
    onAnswer(correct, correct ? question.xpReward : 0);
  };

  return (
    <div className="space-y-4">
      <p className="text-lg font-semibold text-gray-900 dark:text-white">
        {question.question}
      </p>

      <div className="grid grid-cols-1 gap-2">
        {question.options.map((option) => {
          const isSelected = selected === option;
          const isCorrect = option === question.correctAnswer;

          return (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              disabled={revealed}
              className={cn(
                "w-full text-left px-4 py-3 rounded-xl border-2 transition-all font-medium text-sm",
                !revealed && "hover:border-primary-300 hover:bg-primary-50 dark:hover:bg-primary-900/20",
                !revealed && "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800",
                revealed && isCorrect && "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400",
                revealed && isSelected && !isCorrect && "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400",
                revealed && !isSelected && !isCorrect && "border-gray-100 dark:border-gray-700 opacity-50"
              )}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {revealed && isCorrect && <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />}
                {revealed && isSelected && !isCorrect && <XCircle size={18} className="text-red-500 flex-shrink-0" />}
              </div>
            </button>
          );
        })}
      </div>

      {revealed && (
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
          <p className="text-sm text-blue-700 dark:text-blue-400">
            💡 <strong>Explanation:</strong> {question.explanation}
          </p>
        </div>
      )}
    </div>
  );
}
