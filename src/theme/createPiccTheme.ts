import { createTheme } from '@mui/material/styles';
import { gradientMesh, piccColors } from './palette';

declare module '@mui/material/styles' {
  interface Theme {
    piccColors: typeof piccColors;
  }
  interface ThemeOptions {
    piccColors?: typeof piccColors;
  }
}

const typography = {
  fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
  h1: {
    fontFamily: '"Plus Jakarta Sans", "Inter", system-ui, sans-serif',
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
    fontFamily: '"Plus Jakarta Sans", "Inter", system-ui, sans-serif',
    fontSize: '1.75rem',
    lineHeight: 1.15,
    fontWeight: 700,
    letterSpacing: '-0.02em',
    '@media (min-width: 900px)': {
      fontSize: '2.5rem',
      lineHeight: 1.1,
    },
  },
  h3: {
    fontFamily: '"Plus Jakarta Sans", "Inter", system-ui, sans-serif',
    fontSize: '1.25rem',
    lineHeight: 1.25,
    fontWeight: 700,
    letterSpacing: '-0.01em',
    '@media (min-width: 900px)': {
      fontSize: '1.45rem',
    },
  },
  body1: {
    fontSize: '0.975rem',
    lineHeight: 1.65,
    fontWeight: 400,
    '@media (min-width: 900px)': {
      fontSize: '1rem',
      lineHeight: 1.7,
    },
  },
  body2: {
    fontSize: '0.875rem',
    lineHeight: 1.55,
  },
  button: {
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
      primary: { main: piccColors.ptitRed, light: '#D34A4A', dark: piccColors.ptitDarkRed },
      secondary: { main: piccColors.blue[700], light: piccColors.blue[500], dark: piccColors.blue[900] },
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
      '0px 1px 2px rgba(23,59,102,0.05)',
      '0px 1px 3px rgba(23,59,102,0.06), 0px 1px 2px rgba(23,59,102,0.04)',
      '0px 4px 6px rgba(23,59,102,0.05), 0px 2px 4px rgba(23,59,102,0.04)',
      '0 16px 40px rgba(23,59,102,0.12)',
      '0 20px 48px rgba(23,59,102,0.18)',
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
          html: {
            scrollBehavior: 'smooth',
            '--site-header-height': '64px',
            '--mobile-sticky-cta-clearance': '88px',
            scrollPaddingTop: 'calc(var(--site-header-height) + 12px)',
            '@media (min-width: 900px)': {
              '--site-header-height': '98px',
            },
          },
          body: {
            fontSynthesis: 'none',
          },
          'section[id], div[id]': {
            scrollMarginTop: 'calc(var(--site-header-height) + 12px)',
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
            transition: 'background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
            '&.Mui-focusVisible': {
              outline: `3px solid ${piccColors.ptitRed}`,
              outlineOffset: 2,
            },
          },
          containedPrimary: {
            background: gradientMesh.ptitCta,
            boxShadow: '0 4px 14px rgba(188,38,38,0.3)',
            '&:hover': {
              background: `linear-gradient(135deg, ${piccColors.ptitDarkRed}, #821414)`,
              boxShadow: '0 6px 20px rgba(188,38,38,0.4)',
            },
          },
          containedSecondary: {
            background: `linear-gradient(135deg, ${piccColors.pink[500]}, ${piccColors.pink[400]})`,
            color: '#FFFFFF',
            '&:hover': {
              background: `linear-gradient(135deg, ${piccColors.pink[600]}, ${piccColors.pink[500]})`,
            },
          },
          outlined: {
            borderColor: piccColors.neutral[300],
            color: piccColors.neutral[700],
            borderWidth: '1.5px',
            '&:hover': {
              borderColor: piccColors.blue[500],
              color: piccColors.blue[700],
              background: piccColors.blue[50],
              borderWidth: '1.5px',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 24,
            boxShadow: '0 1px 3px rgba(23,59,102,0.06), 0 1px 2px rgba(23,59,102,0.04)',
            border: `1px solid ${piccColors.neutral[200]}`,
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
                borderColor: piccColors.blue[400],
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: piccColors.blue[700],
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
            border: `1px solid ${piccColors.neutral[200]}`,
            marginBottom: 12,
            overflow: 'hidden',
            '&.Mui-expanded': {
              margin: '0 0 12px',
              borderColor: piccColors.blue[300],
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
              backgroundColor: piccColors.blue[50],
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            fontWeight: 600,
          },
        },
      },
    },
  });
