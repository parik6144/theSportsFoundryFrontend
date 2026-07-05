import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { apiError, apiSuccess } from "@/lib/api-response";

export async function GET() {
  try {
    const records = await db.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true, name: true, email: true, phone: true, avatar: true,
        userType: true, isActive: true, isVerified: true, createdAt: true, updatedAt: true,
      },
    });
    return apiSuccess(records);
  } catch (err: any) {
    return apiError(err.message);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const record = await db.user.create({ data: body });
    return apiSuccess(record, 201);
  } catch (err: any) {
    return apiError(err.message);
  }
}
