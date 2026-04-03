"use client";

import { XPDisplay } from "@/components/gamification/XPDisplay";
import { LevelBadge } from "@/components/gamification/LevelBadge";
import { AchievementBadge } from "@/components/gamification/AchievementBadge";
import { PerformanceChart } from "@/components/analytics/PerformanceChart";
import { WeakAreas } from "@/components/analytics/WeakAreas";
import { RetentionRate } from "@/components/analytics/RetentionRate";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useUserContext } from "@/context/UserContext";
import { useProgress } from "@/hooks/useProgress";
import { badges } from "@/data/badges";
import { CEFR_LEVELS } from "@/lib/constants";

export default function ProfilePage() {
  const { progress } = useUserContext();
  const { cefrLevel, cefrInfo, cefrProgress } = useProgress();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-primary-500 to-secondary-600 rounded-3xl p-6 text-white mb-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center text-3xl font-black">
            {progress.displayName[0]}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-black">{progress.displayName}</h1>
            <div className="flex items-center gap-2 mt-1">
              <LevelBadge />
            </div>
            <div className="flex items-center gap-4 mt-2 text-sm text-white/80">
              <span>⭐ {progress.xp} XP</span>
              <span>🔥 {progress.streak} day streak</span>
              <span>📚 {progress.wordsLearned} words</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-5">
          {/* XP Progress */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
            <XPDisplay />
          </div>

          {/* CEFR Progress */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
            <h2 className="font-bold text-gray-900 dark:text-white mb-4">🎓 CEFR Progress</h2>
            <div className="space-y-3">
              {CEFR_LEVELS.map((level) => {
                const isCurrentOrPast = CEFR_LEVELS.findIndex(l => l.level === cefrLevel) >= CEFR_LEVELS.findIndex(l => l.level === level.level);
                return (
                  <div key={level.level}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black text-white" style={{ backgroundColor: level.color }}>
                          {level.level}
                        </span>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{level.name}</span>
                        {level.level === cefrLevel && (
                          <span className="text-xs bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400 px-2 py-0.5 rounded-full">
                            Current
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-gray-400">{level.minXP} XP</span>
                    </div>
                    <ProgressBar
                      value={level.level === cefrLevel ? cefrProgress : isCurrentOrPast ? 100 : 0}
                      color={level.color}
                      size="sm"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Performance Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
            <PerformanceChart />
          </div>

          {/* Weak Areas */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
            <WeakAreas />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-5">
          {/* Stats */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
            <h2 className="font-bold text-gray-900 dark:text-white mb-4">📊 Statistics</h2>
            <div className="space-y-3">
              {[
                { label: "Words Learned", value: progress.wordsLearned, emoji: "📚" },
                { label: "Quizzes Completed", value: progress.quizzesCompleted, emoji: "🧠" },
                { label: "Current Streak", value: `${progress.streak} days`, emoji: "🔥" },
                { label: "Longest Streak", value: `${progress.longestStreak} days`, emoji: "⚡" },
                { label: "Badges Earned", value: progress.badgesEarned.length, emoji: "🏅" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.emoji} {stat.label}
                  </span>
                  <span className="font-bold text-gray-900 dark:text-white">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Retention Rate */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
            <RetentionRate />
          </div>

          {/* Badges */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
            <h2 className="font-bold text-gray-900 dark:text-white mb-4">
              🏅 Badges ({progress.badgesEarned.length}/{badges.length})
            </h2>
            <div className="grid grid-cols-3 gap-2">
              {badges.map((badge) => (
                <AchievementBadge
                  key={badge.id}
                  badge={badge}
                  earned={progress.badgesEarned.includes(badge.id)}
                  size="sm"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
