const requestCounts = new Map<string, { count: number; resetAt: number }>();

export async function checkRateLimit(key: string, maxRequests = 10, windowMs = 60000): Promise<boolean> {
  const now = Date.now();
  const entry = requestCounts.get(key);

  if (!entry || now > entry.resetAt) {
    requestCounts.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= maxRequests) {
    return false;
  }

  entry.count++;
  return true;
}
