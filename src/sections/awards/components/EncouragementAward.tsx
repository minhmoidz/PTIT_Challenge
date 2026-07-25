import { Card, Box, Typography, Chip } from '@mui/material';
import StarsRoundedIcon from '@mui/icons-material/StarsRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CardGiftcardRoundedIcon from '@mui/icons-material/CardGiftcardRounded';
import WorkOutlineRoundedIcon from '@mui/icons-material/WorkOutlineRounded';
import { motion } from 'motion/react';
import { fadeInUp } from '@/motion/variants';
import { Tilt3DCard } from '@/components/ui/Tilt3DCard';
import { competitionData } from '@/data/competition';

export const EncouragementAward = () => {
  const p4 = competitionData.prizes.find((p) => p.rank === 4) || competitionData.prizes[3];

  return (
    <motion.div variants={fadeInUp}>
      <Tilt3DCard maxTilt={4} scale={1.01} glareColor="rgba(54, 123, 234, 0.2)">
        <Card
          sx={{
            borderRadius: 5,
            bgcolor: '#FFFFFF',
            border: '1px solid rgba(54, 123, 234, 0.25)',
            boxShadow: '0 10px 30px rgba(21, 55, 95, 0.06)',
            p: { xs: 3, sm: 4 },
            transition: 'all 0.3s ease',
            '&:hover': {
              borderColor: '#367BEA',
              boxShadow: '0 16px 40px rgba(54, 123, 234, 0.14)',
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { xs: 'flex-start', md: 'center' },
              justifyContent: 'space-between',
              gap: 3,
            }}
          >
            {/* Area 1: Title */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
              <Box
                sx={{
                  width: 54,
                  height: 54,
                  borderRadius: '50%',
                  bgcolor: 'rgba(54, 123, 234, 0.08)',
                  color: '#367BEA',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  border: '2px solid rgba(54, 123, 234, 0.2)',
                }}
              >
                <StarsRoundedIcon sx={{ fontSize: 30 }} />
              </Box>
              <Box>
                <Chip
                  label="GIẢI KHUYẾN KHÍCH"
                  size="small"
                  sx={{
                    bgcolor: 'rgba(54, 123, 234, 0.1)',
                    color: '#367BEA',
                    fontWeight: 800,
                    fontSize: '0.675rem',
                    letterSpacing: '0.08em',
                    mb: 0.5,
                    height: 22,
                  }}
                />
                <Typography sx={{ fontSize: '1.25rem', fontWeight: 800, color: '#15375F', mb: 0.25 }}>
                  03 {p4.title}
                </Typography>
                <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, color: '#367BEA' }}>
                  {p4.value}
                </Typography>
              </Box>
            </Box>

            {/* Area 2: Perks */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: { xs: 1.5, sm: 3 },
                pt: { xs: 2, md: 0 },
                borderTop: { xs: '1px solid rgba(226, 232, 240, 0.8)', md: 'none' },
                width: { xs: '100%', md: 'auto' },
              }}
            >
              {[
                { icon: CheckCircleRoundedIcon, text: 'Bằng khen & Chứng nhận PICC' },
                { icon: CardGiftcardRoundedIcon, text: 'Phần thưởng & Quà tặng từ BTC' },
                { icon: WorkOutlineRoundedIcon, text: 'Cơ hội kết nối doanh nghiệp' },
              ].map((perk, idx) => (
                <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <perk.icon sx={{ fontSize: 18, color: '#367BEA', flexShrink: 0 }} />
                  <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#15375F' }}>
                    {perk.text}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Card>
      </Tilt3DCard>
    </motion.div>
  );
};

export default EncouragementAward;
