"use client";

import { useState, useCallback } from "react";
import type { Conversation } from "@/types";
import type { Language } from "@/types";
import { LanguageToggle } from "./LanguageToggle";
import { cn } from "@/lib/utils";
import { Volume2 } from "lucide-react";
import { SpeakButton } from "@/components/ui/SpeakButton";
import { LANG_MAP, SPEECH_DEFAULTS } from "@/lib/speech";

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

  const handlePlayAll = useCallback(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();

    const lang = activeLang as "en" | "bn" | "ar";
    const langCode = LANG_MAP[lang] || "en-US";
    let index = 0;

    const getDialogueText = (dialogue: Conversation["dialogues"][0]) => {
      switch (lang) {
        case "bn": return dialogue.textBN;
        case "ar": return dialogue.textAR;
        default: return dialogue.textEN;
      }
    };

    const speakNext = () => {
      if (index >= conversation.dialogues.length) return;
      const dialogue = conversation.dialogues[index];
      const text = getDialogueText(dialogue);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = langCode;
      utterance.rate = SPEECH_DEFAULTS.rate;
      utterance.pitch = SPEECH_DEFAULTS.pitch;
      utterance.volume = SPEECH_DEFAULTS.volume;
      utterance.onend = () => {
        index++;
        speakNext();
      };
      window.speechSynthesis.speak(utterance);
    };

    speakNext();
  }, [activeLang, conversation.dialogues]);

  const speakers = Array.from(new Set(conversation.dialogues.map((d) => d.speaker)));

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-xl text-gray-900 dark:text-white">
          {conversation.title}
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePlayAll}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary-500 hover:bg-secondary-600 text-white rounded-lg text-xs font-medium transition-colors"
          >
            <Volume2 size={14} />
            Play All
          </button>
          <LanguageToggle active={activeLang} onChange={setActiveLang} />
        </div>
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
                <SpeakButton
                  text={getText(dialogue)}
                  lang={activeLang as "en" | "bn" | "ar"}
                  size="sm"
                  variant="button"
                  label="Play"
                  className={cn(
                    "mt-1.5 !px-2 !py-0.5 text-xs",
                    isFirst
                      ? "!bg-transparent !text-gray-500 hover:!bg-gray-200 dark:hover:!bg-gray-600"
                      : "!bg-white/20 !text-white hover:!bg-white/30"
                  )}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
