# 09 — Registration Form Specification

## 1. Single source for leader data

Không có `leaderEmail` và `leaderPhone` độc lập với members.

Bước 1 thu thông tin liên hệ đội trưởng nhưng bind trực tiếp vào:

```ts
members.0.email
members.0.phone
```

Bước 2 hiển thị lại Thành viên 1 và sử dụng cùng form state.

## 2. Form schema

```ts
export interface RegistrationFormValues {
  teamName: string;
  teamSize: number;
  challengeCategories: string[];
  otherChallengeCategory?: string;
  previousCompetitions?: string;
  featuredProject: string;
  expectations: string;
  companyExperience: 'none' | 'previous' | 'ongoing';
  members: TeamMember[];
  commitments: {
    truthfulInformation: boolean;
    mediaConsent: boolean;
    rulesAccepted: boolean;
    privacyAcknowledged: boolean;
  };
  honeypot: string;
  formStartedAt: string;
}

export interface TeamMember {
  role: 'leader' | 'member';
  fullName: string;
  studentId: string;
  major: string;
  email: string;
  phone: string;
}
```

`members[0].role` luôn là `leader`; các member khác là `member`.

## 3. Step 1 — Team and leader contact

| Field | Required | Rule |
|---|---:|---|
| Team name | Yes | trim, 2–80 chars |
| Team size | Yes | approved config min/max |
| Leader email | Yes | bind `members.0.email` |
| Leader phone | Yes | bind `members.0.phone` |
| Challenge categories | Yes | one/multiple theo config |
| Other category | Conditional | required khi chọn `other` |
| Previous competitions | No | max configurable |
| Featured project | Yes | max 1500 chars đề xuất |
| Expectations | Yes | max 1000 chars đề xuất |
| Company experience | Yes | enum |

Giới hạn ký tự là technical default và phải có thể config.

## 4. Step 2 — Members

Mỗi member:

- Full name.
- Student ID.
- Major.
- Email.
- Phone.

Rules:

- Render đúng `teamSize`.
- Không duplicate student ID trong team.
- Không duplicate email trong team nếu BTC yêu cầu; mặc định cảnh báo, server policy theo quyết định.
- Không regex student ID quá chặt khi chưa có format chính thức.
- Khi giảm teamSize, xác nhận trước khi xóa data cuối danh sách.

## 5. Step 3 — Review and commitments

- Review theo nhóm.
- Edit button quay lại đúng step.
- Bốn checkbox gồm privacy acknowledgement.
- Link thể lệ mở tab mới nếu có PDF approved.
- Submit button hiển thị progress và disabled khi pending.

## 6. Validation

- Zod schema factory nhận public config.
- `members.length === teamSize`.
- Một leader duy nhất tại index 0.
- Email normalize lowercase cho compare; lưu display value sau trim.
- Phone normalize phía server.
- Honeypot rỗng.
- Minimum fill duration đề xuất 3 giây, server đánh giá mềm/anti-bot.
- Server validate lại toàn bộ.

## 7. React Hook Form

```ts
useForm({
  mode: 'onTouched',
  reValidateMode: 'onChange',
  shouldUnregister: false,
  resolver: zodResolver(schema),
});
```

Dùng `FormProvider` và `useFieldArray`.

## 8. Draft persistence

```ts
interface RegistrationDraftEnvelope {
  version: 1;
  savedAt: string;
  expiresAt: string;
  values: RegistrationFormValues;
}
```

- `sessionStorage` only.
- TTL đề xuất 12 giờ.
- Debounce save 500ms.
- Không lưu honeypot.
- Xóa khi success hoặc user chọn “Xóa dữ liệu đã nhập”.

## 9. Error codes

| Code | HTTP | UI behavior |
|---|---:|---|
| `VALIDATION_ERROR` | 400 | Field errors + summary |
| `REGISTRATION_NOT_OPEN` | 409 | State panel |
| `REGISTRATION_CLOSED` | 410 | Giữ draft, contact |
| `DUPLICATE_REGISTRATION` | 409 | Theo duplicate policy |
| `RATE_LIMITED` | 429 | Retry-after |
| `STORAGE_UNAVAILABLE` | 503 | Giữ data, retry |
| `INTERNAL_ERROR` | 500 | Generic + request ID |

## 10. Submission UX

- Generate `Idempotency-Key` một lần cho attempt; retry dùng lại key.
- Không tự retry POST nếu chưa bảo đảm idempotency.
- Success navigate replace.
- Không gửi data qua route state cần persist.
