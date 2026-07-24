# 12 — Technical Architecture

## 1. Stack

### Frontend

- React 19.
- TypeScript strict.
- Vite.
- Material UI v7.
- `@mui/icons-material`.
- Emotion (MUI styling engine).
- Motion for React.
- React Router DOM v7.
- TanStack React Query v5.
- React Hook Form + Zod + resolvers.
- i18next/react-i18next.
- Axios.
- date-fns cho format thời gian nếu cần.

### Quality

- ESLint.
- Prettier.
- Vitest.
- React Testing Library.
- Playwright.

### Backend default

- Vercel Functions.
- Node.js 20.
- Google Sheets adapter.
- Upstash Redis adapter cho rate limit/idempotency nếu production.

## 2. Suggested packages

```bash
pnpm add @mui/material @mui/icons-material @emotion/react @emotion/styled
pnpm add react-router-dom @tanstack/react-query axios
pnpm add react-hook-form zod @hookform/resolvers
pnpm add i18next react-i18next motion date-fns
pnpm add -D vitest @testing-library/react @testing-library/jest-dom
pnpm add -D @playwright/test eslint prettier tsx
```

## 3. Folder structure

```text
src/
  app/
    App.tsx
    providers/
    router/
  components/
    ui/
  config/
    env.ts
    public-config.ts
    asset-manifest.ts
  content/
    vi/
  features/
    countdown/
    navigation/
    registration/
      api/
      components/
      hooks/
      model/
      schemas/
  layouts/
  pages/
  sections/
    hero/
    introduction/
    quick-facts/
    timeline/
    rules/
    awards/
    mentors/
    sponsors/
    faq/
    registration/
  services/
    http/
    public-config/
    registrations/
  theme/
    createPiccTheme.ts
    palette.ts
    components.ts
  motion/
    tokens.ts
    variants.ts
  types/
  utils/
api/
  public-config.ts
  registrations.ts
  _lib/
    validation.ts
    sheets.ts
    rate-limit.ts
    idempotency.ts
public/
  assets/picc/
```

## 4. Provider tree

```text
StrictMode
  ErrorBoundary
    StyledEngineProvider
      ThemeProvider
        CssBaseline
          I18nextProvider
            QueryClientProvider
              RouterProvider
```

## 5. Styling rules

- Theme là source of truth.
- `sx` cho local composition.
- `styled` cho reusable styled components.
- Global CSS chỉ cho font-face, reset phụ, print và accessibility utility cần thiết.
- Không dùng `.css` rải rác cho section nếu có thể biểu diễn bằng theme/sx.

## 6. Public config flow

1. App gọi `/api/public-config` bằng React Query.
2. API trả serverTime + registration config.
3. Client tính `clockOffsetMs`.
4. Countdown/state hook dùng effective server time.
5. POST registration server kiểm tra lại config.

Có fallback content-only nếu public-config lỗi nhưng không được cho submit.

## 7. Image implementation

- Copy optimized assets vào `public/assets/picc/`.
- Hero `<picture>` absolute.
- MUI `Box component="img"` hoặc native picture wrapper.
- Không import PNG source 4MB vào JS bundle.

## 8. Code splitting

- Landing critical sections không split quá nhỏ.
- Success/404 lazy.
- Form có thể lazy nếu dưới fold nhưng preload khi CTA hover/intersection.
- Mentor images lazy.

## 9. Error handling

- Route-level error boundary.
- Query error fallback.
- Domain error mapper.
- Request ID hiển thị cho support.
- Redact PII trong monitoring.

## 10. Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "typecheck": "tsc --noEmit",
    "lint": "eslint . --max-warnings=0",
    "test": "vitest run",
    "test:e2e": "playwright test",
    "validate:config": "tsx scripts/validate-picc-config.ts",
    "build": "pnpm validate:config && pnpm typecheck && vite build",
    "check": "pnpm lint && pnpm test && pnpm build"
  }
}
```

## 11. Do not do

- Không dùng Tailwind.
- Không gọi Google Sheets từ browser.
- Không quyết định open/closed chỉ bằng client.
- Không đặt secret trong repo.
- Không import reference-only assets vào app source.
