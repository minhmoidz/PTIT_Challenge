import { Container, Typography, Grid, Box, Link, Chip } from '@mui/material';
import BoltRoundedIcon from '@mui/icons-material/BoltRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import FacebookRoundedIcon from '@mui/icons-material/Facebook';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import { piccColors, gradientMesh } from '@/theme/palette';
import { SkyBackground } from '@/components/ui/SkyBackground';
import { competitionData } from '@/data/competition';

const handleSmoothNav = (e: React.MouseEvent, href: string) => {
  if (href.startsWith('#')) {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const el = document.getElementById(targetId);
    if (el) {
      const offsetPosition = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      window.history.pushState(null, '', href);
    } else if (targetId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', '#hero');
    }
  }
};

export const FooterSection = () => (
  <Box
    component="footer"
    id="footer"
    sx={{
      background: 'linear-gradient(180deg, #162B4A 0%, #1B3560 40%, #0F2241 100%)',
      color: '#FFFFFF',
      pt: { xs: 9, md: 12 },
      pb: { xs: 5, md: 7 },
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    {/* Sky World Background — sunset/deep-sky variant */}
    <SkyBackground variant="sunset" />
    <Container maxWidth="lg">
      <Grid container spacing={5} sx={{ mb: 7 }}>
        {/* Col 1: Brand & Contact Info */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: '12px',
                background: gradientMesh.cta,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                boxShadow: '0 4px 14px rgba(36, 95, 168, 0.4)',
              }}
            >
              <BoltRoundedIcon sx={{ fontSize: 24 }} />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontWeight: 800,
                  color: '#FFFFFF',
                  fontSize: '1.35rem',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                }}
              >
                PICC <Box component="span" sx={{ color: piccColors.sky[400] }}>2026</Box>
              </Typography>
              <Typography
                sx={{
                  fontSize: '0.675rem',
                  fontWeight: 700,
                  color: piccColors.pink[400],
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                Innovation Catalyst Challenge
              </Typography>
            </Box>
          </Box>

          <Typography
            sx={{
              color: piccColors.neutral[400],
              mb: 3,
              maxWidth: 420,
              lineHeight: 1.7,
              fontSize: '0.925rem',
            }}
          >
            {competitionData.meta.fullDescription}
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: piccColors.neutral[300] }}>
              <LocationOnRoundedIcon sx={{ fontSize: 18, color: piccColors.blue[400] }} />
              <Typography sx={{ fontSize: '0.875rem' }}>Km10, Đường Nguyễn Trãi, Hà Đông, Hà Nội</Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: piccColors.neutral[300] }}>
              <EmailRoundedIcon sx={{ fontSize: 18, color: piccColors.pink[400] }} />
              <Link
                href={`mailto:${competitionData.contact.email}`}
                underline="hover"
                sx={{ color: '#FFFFFF', fontSize: '0.875rem', fontWeight: 600 }}
              >
                {competitionData.contact.email}
              </Link>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: piccColors.neutral[300] }}>
              <PhoneRoundedIcon sx={{ fontSize: 18, color: piccColors.emerald[400] }} />
              <Typography sx={{ fontSize: '0.875rem' }}>Hotline: {competitionData.contact.phone}</Typography>
            </Box>
          </Box>
        </Grid>

        {/* Col 2: Quick Navigation */}
        <Grid size={{ xs: 6, md: 3 }}>
          <Typography sx={{ fontWeight: 800, color: '#FFFFFF', mb: 2.5, fontSize: '1rem', letterSpacing: '0.02em' }}>
            ĐIỀU HƯỚNG NHANH
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
            {[
              ['Về PICC 2026', '#gioi-thieu'],
              ['Lộ trình 04 giai đoạn', '#lo-trinh'],
              ['Thể lệ & Quy định', '#the-le'],
              ['Cơ cấu giải thưởng', '#giai-thuong'],
              ['Cổng đăng ký', '#dang-ky'],
              ['Câu hỏi thường gặp', '#faq'],
            ].map(([label, href]) => (
              <Link
                key={label as string}
                href={href as string}
                onClick={(e) => handleSmoothNav(e, href as string)}
                color={piccColors.neutral[400]}
                underline="none"
                sx={{
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                  '&:hover': { color: piccColors.sky[300], transform: 'translateX(4px)' },
                }}
              >
                {label as string}
              </Link>
            ))}
          </Box>
        </Grid>

        {/* Col 3: Official Portals & Social Media Links */}
        <Grid size={{ xs: 6, md: 4 }}>
          <Typography sx={{ fontWeight: 800, color: '#FFFFFF', mb: 2.5, fontSize: '1rem', letterSpacing: '0.02em' }}>
            KÊNH CHÍNH THỨC &amp; TRUYỀN THÔNG
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
            <Link
              href={competitionData.contact.facebookIec}
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.25,
                color: '#FFFFFF',
                bgcolor: 'rgba(255,255,255,0.06)',
                p: 1.25,
                px: 1.75,
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.12)',
                transition: 'all 0.25s ease',
                '&:hover': {
                  bgcolor: 'rgba(24, 119, 242, 0.2)',
                  borderColor: '#1877F2',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <FacebookRoundedIcon sx={{ color: '#1877F2', fontSize: 20 }} />
              <Box>
                <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, lineHeight: 1.2 }}>
                  Fanpage PTIT IEC
                </Typography>
                <Typography sx={{ fontSize: '0.725rem', color: piccColors.neutral[400] }}>
                  facebook.com/PTITIEC
                </Typography>
              </Box>
            </Link>

            <Link
              href={competitionData.contact.facebookPtit}
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.25,
                color: '#FFFFFF',
                bgcolor: 'rgba(255,255,255,0.06)',
                p: 1.25,
                px: 1.75,
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.12)',
                transition: 'all 0.25s ease',
                '&:hover': {
                  bgcolor: 'rgba(24, 119, 242, 0.2)',
                  borderColor: '#1877F2',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <FacebookRoundedIcon sx={{ color: '#1877F2', fontSize: 20 }} />
              <Box>
                <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, lineHeight: 1.2 }}>
                  Fanpage Học viện PTIT
                </Typography>
                <Typography sx={{ fontSize: '0.725rem', color: piccColors.neutral[400] }}>
                  facebook.com/HocvienPTIT
                </Typography>
              </Box>
            </Link>

            <Link
              href={competitionData.contact.websiteIec}
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.25,
                color: '#FFFFFF',
                bgcolor: 'rgba(255,255,255,0.06)',
                p: 1.25,
                px: 1.75,
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.12)',
                transition: 'all 0.25s ease',
                '&:hover': {
                  bgcolor: 'rgba(57, 124, 232, 0.2)',
                  borderColor: piccColors.sky[400],
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <LanguageRoundedIcon sx={{ color: piccColors.sky[400], fontSize: 20 }} />
              <Box>
                <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, lineHeight: 1.2 }}>
                  Website PTIT IEC
                </Typography>
                <Typography sx={{ fontSize: '0.725rem', color: piccColors.neutral[400] }}>
                  iec.ptit.edu.vn
                </Typography>
              </Box>
            </Link>

            <Link
              href={competitionData.contact.websitePtit}
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.25,
                color: '#FFFFFF',
                bgcolor: 'rgba(255,255,255,0.06)',
                p: 1.25,
                px: 1.75,
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.12)',
                transition: 'all 0.25s ease',
                '&:hover': {
                  bgcolor: 'rgba(57, 124, 232, 0.2)',
                  borderColor: piccColors.sky[400],
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <LanguageRoundedIcon sx={{ color: piccColors.sky[400], fontSize: 20 }} />
              <Box>
                <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, lineHeight: 1.2 }}>
                  Cổng thông tin Học viện PTIT
                </Typography>
                <Typography sx={{ fontSize: '0.725rem', color: piccColors.neutral[400] }}>
                  ptit.edu.vn
                </Typography>
              </Box>
            </Link>
          </Box>
        </Grid>
      </Grid>

      {/* Root Bar at bottom with direct link chips */}
      <Box
        sx={{
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          pt: 4,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Typography sx={{ color: piccColors.neutral[500], fontSize: '0.825rem' }}>
          &copy; {new Date().getFullYear()} PTIT Innovation Catalyst Challenge (PICC 2026). Tất cả quyền được bảo lưu.
        </Typography>

        {/* Interactive Root Bar Link Pills */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
          <Chip
            component="a"
            href={competitionData.contact.facebookIec}
            target="_blank"
            rel="noopener noreferrer"
            clickable
            icon={<FacebookRoundedIcon sx={{ fontSize: '15px !important', color: '#1877F2 !important' }} />}
            label="FB PTIT IEC"
            size="small"
            sx={{
              bgcolor: 'rgba(255,255,255,0.08)',
              color: piccColors.neutral[200],
              fontWeight: 600,
              fontSize: '0.75rem',
              '&:hover': { bgcolor: 'rgba(24, 119, 242, 0.25)', color: '#FFFFFF' },
            }}
          />
          <Chip
            component="a"
            href={competitionData.contact.facebookPtit}
            target="_blank"
            rel="noopener noreferrer"
            clickable
            icon={<FacebookRoundedIcon sx={{ fontSize: '15px !important', color: '#1877F2 !important' }} />}
            label="FB Học viện PTIT"
            size="small"
            sx={{
              bgcolor: 'rgba(255,255,255,0.08)',
              color: piccColors.neutral[200],
              fontWeight: 600,
              fontSize: '0.75rem',
              '&:hover': { bgcolor: 'rgba(24, 119, 242, 0.25)', color: '#FFFFFF' },
            }}
          />
          <Chip
            component="a"
            href={competitionData.contact.websiteIec}
            target="_blank"
            rel="noopener noreferrer"
            clickable
            icon={<LanguageRoundedIcon sx={{ fontSize: '15px !important', color: `${piccColors.sky[400]} !important` }} />}
            label="iec.ptit.edu.vn"
            size="small"
            sx={{
              bgcolor: 'rgba(255,255,255,0.08)',
              color: piccColors.neutral[200],
              fontWeight: 600,
              fontSize: '0.75rem',
              '&:hover': { bgcolor: 'rgba(57, 124, 232, 0.25)', color: '#FFFFFF' },
            }}
          />
          <Chip
            component="a"
            href={competitionData.contact.websitePtit}
            target="_blank"
            rel="noopener noreferrer"
            clickable
            icon={<LanguageRoundedIcon sx={{ fontSize: '15px !important', color: `${piccColors.sky[400]} !important` }} />}
            label="ptit.edu.vn"
            size="small"
            sx={{
              bgcolor: 'rgba(255,255,255,0.08)',
              color: piccColors.neutral[200],
              fontWeight: 600,
              fontSize: '0.75rem',
              '&:hover': { bgcolor: 'rgba(57, 124, 232, 0.25)', color: '#FFFFFF' },
            }}
          />
        </Box>
      </Box>
    </Container>
  </Box>
);

export default FooterSection;