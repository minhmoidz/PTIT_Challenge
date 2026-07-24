import { Box } from '@mui/material';

export const SkipLink = () => (
  <Box
    component="a"
    href="#main-content"
    sx={{
      position: 'absolute',
      left: -9999,
      top: 0,
      zIndex: 9999,
      bgcolor: 'primary.main',
      color: 'white',
      p: 2,
      '&:focus': {
        left: 16,
        top: 16,
        position: 'fixed',
      },
    }}
  >
    Chuyển đến nội dung chính
  </Box>
);
