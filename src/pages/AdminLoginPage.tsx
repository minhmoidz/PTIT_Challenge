import { useState } from 'react';
import {
  Box, Typography, TextField, Button, Alert, InputAdornment, IconButton, Divider, Link,
} from '@mui/material';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import ShieldRoundedIcon from '@mui/icons-material/ShieldRounded';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { adminColors, adminRadius, adminShadow } from '@/theme/adminTokens';
import { env } from '@/config/env';

export const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Vui lòng nhập đầy đủ email và mật khẩu.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${env.apiBaseUrl}/v1/admin/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: email.trim().toLowerCase(), password: password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem('picc_admin_user', JSON.stringify(data.data.user));
        navigate('/admin/dashboard', { replace: true });
        return;
      }

      if (res.status === 401) {
        setError('Thông tin đăng nhập không chính xác. Vui lòng thử lại.');
      } else if (res.status === 403) {
        setError('Tài khoản không có quyền truy cập hệ thống quản trị.');
      } else if (res.status === 429) {
        setError('Quá nhiều lần thử. Vui lòng đợi vài phút và thử lại.');
      } else {
        setError('Có lỗi xảy ra. Vui lòng thử lại sau.');
      }
    } catch {
      setError('Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        bgcolor: adminColors.bg,
        backgroundImage: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(56, 130, 241, 0.12), transparent)',
      }}
    >
      {/* Left Branding Panel */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          width: '42%',
          maxWidth: 520,
          bgcolor: adminColors.sidebar,
          flexDirection: 'column',
          justifyContent: 'space-between',
          p: 5,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle grid overlay */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Brand */}
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 6 }}>
            <Box
              sx={{
                width: 38,
                height: 38,
                borderRadius: '11px',
                bgcolor: adminColors.primary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ShieldRoundedIcon sx={{ fontSize: 20, color: '#FFFFFF' }} />
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 800, fontSize: '1rem', color: '#FFFFFF', letterSpacing: '-0.01em' }}>PICC Admin</Typography>
              <Typography sx={{ fontSize: '0.6875rem', color: 'rgba(154, 195, 249, 0.9)', letterSpacing: '0.04em' }}>Command Center</Typography>
            </Box>
          </Box>

          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              fontSize: { md: '2rem', lg: '2.375rem' },
              color: '#FFFFFF',
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              mb: 2,
            }}
          >
            Quản trị toàn diện<br />
            <Box component="span" sx={{ color: 'rgba(100, 180, 250, 0.9)' }}>PICC 2026</Box>
          </Typography>

          <Typography sx={{ color: 'rgba(154, 195, 249, 0.9)', fontSize: '0.9375rem', lineHeight: 1.65, maxWidth: 340 }}>
            Hệ thống quản trị dành cho Ban Tổ chức PTIT Innovation Catalyst Challenge. Truy cập bằng tài khoản được cấp quyền.
          </Typography>
        </Box>

        {/* Security note */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            bgcolor: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
            p: 2,
          }}
        >
          <Typography sx={{ fontSize: '0.8125rem', color: 'rgba(154, 195, 249, 0.85)', lineHeight: 1.6 }}>
            Chỉ dành cho thành viên Ban Tổ chức được cấp quyền. Mọi truy cập trái phép sẽ bị ghi nhận và xử lý theo quy định.
          </Typography>
        </Box>
      </Box>

      {/* Right Login Form */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 2, sm: 4 },
        }}
      >
        {/* Mobile brand mark */}
        <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1.5, mb: 4 }}>
          <Box sx={{ width: 36, height: 36, borderRadius: '10px', bgcolor: adminColors.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShieldRoundedIcon sx={{ fontSize: 18, color: '#FFFFFF' }} />
          </Box>
          <Typography sx={{ fontWeight: 800, fontSize: '1rem', color: adminColors.text }}>PICC Admin Portal</Typography>
        </Box>

        <Box
          sx={{
            width: '100%',
            maxWidth: 440,
            bgcolor: adminColors.surface,
            borderRadius: adminRadius.modal,
            border: `1px solid ${adminColors.border}`,
            boxShadow: adminShadow.modal,
            p: { xs: 3, sm: 4 },
          }}
        >
          <Typography
            variant="h1"
            sx={{ fontWeight: 800, fontSize: '1.5rem', color: adminColors.text, letterSpacing: '-0.02em', mb: 0.75 }}
          >
            Đăng nhập
          </Typography>
          <Typography sx={{ fontSize: '0.875rem', color: adminColors.textMuted, mb: 3 }}>
            Nhập thông tin tài khoản quản trị của bạn.
          </Typography>

          {error && (
            <Alert
              severity="error"
              sx={{ mb: 2.5, borderRadius: '10px', fontSize: '0.825rem', bgcolor: adminColors.dangerBg, color: adminColors.danger, border: `1px solid ${adminColors.dangerBorder}`, '& .MuiAlert-icon': { color: adminColors.danger } }}
            >
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              autoComplete="username"
              inputProps={{ 'aria-label': 'Email đăng nhập' }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: adminRadius.input,
                  '& fieldset': { borderColor: adminColors.border },
                  '&:hover fieldset': { borderColor: adminColors.primary },
                  '&.Mui-focused fieldset': { borderColor: adminColors.primary, borderWidth: '1.5px' },
                },
                '& .MuiInputLabel-root': { fontSize: '0.875rem', color: adminColors.textMuted },
                '& .MuiInputLabel-root.Mui-focused': { color: adminColors.primary },
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailRoundedIcon sx={{ fontSize: 18, color: adminColors.textMuted }} />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              label="Mật khẩu"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              required
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              autoComplete="current-password"
              inputProps={{ 'aria-label': 'Mật khẩu' }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: adminRadius.input,
                  '& fieldset': { borderColor: adminColors.border },
                  '&:hover fieldset': { borderColor: adminColors.primary },
                  '&.Mui-focused fieldset': { borderColor: adminColors.primary, borderWidth: '1.5px' },
                },
                '& .MuiInputLabel-root': { fontSize: '0.875rem', color: adminColors.textMuted },
                '& .MuiInputLabel-root.Mui-focused': { color: adminColors.primary },
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockRoundedIcon sx={{ fontSize: 18, color: adminColors.textMuted }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        size="small"
                        sx={{ color: adminColors.textMuted }}
                      >
                        {showPassword
                          ? <VisibilityOffRoundedIcon sx={{ fontSize: 18 }} />
                          : <VisibilityRoundedIcon sx={{ fontSize: 18 }} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                height: 44,
                borderRadius: adminRadius.button,
                fontWeight: 700,
                fontSize: '0.9375rem',
                bgcolor: adminColors.primary,
                color: '#FFFFFF',
                textTransform: 'none',
                boxShadow: 'none',
                mt: 0.5,
                '&:hover': {
                  bgcolor: adminColors.primaryHover,
                  boxShadow: '0 4px 12px rgba(56, 130, 241, 0.3)',
                },
                '&:disabled': { opacity: 0.65 },
              }}
            >
              {loading ? 'Đang xác thực...' : 'Đăng nhập'}
            </Button>
          </Box>

          <Divider sx={{ my: 3, borderColor: adminColors.border }} />

          <Box sx={{ textAlign: 'center' }}>
            <Link
              component={RouterLink}
              to="/"
              sx={{
                fontSize: '0.8125rem',
                color: adminColors.textMuted,
                textDecoration: 'none',
                '&:hover': { color: adminColors.primary },
              }}
            >
              Quay lại website công khai
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLoginPage;
