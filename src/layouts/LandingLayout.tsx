import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import { SkipLink } from '@/components/ui/SkipLink';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { SiteHeader } from '@/features/navigation/SiteHeader';
import { FooterSection } from '@/sections/footer/FooterSection';
import { MobileStickyCta } from '@/components/ui/MobileStickyCta';
import { assetPath } from '@/config/paths';

export const LandingLayout = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const navEntry =
      performance.getEntriesByType &&
      (performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined);
    const isReload = navEntry?.type === 'reload';

    if (pathname !== '/') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      return;
    }

    if (!hash) {
      if (isReload) {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
      return;
    }

    const targetId = hash.replace('#', '');
    let attempts = 0;

    const tryScroll = () => {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ block: 'start', behavior: isReload ? 'instant' : 'smooth' });
        return;
      }

      if (attempts < 10) {
        attempts += 1;
        window.requestAnimationFrame(tryScroll);
      }
    };

    window.requestAnimationFrame(tryScroll);
  }, [pathname, hash]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: `#D0E7FE url(${assetPath('maunen2.jpg')}) no-repeat center top / cover fixed`,
        backgroundAttachment: { xs: 'scroll', md: 'fixed' },
      }}
    >
      <SkipLink />
      <ScrollProgress />
      <SiteHeader />
      <Box
        component="main"
        id="main-content"
        sx={{
          flex: 1,
          pb: { xs: 'calc(var(--mobile-sticky-cta-clearance) + env(safe-area-inset-bottom))', md: 0 },
        }}
      >
        <Outlet />
      </Box>

      {/* Sticky Mobile Registration CTA Bar */}
      <MobileStickyCta />

      <FooterSection />
    </Box>
  );
};
