# BÁO CÁO RÀ SOÁT, CHUẨN HÓA VÀ NGUỒN DỮ LIỆU CONTENT (CONTENT_AUDIT.md)
**Dự án:** PTIT Innovation Catalyst Challenge 2026 — PICC 2026  
**Ngày cập nhật:** 26/07/2026  

---

## 1. Nguồn Dữ Liệu Duy Nhất (Single Source of Truth)
Toàn bộ thông tin cuộc thi trên website hiện được tập trung duy nhất tại:
`file:///c:/Users/IECSACT5070/Desktop/MinhTT/PTIT_Challenge/src/data/competition.ts`

Tất cả các components UI (Hero, Countdown, Roadmap, Rules, Prizes, Benefits, Sponsors, Mentors, FAQ, Form Đăng ký, Footer, Meta SEO) đều import và tiêu thụ trực tiếp từ nguồn dữ liệu chuẩn này, không hard-code rải rác.

---

## 2. Chi Tiết Các Quyết Định Chuẩn Hóa & Bảng So Sánh Nội Dung

| Hạng mục | Nội dung cũ (Cần xóa/thay thế) | Nội dung mới (Đã chuẩn hóa) | Vị trí source đã sửa | Trạng thái |
|---|---|---|---|---|
| **Đối tượng tham gia** | "Sinh viên PTIT & toàn quốc", "Sinh viên các trường đại học toàn quốc" | **"Sinh viên Học viện Công nghệ Bưu chính Viễn thông."** | `src/data/competition.ts`, `src/sections/hero/HeroContent.tsx`, `src/sections/rules/components/ParticipantCard.tsx` | ✅ CONFIRMED |
| **Quy mô đội thi** | "3–4 thành viên", "03–04 thành viên", Form chỉ 4 người | **"03 đến 05 thành viên"** (Đội trưởng + 2 thành viên bắt buộc; TV4/TV5 theo quy mô) | `src/data/competition.ts`, `src/features/registration/components/FormStep1.tsx`, `FormStep2.tsx` | ✅ CONFIRMED |
| **Ghi chú cơ cấu ngành** | Chưa có hoặc ghi chưa rõ | **"Trong đội có tối thiểu 02 thành viên thuộc khối kinh tế số, marketing, truyền thông đa phương tiện hoặc thiết kế."** | `src/data/competition.ts`, `src/sections/rules/components/ParticipantCard.tsx`, `FormStep1.tsx` | ✅ CONFIRMED |
| **Thời gian đăng ký** | "19/08/2026", "01/08 - 19/08/2026", Countdown đếm 19/08 | **"01/08/2026 – 15/08/2026"** (Timezone `+07:00`) | `src/data/competition.ts`, `src/config/milestones.ts`, `src/sections/hero/RegistrationCountdown.tsx` | ✅ CONFIRMED |
| **Số giai đoạn cuộc thi** | 5 mốc uốn lượn cũ (Mở đơn, Đóng đơn, Công bố V1, Chung khảo, Chung kết) | **04 Giai đoạn chính**: <br>1. Đăng ký / Vòng đơn (01/08 - 15/08)<br>2. Vòng Bán kết (20/08 - 15/09)<br>3. Chạy thử nghiệm (07/09 - 01/10)<br>4. Vòng Chung kết (02/10) | `src/data/competition.ts`, `src/config/milestones.ts`, `src/sections/timeline/TimelineSection.tsx` | ✅ CONFIRMED |
| **Cơ cấu giải thưởng** | "85.000.000 VNĐ", "100.000.000+ VNĐ", "40M", "20M", "5M/giải" | **Quán quân:** Giá trị dự kiến 10.000.000 VNĐ.<br>**Á quân, Quý quân, Khuyến khích (x3):** Đang cập nhật quyền lợi & phần thưởng. | `src/data/competition.ts`, `src/sections/awards/AwardsSection.tsx`, `src/sections/awards/components/AwardPodium.tsx` | ✅ CONFIRMED |
| **Tiêu chí chấm điểm** | "30% / 30% / 20% / 20%", "Tổng 100%", progress bar phần trăm | **04 Tiêu chí không có tỷ trọng phần trăm:**<br>1. Mức độ rõ ràng và ý nghĩa của vấn đề (sửa typo "vấn .")<br>2. Tính khả thi khi triển khai thực tế<br>3. Giá trị tạo ra cho doanh nghiệp<br>4. Năng lực đội thi & chất lượng trình bày | `src/data/competition.ts`, `src/sections/rules/components/JudgingCriteria.tsx` | ✅ CONFIRMED |
| **Thành phần hồ sơ dự thi** | Hardcoded "03 loại tài liệu": Slide trình bày, Video 3-5 phút, Executive Summary | **Thông báo chung chuẩn:** "Các đội phân tích vấn đề và đề xuất hướng giải quyết thông qua hồ sơ dự thi theo hướng dẫn của Ban Tổ chức." | `src/data/competition.ts`, `src/sections/rules/components/SubmissionRequirements.tsx` | ✅ CONFIRMED |
| **Nhà tài trợ & Đối tác** | Dữ liệu mock: Viettel, VNPT, FPT, Samsung, MISA | **Placeholder trung tính:** "Danh sách Nhà tài trợ & Đối tác đồng hành đang được cập nhật." | `src/data/competition.ts`, `src/sections/sponsors/SponsorsSection.tsx` | ⏳ PLACEHOLDER |
| **Hội đồng & Mentors** | Dữ liệu mock: Tên giảng viên & chuyên gia đóng vai như dữ liệu thật | **Placeholder trung tính:** "Thông tin Hội đồng Giám khảo, Cố vấn chuyên môn và Mentors sẽ được công bố trong thời gian tới." | `src/data/competition.ts`, `src/sections/mentors/MentorsSection.tsx` | ⏳ PLACEHOLDER |
| **FAQ** | 8 câu cũ có 3 vòng thi & thông tin mâu thuẫn | **10 câu FAQ chuẩn hóa** khớp 100% với Thể lệ và thông tin chính thức | `src/data/competition.ts`, `src/sections/faq/FAQSection.tsx` | ✅ CONFIRMED |
| **Kênh liên hệ chính thức** | Mail cá nhân hoặc link không xác định | **Facebook chính thức:** `https://www.facebook.com/PTITIEC?locale=vi_VN` | `src/data/competition.ts`, `src/sections/faq/FAQSection.tsx`, `FooterSection.tsx` | ✅ CONFIRMED |

---

## 3. Các Nội Dung Mâu Thuẫn & Cần Ban Tổ Chức (BTC) Xác Nhận (NEEDS_CONFIRMATION)

1. **Mâu thuẫn Ngày Đóng Đăng ký (15/08 vs 19/08):**
   - *Phân tích:* Thể lệ chi tiết ghi hạn nộp đăng ký từ `01/08 – 15/08/2026`. Nguồn cũ trong source code ghi `19/08/2026`.
   - *Quyết định:* Ưu tiên Thể lệ chi tiết (Priority 1) -> Sử dụng **15/08/2026**. Cần BTC xác nhận lại hạn cuối chính thức.
   - *Trạng thái:* `NEEDS_CONFIRMATION`

2. **Mâu thuẫn Ngày Chạy Thử Nghiệm (07/09 vs Ngày Bán kết 15/09):**
   - *Phân tích:* Giai đoạn 3 (Chạy thử nghiệm) ghi thời gian từ `07/09 – 01/10/2026`. Tuy nhiên, Giai đoạn 2 (Bán kết) chọn Top 6 đội vào ngày `15/09/2026` (sau ngày 07/09).
   - *Quyết định:* Giữ nguyên mốc chính thức, đánh dấu `needsDateConfirmation: true` trong data model, và hiển thị nhãn "Dự kiến" trên UI mà không tự ý sửa đổi ngày của BTC.
   - *Trạng thái:* `NEEDS_CONFIRMATION`

3. **Điều khoản "Giao lưu liên trường ở vòng đầu":**
   - *Phân tích:* Thể lệ có đề cập câu liên quan đến giao lưu liên trường ở vòng đầu, nhưng mâu thuẫn trực tiếp với điều kiện đối tượng "Sinh viên PTIT".
   - *Quyết định:* Public website phục vụ sinh viên PTIT. Không mở form cho sinh viên ngoài PTIT khi chưa có thông báo chính thức.
   - *Trạng thái:* `NEEDS_CONFIRMATION`

4. **Giá trị & Quyền lợi Chi tiết của Hạng mục Á quân, Quý quân, Khuyến khích:**
   - *Phân tích:* Hiện chỉ có số tiền dự kiến 10.000.000 VNĐ cho Quán quân. Các hạng mục còn lại chưa có con số tiền mặt cụ thể.
   - *Quyết định:* Hiển thị "Đang cập nhật" cho các hạng mục 2, 3, 4 cùng lưu ý công khai. Không tự tính tổng số tiền thưởng.
   - *Trạng thái:* `NEEDS_CONFIRMATION`

5. **Danh sách Logo Doanh nghiệp Đồng hành & Chân dung Mentors:**
   - *Phân tích:* Chưa có danh sách bảo trợ truyền thông / tài trợ được duyệt chính thức.
   - *Quyết định:* Chuyển sang giao diện Placeholder "Đang cập nhật" trung tính, không sử dụng logo thương hiệu thật khi chưa được cấp phép.
   - *Trạng thái:* `NEEDS_CONFIRMATION`

---

## 4. Báo Cáo Kiểm Tra Kỹ Thuật (QA & Build Status)
- **Data Centralization:** 100% dữ liệu cuộc thi đọc từ `src/data/competition.ts`.
- **Form Đăng ký:** Hỗ trợ linh hoạt 3–5 thành viên (Validation trùng MST, trùng Email, 3 Checkbox cam kết bắt buộc).
- **TypeScript Check:** Passed 0 errors (`npx tsc --noEmit`).
- **Production Build:** Passed in 240ms (`npx vite build`).