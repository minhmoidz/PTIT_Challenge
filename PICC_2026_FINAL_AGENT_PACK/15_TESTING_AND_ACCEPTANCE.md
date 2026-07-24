# 15 — Testing and Acceptance

## 1. Unit tests

### Registration status

- Missing config.
- Before open.
- Exactly open.
- One second before close.
- Exactly close.
- After close.
- Manual disable.
- Invalid open >= close.
- Client timezone different.
- Server offset applied.

### Form schema

- Team size boundaries.
- Members count match.
- Exactly one leader at index 0.
- Duplicate student ID.
- Invalid email/phone.
- Other category conditional.
- Commitments.
- Honeypot.

### Asset gate

- Reference-only asset cannot be enabled production.
- Facebook Cover dates mismatch blocks build.
- Unapproved hero asset blocks full production.

## 2. Component/integration tests

- Header CTA state.
- Drawer closes after navigation.
- Hero picture chooses source attributes.
- Countdown transition to closed.
- Timeline 4 and 7 items.
- Rules Accordion keyboard.
- Mentor/sponsor/FAQ hidden when empty.
- Form step data persists.
- Reducing team size confirms data removal.
- API field errors map correctly.
- Retry uses same idempotency key.

## 3. E2E

### Successful registration

1. Public config open.
2. Fill three members.
3. Review.
4. Submit.
5. Success page.
6. Sheets adapters receive one registration and three member rows.

### Double submit

- Double click/refresh/retry creates one submission.

### Deadline closes while filling

- Server returns closed.
- Draft remains.
- UI shows contact/status.

### Storage outage

- API 503.
- Data remains.
- Retry later succeeds.

### Mobile

- 360×800 and 390×844.
- No horizontal scroll.
- CTA not obscured by keyboard.
- Hero artwork not crop main sign.

### Reduced motion

- No floating infinite.
- Navigation still works.

## 4. Visual regression

Snapshots/screenshots:

- Hero desktop 1440×900.
- Hero tablet 1024×768.
- Hero mobile 390×844.
- Timeline desktop/mobile.
- Form each step.
- Closed state.
- Success state.

## 5. Asset acceptance

- `Thuhoptac` not shipped.
- `timeline-reference` not shipped.
- No baked unapproved date visible.
- Artwork sharp at DPR 2.
- Logos not distorted.

## 6. Acceptance checklist

- [ ] One UI system only: MUI.
- [ ] Hero uses provided artwork candidate.
- [ ] UI text remains HTML/semantic.
- [ ] Countdown/CTA/form/API synchronized.
- [ ] Registration server-authoritative.
- [ ] Form leader data not duplicated.
- [ ] No PII logs.
- [ ] Keyboard flow pass.
- [ ] Reduced motion pass.
- [ ] Lighthouse targets met or documented.
- [ ] Tests/build pass.
- [ ] P0 decisions approved for full production.
