import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import { SkipLink } from '@/components/ui/SkipLink';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { SiteHeader } from '@/features/navigation/SiteHeader';
import { FooterSection } from '@/sections/footer/FooterSection';
import { MobileStickyCta } from '@/components/ui/MobileStickyCta';

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

    if (isReload && pathname === '/') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname);
      }
      return;
    }

    if (hash && !isReload) {
      const targetId = hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
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
