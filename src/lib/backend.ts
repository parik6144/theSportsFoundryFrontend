const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";

function snakeToCamel(key: string): string {
  return key.replace(/_([a-z])/g, (_, char: string) => char.toUpperCase());
}

export function normalizeRecord<T = Record<string, unknown>>(record: unknown): T {
  if (record === null || record === undefined) {
    return record as T;
  }

  if (Array.isArray(record)) {
    return record.map((item) => normalizeRecord(item)) as T;
  }

  if (typeof record !== "object") {
    return record as T;
  }

  const normalized: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(record as Record<string, unknown>)) {
    normalized[snakeToCamel(key)] = normalizeRecord(value);
  }

  return normalized as T;
}

export function normalizeList<T = Record<string, unknown>>(records: unknown): T[] {
  if (!Array.isArray(records)) {
    return [];
  }

  return records.map((record) => normalizeRecord<T>(record));
}

export async function backendGet(endpoint: string) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  const json = await res.json();

  if (!res.ok || json.success === false) {
    throw new Error(json.message || `Backend error: ${res.status}`);
  }

  const payload = json.data;

  if (payload && Array.isArray(payload.data)) {
    return normalizeList(payload.data);
  }

  if (Array.isArray(payload)) {
    return normalizeList(payload);
  }

  return normalizeRecord(payload);
}

export async function backendPost(endpoint: string, body: unknown) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const json = await res.json();

  if (!res.ok || json.success === false) {
    throw new Error(json.message || `Backend error: ${res.status}`);
  }

  return normalizeRecord(json.data);
}
