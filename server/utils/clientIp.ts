import type { Request } from 'express';

/**
 * The visitor's IP, as resolved by our own nginx.
 *
 * All trust decisions live in nginx: `set_real_ip_from` names the CIDRs allowed
 * to assert a forwarded address, `real_ip_header` picks which header to read,
 * and `proxy_set_header X-Real-IP $remote_addr` then *overwrites* X-Real-IP with
 * the resolved client address on every proxied request.
 *
 * That makes X-Real-IP the one header here a client cannot forge. Reading
 * X-Forwarded-For or CF-Connecting-IP directly would not be safe: nginx appends
 * to X-Forwarded-For rather than replacing it, and nothing strips a
 * client-supplied CF-Connecting-IP now that Cloudflare is no longer in the
 * chain. Either would let a caller choose its own rate-limit bucket.
 */
export const getClientIp = (req: Request): string => {
  const realIp = req.headers['x-real-ip'];
  if (typeof realIp === 'string' && realIp.trim()) return realIp.trim();

  // Direct hit with no proxy in front: local dev and container health checks.
  // `trust proxy` is configured in server/index.ts so req.ip stays meaningful.
  return req.ip ?? 'unknown';
};
