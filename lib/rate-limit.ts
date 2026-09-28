type Entry = { count: number; resetAt: number };

export function rateLimit({ limit, windowMs }: { limit: number; windowMs: number }) {
  const store = new Map<string, Entry>();
  return {
    check(key: string) {
      const now = Date.now();
      const current = store.get(key);
      if (!current || current.resetAt <= now) {
        store.set(key, { count: 1, resetAt: now + windowMs });
        return true;
      }
      if (current.count >= limit) return false;
      current.count += 1;
      return true;
    }
  };
}
