import { Container, Typography, Button, Box } from '@mui/material';
import HomeRounded from '@mui/icons-material/HomeRounded';
import SearchOffRoundedIcon from '@mui/icons-material/SearchOffRounded';
import { piccColors, gradientMesh } from '@/theme/palette';
import { SkyBackground } from '@/components/ui/SkyBackground';
import { getSkyBackground } from '@/components/ui/skyBackgroundConfig';
import { appHash } from '@/config/paths';

export const NotFoundPage = () => (
  <Box
    sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: getSkyBackground('hero'),
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <SkyBackground variant="hero" />

    <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1, textAlign: 'center', py: 8 }}>
      <Typography
        component="h1"
        aria-label="404"
        sx={{
          fontSize: { xs: '6rem', sm: '8rem' },
          fontWeight: 900,
          lineHeight: 1,
          letterSpacing: '-0.04em',
          background: gradientMesh.ptitCta,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mb: 1,
          fontFamily: '"Manrope", sans-serif',
        }}
      >
        404
      </Typography>

      <Box
        sx={{
          width: 56,
          height: 56,
          mx: 'auto',
          mb: 2.5,
          borderRadius: '16px',
          bgcolor: 'rgba(56, 130, 241, 0.1)',
          color: piccColors.blue[700],
          border: '1px solid rgba(56, 130, 241, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <SearchOffRoundedIcon sx={{ fontSize: 30 }} />
      </Box>

      <Typography
        variant="h3"
        component="p"
        sx={{
          mb: 1.5,
          fontWeight: 800,
          color: piccColors.ptitNavy,
          fontSize: { xs: '1.4rem', sm: '1.75rem' },
        }}
      >
        Trang không tìm thấy
      </Typography>

      <Typography
        variant="body1"
        sx={{ color: 'text.secondary', mb: 4, maxWidth: 420, mx: 'auto', lineHeight: 1.65 }}
      >
        Trang bạn đang tìm không tồn tại hoặc đã được di chuyển. Quay về trang chủ để tiếp tục khám phá PICC 2026.
      </Typography>

      <Button
        variant="contained"
        href={appHash('hero')}
        startIcon={<HomeRounded />}
        sx={{
          borderRadius: 999,
          px: 4,
          py: 1.2,
          fontWeight: 700,
        }}
      >
        Trở về trang chủ
      </Button>
    </Container>
  </Box>
);

export default NotFoundPage;
