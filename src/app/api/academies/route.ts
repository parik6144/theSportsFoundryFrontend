import { NextRequest } from "next/server";
import { apiDbError } from "@/lib/db";
import { apiSuccess } from "@/lib/api-response";
import { repoCreate, repoList } from "@/lib/collection-repo";
import { prepareAcademyBody } from "@/lib/sanitize-record";

export async function GET() {
  try {
    const records = await repoList("academies", { orderBy: "createdAt", order: "desc" });
    return apiSuccess(records);
  } catch (err: any) {
    return apiDbError(err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const record = await repoCreate("academies", prepareAcademyBody(body) as Record<string, unknown>);
    return apiSuccess(record, 201);
  } catch (err: any) {
    return apiDbError(err);
  }
}
