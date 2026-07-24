import { NextRequest } from "next/server";
import { db, apiDbError } from "@/lib/db";
import { apiError, apiSuccess, parseId } from "@/lib/api-response";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const recordId = parseId(id);
    if (!recordId) return apiError("Not found", 404);
    const record = await db.communityPost.findUnique({ where: { id: recordId } });
    if (!record) return apiError("Not found", 404);
    return apiSuccess(record);
  } catch (err: any) {
    return apiDbError(err);
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const recordId = parseId(id);
    if (!recordId) return apiError("Not found", 404);
    const body = await req.json();
    const record = await db.communityPost.update({ where: { id: recordId }, data: body });
    return apiSuccess(record);
  } catch (err: any) {
    return apiDbError(err);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const recordId = parseId(id);
    if (!recordId) return apiError("Not found", 404);
    await db.communityPost.delete({ where: { id: recordId } });
    return apiSuccess({ message: "Deleted" });
  } catch (err: any) {
    return apiDbError(err);
  }
}
