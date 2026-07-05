const fs = require("fs");
const path = require("path");

const models = {
  athletes: "athlete",
  teams: "team",
  academies: "academy",
  brands: "brand",
  events: "event",
  "blog-posts": "blogPost",
  "success-stories": "successStory",
  testimonials: "testimonial",
  partners: "partner",
  "community-posts": "communityPost",
  enquiries: "enquiry",
  users: "user",
  roles: "role",
};

function walk(dir, out = []) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p, out);
    else if (f === "route.ts") out.push(p);
  }
  return out;
}

const files = walk("src/app/api");

for (const file of files) {
  if (file.includes("settings") || file.includes("upload-logo") || file.endsWith("api\\route.ts")) continue;

  const rel = file.replace(/\\/g, "/");
  const isId = rel.includes("[id]");

  if (isId) {
    const modelKey = Object.entries(models).find(([k]) => rel.includes(`/api/${k}/`))?.[1];
    if (!modelKey) continue;
    fs.writeFileSync(
      file,
      `import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { apiError, apiSuccess, parseId } from "@/lib/api-response";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const recordId = parseId(id);
    if (!recordId) return apiError("Not found", 404);
    const record = await db.${modelKey}.findUnique({ where: { id: recordId } });
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
    const record = await db.${modelKey}.update({ where: { id: recordId }, data: body });
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
    await db.${modelKey}.delete({ where: { id: recordId } });
    return apiSuccess({ message: "Deleted" });
  } catch (err: any) {
    return apiError(err.message);
  }
}
`
    );
    continue;
  }

  const entry = Object.entries(models).find(([k]) => rel === `src/app/api/${k}/route.ts`);
  if (!entry) {
    if (rel === "src/app/api/seed/route.ts") {
      fs.writeFileSync(
        file,
        `import { db } from "@/lib/db";
import { apiError, apiSuccess } from "@/lib/api-response";

export async function GET() {
  try {
    const [services, partners, testimonials, athletes, users, roles] = await Promise.all([
      db.service.count(),
      db.partner.count(),
      db.testimonial.count(),
      db.athlete.count(),
      db.user.count(),
      db.role.count(),
    ]);
    return apiSuccess({ services, partners, testimonials, athletes, users, roles });
  } catch (err: any) {
    return apiError(err.message);
  }
}

export async function POST() {
  return GET();
}
`
      );
    }
    continue;
  }

  const [, modelKey] = entry;
  const order =
    modelKey === "service" || modelKey === "testimonial" || modelKey === "partner"
      ? `{ ${modelKey === "service" ? "sortOrder" : modelKey === "testimonial" || modelKey === "partner" ? "sortOrder" : "createdAt"}: "asc" }`
      : modelKey === "event"
        ? `{ startDate: "asc" }`
        : modelKey === "role"
          ? `{ name: "asc" }`
          : `{ createdAt: "desc" }`;

  const needsSlug = ["athlete", "team", "academy", "brand", "event", "blogPost", "successStory", "service"].includes(modelKey);
  const userSelect =
    modelKey === "user"
      ? `
    const records = await db.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true, name: true, email: true, phone: true, avatar: true,
        userType: true, isActive: true, isVerified: true, createdAt: true, updatedAt: true,
      },
    });`
      : modelKey === "blogPost"
        ? `
    const records = await db.blogPost.findMany({ orderBy: { createdAt: "desc" }, include: { author: { select: { id: true, name: true } } } });`
        : `
    const records = await db.${modelKey}.findMany({ orderBy: ${order} });`;

  const slugBlock = needsSlug
    ? `
    const slug = body.slug || String(body.title || body.name || "item").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");`
    : "";
  const createData = needsSlug ? `{ ...body, slug }` : "body";

  fs.writeFileSync(
    file,
    `import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { apiError, apiSuccess } from "@/lib/api-response";

export async function GET() {
  try {${userSelect}
    return apiSuccess(records);
  } catch (err: any) {
    return apiError(err.message);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();${slugBlock}
    const record = await db.${modelKey}.create({ data: ${createData} });
    return apiSuccess(record, 201);
  } catch (err: any) {
    return apiError(err.message);
  }
}
`
  );
}

console.log("API routes updated");
