"use client";

import { Mic, Volume2, Star } from "lucide-react";

export default function SpeakingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
          🎙️ Speaking & Listening
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Improve your pronunciation and listening skills
        </p>
      </div>

      {/* Listening Practice */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 mb-4">
        <h2 className="font-bold text-xl text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Volume2 size={22} className="text-secondary-500" />
          Listening Practice
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { title: "Morning Dialogue", level: "Beginner", duration: "1:30", emoji: "🌅" },
            { title: "Job Interview", level: "Intermediate", duration: "2:45", emoji: "💼" },
            { title: "IELTS Monologue", level: "Advanced", duration: "3:20", emoji: "🎓" },
            { title: "Tech Meeting", level: "Intermediate", duration: "4:10", emoji: "💻" },
          ].map((item) => (
            <div key={item.title} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <span className="text-3xl">{item.emoji}</span>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-gray-400">{item.level}</span>
                  <span className="text-gray-300">·</span>
                  <span className="text-xs text-gray-400">{item.duration}</span>
                </div>
              </div>
              <button className="p-2.5 bg-secondary-500 hover:bg-secondary-600 text-white rounded-xl transition-colors">
                <Volume2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Speaking Practice */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
        <h2 className="font-bold text-xl text-gray-900 dark:text-white mb-2 flex items-center gap-2">
          <Mic size={22} className="text-red-500" />
          Speaking Practice
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Record yourself and compare with native pronunciation
        </p>

        {/* IELTS Speaking Topics */}
        <div className="space-y-3">
          {[
            { topic: "Describe your hometown", band: "Part 1", emoji: "🏙️" },
            { topic: "Talk about a memorable journey", band: "Part 2", emoji: "✈️" },
            { topic: "Discuss the impact of technology on education", band: "Part 3", emoji: "💻" },
          ].map((item) => (
            <div key={item.topic} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <span className="text-2xl">{item.emoji}</span>
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white">{item.topic}</p>
                <span className="text-xs text-secondary-600 dark:text-secondary-400">{item.band}</span>
              </div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm transition-colors">
                <Mic size={14} />
                Record
              </button>
            </div>
          ))}
        </div>

        {/* AI Coming Soon */}
        <div className="mt-6 p-4 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl border border-primary-100 dark:border-primary-800">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">🤖</span>
            <h3 className="font-bold text-primary-700 dark:text-primary-400">AI Pronunciation Scoring</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Coming Soon — AI-powered pronunciation analysis with IELTS band score estimation.
          </p>
        </div>
      </div>
    </div>
  );
}
