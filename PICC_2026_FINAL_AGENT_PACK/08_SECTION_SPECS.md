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
