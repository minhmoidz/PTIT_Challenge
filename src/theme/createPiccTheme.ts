import { createTheme } from '@mui/material/styles';
import { gradientMesh, piccColors, rgbChannels } from './palette';

declare module '@mui/material/styles' {
  interface Theme {
    piccColors: typeof piccColors;
  }
  interface ThemeOptions {
    piccColors?: typeof piccColors;
  }
}

const typography = {
  fontFamily: '"Manrope", "Inter", system-ui, -apple-system, sans-serif',
  h1: {
    fontFamily: '"Manrope", "Inter", system-ui, sans-serif',
    fontSize: '2.25rem',
    lineHeight: 1.08,
    fontWeight: 800,
    letterSpacing: '-0.03em',
    '@media (min-width: 900px)': {
      fontSize: '3.5rem',
      lineHeight: 1.05,
    },
  },
  h2: {
    fontFamily: '"Manrope", "Inter", system-ui, sans-serif',
    fontSize: '2rem',
    lineHeight: 1.15,
    fontWeight: 800,
    letterSpacing: '-0.02em',
    '@media (min-width: 900px)': {
      fontSize: '2.8rem',
      lineHeight: 1.12,
    },
  },
  h3: {
    fontFamily: '"Manrope", "Inter", system-ui, sans-serif',
    fontSize: '1.25rem',
    lineHeight: 1.25,
    fontWeight: 700,
    letterSpacing: '-0.01em',
    '@media (min-width: 900px)': {
      fontSize: '1.45rem',
    },
  },
  body1: {
    fontFamily: '"Manrope", "Inter", system-ui, sans-serif',
    fontSize: '0.975rem',
    lineHeight: 1.65,
    fontWeight: 400,
    '@media (min-width: 900px)': {
      fontSize: '1rem',
      lineHeight: 1.7,
    },
  },
  body2: {
    fontFamily: '"Manrope", "Inter", system-ui, sans-serif',
    fontSize: '0.875rem',
    lineHeight: 1.55,
  },
  button: {
    fontFamily: '"Manrope", "Inter", system-ui, sans-serif',
    fontSize: '0.925rem',
    fontWeight: 700,
    lineHeight: 1,
    textTransform: 'none' as const,
  },
};

export const createPiccTheme = () =>
  createTheme({
    piccColors,
    palette: {
      primary: { main: piccColors.ptitRed, light: piccColors.red[400], dark: piccColors.ptitDarkRed },
      secondary: { main: piccColors.blue[600], light: piccColors.blue[400], dark: piccColors.blue[800] },
      background: { default: piccColors.semantic.page, paper: piccColors.surface },
      text: { primary: piccColors.semantic.text, secondary: piccColors.semantic.textMuted },
      success: { main: piccColors.success },
      error: { main: piccColors.danger },
      warning: { main: piccColors.warning },
    },
    typography,
    shape: { borderRadius: 14 },
    breakpoints: {
      values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
    },
    spacing: 8,
    shadows: [
      'none',
      '0px 1px 2px rgba(15,42,82,0.05)',
      '0px 1px 3px rgba(15,42,82,0.06), 0px 1px 2px rgba(15,42,82,0.04)',
      '0px 4px 6px rgba(15,42,82,0.05), 0px 2px 4px rgba(15,42,82,0.04)',
      '0 16px 40px rgba(15,42,82,0.12)',
      '0 20px 48px rgba(15,42,82,0.18)',
      '0px 0px 0px rgba(0,0,0,0)',
      '0px 0px 0px rgba(0,0,0,0)',
      '0px 0px 0px rgba(0,0,0,0)',
      '0px 0px 0px rgba(0,0,0,0)',
      '0px 0px 0px rgba(0,0,0,0)',
      '0px 0px 0px rgba(0,0,0,0)',
      '0px 0px 0px rgba(0,0,0,0)',
      '0px 0px 0px rgba(0,0,0,0)',
      '0px 0px 0px rgba(0,0,0,0)',
      '0px 0px 0px rgba(0,0,0,0)',
      '0px 0px 0px rgba(0,0,0,0)',
      '0px 0px 0px rgba(0,0,0,0)',
      '0px 0px 0px rgba(0,0,0,0)',
      '0px 0px 0px rgba(0,0,0,0)',
      '0px 0px 0px rgba(0,0,0,0)',
      '0px 0px 0px rgba(0,0,0,0)',
      '0px 0px 0px rgba(0,0,0,0)',
      '0px 0px 0px rgba(0,0,0,0)',
      '0px 0px 0px rgba(0,0,0,0)',
    ] as [
      'none', string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string,
    ],
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          ':root': {
            '--picc-color-primary': piccColors.ptitRed,
            '--picc-color-primary-dark': piccColors.ptitDarkRed,
            '--picc-color-navy': piccColors.ptitNavy,
            '--picc-color-accent-warm': piccColors.amber[300],
            '--picc-color-page': piccColors.semantic.page,
            '--picc-color-surface': piccColors.surface,
            '--picc-color-surface-subtle': piccColors.semantic.surfaceSubtle,
            '--picc-color-surface-warm': piccColors.semantic.surfaceWarm,
            '--picc-color-border': piccColors.semantic.border,
            '--picc-color-shadow': `rgba(${rgbChannels.navy},0.12)`,
            '--site-header-height': '64px',
            '--site-anchor-offset': 'calc(var(--site-header-height) + 12px)',
          },
          html: {
            scrollBehavior: 'smooth',
            '--mobile-sticky-cta-clearance': '88px',
            scrollPaddingTop: 'var(--site-anchor-offset)',
            scrollbarColor: `${piccColors.sky[300]} ${piccColors.sky[100]}`,
            scrollbarWidth: 'thin',
            '&::-webkit-scrollbar': {
              width: 11,
              height: 11,
            },
            '&::-webkit-scrollbar-track': {
              background: piccColors.sky[100],
            },
            '&::-webkit-scrollbar-thumb': {
              background: piccColors.sky[300],
              borderRadius: 8,
              border: `3px solid ${piccColors.sky[100]}`,
              backgroundClip: 'padding-box',
              '&:hover': {
                background: piccColors.sky[400],
              },
            },
            '@media (min-width: 900px)': {
              '--site-header-height': '98px',
              '--site-anchor-offset': 'calc(var(--site-header-height) + 12px)',
            },
          },
          body: {
            fontSynthesis: 'none',
            textRendering: 'optimizeLegibility',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
          },
          'section[id], div[id]': {
            scrollMarginTop: 'var(--site-anchor-offset)',
          },
          img: {
            maxWidth: '100%',
            display: 'block',
          },
          '::selection': {
            backgroundColor: `rgba(${rgbChannels.skyMain}, 0.45)`,
            color: piccColors.ptitNavy,
          },
          'input::placeholder, textarea::placeholder': {
            color: piccColors.slate[400],
            opacity: 1,
          },
          ':focus-visible': {
            outline: `2px solid rgba(${rgbChannels.blueAccent}, 0.65)`,
            outlineOffset: 2,
          },
          '@media (prefers-reduced-motion: reduce)': {
            html: { scrollBehavior: 'auto' },
            '*, *::before, *::after': {
              animationDuration: '0.01ms !important',
              animationIterationCount: '1 !important',
              scrollBehavior: 'auto !important',
              transitionDuration: '0.01ms !important',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 999,
            padding: '10px 24px',
            boxShadow: 'none',
            transition:
              'background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
            '&.Mui-focusVisible': {
              outline: `3px solid ${piccColors.ptitRedVivid}`,
              outlineOffset: 2,
            },
            '&:active': {
              transform: 'translateY(0) scale(0.98)',
            },
          },
          containedPrimary: {
            background: gradientMesh.ptitCta,
            boxShadow: `0 4px 14px rgba(${rgbChannels.red},0.28)`,
            '&:hover': {
              background: `linear-gradient(135deg, ${piccColors.ptitDarkRed}, ${piccColors.red[800]})`,
              boxShadow: `0 6px 20px rgba(${rgbChannels.red},0.36)`,
            },
          },
          containedSecondary: {
            background: `linear-gradient(135deg, ${piccColors.ptitNavy}, ${piccColors.blue[700]})`,
            color: '#FFFFFF',
            boxShadow: `0 4px 14px rgba(${rgbChannels.navy},0.24)`,
            '&:hover': {
              background: `linear-gradient(135deg, ${piccColors.blue[800]}, ${piccColors.blue[900]})`,
              boxShadow: `0 6px 20px rgba(${rgbChannels.navy},0.32)`,
            },
          },
          outlined: {
            borderColor: piccColors.slate[300],
            color: piccColors.ptitNavy,
            borderWidth: '1.5px',
            '&:hover': {
              borderColor: piccColors.ptitRed,
              color: piccColors.ptitRed,
              background: piccColors.red[50],
              borderWidth: '1.5px',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 20,
            boxShadow: `0 1px 3px rgba(${rgbChannels.navy},0.06), 0 1px 2px rgba(${rgbChannels.navy},0.04)`,
            border: `1px solid ${piccColors.slate[200]}`,
            background: piccColors.surface,
            transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 14,
              backgroundColor: '#FFFFFF',
              transition: 'border-color 0.2s, box-shadow 0.2s',
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: piccColors.blue[300],
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: piccColors.blue[500],
                borderWidth: '2px',
              },
            },
          },
        },
      },
      MuiAccordion: {
        styleOverrides: {
          root: {
            boxShadow: 'none',
            '&:before': { display: 'none' },
            borderRadius: '16px !important',
            border: `1px solid ${piccColors.slate[200]}`,
            marginBottom: 12,
            overflow: 'hidden',
            '&.Mui-expanded': {
              margin: '0 0 12px',
              borderColor: piccColors.red[200],
            },
          },
        },
      },
      MuiAccordionSummary: {
        styleOverrides: {
          root: {
            padding: '8px 20px',
            fontWeight: 600,
            '&.Mui-expanded': {
              backgroundColor: piccColors.red[50],
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            fontWeight: 600,
            color: piccColors.ptitNavy,
          },
        },
      },
    },
  });
