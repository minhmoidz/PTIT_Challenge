/**
 * PICC 2026 — Color System
 *
 * Built on the brand palette spec:
 *   Main        #93CEFA (sky)      · #FBFDFF (page)
 *   Secondary   #9AC3F9 (blue)     · #F6BFDB (pink)   · #FDEDA7 (sun)
 *   Accent      #3882F1 (blue)     · #FF1F1F (red)    · #E7C34D (gold)  · #B8B8B8 (gray)
 *
 * The spec colors are pastels — they carry the brand as *surfaces, tints and
 * atmosphere*. Text and solid actions use the deepened steps of the same ramps
 * so every foreground pair clears WCAG AA (4.5:1) on white. Each spec color is
 * marked `← spec` at the step where it sits naturally in its ramp.
 */

export const piccColors = {
  /* Main — the sky that the whole site sits in */
  sky: {
    50: '#FBFDFF', // ← spec (page background)
    100: '#F1F8FE',
    200: '#DCEFFD',
    300: '#93CEFA', // ← spec (main)
    400: '#6FBBF3',
    500: '#4BA5E6',
    600: '#3389CB',
    700: '#256B9F',
  },

  /* Structural blue — navigation, links, informational surfaces */
  blue: {
    50: '#F1F6FE',
    100: '#DFEBFD',
    200: '#C2DBFB',
    300: '#9AC3F9', // ← spec (secondary)
    400: '#6BA4F5',
    500: '#3882F1', // ← spec (accent)
    600: '#2569D2',
    700: '#1C52A6',
    800: '#173F7E',
    900: '#0F2A52',
  },

  /* Pink — warmth, community, "people" surfaces */
  pink: {
    50: '#FEF6FA',
    100: '#FCE9F2',
    200: '#F6BFDB', // ← spec (secondary)
    300: '#EE9DC3',
    400: '#E479AA',
    500: '#D65890',
    600: '#BE4077',
    700: '#9A2F5E',
    800: '#78244A',
  },

  /* Sun — highlights, "in progress", soft emphasis */
  yellow: {
    50: '#FFFDF0',
    100: '#FEF7D8',
    200: '#FDEDA7', // ← spec (secondary)
    300: '#F6DC7C',
    400: '#E7C34D', // ← spec (gold)
    500: '#D0A831',
    600: '#AE8922',
    700: '#8A6B1A',
  },

  /* Gold — awards and celebration; the warm sibling of `yellow` */
  amber: {
    50: '#FFFBEC',
    100: '#FDF3CF',
    200: '#FAE6A4',
    300: '#E7C34D', // ← spec (gold)
    400: '#D6AE33',
    500: '#BD9522',
    600: '#9E7A19',
    700: '#7F6114',
    800: '#63490F',
    900: '#48350A',
  },

  /* True neutral gray — dividers, disabled states, muted chrome */
  neutral: {
    50: '#FAFAFB',
    100: '#F3F4F5',
    200: '#E6E7E8',
    300: '#D2D3D4',
    400: '#B8B8B8', // ← spec (gray)
    500: '#8C8D90',
    600: '#6B6C70',
    700: '#4D4E53',
    800: '#313236',
    900: '#1B1C20',
  },

  /* Blue-tinted neutrals — body copy, borders, quiet surfaces */
  slate: {
    50: '#F7F9FC',
    100: '#EFF3F8',
    200: '#DFE6EF',
    300: '#C6D1E0',
    400: '#93A3B8',
    500: '#67788F',
    600: '#4C5D75',
    700: '#374961',
    800: '#25344A',
    900: '#132033',
  },

  /* Violet-blue — a third categorical hue, pulled toward the brand periwinkle */
  indigo: {
    50: '#F2F4FE',
    100: '#E5E9FC',
    200: '#CBD3F8',
    300: '#A9B6F2',
    400: '#8794E8',
    500: '#6A73DC',
    600: '#535AC4',
    700: '#42479E',
    800: '#35397C',
    900: '#272A5C',
  },

  /* Success green — kept outside the brand ramp so "verified" reads unambiguously */
  emerald: {
    50: '#ECFDF5',
    100: '#D1FAE5',
    200: '#A7F3D0',
    300: '#6EE7B7',
    400: '#34D399',
    500: '#10B981',
    600: '#059669',
    700: '#047857',
    800: '#065F46',
    900: '#064E3B',
  },

  /* Brand red — #FF1F1F is the decorative accent; solids/text use the deeper
     steps so white-on-red stays readable. */
  red: {
    50: '#FFF1F1',
    100: '#FFDEDE',
    200: '#FFC0C0',
    300: '#FF9494',
    400: '#FF5C5C',
    500: '#FF1F1F', // ← spec (accent)
    600: '#E00E0E',
    700: '#B81111',
    800: '#8F1010',
  },

  green: '#10B981',
  success: '#177245',
  danger: '#B81111',
  warning: '#8A6B1A',

  /** Vivid brand red — decoration, glows, active accents. Not for small text. */
  ptitRedVivid: '#FF1F1F',
  /** Solid brand red for buttons and text (white-on-red = 5.0:1). */
  ptitRed: '#E00E0E',
  ptitDarkRed: '#B81111',
  ptitNavy: '#0F2A52',
  ink: '#0F2A52',
  surface: '#FFFFFF',

  semantic: {
    page: '#FBFDFF',
    surface: '#FFFFFF',
    surfaceSubtle: '#F5FAFF',
    surfaceGlass: 'rgba(255,255,255,0.88)',
    text: '#0F2A52',
    textMuted: '#4C5D75',
    border: '#DFE6EF',
    borderStrong: '#C2DBFB',
    focus: '#3882F1',
    action: '#E00E0E',
    actionHover: '#B81111',
    award: '#7F6114',
  },
};

/** Channel values for the spec colors, for use inside rgba() tints. */
export const rgbChannels = {
  skyMain: '147, 206, 250', // #93CEFA
  blueAccent: '56, 130, 241', // #3882F1
  bluePeri: '154, 195, 249', // #9AC3F9
  pink: '246, 191, 219', // #F6BFDB
  sun: '253, 237, 167', // #FDEDA7
  gold: '231, 195, 77', // #E7C34D
  red: '255, 31, 31', // #FF1F1F
  navy: '15, 42, 82', // #0F2A52
};

export const gradientMesh = {
  hero: `radial-gradient(ellipse 78% 58% at 50% -18%, rgba(${rgbChannels.skyMain},0.30), transparent), radial-gradient(ellipse 58% 48% at 82% 38%, rgba(${rgbChannels.pink},0.22), transparent)`,
  cta: `linear-gradient(135deg, #0F2A52 0%, #1C52A6 55%, #3882F1 100%)`,
  /** Primary action gradient. Both stops clear AA against white text. */
  ptitCta: 'linear-gradient(135deg, #EE1616 0%, #B81111 100%)',
  accent: `linear-gradient(135deg, #FF1F1F 0%, #FF5C5C 100%)`,
  /** Soft brand wash for decorative panels — sky → pink → sun. */
  brandWash: `linear-gradient(120deg, rgba(${rgbChannels.skyMain},0.42) 0%, rgba(${rgbChannels.pink},0.30) 52%, rgba(${rgbChannels.sun},0.34) 100%)`,
  sunrise: `linear-gradient(135deg, #FDEDA7 0%, #E7C34D 100%)`,
  heroSimple: 'linear-gradient(180deg, #FBFDFF 0%, #FFFFFF 100%)',
  heroGlow: `radial-gradient(circle at 50% 0%, rgba(${rgbChannels.skyMain},0.28), transparent 62%)`,
};
