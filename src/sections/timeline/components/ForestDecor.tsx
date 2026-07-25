import { Box } from '@mui/material';

export const ForestDecor = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 0,
      }}
    >
      {/* Background Soft Radial Glow */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: 340, md: 700 },
          height: { xs: 340, md: 700 },
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(57, 124, 232, 0.07) 0%, rgba(16, 185, 129, 0.04) 45%, transparent 70%)',
        }}
      />

      {/* Floating Fireflies & Sparkles SVG */}
      <Box
        component="svg"
        viewBox="0 0 1000 1200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        sx={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          opacity: 0.7,
        }}
      >
        {/* Subtle Fireflies */}
        <circle cx="120" cy="180" r="3" fill="#FBBF24" opacity="0.6" />
        <circle cx="880" cy="250" r="2.5" fill="#6EE7B7" opacity="0.7" />
        <circle cx="200" cy="550" r="3" fill="#60A5FA" opacity="0.6" />
        <circle cx="800" cy="720" r="2.5" fill="#FBBF24" opacity="0.7" />
        <circle cx="150" cy="950" r="3.5" fill="#34D399" opacity="0.6" />
        <circle cx="850" cy="1080" r="3" fill="#F472B6" opacity="0.6" />

        {/* Delicate Sparkles */}
        <path d="M 300 200 L 303 208 L 311 211 L 303 214 L 300 222 L 297 214 L 289 211 L 297 208 Z" fill="#FDE68A" opacity="0.5" />
        <path d="M 700 480 L 703 486 L 709 489 L 703 492 L 700 498 L 697 492 L 691 489 L 697 486 Z" fill="#93C5FD" opacity="0.5" />
        <path d="M 250 820 L 253 826 L 259 829 L 253 832 L 250 838 L 247 832 L 241 829 L 247 826 Z" fill="#A7F3D0" opacity="0.5" />

        {/* Soft Leaf Accents */}
        <path d="M 60 400 Q 80 390 90 410 Q 75 420 60 400 Z" fill="#10B981" opacity="0.12" />
        <path d="M 920 600 Q 940 590 950 610 Q 935 620 920 600 Z" fill="#397CE8" opacity="0.12" />
      </Box>
    </Box>
  );
};

export default ForestDecor;
