import { Card, CardContent, Box, Typography, Grid } from '@mui/material';
import StarsRoundedIcon from '@mui/icons-material/StarsRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { motion } from 'motion/react';
import { fadeInUp } from '@/motion/variants';
import { competitionData } from '@/data/competition';

const COLORS = ['#397CE8', '#7457E8', '#1B9B72', '#E8599A'];

export const JudgingCriteria = () => {
  return (
    <motion.div variants={fadeInUp} style={{ height: '100%' }}>
      <Card
        sx={{
          height: '100%',
          borderRadius: 4,
          bgcolor: '#FFFFFF',
          border: '1px solid #DDE6F1',
          boxShadow: '0 8px 30px rgba(22, 58, 103, 0.05)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 14px 40px rgba(22, 58, 103, 0.1)',
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
                color: '#E8599A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <StarsRoundedIcon sx={{ fontSize: 19 }} />
            </Box>
            <Box>
              <Typography sx={{ fontSize: '0.675rem', fontWeight: 800, color: '#E8599A', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Đánh Giá Bài Thi
              </Typography>
              <Typography sx={{ fontSize: { xs: '1.1rem', md: '1.2rem' }, fontWeight: 800, color: '#163A67', lineHeight: 1.2 }}>
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
                    bgcolor: '#F8FAFD',
                    border: '1px solid #DDE6F1',
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

                  <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: '#163A67', lineHeight: 1.45 }}>
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
