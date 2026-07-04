import { NextRequest, NextResponse } from "next/server";
import { backendPost } from "@/lib/backend";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: [],
    message: "Manage enquiries in Laravel admin: http://127.0.0.1:8000/admin",
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const record = await backendPost("/enquiries", body);
    return NextResponse.json({ success: true, data: record }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
