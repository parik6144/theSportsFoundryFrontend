import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { apiError, apiSuccess } from "@/lib/api-response";

export async function GET() {
  try {
    const records = await db.testimonial.findMany({ orderBy: { sortOrder: "asc" } });
    return apiSuccess(records);
  } catch (err: any) {
    return apiError(err.message);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const record = await db.testimonial.create({ data: body });
    return apiSuccess(record, 201);
  } catch (err: any) {
    return apiError(err.message);
  }
}
