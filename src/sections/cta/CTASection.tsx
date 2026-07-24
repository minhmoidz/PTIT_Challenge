import { Container, Typography, Button, Box, Paper } from '@mui/material';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import { motion } from 'motion/react';
import { useRegistrationStatus } from '@/features/registration/hooks';
import { hero } from '@/content/vi/hero';
import { piccColors } from '@/theme/palette';
import { fadeInUp } from '@/motion/variants';

export const CTASection = () => {
  const { status } = useRegistrationStatus();

  const getCta = () => {
    switch (status) {
      case 'open':
        return { label: hero.cta.open, href: '#dang-ky' };
      case 'not_open':
        return { label: hero.cta.notOpen, href: '#dang-ky' };
      case 'closed':
        return { label: hero.cta.closed, href: '#footer' };
      default:
        return { label: hero.cta.disabled, href: '#footer' };
    }
  };

  const cta = getCta();

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 9, md: 14 },
        bgcolor: piccColors.surface,
        position: 'relative',
      }}
    >
      <Container maxWidth="lg">
        <Paper
          component={motion.div}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          elevation={0}
          sx={{
            p: { xs: 4, sm: 6, md: 8 },
            borderRadius: 8,
            background: `linear-gradient(135deg, ${piccColors.blue[900]} 0%, ${piccColors.blue[700]} 50%, ${piccColors.pink[700]} 100%)`,
            color: '#FFFFFF',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 24px 60px rgba(23, 59, 102, 0.25)',
          }}
        >
          {/* Background Sparkles */}
          <Box
            sx={{
              position: 'absolute',
              top: '15%',
              left: '10%',
              opacity: 0.25,
              display: { xs: 'none', sm: 'block' },
            }}
          >
            <AutoAwesomeRoundedIcon sx={{ fontSize: 40, color: piccColors.yellow[300] }} />
          </Box>
          <Box
            sx={{
              position: 'absolute',
              bottom: '20%',
              right: '12%',
              opacity: 0.25,
              display: { xs: 'none', sm: 'block' },
            }}
          >
            <AutoAwesomeRoundedIcon sx={{ fontSize: 32, color: piccColors.pink[300] }} />
          </Box>

          <Box
            sx={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              bgcolor: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(8px)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 3,
            }}
          >
            <RocketLaunchRoundedIcon sx={{ fontSize: 40, color: piccColors.yellow[300] }} />
          </Box>

          <Typography
            variant="h2"
            component="h2"
            sx={{
              mb: 2,
              fontWeight: 800,
              color: '#FFFFFF',
              fontSize: { xs: '2rem', md: '2.75rem' },
            }}
          >
            {status === 'open' ? 'Bắt Đầu Hành Trình PICC 2026' : 'Khám Phá Giới Hạn Cùng PICC'}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: piccColors.sky[100],
              mb: 4,
              maxWidth: 600,
              mx: 'auto',
              fontSize: { xs: '1rem', md: '1.1rem' },
              lineHeight: 1.7,
            }}
          >
            {status === 'open'
              ? 'Lập đội thi ngay hôm nay để khẳng định bản thân, tranh tài giải thưởng và nhận cơ hội thực tập, ươm tạo dự án.'
              : 'Theo dõi các thông tin chính thức từ Ban Tổ chức và chuẩn bị cho vòng nộp hồ sơ sắp tới.'}
          </Typography>

          <Button
            variant="contained"
            size="large"
            href={cta.href}
            startIcon={<RocketLaunchRoundedIcon />}
            sx={{
              bgcolor: piccColors.yellow[300],
              color: piccColors.yellow[700],
              fontSize: '1.05rem',
              px: 4,
              py: 1.75,
              '&:hover': {
                bgcolor: '#FFFFFF',
                color: piccColors.blue[900],
              },
            }}
          >
            {cta.label}
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};
