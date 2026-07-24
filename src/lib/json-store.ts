import { put, list } from "@vercel/blob";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { existsSync } from "fs";

export type JsonRecord = Record<string, unknown> & {
  id: string | number;
  createdAt?: string;
  updatedAt?: string;
};

export type CollectionName =
  | "enquiries"
  | "athletes"
  | "teams"
  | "academies"
  | "brands"
  | "events"
  | "services"
  | "blog-posts"
  | "testimonials"
  | "partners"
  | "community-posts"
  | "success-stories"
  | "users"
  | "roles";

const ALL_COLLECTIONS: CollectionName[] = [
  "enquiries",
  "athletes",
  "teams",
  "academies",
  "brands",
  "events",
  "services",
  "blog-posts",
  "testimonials",
  "partners",
  "community-posts",
  "success-stories",
  "users",
  "roles",
];

const BLOB_PREFIX = "sportsfoundry/data";

function useBlob(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim());
}

function dataDir(): string {
  return path.join(process.cwd(), "data");
}

function localPath(collection: CollectionName): string {
  return path.join(dataDir(), `${collection}.json`);
}

function blobPathname(collection: CollectionName): string {
  return `${BLOB_PREFIX}/${collection}.json`;
}

async function ensureDataDir() {
  const dir = dataDir();
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true });
  }
}

async function readLocal(collection: CollectionName): Promise<JsonRecord[]> {
  await ensureDataDir();
  const file = localPath(collection);
  if (!existsSync(file)) {
    await writeFile(file, "[]", "utf-8");
    return [];
  }
  try {
    const raw = await readFile(file, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as JsonRecord[]) : [];
  } catch {
    return [];
  }
}

async function writeLocal(collection: CollectionName, records: JsonRecord[]) {
  await ensureDataDir();
  await writeFile(localPath(collection), JSON.stringify(records, null, 2), "utf-8");
}

async function readBlob(collection: CollectionName): Promise<JsonRecord[]> {
  const pathname = blobPathname(collection);
  const { blobs } = await list({ prefix: pathname, limit: 10 });
  const match = blobs.find((b) => b.pathname === pathname) ?? blobs[0];
  if (!match?.url) return [];

  const res = await fetch(match.url, { cache: "no-store" });
  if (!res.ok) return [];
  try {
    const parsed = await res.json();
    return Array.isArray(parsed) ? (parsed as JsonRecord[]) : [];
  } catch {
    return [];
  }
}

async function writeBlob(collection: CollectionName, records: JsonRecord[]) {
  await put(blobPathname(collection), JSON.stringify(records, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

async function readAll(collection: CollectionName): Promise<JsonRecord[]> {
  if (useBlob()) return readBlob(collection);
  return readLocal(collection);
}

async function writeAll(collection: CollectionName, records: JsonRecord[]) {
  if (useBlob()) return writeBlob(collection, records);
  return writeLocal(collection, records);
}

function idsEqual(a: unknown, b: unknown): boolean {
  return String(a) === String(b);
}

function nextId(records: JsonRecord[]): number {
  let max = 0;
  for (const r of records) {
    const n = Number(r.id);
    if (Number.isFinite(n) && n > max) max = n;
  }
  return max + 1;
}

function sortByCreatedDesc(records: JsonRecord[]): JsonRecord[] {
  return [...records].sort((a, b) => {
    const ta = new Date(String(a.createdAt || 0)).getTime();
    const tb = new Date(String(b.createdAt || 0)).getTime();
    return tb - ta;
  });
}

function sortByField(
  records: JsonRecord[],
  field: string,
  direction: "asc" | "desc" = "asc"
): JsonRecord[] {
  return [...records].sort((a, b) => {
    const av = a[field];
    const bv = b[field];
    if (typeof av === "number" && typeof bv === "number") {
      return direction === "asc" ? av - bv : bv - av;
    }
    const as = String(av ?? "");
    const bs = String(bv ?? "");
    return direction === "asc" ? as.localeCompare(bs) : bs.localeCompare(as);
  });
}

export function isJsonStoreEnabled(): boolean {
  const forced = process.env.DATA_STORE?.trim().toLowerCase();
  if (forced === "json") return true;
  if (forced === "mysql" || forced === "prisma") return false;
  // Blob token present → prefer JSON even if a stale DATABASE_URL remains
  if (process.env.BLOB_READ_WRITE_TOKEN?.trim()) return true;
  // Default: JSON when no MySQL URL (Vercel / local without DB)
  return !process.env.DATABASE_URL?.trim();
}

export function jsonStoreBackend(): "blob" | "local" {
  return useBlob() ? "blob" : "local";
}

export async function jsonList(
  collection: CollectionName,
  opts?: { orderBy?: string; order?: "asc" | "desc" }
): Promise<JsonRecord[]> {
  const records = await readAll(collection);
  if (opts?.orderBy === "createdAt" || !opts?.orderBy) {
    return opts?.order === "asc"
      ? sortByCreatedDesc(records).reverse()
      : sortByCreatedDesc(records);
  }
  if (opts?.orderBy === "sortOrder" || opts?.orderBy === "name" || opts?.orderBy === "startDate") {
    return sortByField(records, opts.orderBy, opts.order ?? "asc");
  }
  return sortByCreatedDesc(records);
}

export async function jsonGetById(
  collection: CollectionName,
  id: string | number
): Promise<JsonRecord | null> {
  const records = await readAll(collection);
  return records.find((r) => idsEqual(r.id, id)) ?? null;
}

export async function jsonCreate(
  collection: CollectionName,
  data: Record<string, unknown>
): Promise<JsonRecord> {
  const records = await readAll(collection);
  const now = new Date().toISOString();
  const { id: _ignore, createdAt: _c, updatedAt: _u, ...rest } = data;
  const record: JsonRecord = {
    ...rest,
    id: nextId(records),
    createdAt: now,
    updatedAt: now,
  };
  records.push(record);
  await writeAll(collection, records);
  return record;
}

export async function jsonUpdate(
  collection: CollectionName,
  id: string | number,
  data: Record<string, unknown>
): Promise<JsonRecord | null> {
  const records = await readAll(collection);
  const idx = records.findIndex((r) => idsEqual(r.id, id));
  if (idx < 0) return null;
  const { id: _i, createdAt: _c, ...rest } = data;
  const updated: JsonRecord = {
    ...records[idx],
    ...rest,
    id: records[idx].id,
    createdAt: records[idx].createdAt,
    updatedAt: new Date().toISOString(),
  };
  records[idx] = updated;
  await writeAll(collection, records);
  return updated;
}

export async function jsonRemove(
  collection: CollectionName,
  id: string | number
): Promise<boolean> {
  const records = await readAll(collection);
  const next = records.filter((r) => !idsEqual(r.id, id));
  if (next.length === records.length) return false;
  await writeAll(collection, next);
  return true;
}

export async function jsonCount(collection: CollectionName): Promise<number> {
  const records = await readAll(collection);
  return records.length;
}

export async function jsonCounts(): Promise<Record<string, number>> {
  const out: Record<string, number> = {};
  for (const name of ALL_COLLECTIONS) {
    out[name] = await jsonCount(name);
  }
  return out;
}

export { ALL_COLLECTIONS };
