# Cloudflare Setup cho PICC 2026

## 1. DNS Records

| Type | Name | Content | Proxy |
|------|------|---------|-------|
| `A` | `@` | `<IP-frontend-server>` | Proxied (orange cloud) |
| `A` | `www` | `<IP-frontend-server>` | Proxied (orange cloud) |
| `A` | `api` | `<IP-backend-server>` | Proxied (orange cloud) |

## 2. SSL/TLS

- **Mode:** Full (Strict)
- **Origin Certificate:** Tạo từ Cloudflare → SSL/TLS → Origin Server
  - Đặt cert/key lên backend server, trỏ trong `infra/nginx/backend.conf`
- **Always Use HTTPS:** ON
- **Minimum TLS Version:** 1.2

## 3. Cache Rules

### Cache Rule cho static assets
```
URL: *.picc.vn/assets/*
Expression: (http.host contains "picc.vn" and starts_with(http.request.uri.path, "/assets/"))
Edge TTL: 1 year
Cache Level: Cache Everything
```

### Cache Rule cho index.html (KHÔNG cache)
```
URL: picc.vn/
Expression: (http.host contains "picc.vn" and http.request.uri.path eq "/")
Edge TTL: No cache
Browser TTL: No cache
```

## 4. Page Rules (nếu dùng plan miễn phí)

| Rule | Setting |
|------|---------|
| `picc.vn/assets/*` | Cache Level: Cache Everything, Edge Cache TTL: 1 month |
| `picc.vn/*.js` `picc.vn/*.css` | Cache Level: Cache Everything, Edge Cache TTL: 1 month |
| `api.picc.vn/api/v1/public/competition/status` | Cache Level: Cache Everything, Edge Cache TTL: 10s |
| `api.picc.vn/api/public-config` | Cache Level: Cache Everything, Edge Cache TTL: 10s |
| `api.picc.vn/api/v1/public/*` | Cache Level: Standard |
| `api.picc.vn/api/v1/admin/*` | Cache Level: Bypass, Security: High |

## 5. WAF (Web Application Firewall)

### 5.1 Rate Limiting Rules

| Rule | URI | Threshold | Action |
|------|-----|-----------|--------|
| Auth login | `/api/v1/admin/auth/login` | 5 req/min | Block for 10 min |
| Registration | `/api/v1/public/registrations` | 3 req/min | Block for 10 min |
| API general | `/api/*` | 100 req/min | Block for 1 min |

### 5.2 Security Rules
- **Block** requests without valid User-Agent
- **Block** SQL injection patterns to `/api/`
- **Challenge (JS)** for admin paths `/api/v1/admin/`
- **Allow** chỉ Việt Nam (nếu muốn giới hệu địa lý)

## 6. Performance

- **Auto Minify:** ON (JavaScript, CSS, HTML)
- **Brotli:** ON
- **Early Hints:** ON
- **0-RTT:** ON
- **HTTP/3 (QUIC):** ON
- **Rocket Loader:** OFF (gây conflict với React 19)

## 7. Workers (optional - nếu cần)

Nếu muốn edge cache cho API mà không cần backend call:
```js
// Cache-first cho public API endpoints
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith('/api/v1/public/')) {
      const cache = caches.default;
      const cached = await cache.match(request);
      if (cached) return cached;
      const response = await fetch(request);
      if (response.ok) {
        const headers = new Headers(response.headers);
        headers.set('Cache-Control', 'public, s-maxage=10');
        const cachedRes = new Response(response.body, { ...response, headers });
        ctx.waitUntil(cache.put(request, cachedRes.clone()));
        return cachedRes;
      }
      return response;
    }
    return fetch(request);
  },
};
```

## 8. Kiểm tra sau khi setup

```bash
# Check SSL
curl -sI https://picc.vn | grep -i "strict-transport-security"
curl -sI https://api.picc.vn/health

# Check cache headers
curl -sI https://picc.vn/assets/picc/hero-sign-desktop.webp | grep -i "cache-control"

# Check Cloudflare headers
curl -sI https://picc.vn | grep -i "cf-"
```
