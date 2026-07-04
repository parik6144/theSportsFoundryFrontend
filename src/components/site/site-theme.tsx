"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type SiteTheme = {
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
};

export const DEFAULT_SITE_THEME: SiteTheme = {
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


const SiteThemeCtx = createContext<{
  theme: SiteTheme;
  refresh: () => void;
  ready: boolean;
}>({
  theme: DEFAULT_SITE_THEME,
  refresh: () => {},
  ready: false,
});

function applyThemeVars(theme: SiteTheme) {
  const root = document.documentElement;
  const logoUrl = theme.logoUrl ? theme.logoUrl.split("?")[0] : null;

  root.style.setProperty("--background", theme.backgroundColor);
  root.style.setProperty("--foreground", theme.textColor);
  root.style.setProperty("--primary", theme.primaryColor);
  root.style.setProperty("--primary-foreground", theme.backgroundColor);
  root.style.setProperty("--accent", theme.primaryLight);
  root.style.setProperty("--accent-foreground", theme.backgroundColor);
  root.style.setProperty("--muted-foreground", theme.textMuted);
  root.style.setProperty("--ring", theme.primaryColor);
  root.style.setProperty("--popover", theme.backgroundLight);
  root.style.setProperty("--popover-foreground", theme.textColor);
  root.style.setProperty("--card-foreground", theme.textColor);
  root.style.setProperty("--sidebar", theme.backgroundLight);
  root.style.setProperty("--sidebar-primary", theme.primaryColor);
  root.style.setProperty("--sidebar-ring", theme.primaryColor);

  root.style.setProperty("--theme-primary", theme.primaryColor);
  root.style.setProperty("--theme-primary-light", theme.primaryLight);
  root.style.setProperty("--theme-primary-dark", theme.primaryDark);
  root.style.setProperty("--theme-bg", theme.backgroundColor);
  root.style.setProperty("--theme-bg-light", theme.backgroundLight);
  root.style.setProperty("--theme-surface", theme.surfaceColor);
  root.style.setProperty("--theme-text", theme.textColor);
  root.style.setProperty("--theme-text-muted", theme.textMuted);
  root.style.setProperty("--theme-accent", theme.accentColor);

  // Brand utility aliases used across site components
  root.style.setProperty("--color-gold", theme.primaryColor);
  root.style.setProperty("--color-gold-2", theme.primaryLight);
  root.style.setProperty("--color-navy", theme.backgroundColor);
  root.style.setProperty("--color-navy-2", theme.backgroundLight);
  root.style.setProperty("--color-charcoal", theme.surfaceColor);

  if (theme.siteName) {
    document.title = `${theme.siteName} — ${theme.tagline || "Sports Ecosystem"}`;
  }

  // Favicon from logo when available
  if (logoUrl) {
    let link = document.querySelector<HTMLLinkElement>("link[rel='icon'][data-brand='1']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      link.setAttribute("data-brand", "1");
      document.head.appendChild(link);
    }
    link.href = logoUrl;
  }
}

export function SiteThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<SiteTheme>(DEFAULT_SITE_THEME);
  const [ready, setReady] = useState(false);

  const refresh = useCallback(() => {
    fetch("/api/settings/theme")
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.data) {
          const next = { ...DEFAULT_SITE_THEME, ...data.data } as SiteTheme;
          setTheme(next);
          applyThemeVars(next);
        } else {
          applyThemeVars(DEFAULT_SITE_THEME);
        }

      })
      .catch(() => applyThemeVars(DEFAULT_SITE_THEME))
      .finally(() => setReady(true));
  }, []);

  useEffect(() => {
    applyThemeVars(DEFAULT_SITE_THEME);
    refresh();
  }, [refresh]);

  return (
    <SiteThemeCtx.Provider value={{ theme, refresh, ready }}>
      {children}
    </SiteThemeCtx.Provider>
  );
}

export function useSiteTheme() {
  return useContext(SiteThemeCtx);
}

/** Shared brand mark — same navy panel + glow treatment as hero logo */
export function BrandMark({
  className = "",
  height = 40,
  showNameFallback = true,
}: {
  className?: string;
  height?: number;
  showNameFallback?: boolean;
}) {
  const { theme } = useSiteTheme();
  const logoSrc = theme.logoUrl
    ? `${theme.logoUrl.split("?")[0]}?t=brand`
    : null;

  if (logoSrc) {
    const padY = Math.max(6, Math.round(height * 0.14));
    const padX = Math.max(10, Math.round(height * 0.22));
    const maxW = Math.round(height * 4.6);

    return (
      <span
        className={`inline-flex items-center justify-center rounded-xl md:rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 ${className}`}
        style={{
          padding: `${padY}px ${padX}px`,
          background: `radial-gradient(circle at 28% 18%, ${theme.primaryColor}40, transparent 55%), linear-gradient(160deg, ${theme.backgroundLight} 0%, ${theme.backgroundColor} 100%)`,
          boxShadow: `0 8px 22px rgba(0,0,0,0.3), 0 0 18px ${theme.primaryColor}2e`,
        }}
      >
        <img
          src={logoSrc}
          alt={theme.siteName}
          className="object-contain object-left block"
          style={{
            height,
            width: "auto",
            maxWidth: maxW,
            // Black plate blends into navy panel (same as hero logo)
            mixBlendMode: "screen",
          }}
        />
      </span>
    );
  }


  if (!showNameFallback) return null;

  return (
    <span className={`font-bold tracking-tight ${className}`}>
      <span className="text-white">{theme.siteName.split(" ").slice(0, -1).join(" ") || theme.siteName}</span>
      {theme.siteName.includes(" ") && (
        <span className="text-gradient-gold">
          {" "}
          {theme.siteName.split(" ").slice(-1)[0]}
        </span>
      )}
    </span>
  );
}

