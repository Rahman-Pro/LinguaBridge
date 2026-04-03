"use client";

import { useState } from "react";
import { PenLine, CheckCircle2 } from "lucide-react";

const writingTasks = [
  {
    id: "w1",
    title: "Describe Your Daily Routine",
    prompt: "Write 5-7 sentences about your daily routine in English.",
    level: "Beginner",
    category: "Daily Life",
    emoji: "📅",
  },
  {
    id: "w2",
    title: "Write a Professional Email",
    prompt: "Write a professional email requesting a meeting with your manager.",
    level: "Intermediate",
    category: "Job Seeker",
    emoji: "📧",
  },
  {
    id: "w3",
    title: "IELTS Task 2: Technology",
    prompt: "Some people believe technology has made life better. Others disagree. Discuss both views and give your opinion. (Write at least 250 words)",
    level: "Advanced",
    category: "IELTS/GRE",
    emoji: "📝",
  },
];

export default function WritingPage() {
  const [activeTask, setActiveTask] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const selectedTask = writingTasks.find((t) => t.id === activeTask);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
          ✍️ Writing Practice
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Improve your written English with guided tasks
        </p>
      </div>

      {!activeTask ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {writingTasks.map((task) => (
            <div
              key={task.id}
              onClick={() => {
                setActiveTask(task.id);
                setText("");
                setSubmitted(false);
              }}
              className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <span className="text-3xl mb-3 block">{task.emoji}</span>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                {task.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
                {task.prompt}
              </p>
              <div className="flex items-center gap-2 text-xs">
                <span className={`px-2 py-0.5 rounded-full font-medium ${
                  task.level === "Beginner" ? "bg-green-100 text-green-700" :
                  task.level === "Intermediate" ? "bg-blue-100 text-blue-700" :
                  "bg-purple-100 text-purple-700"
                }`}>
                  {task.level}
                </span>
                <span className="text-gray-400">{task.category}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <button
            onClick={() => setActiveTask(null)}
            className="mb-4 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            ← Back to tasks
          </button>

          {selectedTask && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
              <div className="flex items-start gap-3 mb-5">
                <span className="text-3xl">{selectedTask.emoji}</span>
                <div>
                  <h2 className="font-black text-xl text-gray-900 dark:text-white">
                    {selectedTask.title}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
                    {selectedTask.prompt}
                  </p>
                </div>
              </div>

              {!submitted ? (
                <>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Start writing here..."
                    rows={10}
                    className="w-full p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary-500 outline-none transition-colors resize-none"
                  />
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm text-gray-400">{text.split(" ").filter(Boolean).length} words</span>
                    <button
                      onClick={() => setSubmitted(true)}
                      disabled={text.trim().length < 20}
                      className="px-5 py-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-medium transition-colors disabled:opacity-50"
                    >
                      Submit ✓
                    </button>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 size={20} className="text-green-600" />
                      <span className="font-bold text-green-700 dark:text-green-400">
                        Great work! Submitted successfully.
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      AI grammar correction and feedback coming soon! 🤖
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Your writing:</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap">{text}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
