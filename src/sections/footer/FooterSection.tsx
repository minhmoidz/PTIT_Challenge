import { Container, Typography, Grid, Box, Link, Chip } from '@mui/material';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import { piccColors } from '@/theme/palette';

export const FooterSection = () => (
  <Box
    component="footer"
    id="footer"
    sx={{
      bgcolor: piccColors.blue[900],
      color: '#FFFFFF',
      pt: { xs: 8, md: 10 },
      pb: { xs: 5, md: 6 },
      borderTop: `1px solid ${piccColors.blue[700]}`,
    }}
  >
    <Container maxWidth="lg">
      <Grid container spacing={4} sx={{ mb: 6 }}>
        <Grid item xs={12} md={5}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: '10px',
                background: `linear-gradient(135deg, ${piccColors.blue[500]}, ${piccColors.pink[500]})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
              }}
            >
              <RocketLaunchRoundedIcon sx={{ fontSize: 20 }} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#FFFFFF', fontSize: '1.25rem' }}>
              PICC 2026
            </Typography>
            <Chip
              label="PTIT"
              size="small"
              sx={{ bgcolor: piccColors.blue[700], color: '#FFFFFF', height: 20, fontSize: '0.65rem', fontWeight: 700 }}
            />
          </Box>
          <Typography variant="body2" sx={{ color: piccColors.blue[100], mb: 2, maxWidth: 400, lineHeight: 1.6 }}>
            PTIT Innovation Catalyst Challenge 2026 — Cuộc thi giải Case Study thực tế liên ngành dành cho sinh viên Học viện Công nghệ Bưu chính Viễn thông.
          </Typography>
        </Grid>

        <Grid item xs={6} md={3}>
          <Typography variant="body1" sx={{ fontWeight: 700, color: '#FFFFFF', mb: 2, fontSize: '0.95rem' }}>
            Điều Hướng Nhau
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
            <Link href="#gioi-thieu" color={piccColors.blue[100]} underline="hover" variant="body2">
              Giới thiệu
            </Link>
            <Link href="#thong-tin-nhanh" color={piccColors.blue[100]} underline="hover" variant="body2">
              Thông tin nhanh
            </Link>
            <Link href="#lo-trinh" color={piccColors.blue[100]} underline="hover" variant="body2">
              Lộ trình cuộc thi
            </Link>
            <Link href="#the-le" color={piccColors.blue[100]} underline="hover" variant="body2">
              Thể lệ & Quy định
            </Link>
            <Link href="#giai-thuong" color={piccColors.blue[100]} underline="hover" variant="body2">
              Cơ cấu giải thưởng
            </Link>
            <Link href="#dang-ky" color={piccColors.blue[100]} underline="hover" variant="body2">
              Đăng ký dự thi
            </Link>
          </Box>
        </Grid>

        <Grid item xs={6} md={4}>
          <Typography variant="body1" sx={{ fontWeight: 700, color: '#FFFFFF', mb: 2, fontSize: '0.95rem' }}>
            Đơn Vị Tổ Chức
          </Typography>
          <Typography variant="body2" sx={{ color: piccColors.blue[100], mb: 1, fontWeight: 600 }}>
            Học viện Công nghệ Bưu chính Viễn thông (PTIT)
          </Typography>
          <Typography variant="body2" sx={{ color: piccColors.blue[100], mb: 2, opacity: 0.9 }}>
            Trung tâm Đổi mới sáng tạo & Khởi nghiệp (PTIT IEC)
          </Typography>
          <Typography variant="caption" sx={{ color: piccColors.blue[300], display: 'block' }}>
            Mọi thắc mắc chính thức xin gửi về các kênh truyền thông chính thức của PTIT & BTC.
          </Typography>
        </Grid>
      </Grid>

      <Box
        sx={{
          borderTop: `1px solid ${piccColors.blue[700]}`,
          pt: 3,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Typography variant="caption" sx={{ color: piccColors.blue[300] }}>
          &copy; {new Date().getFullYear()} PTIT Innovation Catalyst Challenge. Tất cả quyền được bảo lưu.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Link href="/quyen-rieng-tu" color={piccColors.blue[100]} underline="hover" variant="caption">
            Chính sách bảo mật
          </Link>
        </Box>
      </Box>
    </Container>
  </Box>
);
