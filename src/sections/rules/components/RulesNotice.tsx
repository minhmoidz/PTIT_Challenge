import { Card, CardContent, Box, Typography } from '@mui/material';
import GavelRoundedIcon from '@mui/icons-material/GavelRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import { motion } from 'motion/react';
import { fadeInUp } from '@/motion/variants';
import { competitionData } from '@/data/competition';

export const RulesNotice = () => {
  return (
    <motion.div variants={fadeInUp}>
      <Card
        sx={{
          borderRadius: 4,
          bgcolor: '#FFFFFF',
          border: '1px solid #DDE6F1',
          boxShadow: '0 8px 30px rgba(22, 58, 103, 0.05)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 14px 40px rgba(22, 58, 103, 0.1)',
          },
        }}
      >
        <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: '10px',
                bgcolor: '#FEF3C7',
                color: '#D97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <GavelRoundedIcon sx={{ fontSize: 19 }} />
            </Box>
            <Box>
              <Typography sx={{ fontSize: '0.675rem', fontWeight: 800, color: '#D97706', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Tuân Thủ & Cam Kết
              </Typography>
              <Typography sx={{ fontSize: { xs: '1.1rem', md: '1.2rem' }, fontWeight: 800, color: '#163A67', lineHeight: 1.2 }}>
                05 Quy Định Chung Cuộc Thi
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {competitionData.generalRules.map((rule, idx) => (
              <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                <CheckCircleOutlineRoundedIcon sx={{ fontSize: 18, color: '#397CE8', flexShrink: 0, mt: '2px' }} />
                <Typography sx={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.55, fontWeight: 500 }}>
                  {rule}
                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RulesNotice;
