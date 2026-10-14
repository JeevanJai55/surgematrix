type Entry = { count: number; resetAt: number };
export function rateLimit({ limit, windowMs }: { limit: number; windowMs: number }) {
  const store = new Map<string, Entry>(); const maxKeys = 10_000;
  return {
    check(key: string) {
      const now = Date.now();
      for (const [k, entry] of store) { if (entry.resetAt <= now) store.delete(k); }
      const current = store.get(key);
      if (!current) {
        if (store.size >= maxKeys) return false;
        store.set(key, { count: 1, resetAt: now + windowMs }); return true;
      }
      if (current.count >= limit) return false;
      current.count += 1; return true;
    }
  };
}
