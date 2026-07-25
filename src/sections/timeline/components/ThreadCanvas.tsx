import { Box } from '@mui/material';
import { motion } from 'motion/react';

interface ThreadCanvasProps {
  hasEnteredViewport: boolean;
}

/**
 * Footprint Pair Markers positioned along the 4-stage continuous thread path
 */
const FOOTSTEP_CLUSTERS = [
  // Cluster 1 (Stage 1 -> 2: (410,85) to (670,265))
  { x: 485, y: 130, rotation: 32, opacity: 0.25, delay: 0.5 },
  { x: 570, y: 185, rotation: 48, opacity: 0.25, delay: 0.7 },
  { x: 640, y: 235, rotation: 25, opacity: 0.22, delay: 0.9 },

  // Cluster 2 (Stage 2 -> 3: (670,265) to (410,445))
  { x: 600, y: 320, rotation: -150, opacity: 0.25, delay: 1.1 },
  { x: 510, y: 365, rotation: -170, opacity: 0.25, delay: 1.3 },
  { x: 440, y: 410, rotation: -145, opacity: 0.22, delay: 1.5 },

  // Cluster 3 (Stage 3 -> 4 Finale: (410,445) to (540,625))
  { x: 455, y: 495, rotation: 45, opacity: 0.25, delay: 1.7 },
  { x: 505, y: 560, rotation: 55, opacity: 0.25, delay: 1.9 },
];

/**
 * Single SVG Footprint Pair Component
 */
const FootprintPair = ({
  size = 11,
  color = '#397CE8',
}: {
  size?: number;
  color?: string;
}) => (
  <svg
    width={size * 1.5}
    height={size * 1.8}
    viewBox="0 0 24 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'block' }}
    aria-hidden="true"
  >
    <g transform="translate(1, 4) rotate(-10)">
      <ellipse cx="4" cy="10" rx="3" ry="5" fill={color} />
      <circle cx="2" cy="2" r="1" fill={color} />
      <circle cx="4.5" cy="1.2" r="0.9" fill={color} />
      <circle cx="7" cy="2" r="0.8" fill={color} />
    </g>
    <g transform="translate(13, 0) rotate(10)">
      <ellipse cx="4" cy="10" rx="3" ry="5" fill={color} />
      <circle cx="2" cy="2" r="1" fill={color} />
      <circle cx="4.5" cy="1.2" r="0.9" fill={color} />
      <circle cx="7" cy="2" r="0.8" fill={color} />
    </g>
  </svg>
);

export const ThreadCanvas = ({ hasEnteredViewport }: ThreadCanvasProps) => {
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
        viewBox="0 0 1080 840"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%' }}
      >
        <defs>
          {/* Thread Multi-stop Smooth Gradient */}
          <linearGradient id="threadGradientMain" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#397CE8" />
            <stop offset="33%" stopColor="#E85B9F" />
            <stop offset="66%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>

          {/* Soft Depth Shadow Filter */}
          <filter id="threadDepthShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#162B4A" floodOpacity="0.1" />
          </filter>
        </defs>

        {/* ── Layer 1: Thread Shadow ── */}
        <path
          d="M 410 85 C 620 85, 670 175, 670 265 C 670 355, 410 355, 410 445 C 410 535, 540 535, 540 625"
          stroke="#162B4A"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.08"
          style={{ filter: 'blur(3px)' }}
        />

        {/* ── Layer 2: Main Continuous Smooth Thread ── */}
        <path
          d="M 410 85 C 620 85, 670 175, 670 265 C 670 355, 410 355, 410 445 C 410 535, 540 535, 540 625"
          stroke="url(#threadGradientMain)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{
            strokeDasharray: 2000,
            strokeDashoffset: hasEnteredViewport ? 0 : 2000,
            transition: 'stroke-dashoffset 2.2s cubic-bezier(0.4, 0, 0.2, 1)',
            filter: 'url(#threadDepthShadow)',
          }}
        />

        {/* ── Layer 3: Inner Specular Highlight ── */}
        <path
          d="M 410 85 C 620 85, 670 175, 670 265 C 670 355, 410 355, 410 445 C 410 535, 540 535, 540 625"
          stroke="rgba(255, 255, 255, 0.6)"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.5"
          style={{
            strokeDasharray: 2000,
            strokeDashoffset: hasEnteredViewport ? 0 : 2000,
            transition: 'stroke-dashoffset 2.2s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />

        {/* ── Horizontal Tethers (Card to Thread Nodes) ── */}
        {/* Tether 01 */}
        <line x1="360" y1="85" x2="390" y2="85" stroke="#397CE8" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        {/* Tether 02 */}
        <line x1="690" y1="265" x2="720" y2="265" stroke="#E85B9F" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        {/* Tether 03 */}
        <line x1="360" y1="445" x2="390" y2="445" stroke="#D97706" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      </svg>

      {/* Subtle Footstep Clusters Along Curve */}
      {FOOTSTEP_CLUSTERS.map((step, idx) => (
        <Box
          key={idx}
          sx={{
            position: 'absolute',
            left: `${(step.x / 1080) * 100}%`,
            top: `${step.y}px`,
            transform: `translate(-50%, -50%) rotate(${step.rotation}deg)`,
            pointerEvents: 'none',
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={hasEnteredViewport ? { opacity: step.opacity, scale: 1 } : { opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.4, delay: step.delay }}
          >
            <FootprintPair size={10} color="#397CE8" />
          </motion.div>
        </Box>
      ))}
    </Box>
  );
};
