import { Card, Box, Typography, Chip, CardContent } from '@mui/material';
import StarsRoundedIcon from '@mui/icons-material/StarsRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CardGiftcardRoundedIcon from '@mui/icons-material/CardGiftcardRounded';
import WorkOutlineRoundedIcon from '@mui/icons-material/WorkOutlineRounded';
import { motion } from 'motion/react';
import { fadeInUp } from '@/motion/variants';
import { Tilt3DCard } from '@/components/ui/Tilt3DCard';
import { competitionData } from '@/data/competition';

export const EncouragementAward = () => {
  const p4 = competitionData.prizes.find((p) => p.rank === 4) ?? competitionData.prizes[3];
  if (!p4) return null;

  const style = {
    bg: '#FFFFFF',
    borderColor: 'rgba(54, 123, 234, 0.3)',
    borderGradient: 'linear-gradient(135deg, #367BEA 0%, #7457E8 100%)',
    shadow: '0 12px 32px rgba(54, 123, 234, 0.14)',
    hoverShadow: '0 20px 45px rgba(54, 123, 234, 0.22)',
    badgeBg: '#F0F6FF',
    badgeColor: '#367BEA',
    iconColor: '#367BEA',
    iconBg: '#F5F9FF',
    iconBorder: '3px solid rgba(54, 123, 234, 0.3)',
    prizeColor: '#15375F',
    watermarkColor: 'rgba(54, 123, 234, 0.05)',
  };

  return (
    <motion.div variants={fadeInUp}>
      <Tilt3DCard maxTilt={4} scale={1.01} glareColor={style.borderColor}>
        <Card
          sx={{
            mt: 4,
            borderRadius: 6,
            bgcolor: style.bg,
            border: '1px solid',
            borderColor: style.borderColor,
            boxShadow: style.shadow,
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              boxShadow: style.hoverShadow,
              transform: 'translateY(-4px)',
              '& .award-main-icon': {
                transform: 'scale(1.08) rotate(3deg)',
              },
            },
          }}
        >
          {/* Top Accent Stripe */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 4,
              background: style.borderGradient,
            }}
          />

          {/* Semi-transparent Background Watermark Icon */}
          <StarsRoundedIcon
            sx={{
              position: 'absolute',
              top: -20,
              right: -20,
              fontSize: '12rem',
              color: style.watermarkColor,
              userSelect: 'none',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />

          <CardContent
            sx={{
              p: { xs: 3, sm: 4 },
              pt: { xs: 4, sm: 4 },
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { xs: 'flex-start', md: 'center' },
              gap: { xs: 3, md: 5 },
              position: 'relative',
              zIndex: 1,
            }}
          >
            {/* Area 1: Icon and Title */}
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <Chip
                label="GIẢI KHUYẾN KHÍCH"
                sx={{
                  background: style.badgeBg,
                  color: style.badgeColor,
                  fontWeight: 800,
                  fontSize: '0.725rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  height: 28,
                  alignSelf: 'flex-start',
                  mb: 2.5,
                  px: 1,
                  border: '1px solid rgba(0,0,0,0.06)',
                }}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
                <Box
                  className="award-main-icon"
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    bgcolor: style.iconBg,
                    color: style.iconColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: `0 8px 24px ${style.watermarkColor}`,
                    border: style.iconBorder,
                    transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  }}
                >
                  <StarsRoundedIcon sx={{ fontSize: 32 }} />
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '1.25rem', fontWeight: 800, color: '#15375F', mb: 0.5 }}>
                    03 {p4.title}
                  </Typography>
                  <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, color: '#367BEA', lineHeight: 1.4 }}>
                    {p4.value}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Area 2: Perks */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1.75,
                flex: 1,
                borderLeft: { xs: 'none', md: '1px dashed rgba(54, 123, 234, 0.2)' },
                pl: { xs: 0, md: 5 },
                pt: { xs: 2, md: 0 },
                borderTop: { xs: '1px dashed rgba(54, 123, 234, 0.2)', md: 'none' },
                width: { xs: '100%', md: 'auto' },
              }}
            >
              {[
                { icon: CheckCircleRoundedIcon, text: 'Bằng khen & Chứng nhận PICC' },
                { icon: CardGiftcardRoundedIcon, text: 'Phần thưởng & Quà tặng từ BTC' },
                { icon: WorkOutlineRoundedIcon, text: 'Cơ hội kết nối doanh nghiệp' },
              ].map((perk, idx) => (
                <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.25 }}>
                  <perk.icon sx={{ fontSize: 18, color: '#367BEA', flexShrink: 0, mt: 0.1 }} />
                  <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#15375F', lineHeight: 1.45 }}>
                    {perk.text}
                  </Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Tilt3DCard>
    </motion.div>
  );
};

export default EncouragementAward;
