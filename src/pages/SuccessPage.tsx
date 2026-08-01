import { Container, Typography, Button, Box, Paper } from '@mui/material';
import { motion } from 'motion/react';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import MapRoundedIcon from '@mui/icons-material/MapRounded';
import FacebookRoundedIcon from '@mui/icons-material/Facebook';
import { piccColors } from '@/theme/palette';
import { SkyBackground } from '@/components/ui/SkyBackground';
import { getSkyBackground } from '@/components/ui/skyBackgroundConfig';
import { competitionData } from '@/data/competition';
import { appHash } from '@/config/paths';

export const SuccessPage = () => (
  <Box
    sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: getSkyBackground('hero'),
      position: 'relative',
      py: 8,
      overflow: 'hidden',
    }}
  >
    <SkyBackground variant="hero" />

    <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 4, sm: 6 },
          textAlign: 'center',
          borderRadius: '32px',
          bgcolor: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(226, 232, 240, 0.9)',
          boxShadow: '0 24px 70px rgba(23, 59, 102, 0.12)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Top accent ribbon */}
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 5,
            background: `linear-gradient(90deg, ${piccColors.ptitRed} 0%, ${piccColors.emerald[500]} 50%, ${piccColors.pink[500]} 100%)`,
          }}
        />

        {/* Animated success badge */}
        <Box
          component={motion.div}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 14 }}
          sx={{
            width: 88,
            height: 88,
            mx: 'auto',
            mb: 3,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${piccColors.emerald[500]} 0%, ${piccColors.emerald[600]} 100%)`,
            boxShadow: '0 12px 32px rgba(5, 150, 105, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CheckRoundedIcon sx={{ fontSize: 44, color: '#FFFFFF' }} />
        </Box>

        <Typography
          variant="h2"
          component="h1"
          sx={{
            mb: 2,
            fontWeight: 850,
            fontSize: { xs: '2rem', sm: '2.5rem' },
            color: piccColors.ink,
            letterSpacing: '-0.02em',
          }}
        >
          Đăng ký thành công!
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: piccColors.slate[600],
            mb: 2,
            lineHeight: 1.7,
            maxWidth: 640,
            mx: 'auto',
            fontSize: '1rem',
          }}
        >
          Ban Tổ chức đã ghi nhận thông tin đăng ký của đội. Kết quả xác nhận đăng ký, thông báo về đề bài, lịch trình các vòng thi và các hoạt động đồng hành sẽ được gửi tới email của đội trưởng và đăng tải trên các kênh truyền thông chính thức của cuộc thi.
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: piccColors.blue[700],
            fontWeight: 700,
            mb: 4,
            fontSize: '0.925rem',
          }}
        >
          Chúc đội thi có một hành trình bứt phá và đạt nhiều thành công tại PTIT Innovation Catalyst Challenge 2026!
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            href={appHash('hero')}
            startIcon={<HomeRoundedIcon />}
            sx={{
              borderRadius: 999,
              px: 3,
              py: 1.2,
              fontWeight: 700,
              bgcolor: piccColors.ptitRed,
              '&:hover': { bgcolor: piccColors.ptitDarkRed },
            }}
          >
            Về trang chủ
          </Button>

          <Button
            variant="outlined"
            href={appHash('lo-trinh')}
            startIcon={<MapRoundedIcon />}
            sx={{
              borderRadius: 999,
              px: 3,
              py: 1.2,
              fontWeight: 700,
            }}
          >
            Xem lộ trình
          </Button>

          <Button
            variant="outlined"
            href={competitionData.contact.facebook}
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<FacebookRoundedIcon />}
            sx={{
              borderRadius: 999,
              px: 3,
              py: 1.2,
              fontWeight: 700,
              color: '#1877F2',
              borderColor: 'rgba(24, 119, 242, 0.4)',
              '&:hover': {
                borderColor: '#1877F2',
                bgcolor: 'rgba(24, 119, 242, 0.05)',
              },
            }}
          >
            Fanpage Ban Tổ chức
          </Button>
        </Box>
      </Paper>
    </Container>
  </Box>
);

export default SuccessPage;
