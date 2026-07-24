import { createTheme } from '@mui/material/styles';
import { piccColors } from './palette';

declare module '@mui/material/styles' {
  interface Theme {
    piccColors: typeof piccColors;
  }
  interface ThemeOptions {
    piccColors?: typeof piccColors;
  }
  interface TypeShadow {
    soft: string;
    hover: string;
  }
  interface Shadows {
    soft: string;
    hover: string;
  }
}

const typography = {
  fontFamily: '"Nunito", "Inter", system-ui, -apple-system, sans-serif',
  h1: {
    fontFamily: '"Fredoka", "Inter", system-ui, sans-serif',
    fontSize: '2.5rem',
    lineHeight: 1.08,
    fontWeight: 800,
    letterSpacing: '-0.02em',
    '@media (min-width: 900px)': {
      fontSize: '3.75rem',
      lineHeight: 1.05,
    },
  },
  h2: {
    fontFamily: '"Fredoka", "Inter", system-ui, sans-serif',
    fontSize: '1.85rem',
    lineHeight: 1.15,
    fontWeight: 750,
    letterSpacing: '-0.015em',
    '@media (min-width: 900px)': {
      fontSize: '2.75rem',
      lineHeight: 1.1,
    },
  },
  h3: {
    fontFamily: '"Fredoka", "Inter", system-ui, sans-serif',
    fontSize: '1.25rem',
    lineHeight: 1.25,
    fontWeight: 700,
    '@media (min-width: 900px)': {
      fontSize: '1.5rem',
    },
  },
  body1: {
    fontSize: '1rem',
    lineHeight: 1.65,
    fontWeight: 400,
    '@media (min-width: 900px)': {
      lineHeight: 1.7,
    },
  },
  body2: {
    fontSize: '0.925rem',
    lineHeight: 1.6,
    fontWeight: 400,
  },
  button: {
    fontSize: '0.95rem',
    fontWeight: 700,
    lineHeight: 1,
    textTransform: 'none' as const,
  },
};

export const createPiccTheme = () =>
  createTheme({
    piccColors,
    palette: {
      primary: { main: piccColors.blue[700], light: piccColors.blue[500], dark: piccColors.blue[900] },
      secondary: { main: piccColors.pink[500], light: piccColors.pink[300], dark: piccColors.pink[700] },
      background: { default: piccColors.sky[50], paper: piccColors.surface },
      text: { primary: piccColors.ink, secondary: '#46637E' },
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
      '0px 2px 4px rgba(23,59,102,0.06)',
      '0px 4px 8px rgba(23,59,102,0.08)',
      '0px 8px 16px rgba(23,59,102,0.1)',
      '0 16px 40px rgba(23,59,102,0.12)',
      '0 20px 48px rgba(23,59,102,0.18)',
      ...Array(19).fill('0px 0px 0px rgba(0,0,0,0)'),
    ] as unknown as [
      'none',
      string,
      string,
      string,
      string,
      string,
      ...string[],
    ],
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 999,
            padding: '12px 26px',
            boxShadow: 'none',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              boxShadow: '0 8px 20px rgba(36, 95, 168, 0.25)',
              transform: 'translateY(-1px)',
            },
          },
          containedPrimary: {
            background: `linear-gradient(135deg, ${piccColors.blue[700]}, ${piccColors.blue[500]})`,
            '&:hover': {
              background: `linear-gradient(135deg, ${piccColors.blue[900]}, ${piccColors.blue[700]})`,
            },
          },
          containedSecondary: {
            background: `linear-gradient(135deg, ${piccColors.pink[500]}, ${piccColors.pink[700]})`,
            color: '#FFFFFF',
            '&:hover': {
              background: piccColors.pink[700],
            },
          },
          outlined: {
            borderColor: piccColors.blue[700],
            color: piccColors.blue[700],
            borderWidth: '1.5px',
            '&:hover': {
              borderWidth: '1.5px',
              borderColor: piccColors.blue[500],
              background: piccColors.sky[100],
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 24,
            boxShadow: 'inset -2px -2px 8px rgba(255,255,255,0.6), 8px 8px 24px rgba(23,59,102,0.1)',
            border: `1px solid ${piccColors.sky[200]}`,
            background: '#FFFFFF',
            transition: 'transform 0.2s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.2s cubic-bezier(0.22, 1, 0.36, 1)',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: 'inset -2px -2px 8px rgba(255,255,255,0.6), 12px 12px 32px rgba(23,59,102,0.18)',
            },
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
                borderColor: piccColors.blue[500],
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
            boxShadow: '0 4px 14px rgba(23,59,102,0.05)',
            '&:before': { display: 'none' },
            borderRadius: '16px !important',
            border: `1px solid ${piccColors.sky[200]}`,
            marginBottom: 12,
            overflow: 'hidden',
            transition: 'border-color 0.2s ease-in-out',
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
              backgroundColor: piccColors.sky[50],
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
      MuiAlert: {
        styleOverrides: {
          root: {
            borderRadius: 14,
          },
        },
      },
    },
  });
