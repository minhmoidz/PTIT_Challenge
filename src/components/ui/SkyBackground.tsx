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

import { useId, useMemo } from 'react';
import { Box } from '@mui/material';
import { motion, useReducedMotion } from 'motion/react';
import { VARIANTS, type SkyVariant, type SkyVariantConfig, type CloudConfig } from './skyBackgroundConfig';

/* ────────────────────────────────────────────────
   Types
───────────────────────────────────────────────── */
export type { SkyVariant, SkyVariantConfig, CloudConfig } from './skyBackgroundConfig';

/* ────────────────────────────────────────────────
   Glow decoration (static soft light field)
──────────────────────────────────────────────── */
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
        'radial-gradient(circle, rgba(15, 42, 82, 0.12) 1px, transparent 1px)',
      backgroundSize: '30px 30px',
      opacity,
      pointerEvents: 'none',
      zIndex: 0,
    }}
  />
);

/* ────────────────────────────────────────────────
   Realistic Volumetric Cloud with Fractal Vapor Noise
───────────────────────────────────────────────── */
const RealisticCloud = ({
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
  const blurPx = depth === 0 ? 2 : depth === 1 ? 1 : 0;
  const height = width * 0.46;
  const idSuffix = useId().replace(/[^a-zA-Z0-9_-]/g, '');

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 320 150"
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
      <defs>
        {/* Organic Water Vapor Noise Distortion Filter */}
        <filter id={`cloudOrganic_${idSuffix}`} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="11" xChannelSelector="R" yChannelSelector="G" result="displaced" />
          <feGaussianBlur in="displaced" stdDeviation="1.6" result="blurred" />
          <feDropShadow dx="0" dy="7" stdDeviation="8" floodColor="#0F2A52" floodOpacity="0.05" />
        </filter>

        {/* Sunlight Scattered Vapor Gradient */}
        <linearGradient id={`cloudHighlight_${idSuffix}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.98" />
          <stop offset="50%" stopColor="#F1F6FF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#D7E6FA" stopOpacity="0.8" />
        </linearGradient>

        {/* Deep Atmosphere Base Shadow */}
        <linearGradient id={`cloudBase_${idSuffix}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#D4E4F9" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#ACCBEF" stopOpacity="0.85" />
        </linearGradient>
      </defs>

      <g filter={`url(#cloudOrganic_${idSuffix})`}>
        {/* Soft Volumetric Vapor Base */}
        <path
          d="M 45 115 Q 30 115 22 98 Q 15 80 40 72 Q 60 40 105 45 Q 125 18 180 20 Q 230 8 265 32 Q 300 25 310 60 Q 325 80 310 102 Q 315 118 280 120 Z"
          fill={`url(#cloudBase_${idSuffix})`}
        />

        {/* Main Fluffy Vapor Body */}
        <ellipse cx="160" cy="100" rx="135" ry="32" fill={`url(#cloudHighlight_${idSuffix})`} />
        <circle cx="95" cy="80" r="46" fill={`url(#cloudHighlight_${idSuffix})`} />
        <circle cx="155" cy="58" r="58" fill={`url(#cloudHighlight_${idSuffix})`} />
        <circle cx="220" cy="68" r="50" fill={`url(#cloudHighlight_${idSuffix})`} />
        <circle cx="270" cy="85" r="38" fill={`url(#cloudHighlight_${idSuffix})`} />
        <circle cx="55" cy="88" r="34" fill={`url(#cloudHighlight_${idSuffix})`} />

        {/* Top Sunlight Volumetric Puffs */}
        <circle cx="150" cy="48" r="40" fill="#FFFFFF" fillOpacity="0.98" />
        <circle cx="212" cy="56" r="36" fill="#FFFFFF" fillOpacity="0.95" />
        <circle cx="90" cy="68" r="30" fill="#FFFFFF" fillOpacity="0.95" />
      </g>
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
  // Almost static: a barely-there drift so the sky feels calm, not busy.
  const drift = cfg.travel * 0.35;

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
                x: [0, drift, 0],
                transition: {
                  duration: cfg.dur * 1.6,
                  delay: cfg.delay,
                  ease: 'easeInOut',
                  repeat: Infinity,
                },
              }
        }
      >
        <RealisticCloud
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
  /**
   * Which atmosphere to render. The section itself paints the base gradient via
   * `getSkyBackground(variant)`; this component draws the glows, clouds and grid
   * on top of it.
   */
  variant: SkyVariant;
}

/**
 * Decorative overlay for a section surface.
 *
 * The section itself paints the base colour via `getSkyBackground(variant)`;
 * this draws whatever sits on top of it. Every variant is currently a flat
 * surface with no overlay, so this renders nothing — the layers are kept so a
 * single accent can be reintroduced for one section without replumbing markup.
 */
export const SkyBackground = ({ variant }: SkyBackgroundProps) => {
  const cfg = VARIANTS[variant];
  const clouds = useMemo(() => cfg.clouds, [cfg.clouds]);

  if (cfg.gridOpacity === 0 && cfg.glows.length === 0 && clouds.length === 0) {
    return null;
  }

  return (
    <>
      {cfg.gridOpacity > 0 && <DotGrid opacity={cfg.gridOpacity} />}

      {cfg.glows.map((g, i) => (
        <AtmosphericGlow key={i} glow={g} />
      ))}

      {clouds.map((c, i) => (
        <AnimatedCloud key={i} cfg={c} />
      ))}
    </>
  );
};

export default SkyBackground;