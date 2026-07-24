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
