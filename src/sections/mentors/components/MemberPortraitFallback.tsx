import { Box, Typography } from '@mui/material';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';

interface MemberPortraitProps {
  name: string;
  image?: string;
  aspectRatio?: string; // e.g. '4/5' or '16/9' or '16/10'
  height?: number | string;
}

export const MemberPortraitFallback = ({
  name,
  image,
  aspectRatio = '4/5',
  height,
}: MemberPortraitProps) => {
  // Extract initials
  const initials = name
    .replace(/^(PGS\.\s*|TS\.\s*|ThS\.\s*|GS\.\s*)+/gi, '')
    .trim()
    .split(' ')
    .slice(-2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();

  if (image) {
    return (
      <Box
        sx={{
          width: '100%',
          aspectRatio,
          height,
          borderRadius: '16px',
          overflow: 'hidden',
          position: 'relative',
          bgcolor: 'rgba(234, 242, 255, 0.6)',
        }}
      >
        <Box
          component="img"
          src={image}
          alt={`Ảnh chân dung ${name}`}
          loading="lazy"
          decoding="async"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top center',
          }}
        />
        {/* Subtle overlay gradient at bottom */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, rgba(23, 59, 102, 0.25) 0%, transparent 60%)',
            pointerEvents: 'none',
          }}
        />
      </Box>
    );
  }

  // Premium Academic Fallback Container
  return (
    <Box
      sx={{
        width: '100%',
        aspectRatio,
        height,
        borderRadius: '16px',
        overflow: 'hidden',
        position: 'relative',
        background:
          'linear-gradient(135deg, #EAF2FF 0%, #F0F4FF 50%, #E0E7FF 100%)',
        border: '1px solid rgba(57, 124, 232, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'inset 0 2px 10px rgba(255, 255, 255, 0.8)',
      }}
    >
      {/* Background Academic Grid Pattern */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle, rgba(57, 124, 232, 0.12) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          opacity: 0.6,
          pointerEvents: 'none',
        }}
      />

      {/* Decorative Orbital Ring */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          width: '75%',
          height: '75%',
          borderRadius: '50%',
          border: '1.5px dashed rgba(57, 124, 232, 0.25)',
          pointerEvents: 'none',
        }}
      />

      {/* Top Right Academic Watermark */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          top: 12,
          right: 12,
          opacity: 0.35,
          color: '#3B7AD6',
        }}
      >
        <SchoolRoundedIcon sx={{ fontSize: 22 }} />
      </Box>

      {/* Centered Initials Monogram */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            bgcolor: '#FFFFFF',
            boxShadow: '0 8px 24px rgba(36, 95, 168, 0.15)',
            border: '2px solid rgba(57, 124, 232, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 0.5,
          }}
        >
          <Typography
            sx={{
              fontWeight: 900,
              fontSize: '1.4rem',
              color: '#173B66',
              letterSpacing: '0.05em',
            }}
          >
            {initials}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default MemberPortraitFallback;
