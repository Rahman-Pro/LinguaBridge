"use client";

import { useState } from "react";
import type { SpellingQuestion } from "@/types";
import { cn } from "@/lib/utils";
import { Volume2, CheckCircle2, XCircle } from "lucide-react";
import { useSpeech } from "@/hooks/useSpeech";

interface SpellingTestProps {
  question: SpellingQuestion;
  onAnswer: (correct: boolean, xp: number) => void;
}

export function SpellingTestComponent({ question, onAnswer }: SpellingTestProps) {
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showWord, setShowWord] = useState(false);
  const { speak, isSpeaking } = useSpeech();

  const handleSubmit = () => {
    if (!answer.trim()) return;
    const correct = answer.trim().toLowerCase() === question.word.toLowerCase();
    setIsCorrect(correct);
    setSubmitted(true);
    onAnswer(correct, correct ? question.xpReward : 0);
  };

  return (
    <div className="space-y-5">
      {/* Audio hint area */}
      <div className="flex flex-col items-center gap-3 p-6 bg-gray-50 dark:bg-gray-700 rounded-2xl">
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          🎧 Listen to the word and type the correct spelling
        </p>
        <button
          onClick={() => speak(question.word, "en")}
          className={cn(
            "flex items-center gap-2 px-6 py-3 bg-secondary-500 hover:bg-secondary-600 text-white rounded-xl font-medium transition-colors",
            isSpeaking && "animate-pulse"
          )}
        >
          <Volume2 size={20} />
          {isSpeaking ? "Speaking…" : "Play Word"}
        </button>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Hint: {question.hint}
        </p>
        {submitted && (
          <button
            onClick={() => setShowWord(!showWord)}
            className="text-sm text-primary-600 dark:text-primary-400 underline"
          >
            {showWord ? "Hide" : "Show"} word
          </button>
        )}
        {showWord && (
          <p className="text-2xl font-black text-gray-900 dark:text-white">
            {question.word}
          </p>
        )}
      </div>

      {/* Input */}
      {!submitted ? (
        <div className="flex gap-2">
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="Type the spelling..."
            className="flex-1 px-4 py-2.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-primary-500 outline-none transition-colors text-lg font-mono"
          />
          <button
            onClick={handleSubmit}
            className="px-5 py-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-medium transition-colors"
          >
            Check
          </button>
        </div>
      ) : (
        <div className={cn(
          "flex items-center gap-3 p-4 rounded-xl",
          isCorrect
            ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
            : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
        )}>
          {isCorrect ? (
            <CheckCircle2 size={24} className="text-green-500 flex-shrink-0" />
          ) : (
            <XCircle size={24} className="text-red-500 flex-shrink-0" />
          )}
          <div>
            <p className={cn(
              "font-bold text-lg",
              isCorrect ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"
            )}>
              {isCorrect ? "Perfect spelling! 🎉" : `Incorrect. The correct spelling is:`}
            </p>
            {!isCorrect && (
              <p className="text-xl font-black text-gray-900 dark:text-white mt-1">
                {question.word}
              </p>
            )}
            {isCorrect && (
              <p className="text-sm text-green-600 dark:text-green-500">
                +{question.xpReward} XP earned!
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
