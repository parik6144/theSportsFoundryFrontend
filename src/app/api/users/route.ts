import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

const userSelect = {
  id: true,
  name: true,
  email: true,
  phone: true,
  avatar: true,
  userType: true,
  isActive: true,
  isVerified: true,
  createdAt: true,
  updatedAt: true,
} as const;

export async function GET() {
  try {
    const records = await db.user.findMany({ orderBy: { createdAt: "desc" }, select: userSelect });
    return NextResponse.json({ success: true, data: records });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const record = await db.user.create({ data: body, select: userSelect });
    return NextResponse.json({ success: true, data: record }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
