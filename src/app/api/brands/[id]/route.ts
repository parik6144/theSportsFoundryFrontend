import { NextRequest } from "next/server";
import { apiDbError } from "@/lib/db";
import { apiError, apiSuccess } from "@/lib/api-response";
import { repoDelete, repoGet, repoUpdate } from "@/lib/collection-repo";
import { prepareBrandBody } from "@/lib/sanitize-record";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const record = await repoGet("brands", id);
    if (!record) return apiError("Not found", 404);
    return apiSuccess(record);
  } catch (err: any) {
    return apiDbError(err);
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const record = await repoUpdate("brands", id, prepareBrandBody(body) as Record<string, unknown>);
    if (!record) return apiError("Not found", 404);
    return apiSuccess(record);
  } catch (err: any) {
    return apiDbError(err);
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const ok = await repoDelete("brands", id);
    if (!ok) return apiError("Not found", 404);
    return apiSuccess({ message: "Deleted" });
  } catch (err: any) {
    return apiDbError(err);
  }
}
