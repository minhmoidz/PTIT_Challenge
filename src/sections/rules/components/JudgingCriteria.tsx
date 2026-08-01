import { Card, CardContent, Box, Typography, Grid } from '@mui/material';
import StarsRoundedIcon from '@mui/icons-material/StarsRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { motion } from 'motion/react';
import { fadeInUp } from '@/motion/variants';
import { competitionData } from '@/data/competition';

const COLORS = ['#3882F1', '#6A73DC', '#059669', '#D65890'];

export const JudgingCriteria = () => {
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: '10px',
                bgcolor: '#FFF0F7',
                color: '#D65890',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <StarsRoundedIcon sx={{ fontSize: 19 }} />
            </Box>
            <Box>
              <Typography sx={{ fontSize: '0.675rem', fontWeight: 800, color: '#D65890', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Đánh Giá Bài Thi
              </Typography>
              <Typography sx={{ fontSize: { xs: '1.1rem', md: '1.2rem' }, fontWeight: 800, color: '#0F2A52', lineHeight: 1.2 }}>
                04 Tiêu Chí Chấm Giải
              </Typography>
            </Box>
          </Box>

          {/* 4 Criteria Cards without unconfirmed percentage weights */}
          <Grid container spacing={1.5}>
            {competitionData.judgingCriteria.map((criterion, idx) => (
              <Grid size={{ xs: 12, sm: 6 }} key={idx}>
                <Box
                  sx={{
                    p: 1.5,
                    px: 1.75,
                    borderRadius: 2.5,
                    bgcolor: '#F7F9FC',
                    border: '1px solid #DFE6EF',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 1.25,
                    height: '100%',
                  }}
                >
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      bgcolor: `${COLORS[idx]}15`,
                      color: COLORS[idx],
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      mt: '2px',
                    }}
                  >
                    <CheckCircleRoundedIcon sx={{ fontSize: 15 }} />
                  </Box>

                  <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F2A52', lineHeight: 1.45 }}>
                    {criterion}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default JudgingCriteria;
