"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Zap } from "lucide-react";

export function QuickPractice() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <Link href="/quiz" className="col-span-2">
        <div className="bg-gradient-to-r from-accent-500 to-accent-600 rounded-2xl p-4 text-white cursor-pointer hover:from-accent-600 hover:to-accent-700 transition-all hover:-translate-y-0.5 hover:shadow-lg">
          <div className="flex items-center gap-3">
            <span className="text-3xl">⚡</span>
            <div>
              <div className="font-bold">Quick Quiz</div>
              <div className="text-xs text-white/80">Test your knowledge</div>
            </div>
          </div>
        </div>
      </Link>

      <Link href="/conversation">
        <div className="bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-2xl p-4 text-white cursor-pointer hover:from-secondary-600 hover:to-secondary-700 transition-all hover:-translate-y-0.5 hover:shadow-lg h-full">
          <div className="flex flex-col items-center justify-center h-full gap-1 text-center">
            <span className="text-3xl">🗣️</span>
            <div className="font-bold text-sm">Speak</div>
          </div>
        </div>
      </Link>

      <Link href="/writing">
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-4 text-white cursor-pointer hover:from-purple-600 hover:to-purple-700 transition-all hover:-translate-y-0.5 hover:shadow-lg h-full">
          <div className="flex flex-col items-center justify-center h-full gap-1 text-center">
            <span className="text-3xl">✍️</span>
            <div className="font-bold text-sm">Write</div>
          </div>
        </div>
      </Link>
    </div>
  );
}
