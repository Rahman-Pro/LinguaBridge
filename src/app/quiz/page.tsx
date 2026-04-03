"use client";

import { useState } from "react";
import { quizQuestions } from "@/data/quizzes";
import { MCQQuestionComponent } from "@/components/quiz/MCQQuestion";
import { FillBlanksComponent } from "@/components/quiz/FillBlanks";
import { SpellingTestComponent } from "@/components/quiz/SpellingTest";
import { MatchWordsComponent } from "@/components/quiz/MatchWords";
import type { QuizQuestion } from "@/types";
import { cn, getDifficultyColor } from "@/lib/utils";
import { useXP } from "@/hooks/useXP";
import { useUserContext } from "@/context/UserContext";

const quizTypes = [
  { id: "all", label: "All Types", emoji: "🎯" },
  { id: "mcq", label: "MCQ", emoji: "✅" },
  { id: "fill_blanks", label: "Fill Blanks", emoji: "✏️" },
  { id: "spelling", label: "Spelling", emoji: "🔤" },
  { id: "matching", label: "Matching", emoji: "🔗" },
];

export default function QuizPage() {
  const [selectedType, setSelectedType] = useState("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [totalXP, setTotalXP] = useState(0);
  const { addXP } = useUserContext();
  const { awardXP } = useXP();

  const filtered = quizQuestions.filter(
    (q) => selectedType === "all" || q.type === selectedType
  );

  const currentQuestion = filtered[currentIndex];

  const handleAnswer = (correct: boolean, xp: number) => {
    setAnswered((a) => a + 1);
    if (correct) {
      setScore((s) => s + 1);
      setTotalXP((t) => t + xp);
      addXP(xp);
    }
  };

  const handleNext = () => {
    if (currentIndex < filtered.length - 1) {
      setCurrentIndex((i) => i + 1);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setScore(0);
    setAnswered(0);
    setTotalXP(0);
  };

  const isFinished = answered === filtered.length;
  const accuracy = answered > 0 ? Math.round((score / answered) * 100) : 0;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
          🧠 Smart Quiz
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Test your knowledge with 4 different question types
        </p>
      </div>

      {/* Type Filter */}
      <div className="flex gap-2 flex-wrap mb-5">
        {quizTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => {
              setSelectedType(type.id);
              setCurrentIndex(0);
              setScore(0);
              setAnswered(0);
              setTotalXP(0);
            }}
            className={cn(
              "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
              selectedType === type.id
                ? "bg-primary-500 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            )}
          >
            {type.emoji} {type.label}
          </button>
        ))}
      </div>

      {/* Score Bar */}
      <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 mb-5">
        <div className="flex-1 flex items-center gap-4">
          <div className="text-center">
            <div className="text-2xl font-black text-primary-600 dark:text-primary-400">{score}</div>
            <div className="text-xs text-gray-400">Correct</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-gray-600 dark:text-gray-400">{answered}</div>
            <div className="text-xs text-gray-400">Answered</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-accent-600 dark:text-accent-400">{accuracy}%</div>
            <div className="text-xs text-gray-400">Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-yellow-600 dark:text-yellow-400">+{totalXP}</div>
            <div className="text-xs text-gray-400">XP Earned</div>
          </div>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {currentIndex + 1} / {filtered.length}
        </div>
      </div>

      {/* Quiz Card */}
      {!isFinished && currentQuestion ? (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
          {/* Question header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg">
                {currentQuestion.type === "mcq" && "✅ MCQ"}
                {currentQuestion.type === "fill_blanks" && "✏️ Fill Blanks"}
                {currentQuestion.type === "spelling" && "🔤 Spelling"}
                {currentQuestion.type === "matching" && "🔗 Matching"}
              </span>
              <span className={cn(
                "text-xs font-medium px-2 py-0.5 rounded-full",
                getDifficultyColor(currentQuestion.difficulty)
              )}>
                {currentQuestion.difficulty}
              </span>
            </div>
            <span className="text-sm text-yellow-600 dark:text-yellow-400 font-medium">
              +{currentQuestion.xpReward} XP
            </span>
          </div>

          {/* Question Component */}
          {currentQuestion.type === "mcq" && (
            <MCQQuestionComponent
              question={currentQuestion}
              onAnswer={handleAnswer}
            />
          )}
          {currentQuestion.type === "fill_blanks" && (
            <FillBlanksComponent
              question={currentQuestion}
              onAnswer={handleAnswer}
            />
          )}
          {currentQuestion.type === "spelling" && (
            <SpellingTestComponent
              question={currentQuestion}
              onAnswer={handleAnswer}
            />
          )}
          {currentQuestion.type === "matching" && (
            <MatchWordsComponent
              question={currentQuestion}
              onAnswer={handleAnswer}
            />
          )}

          {/* Next button */}
          {answered > currentIndex && (
            <div className="mt-5 flex justify-end">
              <button
                onClick={handleNext}
                className="px-6 py-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-medium transition-colors"
              >
                {currentIndex < filtered.length - 1 ? "Next Question →" : "See Results"}
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Results Screen */
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-8 text-center">
          <div className="text-6xl mb-4">
            {accuracy >= 80 ? "🏆" : accuracy >= 60 ? "⭐" : "📚"}
          </div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">
            Quiz Complete!
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            You scored {score} out of {filtered.length} ({accuracy}%)
          </p>
          <div className="flex items-center justify-center gap-6 mb-6">
            <div>
              <div className="text-3xl font-black text-primary-600 dark:text-primary-400">{score}/{filtered.length}</div>
              <div className="text-sm text-gray-400">Score</div>
            </div>
            <div>
              <div className="text-3xl font-black text-yellow-600 dark:text-yellow-400">+{totalXP}</div>
              <div className="text-sm text-gray-400">XP Earned</div>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-semibold transition-colors"
          >
            Try Again 🔄
          </button>
        </div>
      )}
    </div>
  );
}
