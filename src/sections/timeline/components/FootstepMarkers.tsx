import { Box } from '@mui/material';
import { motion } from 'motion/react';

/**
 * Clean SVG Footprint Pair Icon
 */
export const FootprintPairSvg = ({
  size = 14,
  color = '#3882F1',
  opacity = 0.45,
}: {
  size?: number;
  color?: string;
  opacity?: number;
}) => (
  <svg
    width={size * 1.5}
    height={size * 1.8}
    viewBox="0 0 24 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ opacity, display: 'block' }}
    aria-hidden="true"
  >
    {/* Left Footprint */}
    <g transform="translate(1, 4) rotate(-12)">
      <ellipse cx="4" cy="10" rx="3.2" ry="5.5" fill={color} />
      <circle cx="2" cy="2" r="1.1" fill={color} />
      <circle cx="4.5" cy="1.2" r="1" fill={color} />
      <circle cx="7" cy="2" r="0.9" fill={color} />
    </g>
    {/* Right Footprint */}
    <g transform="translate(13, 0) rotate(10)">
      <ellipse cx="4" cy="10" rx="3.2" ry="5.5" fill={color} />
      <circle cx="2" cy="2" r="1.1" fill={color} />
      <circle cx="4.5" cy="1.2" r="1" fill={color} />
      <circle cx="7" cy="2" r="0.9" fill={color} />
    </g>
  </svg>
);

interface FootstepMarkerProps {
  x: number;
  y: number;
  rotation: number;
  color: string;
  delay?: number;
  active?: boolean;
}

/**
 * Animated Footstep Marker placed along the journey thread path
 */
export const FootstepMarker = ({
  x,
  y,
  rotation,
  color,
  delay = 0,
  active = true,
}: FootstepMarkerProps) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}px`,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
        pointerEvents: 'none',
        zIndex: 1,
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={active ? { opacity: 0.5, scale: 1 } : { opacity: 0, scale: 0.6 }}
        transition={{ duration: 0.4, delay, ease: 'easeOut' }}
      >
        <FootprintPairSvg size={14} color={color} opacity={0.55} />
      </motion.div>
    </Box>
  );
};
