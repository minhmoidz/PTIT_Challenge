import { Box, Typography, Container, Chip } from '@mui/material';
import AppRegistrationRoundedIcon from '@mui/icons-material/AppRegistrationRounded';
import { useRegistrationStatus } from '@/features/registration/hooks';
import { RegistrationForm } from '@/features/registration/components/RegistrationForm';
import { piccColors } from '@/theme/palette';
import { Cloud3DSection } from '@/components/ui/Cloud3DSection';

export const RegistrationSection = () => {
  const { status } = useRegistrationStatus();

  if (status !== 'open') return null;

  return (
    <Box
      component="section"
      id="dang-ky"
      sx={{
        py: { xs: 10, md: 15 },
        bgcolor: piccColors.sky[50],
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Floating 3D Cloud Background */}
      <Cloud3DSection density="dense" colorTheme="sky" opacityMultiplier={0.9} />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 8 } }}>
          <Chip
            icon={<AppRegistrationRoundedIcon sx={{ fontSize: 16, color: `${piccColors.blue[700]} !important` }} />}
            label="Cổng Đăng Ký Trực Tuyến"
            sx={{
              bgcolor: piccColors.blue[50],
              color: piccColors.blue[700],
              fontWeight: 700,
              mb: 2,
              px: 1.5,
              border: '1px solid rgba(36, 95, 168, 0.2)',
              boxShadow: '0 4px 12px rgba(36, 95, 168, 0.1)',
            }}
          />
          <Typography
            variant="h2"
            component="h2"
            sx={{
              mb: 2,
              color: piccColors.ink,
              fontWeight: 800,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '2.8rem' },
              letterSpacing: '-0.025em',
              lineHeight: 1.15,
              fontFamily: '"Manrope", sans-serif',
            }}
          >
            Đăng Ký Tham Gia PICC 2026
          </Typography>
          <Typography
            sx={{
              textAlign: 'center',
              color: piccColors.slate[600],
              maxWidth: 620,
              mx: 'auto',
              fontSize: { xs: '1rem', md: '1.075rem' },
              lineHeight: 1.7,
              fontFamily: '"Manrope", sans-serif',
            }}
          >
            Vui lòng hoàn thành 3 bước đăng ký bên dưới. Dữ liệu sẽ tự động được lưu tạm an toàn trong phiên làm việc.
          </Typography>
        </Box>

        <RegistrationForm />
      </Container>
    </Box>
  );
};

export default RegistrationSection;