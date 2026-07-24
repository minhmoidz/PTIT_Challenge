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
