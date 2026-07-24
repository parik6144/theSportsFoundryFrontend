import { NextRequest } from "next/server";
import { db, apiDbError } from "@/lib/db";
import { apiSuccess } from "@/lib/api-response";

export async function GET() {
  try {
    const records = await db.service.findMany({ orderBy: { sortOrder: "asc" } });
    return apiSuccess(records);
  } catch (err: any) {
    return apiDbError(err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const slug =
      body.slug ||
      String(body.title || "item")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    const record = await db.service.create({ data: { ...body, slug } });
    return apiSuccess(record, 201);
  } catch (err: any) {
    return apiDbError(err);
  }
}
