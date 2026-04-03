"use client";

import type { LeaderboardEntry } from "@/types";

// Sample leaderboard data
const leaderboardData: LeaderboardEntry[] = [
  { rank: 1, userId: "u1", displayName: "Aisha Rahman", country: "Bangladesh", flag: "🇧🇩", xp: 12500, level: 35, streak: 120, avatar: "AR" },
  { rank: 2, userId: "u2", displayName: "Omar Farouq", country: "Saudi Arabia", flag: "🇸🇦", xp: 11200, level: 32, streak: 89, avatar: "OF" },
  { rank: 3, userId: "u3", displayName: "Nadia Islam", country: "Bangladesh", flag: "🇧🇩", xp: 9800, level: 29, streak: 65, avatar: "NI" },
  { rank: 4, userId: "u4", displayName: "Khalid Hassan", country: "Egypt", flag: "🇪🇬", xp: 8900, level: 27, streak: 43, avatar: "KH" },
  { rank: 5, userId: "u5", displayName: "Sadia Ahmed", country: "Bangladesh", flag: "🇧🇩", xp: 7600, level: 24, streak: 38, avatar: "SA" },
  { rank: 6, userId: "u6", displayName: "Ali Mohammed", country: "UAE", flag: "🇦🇪", xp: 6400, level: 21, streak: 30, avatar: "AM" },
  { rank: 7, userId: "u7", displayName: "Fatima Zahra", country: "Morocco", flag: "🇲🇦", xp: 5800, level: 19, streak: 25, avatar: "FZ" },
  { rank: 8, userId: "u8", displayName: "Rahim Hossain", country: "Bangladesh", flag: "🇧🇩", xp: 4900, level: 17, streak: 18, avatar: "RH" },
  { rank: 9, userId: "u9", displayName: "Yusuf Al-Amin", country: "Jordan", flag: "🇯🇴", xp: 4100, level: 15, streak: 12, avatar: "YA" },
  { rank: 10, userId: "u10", displayName: "Mona Lisa", country: "Egypt", flag: "🇪🇬", xp: 3600, level: 13, streak: 8, avatar: "ML" },
];

const rankColors = ["🥇", "🥈", "🥉"];

export default function LeaderboardPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
          🏆 Global Leaderboard
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Top learners from around the world this month
        </p>
      </div>

      {/* Top 3 */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[leaderboardData[1], leaderboardData[0], leaderboardData[2]].map((entry, i) => {
          const heights = ["h-24", "h-28", "h-20"];
          const positions = [2, 1, 3];
          return (
            <div key={entry.userId} className="flex flex-col items-center">
              <div className="w-14 h-14 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold text-lg mb-2">
                {entry.avatar}
              </div>
              <p className="text-xs font-bold text-gray-900 dark:text-white text-center truncate w-full text-center">
                {entry.displayName}
              </p>
              <p className="text-xs text-gray-400">{entry.flag}</p>
              <div
                className={`w-full ${heights[i]} mt-2 rounded-t-xl flex items-end justify-center pb-2 ${
                  i === 1 ? "bg-yellow-400" : i === 0 ? "bg-gray-300 dark:bg-gray-600" : "bg-amber-600"
                }`}
              >
                <span className="text-2xl">{rankColors[positions[i] - 1]}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full List */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        {leaderboardData.map((entry, index) => (
          <div
            key={entry.userId}
            className={`flex items-center gap-4 px-5 py-4 ${
              index < leaderboardData.length - 1 ? "border-b border-gray-50 dark:border-gray-700" : ""
            } ${index < 3 ? "bg-yellow-50/50 dark:bg-yellow-900/5" : ""}`}
          >
            {/* Rank */}
            <div className="w-8 text-center">
              {entry.rank <= 3 ? (
                <span className="text-xl">{rankColors[entry.rank - 1]}</span>
              ) : (
                <span className="text-sm font-bold text-gray-500 dark:text-gray-400">
                  #{entry.rank}
                </span>
              )}
            </div>

            {/* Avatar */}
            <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              {entry.avatar}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 dark:text-white truncate">
                {entry.displayName}
              </p>
              <p className="text-xs text-gray-400">
                {entry.flag} {entry.country} · {entry.streak}🔥
              </p>
            </div>

            {/* XP & Level */}
            <div className="text-right">
              <p className="font-bold text-primary-600 dark:text-primary-400">
                ⭐ {entry.xp.toLocaleString()}
              </p>
              <p className="text-xs text-gray-400">Level {entry.level}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Your Rank */}
      <div className="mt-4 p-4 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-2xl">
        <p className="text-sm font-medium text-primary-700 dark:text-primary-400">
          🎯 Keep learning to climb the leaderboard! Complete daily challenges for bonus XP.
        </p>
      </div>
    </div>
  );
}
