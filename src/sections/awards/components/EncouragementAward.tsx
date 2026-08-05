import { Card, Box, Typography, Chip, CardContent } from '@mui/material';
import StarsRoundedIcon from '@mui/icons-material/StarsRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CardGiftcardRoundedIcon from '@mui/icons-material/CardGiftcardRounded';
import WorkOutlineRoundedIcon from '@mui/icons-material/WorkOutlineRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import { motion } from 'motion/react';
import { fadeInUp } from '@/motion/variants';
import { Tilt3DCard } from '@/components/ui/Tilt3DCard';
import { competitionData } from '@/data/competition';
import { piccColors } from '@/theme/palette';

export const EncouragementAward = () => {
  const p4 = competitionData.prizes.find((p) => p.rank === 4) ?? competitionData.prizes[3];
  if (!p4) return null;

  return (
    <motion.div variants={fadeInUp}>
      <Tilt3DCard maxTilt={4} scale={1.01} glareColor="rgba(54, 123, 234, 0.25)">
        <Card
          sx={{
            mt: 4,
            borderRadius: '24px',
            bgcolor: 'rgba(255, 255, 255, 0.94)',
            backdropFilter: 'blur(16px)',
            border: '1.5px solid rgba(54, 123, 234, 0.25)',
            boxShadow: '0 12px 36px rgba(15, 42, 82, 0.07)',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              boxShadow: '0 20px 48px rgba(54, 123, 234, 0.18)',
              borderColor: 'rgba(54, 123, 234, 0.45)',
              transform: 'translateY(-4px)',
              '& .award-main-icon': {
                transform: 'scale(1.08) rotate(4deg)',
              },
            },
          }}
        >
          {/* Top Accent Gradient Bar (Smoothly Clipped by Border Radius) */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 4,
              background: 'linear-gradient(90deg, #367BEA 0%, #6366F1 50%, #7457E8 100%)',
              zIndex: 2,
            }}
          />

          {/* Soft Radial Ambient Background Glow */}
          <Box
            aria-hidden="true"
            sx={{
              position: 'absolute',
              top: -40,
              right: -40,
              width: 260,
              height: 260,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 70%)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />

          {/* Decorative Subtle Star Icon */}
          <StarsRoundedIcon
            sx={{
              position: 'absolute',
              bottom: -15,
              right: -15,
              fontSize: '8.5rem',
              color: 'rgba(54, 123, 234, 0.05)',
              userSelect: 'none',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />

          <CardContent
            sx={{
              p: { xs: 3, sm: 4 },
              pt: { xs: 3.5, sm: 4 },
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { xs: 'flex-start', md: 'center' },
              justifyContent: 'space-between',
              gap: { xs: 3, md: 4 },
              position: 'relative',
              zIndex: 1,
            }}
          >
            {/* Area 1: Badge, 3D Icon and Title */}
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
              <Chip
                icon={<AutoAwesomeRoundedIcon sx={{ fontSize: '13px !important', color: '#2A55D3 !important' }} />}
                label="GIẢI KHUYẾN KHÍCH"
                sx={{
                  background: 'linear-gradient(135deg, rgba(54, 123, 234, 0.12) 0%, rgba(99, 102, 241, 0.12) 100%)',
                  color: '#2A55D3',
                  fontWeight: 800,
                  fontSize: '0.725rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  height: 28,
                  alignSelf: 'flex-start',
                  mb: 2.25,
                  px: 1,
                  border: '1px solid rgba(54, 123, 234, 0.25)',
                }}
              />

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
                <Box
                  className="award-main-icon"
                  sx={{
                    width: 62,
                    height: 62,
                    borderRadius: '18px',
                    background: 'linear-gradient(135deg, #367BEA 0%, #6366F1 100%)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 8px 22px rgba(54, 123, 234, 0.3)',
                    transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  }}
                >
                  <StarsRoundedIcon sx={{ fontSize: 34 }} />
                </Box>

                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    sx={{
                      fontSize: { xs: '1.2rem', sm: '1.35rem' },
                      fontWeight: 850,
                      color: piccColors.ptitNavy,
                      mb: 0.5,
                      lineHeight: 1.25,
                    }}
                  >
                    03 {p4.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      color: piccColors.slate[600],
                      lineHeight: 1.45,
                    }}
                  >
                    {p4.value}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Area 2: Perks List */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
                flex: 1.1,
                borderLeft: { xs: 'none', md: '1px dashed rgba(54, 123, 234, 0.22)' },
                pl: { xs: 0, md: 4 },
                pt: { xs: 2.5, md: 0 },
                borderTop: { xs: '1px dashed rgba(54, 123, 234, 0.22)', md: 'none' },
                width: { xs: '100%', md: 'auto' },
              }}
            >
              {[
                { icon: CheckCircleRoundedIcon, color: piccColors.blue[600], bg: piccColors.blue[50], text: 'Bằng khen & Chứng nhận PICC' },
                { icon: CardGiftcardRoundedIcon, color: piccColors.indigo[600], bg: piccColors.indigo[50], text: 'Phần thưởng & Quà tặng từ BTC' },
                { icon: WorkOutlineRoundedIcon, color: piccColors.emerald[600], bg: piccColors.emerald[50], text: 'Cơ hội kết nối doanh nghiệp & Mentor' },
              ].map((perk, idx) => (
                <Box
                  key={idx}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    p: 1.25,
                    px: 1.75,
                    borderRadius: '14px',
                    bgcolor: 'rgba(245, 248, 255, 0.7)',
                    border: '1px solid rgba(226, 232, 240, 0.8)',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: '#FFFFFF',
                      borderColor: perk.color,
                      transform: 'translateX(3px)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 30,
                      height: 30,
                      borderRadius: '10px',
                      bgcolor: perk.bg,
                      color: perk.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <perk.icon sx={{ fontSize: 18 }} />
                  </Box>

                  <Typography
                    sx={{
                      fontSize: '0.885rem',
                      fontWeight: 700,
                      color: piccColors.ptitNavy,
                      lineHeight: 1.4,
                    }}
                  >
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
