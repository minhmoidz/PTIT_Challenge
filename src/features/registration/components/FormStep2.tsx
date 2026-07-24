import { Grid, TextField, Typography, Box } from '@mui/material';
import { useFormContext, useWatch } from 'react-hook-form';
import type { RegistrationFormValues } from '@/types/registration';

export const FormStep2 = () => {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<RegistrationFormValues>();

  const teamSize = useWatch({ control, name: 'teamSize' });
  const memberCount = Math.min(teamSize, 5);

  return (
    <Box>
      <Typography variant="h3" component="h3" sx={{ fontSize: '1.15rem', mb: 3 }}>
        Thông tin thành viên
      </Typography>

      {Array.from({ length: memberCount - 1 }, (_, i) => i + 1).map((index) => (
        <Box key={index} sx={{ mb: 4 }}>
          <Typography variant="body1" sx={{ fontWeight: 600, mb: 2, color: 'primary.main' }}>
            Thành viên {index}
          </Typography>
          <Grid container spacing={2.5}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Họ và tên"
                placeholder="Nguyễn Văn B"
                {...register(`members.${index}.fullName` as const)}
                error={!!errors.members?.[index]?.fullName}
                helperText={errors.members?.[index]?.fullName?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Mã sinh viên"
                placeholder="B20DCCN002"
                {...register(`members.${index}.studentId` as const)}
                error={!!errors.members?.[index]?.studentId}
                helperText={errors.members?.[index]?.studentId?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Ngành học"
                placeholder="Marketing"
                {...register(`members.${index}.major` as const)}
                error={!!errors.members?.[index]?.major}
                helperText={errors.members?.[index]?.major?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                placeholder="member@example.com"
                {...register(`members.${index}.email` as const)}
                error={!!errors.members?.[index]?.email}
                helperText={errors.members?.[index]?.email?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Số điện thoại"
                placeholder="0912345679"
                inputMode="tel"
                {...register(`members.${index}.phone` as const)}
                error={!!errors.members?.[index]?.phone}
                helperText={errors.members?.[index]?.phone?.message}
              />
            </Grid>
          </Grid>
        </Box>
      ))}
    </Box>
  );
};
