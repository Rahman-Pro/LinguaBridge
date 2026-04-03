"use client";

import { useState, useRef } from "react";
import type { Conversation } from "@/types";
import type { Language } from "@/types";
import { LanguageToggle } from "./LanguageToggle";
import { cn } from "@/lib/utils";
import { Volume2, PlayCircle, StopCircle } from "lucide-react";
import { useSpeech } from "@/hooks/useSpeech";

/** Pause (ms) between dialogue lines when playing the full conversation */
const DIALOGUE_PAUSE_MS = 400;

interface ConversationPlayerProps {
  conversation: Conversation;
}

export function ConversationPlayer({ conversation }: ConversationPlayerProps) {
  const [activeLang, setActiveLang] = useState<Language>("en");
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [playingAll, setPlayingAll] = useState(false);
  const stopAllRef = useRef(false);
  const { speak, stop } = useSpeech();

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

  const handlePlayLine = (text: string, index: number) => {
    if (playingIndex === index) {
      stop();
      setPlayingIndex(null);
      return;
    }
    stop();
    setPlayingIndex(index);
    speak(text, activeLang, () => setPlayingIndex((prev) => (prev === index ? null : prev)));
  };

  /** Play all dialogues sequentially using onEnd callbacks */
  const playSequential = (index: number) => {
    if (stopAllRef.current || index >= conversation.dialogues.length) {
      setPlayingAll(false);
      setPlayingIndex(null);
      return;
    }
    const text = getText(conversation.dialogues[index]);
    setPlayingIndex(index);
    speak(text, activeLang, () => {
      if (stopAllRef.current) {
        setPlayingAll(false);
        setPlayingIndex(null);
        return;
      }
      setTimeout(() => playSequential(index + 1), DIALOGUE_PAUSE_MS);
    });
  };

  const handlePlayAll = () => {
    if (playingAll) {
      stop();
      setPlayingAll(false);
      stopAllRef.current = true;
      setPlayingIndex(null);
      return;
    }
    stopAllRef.current = false;
    setPlayingAll(true);
    playSequential(0);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-xl text-gray-900 dark:text-white">
          {conversation.title}
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePlayAll}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-colors",
              playingAll
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-primary-500 hover:bg-primary-600 text-white"
            )}
          >
            {playingAll ? <StopCircle size={15} /> : <PlayCircle size={15} />}
            {playingAll ? "Stop" : "Play All"}
          </button>
          <LanguageToggle active={activeLang} onChange={setActiveLang} />
        </div>
      </div>

      <div className="space-y-3">
        {conversation.dialogues.map((dialogue, i) => {
          const isFirst = speakers[0] === dialogue.speaker;
          const isPlaying = playingIndex === i;
          const text = getText(dialogue);
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
                  {text}
                </p>
                <button
                  onClick={() => handlePlayLine(text, i)}
                  className={cn(
                    "mt-1.5 flex items-center gap-1 text-xs transition-opacity",
                    isFirst ? "text-gray-500" : "text-white",
                    isPlaying ? "opacity-100" : "opacity-60 hover:opacity-100"
                  )}
                >
                  <Volume2 size={12} className={isPlaying ? "animate-pulse" : ""} />
                  <span>{isPlaying ? "Stop" : "Play"}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
