"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface Theme {
  logoUrl: string | null;
  siteName: string;
  tagline: string;
  primaryColor: string;
  primaryLight: string;
  primaryDark: string;
  backgroundColor: string;
  backgroundLight: string;
  surfaceColor: string;
  textColor: string;
  textMuted: string;
  accentColor: string;
}

const DEFAULT_THEME: Theme = {
  logoUrl: null,
  siteName: "The Sports Foundry",
  tagline: "Where every sport connects.",
  primaryColor: "#d4af37",
  primaryLight: "#f4d35e",
  primaryDark: "#b8860b",
  backgroundColor: "#0a1128",
  backgroundLight: "#0d1b3d",
  surfaceColor: "#161a26",
  textColor: "#e8edf5",
  textMuted: "#9aa5ba",
  accentColor: "#d4af37",
};



const ThemeCtx = createContext<{ theme: Theme; refresh: () => void }>({
  theme: DEFAULT_THEME,
  refresh: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEME);

  const fetchTheme = () => {
    fetch("/api/settings/theme")
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.data) {
          const t = { ...DEFAULT_THEME, ...data.data };
          setTheme(t);
          // Apply CSS variables to root
          const root = document.documentElement;
          root.style.setProperty("--theme-primary", t.primaryColor);
          root.style.setProperty("--theme-primary-light", t.primaryLight);
          root.style.setProperty("--theme-primary-dark", t.primaryDark);
          root.style.setProperty("--theme-bg", t.backgroundColor);
          root.style.setProperty("--theme-bg-light", t.backgroundLight);
          root.style.setProperty("--theme-surface", t.surfaceColor);
          root.style.setProperty("--theme-text", t.textColor);
          root.style.setProperty("--theme-text-muted", t.textMuted);
          root.style.setProperty("--theme-accent", t.accentColor);

          // Update document title with site name
          if (t.siteName) document.title = `${t.siteName} — Admin Panel`;
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchTheme();
  }, []);

  return <ThemeCtx.Provider value={{ theme, refresh: fetchTheme }}>{children}</ThemeCtx.Provider>;
}

export function useTheme() {
  return useContext(ThemeCtx);
}
