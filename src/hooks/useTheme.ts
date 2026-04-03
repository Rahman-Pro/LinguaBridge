"use client";

import { useThemeContext } from "@/context/ThemeContext";

export function useTheme() {
  const { theme, resolvedTheme, setTheme } = useThemeContext();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
    isDark: resolvedTheme === "dark",
  };
}
