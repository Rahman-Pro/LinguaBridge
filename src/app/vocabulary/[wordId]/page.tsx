"use client";

import { useParams, useRouter } from "next/navigation";
import { beginnerWords } from "@/data/vocabulary/beginner";
import { intermediateWords } from "@/data/vocabulary/intermediate";
import { advancedWords } from "@/data/vocabulary/advanced";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/hooks/useLanguage";
import { LanguageToggle } from "@/components/conversation/LanguageToggle";
import { useState } from "react";
import type { Language } from "@/types";
import { ChevronLeft, ChevronRight, Star, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { SpeakButton } from "@/components/ui/SpeakButton";

const allWords = [...beginnerWords, ...intermediateWords, ...advancedWords];

export default function WordDetailPage() {
  const params = useParams();
  const router = useRouter();
  const wordId = params.wordId as string;
  const [activeLang, setActiveLang] = useState<Language>("en");
  const [favorited, setFavorited] = useState(false);

  const wordIndex = allWords.findIndex((w) => w.id === wordId);
  const word = allWords[wordIndex];

  if (!word) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-5xl mb-4">🔍</p>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Word not found</h1>
        <Link href="/vocabulary">
          <Button variant="primary" className="mt-4">← Back to Vocabulary</Button>
        </Link>
      </div>
    );
  }

  const meaning =
    activeLang === "bn" ? word.meaningBN : activeLang === "ar" ? word.meaningAR : `${word.meaningBN} / ${word.meaningAR}`;
  const example =
    activeLang === "bn" ? word.exampleSentenceBN : activeLang === "ar" ? word.exampleSentenceAR : word.exampleSentence;

  const prevWord = wordIndex > 0 ? allWords[wordIndex - 1] : null;
  const nextWord = wordIndex < allWords.length - 1 ? allWords[wordIndex + 1] : null;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
      {/* Back button */}
      <Link href="/vocabulary" className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors">
        <ArrowLeft size={16} />
        Back to Vocabulary
      </Link>

      {/* Word header */}
      <div className="bg-gradient-to-br from-primary-500 to-secondary-600 rounded-3xl p-6 text-white mb-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant={word.level as "beginner" | "intermediate" | "advanced"} className="bg-white/20 text-white border-0">
                {word.level}
              </Badge>
              <Badge className="bg-white/20 text-white border-0">
                {word.partOfSpeech}
              </Badge>
            </div>
            <h1 className="text-4xl font-black">{word.word}</h1>
            <p className="text-white/80 mt-1 text-lg">{word.pronunciation}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFavorited(!favorited)}
              className="p-2 bg-white/20 rounded-xl hover:bg-white/30 transition-colors"
            >
              <Star size={20} fill={favorited ? "white" : "none"} />
            </button>
            <SpeakButton
              text={word.word}
              lang="en"
              size="lg"
              className="p-2 bg-white/20 rounded-xl hover:bg-white/30 text-white hover:text-white"
            />
          </div>
        </div>
      </div>

      {/* Language toggle */}
      <div className="flex justify-end mb-4">
        <LanguageToggle active={activeLang} onChange={setActiveLang} />
      </div>

      {/* Meaning Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 mb-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">
            Meaning
          </h2>
          <SpeakButton text={meaning} lang={activeLang} size="sm" />
        </div>
        <p className={cn(
          "text-xl font-semibold text-gray-900 dark:text-white",
          activeLang === "ar" && "font-arabic text-right",
          activeLang === "bn" && "font-bengali"
        )}>
          {meaning}
        </p>
      </div>

      {/* Example Sentence */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 mb-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">
            Example Sentence
          </h2>
          <SpeakButton text={example} lang={activeLang} size="sm" />
        </div>
        <p className={cn(
          "text-gray-700 dark:text-gray-300 italic leading-relaxed",
          activeLang === "ar" && "font-arabic text-right",
          activeLang === "bn" && "font-bengali"
        )}>
          &quot;{example}&quot;
        </p>
        {/* All 3 languages */}
        <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 space-y-2">
          <div className="flex items-center gap-2">
            <p className="text-xs text-gray-500 flex-1">🇬🇧 {word.exampleSentence}</p>
            <SpeakButton text={word.exampleSentence} lang="en" size="sm" />
          </div>
          <div className="flex items-center gap-2">
            <p className="text-xs text-gray-500 font-bengali flex-1">🇧🇩 {word.exampleSentenceBN}</p>
            <SpeakButton text={word.exampleSentenceBN} lang="bn" size="sm" />
          </div>
          <div className="flex items-center gap-2" dir="rtl">
            <p className="text-xs text-gray-500 font-arabic flex-1">🇸🇦 {word.exampleSentenceAR}</p>
            <SpeakButton text={word.exampleSentenceAR} lang="ar" size="sm" />
          </div>
        </div>
      </div>

      {/* Synonyms & Antonyms */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4">
          <h2 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-2">
            Synonyms
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {word.synonyms.length > 0 ? word.synonyms.map((syn) => (
              <span key={syn} className="text-xs px-2 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg font-medium">
                {syn}
              </span>
            )) : <span className="text-xs text-gray-400">—</span>}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4">
          <h2 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-2">
            Antonyms
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {word.antonyms.length > 0 ? word.antonyms.map((ant) => (
              <span key={ant} className="text-xs px-2 py-1 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg font-medium">
                {ant}
              </span>
            )) : <span className="text-xs text-gray-400">—</span>}
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4 mb-6">
        <h2 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-2">
          Categories
        </h2>
        <div className="flex flex-wrap gap-1.5">
          {word.categories.map((cat) => (
            <span key={cat} className="text-xs px-2.5 py-1 bg-secondary-50 dark:bg-secondary-900/20 text-secondary-700 dark:text-secondary-400 rounded-full font-medium">
              {cat.replace("_", " ")}
            </span>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        {prevWord ? (
          <Link href={`/vocabulary/${prevWord.id}`} className="flex-1">
            <Button variant="outline" className="w-full">
              <ChevronLeft size={16} />
              {prevWord.word}
            </Button>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
        {nextWord && (
          <Link href={`/vocabulary/${nextWord.id}`} className="flex-1">
            <Button variant="primary" className="w-full">
              {nextWord.word}
              <ChevronRight size={16} />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
