import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { SkipLink } from '@/components/ui/SkipLink';
import { SiteHeader } from '@/features/navigation/SiteHeader';
import { FooterSection } from '@/sections/footer/FooterSection';

export const LandingLayout = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <SkipLink />
    <SiteHeader />
    <Box component="main" id="main-content" sx={{ flex: 1 }}>
      <Outlet />
    </Box>
    <FooterSection />
  </Box>
);
