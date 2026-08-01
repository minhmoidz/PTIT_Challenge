import { Grid, TextField, MenuItem, Typography, Box } from '@mui/material';
import { useFormContext, useWatch, Controller } from 'react-hook-form';
import type { RegistrationFormValues } from '@/types/registration';
import { competitionData } from '@/data/competition';
import { piccColors } from '@/theme/palette';

const CHALLENGE_OPTIONS = [
  { value: 'business', label: 'Kinh tế và Kinh doanh' },
  { value: 'technology', label: 'Công nghệ' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'media', label: 'Truyền thông' },
  { value: 'other', label: 'Khác' },
];

const EXPERIENCE_OPTIONS = [
  { value: 'none', label: 'Chưa từng tham gia' },
  { value: 'previous', label: 'Đã tham gia cuộc thi tương tự' },
  { value: 'ongoing', label: 'Đang tham gia dự án/dự thi khác' },
];

interface FormStep1Props {
  teamMin: number;
  teamMax: number;
}

export const FormStep1 = ({ teamMin, teamMax }: FormStep1Props) => {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<RegistrationFormValues>();

  const rawCategories = useWatch({ control, name: 'challengeCategories' });
  const categories = Array.isArray(rawCategories) ? rawCategories : [];

  return (
    <Box>
      <Typography variant="h3" component="h3" sx={{ fontSize: '1.15rem', fontWeight: 800, color: piccColors.ptitNavy, mb: 3 }}>
        Phần I — Thông tin đội thi
      </Typography>

      {/* Rule Notice */}
      <Box
        sx={{
          p: 1.75,
          px: 2.25,
          borderRadius: 3,
          bgcolor: piccColors.blue[50],
          border: '1px solid rgba(36, 95, 168, 0.3)',
          mb: 3,
        }}
      >
        <Typography sx={{ fontSize: '0.825rem', color: piccColors.blue[800], fontWeight: 650, lineHeight: 1.5 }}>
          📌 Rule Lưu ý: {competitionData.teamRules.warning}
        </Typography>
      </Box>

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Tên đội thi *"
            placeholder="VD: Team Catalyst 2026"
            {...register('teamName')}
            error={!!errors.teamName}
            helperText={errors.teamName?.message}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="teamSize"
            control={control}
            defaultValue={3}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                select
                label="Số lượng thành viên *"
                error={!!errors.teamSize}
                helperText={errors.teamSize?.message}
                onChange={(e) => field.onChange(Number(e.target.value))}
              >
                {Array.from({ length: teamMax - teamMin + 1 }, (_, index) => teamMin + index).map((n) => (
                  <MenuItem key={n} value={n}>
                    {n} thành viên
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Controller
            name="challengeCategories"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <TextField
                fullWidth
                select
                label="Nhóm bài toán muốn tham gia *"
                error={!!errors.challengeCategories}
                helperText={errors.challengeCategories?.message || 'Chọn nhóm bài toán đội quan tâm'}
                SelectProps={{
                  multiple: true,
                  value: Array.isArray(field.value) ? field.value : [],
                  onChange: (e) => {
                    const val = e.target.value;
                    field.onChange(typeof val === 'string' ? val.split(',') : val);
                  },
                }}
              >
                {CHALLENGE_OPTIONS.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>

        {categories.includes('other') && (
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Nhóm bài toán khác *"
              placeholder="Vui lòng ghi rõ nhóm bài toán"
              {...register('otherChallengeCategory')}
              error={!!errors.otherChallengeCategory}
              helperText={errors.otherChallengeCategory?.message}
            />
          </Grid>
        )}

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Email liên hệ đội trưởng *"
            type="email"
            placeholder="doitruong@ptit.edu.vn"
            {...register('members.0.email')}
            error={!!errors.members?.[0]?.email}
            helperText={errors.members?.[0]?.email?.message}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Số điện thoại đội trưởng *"
            placeholder="0912345678"
            inputMode="tel"
            {...register('members.0.phone')}
            error={!!errors.members?.[0]?.phone}
            helperText={errors.members?.[0]?.phone?.message}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Họ và tên đội trưởng *"
            placeholder="Nguyễn Văn A"
            {...register('members.0.fullName')}
            error={!!errors.members?.[0]?.fullName}
            helperText={errors.members?.[0]?.fullName?.message}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Mã sinh viên đội trưởng *"
            placeholder="B20DCCN001"
            {...register('members.0.studentId')}
            error={!!errors.members?.[0]?.studentId}
            helperText={errors.members?.[0]?.studentId?.message}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Ngành học đội trưởng *"
            placeholder="Công nghệ thông tin / Truyền thông đa phương tiện / Marketing"
            {...register('members.0.major')}
            error={!!errors.members?.[0]?.major}
            helperText={errors.members?.[0]?.major?.message}
          />
        </Grid>
      </Grid>

      <Typography variant="h3" component="h3" sx={{ fontSize: '1.15rem', fontWeight: 800, color: piccColors.ptitNavy, mb: 3, mt: 4 }}>
        Kinh nghiệm và Kỳ vọng
      </Typography>

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12 }}>
          <Controller
            name="companyExperience"
            control={control}
            defaultValue="none"
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Kinh nghiệm tham gia cuộc thi"
                select
                error={!!errors.companyExperience}
                helperText={errors.companyExperience?.message}
              >
                {EXPERIENCE_OPTIONS.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            multiline
            rows={2}
            label="Kinh nghiệm tham gia cuộc thi trước đây"
            placeholder="Ghi tên cuộc thi, năm tham gia và thành tích nếu có..."
            {...register('previousCompetitions')}
            error={!!errors.previousCompetitions}
            helperText={errors.previousCompetitions?.message}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Mô tả dự án nổi bật nhất từng thực hiện *"
            placeholder="Mô tả dự án, vai trò thành viên và kết quả đạt được..."
            {...register('featuredProject')}
            error={!!errors.featuredProject}
            helperText={errors.featuredProject?.message || 'Tối đa 1500 ký tự'}
            inputProps={{ maxLength: 1500 }}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Kỳ vọng khi tham gia cuộc thi *"
            placeholder="Đội mong muốn học hỏi hay đạt được điều gì sau PICC 2026?"
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
