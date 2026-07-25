/**
 * Admin Design System Tokens
 * PICC Command Center — Production Admin Portal
 */

export const adminColors = {
  // Backgrounds
  bg: '#F4F7FB',
  surface: '#FFFFFF',
  surfaceMuted: '#F8FAFD',
  surfaceHover: '#F0F5FA',

  // Borders
  border: '#DCE4EF',
  borderStrong: '#C5D1E2',

  // Text
  text: '#17233A',
  textSecondary: '#445672',
  textMuted: '#66758A',
  textDisabled: '#98A9BB',

  // Brand primary (admin)
  primary: '#255FC7',
  primaryHover: '#1E4FA9',
  primaryLight: '#EEF5FF',
  primaryBorder: '#C3D8F5',

  // Sidebar
  sidebar: '#152A50',
  sidebarHover: '#1E3A6B',
  sidebarActive: '#255FC7',
  sidebarText: '#94B0D4',
  sidebarTextActive: '#FFFFFF',
  sidebarBorder: 'rgba(255,255,255,0.08)',

  // Topbar
  topbar: '#FFFFFF',
  topbarBorder: '#DCE4EF',

  // Semantic colors
  success: '#168A53',
  successBg: '#EDFAF3',
  successBorder: '#A8E8C8',

  warning: '#C77700',
  warningBg: '#FFF9EC',
  warningBorder: '#F5D98A',

  danger: '#D33C48',
  dangerBg: '#FFF1F2',
  dangerBorder: '#F5BBBF',

  info: '#2877D7',
  infoBg: '#EEF5FF',
  infoBorder: '#C3D8F5',

  // Status badge colors
  status: {
    draft: { bg: '#F0F3F8', text: '#445672', border: '#C5D1E2' },
    submitted: { bg: '#EEF5FF', text: '#255FC7', border: '#C3D8F5' },
    under_review: { bg: '#FFF4E8', text: '#C77700', border: '#F5D98A' },
    needs_revision: { bg: '#FFF9EC', text: '#C77700', border: '#F5D98A' },
    verified: { bg: '#EDFAF3', text: '#168A53', border: '#A8E8C8' },
    rejected: { bg: '#FFF1F2', text: '#D33C48', border: '#F5BBBF' },
    withdrawn: { bg: '#F3F4F6', text: '#66758A', border: '#D1D5DB' },
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
  card: '0 1px 3px rgba(15, 30, 60, 0.06), 0 1px 2px rgba(15, 30, 60, 0.04)',
  cardHover: '0 4px 12px rgba(15, 30, 60, 0.1)',
  modal: '0 20px 60px rgba(15, 30, 60, 0.18)',
  topbar: '0 1px 0px #DCE4EF',
};

export const adminTypography = {
  pageTitle: { fontSize: '1.625rem', fontWeight: 700, letterSpacing: '-0.02em' },
  sectionTitle: { fontSize: '1.125rem', fontWeight: 650, letterSpacing: '-0.01em' },
  body: { fontSize: '0.9rem' },
  bodySmall: { fontSize: '0.825rem' },
  label: { fontSize: '0.8125rem', fontWeight: 600 },
  caption: { fontSize: '0.75rem' },
};
