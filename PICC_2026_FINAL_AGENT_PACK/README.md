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
