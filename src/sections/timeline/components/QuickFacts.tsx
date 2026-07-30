import { Box, Typography, Link } from '@mui/material';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import PsychologyRoundedIcon from '@mui/icons-material/PsychologyRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import { motion, useReducedMotion } from 'motion/react';
import { competitionData } from '@/data/competition';
import { useRegistrationStatus } from '@/features/registration/hooks';
import type { RegistrationStatus } from '@/types/registration';
import { piccColors } from '@/theme/palette';

const { registrationOpenDate, registrationCloseDate } = competitionData.meta;

/* ─── Official Quick Facts Data List ─── */
const QUICK_FACTS = [
  {
    id: 'audience',
    label: 'Đối tượng',
    value: competitionData.meta.eligibility,
    icon: SchoolRoundedIcon,
    accentColor: piccColors.blue[600],
    bgColor: piccColors.blue[50],
  },
  {
    id: 'team-size',
    label: 'Quy mô đội thi',
    value: competitionData.teamRules.size,
    icon: GroupsRoundedIcon,
    accentColor: piccColors.indigo[600],
    bgColor: piccColors.indigo[50],
  },
  {
    id: 'format',
    label: 'Hình thức thử thách',
    value: competitionData.format,
    icon: PsychologyRoundedIcon,
    accentColor: piccColors.blue[700],
    bgColor: piccColors.sky[50],
  },
  {
    id: 'registration',
    label: 'Thời gian đăng ký',
    value: competitionData.registrationPeriod,
    icon: CalendarMonthRoundedIcon,
    accentColor: piccColors.emerald[600],
    bgColor: piccColors.emerald[50],
  },
];

/* ─── Dynamic Status Helpers ─── */
const getStatusInfo = (
  status: RegistrationStatus
): { text: string; dotColor: string; href?: string } => {
  switch (status) {
    case 'open':
      return {
        text: `Đang mở đăng ký · Hạn cuối ${registrationCloseDate}`,
        dotColor: piccColors.emerald[500],
        href: '#dang-ky',
      };
    case 'not_open':
      return {
        text: `Sắp mở đăng ký · Bắt đầu từ ${registrationOpenDate}`,
        dotColor: piccColors.blue[600],
        href: '#lo-trinh',
      };
    case 'manually_disabled':
      return {
        text: 'Đăng ký đang tạm dừng · Theo dõi thông báo mới nhất',
        dotColor: piccColors.amber[500],
        href: '#lo-trinh',
      };
    case 'closed':
      return {
        text: 'Đã đóng đăng ký · Chuẩn bị bước vào Vòng Bán kết',
        dotColor: piccColors.slate[500],
        href: '#lo-trinh',
      };
    case 'not_configured':
    default:
      return {
        text: 'Sắp diễn ra · Theo dõi lộ trình mới nhất',
        dotColor: piccColors.blue[600],
        href: '#lo-trinh',
      };
  }
};

export const QuickFacts = () => {
  const { status } = useRegistrationStatus();
  const statusInfo = getStatusInfo(status);
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.45,
        ease: [0.22, 1, 0.36, 1] as number[],
        staggerChildren: prefersReducedMotion ? 0 : 0.07,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 12 },
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
        mt: { xs: 2, sm: 3, md: 4 },
        mb: { xs: 5, sm: 6, md: 7 },
        position: 'relative',
        zIndex: 2,
      }}
    >
      <Box
        component={motion.div}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        sx={{ maxWidth: 1140, mx: 'auto' }}
      >
        {/* Eyebrow Label */}
        <Typography
          variant="h3"
          component="h3"
          sx={{
            textAlign: 'center',
            fontSize: '0.75rem',
            fontWeight: 800,
            color: piccColors.blue[600],
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            mb: 2,
            fontFamily: '"Manrope", sans-serif',
          }}
        >
          Thông Tin Nhanh Cuộc Thi
        </Typography>

        {/* Unified Card Container */}
        <Box
          sx={{
            bgcolor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(16px)',
            border: `1px solid ${piccColors.slate[200]}`,
            borderRadius: { xs: '20px', md: '24px' },
            boxShadow: '0 10px 30px rgba(16, 42, 86, 0.06)',
            p: { xs: 2, sm: 2.5, md: 3 },
            overflow: 'hidden',
          }}
        >
          {/* Responsive Layout Grid */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                lg: 'repeat(4, 1fr)',
              },
              gap: 0,
            }}
          >
            {QUICK_FACTS.map((fact, index) => {
              const Icon = fact.icon;
              const isLastColumnDesktop = index === QUICK_FACTS.length - 1;
              const isEvenTablet = index % 2 === 1;
              const isFirstRowTablet = index < 2;
              const isLastMobile = index === QUICK_FACTS.length - 1;

              return (
                <Box
                  key={fact.id}
                  component={motion.div}
                  variants={itemVariants}
                  sx={{
                    position: 'relative',
                    p: { xs: 2, sm: 2.25, md: 2.5 },
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    borderRadius: '16px',
                    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      bgcolor: 'rgba(59, 122, 214, 0.04)',
                      transform: prefersReducedMotion ? 'none' : 'translateY(-2px)',
                      '& .quick-fact-icon-box': {
                        transform: prefersReducedMotion ? 'none' : 'scale(1.04)',
                        boxShadow: `0 6px 16px ${fact.accentColor}25`,
                      },
                      '& .quick-fact-value': {
                        color: piccColors.blue[600],
                      },
                    },
                    /* Border dividers depending on breakpoint */
                    // Desktop (lg+)
                    borderRight: {
                      lg: !isLastColumnDesktop ? `1px solid ${piccColors.slate[200]}` : 'none',
                    },
                    // Tablet (sm - md)
                    borderRightStyle: {
                      sm: !isEvenTablet ? 'solid' : 'none',
                    },
                    borderRightWidth: {
                      sm: !isEvenTablet ? '1px' : '0px',
                    },
                    borderRightColor: {
                      sm: piccColors.slate[200],
                    },
                    borderBottom: {
                      xs: !isLastMobile ? `1px solid ${piccColors.slate[200]}` : 'none',
                      sm: isFirstRowTablet ? `1px solid ${piccColors.slate[200]}` : 'none',
                      lg: 'none',
                    },
                  }}
                >
                  {/* Icon Container ~44x44px */}
                  <Box
                    className="quick-fact-icon-box"
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: '12px',
                      bgcolor: fact.bgColor,
                      color: fact.accentColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                      border: `1px solid ${fact.accentColor}20`,
                    }}
                  >
                    <Icon sx={{ fontSize: 22 }} aria-hidden="true" />
                  </Box>

                  {/* Content Label & Value */}
                  <Box sx={{ minWidth: 0, flexGrow: 1 }}>
                    <Typography
                      sx={{
                        fontSize: '0.725rem',
                        fontWeight: 700,
                        color: piccColors.slate[500],
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        lineHeight: 1.2,
                        mb: 0.5,
                        fontFamily: '"Manrope", sans-serif',
                      }}
                    >
                      {fact.label}
                    </Typography>

                    <Typography
                      className="quick-fact-value"
                      sx={{
                        fontSize: { xs: '0.925rem', md: '0.975rem' },
                        fontWeight: 750,
                        color: piccColors.ptitNavy,
                        lineHeight: 1.35,
                        transition: 'color 0.2s ease',
                        wordBreak: 'break-word',
                        fontFamily: '"Manrope", sans-serif',
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

        {/* Status Bar / Status Pill Underneath */}
        <Box
          component={motion.div}
          variants={itemVariants}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mt: 2.5,
            px: 2,
          }}
        >
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1.25,
              py: 0.85,
              px: 2.25,
              borderRadius: '9999px',
              bgcolor: 'rgba(255, 255, 255, 0.9)',
              border: `1px solid ${piccColors.slate[200]}`,
              boxShadow: '0 4px 14px rgba(16, 42, 86, 0.04)',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.2s ease',
              '&:hover': statusInfo.href
                ? {
                    borderColor: 'rgba(59, 122, 214, 0.3)',
                    boxShadow: '0 6px 18px rgba(59, 122, 214, 0.1)',
                  }
                : {},
            }}
          >
            {/* Pulsing Status Dot */}
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: statusInfo.dotColor,
                flexShrink: 0,
                boxShadow: `0 0 0 3px ${statusInfo.dotColor}30`,
                animation:
                  status === 'open' && !prefersReducedMotion
                    ? 'statusPulse 2s ease-in-out infinite'
                    : 'none',
                '@keyframes statusPulse': {
                  '0%, 100%': { opacity: 1, transform: 'scale(1)' },
                  '50%': { opacity: 0.5, transform: 'scale(0.85)' },
                },
              }}
            />

            <NotificationsActiveRoundedIcon
              sx={{ fontSize: 16, color: statusInfo.dotColor }}
              aria-hidden="true"
            />

            {statusInfo.href ? (
              <Link
                href={statusInfo.href}
                underline="hover"
                sx={{
                  fontSize: { xs: '0.8rem', sm: '0.85rem' },
                  fontWeight: 650,
                  color: piccColors.slate[700],
                  fontFamily: '"Manrope", sans-serif',
                  transition: 'color 0.2s ease',
                  '&:hover': { color: piccColors.blue[600] },
                  '&:focus-visible': {
                    outline: `2px solid ${piccColors.blue[600]}`,
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
                  fontSize: { xs: '0.8rem', sm: '0.85rem' },
                  fontWeight: 650,
                  color: piccColors.slate[700],
                  fontFamily: '"Manrope", sans-serif',
                }}
              >
                {statusInfo.text}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default QuickFacts;

