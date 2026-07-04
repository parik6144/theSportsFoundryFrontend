import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { resolveTheme, writeStoredTheme } from "@/lib/theme-store";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("logo") as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
    }
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ success: false, error: "File must be an image" }, { status: 400 });
    }
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ success: false, error: "File too large. Max 5MB." }, { status: 400 });

    }

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const ext = (file.name.split(".").pop() || "png").toLowerCase().replace(/[^a-z0-9]/g, "") || "png";
    const filename = `client-logo.${ext}`;
    const filepath = path.join(uploadDir, filename);
    const bytes = await file.arrayBuffer();
    await writeFile(filepath, Buffer.from(bytes));

    const url = `/uploads/${filename}`;
    await writeFile(
      path.join(uploadDir, "logo-meta.json"),
      JSON.stringify(
        {
          filename,
          url,
          originalName: file.name,
          size: file.size,
          type: file.type,
          uploadedAt: new Date().toISOString(),
        },
        null,
        2
      )
    );

    // Persist logo into theme store immediately so refresh keeps it
    const current = await resolveTheme(null);
    await writeStoredTheme({ ...current, logoUrl: url });

    return NextResponse.json({
      success: true,
      url,
      filename,
      size: file.size,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Upload failed" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const theme = await resolveTheme(null);
    if (theme.logoUrl) {
      return NextResponse.json({ success: true, url: theme.logoUrl });
    }
    return NextResponse.json({ success: false, message: "No logo uploaded yet" });
  } catch {
    return NextResponse.json({ success: false, message: "No logo uploaded yet" });
  }
}
