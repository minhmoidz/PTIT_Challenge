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
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as number[], delay },
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
            border: '1px solid rgba(225, 20, 20, 0.22)',
            bgcolor: 'rgba(225, 20, 20, 0.06)',
            borderRadius: '999px',
            px: 1.5,
            py: 0.55,
            mb: 2.5,
          }}
        >
          {/* Lightning icon */}
          <Box
            component="svg"
            aria-hidden="true"
            viewBox="0 0 16 16"
            fill="none"
            sx={{ width: 14, height: 14, flexShrink: 0 }}
          >
            <path
              d="M9.5 1L3 9.5h5L6.5 15l7.5-8.5H9L9.5 1z"
              fill={piccColors.ptitRed}
            />
          </Box>
          <Typography
            component="span"
            sx={{
              fontSize: '0.75rem',
              fontWeight: 700,
              color: piccColors.ptitNavy,
              letterSpacing: '0.02em',
            }}
          >
            {competitionData.meta.shortName} · Case Study Challenge
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
              fontSize: '0.72rem',
              fontWeight: 600,
              color:
                status === 'open'
                  ? piccColors.emerald[600]
                  : status === 'manually_disabled'
                    ? piccColors.amber[600]
                    : status === 'closed'
                      ? piccColors.slate[500]
                      : piccColors.ptitRed,
            }}
          >
            {badgeLabel}
          </Typography>
        </Box>
      </motion.div>

      {/* ── Heading ── */}
      <motion.div {...fadeUp(0.13)}>
        <Typography
          variant="h1"
          component="h1"
          sx={{
            mb: 1.5,
            fontSize: {
              xs: '2.4rem',
              sm: '3.1rem',
              md: '3.55rem',
              lg: '4rem',
            },
            lineHeight: 1.03,
            letterSpacing: '-0.032em',
            fontWeight: 800,
          }}
        >
          <Box component="span" sx={{ display: 'block', color: piccColors.ptitNavy }}>
            PTIT Innovation
          </Box>
          <Box
            component="span"
            sx={{
              display: 'block',
              whiteSpace: 'nowrap',
              background: 'linear-gradient(135deg, #E11414 0%, #B91212 45%, #0F2A52 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontSize: { xs: '0.82em', sm: '1em' },
            }}
          >
            Catalyst Challenge
          </Box>
          <Box
            component="span"
            sx={{
              display: 'block',
              color: piccColors.ptitNavy,
              fontSize: '1.08em',
              letterSpacing: '-0.04em',
              fontWeight: 900,
            }}
          >
            2026
          </Box>
        </Typography>
      </motion.div>

      {/* ── Tagline ── */}
      <motion.div {...fadeUp(0.21)}>
        <Typography
          sx={{
            mb: 1.5,
            color: piccColors.pink[600],
            fontWeight: 750,
            fontSize: { xs: '1.1rem', md: '1.25rem' },
            letterSpacing: '-0.01em',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          {competitionData.meta.theme}
          <Box
            component="span"
            sx={{
              display: 'inline-block',
              width: 36,
              height: 2,
              background: `linear-gradient(90deg, ${piccColors.pink[400]}, transparent)`,
              borderRadius: 1,
              mb: 0.25,
            }}
          />
        </Typography>
      </motion.div>

      {/* ── Description ── */}
      <motion.div {...fadeUp(0.28)}>
        <Typography
          sx={{
            color: piccColors.slate[600],
            mb: 3.25,
            maxWidth: 510,
            fontSize: { xs: '0.95rem', md: '1.025rem' },
            lineHeight: 1.65,
            fontWeight: 450,
          }}
        >
          PICC 2026 — sân chơi Case Study cấp Học viện dành cho sinh viên PTIT, nơi tư duy liên ngành gặp gỡ những bài toán thực tế từ doanh nghiệp.
        </Typography>
      </motion.div>

      {/* ── CTAs & Helper Text Section ── */}
      <motion.div {...fadeUp(0.35)}>
        <Box sx={{ mb: 3.5 }}>
          {/* Action Buttons Row */}
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
            {/* Primary CTA */}
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
                height: 52,
                borderRadius: '999px',
                px: { xs: 3, sm: 3.75 },
                fontSize: '0.975rem',
                fontWeight: 750,
                color: '#FFFFFF',
                background: gradientMesh.ptitCta,
                boxShadow: '0 8px 24px rgba(225, 20, 20, 0.30)',
                textTransform: 'none',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #B91212 0%, #8E1010 100%)',
                  boxShadow: '0 10px 30px rgba(225, 20, 20, 0.40)',
                  transform: 'translateY(-2px)',
                  '& .MuiButton-endIcon': {
                    transform: 'translateX(3px)',
                  },
                },
                '&:active': {
                  transform: 'translateY(0) scale(0.99)',
                },
                // One-time shimmer sweep animation on mount
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '50%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.35), transparent)',
                  animation: 'shimmerSweep 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.5s 1 normal forwards',
                },
                '@keyframes shimmerSweep': {
                  '0%': { left: '-100%' },
                  '100%': { left: '200%' },
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
                height: 52,
                borderRadius: '999px',
                px: 3,
                fontSize: '0.95rem',
                fontWeight: 650,
                textTransform: 'none',
                color: piccColors.ptitNavy,
                borderColor: 'rgba(15, 42, 82, 0.24)',
                bgcolor: 'rgba(255,255,255,0.85)',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.25s ease',
                '&:hover': {
                  borderColor: piccColors.ptitRed,
                  bgcolor: piccColors.red[50],
                  boxShadow: '0 4px 16px rgba(15, 42, 82, 0.10)',
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
            border: '1px solid rgba(226, 232, 240, 0.9)',
            borderRadius: '18px',
            boxShadow: '0 2px 12px rgba(15,42,82,0.06)',
            backdropFilter: 'blur(12px)',
            overflow: 'hidden',
            maxWidth: 540,
          }}
        >
          {[
            {
              Icon: SchoolRoundedIcon,
              color: piccColors.ptitRed,
              bg: piccColors.red[50],
              value: competitionData.eligibility.target,
            },
            {
              Icon: GroupsRoundedIcon,
              color: piccColors.blue[600],
              bg: piccColors.blue[50],
              value: `Đội ${competitionData.teamRules.size}`,
            },
            {
              Icon: FlagRoundedIcon,
              color: piccColors.amber[600],
              bg: piccColors.amber[50],
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
                  i < arr.length - 1 ? '1px solid rgba(226,232,240,0.7)' : 'none',
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
