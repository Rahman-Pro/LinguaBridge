import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 font-black text-xl mb-3">
              <span className="text-2xl">🌉</span>
              <span className="bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
                LinguaBridge
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
              Master Bangla, English & Arabic through immersive, gamified learning. 
              Your bridge to the world 🌍
            </p>
            <div className="flex items-center gap-2 mt-4">
              <span className="text-xs bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400 px-2 py-1 rounded-full">🇧🇩 Bangla</span>
              <span className="text-xs bg-secondary-100 text-secondary-700 dark:bg-secondary-900/30 dark:text-secondary-400 px-2 py-1 rounded-full">🇬🇧 English</span>
              <span className="text-xs bg-accent-100 text-accent-700 dark:bg-accent-900/30 dark:text-accent-400 px-2 py-1 rounded-full">🇸🇦 Arabic</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-sm">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: "/vocabulary", label: "📚 Vocabulary" },
                { href: "/conversation", label: "🗣️ Conversations" },
                { href: "/quiz", label: "🧠 Quiz" },
                { href: "/tracks", label: "🎯 Tracks" },
                { href: "/leaderboard", label: "🏆 Leaderboard" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-sm">Features</h3>
            <ul className="space-y-2">
              {[
                "✅ Trilingual Learning",
                "🎮 Gamification",
                "📊 Progress Tracking",
                "🎯 Career Tracks",
                "🔥 Streak System",
                "🏅 Badges",
              ].map((feature) => (
                <li key={feature} className="text-sm text-gray-500 dark:text-gray-400">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            © 2025 LinguaBridge. Built with ❤️ for language learners.
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            MIT License — Open Source
          </p>
        </div>
      </div>
    </footer>
  );
}
