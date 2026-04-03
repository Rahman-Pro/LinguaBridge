"use client";

import { useLanguageContext } from "@/context/LanguageContext";

export function useLanguage() {
  const { language, setLanguage, t, isRTL } = useLanguageContext();

  return {
    language,
    setLanguage,
    t,
    isRTL,
    isBangla: language === "bn",
    isArabic: language === "ar",
    isEnglish: language === "en",
  };
}
