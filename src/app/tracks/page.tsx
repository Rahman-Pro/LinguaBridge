"use client";

import Link from "next/link";
import { learningTracks } from "@/data/tracks";
import { ProgressBar } from "@/components/ui/ProgressBar";

export default function TracksPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
          🎯 Learning Tracks
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Choose your career-focused learning path
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {learningTracks.map((track) => (
          <Link key={track.id} href={`/tracks/${track.id}`}>
            <div
              className={`${track.bgColor} rounded-2xl border border-gray-100 dark:border-gray-700 p-5 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer h-full`}
            >
              <div className="text-4xl mb-3">{track.icon}</div>
              <h3 className="font-black text-lg text-gray-900 dark:text-white mb-1">
                {track.name}
              </h3>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 font-bengali mb-2">
                {track.nameBN}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                {track.description}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>📚 {track.modules.length} modules</span>
                <span
                  className="px-2 py-0.5 rounded-full text-white font-medium"
                  style={{ backgroundColor: track.color }}
                >
                  Start →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
