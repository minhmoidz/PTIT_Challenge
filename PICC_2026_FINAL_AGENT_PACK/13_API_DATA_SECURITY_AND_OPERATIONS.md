# 13 — API, Data, Security and Operations

## 1. Endpoints

```http
GET /api/public-config
POST /api/registrations
```

## 2. Public config response

```json
{
  "serverTime": "2026-08-01T02:00:00.000Z",
  "registration": {
    "openAt": null,
    "closeAt": null,
    "allowSubmissions": false,
    "explicitlyDisabled": true
  },
  "teamSize": {
    "min": 3,
    "max": null,
    "approvalStatus": "unresolved"
  },
  "timeline": []
}
```

## 3. Registration request

Header:

```http
Idempotency-Key: <uuid>
Content-Type: application/json
```

Payload phải có `members.length === teamSize`. Không dùng sample mâu thuẫn.

```json
{
  "teamName": "Example Team",
  "teamSize": 3,
  "challengeCategories": ["technology"],
  "featuredProject": "Mô tả dự án",
  "expectations": "Kỳ vọng",
  "companyExperience": "previous",
  "members": [
    {
      "role": "leader",
      "fullName": "Nguyễn Văn A",
      "studentId": "B20DCCN001",
      "major": "Công nghệ thông tin",
      "email": "a@example.com",
      "phone": "0912345678"
    },
    {
      "role": "member",
      "fullName": "Nguyễn Văn B",
      "studentId": "B20DCMR002",
      "major": "Marketing",
      "email": "b@example.com",
      "phone": "0912345679"
    },
    {
      "role": "member",
      "fullName": "Nguyễn Văn C",
      "studentId": "B20DCPT003",
      "major": "Truyền thông đa phương tiện",
      "email": "c@example.com",
      "phone": "0912345680"
    }
  ],
  "commitments": {
    "truthfulInformation": true,
    "mediaConsent": true,
    "rulesAccepted": true,
    "privacyAcknowledged": true
  },
  "honeypot": "",
  "formStartedAt": "2026-08-01T01:55:00.000Z"
}
```

## 4. Responses

- `201` created.
- `400` validation.
- `409` not open/duplicate.
- `410` closed.
- `429` rate limited.
- `503` storage unavailable.
- `500` internal.

Success:

```json
{
  "success": true,
  "data": {
    "submissionId": "PICC-2026-000001",
    "submittedAt": "2026-08-01T02:00:00.000Z"
  }
}
```

Error:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Dữ liệu chưa hợp lệ.",
    "requestId": "req_123",
    "fieldErrors": {
      "members.0.email": "Email không đúng định dạng."
    }
  }
}
```

## 5. Server validation order

1. Method/content type/body size ≤ 64KB.
2. Rate limit.
3. Idempotency lookup.
4. Registration state using server time.
5. Zod payload validation.
6. Duplicate policy.
7. Storage transaction/append.
8. Idempotency result save.
9. Optional confirmation email.

## 6. Google Sheets model

Không gói members thành một JSON cell nếu BTC cần lọc.

### Sheet `Registrations`

- submissionId.
- submittedAt.
- teamName.
- teamSize.
- categories.
- previousCompetitions.
- featuredProject.
- expectations.
- companyExperience.
- leaderEmail.
- leaderPhone.
- status.

Leader contact derive từ member role leader.

### Sheet `Members`

- submissionId.
- role.
- fullName.
- studentId.
- major.
- email.
- phone.

## 7. Security

- Service account key chỉ ở server secret.
- CORS same-origin mặc định.
- CSRF risk thấp với JSON same-origin nhưng vẫn kiểm tra Origin/Host.
- Honeypot + rate limit + optional CAPTCHA only if abuse occurs.
- Hash IP trước khi dùng rate limit; không lưu IP raw lâu dài.
- Không log body.
- Mask email/phone trong support logs.
- Security headers: CSP, Referrer-Policy, X-Content-Type-Options, Permissions-Policy.

## 8. Idempotency

- Key valid UUID.
- Same key + same body returns prior result.
- Same key + different body returns conflict.
- TTL tối thiểu 24 giờ.

## 9. Operations

Trước mở form:

- Test ghi Sheets thật.
- Test service account permission.
- Backup/export plan.
- On-call contact.
- Runbook gia hạn deadline.
- Runbook storage outage.
- Monitor error rate nhưng không thu PII.
