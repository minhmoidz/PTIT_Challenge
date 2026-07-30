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
