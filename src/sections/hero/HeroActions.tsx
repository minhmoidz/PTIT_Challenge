import { Box, Button } from '@mui/material';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import type { RegistrationStatus } from '@/types/registration';

interface Props {
  status: RegistrationStatus;
}

export const HeroActions = ({ status }: Props) => {
  const getPrimaryCta = () => {
    switch (status) {
      case 'open':
        return { label: 'Đăng ký tham gia ngay', href: '/dang-ky' };
      case 'not_open':
        return { label: 'Xem trước biểu mẫu đăng ký', href: '/dang-ky' };
      case 'manually_disabled':
        return { label: 'Xem thông báo mới nhất', href: '#lo-trinh' };
      case 'closed':
        return { label: 'Theo dõi hành trình', href: '#lo-trinh' };
      default:
        return { label: 'Xem biểu mẫu đăng ký', href: '/dang-ky' };
    }
  };

  const primary = getPrimaryCta();

  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button
        variant="contained"
        size="large"
        href={primary.href}
        endIcon={<ArrowForwardRoundedIcon />}
        sx={{
          borderRadius: 999,
          px: 4,
          py: 1.35,
          fontSize: '0.95rem',
          fontWeight: 800,
          background: 'linear-gradient(135deg, #0F2A52 0%, #1C52A6 50%, #3882F1 100%)',
          boxShadow: '0 6px 20px rgba(56, 130, 241, 0.35)',
          transition: 'all 0.3s ease',
          '&:hover': {
            background: 'linear-gradient(135deg, #0C2145 0%, #0F2A52 50%, #1C52A6 100%)',
            boxShadow: '0 10px 28px rgba(56, 130, 241, 0.45)',
            transform: 'translateY(-2px)',
          },
        }}
      >
        {primary.label}
      </Button>

      <Button
        variant="outlined"
        size="large"
        href="/#the-le"
        startIcon={<MenuBookRoundedIcon />}
        sx={{
          borderRadius: 999,
          px: 3.5,
          py: 1.35,
          fontSize: '0.95rem',
          fontWeight: 700,
          color: '#0F2A52',
          borderColor: 'rgba(15, 42, 82, 0.25)',
          bgcolor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(12px)',
          transition: 'all 0.3s ease',
          '&:hover': {
            borderColor: '#0F2A52',
            bgcolor: '#FFFFFF',
            boxShadow: '0 6px 20px rgba(15, 42, 82, 0.1)',
            transform: 'translateY(-2px)',
          },
        }}
      >
        Xem thể lệ
      </Button>
    </Box>
  );
};

export default HeroActions;