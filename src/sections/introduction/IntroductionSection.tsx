import { Container, Typography, Grid, Card, CardContent, Box, Chip } from '@mui/material';
import { motion } from 'motion/react';
import BusinessCenterRounded from '@mui/icons-material/BusinessCenterRounded';
import GroupsRounded from '@mui/icons-material/GroupsRounded';
import LightbulbRounded from '@mui/icons-material/LightbulbRounded';
import RocketLaunchRounded from '@mui/icons-material/RocketLaunchRounded';
import AutoAwesomeRounded from '@mui/icons-material/AutoAwesomeRounded';
import { introduction } from '@/content/vi/introduction';
import { fadeInUp, staggerContainer, cardHover } from '@/motion/variants';
import { piccColors } from '@/theme/palette';

const iconMap: Record<string, React.ElementType> = {
  BusinessCenterRounded,
  GroupsRounded,
  LightbulbRounded,
  RocketLaunchRounded,
};

const cardAccents = [
  { bg: piccColors.blue[100], iconColor: piccColors.blue[500], border: piccColors.blue[300] },
  { bg: piccColors.pink[100], iconColor: piccColors.pink[500], border: piccColors.pink[300] },
  { bg: piccColors.yellow[100], iconColor: piccColors.yellow[700], border: piccColors.yellow[300] },
  { bg: piccColors.sky[200], iconColor: piccColors.blue[900], border: piccColors.sky[400] },
];

export const IntroductionSection = () => (
  <Box
    component="section"
    id="gioi-thieu"
    sx={{
      py: { xs: 9, md: 14 },
      bgcolor: piccColors.surface,
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <Container maxWidth="lg">
      <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
        <Chip
          icon={<AutoAwesomeRounded sx={{ color: `${piccColors.blue[700]} !important` }} />}
          label="Về PICC 2026"
          sx={{
            bgcolor: piccColors.sky[100],
            color: piccColors.blue[700],
            fontWeight: 700,
            mb: 2,
          }}
        />
        <Typography
          variant="h2"
          component="h2"
          sx={{
            mb: 2,
            color: piccColors.ink,
            fontWeight: 800,
          }}
        >
          Hành trình Khai phóng Sáng tạo
        </Typography>
        <Typography
          variant="body1"
          sx={{
            maxWidth: 780,
            mx: 'auto',
            color: 'text.secondary',
            fontSize: { xs: '1rem', md: '1.1rem' },
            lineHeight: 1.7,
          }}
        >
          {introduction.paragraph}
        </Typography>
      </Box>

      <Box
        component={motion.div}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <Grid container spacing={3}>
          {introduction.values.map((v, index) => {
            const Icon = iconMap[v.icon] ?? LightbulbRounded;
            const accent = cardAccents[index % cardAccents.length];

            return (
              <Grid item xs={12} sm={6} md={3} key={v.title}>
                <motion.div variants={fadeInUp} style={{ height: '100%' }}>
                  <Card
                    component={motion.div}
                    variants={cardHover}
                    initial="rest"
                    whileHover="hover"
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 6,
                      p: 1.5,
                      border: `1.5px solid ${accent.border}`,
                      background: `linear-gradient(180deg, #FFFFFF 0%, ${piccColors.sky[50]} 100%)`,
                    }}
                  >
                    <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: 4,
                          bgcolor: accent.bg,
                          color: accent.iconColor,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 3,
                        }}
                      >
                        <Icon sx={{ fontSize: 32 }} />
                      </Box>
                      <Typography
                        variant="h3"
                        component="h3"
                        sx={{
                          fontSize: '1.2rem',
                          fontWeight: 750,
                          color: piccColors.ink,
                          mb: 1,
                          lineHeight: 1.3,
                        }}
                      >
                        {v.title}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: accent.iconColor,
                          fontWeight: 700,
                          fontSize: '0.75rem',
                          textTransform: 'uppercase',
                          letterSpacing: 1,
                          mt: 'auto',
                        }}
                      >
                        Giá trị 0{index + 1}
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
