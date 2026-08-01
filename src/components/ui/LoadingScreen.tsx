import { Box, Typography } from '@mui/material';
import { motion } from 'motion/react';
import { piccColors } from '@/theme/palette';
import { assetPath } from '@/config/paths';

export const LoadingScreen = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      gap: 3,
      background: piccColors.sky[50],
    }}
  >
    <Box sx={{ position: 'relative', width: 84, height: 84, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box
        component={motion.span}
        animate={{ rotate: 360 }}
        transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
        sx={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          border: '3px solid rgba(57, 124, 232, 0.15)',
          borderTopColor: piccColors.ptitRed,
          borderRightColor: piccColors.blue[500],
        }}
      />
      <Box
        component={motion.div}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        sx={{
          width: 56,
          height: 56,
          borderRadius: '16px',
          bgcolor: '#FFFFFF',
          border: `1px solid ${piccColors.neutral[200]}`,
          boxShadow: '0 10px 26px rgba(22, 58, 103, 0.18)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <Box
          component="img"
          src={assetPath('assets/branding/ptit-iec-logo-2026.png')}
          alt="PTIT IEC"
          sx={{ width: '78%', height: '78%', objectFit: 'contain' }}
        />
      </Box>
    </Box>

    <Box sx={{ textAlign: 'center' }}>
      <Typography
        sx={{
          fontWeight: 800,
          fontSize: '0.975rem',
          color: piccColors.ptitNavy,
          letterSpacing: '0.04em',
        }}
      >
        ĐANG TẢI TRANG
      </Typography>
      <Typography sx={{ color: piccColors.slate[500], fontSize: '0.8125rem', mt: 0.5 }}>
        PTIT Innovation Catalyst Challenge 2026
      </Typography>
    </Box>
  </Box>
);
