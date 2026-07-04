import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: [],
    message: "Manage roles in Laravel admin: http://127.0.0.1:8000/admin",
  });
}
