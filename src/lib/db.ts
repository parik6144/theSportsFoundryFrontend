import { PrismaClient } from '@prisma/client'
import { apiError } from "@/lib/api-response"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db

/** True when DATABASE_URL is set (legacy MySQL). Prefer JSON store on Vercel. */
export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL?.trim())
}

/**
 * Turn store / Prisma failures into a short admin-facing message.
 */
export function toApiDbError(err: unknown): string {
  const raw = err instanceof Error ? err.message : String(err ?? "Data store error")

  if (/BLOB_READ_WRITE_TOKEN|No token|blob/i.test(raw) && !process.env.BLOB_READ_WRITE_TOKEN) {
    return "JSON store needs BLOB_READ_WRITE_TOKEN on Vercel (Storage → Blob). Locally, data is written to data/*.json without a token."
  }

  const unreachable =
    /Can't reach database server/i.test(raw) ||
    /P1001/i.test(raw) ||
    /ECONNREFUSED/i.test(raw) ||
    /ETIMEDOUT/i.test(raw)

  if (unreachable) {
    return "Cannot reach MySQL. Remove DATABASE_URL on Vercel to use the JSON store (Blob), or fix DATABASE_URL."
  }

  return raw.replace(/^Invalid `[^`]+` invocation:?\s*/i, "").trim() || raw
}

export function apiDbError(err: unknown, status = 503) {
  return apiError(toApiDbError(err), status)
}
