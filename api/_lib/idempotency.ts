const store = new Map<string, { result: unknown; ttl: number }>();

export async function getIdempotencyResult(key: string): Promise<unknown | null> {
  const entry = store.get(key);
  if (!entry) return null;
  if (Date.now() > entry.ttl) {
    store.delete(key);
    return null;
  }
  return entry.result;
}

export async function setIdempotencyResult(key: string, result: unknown, ttlMs = 86400000) {
  store.set(key, { result, ttl: Date.now() + ttlMs });
}
