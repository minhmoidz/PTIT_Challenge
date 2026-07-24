import { Box, Typography } from '@mui/material';
import { motion } from 'motion/react';
import type { RegistrationStatus } from '@/types/registration';
import { useCountdown } from '@/features/countdown/useCountdown';
import { piccColors } from '@/theme/palette';

interface Props {
  targetDate: Date | null;
  status: RegistrationStatus;
}

const CountdownCell = ({ value, label }: { value: number; label: string }) => (
  <Box
    sx={{
      textAlign: 'center',
      minWidth: { xs: 60, sm: 72 },
      py: 1.25,
      px: 1,
      bgcolor: '#FFFFFF',
      borderRadius: '16px',
      border: `1.5px solid ${piccColors.yellow[300]}`,
      boxShadow: '0 4px 12px rgba(251, 188, 4, 0.15)',
    }}
  >
    <Typography
      variant="h3"
      component="span"
      sx={{
        fontVariantNumeric: 'tabular-nums',
        display: 'block',
        fontSize: { xs: '1.6rem', sm: '2rem' },
        fontWeight: 850,
        color: piccColors.ink,
        lineHeight: 1.1,
      }}
    >
      <motion.span
        key={value}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.15 }}
      >
        {String(value).padStart(2, '0')}
      </motion.span>
    </Typography>
    <Typography
      variant="caption"
      sx={{
        color: piccColors.yellow[700],
        fontSize: '0.725rem',
        fontWeight: 750,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        mt: 0.25,
        display: 'block',
      }}
    >
      {label}
    </Typography>
  </Box>
);

export const RegistrationCountdown = ({ targetDate, status }: Props) => {
  const countdown = useCountdown(targetDate);

  if (status === 'closed' || status === 'manually_disabled') {
    const msg = status === 'closed' ? 'Đăng ký đã kết thúc' : 'Đăng ký tạm dừng';
    return (
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 1.5,
          bgcolor: 'rgba(255,255,255,0.9)',
          borderRadius: 999,
          px: 3,
          py: 1.5,
          mb: 3,
          boxShadow: '0 4px 16px rgba(23,59,102,0.08)',
          border: `1.5px solid ${piccColors.sky[200]}`,
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 700, color: piccColors.ink }}>
          {msg}
        </Typography>
      </Box>
    );
  }

  if (!targetDate || countdown.isExpired) return null;

  const label = status === 'not_open' ? 'THỜI GIAN MỞ ĐĂNG KÝ CÒN' : 'THỜI GIAN ĐĂNG KÝ CÒN';

  return (
    <Box sx={{ mb: 3.5 }}>
      <Typography
        variant="caption"
        sx={{
          color: piccColors.ink,
          fontWeight: 800,
          fontSize: '0.75rem',
          letterSpacing: '0.08em',
          display: 'block',
          mb: 1.5,
        }}
      >
        {label}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: { xs: 1, sm: 1.5 },
        }}
        role="timer"
        aria-label={`${label} ${countdown.days} ngày ${countdown.hours} giờ ${countdown.minutes} phút ${countdown.seconds} giây`}
      >
        <CountdownCell value={countdown.days} label="Ngày" />
        <Typography variant="h4" sx={{ color: piccColors.yellow[700], fontWeight: 800 }}>
          :
        </Typography>
        <CountdownCell value={countdown.hours} label="Giờ" />
        <Typography variant="h4" sx={{ color: piccColors.yellow[700], fontWeight: 800 }}>
          :
        </Typography>
        <CountdownCell value={countdown.minutes} label="Phút" />
        <Typography variant="h4" sx={{ color: piccColors.yellow[700], fontWeight: 800 }}>
          :
        </Typography>
        <CountdownCell value={countdown.seconds} label="Giây" />
      </Box>
    </Box>
  );
};
