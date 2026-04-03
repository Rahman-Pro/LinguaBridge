"use client";

import { useState, useCallback } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { speak, stopSpeaking } from "@/lib/speech";
import { cn } from "@/lib/utils";

interface SpeakButtonProps {
  text: string;
  lang?: "en" | "bn" | "ar";
  size?: "sm" | "md" | "lg";
  className?: string;
  variant?: "icon" | "button";
  label?: string;
}

export function SpeakButton({
  text,
  lang = "en",
  size = "md",
  className,
  variant = "icon",
  label,
}: SpeakButtonProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (isSpeaking) {
        stopSpeaking();
        setIsSpeaking(false);
        return;
      }

      setIsSpeaking(true);
      speak(
        text,
        lang,
        () => setIsSpeaking(false),
        () => setIsSpeaking(false)
      );
    },
    [text, lang, isSpeaking]
  );

  const iconSize = size === "sm" ? 12 : size === "lg" ? 24 : 18;

  if (variant === "button") {
    return (
      <button
        onClick={handleClick}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all",
          isSpeaking
            ? "bg-red-500 hover:bg-red-600 text-white"
            : "bg-secondary-500 hover:bg-secondary-600 text-white",
          className
        )}
      >
        {isSpeaking ? <VolumeX size={iconSize} /> : <Volume2 size={iconSize} />}
        {label || (isSpeaking ? "Stop" : "Play")}
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        "p-1.5 rounded-lg transition-all",
        isSpeaking
          ? "text-red-500 bg-red-50 dark:bg-red-900/20 animate-pulse"
          : "text-gray-400 hover:text-primary-500 hover:bg-gray-100 dark:hover:bg-gray-700",
        className
      )}
      title={isSpeaking ? "Stop" : `Listen to "${text}"`}
    >
      {isSpeaking ? <VolumeX size={iconSize} /> : <Volume2 size={iconSize} />}
    </button>
  );
}
