import { Container, Typography, Grid, Card, CardContent, Box, Chip } from '@mui/material';
import { motion, useReducedMotion } from 'motion/react';
import BusinessCenterRounded from '@mui/icons-material/BusinessCenterRounded';
import GroupsRounded from '@mui/icons-material/GroupsRounded';
import LightbulbRounded from '@mui/icons-material/LightbulbRounded';
import RocketLaunchRounded from '@mui/icons-material/RocketLaunchRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import { introduction } from '@/content/vi/introduction';
import { fadeInUp, staggerContainer } from '@/motion/variants';
import { piccColors } from '@/theme/palette';
import { Tilt3DCard } from '@/components/ui/Tilt3DCard';
import { SkyBackground } from '@/components/ui/SkyBackground';
import { getSkyBackground } from '@/components/ui/skyBackgroundConfig';

const iconMap: Record<string, React.ElementType> = {
  BusinessCenterRounded,
  GroupsRounded,
  LightbulbRounded,
  RocketLaunchRounded,
};

const cardAccents = [
  {
    color: piccColors.ptitRed,
    bg: 'linear-gradient(135deg, #FFE9E9 0%, #FFD4D4 100%)',
    border: 'rgba(225, 20, 20, 0.3)',
    shadow: 'rgba(225, 20, 20, 0.16)',
    tagBg: 'rgba(225, 20, 20, 0.1)',
    stepColor: '#B91212',
  },
  {
    color: piccColors.blue[600],
    bg: 'linear-gradient(135deg, #E7EDF6 0%, #D4DFED 100%)',
    border: 'rgba(53, 84, 126, 0.32)',
    shadow: 'rgba(53, 84, 126, 0.16)',
    tagBg: 'rgba(53, 84, 126, 0.1)',
    stepColor: '#0F2A52',
  },
  {
    color: piccColors.amber[600],
    bg: 'linear-gradient(135deg, #FCEFC8 0%, #F3DA8A 100%)',
    border: 'rgba(231, 195, 77, 0.4)',
    shadow: 'rgba(231, 195, 77, 0.18)',
    tagBg: 'rgba(231, 195, 77, 0.14)',
    stepColor: '#7F5D1B',
  },
  {
    // Closes the set on a quiet neutral rather than a fifth hue — red, navy and
    // gold are the brand; anything else here reads as decoration.
    color: piccColors.slate[600],
    bg: 'linear-gradient(135deg, #F0F3F7 0%, #DFE6EF 100%)',
    border: 'rgba(75, 92, 114, 0.28)',
    shadow: 'rgba(75, 92, 114, 0.14)',
    tagBg: 'rgba(75, 92, 114, 0.1)',
    stepColor: '#34465E',
  },
];

export const IntroductionSection = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
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
      <Box component={motion.div} variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
        <motion.div variants={fadeInUp}>
          <Chip
            icon={
              <motion.div
                animate={prefersReducedMotion ? undefined : { rotate: [0, 360] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                style={{ display: 'flex' }}
              >
                <AutoAwesomeRoundedIcon sx={{ fontSize: 16, color: `${piccColors.ptitRed} !important` }} />
              </motion.div>
            }
            label="Về PICC 2026"
            sx={{
              bgcolor: 'rgba(255, 241, 241, 0.9)',
              backdropFilter: 'blur(8px)',
              color: piccColors.ptitRed,
              fontWeight: 800,
              fontSize: '0.825rem',
              mb: 2.5,
              px: 1.5,
              py: 0.5,
              border: '1px solid rgba(225, 20, 20, 0.18)',
              boxShadow: '0 4px 12px rgba(225, 20, 20, 0.08)',
            }}
          />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              mb: 2.5,
              fontWeight: 800,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              letterSpacing: '-0.025em',
              lineHeight: 1.25,
              pb: '0.15em',
              backgroundImage: `linear-gradient(120deg, ${piccColors.ptitRed} 0%, #E7C34D 55%, ${piccColors.ptitNavy} 100%)`,
              backgroundSize: '200% auto',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
            }}
          >
            <motion.span
              animate={prefersReducedMotion ? undefined : { backgroundPosition: ['0% center', '100% center', '0% center'] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
              style={{ display: 'inline-block', paddingBottom: '0.12em' }}
            >
              Hành Trình Khai Phóng Đổi Mới &amp; Sáng Tạo
            </motion.span>
          </Typography>
        </motion.div>

        <motion.div variants={fadeInUp} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14, marginBottom: 20 }}>
          <Box sx={{ height: 2, width: 64, borderRadius: 'full', background: 'linear-gradient(90deg, transparent, rgba(201, 154, 57, 0.7))' }} />
          <motion.div
            animate={prefersReducedMotion ? undefined : { y: [0, -7, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <AutoAwesomeRoundedIcon sx={{ fontSize: 20, color: piccColors.ptitRed }} />
          </motion.div>
          <Box sx={{ height: 2, width: 64, borderRadius: 'full', background: 'linear-gradient(270deg, transparent, rgba(201, 154, 57, 0.7))' }} />
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Typography
            sx={{
              maxWidth: 760,
              mx: 'auto',
              fontSize: { xs: '1.02rem', md: '1.12rem' },
              lineHeight: 1.75,
              color: piccColors.slate[600],
              fontWeight: 450,
            }}
          >
            {introduction.paragraph}
          </Typography>
        </motion.div>
      </Box>

      {/* Mở đầu chi tiết */}
      <Box
        component={motion.div}
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        whileHover={prefersReducedMotion ? undefined : { y: -5 }}
        viewport={{ once: true, amount: 0.2 }}
        sx={{
          position: 'relative',
          maxWidth: 920,
          mx: 'auto',
          mb: { xs: 6, md: 7 },
          p: { xs: 3, sm: 4, md: 4.5 },
          pt: { xs: 3.5, sm: 4.5, md: 5 },
          borderRadius: '24px',
          bgcolor: 'rgba(255, 255, 255, 0.72)',
          backdropFilter: 'blur(14px)',
          border: '1px solid rgba(226, 232, 240, 0.85)',
          boxShadow: '0 10px 32px rgba(22, 58, 103, 0.05)',
          overflow: 'hidden',
          transition: 'box-shadow 0.3s ease',
          '&:hover': {
            boxShadow: '0 18px 44px rgba(22, 58, 103, 0.10)',
          },
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: 'linear-gradient(90deg, #E11414 0%, #E7C34D 50%, #0F2A52 100%)',
          }}
        />
        <Box
          component={motion.div}
          aria-hidden
          animate={prefersReducedMotion ? undefined : { rotate: [0, 12, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          sx={{
            position: 'absolute',
            top: 20,
            right: 24,
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(201, 154, 57, 0.22), transparent 70%)',
            filter: 'blur(6px)',
            pointerEvents: 'none',
          }}
        />
        <Typography
          sx={{
            position: 'relative',
            zIndex: 1,
            fontSize: { xs: '1rem', md: '1.06rem' },
            lineHeight: 1.85,
            color: piccColors.ink,
            fontWeight: 600,
            mb: 2.5,
          }}
        >
          {introduction.expanded.lead}
        </Typography>
        <Typography
          sx={{
            position: 'relative',
            zIndex: 1,
            fontSize: { xs: '0.95rem', md: '1rem' },
            lineHeight: 1.85,
            color: piccColors.slate[600],
            fontWeight: 450,
          }}
        >
          {introduction.expanded.supporting}
        </Typography>
      </Box>

      {/* Điểm nhấn nổi bật */}
      <Box sx={{ mb: { xs: 6, md: 7 } }}>
        <Box component={motion.div} variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} sx={{ textAlign: 'center', mb: { xs: 4, md: 5 } }}>
          <Typography
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              fontSize: '0.8rem',
              fontWeight: 800,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: piccColors.ptitRed,
              mb: 1.5,
              px: 1.5,
              py: 0.5,
              borderRadius: '999px',
              bgcolor: piccColors.red[50],
              border: '1px solid rgba(225, 20, 20, 0.15)',
            }}
          >
            Điểm nhấn của hành trình
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1.5rem', md: '1.85rem' },
              fontWeight: 800,
              color: piccColors.ptitNavy,
              lineHeight: 1.3,
            }}
          >
            Những gì thí sinh sẽ trải nghiệm
          </Typography>
        </Box>

        <Box component={motion.div} variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}>
          <Grid container spacing={{ xs: 2.5, md: 3 }} alignItems="stretch">
            {introduction.expanded.highlights.map((h, i) => {
              const accent = cardAccents[i % cardAccents.length]!;
              return (
                <Grid size={{ xs: 12, sm: 6 }} key={h.label} sx={{ display: 'flex' }}>
                  <Box
                    component={motion.div}
                    variants={fadeInUp}
                    whileHover={prefersReducedMotion ? undefined : { y: -5 }}
                    sx={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 2.25,
                      bgcolor: 'rgba(255, 255, 255, 0.85)',
                      backdropFilter: 'blur(14px)',
                      borderRadius: '20px',
                      border: '1px solid rgba(226, 232, 240, 0.9)',
                      boxShadow: '0 8px 24px rgba(22, 58, 103, 0.05)',
                      p: { xs: 2.5, md: 3 },
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
                      '&:hover': {
                        boxShadow: `0 16px 36px ${accent.shadow}`,
                        borderColor: accent.border,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -34,
                        right: -34,
                        width: 96,
                        height: 96,
                        borderRadius: '50%',
                        background: `radial-gradient(circle, ${accent.color}1F, transparent 70%)`,
                        pointerEvents: 'none',
                      }}
                    />
                    <motion.div
                      animate={prefersReducedMotion ? undefined : { y: [0, -5, 0] }}
                      transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.35 }}
                      style={{ flexShrink: 0, display: 'flex' }}
                    >
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: '12px',
                          bgcolor: accent.color,
                          color: '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 800,
                          fontSize: '0.82rem',
                          boxShadow: `0 6px 14px ${accent.shadow}`,
                        }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </Box>
                    </motion.div>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography
                        sx={{
                          fontSize: '1.02rem',
                          fontWeight: 800,
                          color: piccColors.ptitNavy,
                          mb: 0.75,
                          lineHeight: 1.35,
                        }}
                      >
                        {h.label}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '0.9rem',
                          color: piccColors.slate[600],
                          lineHeight: 1.7,
                          fontWeight: 450,
                        }}
                      >
                        {h.text}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>

      {/* Trụ cột của hành trình */}
      <Box component={motion.div} variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} sx={{ textAlign: 'center', mb: { xs: 4, md: 5 } }}>
        <Typography
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            fontSize: '0.8rem',
            fontWeight: 800,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: piccColors.ptitRed,
            mb: 1.5,
            px: 1.5,
            py: 0.5,
            borderRadius: '999px',
            bgcolor: piccColors.red[50],
            border: '1px solid rgba(225, 20, 20, 0.15)',
          }}
        >
          04 trụ cột
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: '1.5rem', md: '1.85rem' },
            fontWeight: 800,
            color: piccColors.ptitNavy,
            lineHeight: 1.3,
          }}
        >
          Giá trị cốt lõi cuộc thi mang lại
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
            const accent = cardAccents[i % cardAccents.length]!;

            return (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={v.title} sx={{ display: 'flex' }}>
                <motion.div
                  variants={fadeInUp}
                  style={{ width: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <Tilt3DCard
                    maxTilt={10}
                    scale={1.02}
                    glareColor={accent.border}
                    interactive
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
                          <motion.div
                            animate={prefersReducedMotion ? undefined : { y: [0, -7, 0] }}
                            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.45 }}
                            whileHover={{ scale: 1.1, rotate: 6 }}
                            style={{ display: 'flex' }}
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
                                position: 'relative',
                                '&::after': {
                                  content: '""',
                                  position: 'absolute',
                                  inset: -6,
                                  borderRadius: '20px',
                                  background: `radial-gradient(circle, ${accent.color}33, transparent 70%)`,
                                  filter: 'blur(6px)',
                                  zIndex: -1,
                                },
                              }}
                            >
                              <Icon sx={{ fontSize: 26 }} />
                            </Box>
                          </motion.div>

                          <motion.div
                            animate={prefersReducedMotion ? undefined : { scale: [1, 1.12, 1] }}
                            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                          >
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
                          </motion.div>
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
};

export default IntroductionSection;
