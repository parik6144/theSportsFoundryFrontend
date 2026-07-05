import { NextResponse } from "next/server";

export function jsonSafe<T>(value: T): T {
  return JSON.parse(
    JSON.stringify(value, (_key, v) => (typeof v === "bigint" ? Number(v) : v))
  );
}

export function apiSuccess(data: unknown, status = 200) {
  return NextResponse.json({ success: true, data: jsonSafe(data) }, { status });
}

export function apiError(error: string, status = 500) {
  return NextResponse.json({ success: false, error }, { status });
}

export function parseId(id: string): bigint | null {
  if (!/^\d+$/.test(id)) return null;
  return BigInt(id);
}
