import { Container, Typography, Grid, Card, CardContent, Box, Chip } from '@mui/material';
import { motion } from 'motion/react';
import BusinessCenterRounded from '@mui/icons-material/BusinessCenterRounded';
import GroupsRounded from '@mui/icons-material/GroupsRounded';
import LightbulbRounded from '@mui/icons-material/LightbulbRounded';
import RocketLaunchRounded from '@mui/icons-material/RocketLaunchRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import { introduction } from '@/content/vi/introduction';
import { fadeInUp, staggerContainer } from '@/motion/variants';
import { piccColors } from '@/theme/palette';
import { Tilt3DCard } from '@/components/ui/Tilt3DCard';
import { SkyBackground, getSkyBackground } from '@/components/ui/SkyBackground';

const iconMap: Record<string, React.ElementType> = {
  BusinessCenterRounded,
  GroupsRounded,
  LightbulbRounded,
  RocketLaunchRounded,
};

const cardAccents = [
  {
    color: piccColors.blue[600],
    bg: 'linear-gradient(135deg, #EAF2FF 0%, #DCEBFF 100%)',
    border: 'rgba(57, 124, 232, 0.3)',
    shadow: 'rgba(57, 124, 232, 0.15)',
    tagBg: 'rgba(57, 124, 232, 0.1)',
    stepColor: '#245FA8',
  },
  {
    color: piccColors.pink[500],
    bg: 'linear-gradient(135deg, #FFF0F7 0%, #FFE5F2 100%)',
    border: 'rgba(232, 91, 159, 0.3)',
    shadow: 'rgba(232, 91, 159, 0.15)',
    tagBg: 'rgba(232, 91, 159, 0.1)',
    stepColor: '#D94A8E',
  },
  {
    color: piccColors.amber[600],
    bg: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
    border: 'rgba(245, 158, 11, 0.3)',
    shadow: 'rgba(245, 158, 11, 0.15)',
    tagBg: 'rgba(245, 158, 11, 0.12)',
    stepColor: '#B45309',
  },
  {
    color: piccColors.indigo[600],
    bg: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)',
    border: 'rgba(99, 102, 241, 0.3)',
    shadow: 'rgba(99, 102, 241, 0.15)',
    tagBg: 'rgba(99, 102, 241, 0.1)',
    stepColor: '#4F46E5',
  },
];

export const IntroductionSection = () => (
  <Box
    component="section"
    id="gioi-thieu"
    sx={{
      py: { xs: 9, md: 14 },
      background: getSkyBackground('clear'),
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    {/* Sky World Background — clear variant */}
    <SkyBackground variant="clear" />

    <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
      {/* Section Header */}
      <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
        <Chip
          icon={
            <AutoAwesomeRoundedIcon
              sx={{ fontSize: 16, color: `${piccColors.blue[700]} !important` }}
            />
          }
          label="Về PICC 2026"
          sx={{
            bgcolor: 'rgba(234, 242, 255, 0.9)',
            backdropFilter: 'blur(8px)',
            color: piccColors.blue[700],
            fontWeight: 800,
            fontSize: '0.825rem',
            mb: 2.5,
            px: 1.5,
            py: 0.5,
            border: '1px solid rgba(57, 124, 232, 0.25)',
            boxShadow: '0 4px 12px rgba(57, 124, 232, 0.08)',
          }}
        />
        <Typography
          variant="h2"
          component="h2"
          sx={{
            mb: 2,
            color: piccColors.ink,
            fontWeight: 800,
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            letterSpacing: '-0.025em',
            lineHeight: 1.15,
          }}
        >
          Hành Trình Khai Phóng Sáng Tạo &amp; Đổi Mới
        </Typography>
        <Typography
          sx={{
            maxWidth: 780,
            mx: 'auto',
            color: piccColors.slate[600],
            fontSize: { xs: '0.975rem', md: '1.075rem' },
            lineHeight: 1.7,
            fontWeight: 400,
          }}
        >
          {introduction.paragraph}
        </Typography>
      </Box>

      {/* 4 Feature Cards */}
      <Box
        component={motion.div}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <Grid container spacing={{ xs: 2.5, md: 3 }} alignItems="stretch">
          {introduction.values.map((v, i) => {
            const Icon = iconMap[v.icon] ?? LightbulbRounded;
            const accent = cardAccents[i % cardAccents.length];

            return (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={v.title} sx={{ display: 'flex' }}>
                <motion.div
                  variants={fadeInUp}
                  style={{ width: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <Tilt3DCard
                    maxTilt={8}
                    scale={1.02}
                    glareColor={accent.border}
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Card
                      sx={{
                        height: '100%',
                        borderRadius: '24px',
                        bgcolor: 'rgba(255, 255, 255, 0.92)',
                        backdropFilter: 'blur(20px)',
                        border: '1.5px solid rgba(226, 232, 240, 0.85)',
                        boxShadow: '0 10px 32px rgba(22, 58, 103, 0.05)',
                        position: 'relative',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                          borderColor: accent.color,
                          boxShadow: `0 16px 40px ${accent.shadow}`,
                          transform: 'translateY(-4px)',
                        },
                      }}
                    >
                      {/* Top Accent Gradient Bar */}
                      <Box
                        sx={{
                          height: 4,
                          width: '100%',
                          background: `linear-gradient(90deg, ${accent.color} 0%, ${accent.stepColor} 100%)`,
                        }}
                      />

                      <CardContent
                        sx={{
                          p: { xs: 3, md: 3.25 },
                          display: 'flex',
                          flexDirection: 'column',
                          flexGrow: 1,
                        }}
                      >
                        {/* Header Row: Icon & Step Tag */}
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            mb: 2.75,
                          }}
                        >
                          <Box
                            sx={{
                              width: 52,
                              height: 52,
                              borderRadius: '16px',
                              background: accent.bg,
                              color: accent.color,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              boxShadow: `0 8px 18px ${accent.shadow}`,
                              border: `1px solid ${accent.border}`,
                            }}
                          >
                            <Icon sx={{ fontSize: 26 }} />
                          </Box>

                          <Box
                            sx={{
                              px: 1.5,
                              py: 0.5,
                              borderRadius: '999px',
                              bgcolor: accent.tagBg,
                              color: accent.stepColor,
                              fontWeight: 800,
                              fontSize: '0.75rem',
                              letterSpacing: '0.05em',
                            }}
                          >
                            {v.step}
                          </Box>
                        </Box>

                        {/* Title */}
                        <Typography
                          sx={{
                            fontSize: { xs: '1.075rem', md: '1.15rem' },
                            fontWeight: 800,
                            color: piccColors.ink,
                            mb: 1.25,
                            lineHeight: 1.3,
                            minHeight: { md: '2.6em' }, // Ensures title alignment across cards
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          {v.title}
                        </Typography>

                        {/* Description */}
                        <Typography
                          sx={{
                            fontSize: '0.885rem',
                            color: piccColors.slate[600],
                            lineHeight: 1.6,
                            fontWeight: 450,
                          }}
                        >
                          {v.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Tilt3DCard>
                </motion.div>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Container>
  </Box>
);

export default IntroductionSection;
