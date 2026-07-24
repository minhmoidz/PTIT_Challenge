import { Container, Typography, Button, Box } from '@mui/material';
import HomeRounded from '@mui/icons-material/HomeRounded';

export const NotFoundPage = () => (
  <Box
    sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: 'background.default',
    }}
  >
    <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
      <Typography variant="h1" component="h1" sx={{ mb: 2, color: 'primary.main' }}>
        404
      </Typography>
      <Typography variant="h3" component="p" sx={{ mb: 2 }}>
        Trang không tìm thấy
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
        Trang bạn đang tìm không tồn tại hoặc đã được di chuyển.
      </Typography>
      <Button variant="contained" href="/" startIcon={<HomeRounded />}>
        Trở về trang chủ
      </Button>
    </Container>
  </Box>
);

export default NotFoundPage;
