import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { apiError, apiSuccess, parseId } from "@/lib/api-response";
import { prepareAthleteBody } from "@/lib/sanitize-record";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const recordId = parseId(id);
    if (!recordId) return apiError("Not found", 404);
    const record = await db.athlete.findUnique({ where: { id: recordId } });
    if (!record) return apiError("Not found", 404);
    return apiSuccess(record);
  } catch (err: any) {
    return apiError(err.message);
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const recordId = parseId(id);
    if (!recordId) return apiError("Not found", 404);
    const body = await req.json();
    const record = await db.athlete.update({
      where: { id: recordId },
      data: prepareAthleteBody(body) as any,
    });
    return apiSuccess(record);
  } catch (err: any) {
    return apiError(err.message);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const recordId = parseId(id);
    if (!recordId) return apiError("Not found", 404);
    await db.athlete.delete({ where: { id: recordId } });
    return apiSuccess({ message: "Deleted" });
  } catch (err: any) {
    return apiError(err.message);
  }
}
