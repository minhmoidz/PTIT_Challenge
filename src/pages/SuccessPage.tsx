import { Container, Typography, Button, Box, Paper } from '@mui/material';
import CheckCircleRounded from '@mui/icons-material/CheckCircleRounded';
import HomeRounded from '@mui/icons-material/HomeRounded';
import { piccColors } from '@/theme/palette';

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
    <Container maxWidth="sm">
      <Paper elevation={0} sx={{ p: { xs: 4, sm: 6 }, textAlign: 'center', borderRadius: 4 }}>
        <CheckCircleRounded
          sx={{ fontSize: 80, color: piccColors.success, mb: 2 }}
        />
        <Typography variant="h2" component="h1" sx={{ mb: 2 }}>
          Đăng ký thành công!
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
          Ban Tổ chức đã ghi nhận thông tin đăng ký của đội. Các thông báo tiếp theo sẽ được gửi tới email đội trưởng và đăng tải trên kênh truyền thông chính thức của cuộc thi.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button variant="contained" href="/" startIcon={<HomeRounded />}>
            Trở về trang chủ
          </Button>
          <Button variant="outlined" href="https://www.facebook.com/ptitieciofficial" target="_blank">
            Theo dõi kênh BTC
          </Button>
        </Box>
      </Paper>
    </Container>
  </Box>
);

export default SuccessPage;
