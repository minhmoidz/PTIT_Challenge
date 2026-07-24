import { Box, Typography, Container, Chip } from '@mui/material';
import AppRegistrationRoundedIcon from '@mui/icons-material/AppRegistrationRounded';
import { useRegistrationStatus } from '@/features/registration/hooks';
import { RegistrationForm } from '@/features/registration/components/RegistrationForm';
import { piccColors } from '@/theme/palette';

export const RegistrationSection = () => {
  const { status } = useRegistrationStatus();

  if (status !== 'open') return null;

  return (
    <Box
      component="section"
      id="dang-ky"
      sx={{
        py: { xs: 9, md: 14 },
        bgcolor: piccColors.sky[50],
        position: 'relative',
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 7 } }}>
          <Chip
            icon={<AppRegistrationRoundedIcon sx={{ color: `${piccColors.blue[700]} !important` }} />}
            label="Cổng Đăng Ký Trực Tuyến"
            sx={{
              bgcolor: piccColors.sky[100],
              color: piccColors.blue[700],
              fontWeight: 700,
              mb: 2,
            }}
          />
          <Typography variant="h2" component="h2" sx={{ mb: 2, color: piccColors.ink, fontWeight: 800 }}>
            Đăng Ký Tham Gia PICC 2026
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'center', color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
            Vui lòng hoàn thành 3 bước đăng ký bên dưới. Dữ liệu sẽ tự động được lưu tạm trong phiên làm việc.
          </Typography>
        </Box>

        <RegistrationForm />
      </Container>
    </Box>
  );
};
