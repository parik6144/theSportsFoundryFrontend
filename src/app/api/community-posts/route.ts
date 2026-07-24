import { NextRequest } from "next/server";
import { db, apiDbError } from "@/lib/db";
import { apiSuccess } from "@/lib/api-response";

export async function GET() {
  try {
    const records = await db.communityPost.findMany({ orderBy: { createdAt: "desc" } });
    return apiSuccess(records);
  } catch (err: any) {
    return apiDbError(err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const record = await db.communityPost.create({ data: body });
    return apiSuccess(record, 201);
  } catch (err: any) {
    return apiDbError(err);
  }
}
