import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { apiError, apiSuccess } from "@/lib/api-response";

export async function GET() {
  try {
    const records = await db.event.findMany({ orderBy: { startDate: "asc" } });
    return apiSuccess(records);
  } catch (err: any) {
    return apiError(err.message);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const slug = body.slug || String(body.title || body.name || "item").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const record = await db.event.create({ data: { ...body, slug } });
    return apiSuccess(record, 201);
  } catch (err: any) {
    return apiError(err.message);
  }
}
