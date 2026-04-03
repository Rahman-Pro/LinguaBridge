"use client";

import { useParams } from "next/navigation";
import { learningTracks } from "@/data/tracks";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ArrowLeft, Clock, BookOpen } from "lucide-react";
import Link from "next/link";

export default function TrackDetailPage() {
  const params = useParams();
  const trackId = params.trackId as string;

  const track = learningTracks.find((t) => t.id === trackId);

  if (!track) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-5xl mb-4">🔍</p>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Track not found</h1>
        <Link href="/tracks">
          <button className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-xl">← Back</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
      <Link href="/tracks" className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors">
        <ArrowLeft size={16} />
        Back to Tracks
      </Link>

      {/* Header */}
      <div
        className="rounded-3xl p-6 text-white mb-6"
        style={{ backgroundColor: track.color }}
      >
        <div className="text-5xl mb-3">{track.icon}</div>
        <h1 className="text-3xl font-black">{track.name}</h1>
        <p className="font-bengali mt-1 opacity-90">{track.nameBN}</p>
        <p className="mt-3 opacity-80 text-sm leading-relaxed">{track.description}</p>
        <div className="flex items-center gap-4 mt-4 text-sm opacity-80">
          <span>📚 {track.modules.length} modules</span>
          <span>🎯 Career-focused</span>
        </div>
      </div>

      {/* Modules */}
      <h2 className="font-black text-xl text-gray-900 dark:text-white mb-4">
        Course Modules
      </h2>
      <div className="space-y-3">
        {track.modules.map((module, index) => (
          <div
            key={module.id}
            className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              {/* Module number */}
              <div
                className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-lg"
                style={{ backgroundColor: track.color }}
              >
                {index + 1}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      {module.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-bengali mt-0.5">
                      {module.titleBN}
                    </p>
                  </div>
                  {module.completed && (
                    <span className="text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded-full">
                      ✓ Done
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5">
                  {module.description}
                </p>
                <div className="flex items-center gap-3 mt-2 text-xs text-gray-400 dark:text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {module.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen size={12} />
                    {module.lessons} lessons
                  </span>
                </div>
                <ProgressBar
                  value={module.completed ? 100 : 0}
                  size="sm"
                  color={track.color}
                  className="mt-3"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Start button */}
      <div className="mt-6">
        <button
          className="w-full py-4 rounded-2xl text-white font-bold text-lg hover:opacity-90 transition-opacity"
          style={{ backgroundColor: track.color }}
        >
          {track.icon} Start {track.name}
        </button>
      </div>
    </div>
  );
}
