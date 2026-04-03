"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useUserContext } from "@/context/UserContext";
import { useXP } from "@/hooks/useXP";
import { XP_REWARDS } from "@/lib/constants";

export function DailyChallenge() {
  const [completed, setCompleted] = useState(false);
  const { progress, completeDailyChallenge } = useUserContext();
  const { awardXP } = useXP();

  const handleComplete = () => {
    awardXP("DAILY_CHALLENGE");
    completeDailyChallenge();
    setCompleted(true);
  };

  const isAlreadyCompleted = progress.dailyChallengeCompleted;

  return (
    <Card className="border-l-4 border-l-accent-500">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">⚡</span>
              <h3 className="font-bold text-gray-900 dark:text-white">Daily Challenge</h3>
              {isAlreadyCompleted && (
                <span className="text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded-full">
                  ✓ Done
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {isAlreadyCompleted
                ? "Great job! You completed today's challenge."
                : "Learn 5 new words and complete 1 quiz to earn bonus XP!"}
            </p>
            {!isAlreadyCompleted && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-accent-600 dark:text-accent-400 font-medium">
                  🎁 Reward: +{XP_REWARDS.DAILY_CHALLENGE} XP
                </span>
              </div>
            )}
          </div>
          {!isAlreadyCompleted && (
            <Button
              variant="accent"
              size="sm"
              onClick={handleComplete}
              disabled={completed}
            >
              {completed ? "✓ Done!" : "Complete"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
