import { Box, Typography } from '@mui/material';
import { motion } from 'motion/react';
import type { RegistrationStatus } from '@/types/registration';
import { useCountdown } from '@/features/countdown/useCountdown';
import { piccColors } from '@/theme/palette';

interface Props {
  targetDate: Date | null;
  status: RegistrationStatus;
  clockOffsetMs?: number;
}

const CountdownCell = ({ value, label }: { value: number; label: string }) => (
  <Box
    sx={{
      textAlign: 'center',
      minWidth: { xs: 68, sm: 84 },
      py: 1.5,
      px: 1,
      bgcolor: 'rgba(244, 248, 253, 0.95)',
      borderRadius: '16px',
      border: '1.5px solid rgba(56, 130, 241, 0.25)',
      boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.8), 0 4px 12px rgba(15, 42, 82, 0.06)',
    }}
  >
    <Typography
      sx={{
        fontVariantNumeric: 'tabular-nums',
        display: 'block',
        fontSize: { xs: '2rem', sm: '2.6rem' },
        fontWeight: 900,
        color: '#0F2A52',
        lineHeight: 1.05,
        letterSpacing: '-0.03em',
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
        color: '#67788F',
        fontSize: '0.72rem',
        fontWeight: 800,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        mt: 0.5,
        display: 'block',
      }}
    >
      {label}
    </Typography>
  </Box>
);

export const RegistrationCountdown = ({ targetDate, status, clockOffsetMs = 0 }: Props) => {
  const countdown = useCountdown(targetDate, clockOffsetMs);

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
          py: 1.25,
          mb: 3,
          border: '1px solid rgba(223, 230, 239,0.9)',
        }}
      >
        <Typography sx={{ fontWeight: 700, color: piccColors.slate[700], fontSize: '0.9rem' }}>
          {msg}
        </Typography>
      </Box>
    );
  }

  if (!targetDate || countdown.isExpired) return null;

  const label = status === 'not_open' ? 'THỜI GIAN MỞ ĐĂNG KÝ' : 'THỜI GIAN ĐĂNG KÝ';

  return (
    <Box sx={{ mb: 3 }}>
      <Typography
        sx={{
          color: piccColors.blue[700],
          fontWeight: 800,
          fontSize: '0.725rem',
          letterSpacing: '0.08em',
          display: 'block',
          mb: 1.25,
          textTransform: 'uppercase',
        }}
      >
        {label}
      </Typography>
      <Box
        sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.75, sm: 1 } }}
        role="timer"
        aria-label={`${label} ${countdown.days} ngày ${countdown.hours} giờ ${countdown.minutes} phút ${countdown.seconds} giây`}
      >
        <CountdownCell value={countdown.days} label="Ngày" />
        <Typography sx={{ color: 'rgba(56, 130, 241, 0.4)', fontWeight: 800, fontSize: '1.25rem' }}>:</Typography>
        <CountdownCell value={countdown.hours} label="Giờ" />
        <Typography sx={{ color: 'rgba(56, 130, 241, 0.4)', fontWeight: 800, fontSize: '1.25rem' }}>:</Typography>
        <CountdownCell value={countdown.minutes} label="Phút" />
        <Typography sx={{ color: 'rgba(56, 130, 241, 0.4)', fontWeight: 800, fontSize: '1.25rem' }}>:</Typography>
        <CountdownCell value={countdown.seconds} label="Giây" />
      </Box>
    </Box>
  );
};