import { NextRequest } from "next/server";
import { apiDbError } from "@/lib/db";
import { apiSuccess } from "@/lib/api-response";
import { repoCreate, repoList } from "@/lib/collection-repo";

export async function GET() {
  try {
    const records = await repoList("services", { orderBy: "sortOrder", order: "asc" });
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
      String(body.title || body.name || "item")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    const record = await repoCreate("services", { ...body, slug });
    return apiSuccess(record, 201);
  } catch (err: any) {
    return apiDbError(err);
  }
}
