import type { CEFRLevel, LanguageOption, CategoryType } from "@/types";

export const APP_NAME = "LinguaBridge";
export const APP_TAGLINE = "Master Bangla, English & Arabic";

// CEFR Levels configuration
export const CEFR_LEVELS: {
  level: CEFRLevel;
  name: string;
  minXP: number;
  maxXP: number;
  color: string;
}[] = [
  { level: "A1", name: "Beginner", minXP: 0, maxXP: 500, color: "#9CA3AF" },
  { level: "A2", name: "Elementary", minXP: 500, maxXP: 1500, color: "#60A5FA" },
  { level: "B1", name: "Intermediate", minXP: 1500, maxXP: 3000, color: "#34D399" },
  { level: "B2", name: "Upper Intermediate", minXP: 3000, maxXP: 6000, color: "#FBBF24" },
  { level: "C1", name: "Advanced", minXP: 6000, maxXP: 10000, color: "#F87171" },
  { level: "C2", name: "Proficient", minXP: 10000, maxXP: 20000, color: "#A78BFA" },
];

// XP thresholds for levels 1-50
export const XP_THRESHOLDS: number[] = Array.from(
  { length: 50 },
  (_, i) => Math.floor(100 * Math.pow(1.5, i))
);

// Language options
export const LANGUAGES: LanguageOption[] = [
  { code: "en", name: "English", nativeName: "English", flag: "🇬🇧" },
  { code: "bn", name: "Bangla", nativeName: "বাংলা", flag: "🇧🇩" },
  { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦" },
];

// Category definitions
export const CATEGORIES: {
  id: CategoryType;
  label: string;
  labelBN: string;
  emoji: string;
}[] = [
  { id: "daily_life", label: "Daily Life", labelBN: "দৈনন্দিন জীবন", emoji: "🏠" },
  { id: "job_seeker", label: "Job Seeker", labelBN: "চাকরি প্রার্থী", emoji: "💼" },
  { id: "it_tech", label: "IT & Tech", labelBN: "আইটি ও প্রযুক্তি", emoji: "💻" },
  { id: "sports", label: "Sports", labelBN: "খেলাধুলা", emoji: "⚽" },
  { id: "housewife", label: "Housewife", labelBN: "গৃহিণী", emoji: "🏡" },
  { id: "students", label: "Students", labelBN: "শিক্ষার্থী", emoji: "🎓" },
  { id: "ielts_gre", label: "IELTS/GRE", labelBN: "আইইএলটিএস/জিআরই", emoji: "📖" },
  { id: "spelling_bee", label: "Spelling Bee", labelBN: "স্পেলিং বি", emoji: "🧠" },
];

// XP rewards
export const XP_REWARDS = {
  LESSON_COMPLETE: 20,
  QUIZ_CORRECT: 10,
  QUIZ_PERFECT: 50,
  DAILY_STREAK: 15,
  WORD_LEARNED: 5,
  CONVERSATION_COMPLETE: 25,
  DAILY_CHALLENGE: 30,
};

// Streak milestones
export const STREAK_MILESTONES = [3, 7, 14, 30, 60, 100, 365];

// Learning directions
export const LEARNING_DIRECTIONS = [
  { id: "en-via-bn", label: "Learn English via Bangla", from: "bn", to: "en" },
  { id: "en-via-ar", label: "Learn English via Arabic", from: "ar", to: "en" },
  { id: "ar-via-bn", label: "Learn Arabic via Bangla", from: "bn", to: "ar" },
  { id: "direct", label: "Direct Mode (BN↔EN↔AR)", from: "all", to: "all" },
];

// Default user state
export const DEFAULT_USER = {
  userId: "local-user",
  displayName: "Learner",
  level: 1,
  xp: 0,
  xpToNextLevel: 100,
  streak: 0,
  longestStreak: 0,
  lastStudyDate: null,
  cefrLevel: "A1" as CEFRLevel,
  wordsLearned: 0,
  quizzesCompleted: 0,
  badgesEarned: [],
  dailyChallengeCompleted: false,
  weeklyActivity: [0, 0, 0, 0, 0, 0, 0],
  categoryScores: {
    daily_life: 0,
    job_seeker: 0,
    it_tech: 0,
    sports: 0,
    housewife: 0,
    students: 0,
    ielts_gre: 0,
    spelling_bee: 0,
  },
};
