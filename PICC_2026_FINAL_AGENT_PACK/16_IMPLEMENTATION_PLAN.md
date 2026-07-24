# 16 — Implementation Plan

## Phase 0 — Audit and decisions

- Read docs.
- Audit repo and package versions.
- Confirm MUI-only approach.
- Copy optimized assets to public directory.
- Record unresolved P0.

Deliverable: audit report + file plan.

## Phase 1 — Foundation

- Vite React TS.
- Strict TS.
- MUI theme/component overrides.
- Router, Query, i18n providers.
- Axios client.
- Motion tokens.
- ESLint/Prettier/Vitest/Playwright.

Gate: typecheck/lint/build.

## Phase 2 — Hero and shell

- Header/Drawer.
- Hero `<picture>` implementation.
- Artwork responsive layout.
- Countdown visual mock.
- CTA state interface.
- Decorative icons/motion.

Gate: desktop/mobile visual review, LCP asset check.

## Phase 3 — Content sections

- Introduction.
- Quick Facts.
- Timeline semantic component.
- Rules.
- Awards/benefits.
- Optional mentors/sponsors/FAQ.
- CTA/footer.

Gate: responsive + keyboard.

## Phase 4 — Public config and state

- GET public-config.
- Clock offset.
- Registration status hook.
- Synchronize Hero/CTA/form.
- Tests boundary.

Gate: status tests.

## Phase 5 — Form

- FormProvider/schema factory.
- Step 1 bind leader fields to `members[0]`.
- Dynamic members.
- Review/commitments.
- Draft/session.
- Error summary.
- Motion/reduced motion.

Gate: integration tests.

## Phase 6 — API/storage

- Vercel registration endpoint.
- Validation/state/idempotency/rate limit.
- Sheets Registrations + Members.
- Request ID/log redaction.

Gate: API tests + staging Sheets.

## Phase 7 — QA/polish

- Accessibility.
- SEO metadata.
- Performance.
- Cross-browser.
- Visual regression.
- Production config validator.

## Phase 8 — UAT/release

- BTC content/asset approval.
- Complete decision register.
- Test real registration.
- Backup/runbook/on-call.
- Production smoke test.

## Parallel work allowed

Agent được làm foundation, components, mock form, animation và tests khi business values unresolved. Không được publish unapproved values hoặc enable production submit.
