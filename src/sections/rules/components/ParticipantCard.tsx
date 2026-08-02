import { Card, CardContent, Box, Typography } from '@mui/material';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { motion } from 'motion/react';
import { fadeInUp } from '@/motion/variants';
import { competitionData } from '@/data/competition';
import { piccColors } from '@/theme/palette';

const CONDITIONS = [
  competitionData.eligibility.target,
  `Mỗi đội thi quy định từ ${competitionData.teamRules.size}`,
  competitionData.teamRules.warning,
];

export const ParticipantCard = () => {
  return (
    <motion.div variants={fadeInUp} style={{ height: '100%' }}>
      <Card
        sx={{
          height: '100%',
          borderRadius: 4,
          bgcolor: '#FFFFFF',
          border: '1px solid #DFE6EF',
          boxShadow: '0 8px 30px rgba(15, 42, 82, 0.05)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 14px 40px rgba(15, 42, 82, 0.1)',
            transform: 'translateY(-3px)',
          },
        }}
      >
        <CardContent sx={{ p: { xs: 2.5, sm: 3 }, pt: 3, pb: '24px !important', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {/* Card Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: '10px',
                bgcolor: '#DFEBFD',
                color: '#3882F1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <SchoolRoundedIcon sx={{ fontSize: 19 }} />
            </Box>
            <Box>
              <Typography sx={{ fontSize: '0.675rem', fontWeight: 800, color: '#3882F1', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Đội Thi & Quy Mô
              </Typography>
              <Typography sx={{ fontSize: { xs: '1.1rem', md: '1.2rem' }, fontWeight: 800, color: '#0F2A52', lineHeight: 1.2 }}>
                Đối Tượng Tham Gia
              </Typography>
            </Box>
          </Box>

          {/* Big Team Size Statistic + Abstract SVG Avatars */}
          <Box
            sx={{
              p: 1.5,
              px: 2,
              borderRadius: 3,
              bgcolor: '#F7F9FC',
              border: '1px solid rgba(56, 130, 241, 0.2)',
              mb: 1.75,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: { xs: '2rem', sm: '2.35rem' },
                  fontWeight: 800,
                  color: '#3882F1',
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                }}
              >
                {competitionData.teamRules.size.replace(' thành viên', '')}
              </Typography>
              <Typography sx={{ fontSize: '0.775rem', fontWeight: 700, color: '#0F2A52', mt: 0.4 }}>
                Thành viên / đội
              </Typography>
            </Box>

            {/* Abstract SVG Avatars */}
            <Box sx={{ display: 'flex', alignItems: 'center', ml: -1 }}>
              {[
                { bg: piccColors.ptitRed, opacity: 0.95 },
                { bg: piccColors.blue[700], opacity: 0.85 },
                { bg: piccColors.yellow[600], opacity: 0.8 },
                { bg: piccColors.slate[500], opacity: 0.7 },
              ].map((av, idx) => (
                <Box
                  key={idx}
                  sx={{
                    width: 26,
                    height: 26,
                    borderRadius: '50%',
                    bgcolor: av.bg,
                    opacity: av.opacity,
                    border: '2px solid #FFFFFF',
                    ml: -1,
                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* Bullet List Conditions */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {CONDITIONS.map((item, i) => (
              <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.25 }}>
                <CheckCircleRoundedIcon sx={{ fontSize: 16, color: piccColors.ptitRed, flexShrink: 0, mt: '2px' }} />
                <Typography sx={{ fontSize: '0.8125rem', color: '#67788F', lineHeight: 1.4, fontWeight: 600 }}>
                  {item}
                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ParticipantCard;
