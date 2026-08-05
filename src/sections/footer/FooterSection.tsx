import { Box, Container, Grid, Link, Typography } from '@mui/material';
import FacebookRoundedIcon from '@mui/icons-material/Facebook';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import { useLocation, useNavigate } from 'react-router-dom';
import { piccColors } from '@/theme/palette';
import { footer } from '@/content/vi/footer';
import { appHash, appPath, assetPath } from '@/config/paths';

/* ── Shared type scale ───────────────────────────────────────── */
const labelSx = {
  fontSize: '0.8125rem',
  fontWeight: 500,
  color: piccColors.slate[400],
  mb: 0.5,
  lineHeight: 1.4,
} as const;

const valueSx = {
  fontSize: '0.9375rem',
  fontWeight: 500,
  color: '#FFFFFF',
  lineHeight: 1.55,
} as const;

const dividerSx = {
  height: '1px',
  bgcolor: 'rgba(255, 255, 255, 0.08)',
  border: 0,
} as const;

const SocialButton = ({ label, href, icon }: { label: string; href: string; icon: 'facebook' | 'web' }) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    sx={{
      width: 42,
      height: 42,
      borderRadius: '50%',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: 'rgba(255, 255, 255, 0.08)',
      color: '#FFFFFF',
      border: '1px solid rgba(255, 255, 255, 0.12)',
      transition: 'all 0.25s ease',
      '&:hover': {
        bgcolor: piccColors.ptitRed,
        borderColor: piccColors.ptitRed,
        transform: 'translateY(-2px)',
        boxShadow: '0 6px 16px rgba(225, 20, 20, 0.35)',
      },
    }}
  >
    {icon === 'facebook' ? (
      <FacebookRoundedIcon sx={{ fontSize: 20 }} />
    ) : (
      <LanguageRoundedIcon sx={{ fontSize: 20 }} />
    )}
  </Link>
);

export const FooterSection = () => {
  const location = useLocation();
  const navigate = useNavigate();

  /** In-page anchors scroll smoothly; from another route, navigate home first. */
  const handleAnchor = (e: React.MouseEvent, href: string) => {
    if (!href.startsWith('#')) return;
    e.preventDefault();
    const targetId = href.slice(1);

    if (location.pathname !== appPath('/')) {
      navigate(appHash(targetId));
      return;
    }

    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ block: 'start', behavior: 'smooth' });
      window.history.pushState(null, '', `#${targetId}`);
    } else if (targetId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <Box
      component="footer"
      id="footer"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        color: '#FFFFFF',
        fontFamily: '"Manrope", sans-serif',
        background: 'linear-gradient(180deg, #0B192C 0%, #06101E 100%)',
      }}
    >
      {/* Top Accent Gradient Ribbon */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: 'linear-gradient(90deg, #E11414 0%, #E7C34D 50%, #3882F1 100%)',
          zIndex: 2,
        }}
      />

      {/* Oversized Subtle Background Brand Mark */}
      <Box
        aria-hidden="true"
        component="img"
        src={assetPath('assets/branding/ptit-logo.png')}
        alt=""
        sx={{
          position: 'absolute',
          right: { xs: '-20%', md: '3%' },
          top: '50%',
          transform: 'translateY(-50%)',
          width: { xs: 380, md: 540 },
          opacity: 0.035,
          filter: 'invert(1) brightness(2)',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, px: { xs: 3, sm: 4 } }}>
        {/* ── Masthead: Institution Lockup with Clear White Badge Logo + Socials ── */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'flex-start', md: 'center' },
            justifyContent: 'space-between',
            gap: 3,
            pt: { xs: 6, md: 7 },
            pb: { xs: 4, md: 5 },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.25 }}>
            {/* White Glass Card Badge for PTIT Logo */}
            <Box
              sx={{
                width: { xs: 56, md: 68 },
                height: { xs: 56, md: 68 },
                borderRadius: '16px',
                bgcolor: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 1,
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                flexShrink: 0,
              }}
            >
              <Box
                component="img"
                src={assetPath('assets/branding/ptit-logo.png')}
                alt={footer.institution}
                sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </Box>

            <Box>
              <Typography
                sx={{
                  fontSize: { xs: '0.85rem', md: '0.95rem' },
                  fontWeight: 600,
                  color: piccColors.slate[300],
                  lineHeight: 1.35,
                }}
              >
                {footer.institution}
              </Typography>
              <Typography
                component="p"
                sx={{
                  fontSize: { xs: '1.15rem', sm: '1.4rem', md: '1.6rem' },
                  fontWeight: 850,
                  letterSpacing: '0.01em',
                  textTransform: 'uppercase',
                  lineHeight: 1.2,
                  mt: 0.25,
                  background: `linear-gradient(135deg, #FFFFFF 0%, ${piccColors.slate[200]} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {footer.portalName}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 1.25, flexShrink: 0 }}>
            {footer.socials.map((s) => (
              <SocialButton key={s.label} {...s} />
            ))}
          </Box>
        </Box>

        <Box component="hr" sx={dividerSx} />

        {/* ── Campus & contact grid ── */}
        <Grid container spacing={{ xs: 3, md: 4 }} sx={{ py: { xs: 4.5, md: 6 } }}>
          {footer.contacts.map((item) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.label}>
              <Typography sx={labelSx}>{item.label}</Typography>
              {item.href ? (
                <Link
                  href={item.href}
                  sx={{
                    ...valueSx,
                    textDecoration: 'none',
                    '&:hover': { color: piccColors.blue[400], textDecoration: 'underline' },
                  }}
                >
                  {item.value}
                </Link>
              ) : (
                <Typography sx={valueSx}>{item.value}</Typography>
              )}
            </Grid>
          ))}
        </Grid>

        <Box component="hr" sx={dividerSx} />

        {/* ── Link directory ── */}
        <Box sx={{ py: { xs: 4.5, md: 6 } }}>
          <Typography
            component="h2"
            sx={{
              fontSize: '0.85rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: piccColors.slate[400],
              mb: { xs: 2.5, md: 3.5 },
            }}
          >
            {footer.linksHeading}
          </Typography>

          <Grid container spacing={{ xs: 1.5, md: 4 }}>
            {footer.linkColumns.map((column, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }}>
                  {column.map((link) => {
                    const isAnchor = link.href.startsWith('#');
                    const external = 'external' in link && link.external;

                    return (
                      <Box component="li" key={link.label} sx={{ mb: 1.75 }}>
                        <Link
                          href={
                            external ? link.href : isAnchor ? appHash(link.href.slice(1)) : appPath(link.href)
                          }
                          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          onClick={isAnchor ? (e) => handleAnchor(e, link.href) : undefined}
                          sx={{
                            ...valueSx,
                            display: 'inline-block',
                            textDecoration: 'none',
                            transition: 'all 0.2s ease',
                            '&:hover': { color: piccColors.blue[400], transform: 'translateX(3px)' },
                          }}
                        >
                          {link.label}
                        </Link>
                      </Box>
                    );
                  })}
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      {/* ── Copyright bar ── */}
      <Box sx={{ position: 'relative', zIndex: 1, bgcolor: 'rgba(0, 0, 0, 0.4)', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
        <Container maxWidth="lg" sx={{ px: { xs: 3, sm: 4 } }}>
          <Typography
            sx={{
              py: 2.5,
              textAlign: 'center',
              fontSize: { xs: '0.8125rem', md: '0.875rem' },
              color: piccColors.slate[400],
              lineHeight: 1.6,
            }}
          >
            &copy; {new Date().getFullYear()} {footer.organiser} — {footer.copyright}
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default FooterSection;

