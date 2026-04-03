import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { LanguageProvider } from "@/context/LanguageContext";
import { UserProvider } from "@/context/UserContext";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata: Metadata = {
  title: "LinguaBridge — Master Bangla, English & Arabic",
  description:
    "International trilingual language learning platform. Learn Bangla, English, and Arabic with gamified lessons, quizzes, and career-focused tracks.",
  keywords: "bangla, english, arabic, language learning, IELTS, vocabulary, trilingual",
  authors: [{ name: "LinguaBridge" }],
  openGraph: {
    title: "LinguaBridge",
    description: "Master Bangla, English & Arabic",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#111827" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col">
        <ThemeProvider>
          <LanguageProvider>
            <UserProvider>
              <Navbar />
              <main className="flex-1 pb-20 lg:pb-0">{children}</main>
              <Footer />
              <BottomNav />
            </UserProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
