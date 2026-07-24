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
