import { useState, useEffect, useRef } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { piccColors, gradientMesh } from '@/theme/palette';
import { useRegistrationStatus } from '@/features/registration/hooks';
import { getCtaConfig } from '@/config/registrationCtaConfig';
import { appHash, appPath, assetPath } from '@/config/paths';

const NAV_ITEMS = [
  { label: 'Giới thiệu', href: '/#gioi-thieu', id: 'gioi-thieu' },
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

      if (location.pathname !== '/') {
        navigate(`/${href.startsWith('/#') ? href.substring(1) : href}`);
        return;
      }

      if (targetId === 'hero' || targetId === '') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.history.pushState(null, '', '#hero');
      } else {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ block: 'start', behavior: 'smooth' });
          window.history.pushState(null, '', `#${targetId}`);
        }
      }

      setTimeout(() => {
        isNavigatingRef.current = false;
      }, 750);
    } else {
      e.preventDefault();
      setMenuOpen(false);
      if (location.pathname === href) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate(href);
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
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
        bgcolor: scrolled ? 'rgba(255, 255, 255, 0.86)' : 'rgba(255, 255, 255, 0.98)',
        backdropFilter: scrolled ? 'blur(16px) saturate(160%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(160%)' : 'none',
        boxShadow: scrolled
          ? '0 8px 32px rgba(15, 42, 82, 0.1)'
          : '0 2px 10px rgba(15, 42, 82, 0.04)',
        borderBottom: `1px solid ${scrolled ? 'rgba(255, 31, 31, 0.14)' : piccColors.neutral[200]}`,
      }}
    >
      {/* ── Signature PTIT Crimson Red Top Bar ── */}
      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
          bgcolor: piccColors.ptitRed,
          color: '#FFFFFF',
          py: 0.45,
          fontFamily: '"Manrope", sans-serif',
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.75rem',
              fontWeight: 600,
            }}
          >
            <Box
              component="a"
              href="https://ptit.edu.vn/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: '#FFFFFF',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 0.75,
                opacity: 0.95,
                '&:hover': { opacity: 1, textDecoration: 'underline' },
              }}
            >
              <Box component="span" sx={{ fontSize: '0.85rem' }}>🌐</Box>
              Cổng thông tin điện tử Học viện Công nghệ Bưu chính Viễn thông
            </Box>

            <Box
              component="a"
              href="mailto:iec@ptit.edu.vn"
              sx={{
                color: '#FFFFFF',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 0.75,
                opacity: 0.95,
                '&:hover': { opacity: 1, textDecoration: 'underline' },
              }}
            >
              <Box component="span" sx={{ fontSize: '0.85rem' }}>✉</Box>
              iec@ptit.edu.vn
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ── Main Crisp White Navigation Bar ── */}
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: { xs: 64, md: 72 },
          }}
        >
          {/* Institutional Brand Lockup */}
          <Box
            component="a"
            href={appHash('hero')}
            onClick={(e) => handleNavigate(e, '/#hero')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            {/* Logomark combination */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, md: 0.75 } }}>
              <Box
                component="img"
                src={assetPath('assets/branding/ptit-logo.png')}
                alt="PTIT"
                sx={{ width: { xs: 30, md: 32 }, height: { xs: 38, md: 40 }, objectFit: 'contain' }}
              />
              <Box
                component="img"
                src={assetPath('assets/branding/ptit-iec-logo-2026.png')}
                alt="PTIT IEC"
                sx={{ width: { xs: 38, md: 40 }, height: { xs: 38, md: 40 }, objectFit: 'contain' }}
              />
            </Box>

            {/* Two-line Institution & Campaign Title */}
            <Box sx={{ borderLeft: `1px solid ${piccColors.neutral[300]}`, pl: 1.5, display: { xs: 'none', md: 'block' } }}>
              <Typography
                sx={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: piccColors.ptitRed,
                  lineHeight: 1.2,
                  fontFamily: '"Manrope", sans-serif',
                  whiteSpace: 'nowrap',
                }}
              >
                Học viện Công nghệ Bưu chính Viễn thông
              </Typography>
              <Typography
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: 800,
                  color: piccColors.ptitNavy,
                  letterSpacing: '0.01em',
                  textTransform: 'uppercase',
                  lineHeight: 1.25,
                  fontFamily: '"Manrope", sans-serif',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.75,
                  whiteSpace: 'nowrap',
                }}
              >
                ĐỔI MỚI SÁNG TẠO &amp; KHỞI NGHIỆP
                <Box
                  component="span"
                  sx={{
                    bgcolor: piccColors.ptitRed,
                    color: '#FFFFFF',
                    px: 0.75,
                    py: 0.15,
                    borderRadius: '4px',
                    fontSize: '0.68rem',
                    fontWeight: 800,
                  }}
                >
                  PICC 2026
                </Box>
              </Typography>
            </Box>
          </Box>

          {/* Desktop Uppercase Navigation Items */}
          <Box
            component="nav"
            sx={{
              display: { xs: 'none', lg: 'flex' },
              alignItems: 'center',
              gap: 0.25,
            }}
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id || (item.href === '/doi-thi' && location.pathname.startsWith('/doi-thi'));
              return (
                <Box key={item.href} sx={{ position: 'relative' }}>
                  <Box
                    component="a"
                    href={item.href.startsWith('/#') ? appHash(item.id) : item.href}
                    onClick={(e) => handleNavigate(e, item.href)}
                    sx={{
                      px: 1.15,
                      py: 0.85,
                      color: isActive ? piccColors.ptitRed : piccColors.ptitNavy,
                      fontSize: '0.9rem',
                      fontWeight: 750,
                      letterSpacing: '0.02em',
                      textTransform: 'uppercase',
                      fontFamily: '"Manrope", sans-serif',
                      whiteSpace: 'nowrap',
                      transition: 'color 0.2s ease',
                      display: 'block',
                      textDecoration: 'none',
                      cursor: 'pointer',
                      position: 'relative',
                      '&:hover': {
                        color: piccColors.ptitRed,
                      },
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: '15%',
                        right: '15%',
                        height: 2,
                        bgcolor: piccColors.ptitRed,
                        borderRadius: '2px',
                        transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                        transformOrigin: 'left',
                        transition: 'transform 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
                      },
                      '&:hover::after': {
                        transform: 'scaleX(1)',
                      },
                    }}
                  >
                    {item.label}
                  </Box>
                </Box>
              );
            })}
          </Box>

          {/* Header Action CTA Button & Mobile Menu Toggle */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Button
              component="a"
              href={ctaConfig.href.startsWith('/#') ? appHash(ctaConfig.href.slice(2)) : appPath(ctaConfig.href)}
              aria-current={isOnRegistrationPage ? 'page' : undefined}
              onClick={handleCtaClick}
              variant="contained"
              size="small"
              sx={{
                display: { xs: 'none', md: 'inline-flex' },
                height: 40,
                borderRadius: '50px',
                px: 2.5,
                fontSize: '0.875rem',
                fontWeight: 800,
                letterSpacing: '0.02em',
                fontFamily: '"Manrope", sans-serif',
                color: '#FFFFFF',
                background: gradientMesh.ptitCta,
                boxShadow: '0 4px 14px rgba(255, 31, 31, 0.35)',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                transition: 'all 0.25s ease',
                '&:hover': {
                  background: 'linear-gradient(135deg, #B81111 0%, #8F1010 100%)',
                  boxShadow: '0 6px 20px rgba(255, 31, 31, 0.5)',
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
                display: { xs: 'inline-flex', lg: 'none' },
                minWidth: 42,
                height: 42,
                p: 0,
                color: piccColors.ptitNavy,
                borderRadius: 2,
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
              display: { xs: 'block', lg: 'none' },
              bgcolor: 'rgba(255, 255, 255, 0.96)',
              backdropFilter: 'blur(20px)',
              borderTop: `1px solid ${piccColors.neutral[200]}`,
              boxShadow: '0 10px 30px rgba(15, 42, 82, 0.12)',
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
                      href={item.href.startsWith('/#') ? appHash(item.id) : item.href}
                      onClick={(e) => handleNavigate(e, item.href)}
                      sx={{
                        px: 2.5,
                        py: 1.5,
                        borderRadius: 3,
                        color: isActive ? piccColors.ptitRed : piccColors.ptitNavy,
                        bgcolor: isActive ? 'rgba(255, 31, 31, 0.08)' : 'transparent',
                        fontSize: '0.95rem',
                        fontWeight: isActive ? 800 : 600,
                        textTransform: 'uppercase',
                        fontFamily: '"Manrope", sans-serif',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer',
                        '&:hover': { bgcolor: 'rgba(255, 31, 31, 0.08)', color: piccColors.ptitRed },
                      }}
                    >
                      <span>{item.label}</span>
                      {isActive && (
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            bgcolor: piccColors.ptitRed,
                          }}
                        />
                      )}
                    </Box>
                  );
                })}

                {/* Mobile Menu Bottom Prominent Registration CTA */}
                <Button
                  component="a"
                  href={ctaConfig.href.startsWith('/#') ? appHash(ctaConfig.href.slice(2)) : appPath(ctaConfig.href)}
                  onClick={handleCtaClick}
                  variant="contained"
                  endIcon={<ArrowForwardRoundedIcon />}
                  sx={{
                    mt: 2,
                    borderRadius: '50px',
                    py: 1.5,
                    fontSize: '0.95rem',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    background: gradientMesh.ptitCta,
                    boxShadow: '0 4px 16px rgba(255, 31, 31, 0.35)',
                    textTransform: 'uppercase',
                    fontFamily: '"Manrope", sans-serif',
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
