# PICC 2026 — Final Agent Specification (All in One)
> Bản hợp nhất để dùng khi agent chỉ nhận một file. Bản tách file là nguồn dễ bảo trì hơn.

---

<!-- SOURCE: README.md -->

# PICC 2026 — Final Agent Implementation Pack

Bộ tài liệu cuối cùng để giao cho coding agent triển khai website **PTIT Innovation Catalyst Challenge 2026 (PICC)**.

Bộ này đã hợp nhất:

- Nội dung và đề xuất thiết kế trong hai tài liệu DOCX.
- Bộ Markdown cũ.
- Năm ảnh truyền thông mới được cung cấp.
- Quyết định kỹ thuật dùng **một hệ UI duy nhất: Material UI v7**.
- Quy tắc sử dụng ảnh làm lớp nền/hero để giữ đúng nhận diện và giảm việc dựng lại artwork.
- Animation, accessibility, hiệu năng, API, bảo mật, kiểm thử và release gate.

## Quyết định kỹ thuật đã thống nhất

- React 19 + TypeScript strict.
- Vite.
- Material UI v7 + `@mui/icons-material` là **UI system duy nhất**.
- Styling qua MUI theme, `sx` và `styled`; không dùng Tailwind, Bootstrap, Ant Design hoặc UI kit khác.
- Motion for React (`motion`) là animation engine, không phải UI kit.
- React Router DOM v7.
- TanStack React Query v5.
- React Hook Form + Zod.
- i18next + react-i18next.
- Axios cho HTTP service.
- Vitest + React Testing Library + Playwright.
- Backend mặc định: Vercel Functions chạy Node.js 20.
- Storage MVP mặc định: Google Sheets thông qua server-side adapter; browser không ghi trực tiếp.

## Quyết định hình ảnh

| Asset | Trạng thái | Dùng mặc định |
|---|---|---|
| `Avatar.png` | Production candidate | Hero desktop, social avatar sau khi BTC xác nhận quyền sử dụng |
| `backgroud.png` | Production candidate | Hero mobile/fallback sau khi BTC xác nhận quyền sử dụng |
| `Facebook Cover.png` | Conditional | Chỉ dùng khi toàn bộ ngày được in trong ảnh đã được BTC xác nhận |
| `Thuhoptac.png` | Reference only | Không dùng trên website dành cho thí sinh vì có chữ “Thư mời hợp tác” |
| `timeline.png` | Reference only | Chỉ lấy cảm hứng thị giác; không nhúng trực tiếp vì chữ nhỏ, không responsive và mốc thời gian mâu thuẫn |

Các bản WebP tối ưu đã nằm trong `assets/`.

## Thứ tự đọc bắt buộc

1. `AGENTS.md`
2. `00_SOURCE_OF_TRUTH.md`
3. `01_FINAL_DESIGN_AND_ASSET_DECISIONS.md`
4. `02_PRODUCT_REQUIREMENTS.md`
5. `03_INFORMATION_ARCHITECTURE.md`
6. `04_UX_FLOWS_AND_STATES.md`
7. `05_VISUAL_ASSET_AUDIT.md`
8. `06_UI_DESIGN_SYSTEM.md`
9. `07_MOTION_AND_INTERACTION.md`
10. `08_SECTION_SPECS.md`
11. `09_REGISTRATION_FORM_SPEC.md`
12. `10_CONTENT_COPY_VI.md`
13. `11_CONTENT_CONFIG_AND_DATA_MODEL.md`
14. `12_TECHNICAL_ARCHITECTURE.md`
15. `13_API_DATA_SECURITY_AND_OPERATIONS.md`
16. `14_ACCESSIBILITY_SEO_PERFORMANCE.md`
17. `15_TESTING_AND_ACCEPTANCE.md`
18. `16_IMPLEMENTATION_PLAN.md`
19. `17_DECISIONS_REQUIRED.md`
20. `18_AGENT_MASTER_PROMPT.md`

## Cách đưa cho agent

Đặt toàn bộ thư mục này ở root repository, ví dụ:

```text
project-root/
  docs/picc/
    AGENTS.md
    00_SOURCE_OF_TRUTH.md
    ...
    assets/
```

Sau đó đưa agent nội dung trong `18_AGENT_MASTER_PROMPT.md` và yêu cầu agent đọc toàn bộ tài liệu trước khi sửa code.

## Release mode

### Preview

- Được dùng asset production candidate.
- Được dùng mock content có banner “Bản xem trước”.
- Submission có thể mock hoặc disabled.

### Production

- Không còn quyết định P0 ở trạng thái `UNRESOLVED`.
- Asset đã được BTC xác nhận quyền sử dụng.
- Không dùng ảnh có ngày chưa được xác nhận.
- Countdown, CTA, form và API cùng một nguồn cấu hình server-authoritative.
- Privacy notice, retention policy và người truy cập dữ liệu đã được xác nhận.
- Toàn bộ quality gate đã pass.

---

<!-- SOURCE: AGENTS.md -->

# AGENTS.md — Quy tắc bắt buộc cho coding agent

## 1. Vai trò

Bạn là Senior Frontend Engineer kiêm Product-minded Engineer triển khai website PICC 2026. Mục tiêu là tạo sản phẩm hoàn chỉnh, mượt, dễ dùng trên mobile và an toàn với dữ liệu đăng ký.

Không chỉ “làm cho chạy”. Phải bảo đảm tính nhất quán về nội dung, hình ảnh, trạng thái, accessibility, performance và vận hành.

## 2. Trước khi code

1. Đọc `README.md`.
2. Đọc toàn bộ tài liệu theo thứ tự trong README.
3. Kiểm tra `17_DECISIONS_REQUIRED.md`.
4. Audit repository hiện tại.
5. Báo rõ blocker, giả định kỹ thuật và phạm vi phase đầu.
6. Chỉ sau đó mới sửa code.

## 3. Thứ tự ưu tiên khi tài liệu mâu thuẫn

1. Quyết định có trạng thái `APPROVED` trong `17_DECISIONS_REQUIRED.md`.
2. `00_SOURCE_OF_TRUTH.md`.
3. `01_FINAL_DESIGN_AND_ASSET_DECISIONS.md`.
4. Product/form/API specification trong bộ này.
5. Tài liệu thiết kế DOCX phiên bản 2.1.
6. Tài liệu content gốc.
7. Chữ hoặc ngày bị in sẵn trong asset chỉ là dữ liệu tham chiếu, không tự động trở thành source of truth.

Nếu hai nguồn cùng cấp mâu thuẫn: không đoán; giữ cấu hình unresolved và báo blocker.

## 4. UI system duy nhất

- Dùng Material UI v7 và `@mui/icons-material`.
- Dùng MUI theme, `sx` và `styled`.
- Không thêm Tailwind, Bootstrap, Chakra, Ant Design hoặc UI kit khác.
- Không thêm icon library khác.
- Motion for React chỉ dùng cho animation.
- Không hardcode màu, radius, shadow hoặc timing rải rác trong component.
- Không style cùng một component bằng nhiều cơ chế cạnh tranh.

## 5. Quy tắc hình ảnh

- Hero phải sử dụng các asset production candidate thay vì dựng lại bảng hiệu bằng HTML/CSS.
- Trên desktop dùng `hero-sign-desktop.webp` làm lớp hình nền tuyệt đối phía phải.
- Trên mobile dùng `hero-sign-mobile.webp` làm lớp nền/visual chính.
- Dùng `<picture>` hoặc `<img>` absolute làm “visual background” thay vì CSS background nếu ảnh là LCP, để có `srcset`, preload và kích thước rõ ràng.
- `Facebook Cover.png` chỉ được dùng khi các ngày in trên ảnh khớp config approved.
- Không dùng `Thuhoptac.png` trên trang thí sinh.
- Không nhúng `timeline.png` làm timeline production.
- Mọi asset production cần có trạng thái quyền sử dụng được xác nhận.

## 6. Quy tắc nghiệp vụ

- Không tạo tài khoản, đăng nhập hoặc dashboard thí sinh trong MVP.
- Countdown là bắt buộc.
- Form có ba bước: thông tin đội; thành viên; cam kết và xem lại.
- Team leader chỉ có một nguồn dữ liệu logic: `members[0]`.
- Countdown, CTA, form và API đọc cùng registration config.
- Server quyết định cuối cùng việc nhận đăng ký.
- Mentor, sponsor và FAQ tự ẩn khi không có dữ liệu approved.
- Không tự xác định deadline, team size, eligibility, timeline hoặc giải thưởng khi BTC chưa chốt.

## 7. Quy tắc nội dung

- Không hardcode copy cuộc thi trong JSX.
- Tất cả copy nằm trong content/i18n/config.
- Không tự sửa câu tiêu chí bị thiếu.
- Không hiển thị `TBD`, `UNRESOLVED` hoặc mock data trên production.
- Không dùng cụm “Thư mời hợp tác” trong Hero thí sinh.
- Không lấy mentor/sponsor từ Internet.

## 8. Quy tắc form và PII

- Không đưa email, phone, mã sinh viên hoặc nội dung form vào URL.
- Không log payload form.
- Không gửi PII vào analytics hoặc error monitoring.
- Không dùng dữ liệu thật trong fixture/test.
- Draft chỉ dùng `sessionStorage`, có version và TTL; xóa sau submit thành công.
- Client và server cùng validate bằng schema tương thích.
- Submit có idempotency key.
- Double click không tạo hai đăng ký.

## 9. Quy tắc animation

- Dùng motion có mục đích: định hướng, phản hồi và tạo cảm giác nhẹ nhàng.
- Không dùng parallax mạnh.
- Không animate layout Countdown.
- Tôn trọng `prefers-reduced-motion`.
- Animation không được chặn CTA, input hoặc scroll.
- Không vượt quá motion budget trong `07_MOTION_AND_INTERACTION.md`.

## 10. Quality gate bắt buộc

```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm test:e2e
pnpm build
```

Ngoài ra:

- Không có console error production.
- Không có broken link.
- Keyboard flow hoạt động.
- Mobile 360px không horizontal scroll.
- Asset đúng quy tắc.
- Config production không còn P0 unresolved.

## 11. Definition of Done cho một task

Một task chỉ được đánh dấu hoàn thành khi:

- Code đúng scope.
- TypeScript strict không lỗi và không dùng `any` không có lý do.
- Có loading/error/empty/disabled state tương ứng.
- Có test cho logic quan trọng.
- Accessibility cơ bản được kiểm tra.
- Tài liệu/config liên quan được cập nhật.
- Báo cáo file thay đổi và lệnh kiểm tra đã chạy.

---

<!-- SOURCE: 00_SOURCE_OF_TRUTH.md -->

# 00 — Source of Truth

## 1. Mục đích

Website có nhiều vị trí cùng dùng một dữ liệu: Hero, Countdown, Quick Facts, timeline, CTA, form, API và SEO. Mỗi dữ liệu nghiệp vụ chỉ được định nghĩa tại một nơi.

## 2. Nội dung ổn định

Có thể triển khai ngay:

- Tên: PTIT Innovation Catalyst Challenge 2026 (PICC).
- Chủ đề: `Rise Beyond Limits`.
- Mô hình: cuộc thi giải Case Study, đội thi liên ngành, giải quyết bài toán thực tế do doanh nghiệp đặt ra.
- Landing Page một trang.
- Không yêu cầu tài khoản trong MVP.
- Form đăng ký ba bước.
- Phong cách: Candy Pastel, Clean, Friendly, Youthful.
- Hình ảnh: bầu trời, mây, bảng chỉ dẫn, tinh thần đi lên/vượt giới hạn.
- Đơn vị tổ chức thể hiện trong asset: PTIT và PTIT IEC; vẫn cần BTC xác nhận file logo/quyền dùng production.
- Quy mô đội cho đăng ký mới: 03–04 thành viên (D-001 đã APPROVED). Hồ sơ lịch sử 05 thành viên vẫn được giữ để hiển thị và xuất dữ liệu.

## 3. Nội dung chưa được phép tự khóa

- Ngày giờ mở/đóng đăng ký.
- Timeline chính thức.
- Eligibility và điều kiện ngành.
- Cách nộp hồ sơ vòng đầu.
- Chọn một hay nhiều nhóm bài toán.
- Duplicate policy.
- Cách sửa đăng ký sau submit.
- Ý nghĩa 10.000.000 VNĐ.
- Email xác nhận.
- Nơi lưu, người truy cập và thời hạn lưu PII.
- FAQ, mentor, sponsor.
- Ngôn ngữ thứ hai.

## 4. Source of truth kỹ thuật

### Public config

API `GET /api/public-config` là nguồn quyết định cho:

- `serverTime`.
- `registration.openAt`.
- `registration.closeAt`.
- `registration.allowSubmissions`.
- `registration.statusMessage`.
- `teamSize.min/max`.
- `timelineVersion` hoặc timeline data nếu cần cập nhật không rebuild.

Frontend không chỉ dựa vào biến `VITE_*` hoặc đồng hồ máy người dùng.

### Static content

Nội dung ổn định nằm trong `src/content/vi/` hoặc i18n resources.

### Server validation

Server là bên quyết định cuối cùng về registration status, duplicate và tính hợp lệ payload.

## 5. Approval model

```ts
export type ApprovalStatus = 'unresolved' | 'draft' | 'approved';

export interface ApprovedValue<T> {
  value: T | null;
  status: ApprovalStatus;
  source: string;
  approvedBy?: string;
  approvedAt?: string;
}
```

Production validator phải fail nếu trường P0 chưa `approved`, trừ khi registration được `explicitlyDisabled: true` và site chạy content-only.

## 6. Time rules

- ISO 8601 có offset, ví dụ `2026-08-19T23:59:59+07:00`.
- Business timezone: `Asia/Ho_Chi_Minh`.
- Server trả `serverTime`; frontend tính offset.
- Boundary: `openAt <= now < closeAt` là `open`; `now >= closeAt` là `closed`.
- Config invalid nếu `openAt >= closeAt`.

## 7. Asset source of truth

Asset manifest phải chứa:

```ts
export interface PiccAsset {
  id: string;
  src: string;
  usage: 'production-candidate' | 'conditional' | 'reference-only' | 'deprecated';
  containsText: boolean;
  approvalStatus: ApprovalStatus;
  approvedBy?: string;
  approvedAt?: string;
  notes: string;
}
```

Chữ/ngày in sẵn trong ảnh không được dùng làm nguồn nghiệp vụ.

---

<!-- SOURCE: 01_FINAL_DESIGN_AND_ASSET_DECISIONS.md -->

# 01 — Final Design and Asset Decisions

## 1. Định hướng cuối cùng

Website không dựng lại bảng hiệu “Innovation Catalyst Challenge” bằng HTML. Artwork có sẵn được dùng làm visual nền/hero, sau đó bổ sung UI thực bằng MUI: header, copy, countdown, CTA, card, icon và motion.

Mục tiêu:

- Giữ đúng cảm giác của ấn phẩm truyền thông.
- Giảm khối lượng vẽ lại artwork.
- Vẫn giữ nội dung web dễ đọc, responsive và accessible.
- Không biến toàn trang thành một poster ảnh tĩnh.

## 2. Quyết định UI

**Material UI v7 là UI system duy nhất.**

- Components: MUI.
- Icons: MUI Icons.
- Theme/styling: MUI theme + `sx` + `styled`.
- Animation: Motion for React.
- Không dùng Tailwind.

Lý do:

- Tránh xung đột hai hệ spacing/theme.
- Form, Stepper, Drawer, Accordion, Alert và focus state đồng nhất.
- Agent có một nguồn token và một cách styling.

## 3. Hero composition

### Desktop

- Min-height khoảng `clamp(720px, 86vh, 900px)`.
- Nền section là sky gradient lấy từ palette asset.
- `hero-sign-desktop.webp` đặt absolute bên phải, rộng khoảng 58–64% container, `object-fit: contain`.
- Nội dung thực nằm bên trái trong panel bán trong suốt hoặc vùng gradient bảo đảm contrast.
- Header dạng glass, chuyển thành surface rõ khi scroll.
- Countdown đặt trong card nổi dưới copy, không che artwork.
- Các icon MUI nhỏ (lightbulb, rocket, trending up, auto awesome) bay chậm quanh vùng trống; `aria-hidden`.

### Mobile

- Dùng `hero-sign-mobile.webp` ở nửa trên.
- Nội dung/Countdown/CTA nằm trong panel ở nửa dưới hoặc overlay gradient từ trong suốt sang trắng.
- Không để text chính đè trực tiếp lên chữ trong artwork.
- Không crop mất bảng hiệu chính.

### LCP

Hero image là candidate LCP nên:

- Render bằng `<picture>`/`img`, không dùng CSS `background-image` thuần.
- Có `width`, `height`, `fetchPriority="high"`, `decoding="async"`.
- Preload đúng variant chính.
- `alt=""` và `aria-hidden="true"` vì tên cuộc thi vẫn có bằng HTML.

## 4. Ảnh nào được dùng

### Dùng mặc định sau xác nhận quyền sử dụng

- `Avatar.png` / `hero-sign-desktop.webp`.
- `backgroud.png` / `hero-sign-mobile.webp`.

Hai ảnh này không chứa deadline và không chứa “Thư mời hợp tác”.

### Dùng có điều kiện

`Facebook Cover.png` có sẵn các mốc 19/08/2026, 15/09/2026 và 02/10/2026. Chỉ dùng khi:

1. BTC xác nhận cả ba mốc.
2. Tên vòng và câu tagline trong ảnh đã duyệt.
3. Ảnh không bị dùng thay cho nội dung HTML cần SEO/accessibility.

Ứng dụng phù hợp:

- Open Graph image.
- Banner campaign phụ.
- Không phải Hero mặc định.

### Không dùng production

- `Thuhoptac.png`: thông điệp sai đối tượng.
- `timeline.png`: chữ nhỏ, tỷ lệ ảnh cố định, không accessible, không responsive, các mốc khác nguồn chữ và có dải ngày cần xác nhận.

## 5. Timeline web

Dựng timeline bằng component semantic, lấy cảm hứng từ:

- Đường chuyển động dạng sóng.
- Node tròn được đánh số.
- Pastel blue/pink/yellow/green.
- Card ngày và mô tả đặt xen kẽ.

Không tái sử dụng chữ trong ảnh. Tất cả timeline item lấy từ config.

## 6. Design mood

- Sáng, có nhiều khoảng thở.
- Pastel chỉ làm background/decoration; text dùng màu xanh đậm.
- Card trắng hoặc translucent vừa phải.
- Các section dài như thể lệ/form có nền yên tĩnh.
- Motion mềm, không “game hóa” quá mức.

---

<!-- SOURCE: 02_PRODUCT_REQUIREMENTS.md -->

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

---

<!-- SOURCE: 03_INFORMATION_ARCHITECTURE.md -->

# 03 — Information Architecture

## 1. Routes

```text
/                       Landing Page
/dang-ky/thanh-cong     Success page
/quyen-rieng-tu         Privacy page khi nội dung approved
*                       Not Found
```

Không đưa PII vào query string hoặc URL state.

## 2. Section order

| # | Section | Anchor | Render condition |
|---:|---|---|---|
| 1 | Hero + Countdown | `hero` | Always |
| 2 | Giới thiệu | `gioi-thieu` | Always |
| 3 | Thông tin nhanh | `thong-tin-nhanh` | Always, value unresolved được xử lý bằng config gate |
| 4 | Timeline | `lo-trinh` | Approved timeline hoặc staging placeholder |
| 5 | Thể lệ | `the-le` | Always |
| 6 | Giải thưởng/quyền lợi | `giai-thuong` | Always, không hiển thị số tiền unresolved |
| 7 | Mentors | `mentors` | Approved non-empty list |
| 8 | Sponsors | `nha-tai-tro` | Approved non-empty list |
| 9 | FAQ | `faq` | Approved Q&A list |
| 10 | CTA | `tham-gia` | Always |
| 11 | Registration | `dang-ky` | Theo registration state |
| 12 | Footer | `footer` | Always |

## 3. Navigation

Desktop:

- Logo.
- Giới thiệu.
- Lộ trình.
- Thể lệ.
- Giải thưởng.
- Đăng ký.

Mobile:

- Logo.
- Menu icon MUI.
- Drawer đóng sau khi click.
- Sticky bottom CTA khi registration open và form chưa nằm trong viewport.

## 4. Scroll/focus rules

- `scroll-margin-top` bằng header height + 16px.
- Smooth scroll chỉ khi không reduced motion.
- Active section bằng IntersectionObserver.
- Click anchor bằng keyboard phải chuyển focus hợp lý tới heading section.
- URL hash load trực tiếp vẫn cuộn đúng sau khi content mount.

## 5. Heading hierarchy

- Một `h1`: tên cuộc thi.
- Section dùng `h2`.
- Card heading dùng `h3`.
- Accordion summary có heading semantic phù hợp.

## 6. Content density

- Hero: tối đa 2–3 dòng mô tả.
- Timeline card: tối đa 2–3 bullet; chi tiết dài chuyển sang thể lệ.
- FAQ: answer ngắn, link tới section khi cần.
- Form: giải thích đặt gần field, không tạo đoạn hướng dẫn dài phía trên.

---

<!-- SOURCE: 04_UX_FLOWS_AND_STATES.md -->

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

---

<!-- SOURCE: 05_VISUAL_ASSET_AUDIT.md -->

# 05 — Visual Asset Audit

## 1. Asset inventory

| Source file | Kích thước | Nội dung | Trạng thái |
|---|---:|---|---|
| `Avatar.png` | 2025×2025, ~4.1 MB | Sky/cloud, organizer logo, bảng hiệu PICC | Production candidate |
| `backgroud.png` | 1170×1174, ~989 KB | Bố cục square/mobile tương tự | Production candidate |
| `Facebook Cover.png` | 2048×758, ~2.1 MB | Wide banner, tagline và ba mốc ngày | Conditional |
| `Thuhoptac.png` | 904×508, ~276 KB | Có chữ “Thư mời hợp tác” | Reference only |
| `timeline.png` | 904×504, ~175 KB | Timeline bảy mốc có text/date baked-in | Reference only |

## 2. Production candidates

### `hero-sign-desktop.webp`

Nguồn: `Avatar.png`.

Dùng cho:

- Hero desktop/tablet visual.
- Open Graph fallback nếu không dùng Facebook Cover.
- Decorative image, `alt=""`.

Không dùng làm:

- Nguồn text.
- Thay thế heading HTML.

### `hero-sign-mobile.webp`

Nguồn: `backgroud.png`.

Dùng cho:

- Hero mobile.
- Fallback khi viewport gần square.

## 3. Conditional asset

### `facebook-cover-with-dates.webp`

Chỉ bật bằng config:

```ts
facebookCover: {
  enabled: false,
  approvalStatus: 'unresolved',
  expectedDates: ['2026-08-19', '2026-09-15', '2026-10-02']
}
```

Build validator kiểm tra dates in manifest khớp approved timeline/deadline trước khi `enabled: true`.

## 4. Reference-only assets

### Collaboration invite

Không được import vào production bundle. Có thể giữ trong docs để hiểu style.

### Timeline source image

Không import vào UI. Chỉ tham khảo:

- đường wave;
- numbered nodes;
- màu phân mốc;
- card ngày xen kẽ.

## 5. Asset loading rules

- Hero desktop/mobile: eager + high priority.
- Hình section dưới fold: lazy.
- Mentor: `loading="lazy"`, aspect ratio fixed.
- Sponsor logo: lazy, không grayscale nếu BTC yêu cầu màu gốc.
- Không tải cả desktop và mobile variant nếu `<picture>` có thể chọn đúng source.
- Không dùng base64 lớn trong source code.

## 6. Image quality

- Không phóng raster quá kích thước tự nhiên.
- WebP production; PNG source chỉ lưu archive.
- Không nén logo đến mức nhòe.
- Kiểm tra chữ trong artwork ở DPR 1 và 2.

## 7. Rights gate

Trước production, BTC xác nhận:

- Được dùng artwork trên website.
- Được crop/resize/chuyển WebP.
- Logo phiên bản chính thức.
- Ảnh mentor/sponsor có quyền sử dụng.

---

<!-- SOURCE: 06_UI_DESIGN_SYSTEM.md -->

# 06 — UI Design System

## 1. Single system rule

Material UI v7 là nguồn duy nhất cho:

- Component behavior.
- Theme tokens.
- Typography.
- Spacing.
- Breakpoints.
- Radius/shadow.
- Focus/disabled/error state.

Không thêm utility CSS framework.

## 2. Palette

Palette lấy gần màu trong artwork, sau đó điều chỉnh text để đủ contrast.

```ts
export const piccColors = {
  sky: {
    50: '#F5FBFF',
    100: '#E7F6FF',
    200: '#CDEEFF',
    300: '#AFE0FF',
    400: '#83C9FA',
    500: '#63B8EE',
  },
  blue: {
    100: '#DCEBFF',
    300: '#91BFF6',
    500: '#4F8FEA',
    700: '#245FA8',
    900: '#173B66',
  },
  pink: {
    100: '#FFE5F2',
    300: '#F7B0D2',
    500: '#E85B9F',
    700: '#B83273',
  },
  yellow: {
    100: '#FFF6D2',
    300: '#FFE28A',
    700: '#755600',
  },
  success: '#177245',
  danger: '#B42318',
  warning: '#8A5A00',
  ink: '#173B66',
  surface: '#FFFFFF',
};
```

Pastel không dùng làm text nhỏ trên nền trắng.

## 3. Theme roles

```ts
palette.primary.main = piccColors.blue[700];
palette.secondary.main = piccColors.pink[500];
palette.background.default = piccColors.sky[50];
palette.background.paper = '#FFFFFF';
palette.text.primary = piccColors.ink;
palette.text.secondary = '#46637E';
```

## 4. Typography

Ưu tiên:

```text
"Be Vietnam Pro", "Inter", system-ui, -apple-system, sans-serif
```

Nếu chưa có license/self-host, dùng system stack và không chặn dự án.

| Token | Mobile | Desktop |
|---|---|---|
| Display/H1 | 2.5rem / 1.08 / 800 | 4rem / 1.05 / 800 |
| H2 | 2rem / 1.15 / 750 | 3rem / 1.1 / 750 |
| H3 | 1.35rem / 1.25 / 700 | 1.6rem / 1.25 / 700 |
| Body | 1rem / 1.65 / 400 | 1rem / 1.7 / 400 |
| Button | 0.95rem / 1 / 700 | same |

Không cố tái tạo font chữ bảng hiệu bằng web font; artwork đã chứa kiểu chữ đó.

## 5. Layout

- Container max-width: 1200px.
- Mobile gutter: 16px.
- Tablet: 24px.
- Desktop: 32px.
- Section spacing: 72px mobile, 112px desktop.
- Header height: 64px mobile, 76px desktop.

## 6. Breakpoints

Dùng MUI defaults có điều chỉnh nếu cần:

```ts
xs: 0
sm: 600
md: 900
lg: 1200
xl: 1536
```

Không tự tạo breakpoint rải rác.

## 7. Radius and elevation

- Button: 999px cho CTA chính, 14px cho button form nếu cần.
- Input: 14px.
- Card: 20–28px.
- Hero glass panel: 28px.
- Elevation nhẹ; shadow custom tối đa 3 cấp.

```ts
shadows.soft = '0 16px 40px rgba(23, 59, 102, 0.12)';
shadows.hover = '0 20px 48px rgba(23, 59, 102, 0.18)';
```

## 8. Component variants

Tạo theme variants cho:

- `MuiButton`: `piccPrimary`, `piccSecondary`, `piccGhost` hoặc dùng contained/outlined nhất quán.
- `MuiCard`: default soft card.
- `MuiTextField`: rounded, error helper stable.
- `MuiAccordion`: no heavy divider, clear focus.
- `MuiChip`: status/quick fact.
- `MuiAlert`: domain states.

## 9. Icon rules

Chỉ dùng `@mui/icons-material`.

Đề xuất:

- `RocketLaunchRounded` — vượt giới hạn/CTA.
- `LightbulbRounded` — innovation.
- `BusinessCenterRounded` — doanh nghiệp.
- `GroupsRounded` — đội thi.
- `TrendingUpRounded` — phát triển.
- `AutoAwesomeRounded` — decorative sparkle.
- `CalendarMonthRounded` — timeline.
- `EmojiEventsRounded` — giải thưởng.
- `VerifiedRounded` — cam kết.

Icon decorative: `aria-hidden`. Icon-only button: có accessible label.

## 10. Section surfaces

- Hero: sky gradient + artwork.
- Introduction: white surface với cloud-like soft shapes.
- Timeline: sky-100/white gradient.
- Rules/Form: near-white solid để đọc tốt.
- Awards: pink/yellow accents trên card trắng.
- Footer: blue-900 với text trắng.

## 11. Anti-patterns

- Không phủ blur dày lên toàn page.
- Không đặt body text lên vùng mây nhiều chi tiết.
- Không dùng shadow neon.
- Không dùng pink/yellow cho text body.
- Không dùng quá ba style card khác nhau.
- Không làm mọi section đều animated cùng lúc.

---

<!-- SOURCE: 07_MOTION_AND_INTERACTION.md -->

# 07 — Motion and Interaction

## 1. Animation engine

Dùng `motion` (`motion/react`). Không dùng thêm GSAP, AOS hoặc animation library khác.

## 2. Motion principles

- Motion hỗ trợ hierarchy và phản hồi.
- Chuyển động nhỏ, mềm, không gây chóng mặt.
- Không trì hoãn nội dung quan trọng.
- Không làm thay đổi layout liên tục.

## 3. Timing tokens

```ts
export const motionTokens = {
  instant: 0.12,
  fast: 0.18,
  normal: 0.36,
  reveal: 0.48,
  slow: 0.72,
  floating: 6,
  easingStandard: [0.22, 1, 0.36, 1],
};
```

## 4. Hero motion

- Artwork enter: opacity 0→1, scale 0.98→1, duration 0.7s.
- Content stagger: 60–90ms.
- Artwork floating: translateY ±5px, 6–8s, alternate infinite.
- Decorative icons: translate 6–12px, rotate tối đa 4°, 5–9s.
- Không animate header/logo liên tục.

## 5. Section reveal

- Trigger khi 15–20% section vào viewport.
- Opacity 0→1 và y 16px→0.
- Mỗi section chỉ reveal một lần.
- Card stagger tối đa 60ms/item và tối đa 6 item.

## 6. Hover/focus

- Card hover: y -3px, shadow soft→hover, 180ms.
- Button hover: y -1px, không scale mạnh.
- Sponsor logo: không grayscale animation nếu làm sai brand.
- Focus visible luôn rõ, không chỉ dựa vào animation.

## 7. Countdown

- Dùng tabular numbers.
- Cố định width từng cell.
- Có thể crossfade chữ số rất nhẹ nhưng mặc định không animate từng giây để tránh distraction.
- Khi về 0, chuyển status bằng fade 200ms, không flash.

## 8. Timeline

- Desktop: line/path reveal một lần.
- Node active có pulse nhẹ tối đa hai vòng, không infinite.
- Mobile: item reveal sequential khi scroll.

## 9. Form motion

- Step transition: x ±12px + opacity, 220ms.
- Height transition chỉ khi không gây jump; ưu tiên ổn định layout.
- Error message fade in 160ms.
- Success icon scale 0.92→1.

## 10. Reduced motion

Khi `prefers-reduced-motion: reduce`:

- Tắt floating/infinite.
- Tắt smooth scroll.
- Reveal trở thành opacity ngắn hoặc không animation.
- Step transition tức thì.

Dùng `useReducedMotion()` và MUI media query.

## 11. Motion budget

- Không quá 5 phần tử infinite motion trong viewport.
- Không animate filter blur lớn.
- Không chạy animation ở tab hidden.
- Không dùng scroll listener mỗi frame; ưu tiên IntersectionObserver/Motion viewport.

---

<!-- SOURCE: 08_SECTION_SPECS.md -->

# 08 — Section Implementation Specs

## 1. Header

### Component

`SiteHeader`

### MUI

- `AppBar`, `Toolbar`, `Container`, `Button`, `IconButton`, `Drawer`, `List`.

### Behavior

- Transparent/glass trên đầu Hero.
- Sau scroll 24px chuyển nền trắng 92%, shadow nhẹ.
- CTA đọc registration state.
- Drawer focus trap mặc định MUI.

## 2. Hero

### Components

- `HeroSection`
- `HeroArtwork`
- `RegistrationCountdown`
- `HeroActions`
- `FloatingIdeaIcons`

### Desktop layout

```text
[ content 44% ] [ artwork absolute/right 60% ]
```

Content gồm:

- Eyebrow “PTIT Innovation Catalyst Challenge 2026”.
- H1 tên cuộc thi.
- Theme `Rise Beyond Limits`.
- Mô tả ngắn.
- Countdown card.
- Primary/secondary CTA.

Artwork không phải content source.

### Mobile layout

```text
[ artwork 52–58vh ]
[ gradient transition ]
[ content/card/CTA ]
```

### Effects

- 3–4 MUI icons decorative ở vùng không che bảng hiệu.
- Soft radial glow.
- Không tạo thêm clouds nặng nếu ảnh đã đủ.

## 3. Introduction

- Một intro paragraph ngắn.
- Bốn value cards với icon.
- Desktop 4 columns; tablet 2; mobile 1.
- Card có hover nhẹ.

## 4. Quick Facts

Cards đọc config:

- Đối tượng.
- Số thành viên.
- Hình thức.
- Thời gian đăng ký.

Nếu value unresolved trên staging: hiện chip “Chờ xác nhận”. Production build không được đưa unresolved value.

## 5. Timeline

### Không dùng ảnh timeline

Dựng từ data:

```ts
interface TimelineItem {
  id: string;
  order: number;
  title: string;
  dateLabel: string;
  description: string[];
  status?: 'completed' | 'active' | 'upcoming';
  accent: 'blue' | 'pink' | 'yellow' | 'orange' | 'green';
}
```

### Desktop

- Custom semantic list.
- Decorative inline SVG wave behind nodes.
- Cards xen kẽ trên/dưới.
- Nếu >5 mốc, container horizontal scroll với buttons và keyboard.

### Mobile

- Vertical `Stepper` MUI hoặc semantic list với `Step` styled.
- Không horizontal scroll text.

## 6. Rules

- MUI Accordion.
- Nhóm: đối tượng, hình thức, các vòng, tiêu chí, quy định chung.
- Một item có thể mở mặc định trên desktop; mobile tất cả đóng hoặc mở mục đầu.
- PDF button chỉ hiện khi approved URL.

## 7. Awards and Benefits

- `EmojiEventsRounded` cho heading.
- Awards card không hiển thị số tiền unresolved.
- Benefit grid dùng icons MUI.
- Có disclaimer “Giá trị cụ thể sẽ được BTC cập nhật” khi nội dung nguồn chưa chốt.

## 8. Mentors

- Chỉ render approved list.
- `CardMedia` aspect ratio 4:5.
- Tên/chức vụ/đơn vị.
- Không dùng ảnh Internet tự tìm.

## 9. Sponsors

- Logo grid trên surface trắng.
- `object-fit: contain`.
- Không crop.
- Có text accessible từ tên sponsor.
- Cấp tài trợ chỉ render khi approved.

## 10. FAQ

- MUI Accordion.
- Chỉ item có question và answer approved.
- Không dùng draft answer production.

## 11. Final CTA

- Sky/pink gradient card.
- Icon rocket.
- CTA theo state.
- Không dùng urgency giả.

## 12. Registration section

Theo `09_REGISTRATION_FORM_SPEC.md`.

- Nền trắng ổn định.
- Stepper rõ.
- Error summary.
- Privacy note gần submit.

## 13. Footer

- Nền blue-900.
- Organizer, contact, quick links.
- Privacy/terms.
- Không hiển thị contact chưa approved.

---

<!-- SOURCE: 09_REGISTRATION_FORM_SPEC.md -->

# 09 — Registration Form Specification

## 1. Single source for leader data

Không có `leaderEmail` và `leaderPhone` độc lập với members.

Bước 1 thu thông tin liên hệ đội trưởng nhưng bind trực tiếp vào:

```ts
members.0.email
members.0.phone
```

Bước 2 hiển thị lại Thành viên 1 và sử dụng cùng form state.

## 2. Form schema

```ts
export interface RegistrationFormValues {
  teamName: string;
  teamSize: number;
  challengeCategories: string[];
  otherChallengeCategory?: string;
  previousCompetitions?: string;
  featuredProject: string;
  expectations: string;
  companyExperience: 'none' | 'previous' | 'ongoing';
  members: TeamMember[];
  commitments: {
    truthfulInformation: boolean;
    mediaConsent: boolean;
    rulesAccepted: boolean;
    privacyAcknowledged: boolean;
  };
  honeypot: string;
  formStartedAt: string;
}

export interface TeamMember {
  role: 'leader' | 'member';
  fullName: string;
  studentId: string;
  major: string;
  email: string;
  phone: string;
}
```

`members[0].role` luôn là `leader`; các member khác là `member`.

## 3. Step 1 — Team and leader contact

| Field | Required | Rule |
|---|---:|---|
| Team name | Yes | trim, 2–80 chars |
| Team size | Yes | approved config min/max |
| Leader email | Yes | bind `members.0.email` |
| Leader phone | Yes | bind `members.0.phone` |
| Challenge categories | Yes | one/multiple theo config |
| Other category | Conditional | required khi chọn `other` |
| Previous competitions | No | max configurable |
| Featured project | Yes | max 1500 chars đề xuất |
| Expectations | Yes | max 1000 chars đề xuất |
| Company experience | Yes | enum |

Giới hạn ký tự là technical default và phải có thể config.

## 4. Step 2 — Members

Mỗi member:

- Full name.
- Student ID.
- Major.
- Email.
- Phone.

Rules:

- Render đúng `teamSize`.
- Không duplicate student ID trong team.
- Không duplicate email trong team nếu BTC yêu cầu; mặc định cảnh báo, server policy theo quyết định.
- Không regex student ID quá chặt khi chưa có format chính thức.
- Khi giảm teamSize, xác nhận trước khi xóa data cuối danh sách.

## 5. Step 3 — Review and commitments

- Review theo nhóm.
- Edit button quay lại đúng step.
- Bốn checkbox gồm privacy acknowledgement.
- Link thể lệ mở tab mới nếu có PDF approved.
- Submit button hiển thị progress và disabled khi pending.

## 6. Validation

- Zod schema factory nhận public config.
- `members.length === teamSize`.
- Một leader duy nhất tại index 0.
- Email normalize lowercase cho compare; lưu display value sau trim.
- Phone normalize phía server.
- Honeypot rỗng.
- Minimum fill duration đề xuất 3 giây, server đánh giá mềm/anti-bot.
- Server validate lại toàn bộ.

## 7. React Hook Form

```ts
useForm({
  mode: 'onTouched',
  reValidateMode: 'onChange',
  shouldUnregister: false,
  resolver: zodResolver(schema),
});
```

Dùng `FormProvider` và `useFieldArray`.

## 8. Draft persistence

```ts
interface RegistrationDraftEnvelope {
  version: 1;
  savedAt: string;
  expiresAt: string;
  values: RegistrationFormValues;
}
```

- `sessionStorage` only.
- TTL đề xuất 12 giờ.
- Debounce save 500ms.
- Không lưu honeypot.
- Xóa khi success hoặc user chọn “Xóa dữ liệu đã nhập”.

## 9. Error codes

| Code | HTTP | UI behavior |
|---|---:|---|
| `VALIDATION_ERROR` | 400 | Field errors + summary |
| `REGISTRATION_NOT_OPEN` | 409 | State panel |
| `REGISTRATION_CLOSED` | 410 | Giữ draft, contact |
| `DUPLICATE_REGISTRATION` | 409 | Theo duplicate policy |
| `RATE_LIMITED` | 429 | Retry-after |
| `STORAGE_UNAVAILABLE` | 503 | Giữ data, retry |
| `INTERNAL_ERROR` | 500 | Generic + request ID |

## 10. Submission UX

- Generate `Idempotency-Key` một lần cho attempt; retry dùng lại key.
- Không tự retry POST nếu chưa bảo đảm idempotency.
- Success navigate replace.
- Không gửi data qua route state cần persist.

---

<!-- SOURCE: 10_CONTENT_COPY_VI.md -->

# 10 — Vietnamese Content Copy

## 1. Hero

### Eyebrow

`PTIT Innovation Catalyst Challenge 2026`

### H1

`PTIT Innovation Catalyst Challenge 2026`

### Theme

`Rise Beyond Limits`

### Short description

`Sân chơi giải Case Study cấp Học viện, nơi các đội thi liên ngành cùng doanh nghiệp nghiên cứu, xây dựng và thử nghiệm những giải pháp tạo ra giá trị thực tế.`

### CTA

- Open: `Đăng ký ngay`
- Secondary: `Xem thể lệ`
- Not open: `Xem thông tin cuộc thi`
- Closed: `Theo dõi thông báo từ BTC`
- Disabled: `Liên hệ Ban Tổ chức`

## 2. Introduction

`PICC 2026 tạo ra môi trường học tập gắn với thực tiễn, nơi sinh viên kết hợp tư duy công nghệ, kinh doanh, marketing và truyền thông để giải quyết bài toán do doanh nghiệp đặt ra.`

Value titles:

- `Giải bài toán thực tế`
- `Đồng hành cùng chuyên gia`
- `Phát triển tư duy liên ngành`
- `Thử nghiệm giải pháp`

## 3. Quick Facts labels

- `Đối tượng tham gia`
- `Quy mô đội thi`
- `Hình thức`
- `Thời gian đăng ký`

Value phải lấy từ approved config.

## 4. Rules headings

- `Đối tượng tham gia`
- `Hình thức thi`
- `Các vòng thi`
- `Tiêu chí đánh giá`
- `Quy định chung`

Không tự hoàn thiện câu tiêu chí bị thiếu trong nguồn.

## 5. Awards

- `01 Quán quân`
- `01 Á quân`
- `01 Quý quân`
- `03 Giải Khuyến khích`

Disclaimer khi amount unresolved:

`Giá trị và quyền lợi cụ thể của từng hạng mục sẽ được Ban Tổ chức cập nhật.`

## 6. Benefits

- Cơ hội thực tập và làm việc tại doanh nghiệp đồng hành.
- Học bổng và chương trình đào tạo.
- Mentoring trực tiếp bởi chuyên gia và đại diện doanh nghiệp.
- Cơ hội pilot giải pháp trong môi trường thực tế.
- Tiếp cận chương trình ươm tạo và phát triển dự án.

## 7. Form

Step labels:

1. `Thông tin đội`
2. `Thành viên`
3. `Kiểm tra và cam kết`

Common actions:

- `Tiếp tục`
- `Quay lại`
- `Chỉnh sửa`
- `Gửi đăng ký`
- `Đang gửi...`
- `Xóa dữ liệu đã nhập`

## 8. Success

### Title

`Đăng ký thành công!`

### Body

`Ban Tổ chức đã ghi nhận thông tin đăng ký của đội. Các thông báo tiếp theo sẽ được gửi tới email đội trưởng và đăng tải trên kênh truyền thông chính thức của cuộc thi.`

Actions:

- `Trở về trang chủ`
- `Theo dõi kênh BTC`

## 9. Error copy principles

- Nói cách khắc phục.
- Không đổ lỗi người dùng.
- Không hiển thị raw server error.
- Lỗi field đặt ngay dưới field và trong summary khi submit.

---

<!-- SOURCE: 11_CONTENT_CONFIG_AND_DATA_MODEL.md -->

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

---

<!-- SOURCE: 12_TECHNICAL_ARCHITECTURE.md -->

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

---

<!-- SOURCE: 13_API_DATA_SECURITY_AND_OPERATIONS.md -->

# 13 — API, Data, Security and Operations

## 1. Endpoints

```http
GET /api/public-config
POST /api/registrations
```

## 2. Public config response

```json
{
  "serverTime": "2026-08-01T02:00:00.000Z",
  "registration": {
    "openAt": null,
    "closeAt": null,
    "allowSubmissions": false,
    "explicitlyDisabled": true
  },
  "teamSize": {
    "min": 3,
    "max": null,
    "approvalStatus": "unresolved"
  },
  "timeline": []
}
```

## 3. Registration request

Header:

```http
Idempotency-Key: <uuid>
Content-Type: application/json
```

Payload phải có `members.length === teamSize`. Không dùng sample mâu thuẫn.

```json
{
  "teamName": "Example Team",
  "teamSize": 3,
  "challengeCategories": ["technology"],
  "featuredProject": "Mô tả dự án",
  "expectations": "Kỳ vọng",
  "companyExperience": "previous",
  "members": [
    {
      "role": "leader",
      "fullName": "Nguyễn Văn A",
      "studentId": "B20DCCN001",
      "major": "Công nghệ thông tin",
      "email": "a@example.com",
      "phone": "0912345678"
    },
    {
      "role": "member",
      "fullName": "Nguyễn Văn B",
      "studentId": "B20DCMR002",
      "major": "Marketing",
      "email": "b@example.com",
      "phone": "0912345679"
    },
    {
      "role": "member",
      "fullName": "Nguyễn Văn C",
      "studentId": "B20DCPT003",
      "major": "Truyền thông đa phương tiện",
      "email": "c@example.com",
      "phone": "0912345680"
    }
  ],
  "commitments": {
    "truthfulInformation": true,
    "mediaConsent": true,
    "rulesAccepted": true,
    "privacyAcknowledged": true
  },
  "honeypot": "",
  "formStartedAt": "2026-08-01T01:55:00.000Z"
}
```

## 4. Responses

- `201` created.
- `400` validation.
- `409` not open/duplicate.
- `410` closed.
- `429` rate limited.
- `503` storage unavailable.
- `500` internal.

Success:

```json
{
  "success": true,
  "data": {
    "submissionId": "PICC-2026-000001",
    "submittedAt": "2026-08-01T02:00:00.000Z"
  }
}
```

Error:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Dữ liệu chưa hợp lệ.",
    "requestId": "req_123",
    "fieldErrors": {
      "members.0.email": "Email không đúng định dạng."
    }
  }
}
```

## 5. Server validation order

1. Method/content type/body size ≤ 64KB.
2. Rate limit.
3. Idempotency lookup.
4. Registration state using server time.
5. Zod payload validation.
6. Duplicate policy.
7. Storage transaction/append.
8. Idempotency result save.
9. Optional confirmation email.

## 6. Google Sheets model

Không gói members thành một JSON cell nếu BTC cần lọc.

### Sheet `Registrations`

- submissionId.
- submittedAt.
- teamName.
- teamSize.
- categories.
- previousCompetitions.
- featuredProject.
- expectations.
- companyExperience.
- leaderEmail.
- leaderPhone.
- status.

Leader contact derive từ member role leader.

### Sheet `Members`

- submissionId.
- role.
- fullName.
- studentId.
- major.
- email.
- phone.

## 7. Security

- Service account key chỉ ở server secret.
- CORS same-origin mặc định.
- CSRF risk thấp với JSON same-origin nhưng vẫn kiểm tra Origin/Host.
- Honeypot + rate limit + optional CAPTCHA only if abuse occurs.
- Hash IP trước khi dùng rate limit; không lưu IP raw lâu dài.
- Không log body.
- Mask email/phone trong support logs.
- Security headers: CSP, Referrer-Policy, X-Content-Type-Options, Permissions-Policy.

## 8. Idempotency

- Key valid UUID.
- Same key + same body returns prior result.
- Same key + different body returns conflict.
- TTL tối thiểu 24 giờ.

## 9. Operations

Trước mở form:

- Test ghi Sheets thật.
- Test service account permission.
- Backup/export plan.
- On-call contact.
- Runbook gia hạn deadline.
- Runbook storage outage.
- Monitor error rate nhưng không thu PII.

---

<!-- SOURCE: 14_ACCESSIBILITY_SEO_PERFORMANCE.md -->

# 14 — Accessibility, SEO and Performance

## 1. Accessibility target

WCAG 2.2 AA cho luồng chính.

## 2. Keyboard

- Skip link tới main content.
- Menu/Drawer accessible.
- Accordion, Stepper, form dùng keyboard.
- Focus visible ≥ 2px và đủ contrast.
- Sau navigation hash, focus heading bằng `tabIndex=-1` khi cần.
- Error summary focus khi submit invalid.

## 3. Screen reader

- Hero artwork decorative: alt empty.
- Tên cuộc thi là HTML text.
- Countdown có accessible sentence cập nhật không quá thường xuyên; visual digits `aria-hidden` nếu cần.
- Error message liên kết bằng `aria-describedby`.
- Submit status dùng `aria-live="polite"`.
- Icon-only buttons có label.

## 4. Color/contrast

- Text body dùng blue-900/ink.
- Pastel không là tín hiệu duy nhất.
- Kiểm tra focus/error/success states.
- Logo giữ màu gốc nhưng có nền đủ sạch.

## 5. SEO

- Title và description tiếng Việt.
- Canonical URL.
- Open Graph/Twitter cards.
- `Facebook Cover` chỉ dùng OG khi dates approved; fallback dùng social avatar/hero candidate.
- Semantic headings.
- Organization/Event structured data chỉ chứa ngày approved.
- Sitemap/robots phù hợp môi trường.
- Preview có `noindex`.

## 6. Performance budget

- Hero WebP desktop ≤ khoảng 500KB mục tiêu; mobile ≤ 300KB mục tiêu nếu chất lượng cho phép.
- Initial JS gzip mục tiêu ≤ 250KB; theo dõi MUI imports tree-shaking.
- Không import toàn bộ icon package qua wildcard.
- LCP ≤ 2.5s mục tiêu trên profile mobile phù hợp.
- CLS < 0.1.
- INP < 200ms mục tiêu.

## 7. Hero performance

- Correct `<picture>` source.
- Preload một image candidate, không preload cả hai.
- Fixed aspect dimensions.
- Không dùng blur/filter animation trên ảnh lớn.
- Content text render ngay, không chờ image.

## 8. MUI optimization

- Direct imports hoặc bundler-friendly imports.
- Không import `@mui/icons-material` namespace.
- Lazy load noncritical route.
- Theme tạo một lần ngoài render.

## 9. Motion performance

- Transform/opacity only.
- Intersection observer.
- Pause infinite motion khi hidden.
- Reduced motion.

## 10. Privacy

- Analytics disabled mặc định.
- Chỉ bật sau consent/approval nếu cần.
- Không track field values.
- Privacy page trước khi full production registration.

---

<!-- SOURCE: 15_TESTING_AND_ACCEPTANCE.md -->

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

---

<!-- SOURCE: 16_IMPLEMENTATION_PLAN.md -->

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

---

<!-- SOURCE: 17_DECISIONS_REQUIRED.md -->

# 17 — Decisions Required

## Status values

- `UNRESOLVED`
- `PROPOSED`
- `APPROVED`
- `REJECTED`

## P0 — Block full production

| ID | Topic | Decision required | Status |
|---|---|---|---|
| D-001 | Team size | Đăng ký mới gồm 3–4 thành viên | APPROVED |
| D-002 | Eligibility | PTIT-only hay có liên trường? | UNRESOLVED |
| D-003 | Discipline rule | Tối thiểu hai thành viên nhóm ngành là bắt buộc hay khuyến khích? | UNRESOLVED |
| D-004 | Registration dates | Open/close date chính thức | UNRESOLVED |
| D-005 | Registration time | Giờ mở/đóng Asia/Ho_Chi_Minh | UNRESOLVED |
| D-006 | Timeline | Bốn giai đoạn, bảy mốc hay bản khác? | UNRESOLVED |
| D-007 | Submission | Form chỉ đăng ký đội hay phải nộp hồ sơ/link/file? | UNRESOLVED |
| D-008 | Challenge selection | Chọn một hay nhiều nhóm? | UNRESOLVED |
| D-009 | Prize amount | 10.000.000 VNĐ thuộc hạng mục nào? | UNRESOLVED |
| D-010 | Duplicate policy | Email/phone/student ID/kết hợp; block hay review? | UNRESOLVED |
| D-011 | Storage | Google Sheets mặc định có được duyệt? | UNRESOLVED |
| D-012 | Privacy | Notice, retention, access, deletion contact | UNRESOLVED |
| D-013 | Asset rights | Avatar/background/logo được dùng và chuyển WebP? | UNRESOLVED |

### D-001

- Status: APPROVED
- Decision: Đăng ký mới chỉ nhận đội từ 03 đến 04 thành viên. Hồ sơ công khai và registration lịch sử 05 thành viên được giữ để hiển thị/xuất dữ liệu chính xác.
- Approved by: Project owner
- Approved at: 2026-07-29
- Evidence/source: Yêu cầu chuẩn hoá quy mô đội từ 3–5 xuống 3–4.
- Files/config affected: `src/data/competition.ts`, public config, client form, Express/Vercel validation.
- Tests updated: Client schema, Express service, Vercel schema.

## P1 — Before registration launch

| ID | Topic | Decision required | Status |
|---|---|---|---|
| D-014 | First round name | Tên chính thức | UNRESOLVED |
| D-015 | Criteria sentence | Hoàn thiện câu bị thiếu | UNRESOLVED |
| D-016 | Edit after submit | Có được sửa? Kênh nào? | UNRESOLVED |
| D-017 | Confirmation email | Có gửi tự động? Nội dung/sender? | UNRESOLVED |
| D-018 | Contact | Email/phone/address ngoài Facebook | UNRESOLVED |
| D-019 | Rules PDF | Có PDF approved? | UNRESOLVED |
| D-020 | Form character limits | BTC có giới hạn chính thức? | UNRESOLVED |
| D-021 | Backend target | Vercel Functions default có phù hợp hạ tầng? | PROPOSED |
| D-022 | Rate limiting | Upstash/alternative được phép? | PROPOSED |
| D-023 | Facebook Cover | Các ngày trong ảnh có chính thức và được dùng OG/banner? | UNRESOLVED |

## P2 — Content completeness

| ID | Topic | Decision required | Status |
|---|---|---|---|
| D-024 | Mentors | Data + images + rights | UNRESOLVED |
| D-025 | Sponsors | Logo + tier + rights | UNRESOLVED |
| D-026 | FAQ | Approved answers | UNRESOLVED |
| D-027 | Language | Vietnamese only or English | UNRESOLVED |
| D-028 | Analytics | Enable? Tool/consent? | UNRESOLVED |
| D-029 | Font | Self-host Be Vietnam Pro/other or system font | PROPOSED |

## Decision record template

```md
### D-004

- Status: APPROVED
- Decision: Registration closes at ...
- Approved by: ...
- Approved at: ...
- Evidence/source: ...
- Files/config affected: ...
- Tests updated: ...
```

Không xóa quyết định sau khi chốt; giữ lịch sử.

---

<!-- SOURCE: 18_AGENT_MASTER_PROMPT.md -->

# 18 — Master Prompt for Coding Agent

Sao chép phần dưới và đưa kèm toàn bộ thư mục này cho agent.

---

Bạn là Senior Frontend Engineer chịu trách nhiệm triển khai website PICC 2026.

## Bắt buộc trước khi code

1. Đọc `README.md` và `AGENTS.md`.
2. Đọc toàn bộ Markdown theo thứ tự trong README.
3. Audit repository hiện tại.
4. Trả về: repository audit, blocker, giả định, file plan và implementation phases.
5. Sau đó mới code.

## Stack bắt buộc

- React 19 + TypeScript strict + Vite.
- Material UI v7 + `@mui/icons-material` là UI system duy nhất.
- MUI theme/`sx`/`styled`; không dùng Tailwind hoặc UI kit khác.
- Motion for React cho animation.
- React Router DOM v7.
- TanStack React Query v5.
- React Hook Form + Zod.
- i18next/react-i18next.
- Axios.
- Vitest + React Testing Library + Playwright.
- Backend mặc định: Vercel Functions Node 20.
- Storage mặc định: Google Sheets qua server adapter.

## Design bắt buộc

- Candy Pastel, Clean, Friendly, Youthful.
- Hero dùng artwork đã cung cấp, không dựng lại bảng hiệu.
- Desktop: `assets/production-candidates/hero-sign-desktop.webp` làm visual nền phía phải.
- Mobile: `assets/production-candidates/hero-sign-mobile.webp`.
- Copy, countdown và CTA là HTML thật, không dựa vào text trong ảnh.
- Dùng MUI icons decorative phù hợp và motion nhẹ.
- Không dùng `Thuhoptac` production.
- Không nhúng ảnh timeline; dựng timeline responsive từ data, lấy cảm hứng đường wave/node.
- Facebook Cover chỉ dùng nếu dates trong ảnh đã APPROVED và khớp config.

## Nhiệm vụ

1. Khởi tạo/chuẩn hóa kiến trúc trong `12_TECHNICAL_ARCHITECTURE.md`.
2. Tạo MUI theme và component overrides theo `06_UI_DESIGN_SYSTEM.md`.
3. Copy optimized assets vào `public/assets/picc/` và tạo asset manifest.
4. Xây Header, Hero, Countdown, Introduction, Quick Facts, Timeline, Rules, Awards/Benefits, optional Mentors/Sponsors/FAQ, CTA, Registration và Footer.
5. Triển khai motion theo `07_MOTION_AND_INTERACTION.md`, có reduced motion.
6. Triển khai public config server-authoritative.
7. Xây form ba bước; leader contact dùng `members[0]`, không duplicate state.
8. Xây API registration có validation, idempotency, rate limit và Sheets adapter.
9. Viết tests và chạy quality gates.
10. Báo cáo file thay đổi, test result, blocker và phần chưa production-ready.

## Unresolved data

- Không tự chọn deadline, team size, eligibility, timeline, prize hoặc duplicate policy.
- Preview được dùng mock có nhãn rõ.
- Full production phải fail nếu còn P0 unresolved.
- Content-only production được phép nếu registration explicit disabled và chỉ dùng asset/content approved.

## Performance/accessibility

- Hero image bằng `<picture>`/`img` absolute, high priority, fixed dimensions.
- UI text semantic và accessible.
- Keyboard form đầy đủ.
- Reduced motion.
- Không log PII.
- Không secret client.

## Definition of Done

- Responsive: 360, 390, 768, 1024, 1440.
- Không horizontal scroll.
- Hero artwork không crop bảng hiệu chính.
- Countdown/CTA/form/API đồng bộ.
- Form giữ data khi step/error.
- Double submit không tạo duplicate.
- Reference-only asset không ship.
- Lint/typecheck/test/E2E/build pass.
- Production config validator hoạt động.

Bắt đầu bằng repository audit và plan. Không bắt đầu bằng việc viết code ngay.

---
