import { useRef } from 'react';
import { Box, Container, Grid } from '@mui/material';
import { motion, useScroll, useTransform } from 'motion/react';
import { SkyBackground, getSkyBackground } from '@/components/ui/SkyBackground';
import { useRegistrationStatus } from '@/features/registration/hooks';
import { HeroContent } from './HeroContent';
import { HeroVisual } from './HeroVisual';

const MotionContainer = motion.create(Container);

export const HeroSection = () => {
  const { status, config } = useRegistrationStatus();
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.1]);

  return (
    <Box
      id="hero"
      ref={sectionRef}
      component="section"
      sx={{
        position: 'relative',
        minHeight: { xs: 'auto', md: 'clamp(820px, 88vh, 980px)' },
        background: getSkyBackground('hero'),
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        pt: { xs: 11, md: 14 },
        pb: { xs: 8, md: 9 },
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

      <MotionContainer
        style={{ y: contentY, opacity: contentOpacity, position: 'relative', zIndex: 3 }}
        maxWidth="xl"
        sx={{ px: { xs: 3, sm: 4, lg: 6 } }}
      >
        <Grid
          container
          spacing={{ xs: 6, md: 3 }}
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
      </MotionContainer>
    </Box>
  );
};

export default HeroSection;
