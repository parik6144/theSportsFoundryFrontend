import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { apiError, apiSuccess } from "@/lib/api-response";

export async function GET() {
  try {
    const records = await db.enquiry.findMany({ orderBy: { createdAt: "desc" } });
    return apiSuccess(records);
  } catch (err: any) {
    return apiError(err.message);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const record = await db.enquiry.create({ data: body });
    return apiSuccess(record, 201);
  } catch (err: any) {
    return apiError(err.message);
  }
}
