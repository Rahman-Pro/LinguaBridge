"use client";

import { useState } from "react";
import type { Conversation } from "@/types";
import type { Language } from "@/types";
import { LanguageToggle } from "./LanguageToggle";
import { cn } from "@/lib/utils";
import { Volume2 } from "lucide-react";

interface ConversationPlayerProps {
  conversation: Conversation;
}

export function ConversationPlayer({ conversation }: ConversationPlayerProps) {
  const [activeLang, setActiveLang] = useState<Language>("en");

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

  const speakers = Array.from(new Set(conversation.dialogues.map((d) => d.speaker)));

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-xl text-gray-900 dark:text-white">
          {conversation.title}
        </h2>
        <LanguageToggle active={activeLang} onChange={setActiveLang} />
      </div>

      <div className="space-y-3">
        {conversation.dialogues.map((dialogue, i) => {
          const isFirst = speakers[0] === dialogue.speaker;
          return (
            <div
              key={i}
              className={cn(
                "flex gap-3",
                isFirst ? "flex-row" : "flex-row-reverse"
              )}
            >
              <div className="flex-shrink-0 w-9 h-9 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {dialogue.speaker[0]}
              </div>
              <div
                className={cn(
                  "max-w-[75%] rounded-2xl px-4 py-3",
                  isFirst
                    ? "bg-gray-100 dark:bg-gray-700 rounded-tl-sm"
                    : "bg-primary-500 text-white rounded-tr-sm"
                )}
              >
                <p className="text-xs font-semibold opacity-70 mb-1">
                  {dialogue.speaker}
                </p>
                <p
                  className={cn(
                    "text-sm",
                    activeLang === "ar" && "font-arabic text-right",
                    activeLang === "bn" && "font-bengali"
                  )}
                >
                  {getText(dialogue)}
                </p>
                <button className={cn(
                  "mt-1.5 flex items-center gap-1 text-xs opacity-60 hover:opacity-100 transition-opacity",
                  isFirst ? "text-gray-500" : "text-white"
                )}>
                  <Volume2 size={12} />
                  <span>Play</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
