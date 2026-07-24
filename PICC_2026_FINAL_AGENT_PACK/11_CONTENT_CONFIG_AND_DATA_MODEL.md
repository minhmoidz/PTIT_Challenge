# 11 — Content Config and Data Model

## 1. Public config contract

```ts
export interface PublicPiccConfig {
  serverTime: string;
  environment: 'preview' | 'production';
  registration: {
    openAt: string | null;
    closeAt: string | null;
    allowSubmissions: boolean;
    explicitlyDisabled: boolean;
    statusMessage?: string;
  };
  teamSize: {
    min: number;
    max: number | null;
    approvalStatus: ApprovalStatus;
  };
  challengeSelection: {
    mode: 'single' | 'multiple' | null;
    maxSelections?: number;
  };
  timeline: TimelineItem[];
  assets: AssetManifest;
}
```

## 2. Registration status

```ts
export type RegistrationStatus =
  | 'not_configured'
  | 'not_open'
  | 'open'
  | 'closed'
  | 'manually_disabled';
```

Priority:

1. invalid/missing dates → `not_configured`.
2. `allowSubmissions === false` → `manually_disabled`.
3. before open → `not_open`.
4. before close → `open`.
5. otherwise → `closed`.

## 3. Static content structure

```text
src/content/vi/
  site.ts
  hero.ts
  introduction.ts
  rules.ts
  awards.ts
  faq.ts
```

Nếu chỉ tiếng Việt trong MVP vẫn cấu trúc i18n để sẵn sàng mở rộng, nhưng không làm language switch khi chưa approved.

## 4. Asset manifest

```ts
export const assetManifest = {
  heroDesktop: {
    src: '/assets/picc/hero-sign-desktop.webp',
    width: 1600,
    height: 1600,
    usage: 'production-candidate',
    approvalStatus: 'unresolved',
    containsText: true,
  },
  heroMobile: {
    src: '/assets/picc/hero-sign-mobile.webp',
    width: 960,
    height: 963,
    usage: 'production-candidate',
    approvalStatus: 'unresolved',
    containsText: true,
  },
  facebookCover: {
    src: '/assets/picc/facebook-cover-with-dates.webp',
    usage: 'conditional',
    enabled: false,
    embeddedDates: ['2026-08-19', '2026-09-15', '2026-10-02'],
  },
} as const;
```

## 5. Configuration validation

Production build/runtime checks:

- open/close valid.
- P0 approved.
- asset approval.
- no reference-only asset imported.
- timeline non-empty và approved nếu section enabled.
- all internal links valid.
- no draft FAQ.
- no `TBD` string.
- Facebook Cover embedded dates match approved config if enabled.

## 6. Environment variables

Client:

```env
VITE_APP_ENV=preview
VITE_PUBLIC_API_BASE_URL=/api
VITE_PUBLIC_SITE_URL=
VITE_ANALYTICS_ENABLED=false
```

Server:

```env
PICC_REGISTRATION_OPEN_AT=
PICC_REGISTRATION_CLOSE_AT=
PICC_REGISTRATION_ENABLED=false
GOOGLE_SERVICE_ACCOUNT_JSON=
GOOGLE_SHEETS_ID=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

Không đưa server env vào `VITE_*`.
