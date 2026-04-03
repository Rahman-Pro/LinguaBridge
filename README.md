# 🌉 LinguaBridge

> **Master Bangla, English & Arabic** — An international trilingual language learning platform

[![Next.js](https://img.shields.io/badge/Next.js-14+-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## 📸 Preview

LinguaBridge is a Duolingo-inspired **trilingual learning platform** supporting **Bangla 🇧🇩, English 🇬🇧, and Arabic 🇸🇦** with career-focused learning paths, smart quizzes, and gamification.

---

## ✨ Features

- 🌍 **Trilingual Learning** — English, Bangla & Arabic in every lesson
- 📚 **Rich Vocabulary** — 100+ words (Beginner → Advanced) with BN/AR meanings, pronunciations, synonyms & antonyms
- 🗣️ **Conversation Practice** — 5 real-life conversations with 3-language toggle & role-play mode
- 🧠 **Smart Quiz System** — MCQ, Fill-in-the-Blanks, Spelling Test, Word Matching
- 🎯 **Career Tracks** — Job Seeker, IT Pro, Housewife, Students, IELTS/GRE, Spelling Bee
- 🔥 **Streak System** — Daily learning streak tracker with localStorage persistence
- ⭐ **XP & Levels** — Earn XP, level up (1-50), track CEFR progress (A1 → C2)
- 🏅 **Badges & Achievements** — 12 unique badges including Legendary tier
- 🏆 **Global Leaderboard** — Compete with learners worldwide
- 📊 **Progress Analytics** — Weak areas detection, performance chart, retention rate
- 🌙 **Dark Mode** — Full dark/light/system theme support
- 📱 **Mobile-First** — Responsive design with bottom navigation

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 14** (App Router) | Framework with server & client components |
| **TypeScript** | Type safety throughout |
| **Tailwind CSS** | Utility-first styling |
| **class-variance-authority** | Component variant management |
| **clsx + tailwind-merge** | Conditional class merging |
| **lucide-react** | Icon library |
| **React Context + localStorage** | State management |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Rahman-Pro/LinguaBridge.git
cd LinguaBridge

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Home Dashboard
│   ├── vocabulary/         # Vocabulary system
│   ├── conversation/       # Conversation module
│   ├── quiz/               # Smart quiz system
│   ├── tracks/             # Learning tracks
│   ├── speaking/           # Speaking & listening
│   ├── writing/            # Writing practice
│   ├── leaderboard/        # Global leaderboard
│   └── profile/            # User profile & analytics
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── layout/             # Navbar, Footer, BottomNav
│   ├── home/               # Dashboard components
│   ├── vocabulary/         # Word cards, filters
│   ├── conversation/       # Conversation player, role-play
│   ├── quiz/               # Quiz question components
│   ├── gamification/       # XP, badges, challenges
│   └── analytics/          # Charts, progress displays
├── data/
│   ├── vocabulary/         # 100+ words (beginner/intermediate/advanced)
│   ├── conversations/      # 5 sample conversations
│   ├── tracks.ts           # 6 learning tracks
│   ├── quizzes.ts          # 20+ quiz questions
│   └── badges.ts           # 12 achievement badges
├── context/                # React Context providers
├── hooks/                  # Custom React hooks
├── lib/                    # Utilities and constants
└── types/                  # TypeScript type definitions
```

---

## 🎯 Learning Tracks

| Track | Focus |
|---|---|
| 💼 **Job Seeker** | Interviews, CV vocabulary, workplace communication |
| 💻 **IT Professional** | Tech English, emails, meeting conversations |
| 🏠 **Housewife** | Daily life, shopping, family conversations |
| 🎓 **Students** | Academic vocabulary, essay writing, exams |
| 🏆 **IELTS/GRE** | Speaking topics, writing tasks, vocabulary bank |
| 🧠 **Spelling Bee** | Word memory games, spelling challenges |

---

## 🌐 Supported Languages

- 🇧🇩 **Bangla** (বাংলা) — Noto Sans Bengali font
- 🇬🇧 **English** — Primary learning language
- 🇸🇦 **Arabic** (العربية) — Noto Naskh Arabic font with RTL support

---

## 🗺️ Roadmap

- [ ] AI-powered pronunciation scoring
- [ ] Speech recognition for speaking practice
- [ ] Spaced repetition (SRS) system
- [ ] Backend API + user authentication
- [ ] Audio recordings for all vocabulary
- [ ] Offline mode (PWA)
- [ ] AI tutor chatbot
- [ ] 3000+ core vocabulary words
- [ ] Mobile app (React Native)

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

## 💖 Acknowledgments

- Inspired by Duolingo and Anki
- Designed for the 400M+ Bengali and Arabic speaking communities worldwide
- Built with ❤️ for language learners everywhere
