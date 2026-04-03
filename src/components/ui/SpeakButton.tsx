"use client";

import { Volume2 } from "lucide-react";
import { useSpeech } from "@/hooks/useSpeech";
import type { Language } from "@/types";
import { cn } from "@/lib/utils";

interface SpeakButtonProps {
  text: string;
  language?: Language;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: { icon: 12, padding: "p-1" },
  md: { icon: 16, padding: "p-1.5" },
  lg: { icon: 20, padding: "p-2" },
};

export function SpeakButton({ text, language = "en", size = "md", className }: SpeakButtonProps) {
  const { speak, stop, isSpeaking } = useSpeech();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSpeaking) {
      stop();
    } else {
      speak(text, language);
    }
  };

  const { icon, padding } = sizeMap[size];

  return (
    <button
      onClick={handleClick}
      title={isSpeaking ? "Stop" : "Play pronunciation"}
      className={cn(
        padding,
        "rounded-lg transition-colors focus:outline-none",
        isSpeaking
          ? "text-primary-500 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 animate-pulse"
          : "text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-700",
        className
      )}
    >
      <Volume2 size={icon} />
    </button>
  );
}
