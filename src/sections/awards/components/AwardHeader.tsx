import { Box, Typography, Chip } from '@mui/material';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { piccColors } from '@/theme/palette';

export const AwardHeader = () => {
  return (
    <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 }, position: 'relative' }}>
      {/* Background Holographic Light Ring & Abstract Line Art */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -60%)',
          width: { xs: 280, md: 520 },
          height: { xs: 280, md: 520 },
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(54, 123, 234, 0.08) 0%, rgba(245, 166, 35, 0.05) 45%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Abstract Tech Arc Line SVG */}
      <Box
        component="svg"
        viewBox="0 0 400 120"
        sx={{
          position: 'absolute',
          top: -20,
          left: '50%',
          transform: 'translateX(-50%)',
          width: { xs: 300, md: 600 },
          height: 120,
          opacity: 0.15,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <circle cx="200" cy="-80" r="180" stroke="#15375F" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
        <circle cx="200" cy="-80" r="160" stroke="#367BEA" strokeWidth="1" fill="none" />
      </Box>

      <Box sx={{ position: 'relative', zIndex: 1 }}>
        {/* Eyebrow Badge */}
        <Chip
          icon={<WorkspacePremiumRoundedIcon sx={{ fontSize: '16px !important', color: `${piccColors.amber[700]} !important` }} />}
          label="Vinh danh & Quyền lợi"
          sx={{
            bgcolor: '#FFF8EC',
            color: piccColors.amber[800],
            fontWeight: 700,
            fontSize: '0.85rem',
            mb: 2,
            px: 1.5,
            py: 0.5,
            border: '1px solid rgba(245, 166, 35, 0.3)',
            boxShadow: '0 4px 12px rgba(245, 166, 35, 0.12)',
          }}
        />

        {/* Main Heading */}
        <Typography
          variant="h2"
          component="h2"
          sx={{
            mb: 1.75,
            color: '#15375F',
            fontWeight: 800,
            fontSize: { xs: '2rem', sm: '2.75rem', md: '3.25rem' },
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
          }}
        >
          Bảo Tàng Giải Thưởng PICC 2026
        </Typography>

        {/* Subtitle */}
        <Typography
          sx={{
            color: '#65758B',
            maxWidth: 640,
            mx: 'auto',
            fontSize: { xs: '0.95rem', md: '1.05rem' },
            lineHeight: 1.6,
            mb: 3.5,
          }}
        >
          Vinh danh những ý tưởng xuất sắc và mở ra cơ hội phát triển cùng doanh nghiệp.
        </Typography>

        {/* Prominent Highlight Stat Card for Total Cash Prize Placeholder */}
        <Box
          sx={{
            maxWidth: 560,
            mx: 'auto',
            p: { xs: 2.25, sm: 2.75 },
            px: { xs: 3, sm: 4 },
            borderRadius: 5,
            background: 'linear-gradient(135deg, #FFFDF5 0%, #FFFFFF 50%, #F4F8FD 100%)',
            border: '1.5px solid rgba(245, 166, 35, 0.35)',
            boxShadow: '0 8px 24px rgba(245, 166, 35, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2.5,
            transition: 'all 0.3s ease',
            '&:hover': {
              borderColor: 'rgba(245, 166, 35, 0.6)',
              boxShadow: '0 12px 32px rgba(245, 166, 35, 0.18)',
              transform: 'translateY(-2px)',
            },
          }}
        >
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
              color: '#D97706',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 4px 12px rgba(245, 158, 11, 0.2)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
            }}
          >
            <InfoOutlinedIcon sx={{ fontSize: 24 }} />
          </Box>

          <Box sx={{ textAlign: 'left' }}>
            <Typography
              sx={{
                fontSize: '0.775rem',
                fontWeight: 800,
                color: '#65758B',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                mb: 0.25,
              }}
            >
              Cơ cấu giá trị giải thưởng
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '1.2rem', sm: '1.4rem' },
                fontWeight: 800,
                color: '#15375F',
                lineHeight: 1.25,
                letterSpacing: '-0.01em',
              }}
            >
              Đang được Ban Tổ chức cập nhật
            </Typography>
            <Typography
              sx={{
                fontSize: '0.775rem',
                color: '#D97706',
                fontWeight: 650,
                mt: 0.3,
              }}
            >
              * Giá trị &amp; quyền lợi chi tiết từng hạng mục sẽ được công bố chính thức.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AwardHeader;
