import { Container, Typography, Grid, Card, CardContent, Box, Chip } from '@mui/material';
import { motion } from 'motion/react';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
import MilitaryTechRoundedIcon from '@mui/icons-material/MilitaryTechRounded';
import StarsRoundedIcon from '@mui/icons-material/StarsRounded';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import { awards } from '@/content/vi/awards';
import { fadeInUp, staggerContainer, scaleIn } from '@/motion/variants';
import { piccColors } from '@/theme/palette';
import { env } from '@/config/env';

const iconMap: Record<string, React.ElementType> = {
  EmojiEventsRounded: EmojiEventsRoundedIcon,
  WorkspacePremiumRounded: WorkspacePremiumRoundedIcon,
  MilitaryTechRounded: MilitaryTechRoundedIcon,
  StarsRounded: StarsRoundedIcon,
};

export const AwardsSection = () => (
  <Box
    component="section"
    id="giai-thuong"
    sx={{
      py: { xs: 9, md: 14 },
      bgcolor: piccColors.surface,
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
      <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
        <Chip
          icon={<EmojiEventsRoundedIcon sx={{ color: `${piccColors.yellow[700]} !important` }} />}
          label="Vinh danh & Quyền lợi"
          sx={{
            bgcolor: piccColors.yellow[100],
            color: piccColors.yellow[700],
            fontWeight: 700,
            mb: 2,
          }}
        />
        <Typography variant="h2" component="h2" sx={{ mb: 2, color: piccColors.ink, fontWeight: 800 }}>
          Cơ Cấu Giải Thưởng
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 640, mx: 'auto' }}>
          Tuyên dương các dự án xuất sắc với giải thưởng danh giá cùng các cơ hội ươm tạo, kết nối doanh nghiệp
        </Typography>
      </Box>

      <Box
        component={motion.div}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {/* Prize Grid with Champion Focal Point */}
        <Grid container spacing={3} alignItems="stretch" sx={{ mb: { xs: 6, md: 8 } }}>
          {awards.prizes.map((prize, index) => {
            const Icon = iconMap[prize.icon] ?? EmojiEventsRoundedIcon;
            const isChampion = index === 0;

            return (
              <Grid
                item
                xs={12}
                sm={isChampion ? 12 : 6}
                md={isChampion ? 4 : 2.66}
                key={prize.rank}
              >
                <motion.div
                  variants={isChampion ? fadeInUp : scaleIn}
                  initial="hidden"
                  style={{ height: '100%' }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      textAlign: 'center',
                      position: 'relative',
                      borderRadius: isChampion ? 6 : 5,
                      p: isChampion ? 1.5 : 1,
                      border: isChampion
                        ? `2.5px solid ${piccColors.yellow[300]}`
                        : `1.5px solid ${piccColors.sky[200]}`,
                      background: isChampion
                        ? `linear-gradient(165deg, #FFFFFF 0%, ${piccColors.yellow[100]} 100%)`
                        : `linear-gradient(180deg, #FFFFFF 0%, ${piccColors.sky[50]} 100%)`,
                      boxShadow: isChampion
                        ? 'inset -2px -2px 8px rgba(255,255,255,0.6), 12px 12px 32px rgba(117, 86, 0, 0.15)'
                        : 'inset -2px -2px 8px rgba(255,255,255,0.6), 8px 8px 24px rgba(23,59,102,0.08)',
                      transition: 'transform 0.25s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
                      '&:hover': {
                        transform: isChampion ? 'scale(1.07)' : 'translateY(-6px)',
                        boxShadow: isChampion
                          ? 'inset -2px -2px 8px rgba(255,255,255,0.6), 16px 16px 40px rgba(117, 86, 0, 0.22)'
                          : 'inset -2px -2px 8px rgba(255,255,255,0.6), 12px 12px 32px rgba(23,59,102,0.16)',
                      },
                    }}
                  >
                    {isChampion && (
                      <Chip
                        icon={<AutoAwesomeRoundedIcon sx={{ fontSize: 16, color: '#FFFFFF !important' }} />}
                        label="QUÁN QUÂN PICC 2026"
                        sx={{
                          position: 'absolute',
                          top: -14,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          bgcolor: piccColors.pink[500],
                          color: '#FFFFFF',
                          fontWeight: 800,
                          fontSize: '0.7rem',
                          letterSpacing: 1,
                          boxShadow: '0 4px 12px rgba(232, 91, 159, 0.4)',
                        }}
                      />
                    )}
                    <CardContent sx={{ p: { xs: 3, md: isChampion ? 4 : 3 } }}>
                      <Box
                        sx={{
                          width: isChampion ? 72 : 56,
                          height: isChampion ? 72 : 56,
                          borderRadius: '50%',
                          bgcolor: isChampion ? piccColors.yellow[100] : piccColors.sky[100],
                          color: isChampion ? piccColors.yellow[700] : piccColors.blue[700],
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 2,
                          boxShadow: isChampion ? `0 0 0 8px ${piccColors.yellow[300]}44` : 'none',
                        }}
                      >
                        <Icon sx={{ fontSize: isChampion ? 44 : 32 }} />
                      </Box>
                      <Typography
                        variant="h3"
                        component="h3"
                        sx={{
                          fontSize: isChampion ? '1.35rem' : '1.1rem',
                          fontWeight: 800,
                          color: piccColors.ink,
                          mb: 1,
                        }}
                      >
                        {prize.rank}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            );
          })}
        </Grid>

        {!env.isProduction && (
          <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary', mb: 6, fontStyle: 'italic' }}>
            {awards.disclaimer}
          </Typography>
        )}

        {/* Benefits Bento Rail */}
        <Box
          sx={{
            bgcolor: piccColors.sky[50],
            border: `1.5px solid ${piccColors.sky[200]}`,
            borderRadius: 6,
            p: { xs: 3, sm: 5 },
          }}
        >
          <Typography
            variant="h3"
            component="h3"
            sx={{
              fontSize: '1.35rem',
              fontWeight: 800,
              color: piccColors.ink,
              mb: 3,
              textAlign: 'center',
            }}
          >
            Đặc Quyền Dành Cho Tất Cả Đội Thi Vào Vòng Trong
          </Typography>
          <Grid container spacing={2.5}>
            {awards.benefits.map((benefit, i) => (
              <Grid item xs={12} sm={6} key={i}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 2,
                    bgcolor: '#FFFFFF',
                    p: 2.5,
                    borderRadius: 4,
                    border: `1px solid ${piccColors.sky[200]}`,
                    height: '100%',
                  }}
                >
                  <VerifiedRoundedIcon
                    sx={{ color: piccColors.success, fontSize: 24, flexShrink: 0, mt: 0.2 }}
                  />
                  <Typography variant="body1" sx={{ fontWeight: 600, color: piccColors.ink }}>
                    {benefit}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Container>
  </Box>
);
