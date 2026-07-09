import { existsSync } from "fs";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

export type ThemeData = {
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

export const DEFAULT_THEME: ThemeData = {
  logoUrl: "/brand/client-logo.png",
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



const uploadsDir = () => path.join(process.cwd(), "public", "uploads");
const themePath = () => path.join(uploadsDir(), "theme.json");
const logoMetaPath = () => path.join(uploadsDir(), "logo-meta.json");

async function ensureUploadsDir() {
  const dir = uploadsDir();
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true });
  }
}

export async function readStoredTheme(): Promise<Partial<ThemeData>> {
  try {
    const file = themePath();
    if (!existsSync(file)) return {};
    return JSON.parse(await readFile(file, "utf-8"));
  } catch {
    return {};
  }
}

export async function readLogoMeta(): Promise<{ url?: string } | null> {
  try {
    const file = logoMetaPath();
    if (!existsSync(file)) return null;
    return JSON.parse(await readFile(file, "utf-8"));
  } catch {
    return null;
  }
}

export async function writeStoredTheme(theme: ThemeData): Promise<ThemeData> {
  await ensureUploadsDir();

  const cleanLogoUrl = theme.logoUrl
    ? theme.logoUrl.split("?")[0]
    : null;

  const payload: ThemeData = {
    ...DEFAULT_THEME,
    ...theme,
    logoUrl: cleanLogoUrl,
  };

  await writeFile(themePath(), JSON.stringify(payload, null, 2), "utf-8");
  return payload;
}

export async function resolveTheme(): Promise<ThemeData> {
  const stored = await readStoredTheme();
  const logoMeta = await readLogoMeta();

  return {
    ...DEFAULT_THEME,
    ...stored,
    logoUrl: stored.logoUrl || logoMeta?.url || null,
  };
}
