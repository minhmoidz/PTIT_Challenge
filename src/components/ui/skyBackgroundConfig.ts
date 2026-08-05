/**
 * Section surfaces.
 *
 * Two supplied colour-swab images give the site its background:
 *   - maunen2.jpg  a soft sky-blue vertical gradient — painted once on the
 *     page layout (`LandingLayout`) so it runs seamlessly under everything
 *   - maunen1.jpg  a blue-to-pink pastel gradient — reserved for the Hero band
 *
 * The `clear` / `journey` / `celebration` / `calm` surfaces are left
 * transparent so the layout's single maunen2 layer shows through the whole page
 * without seams where full-width sections abut. Each image keeps a flat colour
 * fallback for the moment before it loads.
 */

import { assetPath } from '@/config/paths';

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
  /** Number of floating light motes drifting upward across the surface. */
  particles: number;
}

export const VARIANTS: Record<SkyVariant, SkyVariantConfig> = {
  /**
   * Hero — vibrant pastel mesh combining maunen1.jpg with warm PTIT Red,
   * Golden Amber & Sky Blue atmospheric glows.
   */
  hero: {
    background: `linear-gradient(135deg, rgba(235, 243, 255, 0.32) 0%, rgba(255, 235, 238, 0.34) 45%, rgba(254, 243, 199, 0.26) 100%), url(${assetPath('maunen1.jpg')}) no-repeat center / cover`,
    glows: [
      {
        top: '-12%',
        right: '-5%',
        w: '680px',
        h: '680px',
        color: 'radial-gradient(circle, rgba(225, 20, 20, 0.12) 0%, rgba(255, 182, 193, 0.08) 45%, transparent 70%)',
        blur: '60px',
      },
      {
        top: '10%',
        left: '-8%',
        w: '580px',
        h: '580px',
        color: 'radial-gradient(circle, rgba(245, 158, 11, 0.12) 0%, rgba(251, 191, 36, 0.06) 50%, transparent 70%)',
        blur: '50px',
      },
      {
        bottom: '-5%',
        left: '25%',
        w: '750px',
        h: '450px',
        color: 'radial-gradient(circle, rgba(56, 130, 241, 0.1) 0%, rgba(147, 197, 253, 0.06) 55%, transparent 70%)',
        blur: '70px',
      },
    ],
    clouds: [
      { x: 5, y: 12, depth: 0, baseW: 160, travel: 40, dur: 28, delay: 0, opacity: 0.55 },
      { x: 72, y: 18, depth: 1, baseW: 210, travel: -35, dur: 34, delay: 4, opacity: 0.6, flipX: true },
      { x: 40, y: 65, depth: 2, baseW: 260, travel: 50, dur: 40, delay: 2, opacity: 0.7, desktopOnly: true },
    ],
    gridOpacity: 0.3,
    particles: 9,
  },

  /**
   * Clear — Introduction & Rules sections with warm red & blue atmospheric light fields.
   */
  clear: {
    background: `linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(240, 247, 255, 0.3) 50%, rgba(255, 245, 245, 0.18) 100%), url(${assetPath('maunen2.jpg')}) no-repeat center / cover`,
    glows: [
      {
        top: '15%',
        left: '-6%',
        w: '550px',
        h: '550px',
        color: 'radial-gradient(circle, rgba(225, 20, 20, 0.08) 0%, transparent 70%)',
        blur: '55px',
      },
      {
        bottom: '10%',
        right: '-6%',
        w: '600px',
        h: '600px',
        color: 'radial-gradient(circle, rgba(56, 130, 241, 0.1) 0%, transparent 70%)',
        blur: '60px',
      },
    ],
    clouds: [
      { x: 80, y: 25, depth: 0, baseW: 180, travel: -30, dur: 32, delay: 1, opacity: 0.45 },
      { x: 12, y: 60, depth: 1, baseW: 220, travel: 45, dur: 38, delay: 5, opacity: 0.55, desktopOnly: true },
    ],
    gridOpacity: 0.22,
    particles: 6,
  },

  /**
   * Journey — Timeline section with atmospheric deep indigo & rose glows.
   */
  journey: {
    background: `linear-gradient(180deg, rgba(228, 240, 254, 0.55) 0%, rgba(232, 238, 255, 0.5) 50%, rgba(241, 244, 255, 0.55) 100%), url(${assetPath('maunen2.jpg')}) no-repeat center / cover`,
    glows: [
      {
        top: '20%',
        left: '-10%',
        w: '650px',
        h: '650px',
        color: 'radial-gradient(circle, rgba(79, 70, 229, 0.1) 0%, rgba(99, 102, 241, 0.05) 50%, transparent 70%)',
        blur: '60px',
      },
      {
        bottom: '20%',
        right: '-10%',
        w: '600px',
        h: '600px',
        color: 'radial-gradient(circle, rgba(225, 20, 20, 0.09) 0%, rgba(244, 63, 94, 0.05) 50%, transparent 70%)',
        blur: '60px',
      },
    ],
    clouds: [
      { x: 15, y: 20, depth: 1, baseW: 190, travel: 35, dur: 36, delay: 0, opacity: 0.5 },
      { x: 65, y: 55, depth: 0, baseW: 170, travel: -25, dur: 30, delay: 3, opacity: 0.4 },
    ],
    gridOpacity: 0.26,
    particles: 7,
  },

  /**
   * Celebration — Awards section with rich Golden Champion & Crimson lighting.
   */
  celebration: {
    background: `linear-gradient(135deg, rgba(254, 243, 199, 0.42) 0%, rgba(255, 237, 213, 0.35) 40%, rgba(255, 228, 230, 0.4) 100%), url(${assetPath('maunen1.jpg')}) no-repeat center / cover`,
    glows: [
      {
        top: '10%',
        left: '25%',
        w: '750px',
        h: '550px',
        color: 'radial-gradient(circle, rgba(245, 158, 11, 0.14) 0%, rgba(251, 191, 36, 0.08) 55%, transparent 75%)',
        blur: '50px',
      },
      {
        bottom: '-5%',
        right: '5%',
        w: '600px',
        h: '600px',
        color: 'radial-gradient(circle, rgba(225, 20, 20, 0.1) 0%, transparent 70%)',
        blur: '55px',
      },
      {
        top: '40%',
        left: '-5%',
        w: '500px',
        h: '500px',
        color: 'radial-gradient(circle, rgba(234, 179, 8, 0.1) 0%, transparent 70%)',
        blur: '45px',
      },
    ],
    clouds: [
      { x: 8, y: 15, depth: 2, baseW: 240, travel: 40, dur: 35, delay: 2, opacity: 0.6 },
      { x: 75, y: 60, depth: 1, baseW: 200, travel: -30, dur: 32, delay: 0, opacity: 0.5, flipX: true },
    ],
    gridOpacity: 0.28,
    particles: 8,
  },

  /**
   * Calm — Quiet sky atmosphere for FAQ and team details.
   */
  calm: {
    background: `linear-gradient(180deg, rgba(255, 255, 255, 0.45) 0%, rgba(241, 245, 249, 0.5) 100%), url(${assetPath('maunen2.jpg')}) no-repeat center / cover`,
    glows: [
      {
        top: '20%',
        right: '10%',
        w: '500px',
        h: '500px',
        color: 'radial-gradient(circle, rgba(56, 130, 241, 0.08) 0%, transparent 70%)',
        blur: '50px',
      },
    ],
    clouds: [
      { x: 50, y: 30, depth: 0, baseW: 160, travel: 25, dur: 30, delay: 1, opacity: 0.4 },
    ],
    gridOpacity: 0.16,
    particles: 4,
  },

  /**
   * Sunset — Footer section with deep dusk navy & glowing horizon.
   */
  sunset: {
    background: 'linear-gradient(180deg, #091A36 0%, #0F2A52 60%, #1A0E2E 100%)',
    glows: [
      {
        top: '0%',
        left: '30%',
        w: '700px',
        h: '350px',
        color: 'radial-gradient(circle, rgba(225, 20, 20, 0.25) 0%, rgba(245, 158, 11, 0.15) 50%, transparent 75%)',
        blur: '60px',
      },
    ],
    clouds: [],
    gridOpacity: 0.2,
    particles: 5,
  },
};

export const getSkyBackground = (variant: SkyVariant): string => {
  return VARIANTS[variant].background;
};


