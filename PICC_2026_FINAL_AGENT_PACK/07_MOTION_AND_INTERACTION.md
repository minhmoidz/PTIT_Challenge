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
