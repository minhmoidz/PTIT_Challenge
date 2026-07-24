# 04 — UX Flows and States

## 1. Main journey

```text
Open site
  -> Understand event from Hero
  -> See registration status/countdown
  -> Read key facts
  -> Review timeline and rules
  -> Understand awards/benefits
  -> Start registration
  -> Step 1 team + leader contact
  -> Step 2 members
  -> Step 3 review + consent
  -> Submit
  -> Success confirmation
```

## 2. Entry points to registration

- Header CTA.
- Hero CTA.
- Final CTA section.
- Mobile sticky CTA.

Tất cả gọi cùng một action:

- `open`: scroll/focus form.
- `not_open`: scroll tới thông tin hoặc show opening date.
- `closed`: scroll tới status panel/contact.
- `disabled`: show contact/support.

## 3. Registration state matrix

| State | Countdown | Primary CTA | Form |
|---|---|---|---|
| `not_configured` | Staging: TBD; production blocked | Disabled | Hidden |
| `not_open` | Count to openAt | Xem thông tin | Read-only/hidden |
| `open` | Count to closeAt | Đăng ký ngay | Enabled |
| `closed` | Đã đóng đăng ký | Theo dõi BTC | Hidden; draft preserved locally until user clears |
| `manually_disabled` | Tạm dừng | Liên hệ BTC | Hidden |

## 4. Form step behavior

- Validate current step before Next.
- Focus first invalid field.
- Error summary có anchor tới field.
- Back không xóa data.
- Team size thay đổi phải hỏi xác nhận nếu làm mất member data.
- Step change scroll tới heading form nhưng không gây giật.
- Review cho phép Edit từng nhóm.

## 5. Submit states

### Idle

CTA enabled khi valid và form open.

### Submitting

- Disable submit.
- Hiển thị progress.
- Không xóa data.
- Double click được chặn.

### Validation error

- Map field errors.
- Focus error summary/first field.

### Network/timeout

- Giữ data và idempotency key.
- Cho retry.
- Không tạo bản ghi trùng.

### Closed during filling

- Server trả `REGISTRATION_CLOSED`.
- Giữ draft.
- Hiển thị thông báo rõ và contact.

### Success

- Xóa draft.
- Navigate bằng `replace` tới success route.
- Không hiện PII.

## 6. Mobile keyboard behavior

- Sticky CTA ẩn khi input focus hoặc virtual keyboard mở nếu có thể phát hiện đáng tin cậy.
- Input `email`, `tel` dùng `inputMode` phù hợp.
- Next/Back có vùng chạm tối thiểu 44px.
- Không auto-focus gây mở keyboard ngay khi page load.
