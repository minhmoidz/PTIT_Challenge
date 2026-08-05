/**
 * Admin Design System Tokens
 * PICC Command Center — Production Admin Portal
 */

export const adminColors = {
  // Backgrounds
  bg: '#F4F8FD',
  surface: '#FFFFFF',
  surfaceMuted: '#F7F9FC',
  surfaceHover: '#F1F6FE',

  // Borders
  border: '#DFE6EF',
  borderStrong: '#C6D1E0',

  // Text
  text: '#0F2A52',
  textSecondary: '#374961',
  textMuted: '#67788F',
  textDisabled: '#93A3B8',

  // Brand primary (admin) — the brand accent blue, deepened for AA on white
  primary: '#2569D2',
  primaryHover: '#1C52A6',
  primaryLight: '#F1F6FE',
  primaryBorder: '#C2DBFB',

  // Sidebar
  sidebar: '#0F2A52',
  sidebarHover: '#173F7E',
  sidebarActive: '#2569D2',
  sidebarText: '#9AC3F9',
  sidebarTextActive: '#FFFFFF',
  sidebarBorder: 'rgba(255,255,255,0.08)',

  // Topbar
  topbar: '#FFFFFF',
  topbarBorder: '#DFE6EF',

  // Semantic colors
  success: '#047857',
  successBg: '#ECFDF5',
  successBorder: '#A7F3D0',

  warning: '#8A6B1A',
  warningBg: '#FFFDF0',
  warningBorder: '#F6DC7C',

  danger: '#B81111',
  dangerBg: '#FFF1F1',
  dangerBorder: '#FFC0C0',

  info: '#2569D2',
  infoBg: '#F1F6FE',
  infoBorder: '#C2DBFB',

  // Status badge colors
  status: {
    draft: { bg: '#F7F9FC', text: '#374961', border: '#C6D1E0' },
    submitted: { bg: '#F1F6FE', text: '#2569D2', border: '#C2DBFB' },
    under_review: { bg: '#FEF7D8', text: '#8A6B1A', border: '#F6DC7C' },
    needs_revision: { bg: '#FFFDF0', text: '#8A6B1A', border: '#F6DC7C' },
    verified: { bg: '#ECFDF5', text: '#047857', border: '#A7F3D0' },
    rejected: { bg: '#FFF1F1', text: '#B81111', border: '#FFC0C0' },
    withdrawn: { bg: '#F3F4F5', text: '#6B6C70', border: '#D2D3D4' },
  },
};

export const adminRadius = {
  input: '10px',
  button: '10px',
  card: '14px',
  cardLg: '18px',
  modal: '20px',
  sidebar: '0px',
};

export const adminShadow = {
  card: '0 1px 3px rgba(15, 42, 82, 0.06), 0 1px 2px rgba(15, 42, 82, 0.04)',
  cardHover: '0 4px 12px rgba(15, 42, 82, 0.1)',
  modal: '0 20px 60px rgba(15, 42, 82, 0.18)',
  topbar: '0 1px 0px #DFE6EF',
};

export const adminTypography = {
  pageTitle: { fontSize: '1.625rem', fontWeight: 700, letterSpacing: '-0.02em' },
  sectionTitle: { fontSize: '1.125rem', fontWeight: 650, letterSpacing: '-0.01em' },
  body: { fontSize: '0.9rem' },
  bodySmall: { fontSize: '0.825rem' },
  label: { fontSize: '0.8125rem', fontWeight: 600 },
  caption: { fontSize: '0.75rem' },
};
