import { Container, Box, Typography } from '@mui/material';
import { env } from '@/config/env';
import { awards } from '@/content/vi/awards';
import { piccColors } from '@/theme/palette';
import { SkyBackground } from '@/components/ui/SkyBackground';
import { getSkyBackground } from '@/components/ui/skyBackgroundConfig';
import { AwardHeader } from './components/AwardHeader';
import { AwardPodium } from './components/AwardPodium';
import { EncouragementAward } from './components/EncouragementAward';
import { BenefitsSection } from './components/BenefitsSection';

export const AwardsSection = () => {
  return (
    <Box
      component="section"
      id="giai-thuong"
      sx={{
        py: { xs: 8, sm: 10, md: 12 },
        background: getSkyBackground('celebration'),
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Sky World Background — celebration variant */}
      <SkyBackground variant="celebration" />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header with Total Cash Prize Highlight Card */}
        <AwardHeader />

        {/* 3D Podium Layout (Á Quân - QUÁN QUÂN - Quý Quân) */}
        <AwardPodium />

        {/* Horizontal Encouragement Award Band */}
        <EncouragementAward />

        {/* Disclaimer */}
        {!env.isProduction && (
          <Typography
            sx={{
              textAlign: 'center',
              color: piccColors.slate[500],
              mt: 4,
              mb: 4,
              fontStyle: 'italic',
              fontSize: '0.875rem',
            }}
          >
            * {awards.disclaimer}
          </Typography>
        )}

        {/* Benefits for all qualified teams */}
        <BenefitsSection />
      </Container>
    </Box>
  );
};

export default AwardsSection;