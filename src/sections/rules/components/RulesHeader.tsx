import { Box, Typography, Chip, Grid } from '@mui/material';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import RouteRoundedIcon from '@mui/icons-material/RouteRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import FolderZipRoundedIcon from '@mui/icons-material/FolderZipRounded';
import { motion } from 'motion/react';
import { fadeInUp } from '@/motion/variants';
import { piccColors } from '@/theme/palette';

const STATS = [
  {
    number: '04',
    label: 'Giai đoạn thi',
    icon: RouteRoundedIcon,
    color: piccColors.blue[600],
    bg: piccColors.blue[100],
  },
  {
    number: '3–4',
    label: 'Thành viên / đội',
    icon: GroupsRoundedIcon,
    color: piccColors.indigo[600],
    bg: piccColors.indigo[100],
  },
  {
    number: '03',
    label: 'Thành phần hồ sơ',
    icon: FolderZipRoundedIcon,
    color: piccColors.emerald[500],
    bg: piccColors.emerald[100],
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
          background: 'radial-gradient(circle, rgba(255, 31, 31, 0.07) 0%, rgba(15, 42, 82, 0.05) 50%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <Box component={motion.div} variants={fadeInUp} sx={{ position: 'relative', zIndex: 1 }}>
        {/* Eyebrow Badge */}
        <Chip
          icon={<MenuBookRoundedIcon sx={{ fontSize: '15px !important', color: `${piccColors.blue[600]} !important` }} />}
          label="Quy định & Thể lệ"
          sx={{
            bgcolor: piccColors.blue[100],
            color: piccColors.ptitNavy,
            fontWeight: 700,
            fontSize: '0.825rem',
            mb: 1.5,
            px: 1.5,
            py: 0.5,
            border: `1px solid ${piccColors.blue[300]}`,
            boxShadow: '0 4px 12px rgba(53, 84, 126, 0.10)',
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
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
          }}
        >
          Tổng Quan Thể Lệ PICC 2026
        </Typography>

        {/* Subtitle */}
        <Typography
          sx={{
            color: piccColors.slate[500],
            maxWidth: 640,
            mx: 'auto',
            fontSize: { xs: '0.95rem', md: '1.05rem' },
            lineHeight: 1.6,
            mb: 3,
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
            bgcolor: piccColors.semantic.surface,
            borderRadius: 4,
            border: `1px solid ${piccColors.slate[200]}`,
            boxShadow: '0 4px 20px rgba(15, 42, 82, 0.06)',
          }}
        >
          <Grid container spacing={2} alignItems="center" justifyContent="center">
            {STATS.map((stat, idx) => {
              const Icon = stat.icon;

              return (
                <Grid size={{ xs: 4, sm: 4 }} key={idx}>
                  <Box
                    component={motion.div}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.45, delay: 0.12 + idx * 0.08, ease: 'easeOut' }}
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
                        color: piccColors.ptitNavy,
                        lineHeight: 1.1,
                      }}
                    >
                      {stat.number}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: { xs: '0.75rem', sm: '0.825rem' },
                        fontWeight: 600,
                        color: piccColors.slate[500],
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
