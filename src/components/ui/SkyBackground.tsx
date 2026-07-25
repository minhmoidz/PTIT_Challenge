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

/* ────────────────────────────────────────────────
   Types
───────────────────────────────────────────────── */
export type SkyVariant =
  | 'hero'
  | 'clear'
  | 'journey'
  | 'celebration'
  | 'calm'
  | 'sunset';

interface CloudConfig {
  /** Position: 0–100 % */
  x: number;
  y: number;
  /** 0=far (small,blur,slow)  1=mid  2=near (large,sharp,fast) */
  depth: 0 | 1 | 2;
  /** base width in px before scale */
  baseW: number;
  /** travel distance in px (positive=rightward) */
  travel: number;
  /** duration in seconds */
  dur: number;
  delay: number;
  opacity: number;
  /** flip horizontally for variety */
  flipX?: boolean;
  /** hide on mobile to reduce DOM */
  desktopOnly?: boolean;
}

interface SkyVariantConfig {
  /** CSS background for the section */
  background: string;
  /** radial glow decorations */
  glows: Array<{
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
    w: string;
    h: string;
    color: string;
    blur: string;
  }>;
  clouds: CloudConfig[];
  /** dot grid pattern opacity (0 = no grid) */
  gridOpacity: number;
}

/* ────────────────────────────────────────────────
   Variant definitions
───────────────────────────────────────────────── */
const VARIANTS: Record<SkyVariant, SkyVariantConfig> = {
  /* ── HERO ── */
  hero: {
    background:
      'linear-gradient(180deg, #EAF5FF 0%, #F5FBFF 55%, #FFFFFF 100%)',
    glows: [
      // blue top-left (text safety zone: VERY light so text contrast is safe)
      {
        top: '-10%',
        left: '-6%',
        w: '48%',
        h: '55%',
        color: 'rgba(57,124,232,0.13)',
        blur: '70px',
      },
      // pink right behind visual
      {
        top: '0%',
        right: '-4%',
        w: '42%',
        h: '48%',
        color: 'rgba(232,91,159,0.09)',
        blur: '80px',
      },
      // violet bottom
      {
        bottom: '-8%',
        right: '18%',
        w: '38%',
        h: '38%',
        color: 'rgba(99,102,241,0.06)',
        blur: '60px',
      },
    ],
    clouds: [
      // far layer — behind visual, right side only
      { x: 52, y: 8,  depth: 0, baseW: 420, travel: 60,  dur: 72, delay: 0,    opacity: 0.14, desktopOnly: true },
      { x: 75, y: 58, depth: 0, baseW: 380, travel: -50, dur: 80, delay: 14,   opacity: 0.12, desktopOnly: true },
      // mid layer
      { x: 58, y: 22, depth: 1, baseW: 300, travel: 45,  dur: 56, delay: 6,    opacity: 0.18, desktopOnly: true },
      { x: 82, y: 72, depth: 1, baseW: 260, travel: -40, dur: 62, delay: 22,   opacity: 0.16, desktopOnly: true, flipX: true },
      // foreground edge cloud — very bottom of visual
      { x: 60, y: 88, depth: 2, baseW: 240, travel: 30,  dur: 44, delay: 4,    opacity: 0.13 },
      { x: 88, y: 80, depth: 2, baseW: 200, travel: -28, dur: 40, delay: 18,   opacity: 0.11, flipX: true },
    ],
    gridOpacity: 0.45,
  },

  /* ── CLEAR ── */
  clear: {
    background:
      'linear-gradient(180deg, #F7FBFF 0%, #FFFFFF 70%)',
    glows: [
      {
        top: '-5%',
        left: '-8%',
        w: '36%',
        h: '42%',
        color: 'rgba(57,124,232,0.07)',
        blur: '60px',
      },
      {
        top: '-5%',
        right: '-8%',
        w: '36%',
        h: '42%',
        color: 'rgba(57,124,232,0.06)',
        blur: '60px',
      },
    ],
    clouds: [
      // only edge clouds — stay away from center card area
      { x: -2, y: 15, depth: 0, baseW: 360, travel: 50,  dur: 78, delay: 0,   opacity: 0.10, desktopOnly: true },
      { x: 90, y: 55, depth: 0, baseW: 320, travel: -45, dur: 84, delay: 20,  opacity: 0.09, desktopOnly: true, flipX: true },
      { x: -4, y: 65, depth: 1, baseW: 260, travel: 38,  dur: 60, delay: 10,  opacity: 0.12, desktopOnly: true },
      { x: 88, y: 10, depth: 1, baseW: 240, travel: -36, dur: 65, delay: 30,  opacity: 0.11, desktopOnly: true, flipX: true },
    ],
    gridOpacity: 0.25,
  },

  /* ── JOURNEY ── */
  journey: {
    background:
      'linear-gradient(180deg, #EFF8FF 0%, #F5FBFF 40%, #F0F8FF 100%)',
    glows: [
      {
        top: '10%',
        left: '0%',
        w: '35%',
        h: '45%',
        color: 'rgba(57,124,232,0.09)',
        blur: '65px',
      },
      {
        top: '45%',
        right: '0%',
        w: '35%',
        h: '45%',
        color: 'rgba(99,102,241,0.07)',
        blur: '70px',
      },
      {
        bottom: '5%',
        left: '25%',
        w: '50%',
        h: '30%',
        color: 'rgba(5,150,105,0.05)',
        blur: '55px',
      },
    ],
    clouds: [
      // journey clouds near mid-path — horizontal spread
      { x: 0,  y: 20, depth: 0, baseW: 400, travel: 55,  dur: 76, delay: 0,   opacity: 0.13, desktopOnly: true },
      { x: 70, y: 40, depth: 0, baseW: 350, travel: -50, dur: 82, delay: 18,  opacity: 0.11, desktopOnly: true, flipX: true },
      { x: 5,  y: 60, depth: 0, baseW: 380, travel: 48,  dur: 70, delay: 35,  opacity: 0.12, desktopOnly: true },
      { x: 65, y: 78, depth: 1, baseW: 280, travel: -42, dur: 58, delay: 8,   opacity: 0.15, desktopOnly: true, flipX: true },
      { x: 2,  y: 85, depth: 1, baseW: 260, travel: 36,  dur: 54, delay: 24,  opacity: 0.14, desktopOnly: true },
      // mobile: one per side
      { x: 0,  y: 10, depth: 0, baseW: 220, travel: 30,  dur: 70, delay: 0,   opacity: 0.10 },
      { x: 75, y: 80, depth: 0, baseW: 200, travel: -28, dur: 75, delay: 15,  opacity: 0.09, flipX: true },
    ],
    gridOpacity: 0.30,
  },

  /* ── CELEBRATION ── */
  celebration: {
    background:
      'linear-gradient(180deg, #EBF5FF 0%, #F7FBFF 35%, #FFFDF5 75%, #FEFDF0 100%)',
    glows: [
      // gold above center
      {
        top: '-8%',
        left: '25%',
        w: '50%',
        h: '50%',
        color: 'rgba(247,201,107,0.12)',
        blur: '75px',
      },
      // blue flanks
      {
        top: '10%',
        left: '-6%',
        w: '32%',
        h: '40%',
        color: 'rgba(57,124,232,0.08)',
        blur: '60px',
      },
      {
        top: '10%',
        right: '-6%',
        w: '32%',
        h: '40%',
        color: 'rgba(57,124,232,0.08)',
        blur: '60px',
      },
      // warm peach bottom
      {
        bottom: '-5%',
        right: '15%',
        w: '40%',
        h: '35%',
        color: 'rgba(244,165,130,0.08)',
        blur: '55px',
      },
    ],
    clouds: [
      // celebration clouds — framing the podium
      { x: -2, y: 5,  depth: 0, baseW: 450, travel: 55,  dur: 80, delay: 0,   opacity: 0.15, desktopOnly: true },
      { x: 72, y: 8,  depth: 0, baseW: 400, travel: -50, dur: 85, delay: 22,  opacity: 0.14, desktopOnly: true, flipX: true },
      { x: -3, y: 75, depth: 1, baseW: 300, travel: 40,  dur: 60, delay: 12,  opacity: 0.18, desktopOnly: true },
      { x: 70, y: 70, depth: 1, baseW: 280, travel: -38, dur: 64, delay: 28,  opacity: 0.16, desktopOnly: true, flipX: true },
      // foreground bottom edge — under podium
      { x: 30, y: 90, depth: 2, baseW: 260, travel: 25,  dur: 46, delay: 5,   opacity: 0.14 },
      { x: 60, y: 88, depth: 2, baseW: 240, travel: -22, dur: 42, delay: 20,  opacity: 0.12, flipX: true },
    ],
    gridOpacity: 0,
  },

  /* ── CALM ── */
  calm: {
    background:
      'linear-gradient(180deg, #F7FBFF 0%, #FAFCFF 60%, #FFFFFF 100%)',
    glows: [
      {
        top: '-5%',
        left: '0%',
        w: '30%',
        h: '40%',
        color: 'rgba(57,124,232,0.05)',
        blur: '55px',
      },
      {
        bottom: '-5%',
        right: '0%',
        w: '30%',
        h: '35%',
        color: 'rgba(57,124,232,0.04)',
        blur: '50px',
      },
    ],
    clouds: [
      // very sparse — just two edge hints on desktop
      { x: -3, y: 20, depth: 0, baseW: 300, travel: 40, dur: 85, delay: 0,   opacity: 0.08, desktopOnly: true },
      { x: 88, y: 65, depth: 0, baseW: 280, travel: -38, dur: 90, delay: 30, opacity: 0.07, desktopOnly: true, flipX: true },
    ],
    gridOpacity: 0.15,
  },

  /* ── SUNSET ── */
  sunset: {
    background:
      'linear-gradient(180deg, #162B4A 0%, #1B3560 40%, #0F2241 100%)',
    glows: [
      // deep blue glow top-center
      {
        top: '-10%',
        left: '20%',
        w: '60%',
        h: '50%',
        color: 'rgba(57,124,232,0.14)',
        blur: '80px',
      },
      // pink/violet accent
      {
        top: '30%',
        right: '-5%',
        w: '35%',
        h: '45%',
        color: 'rgba(232,91,159,0.08)',
        blur: '65px',
      },
    ],
    clouds: [
      // dark-tinted clouds for footer sky depth
      { x: -2, y: 10, depth: 0, baseW: 380, travel: 45,  dur: 80, delay: 0,   opacity: 0.08, desktopOnly: true },
      { x: 72, y: 45, depth: 0, baseW: 340, travel: -40, dur: 88, delay: 25,  opacity: 0.07, desktopOnly: true, flipX: true },
    ],
    gridOpacity: 0,
  },
};

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
      <ellipse cx="72"  cy="50" rx="55" ry="32" fill="white" fillOpacity="0.85" />
      <ellipse cx="100" cy="44" rx="50" ry="36" fill="white" fillOpacity="0.9" />
      <ellipse cx="130" cy="50" rx="50" ry="30" fill="white" fillOpacity="0.85" />
      <ellipse cx="155" cy="58" rx="40" ry="22" fill="white" fillOpacity="0.80" />
      <ellipse cx="45"  cy="60" rx="38" ry="20" fill="white" fillOpacity="0.78" />
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
                y: [0, -6, 0],
              }
        }
        transition={{
          duration: cfg.dur,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: cfg.delay,
          repeatType: 'mirror',
        }}
        // @ts-expect-error - motion.div style
        style={{ display: 'block', willChange: prefersReducedMotion ? 'auto' : 'transform' }}
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

/* ────────────────────────────────────────────────
   Glow decoration
───────────────────────────────────────────────── */
const AtmosphericGlow = ({
  glow,
}: {
  glow: SkyVariantConfig['glows'][number];
}) => (
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
      background: `radial-gradient(circle, ${glow.color}, transparent 70%)`,
      filter: `blur(${glow.blur})`,
      pointerEvents: 'none',
      zIndex: 0,
    }}
  />
);

/* ────────────────────────────────────────────────
   Main export
───────────────────────────────────────────────── */
interface SkyBackgroundProps {
  variant: SkyVariant;
  /** Override the CSS background string */
  customBackground?: string;
}

export const SkyBackground = ({ variant, customBackground }: SkyBackgroundProps) => {
  const cfg = VARIANTS[variant];
  const background = customBackground ?? cfg.background;

  // Memoize cloud list to prevent re-render thrash
  const clouds = useMemo(() => cfg.clouds, [cfg.clouds]);

  return (
    <>
      {/* Layer 1 — sky gradient (applied to parent via prop, not here) */}
      {/* The gradient is returned as a CSS value the parent should apply */}

      {/* Layer 2 — dot grid */}
      {cfg.gridOpacity > 0 && (
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(circle, rgba(57,124,232,0.15) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
            opacity: cfg.gridOpacity,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      )}

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

/**
 * Get the CSS background string for a given sky variant.
 * Use this in the section's `sx.background` prop.
 */
export const getSkyBackground = (variant: SkyVariant): string =>
  VARIANTS[variant].background;

export default SkyBackground;
