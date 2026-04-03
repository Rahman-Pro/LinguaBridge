"use client";

export const LANG_MAP: Record<string, string> = {
  en: "en-US",
  bn: "bn-BD",
  ar: "ar-SA",
};

export const SPEECH_DEFAULTS = {
  rate: 0.85,
  pitch: 1,
  volume: 1,
} as const;

export function speak(
  text: string,
  lang: "en" | "bn" | "ar" = "en",
  onEnd?: () => void,
  onError?: () => void
) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = LANG_MAP[lang] || "en-US";
  utterance.rate = SPEECH_DEFAULTS.rate;
  utterance.pitch = SPEECH_DEFAULTS.pitch;
  utterance.volume = SPEECH_DEFAULTS.volume;

  if (onEnd) utterance.onend = onEnd;
  if (onError) utterance.onerror = onError;

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
}
