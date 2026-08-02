/**
 * Section surfaces.
 *
 * The page is deliberately quiet: white is the default, with two tinted bands
 * used sparingly to mark structure. Colour is spent on the brand red — the
 * header rule, the buttons and the footer — not on the backgrounds, so the
 * content stays the thing you look at.
 *
 * The decorative layers this file used to carry (drifting clouds, blurred
 * colour glows, a dot grid) were removed; `SkyBackground` now renders nothing
 * and stays only so sections can keep calling it while the markup is tidied up.
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

const surface = (background: string): SkyVariantConfig => ({
  background,
  glows: [],
  clouds: [],
  gridOpacity: 0,
});

export const VARIANTS: Record<SkyVariant, SkyVariantConfig> = {
  /** Hero — a barely-there warm wash that settles into white. */
  hero: surface('linear-gradient(180deg, #FCFAF7 0%, #FFFFFF 78%)'),

  /** The default page surface. */
  clear: surface('#FFFFFF'),

  /** Timeline — a quiet grey band so a long section reads as one block. */
  journey: surface('#F8F9FB'),

  /** Awards — the one warm moment on the page. */
  celebration: surface('#FFF9EC'),

  /** A whisper of cool tint, for sections that sit between two white ones. */
  calm: surface('#FBFCFE'),

  /** Dark surface, kept for compatibility. The footer paints its own red. */
  sunset: surface('#0C2145'),
};

export const getSkyBackground = (variant: SkyVariant): string => {
  return VARIANTS[variant].background;
};
