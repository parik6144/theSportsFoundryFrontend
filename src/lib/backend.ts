const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";

export async function backendGet(endpoint: string) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  const json = await res.json();

  if (!res.ok || json.success === false) {
    throw new Error(json.message || `Backend error: ${res.status}`);
  }

  // Laravel paginator comes as { data: [...], current_page, ... }
  const payload = json.data;
  if (payload && Array.isArray(payload.data)) {
    return payload.data;
  }

  return payload;
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

  return json.data;
}
