import { NextResponse } from "next/server";
import { backendGet } from "@/lib/backend";

export async function GET() {
  try {
    const records = await backendGet("/testimonials");
    return NextResponse.json({ success: true, data: records });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
