import { useState } from 'react';
import {
  AppBar,
  Container,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  Typography,
  Chip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import { useRegistrationStatus } from '@/features/registration/hooks';
import { hero } from '@/content/vi/hero';
import { piccColors } from '@/theme/palette';

const NAV_ITEMS = [
  { label: 'Giới thiệu', href: '#gioi-thieu' },
  { label: 'Thông tin', href: '#thong-tin-nhanh' },
  { label: 'Lộ trình', href: '#lo-trinh' },
  { label: 'Thể lệ', href: '#the-le' },
  { label: 'Giải thưởng', href: '#giai-thuong' },
  { label: 'Đăng ký', href: '#dang-ky' },
];

export const SiteHeader = () => {
  const { status } = useRegistrationStatus();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const ctaLabel = status === 'open' ? hero.cta.open : hero.cta.disabled;
  const ctaHref = status === 'open' ? '#dang-ky' : '#footer';

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: 'transparent',
          pt: { xs: 1.5, md: 2 },
          pb: 1,
          pointerEvents: 'none',
        }}
      >
        <Container maxWidth="lg" sx={{ pointerEvents: 'auto' }}>
          <Box
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.94)',
              backdropFilter: 'blur(16px)',
              borderRadius: 999,
              px: { xs: 2.5, md: 3.5 },
              py: 1,
              boxShadow: '0 12px 36px rgba(23, 59, 102, 0.14)',
              border: `1.5px solid ${piccColors.sky[200]}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* Logo Brand */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                cursor: 'pointer',
                userSelect: 'none',
              }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <Box
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: '12px',
                  background: `linear-gradient(135deg, ${piccColors.blue[700]}, ${piccColors.pink[500]})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  boxShadow: '0 4px 12px rgba(36, 95, 168, 0.3)',
                }}
              >
                <RocketLaunchRoundedIcon sx={{ fontSize: 22 }} />
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 850,
                    fontSize: { xs: '1.1rem', md: '1.25rem' },
                    color: piccColors.ink,
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                  }}
                >
                  PICC 2026
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: piccColors.pink[500],
                    fontWeight: 700,
                    fontSize: '0.7rem',
                    display: { xs: 'none', sm: 'block' },
                  }}
                >
                  Rise Beyond Limits
                </Typography>
              </Box>
            </Box>

            {/* Desktop Navigation Links */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5, alignItems: 'center' }}>
              {NAV_ITEMS.map((item) => (
                <Button
                  key={item.href}
                  href={item.href}
                  sx={{
                    color: piccColors.ink,
                    fontWeight: 650,
                    fontSize: '0.9rem',
                    px: 2,
                    py: 0.75,
                    borderRadius: 999,
                    '&:hover': {
                      color: piccColors.blue[700],
                      backgroundColor: piccColors.sky[100],
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>

            {/* Header Right Actions */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Button
                variant="contained"
                href={ctaHref}
                size="medium"
                startIcon={<RocketLaunchRoundedIcon />}
                sx={{
                  display: { xs: 'none', sm: 'inline-flex' },
                  px: 3,
                  py: 1,
                  borderRadius: 999,
                  fontWeight: 700,
                  boxShadow: '0 6px 18px rgba(36, 95, 168, 0.25)',
                }}
              >
                {ctaLabel}
              </Button>

              <IconButton
                sx={{
                  display: { md: 'none' },
                  bgcolor: piccColors.sky[100],
                  '&:hover': { bgcolor: piccColors.sky[200] },
                }}
                onClick={() => setDrawerOpen(true)}
                aria-label="Mở menu điều hướng"
              >
                <MenuIcon sx={{ color: piccColors.ink }} />
              </IconButton>
            </Box>
          </Box>
        </Container>
      </AppBar>

      {/* Mobile Drawer Navigation */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: {
            width: 300,
            borderRadius: '24px 0 0 24px',
            background: `linear-gradient(180deg, #FFFFFF 0%, ${piccColors.sky[50]} 100%)`,
            p: 3,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 850, color: piccColors.ink }}>
              PICC 2026
            </Typography>
            <Chip label="PTIT" size="small" color="primary" sx={{ height: 22, fontSize: '0.65rem' }} />
          </Box>
          <IconButton onClick={() => setDrawerOpen(false)} aria-label="Đóng menu">
            <CloseIcon />
          </IconButton>
        </Box>

        <List sx={{ pt: 0 }}>
          {NAV_ITEMS.map((item) => (
            <ListItem key={item.href} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                component="a"
                href={item.href}
                onClick={() => setDrawerOpen(false)}
                sx={{
                  borderRadius: 3,
                  py: 1.5,
                  '&:hover': { bgcolor: piccColors.sky[100] },
                }}
              >
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{ fontWeight: 650, color: piccColors.ink }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding sx={{ mt: 2 }}>
            <Button
              fullWidth
              variant="contained"
              href={ctaHref}
              onClick={() => setDrawerOpen(false)}
              startIcon={<RocketLaunchRoundedIcon />}
              sx={{ py: 1.5, borderRadius: 999 }}
            >
              {ctaLabel}
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};
