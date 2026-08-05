import { Container, Typography, Button, Box, Chip } from '@mui/material';
import { motion } from 'motion/react';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import { useRegistrationStatus } from '@/features/registration/hooks';
import { piccColors, gradientMesh } from '@/theme/palette';
import { fadeInUp, staggerContainer } from '@/motion/variants';
import { SkyBackground } from '@/components/ui/SkyBackground';
import { getSkyBackground } from '@/components/ui/skyBackgroundConfig';
import { getCtaConfig } from '@/config/registrationCtaConfig';
import { competitionData } from '@/data/competition';
import { appHash, appPath } from '@/config/paths';

export const CTASection = () => {
  const { status } = useRegistrationStatus();
  const ctaConfig = getCtaConfig(status);

  const getFinalCtaTitle = () => {
    switch (status) {
      case 'open':
        return 'Sẵn sàng vượt qua giới hạn?';
      case 'not_open':
        return 'PICC 2026 đang chờ những ý tưởng bứt phá';
      case 'manually_disabled':
        return 'Hành trình sẽ sớm tiếp tục';
      case 'closed':
        return 'Cùng theo dõi hành trình PICC 2026';
      default:
        return 'Khám phá cơ hội tại PICC 2026';
    }
  };

  const getFinalCtaDescription = () => {
    switch (status) {
      case 'open':
        return 'Đưa ý tưởng của bạn vào hành trình kiến tạo những giải pháp có giá trị thực tế cùng PICC 2026.';
      case 'not_open':
        return `Khám phá biểu mẫu đăng ký và chuẩn bị thông tin cho mốc mở cổng chính thức từ ${competitionData.meta.registrationOpenDate}.`;
      case 'manually_disabled':
        return 'Theo dõi thông báo mới nhất từ Ban Tổ chức và chuẩn bị cho các mốc sự kiện tiếp theo.';
      case 'closed':
        return 'Đồng hành cùng các đội thi xuất sắc qua những cột mốc thi đấu tiếp theo của cuộc thi.';
      default:
        return 'Khám phá thể lệ chi tiết và sẵn sàng bứt phá giới hạn cùng các đội thi PICC 2026.';
    }
  };

  return (
    <Box
      component="section"
      id="final-cta"
      sx={{
        py: { xs: 7, sm: 8, md: 10 },
        background: getSkyBackground('clear'),
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Sky World Background — clear variant */}
      <SkyBackground variant="clear" />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          component={motion.div}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          sx={{ maxWidth: 1100, mx: 'auto' }}
        >
          {/* Glassmorphic Final Cloud Gateway Card */}
          <Box
            sx={{
              p: { xs: 4, sm: 6, md: 7 },
              borderRadius: '28px',
              background:
                'linear-gradient(135deg, rgba(255, 255, 255, 0.96) 0%, rgba(252, 249, 241, 0.95) 54%, rgba(255, 255, 255, 0.96) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1.5px solid rgba(225, 20, 20, 0.14)',
              boxShadow: '0 16px 48px rgba(15, 42, 82, 0.06)',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Top Accent Gradient Ribbon */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 4,
                background:
                  'linear-gradient(90deg, #E11414 0%, #0F2A52 56%, #E7C34D 100%)',
              }}
            />

            {/* Status Eyebrow Badge */}
            <motion.div variants={fadeInUp}>
              <Box sx={{ mb: 2.25 }}>
                <Chip
                  icon={
                    <Box
                      component="span"
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: ctaConfig.dotColor,
                        ml: '6px !important',
                        boxShadow: `0 0 8px ${ctaConfig.dotColor}`,
                      }}
                    />
                  }
                  label={ctaConfig.helperText}
                  sx={{
                    bgcolor: 'rgba(255, 245, 245, 0.9)',
                    backdropFilter: 'blur(8px)',
                    color: piccColors.ptitNavy,
                    fontWeight: 800,
                    fontSize: '0.825rem',
                    px: 1.5,
                    py: 0.5,
                    border: '1px solid rgba(225, 20, 20, 0.14)',
                    boxShadow: '0 4px 12px rgba(15, 42, 82, 0.06)',
                  }}
                />
              </Box>
            </motion.div>

            {/* Main Dynamic Heading */}
            <motion.div variants={fadeInUp}>
              <Typography
                variant="h2"
                component="h2"
                sx={{
                  mb: 1.75,
                  fontWeight: 850,
                  color: piccColors.ink,
                  fontSize: { xs: '1.9rem', sm: '2.4rem', md: '2.8rem' },
                  letterSpacing: '-0.025em',
                  lineHeight: 1.15,
                  fontFamily: '"Manrope", sans-serif',
                }}
              >
                {getFinalCtaTitle()}
              </Typography>
            </motion.div>

            {/* Dynamic Description */}
            <motion.div variants={fadeInUp}>
              <Typography
                sx={{
                  color: piccColors.slate[600],
                  mb: 4.5,
                  maxWidth: 640,
                  mx: 'auto',
                  fontSize: { xs: '0.975rem', md: '1.075rem' },
                  lineHeight: 1.65,
                  fontWeight: 450,
                }}
              >
                {getFinalCtaDescription()}
              </Typography>
            </motion.div>

            {/* Action Buttons Row */}
            <motion.div variants={fadeInUp}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 2,
                  width: { xs: '100%', sm: 'auto' },
                }}
              >
                {/* Primary Action */}
                <Button
                  component="a"
                  href={ctaConfig.href.startsWith('/#') ? appHash(ctaConfig.href.slice(2)) : appPath(ctaConfig.href)}
                  variant="contained"
                  size="large"
                  endIcon={
                    ctaConfig.href.startsWith('/dang-ky') ? <ArrowForwardRoundedIcon /> : <ArrowOutwardRoundedIcon />
                  }
                  sx={{
                    borderRadius: '50px',
                    px: 4,
                    py: 1.4,
                    fontWeight: 800,
                    fontSize: '0.95rem',
                    letterSpacing: '0.02em',
                    fontFamily: '"Manrope", sans-serif',
                    background: gradientMesh.ptitCta,
                    color: '#FFFFFF',
                    boxShadow: '0 8px 24px rgba(225, 20, 20, 0.28)',
                    textTransform: 'uppercase',
                    width: { xs: '100%', sm: 'auto' },
                    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #B91212 0%, #7A0F0F 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 32px rgba(225, 20, 20, 0.34)',
                    },
                  }}
                >
                  {ctaConfig.heroLabel}
                </Button>

                {/* Secondary Action */}
                <Button
                  component="a"
                  href={appHash('the-le')}
                  variant="outlined"
                  size="large"
                  startIcon={<MenuBookRoundedIcon />}
                  sx={{
                    borderRadius: '14px',
                    px: 3.5,
                    py: 1.35,
                    fontWeight: 750,
                    fontSize: '0.95rem',
                    borderColor: 'rgba(15, 42, 82, 0.18)',
                    color: piccColors.ptitNavy,
                    bgcolor: 'rgba(255, 255, 255, 0.8)',
                    width: { xs: '100%', sm: 'auto' },
                    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      bgcolor: 'rgba(255, 241, 241, 0.92)',
                      borderColor: piccColors.ptitRed,
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Xem thể lệ
                </Button>
              </Box>
            </motion.div>

            {/* Footer Note */}
            <Box sx={{ mt: 3.5, opacity: 0.7 }}>
              <Typography
                sx={{
                  fontSize: '0.8rem',
                  color: piccColors.slate[500],
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.75,
                }}
              >
                <AutoAwesomeRoundedIcon sx={{ fontSize: 14, color: piccColors.yellow[600] }} />
                PICC 2026 — Innovation Catalyst Challenge • Rise Beyond Limits
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default CTASection;
