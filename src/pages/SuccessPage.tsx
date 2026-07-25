import { Container, Typography, Button, Box, Paper } from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import MapRoundedIcon from '@mui/icons-material/MapRounded';
import FacebookRoundedIcon from '@mui/icons-material/Facebook';
import { piccColors } from '@/theme/palette';
import { competitionData } from '@/data/competition';

export const SuccessPage = () => (
  <Box
    sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: piccColors.sky[50],
      py: 8,
    }}
  >
    <Container maxWidth="md">
      <Paper
        elevation={0}
        sx={{
          p: { xs: 4, sm: 6 },
          textAlign: 'center',
          borderRadius: 6,
          border: '1px solid rgba(226, 232, 240, 0.9)',
          boxShadow: '0 20px 60px rgba(23, 59, 102, 0.1)',
        }}
      >
        <CheckCircleRoundedIcon
          sx={{ fontSize: 72, color: piccColors.emerald[600], mb: 2 }}
        />
        <Typography
          variant="h2"
          component="h1"
          sx={{
            mb: 2,
            fontWeight: 800,
            fontSize: { xs: '2rem', sm: '2.5rem' },
            color: piccColors.ink,
          }}
        >
          Đăng ký thành công!
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: piccColors.slate[600],
            mb: 2,
            lineHeight: 1.65,
            maxWidth: 640,
            mx: 'auto',
            fontSize: '1rem',
          }}
        >
          Ban Tổ chức đã ghi nhận thông tin đăng ký của đội. Kết quả xác nhận đăng ký, thông báo về đề bài, lịch trình các vòng thi và các hoạt động đồng hành sẽ được gửi tới email của đội trưởng và đăng tải trên các kênh truyền thông chính thức của cuộc thi.
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: piccColors.indigo[700],
            fontWeight: 700,
            mb: 4,
            fontSize: '0.925rem',
          }}
        >
          Chúc đội thi có một hành trình bứt phá và đạt nhiều thành công tại PTIT Innovation Catalyst Challenge 2026!
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            href="/"
            startIcon={<HomeRoundedIcon />}
            sx={{
              borderRadius: 999,
              px: 3,
              py: 1.2,
              fontWeight: 700,
              bgcolor: piccColors.blue[600],
              '&:hover': { bgcolor: piccColors.blue[800] },
            }}
          >
            Về trang chủ
          </Button>

          <Button
            variant="outlined"
            href="/#lo-trinh"
            startIcon={<MapRoundedIcon />}
            sx={{
              borderRadius: 999,
              px: 3,
              py: 1.2,
              fontWeight: 700,
            }}
          >
            Xem lộ trình
          </Button>

          <Button
            variant="outlined"
            href={competitionData.contact.facebook}
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<FacebookRoundedIcon />}
            sx={{
              borderRadius: 999,
              px: 3,
              py: 1.2,
              fontWeight: 700,
              color: '#1877F2',
              borderColor: 'rgba(24, 119, 242, 0.4)',
              '&:hover': {
                borderColor: '#1877F2',
                bgcolor: 'rgba(24, 119, 242, 0.05)',
              },
            }}
          >
            Fanpage Ban Tổ chức
          </Button>
        </Box>
      </Paper>
    </Container>
  </Box>
);

export default SuccessPage;
