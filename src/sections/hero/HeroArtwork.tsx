import { Box } from '@mui/material';
import { motion } from 'motion/react';
import { motionTokens } from '@/motion/tokens';
import { assetManifest } from '@/config/asset-manifest';
import { Tilt3DCard } from '@/components/ui/Tilt3DCard';

export const HeroArtwork = () => {
  const desktop = assetManifest.heroDesktop;
  const mobile = assetManifest.heroMobile;

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, x: 30, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: motionTokens.easingStandard }}
      sx={{
        width: { xs: '100%', md: '48%' },
        height: { xs: '340px', sm: '440px', md: '580px' },
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Tilt3DCard maxTilt={18} scale={1.05} sx={{ width: '100%', height: '100%' }}>
        <Box
          component={motion.div}
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <picture style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <source
              media="(min-width: 900px)"
              srcSet={desktop.src}
              width={desktop.width}
              height={desktop.height}
            />
            <Box
              component="img"
              src={mobile.src}
              alt="PICC 2026 Signpost Artwork"
              aria-hidden="true"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'center center',
                filter: 'drop-shadow(0 24px 48px rgba(23, 59, 102, 0.2))',
                fetchPriority: 'high',
                decoding: 'async',
              }}
            />
          </picture>
        </Box>
      </Tilt3DCard>
    </Box>
  );
};
