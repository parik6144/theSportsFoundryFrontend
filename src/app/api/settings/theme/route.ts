import { NextRequest, NextResponse } from "next/server";
import {
  DEFAULT_THEME,
  resolveTheme,
  writeStoredTheme,
  type ThemeData,
} from "@/lib/theme-store";

export async function GET() {
  try {
    const theme = await resolveTheme();
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
    const current = await resolveTheme();
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
