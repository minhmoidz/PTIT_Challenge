import { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRegistrationStatus } from '@/features/registration/hooks';
import { getCtaConfig } from '@/config/registrationCtaConfig';
import { gradientMesh, piccColors } from '@/theme/palette';

export const MobileStickyCta = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { status } = useRegistrationStatus();
  const [visible, setVisible] = useState(false);

  const ctaConfig = getCtaConfig(status);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA after scrolling past 450px (Hero section)
      const scrolled = window.scrollY > 450;
      setVisible(scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide on /dang-ky or if competition status does not permit sticky CTA
  if (location.pathname === '/dang-ky' || !ctaConfig.showMobileSticky) {
    return null;
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (ctaConfig.href.startsWith('/#')) {
      const targetId = ctaConfig.href.replace('/#', '');
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(ctaConfig.href);
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          sx={{
            position: 'fixed',
            bottom: 'calc(12px + env(safe-area-inset-bottom))',
            left: { xs: 14, sm: 20 },
            right: { xs: 14, sm: 20 },
            zIndex: 1050,
            display: { xs: 'block', md: 'none' },
            bgcolor: 'rgba(255, 255, 255, 0.94)',
            backdropFilter: 'blur(16px) saturate(160%)',
            border: '1px solid rgba(223, 230, 239, 0.92)',
            borderRadius: '22px',
            p: 1.25,
            boxShadow: '0 12px 32px rgba(15, 42, 82, 0.14), 0 2px 6px rgba(15, 42, 82, 0.06)',
          }}
        >
          <Button
            fullWidth
            variant="contained"
            onClick={handleClick}
            endIcon={<ArrowForwardRoundedIcon sx={{ fontSize: '1.1rem !important' }} />}
            sx={{
              height: 50,
              borderRadius: '14px',
              fontWeight: 800,
              fontSize: '1rem',
              letterSpacing: '-0.01em',
              background: gradientMesh.ptitCta,
              boxShadow: '0 4px 14px rgba(225, 20, 20, 0.28)',
              textTransform: 'none',
              '&:hover': {
                background: `linear-gradient(135deg, ${piccColors.ptitDarkRed} 0%, #7A0F0F 100%)`,
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {status === 'open' && (
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: '#10B981',
                    boxShadow: '0 0 8px #10B981',
                  }}
                />
              )}
              <Typography component="span" sx={{ fontWeight: 800, fontSize: '0.975rem' }}>
                {ctaConfig.mobileLabel}
              </Typography>
            </Box>
          </Button>
        </Box>
      )}
    </AnimatePresence>
  );
};
