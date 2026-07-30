/**
 * SkyBackground — Sky World Design System
 *
 * Variants:
 *   hero        — rich multi-layer sky for Hero section
 *   clear       — bright open sky for Introduction / Rules
 *   journey     — atmospheric journey sky for Timeline / Roadmap
 *   celebration — golden celebration sky for Awards
 *   calm        — near-white quiet sky for FAQ
 *   sunset      — deep-sky / dusk tone for Footer
 *
 * All animation is CSS transform-based (translate3d).
 * Respects prefers-reduced-motion.
 * aria-hidden + pointer-events:none on all decorative elements.
 */

import { useMemo } from 'react';
import { Box } from '@mui/material';
import { motion, useReducedMotion } from 'motion/react';
import { VARIANTS, type SkyVariant, type SkyVariantConfig, type CloudConfig } from './skyBackgroundConfig';

/* ────────────────────────────────────────────────
   Types
───────────────────────────────────────────────── */
export type { SkyVariant, SkyVariantConfig, CloudConfig } from './skyBackgroundConfig';

/* ────────────────────────────────────────────────
   Glow decoration
───────────────────────────────────────────────── */
const AtmosphericGlow = ({ glow }: { glow: SkyVariantConfig['glows'][0] }) => (
  <Box
    aria-hidden="true"
    sx={{
      position: 'absolute',
      top: glow.top,
      bottom: glow.bottom,
      left: glow.left,
      right: glow.right,
      width: glow.w,
      height: glow.h,
      borderRadius: '50%',
      background: glow.color,
      filter: `blur(${glow.blur})`,
      pointerEvents: 'none',
      zIndex: 0,
    }}
  />
);

/* ────────────────────────────────────────────────
   Dot grid pattern
───────────────────────────────────────────────── */
const DotGrid = ({ opacity }: { opacity: number }) => (
  <Box
    aria-hidden="true"
    sx={{
      position: 'absolute',
      inset: 0,
      backgroundImage:
        'radial-gradient(circle, rgba(57,124,232,0.15) 1px, transparent 1px)',
      backgroundSize: '30px 30px',
      opacity,
      pointerEvents: 'none',
      zIndex: 0,
    }}
  />
);

/* ────────────────────────────────────────────────
   Cloud shape (SVG-based puff cluster)
───────────────────────────────────────────────── */
const CloudPuff = ({
  width,
  opacity,
  flipX,
  depth,
}: {
  width: number;
  opacity: number;
  flipX?: boolean;
  depth: 0 | 1 | 2;
}) => {
  const blurPx = depth === 0 ? 6 : depth === 1 ? 3 : 1;
  const height = width * 0.42;

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 84"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width,
        height,
        display: 'block',
        opacity,
        filter: blurPx > 0 ? `blur(${blurPx}px)` : undefined,
        transform: flipX ? 'scaleX(-1)' : undefined,
        flexShrink: 0,
      }}
    >
      {/* Multi-ellipse cloud shape */}
      <ellipse cx="100" cy="62" rx="95" ry="22" fill="white" fillOpacity="0.9" />
      <ellipse cx="72" cy="50" rx="55" ry="32" fill="white" fillOpacity="0.85" />
      <ellipse cx="100" cy="44" rx="50" ry="36" fill="white" fillOpacity="0.9" />
      <ellipse cx="130" cy="50" rx="50" ry="30" fill="white" fillOpacity="0.85" />
      <ellipse cx="155" cy="58" rx="40" ry="22" fill="white" fillOpacity="0.80" />
      <ellipse cx="45" cy="60" rx="38" ry="20" fill="white" fillOpacity="0.78" />
      {/* Subtle inner shading for depth */}
      <ellipse cx="100" cy="48" rx="38" ry="22" fill="rgba(200,220,245,0.25)" />
    </svg>
  );
};

/* ────────────────────────────────────────────────
   Animated cloud item
───────────────────────────────────────────────── */
const AnimatedCloud = ({ cfg }: { cfg: CloudConfig }) => {
  const scale = cfg.depth === 0 ? 1.0 : cfg.depth === 1 ? 1.25 : 1.5;
  const width = cfg.baseW * scale;
  const prefersReducedMotion = useReducedMotion();

  return (
    <Box
      aria-hidden="true"
      sx={{
        position: 'absolute',
        top: `${cfg.y}%`,
        left: `${cfg.x}%`,
        zIndex: 0,
        pointerEvents: 'none',
        display: cfg.desktopOnly ? { xs: 'none', md: 'block' } : 'block',
        willChange: prefersReducedMotion ? 'auto' : 'transform',
      }}
    >
      <Box
        component={motion.div}
        animate={
          prefersReducedMotion
            ? undefined
            : {
                x: [0, cfg.travel, 0],
                transition: {
                  duration: cfg.dur,
                  delay: cfg.delay,
                  ease: 'linear',
                  repeat: Infinity,
                },
              }
        }
      >
        <CloudPuff
          width={width}
          opacity={cfg.opacity}
          flipX={cfg.flipX}
          depth={cfg.depth}
        />
      </Box>
    </Box>
  );
};

/* ═══════════════════════════════════════════════════════════════
   Main export
═══════════════════════════════════════════════════════════════ */

interface SkyBackgroundProps {
  variant: SkyVariant;
  /** Override the CSS background string */
  _customBackground?: string;
}

export const SkyBackground = ({ variant, _customBackground }: SkyBackgroundProps) => {
  const cfg = VARIANTS[variant];

  // Memoize cloud list to prevent re-render thrash
  const clouds = useMemo(() => cfg.clouds, [cfg.clouds]);

  return (
    <>
      {/* Layer 1 — sky gradient (applied to parent via prop, not here) */}
      {/* The gradient is returned as a CSS value the parent should apply */}

      {/* Layer 2 — dot grid */}
      {cfg.gridOpacity > 0 && <DotGrid opacity={cfg.gridOpacity} />}

      {/* Layer 3 — atmospheric glows */}
      {cfg.glows.map((g, i) => (
        <AtmosphericGlow key={i} glow={g} />
      ))}

      {/* Layer 4 — cloud clusters */}
      {clouds.map((c, i) => (
        <AnimatedCloud key={i} cfg={c} />
      ))}
    </>
  );
};

export default SkyBackground;