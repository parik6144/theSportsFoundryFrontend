import { NextRequest } from "next/server";
import { apiDbError } from "@/lib/db";
import { apiSuccess } from "@/lib/api-response";
import { repoCreate, repoList } from "@/lib/collection-repo";

export async function GET() {
  try {
    const records = await repoList("roles", { orderBy: "name", order: "asc" });
    return apiSuccess(records);
  } catch (err: any) {
    return apiDbError(err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const record = await repoCreate("roles", body);
    return apiSuccess(record, 201);
  } catch (err: any) {
    return apiDbError(err);
  }
}
