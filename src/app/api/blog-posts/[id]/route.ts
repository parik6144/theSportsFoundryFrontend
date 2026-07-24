import { NextRequest } from "next/server";
import { apiDbError } from "@/lib/db";
import { apiError, apiSuccess } from "@/lib/api-response";
import { repoDelete, repoGet, repoUpdate } from "@/lib/collection-repo";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const record = await repoGet("blog-posts", id);
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
    const record = await repoUpdate("blog-posts", id, body);
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
    const ok = await repoDelete("blog-posts", id);
    if (!ok) return apiError("Not found", 404);
    return apiSuccess({ message: "Deleted" });
  } catch (err: any) {
    return apiDbError(err);
  }
}
