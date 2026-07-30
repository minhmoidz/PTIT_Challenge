import { Container, Typography, Grid, Card, CardContent, Box } from '@mui/material';
import { motion } from 'motion/react';
import BusinessCenterRounded from '@mui/icons-material/BusinessCenterRounded';
import GroupsRounded from '@mui/icons-material/GroupsRounded';
import LightbulbRounded from '@mui/icons-material/LightbulbRounded';
import RocketLaunchRounded from '@mui/icons-material/RocketLaunchRounded';
import { introduction } from '@/content/vi/introduction';
import { fadeInUp, staggerContainer } from '@/motion/variants';
import { piccColors } from '@/theme/palette';
import { SkyBackground } from '@/components/ui/SkyBackground';
import { getSkyBackground } from '@/components/ui/skyBackgroundConfig';

const iconMap: Record<string, React.ElementType> = {
  BusinessCenterRounded,
  GroupsRounded,
  LightbulbRounded,
  RocketLaunchRounded,
};

const cardAccents = [
  piccColors.blue[600],
  piccColors.blue[600],
  piccColors.blue[600],
  piccColors.blue[600],
];

export const IntroductionSection = () => (
  <Box
    component="section"
    id="gioi-thieu"
    sx={{
      pt: { xs: 8, sm: 10, md: 12 },
      pb: { xs: 7, sm: 8, md: 10 },
      background: getSkyBackground('clear'),
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    {/* Sky World Background — clear variant */}
    <SkyBackground variant="clear" />

    <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
      {/* Section Header */}
      <Box sx={{ textAlign: 'center', mb: { xs: 4, sm: 5, md: 6 }, fontFamily: '"Manrope", sans-serif' }}>
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
        <Typography
          variant="h2"
          component="h2"
          sx={{
            mb: 1.5,
            color: piccColors.ptitNavy,
            fontWeight: 800,
            fontSize: { xs: '1.75rem', sm: '2.1rem', md: '2.4rem' },
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            fontFamily: '"Manrope", sans-serif',
          }}
        >
          Hành Trình Khai Phóng Sáng Tạo &amp; <Box component="span" sx={{ color: piccColors.ptitRed }}>Đổi Mới PTIT</Box>
        </Typography>
        <Typography
          sx={{
            maxWidth: 780,
            mx: 'auto',
            color: '#4e4f53',
            fontSize: { xs: '0.9rem', md: '0.975rem' },
            lineHeight: 1.7,
            fontWeight: 400,
            fontFamily: '"Manrope", sans-serif',
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
                    <Card
                      sx={{
                        height: '100%',
                        borderRadius: '18px',
                        bgcolor: '#FFFFFF',
                        border: '1px solid rgba(226, 232, 240, 0.95)',
                        boxShadow: '0 4px 16px rgba(22, 58, 103, 0.06)',
                        position: 'relative',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                          borderColor: piccColors.blue[300],
                          boxShadow: '0 10px 24px rgba(22, 58, 103, 0.1)',
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      {/* Top Accent Gradient Bar */}
                      <Box
                        sx={{
                          height: 3,
                          width: '100%',
                          background: accent,
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
                              bgcolor: piccColors.blue[50],
                              color: accent,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              boxShadow: 'none',
                              border: `1px solid ${piccColors.blue[100]}`,
                            }}
                          >
                            <Icon sx={{ fontSize: 26 }} />
                          </Box>

                          <Box
                            sx={{
                              px: 1.5,
                              py: 0.5,
                              borderRadius: '999px',
                              bgcolor: piccColors.blue[50],
                              color: piccColors.blue[700],
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
                            fontWeight: 400,
                          }}
                        >
                          {v.description}
                        </Typography>
                      </CardContent>
                    </Card>
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
