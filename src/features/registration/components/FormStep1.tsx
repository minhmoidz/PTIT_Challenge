import { Grid, TextField, MenuItem, Typography, Box } from '@mui/material';
import { useFormContext, useWatch } from 'react-hook-form';
import type { RegistrationFormValues } from '@/types/registration';
import { useRegistrationStatus } from '@/features/registration/hooks';

const CHALLENGE_OPTIONS = [
  { value: 'technology', label: 'Công nghệ thông tin' },
  { value: 'business', label: 'Kinh doanh / Quản trị' },
  { value: 'marketing', label: 'Marketing / Truyền thông' },
  { value: 'education', label: 'Giáo dục / Đào tạo' },
  { value: 'social', label: 'Xã hội / Phi lợi nhuận' },
  { value: 'other', label: 'Khác' },
];

const EXPERIENCE_OPTIONS = [
  { value: 'none', label: 'Chưa từng tham gia' },
  { value: 'previous', label: 'Đã tham gia cuộc thi tương tự' },
  { value: 'ongoing', label: 'Đang tham gia dự án/dự thi khác' },
];

export const FormStep1 = () => {
  const { config } = useRegistrationStatus();
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<RegistrationFormValues>();

  const categories = useWatch({ control, name: 'challengeCategories' });

  return (
    <Box>
      <Typography variant="h3" component="h3" sx={{ fontSize: '1.15rem', mb: 3 }}>
        Thông tin đội thi
      </Typography>

      <Grid container spacing={2.5}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Tên đội"
            placeholder="VD: Team Innovation"
            {...register('teamName')}
            error={!!errors.teamName}
            helperText={errors.teamName?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            select
            label="Số lượng thành viên"
            {...register('teamSize', { valueAsNumber: true })}
            error={!!errors.teamSize}
            helperText={errors.teamSize?.message}
            defaultValue={config.teamSize.max ?? 5}
          >
            {Array.from(
              { length: (config.teamSize.max ?? 5) - config.teamSize.min + 1 },
              (_, i) => i + config.teamSize.min,
            ).map((n) => (
              <MenuItem key={n} value={n}>
                {n} thành viên
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            select
            label="Nhóm bài toán"
            {...register('challengeCategories')}
            error={!!errors.challengeCategories}
            helperText={errors.challengeCategories?.message || 'Chọn nhóm bài toán đội quan tâm'}
            SelectProps={{ multiple: true }}
          >
            {CHALLENGE_OPTIONS.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {categories?.includes('other') && (
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nhóm bài toán khác"
              placeholder="Vui lòng ghi rõ"
              {...register('otherChallengeCategory')}
              error={!!errors.otherChallengeCategory}
              helperText={errors.otherChallengeCategory?.message}
            />
          </Grid>
        )}

        <Grid item xs={12} />
        <Grid item xs={12} sm={6}>
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: 'text.secondary' }}>
            Thông tin đội trưởng
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email đội trưởng"
            type="email"
            placeholder="leader@example.com"
            {...register('members.0.email')}
            error={!!errors.members?.[0]?.email}
            helperText={errors.members?.[0]?.email?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Số điện thoại"
            placeholder="0912345678"
            inputMode="tel"
            {...register('members.0.phone')}
            error={!!errors.members?.[0]?.phone}
            helperText={errors.members?.[0]?.phone?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Họ và tên"
            placeholder="Nguyễn Văn A"
            {...register('members.0.fullName')}
            error={!!errors.members?.[0]?.fullName}
            helperText={errors.members?.[0]?.fullName?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Mã sinh viên"
            placeholder="B20DCCN001"
            {...register('members.0.studentId')}
            error={!!errors.members?.[0]?.studentId}
            helperText={errors.members?.[0]?.studentId?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Ngành học"
            placeholder="Công nghệ thông tin"
            {...register('members.0.major')}
            error={!!errors.members?.[0]?.major}
            helperText={errors.members?.[0]?.major?.message}
          />
        </Grid>
      </Grid>

      <Typography variant="h3" component="h3" sx={{ fontSize: '1.15rem', mb: 3, mt: 4 }}>
        Kinh nghiệm và kỳ vọng
      </Typography>

      <Grid container spacing={2.5}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Kinh nghiệm với cuộc thi"
            select
            {...register('companyExperience')}
            defaultValue="none"
            error={!!errors.companyExperience}
            helperText={errors.companyExperience?.message}
          >
            {EXPERIENCE_OPTIONS.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Kinh nghiệm tham gia cuộc thi trước đây (nếu có)"
            placeholder="Mô tả ngắn về các cuộc thi/dự án đã tham gia..."
            {...register('previousCompetitions')}
            error={!!errors.previousCompetitions}
            helperText={errors.previousCompetitions?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Mô tả dự án nổi bật *"
            placeholder="Giới thiệu về dự án hoặc sản phẩm mà đội tâm đắc nhất..."
            {...register('featuredProject')}
            error={!!errors.featuredProject}
            helperText={errors.featuredProject?.message || 'Tối đa 1500 ký tự'}
            inputProps={{ maxLength: 1500 }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Kỳ vọng khi tham gia *"
            placeholder="Đội mong muốn đạt được điều gì khi tham gia PICC 2026?"
            {...register('expectations')}
            error={!!errors.expectations}
            helperText={errors.expectations?.message || 'Tối đa 1000 ký tự'}
            inputProps={{ maxLength: 1000 }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
