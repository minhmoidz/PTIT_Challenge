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
