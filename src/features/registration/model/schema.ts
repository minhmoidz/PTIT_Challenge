import { z } from 'zod';

export const createRegistrationSchema = (config: {
  teamMin: number;
  teamMax: number;
  challengeMode: 'single' | 'multiple' | null;
  maxSelections?: number;
}) =>
  z
    .object({
      teamName: z.string().trim().min(2, 'Tên đội phải có ít nhất 2 ký tự').max(80, 'Tên đội tối đa 80 ký tự'),
      teamSize: z.number().min(config.teamMin, `Tối thiểu ${config.teamMin} thành viên`).max(config.teamMax, `Tối đa ${config.teamMax} thành viên`),
      challengeCategories: z
        .array(z.string())
        .min(1, 'Vui lòng chọn ít nhất một nhóm bài toán')
        .superRefine((categories, ctx) => {
          if (config.challengeMode === 'single' && categories.length > 1) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Chỉ được chọn 01 nhóm bài toán theo cấu hình hiện tại.',
            });
          }

          if (
            config.challengeMode === 'multiple' &&
            typeof config.maxSelections === 'number' &&
            categories.length > config.maxSelections
          ) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `Chỉ được chọn tối đa ${config.maxSelections} nhóm bài toán.`,
            });
          }
        }),
      otherChallengeCategory: z.string().optional(),
      previousCompetitions: z.string().max(500).optional(),
      featuredProject: z.string().trim().min(1, 'Vui lòng nhập mô tả dự án').max(1500, 'Mô tả tối đa 1500 ký tự'),
      expectations: z.string().trim().min(1, 'Vui lòng nhập kỳ vọng của đội').max(1000, 'Kỳ vọng tối đa 1000 ký tự'),
      companyExperience: z.enum(['none', 'previous', 'ongoing'], {
        required_error: 'Vui lòng chọn kinh nghiệm',
      }),
      members: z
        .array(
          z.object({
            role: z.enum(['leader', 'member']),
            fullName: z.string().trim().min(1, 'Vui lòng nhập họ tên'),
            studentId: z.string().trim().min(1, 'Vui lòng nhập mã sinh viên'),
            major: z.string().trim().min(1, 'Vui lòng nhập ngành học'),
            email: z.string().trim().email('Email không đúng định dạng'),
            phone: z
              .string()
              .trim()
              .regex(/^(0[3|5|7|8|9])[0-9]{8}$/, 'Số điện thoại không đúng định dạng'),
          }),
        )
        .min(config.teamMin)
        .max(config.teamMax),
      commitments: z.object({
        truthfulInformation: z.literal(true, {
          errorMap: () => ({ message: 'Vui lòng xác nhận thông tin chính xác' }),
        }),
        mediaConsent: z.literal(true, {
          errorMap: () => ({ message: 'Vui lòng đồng ý với việc sử dụng hình ảnh' }),
        }),
        rulesAccepted: z.literal(true, {
          errorMap: () => ({ message: 'Vui lòng chấp nhận thể lệ cuộc thi' }),
        }),
        privacyAcknowledged: z.literal(true, {
          errorMap: () => ({ message: 'Vui lòng xác nhận chính sách bảo mật' }),
        }),
      }),
      honeypot: z.string().max(0, 'Invalid submission'),
      formStartedAt: z.string(),
    })
    .refine(
      (data) => {
        if (data.honeypot.length > 0) return false;
        return true;
      },
      { message: 'Invalid submission' },
    )
    .refine(
      (data) => {
        const memberCount = data.members.length;
        return memberCount === data.teamSize;
      },
      { message: 'Số lượng thành viên phải bằng teamSize' },
    );
