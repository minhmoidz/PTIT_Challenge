import { Box, Typography, Link } from '@mui/material';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import PsychologyRoundedIcon from '@mui/icons-material/PsychologyRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import { motion, useReducedMotion } from 'motion/react';
import { competitionData } from '@/data/competition';
import { useRegistrationStatus } from '@/features/registration/hooks';
import type { RegistrationStatus } from '@/types/registration';

/* ─── Official Quick Facts Data List ─── */
const QUICK_FACTS = [
  {
    id: 'audience',
    label: 'Đối tượng',
    value: competitionData.meta.eligibility,
    icon: SchoolRoundedIcon,
    accentColor: '#397CE8',
    bgColor: '#EAF2FF',
  },
  {
    id: 'team-size',
    label: 'Quy mô đội thi',
    value: competitionData.teamRules.size,
    icon: GroupsRoundedIcon,
    accentColor: '#7457E8',
    bgColor: '#F0EDFF',
  },
  {
    id: 'format',
    label: 'Hình thức thử thách',
    value: competitionData.format,
    icon: PsychologyRoundedIcon,
    accentColor: '#4F46E5',
    bgColor: '#EEF2FF',
  },
  {
    id: 'registration',
    label: 'Thời gian đăng ký',
    value: competitionData.registrationPeriod,
    icon: CalendarMonthRoundedIcon,
    accentColor: '#059669',
    bgColor: '#ECFDF5',
  },
];

/* ─── Dynamic Status Helpers ─── */
const getStatusInfo = (status: RegistrationStatus): { text: string; dotColor: string; href?: string } => {
  switch (status) {
    case 'open':
      return {
        text: 'Đang mở đăng ký · Hạn cuối 15/08/2026',
        dotColor: '#10B981',
        href: '#dang-ky',
      };
    case 'not_open':
      return {
        text: 'Sắp mở đăng ký · Bắt đầu từ 01/08/2026',
        dotColor: '#3B82F6',
        href: '#lo-trinh',
      };
    case 'manually_disabled':
      return {
        text: 'Đăng ký đang tạm dừng · Theo dõi thông báo mới nhất',
        dotColor: '#F59E0B',
        href: '#lo-trinh',
      };
    case 'closed':
      return {
        text: 'Đã đóng đăng ký · Chuẩn bị bước vào Vòng Bán kết',
        dotColor: '#64748B',
        href: '#lo-trinh',
      };
    case 'not_configured':
    default:
      return {
        text: 'Sắp diễn ra · Theo dõi lộ trình mới nhất',
        dotColor: '#3B82F6',
        href: '#lo-trinh',
      };
  }
};

export const QuickFacts = () => {
  const { status } = useRegistrationStatus();
  const statusInfo = getStatusInfo(status);
  const prefersReducedMotion = useReducedMotion();

  /* Animation variants with reduced motion support */
  const containerVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.45,
        ease: [0.22, 1, 0.36, 1] as number[],
        staggerChildren: prefersReducedMotion ? 0 : 0.06,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0 : 0.35 },
    },
  };

  return (
    <Box
      component="section"
      id="thong-tin-nhanh"
      aria-label="Thông tin nhanh cuộc thi"
      sx={{
        mb: { xs: 6, md: 9 },
        position: 'relative',
        zIndex: 1,
      }}
    >
      <Box
        component={motion.div}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        sx={{ maxWidth: 1080, mx: 'auto', px: { xs: 2, sm: 3 } }}
      >
        {/* Header Eyebrow Label */}
        <Typography
          variant="h3"
          component="h3"
          sx={{
            textAlign: 'center',
            fontSize: '0.725rem',
            fontWeight: 750,
            color: '#65758B',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            mb: 2.25,
          }}
        >
          Thông Tin Nhanh Cuộc Thi
        </Typography>

        {/* ── Single Unified Container ── */}
        <Box
          sx={{
            bgcolor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(226, 232, 240, 0.9)',
            borderRadius: '24px',
            boxShadow: '0 8px 30px rgba(22, 58, 103, 0.05)',
            p: { xs: 2.25, sm: 2.75, md: 3 },
            overflow: 'hidden',
          }}
        >
          {/* Responsive Layout: 4 Columns Desktop (md), 2x2 Grid Tablet/Mobile */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(4, 1fr)',
              },
              gap: { xs: 2, sm: 0 },
            }}
          >
            {QUICK_FACTS.map((fact, index) => {
              const Icon = fact.icon;
              const isLastColumnDesktop = index === QUICK_FACTS.length - 1;
              const isEvenTablet = index % 2 === 1;
              const isFirstRowTablet = index < 2;

              return (
                <Box
                  key={fact.id}
                  component={motion.div}
                  variants={itemVariants}
                  sx={{
                    position: 'relative',
                    p: { xs: 1.5, sm: 2, md: 2.25 },
                    px: { xs: 2, sm: 2.5 },
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    transition: 'background-color 0.25s ease',
                    // Hover scoped strictly inside each item
                    '&:hover': {
                      bgcolor: 'rgba(57, 124, 232, 0.04)',
                      '& .quick-fact-icon-box': {
                        transform: prefersReducedMotion ? 'none' : 'translateY(-2px) scale(1.03)',
                      },
                      '& .quick-fact-value': {
                        color: '#1D4ED8',
                      },
                    },
                    // Desktop (md+): Vertical Dividers between columns
                    borderRight: {
                      md: !isLastColumnDesktop ? '1px solid rgba(226, 232, 240, 0.85)' : 'none',
                    },
                    // Tablet (sm): 2x2 grid borders
                    borderRightStyle: {
                      sm: !isEvenTablet ? 'solid' : 'none',
                    },
                    borderRightWidth: {
                      sm: !isEvenTablet ? '1px' : '0px',
                    },
                    borderRightColor: {
                      sm: 'rgba(226, 232, 240, 0.85)',
                    },
                    borderBottom: {
                      sm: isFirstRowTablet ? '1px solid rgba(226, 232, 240, 0.85)' : 'none',
                      md: 'none',
                    },
                  }}
                >
                  {/* Icon Block — Rounded Square (NOT circle) */}
                  <Box
                    className="quick-fact-icon-box"
                    sx={{
                      width: 42,
                      height: 42,
                      borderRadius: '12px',
                      bgcolor: fact.bgColor,
                      color: fact.accentColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'transform 0.25s ease',
                      border: `1px solid ${fact.accentColor}20`,
                    }}
                  >
                    <Icon sx={{ fontSize: 22 }} aria-hidden="true" />
                  </Box>

                  {/* Text Content Block */}
                  <Box sx={{ minWidth: 0, flexGrow: 1 }}>
                    <Typography
                      sx={{
                        fontSize: '0.6875rem',
                        fontWeight: 750,
                        color: '#65758B',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        lineHeight: 1.2,
                        mb: 0.35,
                      }}
                    >
                      {fact.label}
                    </Typography>

                    <Typography
                      className="quick-fact-value"
                      sx={{
                        fontSize: { xs: '0.9rem', md: '0.975rem' },
                        fontWeight: 750,
                        color: '#163A67',
                        lineHeight: 1.35,
                        transition: 'color 0.2s ease',
                        wordBreak: 'break-word',
                      }}
                    >
                      {fact.value}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>

        {/* ── Dynamic Status Line ── */}
        <Box
          component={motion.div}
          variants={itemVariants}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1.25,
            mt: 2.25,
            px: 2,
          }}
        >
          {/* Status Dot with gentle pulse if open */}
          <Box
            sx={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              bgcolor: statusInfo.dotColor,
              flexShrink: 0,
              animation:
                status === 'open' && !prefersReducedMotion
                  ? 'statusPulse 2s ease-in-out infinite'
                  : 'none',
              '@keyframes statusPulse': {
                '0%, 100%': { opacity: 1, transform: 'scale(1)' },
                '50%': { opacity: 0.4, transform: 'scale(0.85)' },
              },
            }}
          />

          {statusInfo.href ? (
            <Link
              href={statusInfo.href}
              underline="hover"
              sx={{
                fontSize: { xs: '0.775rem', sm: '0.825rem' },
                fontWeight: 650,
                color: '#475569',
                transition: 'color 0.2s ease',
                '&:hover': { color: '#1D4ED8' },
                '&:focus-visible': {
                  outline: '2px solid #3B82F6',
                  outlineOffset: '2px',
                  borderRadius: '4px',
                },
              }}
            >
              {statusInfo.text}
            </Link>
          ) : (
            <Typography
              sx={{
                fontSize: { xs: '0.775rem', sm: '0.825rem' },
                fontWeight: 650,
                color: '#475569',
              }}
            >
              {statusInfo.text}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default QuickFacts;
