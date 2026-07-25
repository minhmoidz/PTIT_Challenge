import { useState, useEffect } from 'react';
import { Box, Container, Typography, Chip, Alert, Button, Link, Paper } from '@mui/material';
import AppRegistrationRoundedIcon from '@mui/icons-material/AppRegistrationRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import { motion } from 'motion/react';
import { useRegistrationStatus } from '@/features/registration/hooks';
import { RegistrationForm } from '@/features/registration/components/RegistrationForm';
import { piccColors } from '@/theme/palette';
import { SkyBackground, getSkyBackground } from '@/components/ui/SkyBackground';

/* ─── Real-Time Countdown Computation ─── */
interface TimeDiff {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const getTimeDiff = (targetDate: Date | null): TimeDiff => {
  if (!targetDate) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const diffMs = targetDate.getTime() - Date.now();
  if (diffMs <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diffMs / 86_400_000),
    hours: Math.floor((diffMs / 3_600_000) % 24),
    minutes: Math.floor((diffMs / 60_000) % 60),
    seconds: Math.floor((diffMs / 1000) % 60),
  };
};

const CountdownCell = ({ value, label }: { value: number; label: string }) => (
  <Box
    sx={{
      textAlign: 'center',
      minWidth: { xs: 58, sm: 72 },
      py: 1.25,
      px: 1,
      bgcolor: '#FFFFFF',
      borderRadius: '16px',
      border: '1px solid rgba(57, 124, 232, 0.25)',
      boxShadow: '0 4px 14px rgba(22, 58, 103, 0.05)',
    }}
  >
    <Typography
      sx={{
        fontVariantNumeric: 'tabular-nums',
        fontSize: { xs: '1.6rem', sm: '2.1rem' },
        fontWeight: 850,
        color: '#163A67',
        lineHeight: 1,
        letterSpacing: '-0.02em',
      }}
    >
      <motion.span
        key={value}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18 }}
      >
        {String(value).padStart(2, '0')}
      </motion.span>
    </Typography>
    <Typography
      sx={{
        fontSize: '0.65rem',
        fontWeight: 750,
        color: piccColors.slate[500],
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        mt: 0.4,
      }}
    >
      {label}
    </Typography>
  </Box>
);

/* ─── Registration Countdown Dashboard ─── */
const RegistrationCountdownDashboard = () => {
  const { config, status } = useRegistrationStatus();
  const openDate = config.registration.openAt ? new Date(config.registration.openAt) : null;
  const closeDate = config.registration.closeAt ? new Date(config.registration.closeAt) : null;

  const isBeforeOpen = status === 'not_open';
  const isOpen = status === 'open';
  const targetDate = isBeforeOpen ? openDate : isOpen ? closeDate : null;

  const [timeDiff, setTimeDiff] = useState<TimeDiff>(() => getTimeDiff(targetDate));

  useEffect(() => {
    if (!targetDate) return;
    const intervalId = setInterval(() => {
      setTimeDiff(getTimeDiff(targetDate));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetDate]);

  if (status === 'closed' || status === 'completed') {
    return (
      <Alert
        severity="error"
        action={
          <Button color="inherit" size="small" href="/#lo-trinh" sx={{ fontWeight: 800 }}>
            Xem lộ trình
          </Button>
        }
        sx={{
          borderRadius: 4,
          bgcolor: 'rgba(254, 242, 242, 0.95)',
          border: '1.5px solid rgba(239, 68, 68, 0.3)',
          fontWeight: 650,
          fontSize: '0.925rem',
          alignItems: 'center',
        }}
      >
        ⛔ <strong>Cổng đăng ký đã chính thức đóng vào 15/08/2026.</strong> Theo dõi các vòng thi tiếp theo trên trang chủ.
      </Alert>
    );
  }

  if (status === 'manually_disabled') {
    return (
      <Alert
        severity="warning"
        sx={{
          borderRadius: 4,
          bgcolor: 'rgba(254, 243, 199, 0.95)',
          border: '1.5px solid rgba(245, 158, 11, 0.4)',
          fontWeight: 650,
          fontSize: '0.925rem',
          alignItems: 'center',
        }}
      >
        ⚠️ <strong>Thông báo:</strong> Đăng ký đang tạm dừng. Vui lòng theo dõi thông báo mới nhất từ Ban Tổ chức.
      </Alert>
    );
  }

  const badgeLabel = isBeforeOpen
    ? 'ĐẾM NGƯỢC MỞ CỔNG ĐĂNG KÝ'
    : 'THỜI GIAN CÒN LẠI NỘP HỒ SƠ';
  const headingText = isBeforeOpen
    ? 'Cổng đăng ký chính thức mở từ 01/08/2026'
    : 'Hạn cuối nộp hồ sơ: 15/08/2026 · 23:59';
  const dotColor = isBeforeOpen ? '#3B82F6' : '#10B981';

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.5, sm: 3.25 },
        borderRadius: '24px',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(238, 246, 255, 0.95) 100%)',
        backdropFilter: 'blur(16px)',
        border: '1.5px solid rgba(57, 124, 232, 0.28)',
        boxShadow: '0 12px 36px rgba(22, 58, 103, 0.08)',
        textAlign: 'center',
      }}
    >
      <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75, mb: 1.25 }}>
        <Chip
          icon={
            <Box
              component="span"
              sx={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                bgcolor: dotColor,
                ml: '6px !important',
                boxShadow: `0 0 8px ${dotColor}`,
                animation: isOpen ? 'pulseDot 2s ease-in-out infinite' : 'none',
                '@keyframes pulseDot': {
                  '0%, 100%': { opacity: 1, transform: 'scale(1)' },
                  '50%': { opacity: 0.4, transform: 'scale(0.85)' },
                },
              }}
            />
          }
          label={badgeLabel}
          size="small"
          sx={{
            bgcolor: 'rgba(57, 124, 232, 0.1)',
            color: piccColors.blue[800],
            fontWeight: 800,
            fontSize: '0.675rem',
            letterSpacing: '0.08em',
            border: '1px solid rgba(57, 124, 232, 0.2)',
          }}
        />
      </Box>

      <Typography
        sx={{
          fontSize: { xs: '1.05rem', sm: '1.25rem' },
          fontWeight: 800,
          color: '#163A67',
          mb: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
        }}
      >
        <AccessTimeRoundedIcon sx={{ fontSize: 20, color: piccColors.blue[600] }} />
        {headingText}
      </Typography>

      {/* Real-time Countdown Digits */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: { xs: 0.75, sm: 1.25 },
        }}
        role="timer"
        aria-label={`Đếm ngược: ${timeDiff.days} ngày ${timeDiff.hours} giờ ${timeDiff.minutes} phút ${timeDiff.seconds} giây`}
      >
        <CountdownCell value={timeDiff.days} label="Ngày" />
        <Typography sx={{ color: 'rgba(57, 124, 232, 0.4)', fontWeight: 800, fontSize: '1.25rem' }}>:</Typography>
        <CountdownCell value={timeDiff.hours} label="Giờ" />
        <Typography sx={{ color: 'rgba(57, 124, 232, 0.4)', fontWeight: 800, fontSize: '1.25rem' }}>:</Typography>
        <CountdownCell value={timeDiff.minutes} label="Phút" />
        <Typography sx={{ color: 'rgba(57, 124, 232, 0.4)', fontWeight: 800, fontSize: '1.25rem' }}>:</Typography>
        <CountdownCell value={timeDiff.seconds} label="Giây" />
      </Box>

      {isBeforeOpen && (
        <Typography sx={{ fontSize: '0.775rem', color: piccColors.slate[500], mt: 2, fontWeight: 600 }}>
          💡 Hiện tại bạn đang ở chế độ xem trước (Preview). Bạn có thể xem các bước và chuẩn bị thông tin trước ngày mở cổng.
        </Typography>
      )}
    </Paper>
  );
};

export const RegistrationPage = () => {
  return (
    <Box
      component="main"
      id="registration-page"
      sx={{
        py: { xs: 10, md: 14 },
        background: getSkyBackground('hero'),
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Sky World Ambient Background */}
      <SkyBackground variant="hero" />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Back to Home Link */}
        <Box sx={{ mb: 3 }}>
          <Button
            href="/#hero"
            startIcon={<ArrowBackRoundedIcon />}
            sx={{
              color: piccColors.blue[800],
              fontWeight: 700,
              fontSize: '0.875rem',
              '&:hover': { bgcolor: 'rgba(57, 124, 232, 0.08)' },
            }}
          >
            Quay lại trang chủ
          </Button>
        </Box>

        {/* ── Header Launchpad Section ── */}
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
          <Chip
            icon={<AppRegistrationRoundedIcon sx={{ fontSize: 16, color: `${piccColors.blue[700]} !important` }} />}
            label="Đăng ký PICC 2026"
            sx={{
              bgcolor: 'rgba(234, 242, 255, 0.9)',
              color: piccColors.blue[700],
              fontWeight: 800,
              fontSize: '0.825rem',
              mb: 2,
              px: 1.5,
              py: 0.5,
              border: '1px solid rgba(57, 124, 232, 0.25)',
              boxShadow: '0 4px 12px rgba(57, 124, 232, 0.08)',
            }}
          />

          <Typography
            variant="h1"
            component="h1"
            sx={{
              mb: 1.75,
              color: piccColors.ink,
              fontWeight: 850,
              fontSize: { xs: '2rem', sm: '2.6rem', md: '3.2rem' },
              letterSpacing: '-0.025em',
              lineHeight: 1.15,
            }}
          >
            Bắt đầu hành trình cùng đội của bạn
          </Typography>

          <Typography
            sx={{
              textAlign: 'center',
              color: piccColors.slate[600],
              maxWidth: 680,
              mx: 'auto',
              fontSize: { xs: '0.975rem', md: '1.075rem' },
              lineHeight: 1.65,
              mb: 3,
            }}
          >
            Hoàn thành ba bước để gửi thông tin tham gia PTIT Innovation Catalyst Challenge 2026.
          </Typography>

          {/* Quick Metadata Chips */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1.5,
              mb: 2,
            }}
          >
            <Chip
              icon={<SchoolRoundedIcon sx={{ fontSize: '15px !important', color: `${piccColors.blue[600]} !important` }} />}
              label="Sinh viên PTIT"
              size="small"
              sx={{ bgcolor: '#FFFFFF', fontWeight: 700, fontSize: '0.775rem', border: '1px solid #E2E8F0' }}
            />
            <Chip
              icon={<GroupsRoundedIcon sx={{ fontSize: '15px !important', color: `${piccColors.pink[500]} !important` }} />}
              label="Đội 03–05 thành viên"
              size="small"
              sx={{ bgcolor: '#FFFFFF', fontWeight: 700, fontSize: '0.775rem', border: '1px solid #E2E8F0' }}
            />
            <Chip
              icon={<CalendarMonthRoundedIcon sx={{ fontSize: '15px !important', color: `${piccColors.emerald[600]} !important` }} />}
              label="Đăng ký 01/08 – 15/08/2026"
              size="small"
              sx={{ bgcolor: '#FFFFFF', fontWeight: 700, fontSize: '0.775rem', border: '1px solid #E2E8F0' }}
            />
          </Box>

          <Box>
            <Link
              href="/#the-le"
              underline="hover"
              sx={{
                fontSize: '0.85rem',
                fontWeight: 700,
                color: piccColors.blue[700],
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.5,
              }}
            >
              <MenuBookRoundedIcon sx={{ fontSize: 16 }} />
              Xem thể lệ &amp; quy định cuộc thi
            </Link>
          </Box>
        </Box>

        {/* ── Real-time Registration Countdown Banner Dashboard ── */}
        <Box sx={{ maxWidth: 960, mx: 'auto', mb: 4 }}>
          <RegistrationCountdownDashboard />
        </Box>

        {/* ── Form Container ── */}
        <Box sx={{ maxWidth: 960, mx: 'auto' }}>
          <RegistrationForm />
        </Box>
      </Container>
    </Box>
  );
};

export default RegistrationPage;
