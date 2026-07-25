import { useState, useEffect, useRef } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import BoltRoundedIcon from '@mui/icons-material/BoltRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { piccColors, gradientMesh } from '@/theme/palette';
import { useRegistrationStatus } from '@/features/registration/hooks';
import { getCtaConfig } from '@/config/registrationCtaConfig';

const NAV_ITEMS = [
  { label: 'Giới thiệu', href: '/#gioi-thieu', id: 'gioi-thieu' },
  { label: 'Thông tin nhanh', href: '/#thong-tin-nhanh', id: 'thong-tin-nhanh' },
  { label: 'Lộ trình', href: '/#lo-trinh', id: 'lo-trinh' },
  { label: 'Thể lệ', href: '/#the-le', id: 'the-le' },
  { label: 'Giải thưởng', href: '/#giai-thuong', id: 'giai-thuong' },
  { label: 'Đội thi', href: '/doi-thi', id: 'doi-thi' },
  { label: 'FAQ', href: '/#faq', id: 'faq' },
];

export const SiteHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const { status } = useRegistrationStatus();
  const location = useLocation();
  const navigate = useNavigate();
  const isNavigatingRef = useRef(false);

  const ctaConfig = getCtaConfig(status);
  const isOnRegistrationPage = location.pathname === '/dang-ky';

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isNavigatingRef.current) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -50% 0px', threshold: 0 }
    );

    NAV_ITEMS.forEach((item) => {
      if (item.href.startsWith('/#')) {
        const el = document.getElementById(item.id);
        if (el) observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  /* ── Navigation Handler ── */
  const handleNavigate = (e: React.MouseEvent, href: string) => {
    if (href.startsWith('#') || href.startsWith('/#')) {
      e.preventDefault();
      setMenuOpen(false);

      const targetId = href.replace('/#', '').replace('#', '');
      setActiveSection(targetId);
      isNavigatingRef.current = true;

      if (window.location.pathname !== '/') {
        navigate(`/${href.startsWith('/#') ? href.substring(1) : href}`);
        return;
      }

      if (targetId === 'hero' || targetId === '') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.history.pushState(null, '', '#hero');
      } else {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
          window.history.pushState(null, '', `#${targetId}`);
        }
      }

      setTimeout(() => {
        isNavigatingRef.current = false;
      }, 750);
    } else {
      setMenuOpen(false);
    }
  };

  const handleCtaClick = (e: React.MouseEvent) => {
    if (isOnRegistrationPage && ctaConfig.href === '/dang-ky') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    handleNavigate(e, ctaConfig.href);
  };

  return (
    <Box
      component="header"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1100,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        bgcolor: scrolled ? 'rgba(255, 255, 255, 0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
        boxShadow: scrolled
          ? '0 4px 20px rgba(23, 59, 102, 0.08), 0 1px 2px rgba(23, 59, 102, 0.04)'
          : 'none',
        borderBottom: scrolled ? `1px solid rgba(226, 232, 240, 0.8)` : '1px solid transparent',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: { xs: 64, md: 76 },
          }}
        >
          {/* Brand Logo Link */}
          <Box
            component="a"
            href="/#hero"
            onClick={(e) => handleNavigate(e, '/#hero')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              textDecoration: 'none',
              color: 'inherit',
              cursor: 'pointer',
            }}
          >
            <Box
              sx={{
                width: 38,
                height: 38,
                borderRadius: '12px',
                background: gradientMesh.cta,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                boxShadow: '0 4px 14px rgba(36, 95, 168, 0.35)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.06) rotate(4deg)',
                  boxShadow: '0 6px 20px rgba(36, 95, 168, 0.5)',
                },
              }}
            >
              <BoltRoundedIcon sx={{ fontSize: 22 }} />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontWeight: 800,
                  color: piccColors.ink,
                  fontSize: '1.2rem',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                PICC <Box component="span" sx={{ color: piccColors.blue[600] }}>2026</Box>
              </Typography>
              <Typography
                sx={{
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  color: piccColors.pink[500],
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                Innovation Catalyst
              </Typography>
            </Box>
          </Box>

          {/* Desktop Navigation Items */}
          <Box
            component="nav"
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              gap: 0.5,
              bgcolor: scrolled ? 'rgba(240, 244, 248, 0.7)' : 'rgba(255, 255, 255, 0.7)',
              p: 0.75,
              borderRadius: '999px',
              border: '1px solid rgba(226, 232, 240, 0.8)',
              backdropFilter: 'blur(12px)',
            }}
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id || (item.href === '/doi-thi' && location.pathname.startsWith('/doi-thi'));
              return (
                <Box key={item.href} sx={{ position: 'relative' }}>
                  <Box
                    component="a"
                    href={item.href}
                    onClick={(e) => handleNavigate(e, item.href)}
                    sx={{
                      position: 'relative',
                      zIndex: 2,
                      px: 2,
                      py: 0.85,
                      borderRadius: '999px',
                      color: isActive ? piccColors.blue[700] : piccColors.neutral[600],
                      fontSize: '0.875rem',
                      fontWeight: isActive ? 750 : 500,
                      transition: 'color 0.2s ease',
                      display: 'block',
                      textDecoration: 'none',
                      cursor: 'pointer',
                      '&:hover': {
                        color: piccColors.blue[700],
                      },
                    }}
                  >
                    {item.label}
                  </Box>
                  {isActive && (
                    <Box
                      component={motion.div}
                      layoutId="activePill"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        bgcolor: '#FFFFFF',
                        borderRadius: '999px',
                        boxShadow: '0 2px 8px rgba(23, 59, 102, 0.1)',
                        border: `1px solid ${piccColors.blue[200]}`,
                        zIndex: 1,
                      }}
                    />
                  )}
                </Box>
              );
            })}
          </Box>

          {/* Header Action CTA Button & Mobile Menu Toggle */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Button
              component="a"
              href={ctaConfig.href}
              aria-current={isOnRegistrationPage ? 'page' : undefined}
              onClick={handleCtaClick}
              variant="contained"
              size="small"
              sx={{
                display: { xs: 'none', sm: 'inline-flex' },
                height: 42,
                borderRadius: '13px',
                px: 2.75,
                fontSize: '0.875rem',
                fontWeight: 700,
                color: '#FFFFFF',
                background: 'linear-gradient(135deg, #173B66 0%, #245FA8 55%, #3B82F6 100%)',
                boxShadow: '0 4px 14px rgba(36, 95, 168, 0.32)',
                textTransform: 'none',
                transition: 'all 0.25s ease',
                '&:hover': {
                  background: 'linear-gradient(135deg, #0F2847 0%, #173B66 55%, #245FA8 100%)',
                  boxShadow: '0 6px 20px rgba(36, 95, 168, 0.45)',
                  transform: 'translateY(-1px)',
                },
              }}
            >
              {isOnRegistrationPage ? 'Biểu mẫu đăng ký' : ctaConfig.navbarLabel}
            </Button>

            <Button
              onClick={() => setMenuOpen(!menuOpen)}
              variant="text"
              size="small"
              sx={{
                display: { xs: 'inline-flex', md: 'none' },
                minWidth: 42,
                height: 42,
                p: 0,
                color: piccColors.ink,
                borderRadius: 3,
                bgcolor: 'rgba(240, 244, 248, 0.8)',
                '&:hover': { bgcolor: piccColors.blue[50] },
              }}
            >
              {menuOpen ? <CloseRoundedIcon /> : <MenuRoundedIcon />}
            </Button>
          </Box>
        </Box>
      </Container>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {menuOpen && (
          <Box
            component={motion.div}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            sx={{
              display: { xs: 'block', md: 'none' },
              bgcolor: 'rgba(255, 255, 255, 0.96)',
              backdropFilter: 'blur(20px)',
              borderTop: `1px solid ${piccColors.neutral[200]}`,
              boxShadow: '0 10px 30px rgba(23, 59, 102, 0.12)',
              overflow: 'hidden',
              py: 2.5,
            }}
          >
            <Container maxWidth="lg">
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.id || (item.href === '/doi-thi' && location.pathname.startsWith('/doi-thi'));
                  return (
                    <Box
                      key={item.href}
                      component="a"
                      href={item.href}
                      onClick={(e) => handleNavigate(e, item.href)}
                      sx={{
                        px: 2.5,
                        py: 1.5,
                        borderRadius: 3,
                        color: isActive ? piccColors.blue[700] : piccColors.neutral[700],
                        bgcolor: isActive ? piccColors.blue[50] : 'transparent',
                        fontSize: '1.05rem',
                        fontWeight: isActive ? 700 : 500,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer',
                        '&:hover': { bgcolor: piccColors.blue[50], color: piccColors.blue[700] },
                      }}
                    >
                      <span>{item.label}</span>
                      {isActive && (
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            bgcolor: piccColors.blue[600],
                          }}
                        />
                      )}
                    </Box>
                  );
                })}

                {/* Mobile Menu Bottom Prominent Registration CTA */}
                <Button
                  component="a"
                  href={ctaConfig.href}
                  onClick={handleCtaClick}
                  variant="contained"
                  endIcon={<ArrowForwardRoundedIcon />}
                  sx={{
                    mt: 2,
                    borderRadius: '14px',
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    background: 'linear-gradient(135deg, #173B66 0%, #245FA8 55%, #3B82F6 100%)',
                    boxShadow: '0 4px 16px rgba(36, 95, 168, 0.35)',
                    textTransform: 'none',
                  }}
                >
                  {isOnRegistrationPage ? 'Biểu mẫu đăng ký' : ctaConfig.heroLabel}
                </Button>
              </Box>
            </Container>
          </Box>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default SiteHeader;
