"use client";

import { useState } from "react";
import type { Conversation } from "@/types";
import type { Language } from "@/types";
import { LanguageToggle } from "./LanguageToggle";
import { cn } from "@/lib/utils";
import { Mic } from "lucide-react";

interface RolePlayModeProps {
  conversation: Conversation;
  userRole: string;
}

export function RolePlayMode({ conversation, userRole }: RolePlayModeProps) {
  const [activeLang, setActiveLang] = useState<Language>("en");
  const [currentLine, setCurrentLine] = useState(0);

  const getText = (dialogue: Conversation["dialogues"][0]) => {
    switch (activeLang) {
      case "bn":
        return dialogue.textBN;
      case "ar":
        return dialogue.textAR;
      default:
        return dialogue.textEN;
    }
  };

  const currentDialogue = conversation.dialogues[currentLine];
  const isUserTurn = currentDialogue?.speaker === userRole;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-900 dark:text-white">🎭 Role Play</h3>
        <LanguageToggle active={activeLang} onChange={setActiveLang} size="sm" />
      </div>

      {/* Role indicator */}
      <div className="flex items-center gap-2 mb-4 p-3 bg-primary-50 dark:bg-primary-900/20 rounded-xl">
        <span className="text-lg">🎤</span>
        <span className="text-sm font-medium text-primary-700 dark:text-primary-400">
          Your role: <strong>{userRole}</strong>
        </span>
      </div>

      {currentDialogue && (
        <div className="space-y-3">
          {/* Context */}
          <div className="text-center text-xs text-gray-400 dark:text-gray-500">
            Line {currentLine + 1} of {conversation.dialogues.length}
          </div>

          {/* Current dialogue */}
          <div
            className={cn(
              "p-4 rounded-xl text-center",
              isUserTurn
                ? "bg-primary-50 dark:bg-primary-900/20 border-2 border-primary-200 dark:border-primary-800"
                : "bg-gray-50 dark:bg-gray-700"
            )}
          >
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
              {isUserTurn ? "🎤 YOUR TURN" : `📢 ${currentDialogue.speaker}`}
            </p>
            <p
              className={cn(
                "text-base font-medium text-gray-800 dark:text-gray-200",
                activeLang === "ar" && "font-arabic",
                activeLang === "bn" && "font-bengali"
              )}
            >
              {isUserTurn ? "..." : getText(currentDialogue)}
            </p>
            {isUserTurn && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 italic">
                Hint: &quot;{getText(currentDialogue)}&quot;
              </p>
            )}
          </div>

          {/* Mic button for user turn */}
          {isUserTurn && (
            <div className="flex justify-center">
              <button className="flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-colors">
                <Mic size={18} />
                Tap to speak
              </button>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentLine((l) => Math.max(0, l - 1))}
              disabled={currentLine === 0}
              className="flex-1 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-40 transition-colors"
            >
              ← Back
            </button>
            <button
              onClick={() => setCurrentLine((l) => Math.min(conversation.dialogues.length - 1, l + 1))}
              disabled={currentLine === conversation.dialogues.length - 1}
              className="flex-1 py-2 rounded-lg bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium disabled:opacity-40 transition-colors"
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
