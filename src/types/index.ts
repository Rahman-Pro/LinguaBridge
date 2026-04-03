// Category types for vocabulary
export type CategoryType =
  | "job_seeker"
  | "it_tech"
  | "sports"
  | "housewife"
  | "students"
  | "ielts_gre"
  | "spelling_bee"
  | "daily_life";

// CEFR levels
export type CEFRLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

// Vocabulary word interface
export interface VocabularyWord {
  id: string;
  word: string;
  meaningBN: string;
  meaningAR: string;
  pronunciation: string;
  audioUrl?: string;
  exampleSentence: string;
  exampleSentenceBN: string;
  exampleSentenceAR: string;
  synonyms: string[];
  antonyms: string[];
  partOfSpeech: string;
  level: "beginner" | "intermediate" | "advanced";
  categories: CategoryType[];
  imageUrl?: string;
}

// Conversation interfaces
export interface Dialogue {
  speaker: string;
  textEN: string;
  textBN: string;
  textAR: string;
  audioUrl?: string;
}

export interface Conversation {
  id: string;
  title: string;
  titleBN: string;
  titleAR: string;
  category:
    | "daily_life"
    | "office"
    | "shopping_travel"
    | "it_workplace"
    | "academic";
  level: "beginner" | "intermediate" | "advanced";
  dialogues: Dialogue[];
}

// Learning track interfaces
export interface TrackModule {
  id: string;
  title: string;
  titleBN: string;
  description: string;
  duration: string;
  lessons: number;
  completed?: boolean;
}

export interface LearningTrack {
  id: string;
  name: string;
  nameBN: string;
  nameAR: string;
  icon: string;
  description: string;
  descriptionBN: string;
  color: string;
  bgColor: string;
  modules: TrackModule[];
}

// Quiz interfaces
export type QuizType = "mcq" | "fill_blanks" | "spelling" | "matching";
export type DifficultyLevel = "easy" | "medium" | "hard";

export interface MCQQuestion {
  type: "mcq";
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  xpReward: number;
  difficulty: DifficultyLevel;
}

export interface FillBlanksQuestion {
  type: "fill_blanks";
  id: string;
  sentence: string;
  blanks: string[];
  correctAnswers: string[];
  hint?: string;
  xpReward: number;
  difficulty: DifficultyLevel;
}

export interface SpellingQuestion {
  type: "spelling";
  id: string;
  word: string;
  audioUrl?: string;
  hint: string;
  xpReward: number;
  difficulty: DifficultyLevel;
}

export interface MatchingQuestion {
  type: "matching";
  id: string;
  pairs: { english: string; target: string }[];
  language: "bn" | "ar";
  xpReward: number;
  difficulty: DifficultyLevel;
}

export type QuizQuestion =
  | MCQQuestion
  | FillBlanksQuestion
  | SpellingQuestion
  | MatchingQuestion;

// Badge / Achievement interface
export interface Badge {
  id: string;
  name: string;
  nameBN: string;
  description: string;
  descriptionBN: string;
  icon: string;
  condition: string;
  xpReward: number;
  rarity: "common" | "rare" | "epic" | "legendary";
}

// User / Gamification interfaces
export interface UserProgress {
  userId: string;
  displayName: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  streak: number;
  longestStreak: number;
  lastStudyDate: string | null;
  cefrLevel: CEFRLevel;
  wordsLearned: number;
  quizzesCompleted: number;
  badgesEarned: string[];
  dailyChallengeCompleted: boolean;
  weeklyActivity: number[];
  categoryScores: Record<CategoryType, number>;
}

// Language type
export type Language = "en" | "bn" | "ar";

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
}

// Leaderboard entry
export interface LeaderboardEntry {
  rank: number;
  userId: string;
  displayName: string;
  country: string;
  flag: string;
  xp: number;
  level: number;
  streak: number;
  avatar: string;
}
