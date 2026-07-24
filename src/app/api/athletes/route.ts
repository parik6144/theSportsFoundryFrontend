import { NextRequest } from "next/server";
import { apiDbError } from "@/lib/db";
import { apiSuccess } from "@/lib/api-response";
import { repoCreate, repoList } from "@/lib/collection-repo";
import { prepareAthleteBody } from "@/lib/sanitize-record";

export async function GET() {
  try {
    const records = await repoList("athletes", { orderBy: "createdAt", order: "desc" });
    return apiSuccess(records);
  } catch (err: any) {
    return apiDbError(err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const record = await repoCreate("athletes", prepareAthleteBody(body) as Record<string, unknown>);
    return apiSuccess(record, 201);
  } catch (err: any) {
    return apiDbError(err);
  }
}
