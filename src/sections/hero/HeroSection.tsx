import { Box, Typography, Container, Chip, Grid, Paper } from '@mui/material';
import { motion } from 'motion/react';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import { hero } from '@/content/vi/hero';
import { piccColors } from '@/theme/palette';
import { fadeInUp, staggerContainer } from '@/motion/variants';
import { RegistrationCountdown } from './RegistrationCountdown';
import { HeroActions } from './HeroActions';
import { FloatingIdeaIcons } from './FloatingIdeaIcons';
import { HeroArtwork } from './HeroArtwork';
import { useRegistrationStatus } from '@/features/registration/hooks';

export const HeroSection = () => {
  const { status, config } = useRegistrationStatus();

  const targetDate =
    status === 'open' && config.registration.closeAt
      ? new Date(config.registration.closeAt)
      : status === 'not_open' && config.registration.openAt
        ? new Date(config.registration.openAt)
        : null;

  return (
    <Box
      component="section"
      id="hero"
      sx={{
        position: 'relative',
        minHeight: { xs: 'auto', md: 'clamp(820px, 94vh, 1020px)' },
        background: `linear-gradient(135deg, #E6F3FE 0%, #BAE1FD 45%, #7DD3FC 100%)`,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        pt: { xs: 15, md: 17 },
        pb: { xs: 8, md: 12 },
      }}
    >
      {/* Top Right Atmospheric Pink/Blue Glow Blur */}
      <Box
        sx={{
          position: 'absolute',
          top: '-12%',
          right: '-5%',
          width: { xs: 340, md: 620 },
          height: { xs: 340, md: 620 },
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(232, 91, 159, 0.35) 0%, rgba(131, 201, 250, 0.45) 50%, transparent 75%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Bottom Left Atmospheric Yellow/Sky Glow Blur */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '-10%',
          left: '-5%',
          width: { xs: 300, md: 500 },
          height: { xs: 300, md: 500 },
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(251, 188, 4, 0.3) 0%, rgba(131, 201, 250, 0.35) 50%, transparent 75%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <FloatingIdeaIcons />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 3 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: { xs: 5, md: 6 },
          }}
        >
          {/* Left Content Glassmorphic Panel */}
          <Box
            sx={{
              maxWidth: { xs: '100%', md: '52%' },
              width: '100%',
              bgcolor: 'rgba(255, 255, 255, 0.82)',
              backdropFilter: 'blur(18px)',
              borderRadius: '32px',
              p: { xs: 3.5, sm: 4.5, md: 5 },
              boxShadow: '0 24px 60px rgba(23, 59, 102, 0.12)',
              border: '1.5px solid rgba(255, 255, 255, 0.95)',
            }}
          >
            {/* Eyebrow Badge */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
            >
              <Chip
                icon={<StarRoundedIcon sx={{ color: `${piccColors.yellow[700]} !important` }} />}
                label={hero.eyebrow}
                sx={{
                  bgcolor: 'rgba(254, 247, 224, 0.95)',
                  color: piccColors.yellow[700],
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  mb: 2,
                  border: `1.5px solid ${piccColors.yellow[300]}`,
                  boxShadow: '0 4px 14px rgba(251, 188, 4, 0.18)',
                }}
              />
            </motion.div>

            {/* Main Title with Colorful Pill Chips */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.18 }}
            >
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  mb: 1.5,
                  color: piccColors.ink,
                  fontWeight: 850,
                  fontSize: { xs: '2.2rem', sm: '2.9rem', md: '3.4rem' },
                  lineHeight: 1.12,
                  letterSpacing: '-0.025em',
                }}
              >
                <Box
                  component="span"
                  sx={{
                    bgcolor: piccColors.blue[700],
                    color: '#FFFFFF',
                    px: 1.5,
                    py: 0.25,
                    borderRadius: '16px',
                    display: 'inline-block',
                    mr: 1,
                    boxShadow: '0 4px 14px rgba(36, 95, 168, 0.3)',
                  }}
                >
                  PTIT
                </Box>
                Innovation Catalyst Challenge{' '}
                <Box
                  component="span"
                  sx={{
                    bgcolor: piccColors.pink[500],
                    color: '#FFFFFF',
                    px: 1.5,
                    py: 0.25,
                    borderRadius: '16px',
                    display: 'inline-block',
                    ml: 1,
                    boxShadow: '0 4px 14px rgba(232, 91, 159, 0.3)',
                  }}
                >
                  2026
                </Box>
              </Typography>
            </motion.div>

            {/* Slogan */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.24 }}
            >
              <Box sx={{ mb: 2.5, display: 'inline-block' }}>
                <Typography
                  variant="h3"
                  component="span"
                  sx={{
                    background: `linear-gradient(135deg, ${piccColors.pink[500]}, ${piccColors.blue[700]})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 850,
                    fontSize: { xs: '1.3rem', md: '1.5rem' },
                    letterSpacing: '-0.015em',
                  }}
                >
                  {hero.theme}
                </Typography>
              </Box>
            </motion.div>

            {/* Description */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  mb: 3.5,
                  maxWidth: 500,
                  fontSize: { xs: '0.95rem', md: '1.025rem' },
                  lineHeight: 1.65,
                  fontWeight: 600,
                }}
              >
                {hero.description}
              </Typography>
            </motion.div>

            {/* Countdown Bento Widget */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.38 }}
            >
              <RegistrationCountdown targetDate={targetDate} status={status} />
            </motion.div>

            {/* Hero CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.46 }}
            >
              <HeroActions status={status} />
            </motion.div>

            {/* Integrated Quick Facts Bento Row */}
            <Box
              component={motion.div}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              sx={{ mt: 4.5 }}
            >
              <Grid container spacing={1.5}>
                <Grid item xs={12} sm={4}>
                  <Paper
                    component={motion.div}
                    variants={fadeInUp}
                    elevation={0}
                    sx={{
                      p: 1.5,
                      borderRadius: 4,
                      bgcolor: 'rgba(255, 255, 255, 0.92)',
                      border: `1.5px solid ${piccColors.sky[200]}`,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.25,
                      boxShadow: '0 4px 14px rgba(23, 59, 102, 0.05)',
                    }}
                  >
                    <Box
                      sx={{
                        width: 34,
                        height: 34,
                        borderRadius: 3,
                        bgcolor: piccColors.sky[100],
                        color: piccColors.blue[700],
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <SchoolRoundedIcon sx={{ fontSize: 18 }} />
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.675rem', display: 'block', fontWeight: 600 }}>
                        Đối tượng
                      </Typography>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800, color: piccColors.ink, fontSize: '0.8rem', lineHeight: 1.2 }}>
                        SV PTIT & Liên ngành
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Paper
                    component={motion.div}
                    variants={fadeInUp}
                    elevation={0}
                    sx={{
                      p: 1.5,
                      borderRadius: 4,
                      bgcolor: 'rgba(255, 255, 255, 0.92)',
                      border: `1.5px solid ${piccColors.sky[200]}`,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.25,
                      boxShadow: '0 4px 14px rgba(23, 59, 102, 0.05)',
                    }}
                  >
                    <Box
                      sx={{
                        width: 34,
                        height: 34,
                        borderRadius: 3,
                        bgcolor: piccColors.pink[100],
                        color: piccColors.pink[500],
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <GroupsRoundedIcon sx={{ fontSize: 18 }} />
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.675rem', display: 'block', fontWeight: 600 }}>
                        Quy mô
                      </Typography>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800, color: piccColors.ink, fontSize: '0.8rem', lineHeight: 1.2 }}>
                        {config.teamSize.min} - {config.teamSize.max} SV / Đội
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Paper
                    component={motion.div}
                    variants={fadeInUp}
                    elevation={0}
                    sx={{
                      p: 1.5,
                      borderRadius: 4,
                      bgcolor: 'rgba(255, 255, 255, 0.92)',
                      border: `1.5px solid ${piccColors.yellow[300]}`,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.25,
                      boxShadow: '0 4px 14px rgba(251, 188, 4, 0.12)',
                    }}
                  >
                    <Box
                      sx={{
                        width: 34,
                        height: 34,
                        borderRadius: 3,
                        bgcolor: piccColors.yellow[100],
                        color: piccColors.yellow[700],
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <EmojiEventsRoundedIcon sx={{ fontSize: 18 }} />
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.675rem', display: 'block', fontWeight: 600 }}>
                        Tổng giải thưởng
                      </Typography>
                      <Typography variant="subtitle2" sx={{ fontWeight: 850, color: piccColors.ink, fontSize: '0.8rem', lineHeight: 1.2 }}>
                        100.000.000+ VNĐ
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </Box>

          {/* Right Column: Floating 3D Artwork */}
          <HeroArtwork />
        </Box>
      </Container>

      {/* Cloud wave transition at bottom */}
      <Box
        sx={{
          position: 'absolute',
          bottom: -1,
          left: 0,
          right: 0,
          height: { xs: 36, md: 58 },
          zIndex: 3,
          pointerEvents: 'none',
        }}
      >
        <svg viewBox="0 0 1440 72" fill="none" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
          <path
            d="M0,32 C240,72 480,12 720,44 C960,76 1200,24 1440,54 L1440,72 L0,72 Z"
            fill={piccColors.surface}
          />
        </svg>
      </Box>
    </Box>
  );
};
