import { NextRequest } from "next/server";
import { db, apiDbError } from "@/lib/db";
import { apiSuccess } from "@/lib/api-response";
import { prepareAthleteBody } from "@/lib/sanitize-record";

export async function GET() {
  try {
    const records = await db.athlete.findMany({ orderBy: { createdAt: "desc" } });
    return apiSuccess(records);
  } catch (err: any) {
    return apiDbError(err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const record = await db.athlete.create({ data: prepareAthleteBody(body) as any });
    return apiSuccess(record, 201);
  } catch (err: any) {
    return apiDbError(err);
  }
}
