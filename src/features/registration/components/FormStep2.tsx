import { Grid, TextField, Typography, Box, Alert, Chip } from '@mui/material';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { useFormContext, useWatch } from 'react-hook-form';
import type { RegistrationFormValues } from '@/types/registration';
import { piccColors } from '@/theme/palette';

const PHONE_HINT = 'VD: 0912 345 678 (bắt đầu 0, đủ 10 số)';
const EMAIL_HINT = 'VD: ten@ptit.edu.vn';

interface FormStep2Props {
  teamMin: number;
  teamMax: number;
}

export const FormStep2 = ({ teamMin, teamMax }: FormStep2Props) => {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<RegistrationFormValues>();

  const watchTeamSize = useWatch({ control, name: 'teamSize' });
  const requestedTeamSize = typeof watchTeamSize === 'number' ? watchTeamSize : teamMin;
  const teamSize = Math.min(Math.max(requestedTeamSize, teamMin), teamMax);
  const memberCount = teamSize;

  return (
    <Box>
      <Typography variant="h3" component="h3" sx={{ fontSize: '1.15rem', fontWeight: 800, color: piccColors.ptitNavy, mb: 3 }}>
        Phần II — Thông tin các thành viên đội thi ({teamSize} thành viên)
      </Typography>

      {/* Industry Mix Rule Reminder */}
      <Alert
        severity="info"
        sx={{
          mb: 4,
          borderRadius: 3,
          bgcolor: piccColors.blue[50],
          border: '1px solid rgba(56, 130, 241, 0.3)',
          fontWeight: 650,
          fontSize: '0.85rem',
        }}
      >
        📌 <strong>Lưu ý thể lệ:</strong> Đội thi cần có <strong>tối thiểu 02 thành viên</strong> thuộc khối kinh tế số, marketing, truyền thông đa phương tiện hoặc thiết kế.
      </Alert>

      {/* Member 1 — Leader Card (Prefilled from Step 1) */}
      <Box
        sx={{
          mb: 4,
          p: 2.5,
          borderRadius: 4,
          bgcolor: 'rgba(241, 246, 254, 0.6)',
          border: '1px solid rgba(56, 130, 241, 0.25)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PersonRoundedIcon sx={{ color: piccColors.blue[600] }} />
            <Typography sx={{ fontWeight: 800, color: piccColors.ptitNavy, fontSize: '0.975rem' }}>
              Thành viên 1 — Đội trưởng
            </Typography>
          </Box>
          <Chip
            icon={<StarRoundedIcon sx={{ fontSize: '13px !important', color: '#FFFFFF !important' }} />}
            label="ĐỘI TRƯỞNG"
            size="small"
            sx={{ bgcolor: piccColors.blue[600], color: '#FFFFFF', fontWeight: 800, fontSize: '0.65rem' }}
          />
        </Box>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Họ và tên *"
              placeholder="Nguyễn Văn A"
              {...register('members.0.fullName')}
              error={!!errors.members?.[0]?.fullName}
              helperText={errors.members?.[0]?.fullName?.message}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Mã sinh viên *"
              placeholder="B20DCCN001"
              {...register('members.0.studentId')}
              error={!!errors.members?.[0]?.studentId}
              helperText={errors.members?.[0]?.studentId?.message}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Ngành học *"
              placeholder="Công nghệ thông tin / Marketing"
              {...register('members.0.major')}
              error={!!errors.members?.[0]?.major}
              helperText={errors.members?.[0]?.major?.message}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Email *"
              type="email"
              placeholder="doitruong@ptit.edu.vn"
              {...register('members.0.email')}
              error={!!errors.members?.[0]?.email}
              helperText={errors.members?.[0]?.email?.message || EMAIL_HINT}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Số điện thoại *"
              placeholder="0912345678"
              inputMode="tel"
              {...register('members.0.phone')}
              error={!!errors.members?.[0]?.phone}
              helperText={errors.members?.[0]?.phone?.message || PHONE_HINT}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Members 2 to N Cards */}
      {Array.from({ length: memberCount - 1 }, (_, i) => i + 1).map((index) => (
        <Box
          key={index}
          sx={{
            mb: 4,
            p: 2.5,
            borderRadius: 4,
            bgcolor: '#FFFFFF',
            border: '1px solid rgba(223, 230, 239, 0.9)',
            boxShadow: '0 2px 10px rgba(15, 42, 82, 0.04)',
          }}
        >
          <Typography sx={{ fontWeight: 800, mb: 2, color: piccColors.ptitNavy, fontSize: '0.975rem' }}>
            Thành viên {index + 1}
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Họ và tên *"
                placeholder={`Nguyễn Văn ${String.fromCharCode(65 + index)}`}
                {...register(`members.${index}.fullName` as const)}
                error={!!errors.members?.[index]?.fullName}
                helperText={errors.members?.[index]?.fullName?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Mã sinh viên *"
                placeholder={`B20DCCN00${index + 1}`}
                {...register(`members.${index}.studentId` as const)}
                error={!!errors.members?.[index]?.studentId}
                helperText={errors.members?.[index]?.studentId?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Ngành học *"
                placeholder="Marketing / Truyền thông đa phương tiện"
                {...register(`members.${index}.major` as const)}
                error={!!errors.members?.[index]?.major}
                helperText={errors.members?.[index]?.major?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Email *"
                type="email"
                placeholder={`thanhvien${index + 1}@example.com`}
                {...register(`members.${index}.email` as const)}
                error={!!errors.members?.[index]?.email}
                helperText={errors.members?.[index]?.email?.message || EMAIL_HINT}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Số điện thoại *"
                placeholder="0912345679"
                inputMode="tel"
                {...register(`members.${index}.phone` as const)}
                error={!!errors.members?.[index]?.phone}
                helperText={errors.members?.[index]?.phone?.message || PHONE_HINT}
              />
            </Grid>
          </Grid>
        </Box>
      ))}
    </Box>
  );
};
