import { Box, Container, Grid } from '@mui/material';
import { SkyBackground } from '@/components/ui/SkyBackground';
import { getSkyBackground } from '@/components/ui/skyBackgroundConfig';
import { useRegistrationStatus } from '@/features/registration/hooks';
import { HeroContent } from './HeroContent';
import { HeroVisual } from './HeroVisual';

export const HeroSection = () => {
  const { status, config } = useRegistrationStatus();

  return (
    <Box
      id="hero"
      component="section"
      sx={{
        position: 'relative',
        background: getSkyBackground('hero'),
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        pt: { xs: 12, sm: 14, md: 16 },
        pb: { xs: 6, sm: 7, md: 8 },
      }}
    >
      {/* ── Sky World Background ── */}
      <SkyBackground variant="hero" />

      {/* ── Bottom fade to white ── */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 100,
          background: 'linear-gradient(to top, #FFFFFF 10%, transparent)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      <Container
        maxWidth="lg"
        sx={{ position: 'relative', zIndex: 3, px: { xs: 3, sm: 4 } }}
      >
        <Grid
          container
          spacing={{ xs: 5, sm: 6, md: 4 }}
          alignItems="center"
          justifyContent="space-between"
        >
          {/* LEFT: 54% */}
          <Grid size={{ xs: 12, md: 6.6 }}>
            <HeroContent status={status} config={config} />
          </Grid>

          {/* RIGHT: 46% */}
          <Grid size={{ xs: 12, md: 5.4 }}>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: { xs: 'center', md: 'flex-end' },
              }}
            >
              <HeroVisual />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;
