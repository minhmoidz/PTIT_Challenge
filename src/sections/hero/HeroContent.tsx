import { Box, Typography, Button, Link } from '@mui/material';
import { motion } from 'motion/react';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import FlagRoundedIcon from '@mui/icons-material/FlagRounded';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import type { RegistrationStatus, PublicPiccConfig } from '@/types/registration';
import { piccColors, gradientMesh } from '@/theme/palette';
import { competitionData } from '@/data/competition';
import { getCtaConfig } from '@/config/registrationCtaConfig';
import { appHash, appPath } from '@/config/paths';

const getStatusBadge = (status: RegistrationStatus): string => {
  switch (status) {
    case 'open':
      return 'Đang mở đăng ký';
    case 'not_open':
      return 'Sắp mở đăng ký';
    case 'manually_disabled':
      return 'Đăng ký tạm dừng';
    case 'closed':
      return 'Đã đóng đăng ký';
    default:
      return 'Sắp diễn ra';
  }
};

/* ─── Animation helpers ─── */
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as number[], delay },
});

interface Props {
  status: RegistrationStatus;
  config: PublicPiccConfig;
}

export const HeroContent = ({ status }: Props) => {
  const ctaConfig = getCtaConfig(status);
  const badgeLabel = getStatusBadge(status);

  return (
    <Box sx={{ maxWidth: { xs: '100%', md: 620 } }}>
      {/* ── Badge ── */}
      <motion.div {...fadeUp(0.05)}>
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.75,
            flexWrap: 'wrap',
            border: `1px solid ${piccColors.ptitRed}`,
            bgcolor: 'rgba(255, 31, 31, 0.06)',
            borderRadius: '999px',
            px: 1.75,
            py: 0.6,
            mb: 2,
          }}
        >
          <Typography
            component="span"
            sx={{
              fontSize: '0.78rem',
              fontWeight: 800,
              color: piccColors.ptitRed,
              letterSpacing: '0.02em',
              fontFamily: '"Manrope", sans-serif',
            }}
          >
            PTIT IEC · CASE STUDY CHALLENGE
          </Typography>
          <Box
            sx={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              bgcolor: ctaConfig.dotColor,
              flexShrink: 0,
            }}
          />
          <Typography
            component="span"
            sx={{
              fontSize: '0.75rem',
              fontWeight: 700,
              color:
                status === 'open'
                  ? piccColors.emerald[600]
                  : status === 'manually_disabled'
                    ? piccColors.amber[600]
                    : piccColors.ptitRed,
              fontFamily: '"Manrope", sans-serif',
            }}
          >
            {badgeLabel}
          </Typography>
        </Box>
      </motion.div>

      {/* ── Main Clean Heading ── */}
      <motion.div {...fadeUp(0.13)}>
        <Typography
          variant="h1"
          component="h1"
          sx={{
            mb: 1.5,
            fontSize: {
              xs: '2rem',
              sm: '2.6rem',
              md: '3.15rem',
              lg: '3.5rem',
            },
            lineHeight: 1.05,
            letterSpacing: '-0.025em',
            fontWeight: 800,
            fontFamily: '"Manrope", sans-serif',
          }}
        >
          <Box component="span" sx={{ color: piccColors.ptitNavy, display: 'block' }}>
            PICC <Box component="span" sx={{ color: piccColors.ptitRed }}>2026</Box>
          </Box>
          <Box
            component="span"
            sx={{
              display: 'block',
              color: piccColors.ptitNavy,
              fontSize: { xs: '0.62em', sm: '0.62em' },
              letterSpacing: '-0.01em',
              fontWeight: 800,
              mt: 0.5,
              textTransform: 'uppercase',
            }}
          >
            PTIT Innovation Catalyst Challenge
          </Box>
        </Typography>
      </motion.div>

      {/* ── Tagline ── */}
      <motion.div {...fadeUp(0.21)}>
        <Typography
          sx={{
            mb: 2,
            color: piccColors.ptitRed,
            fontWeight: 700,
            fontSize: { xs: '1.1rem', md: '1.25rem' },
            letterSpacing: '0.02em',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            fontFamily: '"Manrope", sans-serif',
          }}
        >
          {competitionData.meta.theme}
          <Box
            component="span"
            sx={{
              display: 'inline-block',
              width: 36,
              height: 2,
              background: `linear-gradient(90deg, ${piccColors.ptitRed}, transparent)`,
              borderRadius: 1,
            }}
          />
        </Typography>
      </motion.div>

      {/* ── Description ── */}
      <motion.div {...fadeUp(0.28)}>
        <Typography
          sx={{
            color: piccColors.slate[600],
            mb: 3.5,
            maxWidth: 520,
            fontSize: { xs: '1.05rem', md: '1.125rem' },
            lineHeight: 1.65,
            fontWeight: 450,
            fontFamily: '"Manrope", sans-serif',
          }}
        >
          Sân chơi giải Case Study cấp Học viện do Trung tâm Đổi mới Sáng tạo và Khởi nghiệp PTIT (IEC) tổ chức dành cho sinh viên liên ngành cùng doanh nghiệp nghiên cứu, phát triển giải pháp thực tế.
        </Typography>
      </motion.div>

      {/* ── CTAs & Helper Text Section ── */}
      <motion.div {...fadeUp(0.35)}>
        <Box sx={{ mb: 3.5 }}>
          {/* Action Buttons Row */}
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
            {/* Primary Red CTA */}
            <Button
              component="a"
              href={ctaConfig.href.startsWith('/#') ? appHash(ctaConfig.href.slice(2)) : appPath(ctaConfig.href)}
              variant="contained"
              size="large"
              endIcon={
                ctaConfig.href.startsWith('/dang-ky') ? (
                  <ArrowForwardRoundedIcon sx={{ fontSize: '1.05rem !important', transition: 'transform 0.25s ease' }} />
                ) : (
                  <ArrowOutwardRoundedIcon sx={{ fontSize: '1.05rem !important', transition: 'transform 0.25s ease' }} />
                )
              }
              sx={{
                height: 50,
                borderRadius: '50px',
                px: { xs: 3, sm: 3.5 },
                fontSize: '0.975rem',
                fontWeight: 800,
                letterSpacing: '0.02em',
                fontFamily: '"Manrope", sans-serif',
                color: '#FFFFFF',
                background: gradientMesh.ptitCta,
                boxShadow: '0 6px 20px rgba(255, 31, 31, 0.35)',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #B81111 0%, #8F1010 100%)',
                  boxShadow: '0 8px 26px rgba(255, 31, 31, 0.5)',
                  transform: 'translateY(-2px)',
                  '& .MuiButton-endIcon': {
                    transform: 'translateX(3px)',
                  },
                },
                '&:active': {
                  transform: 'translateY(0) scale(0.99)',
                },
              }}
            >
              {ctaConfig.heroLabel}
            </Button>

            {/* Secondary CTA */}
            <Button
              component="a"
              href="#the-le"
              variant="outlined"
              size="large"
              startIcon={<MenuBookRoundedIcon sx={{ fontSize: '1rem !important' }} />}
              sx={{
                height: 50,
                borderRadius: '50px',
                px: 3,
                fontSize: '0.975rem',
                fontWeight: 700,
                textTransform: 'none',
                whiteSpace: 'nowrap',
                color: piccColors.ptitNavy,
                borderColor: 'rgba(15, 42, 82, 0.28)',
                bgcolor: '#FFFFFF',
                transition: 'all 0.25s ease',
                '&:hover': {
                  borderColor: piccColors.ptitRed,
                  color: piccColors.ptitRed,
                  bgcolor: '#FFFFFF',
                  boxShadow: '0 4px 16px rgba(255, 31, 31, 0.12)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              Xem thể lệ
            </Button>
          </Box>

          {/* ── Helper Text Sub-row ── */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1.5, pl: 0.5 }}>
            <Box
              sx={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                bgcolor: ctaConfig.dotColor,
                boxShadow: status === 'open' ? `0 0 8px ${ctaConfig.dotColor}` : 'none',
                flexShrink: 0,
              }}
            />
            <Typography
              variant="caption"
              sx={{
                fontSize: '0.825rem',
                color: piccColors.slate[500],
                fontWeight: 500,
                letterSpacing: '0.01em',
              }}
            >
              {ctaConfig.helperText}
            </Typography>
          </Box>
        </Box>
      </motion.div>

      {/* ── Quick Facts Bar (3 Official Facts) ── */}
      <motion.div {...fadeUp(0.43)}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'stretch',
            bgcolor: 'rgba(255,255,255,0.88)',
            border: '1px solid rgba(223, 230, 239, 0.9)',
            borderRadius: '18px',
            boxShadow: '0 2px 12px rgba(15, 42, 82,0.06)',
            backdropFilter: 'blur(12px)',
            overflow: 'hidden',
            maxWidth: 540,
          }}
        >
          {[
            {
              Icon: SchoolRoundedIcon,
              color: piccColors.blue[600],
              bg: piccColors.blue[50],
              value: 'Sinh viên PTIT',
            },
            {
              Icon: GroupsRoundedIcon,
              color: piccColors.pink[500],
              bg: piccColors.pink[50],
              value: 'Đội 03–04 thành viên',
            },
            {
              Icon: FlagRoundedIcon,
              color: piccColors.yellow[700],
              bg: piccColors.yellow[50],
              value: '04 giai đoạn chính',
            },
          ].map((item, i, arr) => (
            <Box
              key={i}
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 0.5,
                py: 1.5,
                px: 1,
                borderRight:
                  i < arr.length - 1 ? '1px solid rgba(223, 230, 239,0.7)' : 'none',
                textAlign: 'center',
              }}
            >
              <Box
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: '8px',
                  bgcolor: item.bg,
                  color: item.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <item.Icon sx={{ fontSize: 15 }} />
              </Box>
              <Typography
                sx={{
                  fontSize: { xs: '0.7rem', sm: '0.75rem' },
                  fontWeight: 650,
                  color: piccColors.slate[700],
                  lineHeight: 1.35,
                }}
              >
                {item.value}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Contact link */}
        <Box sx={{ mt: 1.5, pl: 0.5 }}>
          <Link
            href={competitionData.contact.facebook}
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
            sx={{
              fontSize: '0.78rem',
              color: piccColors.slate[500],
              fontWeight: 500,
              '&:hover': { color: piccColors.blue[600] },
            }}
          >
            Fanpage Ban Tổ chức: facebook.com/PTITIEC
          </Link>
        </Box>
      </motion.div>
    </Box>
  );
};

export default HeroContent;
