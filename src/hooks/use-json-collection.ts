"use client";

import { useCallback, useEffect, useState } from "react";

export function useJsonCollection<T = Record<string, unknown>>(endpoint: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/${endpoint}`, { cache: "no-store" });
      const json = await res.json();
      if (!json.success) {
        setError(json.error || "Failed to load");
        setData([]);
        return;
      }
      setData(Array.isArray(json.data) ? json.data : []);
    } catch (err: any) {
      setError(err?.message || "Failed to load");
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}
