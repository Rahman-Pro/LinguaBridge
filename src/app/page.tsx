"use client";

import { DailyLesson } from "@/components/home/DailyLesson";
import { StreakCounter } from "@/components/home/StreakCounter";
import { ProgressTracker } from "@/components/home/ProgressTracker";
import { TodayWords } from "@/components/home/TodayWords";
import { QuickPractice } from "@/components/home/QuickPractice";
import { DailyChallenge } from "@/components/gamification/DailyChallenge";
import { XPDisplay } from "@/components/gamification/XPDisplay";
import { useUserContext } from "@/context/UserContext";
import Link from "next/link";
import { learningTracks } from "@/data/tracks";

export default function HomePage() {
  const { progress } = useUserContext();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Welcome Banner */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
          Welcome back, {progress.displayName}! 👋
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Keep building your trilingual skills. You&apos;re doing great!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Daily Lesson */}
          <DailyLesson />

          {/* Quick Practice */}
          <div>
            <h2 className="font-bold text-gray-900 dark:text-white mb-3">
              ⚡ Quick Practice
            </h2>
            <QuickPractice />
          </div>

          {/* Today's Words */}
          <TodayWords />

          {/* Special Tracks */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-gray-900 dark:text-white">
                🎯 Learning Tracks
              </h2>
              <Link
                href="/tracks"
                className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
              >
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {learningTracks.slice(0, 3).map((track) => (
                <Link key={track.id} href={`/tracks/${track.id}`}>
                  <div
                    className={`${track.bgColor} rounded-2xl p-4 border border-gray-100 dark:border-gray-700 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer`}
                  >
                    <div className="text-3xl mb-2">{track.icon}</div>
                    <p className="font-bold text-sm text-gray-900 dark:text-white leading-tight">
                      {track.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {track.modules.length} modules
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* XP Display */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
            <XPDisplay />
          </div>

          {/* Streak Counter */}
          <StreakCounter />

          {/* Progress Tracker */}
          <ProgressTracker />

          {/* Daily Challenge */}
          <DailyChallenge />

          {/* Stats Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
            <h3 className="font-bold text-gray-900 dark:text-white mb-3">📊 My Stats</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Words Learned", value: progress.wordsLearned, emoji: "📚" },
                { label: "Quizzes Done", value: progress.quizzesCompleted, emoji: "🧠" },
                { label: "Badges Earned", value: progress.badgesEarned.length, emoji: "🏅" },
                { label: "Day Streak", value: progress.streak, emoji: "🔥" },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <div className="text-xl mb-0.5">{stat.emoji}</div>
                  <div className="text-xl font-black text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-[10px] text-gray-500 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
