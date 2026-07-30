import { Box, Typography, Grid } from '@mui/material';
import RouteRoundedIcon from '@mui/icons-material/RouteRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import FolderZipRoundedIcon from '@mui/icons-material/FolderZipRounded';
import { motion } from 'motion/react';
import { fadeInUp } from '@/motion/variants';
import { piccColors } from '@/theme/palette';
import { competitionData } from '@/data/competition';

const STATS = [
  {
    number: '03',
    label: 'Vòng thi',
    icon: RouteRoundedIcon,
    color: '#397CE8',
    bg: '#EAF2FF',
  },
  {
    number: `${competitionData.teamRules.min}–${competitionData.teamRules.max}`,
    label: 'Thành viên / đội',
    icon: GroupsRoundedIcon,
    color: '#7457E8',
    bg: '#F0EDFF',
  },
  {
    number: '03',
    label: 'Thành phần hồ sơ',
    icon: FolderZipRoundedIcon,
    color: '#1B9B72',
    bg: '#EAFBF5',
  },
];

export const RulesHeader = () => {
  return (
    <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 5 }, position: 'relative' }}>
      {/* Background Soft Radial Glow */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -60%)',
          width: { xs: 300, md: 540 },
          height: { xs: 300, md: 540 },
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(57, 124, 232, 0.08) 0%, rgba(116, 87, 232, 0.04) 50%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <Box component={motion.div} variants={fadeInUp} sx={{ position: 'relative', zIndex: 1, fontFamily: '"Manrope", sans-serif' }}>
        {/* Red Accent Line */}
        <Box
          sx={{
            width: 44,
            height: 4,
            bgcolor: piccColors.ptitRed,
            borderRadius: 2,
            mx: 'auto',
            mb: 2,
          }}
        />

        {/* Heading */}
        <Typography
          variant="h2"
          component="h2"
          sx={{
            mb: 1.25,
            color: piccColors.ptitNavy,
            fontWeight: 800,
            fontSize: { xs: '2rem', sm: '2.5rem', md: '2.8rem' },
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            fontFamily: '"Manrope", sans-serif',
          }}
        >
          Tổng Quan Thể Lệ <Box component="span" sx={{ color: piccColors.ptitRed }}>PICC 2026</Box>
        </Typography>

        {/* Subtitle */}
        <Typography
          sx={{
            color: '#4e4f53',
            maxWidth: 640,
            mx: 'auto',
            fontSize: { xs: '0.95rem', md: '1.05rem' },
            lineHeight: 1.6,
            mb: 3,
            fontFamily: '"Manrope", sans-serif',
          }}
        >
          Tất cả thông tin quan trọng bạn cần biết trước khi bắt đầu hành trình tại PICC 2026.
        </Typography>

        {/* 3 Summary Stat Items Container */}
        <Box
          sx={{
            maxWidth: 680,
            mx: 'auto',
            p: { xs: 2, sm: 2.25 },
            bgcolor: '#FFFFFF',
            borderRadius: 4,
            border: '1px solid #DDE6F1',
            boxShadow: '0 4px 20px rgba(22, 58, 103, 0.05)',
          }}
        >
          <Grid container spacing={2} alignItems="center" justifyContent="center">
            {STATS.map((stat, idx) => {
              const Icon = stat.icon;

              return (
                <Grid size={{ xs: 4, sm: 4 }} key={idx}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                    }}
                  >
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: '10px',
                        bgcolor: stat.bg,
                        color: stat.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 0.75,
                      }}
                    >
                      <Icon sx={{ fontSize: 20 }} />
                    </Box>

                    <Typography
                      sx={{
                        fontSize: { xs: '1.25rem', sm: '1.6rem' },
                        fontWeight: 800,
                        color: '#163A67',
                        lineHeight: 1.1,
                      }}
                    >
                      {stat.number}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: { xs: '0.75rem', sm: '0.825rem' },
                        fontWeight: 600,
                        color: '#66768C',
                        mt: 0.25,
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default RulesHeader;
