/**
 * SkyBackground — Sky World Design System Config
 *
 * Variants:
 *   hero        — rich multi-layer sky for Hero section
 *   clear       — bright open sky for Introduction / Rules
 *   journey     — atmospheric journey sky for Timeline / Roadmap
 *   celebration — golden celebration sky for Awards
 *   calm        — near-white quiet sky for FAQ
 *   sunset      — deep-sky / dusk tone for Footer
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
      'linear-gradient(180deg, #DCEFFD 0%, #F1F8FE 52%, #FBFDFF 100%)',
    glows: [
      {
        top: '-10%',
        left: '-6%',
        w: '48%',
        h: '55%',
        color: 'rgba(147,206,250,0.42)',
        blur: '70px',
      },
      {
        top: '0%',
        right: '-4%',
        w: '42%',
        h: '48%',
        color: 'rgba(246,191,219,0.30)',
        blur: '80px',
      },
      {
        bottom: '-8%',
        right: '18%',
        w: '38%',
        h: '38%',
        color: 'rgba(253,237,167,0.26)',
        blur: '60px',
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
    gridOpacity: 0.45,
  },

  clear: {
    background:
      'linear-gradient(180deg, #F1F8FE 0%, #FBFDFF 70%)',
    glows: [
      {
        top: '-5%',
        left: '-8%',
        w: '36%',
        h: '42%',
        color: 'rgba(147,206,250,0.24)',
        blur: '60px',
      },
      {
        top: '-5%',
        right: '-8%',
        w: '36%',
        h: '42%',
        color: 'rgba(154,195,249,0.20)',
        blur: '60px',
      },
    ],
    clouds: [
      { x: -2, y: 15, depth: 0, baseW: 360, travel: 50, dur: 78, delay: 0, opacity: 0.10, desktopOnly: true },
      { x: 90, y: 55, depth: 0, baseW: 320, travel: -45, dur: 84, delay: 20, opacity: 0.09, desktopOnly: true, flipX: true },
      { x: -4, y: 65, depth: 1, baseW: 260, travel: 38, dur: 60, delay: 10, opacity: 0.12, desktopOnly: true },
      { x: 88, y: 10, depth: 1, baseW: 240, travel: -36, dur: 65, delay: 30, opacity: 0.11, desktopOnly: true, flipX: true },
    ],
    gridOpacity: 0.25,
  },

  journey: {
    background:
      'linear-gradient(180deg, #EAF5FE 0%, #F6FBFF 42%, #EFF7FE 100%)',
    glows: [
      {
        top: '10%',
        left: '0%',
        w: '35%',
        h: '45%',
        color: 'rgba(147,206,250,0.32)',
        blur: '65px',
      },
      {
        top: '45%',
        right: '0%',
        w: '35%',
        h: '45%',
        color: 'rgba(154,195,249,0.26)',
        blur: '70px',
      },
      {
        bottom: '5%',
        left: '25%',
        w: '50%',
        h: '30%',
        color: 'rgba(246,191,219,0.18)',
        blur: '60px',
      },
    ],
    clouds: [
      { x: 15, y: 12, depth: 0, baseW: 360, travel: 55, dur: 80, delay: 0, opacity: 0.12, desktopOnly: true },
      { x: 85, y: 60, depth: 0, baseW: 340, travel: -50, dur: 85, delay: 18, opacity: 0.10, desktopOnly: true, flipX: true },
      { x: 20, y: 70, depth: 1, baseW: 280, travel: 40, dur: 62, delay: 8, opacity: 0.14, desktopOnly: true },
      { x: 80, y: 20, depth: 1, baseW: 240, travel: -35, dur: 68, delay: 25, opacity: 0.12, desktopOnly: true, flipX: true },
    ],
    gridOpacity: 0.35,
  },

  celebration: {
    background:
      'linear-gradient(180deg, #FFFDF0 0%, #FEF7D8 45%, #FDEDA7 100%)',
    glows: [
      {
        top: '-5%',
        left: '0%',
        w: '40%',
        h: '50%',
        color: 'rgba(231,195,77,0.30)',
        blur: '70px',
      },
      {
        top: '35%',
        right: '0%',
        w: '40%',
        h: '45%',
        color: 'rgba(253,237,167,0.55)',
        blur: '75px',
      },
      {
        bottom: '0%',
        left: '20%',
        w: '55%',
        h: '35%',
        color: 'rgba(246,191,219,0.20)',
        blur: '65px',
      },
    ],
    clouds: [
      { x: 10, y: 8, depth: 0, baseW: 400, travel: 60, dur: 70, delay: 0, opacity: 0.15, desktopOnly: true },
      { x: 80, y: 55, depth: 0, baseW: 360, travel: -55, dur: 75, delay: 15, opacity: 0.13, desktopOnly: true, flipX: true },
      { x: 15, y: 68, depth: 1, baseW: 300, travel: 45, dur: 58, delay: 5, opacity: 0.16, desktopOnly: true },
      { x: 85, y: 15, depth: 1, baseW: 260, travel: -40, dur: 64, delay: 20, opacity: 0.14, desktopOnly: true, flipX: true },
      { x: 30, y: 90, depth: 2, baseW: 220, travel: 30, dur: 45, delay: 3, opacity: 0.12 },
    ],
    gridOpacity: 0.4,
  },

  calm: {
    background:
      'linear-gradient(180deg, #F6FBFF 0%, #FBFDFF 80%)',
    glows: [
      {
        top: '-3%',
        left: '-5%',
        w: '30%',
        h: '35%',
        color: 'rgba(147,206,250,0.20)',
        blur: '55px',
      },
    ],
    clouds: [
      { x: 5, y: 10, depth: 0, baseW: 340, travel: 40, dur: 85, delay: 0, opacity: 0.08, desktopOnly: true },
      { x: 95, y: 50, depth: 0, baseW: 300, travel: -35, dur: 90, delay: 25, opacity: 0.07, desktopOnly: true, flipX: true },
      { x: 8, y: 70, depth: 1, baseW: 240, travel: 30, dur: 65, delay: 12, opacity: 0.10, desktopOnly: true },
      { x: 92, y: 15, depth: 1, baseW: 220, travel: -28, dur: 70, delay: 35, opacity: 0.09, desktopOnly: true, flipX: true },
    ],
    gridOpacity: 0.15,
  },

  sunset: {
    background:
      'linear-gradient(180deg, #16386E 0%, #123056 55%, #0C2145 100%)',
    glows: [
      {
        top: '-15%',
        left: '0%',
        w: '50%',
        h: '60%',
        color: 'rgba(231,195,77,0.22)',
        blur: '80px',
      },
      {
        bottom: '-10%',
        right: '0%',
        w: '45%',
        h: '50%',
        color: 'rgba(246,191,219,0.18)',
        blur: '85px',
      },
    ],
    clouds: [
      { x: 20, y: 12, depth: 0, baseW: 400, travel: 70, dur: 65, delay: 0, opacity: 0.18, desktopOnly: true },
      { x: 80, y: 58, depth: 0, baseW: 360, travel: -60, dur: 70, delay: 10, opacity: 0.16, desktopOnly: true, flipX: true },
      { x: 25, y: 75, depth: 1, baseW: 320, travel: 50, dur: 55, delay: 5, opacity: 0.20, desktopOnly: true },
      { x: 75, y: 22, depth: 1, baseW: 280, travel: -45, dur: 60, delay: 20, opacity: 0.18, desktopOnly: true, flipX: true },
    ],
    gridOpacity: 0.5,
  },
};

export const getSkyBackground = (variant: SkyVariant): string => {
  return VARIANTS[variant].background;
};