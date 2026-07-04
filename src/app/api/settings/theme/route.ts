import { NextRequest, NextResponse } from "next/server";
import { backendGet, backendPost } from "@/lib/backend";
import {
  DEFAULT_THEME,
  resolveTheme,
  writeStoredTheme,
  type ThemeData,
} from "@/lib/theme-store";

export async function GET() {
  try {
    let general: Record<string, any> | null = null;
    try {
      general = (await backendGet("/settings/general")) as Record<string, any>;
    } catch {
      // Backend optional for local theme reads
    }

    const theme = await resolveTheme(general);
    return NextResponse.json({ success: true, data: theme });
  } catch (err: any) {
    return NextResponse.json(
      { success: true, data: DEFAULT_THEME, warning: err.message },
      { status: 200 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<ThemeData>;
    const current = await resolveTheme(null);
    const nextTheme: ThemeData = {
      ...current,
      ...body,
      logoUrl:
        body.logoUrl === undefined
          ? current.logoUrl
          : body.logoUrl
            ? String(body.logoUrl).split("?")[0]
            : null,
    };

    const saved = await writeStoredTheme(nextTheme);

    // Keep Laravel general settings in sync when backend is available
    try {
      await backendPost("/settings/general", {
        site_name: saved.siteName,
        site_tagline: saved.tagline,
        site_logo: saved.logoUrl,
        primary_color: saved.primaryColor,
        navy_color: saved.backgroundColor,
      });
    } catch {
      // Local theme file is source of truth if backend update fails
    }

    return NextResponse.json({ success: true, data: saved });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to save theme" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  return PUT(req);
}
