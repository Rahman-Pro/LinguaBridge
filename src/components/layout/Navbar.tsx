"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, BookOpen, MessageSquare, Brain, Target, Mic, PenLine, Menu, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useLanguage } from "@/hooks/useLanguage";
import { useXP } from "@/hooks/useXP";
import { LANGUAGES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home", labelBN: "হোম", labelAR: "الرئيسية", icon: "🏠" },
  { href: "/vocabulary", label: "Vocabulary", labelBN: "শব্দভাণ্ডার", labelAR: "المفردات", icon: "📚" },
  { href: "/conversation", label: "Conversation", labelBN: "কথোপকথন", labelAR: "المحادثة", icon: "🗣️" },
  { href: "/quiz", label: "Quiz", labelBN: "কুইজ", labelAR: "اختبار", icon: "🧠" },
  { href: "/tracks", label: "Tracks", labelBN: "ট্র্যাক", labelAR: "المسارات", icon: "🎯" },
  { href: "/speaking", label: "Speaking", labelBN: "কথা বলা", labelAR: "التحدث", icon: "🎙️" },
  { href: "/leaderboard", label: "Leaderboard", labelBN: "লিডারবোর্ড", labelAR: "لوحة المتصدرين", icon: "🏆" },
];

export function Navbar() {
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const { xp, level } = useXP();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-black text-xl">
            <span className="text-2xl">🌉</span>
            <span className="bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
              LinguaBridge
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800"
                )}
              >
                {link.icon} {language === "bn" ? link.labelBN : language === "ar" ? link.labelAR : link.label}
              </Link>
            ))}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            {/* XP Display */}
            <div className="hidden sm:flex items-center gap-1.5 bg-primary-50 dark:bg-primary-900/20 px-3 py-1.5 rounded-lg">
              <span className="text-sm">⭐</span>
              <span className="text-sm font-bold text-primary-700 dark:text-primary-400">{xp} XP</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Lv.{level}</span>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center gap-0.5 bg-gray-100 dark:bg-gray-800 rounded-lg p-0.5">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={cn(
                    "px-2 py-1 rounded-md text-xs font-medium transition-colors",
                    language === lang.code
                      ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white"
                  )}
                  title={lang.name}
                >
                  {lang.flag} {lang.code.toUpperCase()}
                </button>
              ))}
            </div>

            <ThemeToggle />

            {/* Profile Link */}
            <Link
              href="/profile"
              className="w-8 h-8 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold text-sm hover:opacity-90 transition-opacity"
            >
              L
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3">
          <nav className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800"
                )}
              >
                <span>{link.icon}</span>
                <span>{language === "bn" ? link.labelBN : language === "ar" ? link.labelAR : link.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
