import { Box, Typography } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { piccColors } from '@/theme/palette';

export const AwardHeader = () => {
  return (
    <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 7 }, position: 'relative', fontFamily: '"Manrope", sans-serif' }}>
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        {/* Red Accent Line — IEC PTIT Style */}
        <Box
          sx={{
            width: 44,
            height: 4,
            bgcolor: piccColors.ptitRed,
            borderRadius: 2,
            mx: 'auto',
            mb: 2,
          }}
        />

        {/* Main Heading */}
        <Typography
          variant="h2"
          component="h2"
          sx={{
            mb: 1.5,
            color: piccColors.ptitNavy,
            fontWeight: 800,
            fontSize: { xs: '2rem', sm: '2.5rem', md: '2.8rem' },
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            fontFamily: '"Manrope", sans-serif',
          }}
        >
          Cơ Cấu Giải Thưởng <Box component="span" sx={{ color: piccColors.ptitRed }}>PICC 2026</Box>
        </Typography>

        {/* Subtitle */}
        <Typography
          sx={{
            color: piccColors.slate[600],
            maxWidth: 640,
            mx: 'auto',
            fontSize: { xs: '1rem', md: '1.075rem' },
            lineHeight: 1.7,
            mb: 3.5,
            fontFamily: '"Manrope", sans-serif',
          }}
        >
          Vinh danh những ý tưởng sáng tạo xuất sắc và mở ra cơ hội ươm tạo, phát triển giải pháp cùng doanh nghiệp đồng hành.
        </Typography>

        {/* Prominent Highlight Stat Card for Total Cash Prize Placeholder */}
        <Box
          sx={{
            maxWidth: 560,
            mx: 'auto',
            p: { xs: 2.25, sm: 2.75 },
            px: { xs: 3, sm: 4 },
            borderRadius: 5,
            background: 'linear-gradient(135deg, #FFFDF5 0%, #FFFFFF 50%, #F7F9FC 100%)',
            border: '1.5px solid rgba(231, 195, 77, 0.35)',
            boxShadow: '0 8px 24px rgba(231, 195, 77, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2.5,
            transition: 'all 0.3s ease',
            '&:hover': {
              borderColor: 'rgba(231, 195, 77, 0.6)',
              boxShadow: '0 12px 32px rgba(231, 195, 77, 0.18)',
              transform: 'translateY(-2px)',
            },
          }}
        >
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #FDF3CF 0%, #FDE68A 100%)',
              color: '#9E7A19',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 4px 12px rgba(231, 195, 77, 0.2)',
              border: '1px solid rgba(231, 195, 77, 0.3)',
            }}
          >
            <InfoOutlinedIcon sx={{ fontSize: 24 }} />
          </Box>

          <Box sx={{ textAlign: 'left' }}>
            <Typography
              sx={{
                fontSize: '0.775rem',
                fontWeight: 800,
                color: piccColors.slate[500],
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
                color: piccColors.ptitNavy,
                lineHeight: 1.25,
                letterSpacing: '-0.01em',
              }}
            >
              Đang được Ban Tổ chức cập nhật
            </Typography>
            <Typography
              sx={{
                fontSize: '0.775rem',
                color: piccColors.amber[700],
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
