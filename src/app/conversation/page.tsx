"use client";

import Link from "next/link";
import { dailyLifeConversations } from "@/data/conversations/dailyLife";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

const categoryLabels: Record<string, string> = {
  daily_life: "Daily Life 🏠",
  office: "Office 💼",
  shopping_travel: "Shopping & Travel 🛒",
  it_workplace: "IT Workplace 💻",
  academic: "Academic 🎓",
};

export default function ConversationPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
          🗣️ Conversations
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Practice real-life conversations in English, Bangla & Arabic
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {dailyLifeConversations.map((conv) => (
          <Link key={conv.id} href={`/conversation/${conv.id}`}>
            <div className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1">
                  <span className="text-xs font-medium text-gray-400 dark:text-gray-500 mb-1 block">
                    {categoryLabels[conv.category]}
                  </span>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">
                    {conv.title}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-bengali">{conv.titleBN}</span>
                    <span className="text-gray-300">·</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-arabic" dir="rtl">{conv.titleAR}</span>
                  </div>
                </div>
                <Badge variant={conv.level as "beginner" | "intermediate" | "advanced"}>
                  {conv.level}
                </Badge>
              </div>

              {/* Preview of first dialogue */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-3 mb-3">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                  {conv.dialogues[0].speaker}:
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                  &quot;{conv.dialogues[0].textEN}&quot;
                </p>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
                <span>💬 {conv.dialogues.length} lines</span>
                <span>🌐 3 languages</span>
                <span>🎭 Role-play</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
