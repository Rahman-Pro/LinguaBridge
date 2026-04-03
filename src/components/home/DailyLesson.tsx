"use client";

import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { BookOpen, ChevronRight } from "lucide-react";
import Link from "next/link";

interface DailyLessonProps {
  title?: string;
  description?: string;
  category?: string;
  progress?: number;
}

export function DailyLesson({
  title = "Daily Conversation Practice",
  description = "Practice a real-life conversation about morning greetings and daily routines",
  category = "Daily Life",
  progress = 0,
}: DailyLessonProps) {
  return (
    <Card hover className="bg-gradient-to-br from-primary-500 to-primary-600 border-0 text-white">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs font-medium">
                📅 Today&apos;s Lesson
              </span>
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs font-medium">
                {category}
              </span>
            </div>
            <h3 className="font-bold text-lg leading-tight mb-1">{title}</h3>
            <p className="text-sm text-white/80 mb-4">{description}</p>
            <div className="flex items-center gap-3">
              <Link href="/conversation/conv001">
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-white text-primary-700 hover:bg-white/90 hover:text-primary-800 font-semibold"
                >
                  Start Lesson
                  <ChevronRight size={14} />
                </Button>
              </Link>
              {progress > 0 && (
                <span className="text-xs text-white/70">
                  {progress}% complete
                </span>
              )}
            </div>
          </div>
          <div className="flex-shrink-0 w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
            <BookOpen size={28} className="text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
