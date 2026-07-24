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
