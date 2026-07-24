import { Box, CircularProgress, Typography } from '@mui/material';

export const LoadingScreen = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      gap: 2,
    }}
  >
    <CircularProgress color="primary" />
    <Typography variant="body2" color="text.secondary">
      Đang tải...
    </Typography>
  </Box>
);
