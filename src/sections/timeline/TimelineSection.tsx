import { Container, Typography, Box, Chip, Paper } from '@mui/material';
import { motion } from 'motion/react';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import { fadeInUp } from '@/motion/variants';
import { piccColors } from '@/theme/palette';
import { assetManifest } from '@/config/asset-manifest';

export const TimelineSection = () => {
  const timelineAsset = assetManifest.timelineReference;

  return (
    <Box
      component="section"
      id="lo-trinh"
      sx={{
        py: { xs: 9, md: 14 },
        bgcolor: piccColors.sky[50],
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 7 } }}>
          <Chip
            icon={<CalendarMonthRoundedIcon sx={{ color: `${piccColors.blue[700]} !important` }} />}
            label="Lộ trình PICC 2026"
            sx={{
              bgcolor: piccColors.sky[100],
              color: piccColors.blue[700],
              fontWeight: 750,
              mb: 2,
            }}
          />
          <Typography variant="h2" component="h2" sx={{ mb: 2, color: piccColors.ink, fontWeight: 800 }}>
            Hành Trình Cuộc Thi
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 640, mx: 'auto' }}>
            Tổng quan sơ đồ lộ trình các mốc thời gian quan trọng từ khi mở cổng đăng ký đến Đêm Chung kết
          </Typography>
        </Box>

        {/* Official Pre-designed Timeline Graphic Banner */}
        {timelineAsset && (
          <Paper
            component={motion.div}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            elevation={0}
            sx={{
              borderRadius: 6,
              overflow: 'hidden',
              border: `1.5px solid ${piccColors.sky[200]}`,
              boxShadow: '0 24px 56px rgba(23,59,102,0.12)',
              bgcolor: '#FFFFFF',
              p: { xs: 2, sm: 3, md: 4 },
              textAlign: 'center',
            }}
          >
            <Box
              component="img"
              src={timelineAsset.src}
              alt="Sơ đồ Lộ trình PICC 2026 chính thức"
              sx={{
                width: '100%',
                maxHeight: { xs: 400, sm: 540, md: 680 },
                objectFit: 'contain',
                borderRadius: 4,
                display: 'block',
                mx: 'auto',
                transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
                '&:hover': {
                  transform: 'scale(1.01)',
                },
              }}
            />
          </Paper>
        )}
      </Container>
    </Box>
  );
};
