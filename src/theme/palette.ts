/**
 * PICC 2026 — Public Color System
 *
 * Unified around:
 * - PTIT red as the primary brand/action color
 * - PTIT navy as the reading/supporting color
 * - warm homeland yellow as a restrained accent
 * - soft neutral/sky-tinted surfaces for calm section transitions
 */

export const piccColors = {
  /* Light atmospheric support — only for soft surfaces/backgrounds */
  sky: {
    50: '#FBFCFE',
    100: '#F4F7FB',
    200: '#E6EDF6',
    300: '#D2DDED',
    400: '#B4C4DB',
    500: '#8EA4C3',
    600: '#6D87A7',
    700: '#516987',
  },

  /* Structural blue is now a navy-led support ramp, not a competing hero hue */
  blue: {
    50: '#F3F6FB',
    100: '#E7EDF6',
    200: '#D4DFED',
    300: '#B4C6DE',
    400: '#8EA9C8',
    500: '#5E7FA9',
    600: '#35547E',
    700: '#1F3C63',
    800: '#163150',
    900: '#0F2742',
  },

  /* Keep the API/key name for compatibility, but tune it toward soft PTIT rose-red */
  pink: {
    50: '#FFF5F5',
    100: '#FFE9E9',
    200: '#FFD4D4',
    300: '#FFB8B8',
    400: '#FF8D8D',
    500: '#F26666',
    600: '#D94343',
    700: '#B72A2A',
    800: '#8F1D1D',
  },

  /* Warm homeland yellow */
  yellow: {
    50: '#FFF9EC',
    100: '#FFF1CF',
    200: '#F8DF97',
    300: '#EFCB63',
    400: '#E1B44C',
    500: '#C99A39',
    600: '#A67B27',
    700: '#7F5D1B',
  },

  amber: {
    50: '#FFF8E8',
    100: '#FCEFC8',
    200: '#F3DA8A',
    300: '#E7C34D',
    400: '#D5AC3D',
    500: '#BC912D',
    600: '#996F1F',
    700: '#745216',
    800: '#583D10',
    900: '#3E2B0A',
  },

  neutral: {
    50: '#FCFCFD',
    100: '#F5F6F8',
    200: '#E8EAEE',
    300: '#D6D9DE',
    400: '#B8BCC4',
    500: '#8A909A',
    600: '#666C76',
    700: '#4A5059',
    800: '#2F333A',
    900: '#171A1F',
  },

  slate: {
    50: '#F8F9FB',
    100: '#F0F3F7',
    200: '#DFE6EF',
    300: '#C7D0DB',
    400: '#97A4B3',
    500: '#687689',
    600: '#4B5C72',
    700: '#34465E',
    800: '#223449',
    900: '#132338',
  },

  /* Keep compatibility for existing imports, but make it a muted navy bridge */
  indigo: {
    50: '#F4F6FB',
    100: '#E9EDF7',
    200: '#D5DCEF',
    300: '#B8C3E0',
    400: '#92A4C9',
    500: '#6E84B1',
    600: '#4A638F',
    700: '#32486C',
    800: '#223554',
    900: '#16243B',
  },

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

  red: {
    50: '#FFF1F1',
    100: '#FFE0E0',
    200: '#FFC2C2',
    300: '#FF9B9B',
    400: '#FF6B6B',
    500: '#FF1F1F',
    600: '#E11414',
    700: '#B91212',
    800: '#8E1010',
  },

  green: '#10B981',
  success: '#177245',
  danger: '#B91212',
  warning: '#7F5D1B',

  ptitRedVivid: '#FF1F1F',
  ptitRed: '#E11414',
  ptitDarkRed: '#B91212',
  ptitNavy: '#0F2A52',
  ink: '#0F2A52',
  surface: '#FFFFFF',

  semantic: {
    page: '#FBFCFE',
    pageWarm: '#FCFAF7',
    surface: '#FFFFFF',
    surfaceSubtle: '#F7F9FC',
    surfaceWarm: '#FFF9F1',
    surfaceGlass: 'rgba(255,255,255,0.9)',
    text: '#0F2A52',
    textMuted: '#4B5C72',
    border: '#DFE6EF',
    borderStrong: '#C7D0DB',
    focus: '#E11414',
    action: '#E11414',
    actionHover: '#B91212',
    award: '#7F5D1B',
    footer: '#0C2145',
    footerSoft: '#15325F',
  },
};

export const rgbChannels = {
  skyMain: '210, 221, 237',
  blueAccent: '53, 84, 126',
  bluePeri: '180, 198, 222',
  pink: '242, 102, 102',
  sun: '239, 203, 99',
  gold: '231, 195, 77',
  red: '255, 31, 31',
  navy: '15, 42, 82',
};

export const gradientMesh = {
  hero: `radial-gradient(ellipse 80% 58% at 50% -18%, rgba(${rgbChannels.skyMain},0.36), transparent), radial-gradient(ellipse 48% 42% at 84% 22%, rgba(${rgbChannels.red},0.10), transparent), radial-gradient(ellipse 42% 36% at 16% 76%, rgba(${rgbChannels.sun},0.12), transparent)`,
  cta: `linear-gradient(135deg, ${piccColors.ptitNavy} 0%, ${piccColors.blue[700]} 55%, ${piccColors.blue[500]} 100%)`,
  ptitCta: `linear-gradient(135deg, ${piccColors.ptitRed} 0%, ${piccColors.ptitDarkRed} 100%)`,
  accent: `linear-gradient(135deg, ${piccColors.red[500]} 0%, ${piccColors.red[700]} 100%)`,
  brandWash: `linear-gradient(120deg, rgba(${rgbChannels.navy},0.05) 0%, rgba(${rgbChannels.red},0.08) 48%, rgba(${rgbChannels.sun},0.18) 100%)`,
  sunrise: `linear-gradient(135deg, ${piccColors.yellow[100]} 0%, ${piccColors.amber[300]} 100%)`,
  heroSimple: `linear-gradient(180deg, ${piccColors.semantic.page} 0%, ${piccColors.surface} 100%)`,
  heroGlow: `radial-gradient(circle at 50% 0%, rgba(${rgbChannels.red},0.14), transparent 58%)`,
};
