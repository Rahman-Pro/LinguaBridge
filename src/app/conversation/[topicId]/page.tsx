"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { dailyLifeConversations } from "@/data/conversations/dailyLife";
import { ConversationPlayer } from "@/components/conversation/ConversationPlayer";
import { RolePlayMode } from "@/components/conversation/RolePlayMode";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ConversationDetailPage() {
  const params = useParams();
  const topicId = params.topicId as string;
  const [mode, setMode] = useState<"player" | "roleplay">("player");

  const conversation = dailyLifeConversations.find((c) => c.id === topicId);

  if (!conversation) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-5xl mb-4">🔍</p>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Conversation not found
        </h1>
        <Link href="/conversation">
          <button className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors">
            ← Back
          </button>
        </Link>
      </div>
    );
  }

  const speakers = Array.from(new Set(conversation.dialogues.map((d) => d.speaker)));

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
      {/* Back */}
      <Link href="/conversation" className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors">
        <ArrowLeft size={16} />
        Back to Conversations
      </Link>

      {/* Mode Switcher */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
          <button
            onClick={() => setMode("player")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              mode === "player"
                ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            📖 Read Mode
          </button>
          <button
            onClick={() => setMode("roleplay")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              mode === "roleplay"
                ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            🎭 Role Play
          </button>
        </div>
        <Badge variant={conversation.level as "beginner" | "intermediate" | "advanced"}>
          {conversation.level}
        </Badge>
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
        {mode === "player" ? (
          <ConversationPlayer conversation={conversation} />
        ) : (
          <RolePlayMode
            conversation={conversation}
            userRole={speakers[0] || "A"}
          />
        )}
      </div>
    </div>
  );
}
