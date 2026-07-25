import { Box } from '@mui/material';
import { FootstepMarker } from './FootstepMarkers';

interface ThreadPathProps {
  hasEnteredViewport: boolean;
}

/**
 * Footstep coordinates (relative X %, Y px, rotation deg, color) along the dashed path
 */
const FOOTSTEP_LOCATIONS = [
  // Segment 1 -> 2
  { x: 50, y: 165, rotation: 45, color: '#397CE8', delay: 0.4 },
  // Segment 2 -> 3
  { x: 50, y: 355, rotation: -135, color: '#E85B9F', delay: 1.0 },
  // Segment 3 -> 4
  { x: 50, y: 545, rotation: 45, color: '#D97706', delay: 1.6 },
  // Segment 4 -> 5
  { x: 52, y: 730, rotation: 160, color: '#059669', delay: 2.2 },
];

export const ThreadPath = ({ hasEnteredViewport }: ThreadPathProps) => {
  return (
    <Box
      sx={{
        display: { xs: 'none', md: 'block' },
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <svg
        viewBox="0 0 1000 950"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%' }}
      >
        <defs>
          {/* Thread Path Multi-stop Gradient */}
          <linearGradient id="threadGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#397CE8" />
            <stop offset="25%" stopColor="#E85B9F" />
            <stop offset="50%" stopColor="#D97706" />
            <stop offset="75%" stopColor="#E65100" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>

          {/* Soft Glow Filter for Floating Dashed Path */}
          <filter id="threadGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Background Track Line (Solid thin base) */}
        <path
          d="M 420 70 C 600 70, 400 260, 580 260 C 760 260, 240 450, 420 450 C 600 450, 400 640, 580 640 C 640 640, 500 720, 500 825"
          stroke="rgba(203, 220, 242, 0.5)"
          strokeWidth="3"
          strokeDasharray="6 6"
          strokeLinecap="round"
          fill="none"
        />

        {/* Main Dashed Thread Path ("Đường Nét Đứt Tinh Tế") */}
        <path
          d="M 420 70 C 600 70, 400 260, 580 260 C 760 260, 240 450, 420 450 C 600 450, 400 640, 580 640 C 640 640, 500 720, 500 825"
          stroke="url(#threadGradient)"
          strokeWidth="4"
          strokeDasharray="10 10"
          strokeLinecap="round"
          fill="none"
          style={{
            strokeDashoffset: hasEnteredViewport ? 0 : 2000,
            transition: 'stroke-dashoffset 2.4s cubic-bezier(0.4, 0, 0.2, 1)',
            filter: 'url(#threadGlow)',
          }}
        />
      </svg>

      {/* Footstep Markers along the Dashed Path */}
      {FOOTSTEP_LOCATIONS.map((step, idx) => (
        <FootstepMarker
          key={idx}
          x={step.x}
          y={step.y}
          rotation={step.rotation}
          color={step.color}
          delay={step.delay}
          active={hasEnteredViewport}
        />
      ))}
    </Box>
  );
};
