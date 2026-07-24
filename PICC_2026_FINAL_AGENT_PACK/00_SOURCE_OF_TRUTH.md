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

## 3. Nội dung chưa được phép tự khóa

- Ngày giờ mở/đóng đăng ký.
- Timeline chính thức.
- Team size 3–4 hay 3–5.
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
