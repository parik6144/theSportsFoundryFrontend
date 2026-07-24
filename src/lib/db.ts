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

/** True when DATABASE_URL is set (EC2 admin). Public Vercel deploys should omit it. */
export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL?.trim())
}

/**
 * Turn Prisma / connection failures into a short admin-facing message.
 * Vercel cannot reach EC2 MySQL at 13.x:3306 unless the security group allows it.
 */
export function toApiDbError(err: unknown): string {
  if (!isDatabaseConfigured()) {
    return "Database is not configured on this host. Use the EC2 admin for Athletes, Teams, Academies, and Brands — or set a reachable DATABASE_URL."
  }

  const raw = err instanceof Error ? err.message : String(err ?? "Database error")
  const unreachable =
    /Can't reach database server/i.test(raw) ||
    /P1001/i.test(raw) ||
    /ECONNREFUSED/i.test(raw) ||
    /ETIMEDOUT/i.test(raw)

  if (unreachable) {
    return "Cannot reach MySQL (check DATABASE_URL host/port and EC2 security group for 3306). On Vercel, remove DATABASE_URL and manage data on EC2 admin instead."
  }

  return raw.replace(/^Invalid `[^`]+` invocation:?\s*/i, "").trim() || raw
}

export function apiDbError(err: unknown, status = 503) {
  return apiError(toApiDbError(err), status)
}
