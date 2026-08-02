/**
 * SkyBackground — Sky World Design System Config
 *
 * Variants:
 *   hero        — bright brand intro sky with restrained PTIT warmth
 *   clear       — soft light surface for neutral sections
 *   journey     — slightly warmer guided transition for timeline/rules
 *   celebration — warm yellow celebration without neon saturation
 *   calm        — quiet near-white sky for FAQ and reading-heavy sections
 *   sunset      — deep PTIT navy footer atmosphere
 */

export type SkyVariant =
  | 'hero'
  | 'clear'
  | 'journey'
  | 'celebration'
  | 'calm'
  | 'sunset';

export interface CloudConfig {
  x: number;
  y: number;
  depth: 0 | 1 | 2;
  baseW: number;
  travel: number;
  dur: number;
  delay: number;
  opacity: number;
  flipX?: boolean;
  desktopOnly?: boolean;
}

export interface SkyVariantConfig {
  background: string;
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
  gridOpacity: number;
}

export const VARIANTS: Record<SkyVariant, SkyVariantConfig> = {
  hero: {
    background:
      'linear-gradient(180deg, #F7F9FC 0%, #FBFCFE 48%, #FFFFFF 100%)',
    glows: [
      {
        top: '-10%',
        left: '-6%',
        w: '46%',
        h: '52%',
        color: 'rgba(210,221,237,0.42)',
        blur: '70px',
      },
      {
        top: '-4%',
        right: '-2%',
        w: '34%',
        h: '40%',
        color: 'rgba(255,31,31,0.10)',
        blur: '78px',
      },
      {
        bottom: '-10%',
        right: '18%',
        w: '40%',
        h: '34%',
        color: 'rgba(239,203,99,0.18)',
        blur: '64px',
      },
    ],
    clouds: [
      { x: 52, y: 8, depth: 0, baseW: 420, travel: 60, dur: 72, delay: 0, opacity: 0.14, desktopOnly: true },
      { x: 75, y: 58, depth: 0, baseW: 380, travel: -50, dur: 80, delay: 14, opacity: 0.12, desktopOnly: true },
      { x: 58, y: 22, depth: 1, baseW: 300, travel: 45, dur: 56, delay: 6, opacity: 0.18, desktopOnly: true },
      { x: 82, y: 72, depth: 1, baseW: 260, travel: -40, dur: 62, delay: 22, opacity: 0.16, desktopOnly: true, flipX: true },
      { x: 60, y: 88, depth: 2, baseW: 240, travel: 30, dur: 44, delay: 4, opacity: 0.13 },
      { x: 88, y: 80, depth: 2, baseW: 200, travel: -28, dur: 40, delay: 18, opacity: 0.11, flipX: true },
    ],
    gridOpacity: 0.34,
  },

  clear: {
    background:
      'linear-gradient(180deg, #FAFBFD 0%, #FFFFFF 72%)',
    glows: [
      {
        top: '-5%',
        left: '-8%',
        w: '34%',
        h: '40%',
        color: 'rgba(210,221,237,0.24)',
        blur: '60px',
      },
      {
        bottom: '8%',
        right: '-8%',
        w: '34%',
        h: '36%',
        color: 'rgba(239,203,99,0.10)',
        blur: '62px',
      },
    ],
    clouds: [
      { x: -2, y: 15, depth: 0, baseW: 360, travel: 50, dur: 78, delay: 0, opacity: 0.10, desktopOnly: true },
      { x: 90, y: 55, depth: 0, baseW: 320, travel: -45, dur: 84, delay: 20, opacity: 0.09, desktopOnly: true, flipX: true },
      { x: -4, y: 65, depth: 1, baseW: 260, travel: 38, dur: 60, delay: 10, opacity: 0.12, desktopOnly: true },
      { x: 88, y: 10, depth: 1, baseW: 240, travel: -36, dur: 65, delay: 30, opacity: 0.11, desktopOnly: true, flipX: true },
    ],
    gridOpacity: 0.18,
  },

  journey: {
    background:
      'linear-gradient(180deg, #F8FAFD 0%, #FBFCFE 44%, #F8F5F0 100%)',
    glows: [
      {
        top: '10%',
        left: '0%',
        w: '35%',
        h: '42%',
        color: 'rgba(210,221,237,0.28)',
        blur: '65px',
      },
      {
        top: '46%',
        right: '0%',
        w: '34%',
        h: '40%',
        color: 'rgba(255,31,31,0.08)',
        blur: '70px',
      },
      {
        bottom: '3%',
        left: '24%',
        w: '48%',
        h: '26%',
        color: 'rgba(239,203,99,0.16)',
        blur: '58px',
      },
    ],
    clouds: [
      { x: 15, y: 12, depth: 0, baseW: 360, travel: 55, dur: 80, delay: 0, opacity: 0.12, desktopOnly: true },
      { x: 85, y: 60, depth: 0, baseW: 340, travel: -50, dur: 85, delay: 18, opacity: 0.10, desktopOnly: true, flipX: true },
      { x: 20, y: 70, depth: 1, baseW: 280, travel: 40, dur: 62, delay: 8, opacity: 0.14, desktopOnly: true },
      { x: 80, y: 20, depth: 1, baseW: 240, travel: -35, dur: 68, delay: 25, opacity: 0.12, desktopOnly: true, flipX: true },
    ],
    gridOpacity: 0.24,
  },

  celebration: {
    background:
      'linear-gradient(180deg, #FFFBEF 0%, #FFF5D8 46%, #FFF0C9 100%)',
    glows: [
      {
        top: '-5%',
        left: '0%',
        w: '40%',
        h: '50%',
        color: 'rgba(231,195,77,0.24)',
        blur: '72px',
      },
      {
        top: '36%',
        right: '0%',
        w: '38%',
        h: '42%',
        color: 'rgba(239,203,99,0.34)',
        blur: '74px',
      },
      {
        bottom: '0%',
        left: '22%',
        w: '50%',
        h: '28%',
        color: 'rgba(255,31,31,0.08)',
        blur: '62px',
      },
    ],
    clouds: [
      { x: 10, y: 8, depth: 0, baseW: 400, travel: 60, dur: 70, delay: 0, opacity: 0.15, desktopOnly: true },
      { x: 80, y: 55, depth: 0, baseW: 360, travel: -55, dur: 75, delay: 15, opacity: 0.13, desktopOnly: true, flipX: true },
      { x: 15, y: 68, depth: 1, baseW: 300, travel: 45, dur: 58, delay: 5, opacity: 0.16, desktopOnly: true },
      { x: 85, y: 15, depth: 1, baseW: 260, travel: -40, dur: 64, delay: 20, opacity: 0.14, desktopOnly: true, flipX: true },
      { x: 30, y: 90, depth: 2, baseW: 220, travel: 30, dur: 45, delay: 3, opacity: 0.12 },
    ],
    gridOpacity: 0.3,
  },

  calm: {
    background:
      'linear-gradient(180deg, #FBFCFE 0%, #FFFFFF 82%)',
    glows: [
      {
        top: '-3%',
        left: '-5%',
        w: '30%',
        h: '35%',
        color: 'rgba(210,221,237,0.18)',
        blur: '55px',
      },
    ],
    clouds: [
      { x: 5, y: 10, depth: 0, baseW: 340, travel: 40, dur: 85, delay: 0, opacity: 0.08, desktopOnly: true },
      { x: 95, y: 50, depth: 0, baseW: 300, travel: -35, dur: 90, delay: 25, opacity: 0.07, desktopOnly: true, flipX: true },
      { x: 8, y: 70, depth: 1, baseW: 240, travel: 30, dur: 65, delay: 12, opacity: 0.10, desktopOnly: true },
      { x: 92, y: 15, depth: 1, baseW: 220, travel: -28, dur: 70, delay: 35, opacity: 0.09, desktopOnly: true, flipX: true },
    ],
    gridOpacity: 0.1,
  },

  sunset: {
    background:
      'linear-gradient(180deg, #17355E 0%, #102949 56%, #0C2145 100%)',
    glows: [
      {
        top: '-15%',
        left: '0%',
        w: '48%',
        h: '58%',
        color: 'rgba(231,195,77,0.18)',
        blur: '80px',
      },
      {
        bottom: '-10%',
        right: '0%',
        w: '42%',
        h: '46%',
        color: 'rgba(255,31,31,0.12)',
        blur: '84px',
      },
    ],
    clouds: [
      { x: 20, y: 12, depth: 0, baseW: 400, travel: 70, dur: 65, delay: 0, opacity: 0.18, desktopOnly: true },
      { x: 80, y: 58, depth: 0, baseW: 360, travel: -60, dur: 70, delay: 10, opacity: 0.16, desktopOnly: true, flipX: true },
      { x: 25, y: 75, depth: 1, baseW: 320, travel: 50, dur: 55, delay: 5, opacity: 0.20, desktopOnly: true },
      { x: 75, y: 22, depth: 1, baseW: 280, travel: -45, dur: 60, delay: 20, opacity: 0.18, desktopOnly: true, flipX: true },
    ],
    gridOpacity: 0.34,
  },
};

export const getSkyBackground = (variant: SkyVariant): string => {
  return VARIANTS[variant].background;
};
