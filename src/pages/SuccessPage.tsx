import { useState } from 'react';
import { Container, Typography, Button, Box, Paper, Alert, Tooltip } from '@mui/material';
import { motion } from 'motion/react';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import MapRoundedIcon from '@mui/icons-material/MapRounded';
import FacebookRoundedIcon from '@mui/icons-material/Facebook';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import { piccColors } from '@/theme/palette';
import { SkyBackground } from '@/components/ui/SkyBackground';
import { getSkyBackground } from '@/components/ui/skyBackgroundConfig';
import { competitionData } from '@/data/competition';
import { appHash } from '@/config/paths';

interface RegistrationResult {
  registrationCode?: string;
  submissionId?: string;
  submittedAt?: string;
}

const loadResult = (): RegistrationResult | null => {
  try {
    const raw = sessionStorage.getItem('picc-registration-result');
    if (!raw) return null;
    const parsed = JSON.parse(raw) as RegistrationResult;
    return parsed && parsed.registrationCode ? parsed : null;
  } catch {
    return null;
  }
};

const formatSubmittedAt = (iso?: string): string => {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh', hour12: false });
  } catch {
    return '';
  }
};

export const SuccessPage = () => {
  const [result] = useState<RegistrationResult | null>(loadResult);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!result?.registrationCode) return;
    try {
      await navigator.clipboard.writeText(result.registrationCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: getSkyBackground('hero'),
        position: 'relative',
        py: 8,
        overflow: 'hidden',
      }}
    >
      <SkyBackground variant="hero" />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, sm: 6 },
            textAlign: 'center',
            borderRadius: '32px',
            bgcolor: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(223, 230, 239, 0.9)',
            boxShadow: '0 24px 70px rgba(15, 42, 82, 0.12)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Top accent ribbon */}
          <Box
            aria-hidden="true"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 5,
              background: `linear-gradient(90deg, ${piccColors.ptitRed} 0%, ${piccColors.emerald[500]} 50%, ${piccColors.pink[500]} 100%)`,
            }}
          />

          {/* Animated success badge */}
          <Box
            component={motion.div}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 14 }}
            sx={{
              width: 88,
              height: 88,
              mx: 'auto',
              mb: 3,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${piccColors.emerald[500]} 0%, ${piccColors.emerald[600]} 100%)`,
              boxShadow: '0 12px 32px rgba(5, 150, 105, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CheckRoundedIcon sx={{ fontSize: 44, color: '#FFFFFF' }} />
          </Box>

          <Typography
            variant="h2"
            component="h1"
            sx={{
              mb: 2,
              fontWeight: 850,
              fontSize: { xs: '2rem', sm: '2.5rem' },
              color: piccColors.ink,
              letterSpacing: '-0.02em',
            }}
          >
            Đăng ký thành công!
          </Typography>

          {result?.registrationCode ? (
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="body1"
                sx={{
                  color: piccColors.slate[600],
                  mb: 2,
                  lineHeight: 1.7,
                  maxWidth: 620,
                  mx: 'auto',
                  fontSize: '1rem',
                }}
              >
                Ban Tổ chức đã ghi nhận thông tin đăng ký của đội. Mã đăng ký của đội là:
              </Typography>

              <Tooltip title={copied ? 'Đã sao chép!' : 'Sao chép mã đăng ký'}>
                <Box
                  component={motion.div}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  onClick={handleCopy}
                  sx={{
                    cursor: 'pointer',
                    userSelect: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1.5,
                    px: { xs: 3, sm: 5 },
                    py: 2,
                    borderRadius: '16px',
                    border: `1.5px dashed ${piccColors.blue[400]}`,
                    bgcolor: piccColors.blue[50],
                    color: piccColors.ptitNavy,
                    fontFamily: '"JetBrains Mono", "SFMono-Regular", Consolas, monospace',
                    fontSize: { xs: '1.15rem', sm: '1.5rem' },
                    fontWeight: 800,
                    letterSpacing: '0.04em',
                  }}
                >
                  {result.registrationCode}
                  <ContentCopyRoundedIcon sx={{ fontSize: 20, color: piccColors.blue[600] }} />
                </Box>
              </Tooltip>

              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  mt: 1.5,
                  color: piccColors.slate[500],
                  fontSize: '0.8rem',
                }}
              >
                {formatSubmittedAt(result.submittedAt) && `Thời gian nộp: ${formatSubmittedAt(result.submittedAt)} · `}
                Hãy lưu lại mã này để đối chiếu khi cần hỗ trợ.
              </Typography>
            </Box>
          ) : (
            <Alert
              severity="info"
              sx={{
                mb: 3,
                mx: 'auto',
                maxWidth: 620,
                borderRadius: '14px',
                '& .MuiAlert-message': { textAlign: 'left' },
              }}
            >
              Không tìm thấy mã đăng ký trên trình duyệt này. Nếu bạn đã nộp hồ sơ, vui lòng liên hệ Ban Tổ
              chức qua Fanpage để được hỗ trợ đối chiếu.
            </Alert>
          )}

          <Typography
            variant="body2"
            sx={{
              color: piccColors.blue[700],
              fontWeight: 700,
              mb: 4,
              fontSize: '0.925rem',
            }}
          >
            Chúc đội thi có một hành trình bứt phá và đạt nhiều thành công tại PTIT Innovation Catalyst
            Challenge 2026!
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              href={appHash('hero')}
              startIcon={<HomeRoundedIcon />}
              sx={{
                borderRadius: 999,
                px: 3,
                py: 1.2,
                fontWeight: 700,
                bgcolor: piccColors.ptitRed,
                '&:hover': { bgcolor: piccColors.ptitDarkRed },
              }}
            >
              Về trang chủ
            </Button>

            <Button
              variant="outlined"
              href={appHash('lo-trinh')}
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
                borderColor: 'rgba(23, 119, 242, 0.4)',
                '&:hover': {
                  borderColor: '#1877F2',
                  bgcolor: 'rgba(23, 119, 242, 0.05)',
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
};

export default SuccessPage;
