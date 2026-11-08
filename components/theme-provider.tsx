"use client";

import * as React from "react";

type Theme = "light" | "dark" | "system";

const ThemeContext = React.createContext<{
  setTheme: (theme: Theme) => void;
} | null>(null);

function applyTheme(theme: Theme) {
  const resolvedTheme =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;

  document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
  document.documentElement.style.colorScheme = resolvedTheme;
}

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setThemeState] = React.useState<Theme>(() => {
    if (typeof window === "undefined") return "system";

    try {
      const storedTheme = window.localStorage.getItem("theme");
      return storedTheme === "light" || storedTheme === "dark"
        ? storedTheme
        : "system";
    } catch {
      return "system";
    }
  });

  React.useEffect(() => {
    applyTheme(theme);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = () => {
      if (theme === "system") applyTheme("system");
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);
    return () =>
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, [theme]);

  function setTheme(nextTheme: Theme) {
    setThemeState(nextTheme);

    try {
      window.localStorage.setItem("theme", nextTheme);
    } catch {
      // Theme changes still apply when storage is unavailable.
    }

    applyTheme(nextTheme);
  }

  return (
    <ThemeContext.Provider value={{ setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
