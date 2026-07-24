# 02 — Product Requirements

## 1. Product statement

Website PICC 2026 là kênh chính thức giúp sinh viên hiểu cuộc thi và đăng ký đội nhanh trên điện thoại, đồng thời giúp BTC tiếp nhận dữ liệu có cấu trúc.

## 2. Primary users

### Sinh viên tìm hiểu

- Hiểu cuộc thi trong 5–10 giây đầu.
- Tìm được timeline, thể lệ, giải thưởng và liên hệ.

### Đội trưởng

- Biết cần chuẩn bị dữ liệu gì.
- Điền form ba bước.
- Xem lại trước submit.
- Không mất dữ liệu khi lỗi.

### Ban Tổ chức

- Bật/tắt/gia hạn registration bằng config.
- Nhận dữ liệu có cấu trúc.
- Không cần vận hành tài khoản thí sinh.

## 3. MVP scope

- Header sticky.
- Hero dùng artwork đã cung cấp.
- Countdown bốn đơn vị.
- Giới thiệu và bốn giá trị nổi bật.
- Quick Facts.
- Timeline data-driven.
- Thể lệ dạng Accordion.
- Giải thưởng và quyền lợi.
- Mentor/sponsor/FAQ có điều kiện.
- CTA cuối.
- Form đăng ký ba bước.
- Success page.
- Footer và privacy link.

## 4. Out of scope

- Account/login.
- Team dashboard.
- Cổng nộp bài/chấm điểm trừ khi BTC xác nhận phải nộp hồ sơ trong form đầu.
- Chat/realtime notification.
- CMS đầy đủ.
- Admin portal nhiều cấp.

## 5. Functional requirements

### FR-01 Header

- Sticky, responsive.
- Logo, anchors, CTA.
- Active section state.
- Mobile Drawer.

### FR-02 Hero

- Tên đầy đủ, chủ đề, mô tả ngắn.
- Artwork background/visual.
- Countdown và CTA theo state.
- Không dùng chữ “Thư mời hợp tác”.

### FR-03 Registration state

- `not_configured`, `not_open`, `open`, `closed`, `manually_disabled`.
- Hero, CTA, sticky CTA và form đồng bộ.

### FR-04 Content sections

- Content từ config/i18n, không hardcode JSX.
- Empty section không render.

### FR-05 Form

- Ba bước.
- Validation client/server.
- Review summary.
- Draft session.
- Idempotent submit.

### FR-06 Success

- Hiển thị submission ID không chứa PII.
- Chỉ dẫn kênh theo dõi tiếp theo.
- Không cho browser resubmit khi refresh.

## 6. Non-functional requirements

- Mobile-first.
- WCAG 2.2 AA ở các luồng chính.
- Smooth motion, reduced-motion support.
- LCP hero tối ưu.
- Không có secret trong client.
- Không log PII.
- Cross-browser Chrome, Safari, Firefox và mobile Safari.

## 7. Measurable success criteria

- CTA chính hiện trong viewport đầu ở 390×844 và 1440×900.
- Không horizontal scroll ở 320px.
- Form hoàn thành hoàn toàn bằng keyboard.
- Dữ liệu không mất khi chuyển step hoặc API lỗi.
- Server từ chối submit đúng deadline kể cả UI cũ.
- Lighthouse mục tiêu: Performance ≥ 85 mobile, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.
- Không có `TBD` hoặc asset reference-only trong production build.
