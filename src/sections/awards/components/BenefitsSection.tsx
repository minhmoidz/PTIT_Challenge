import { Box, Typography, Grid, Card, CardContent, Chip } from '@mui/material';
import { motion } from 'motion/react';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import WorkHistoryRoundedIcon from '@mui/icons-material/WorkHistoryRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import RecordVoiceOverRoundedIcon from '@mui/icons-material/RecordVoiceOverRounded';
import ScienceIcon from '@mui/icons-material/ScienceRounded';
import PsychologyRoundedIcon from '@mui/icons-material/PsychologyRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import { fadeInUp, staggerContainer } from '@/motion/variants';
import { piccColors } from '@/theme/palette';
import { Tilt3DCard } from '@/components/ui/Tilt3DCard';
import { awards, type QualifierBenefit } from '@/content/vi/awards';

const iconMap: Record<string, React.ElementType> = {
  WorkHistory: WorkHistoryRoundedIcon,
  School: SchoolRoundedIcon,
  RecordVoiceOver: RecordVoiceOverRoundedIcon,
  Science: ScienceIcon,
  Psychology: PsychologyRoundedIcon,
};

export const BenefitsSection = () => {
  return (
    <Box
      sx={{
        mt: { xs: 10, md: 14 },
        position: 'relative',
        zIndex: 1,
      }}
    >
      {/* Section Header */}
      <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 7 } }}>
        <Chip
          icon={
            <RocketLaunchRoundedIcon
              sx={{ fontSize: 16, color: `${piccColors.ptitRed} !important` }}
            />
          }
          label="Đặc Quyền Vòng Trong"
          sx={{
            bgcolor: 'rgba(255, 241, 241, 0.9)',
            backdropFilter: 'blur(8px)',
            color: piccColors.ptitRed,
            fontWeight: 800,
            fontSize: '0.825rem',
            mb: 2.25,
            px: 1.5,
            py: 0.5,
            border: '1px solid rgba(225, 20, 20, 0.18)',
            boxShadow: '0 4px 12px rgba(225, 20, 20, 0.08)',
          }}
        />
        <Typography
          variant="h2"
          component="h2"
          sx={{
            mb: 1.75,
            color: piccColors.ink,
            fontWeight: 800,
            fontSize: { xs: '2rem', sm: '2.4rem', md: '2.85rem' },
            letterSpacing: '-0.025em',
            lineHeight: 1.15,
          }}
        >
          Bệ Phóng Dành Cho Những Đội Xuất Sắc
        </Typography>
        <Typography
          sx={{
            color: piccColors.slate[600],
            maxWidth: 720,
            mx: 'auto',
            fontSize: { xs: '0.95rem', md: '1.05rem' },
            lineHeight: 1.65,
            fontWeight: 400,
          }}
        >
          Các đội vượt qua vòng tuyển chọn sẽ được kết nối với chuyên gia, doanh nghiệp và hệ sinh thái hỗ trợ phát triển dự án.
        </Typography>
      </Box>

      {/* 3 + 2 Centered Cards Grid */}
      <Box
        component={motion.div}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        sx={{ maxWidth: 1120, mx: 'auto' }}
      >
        <Grid container spacing={{ xs: 2.5, md: 3 }} justifyContent="center" alignItems="stretch">
          {awards.qualifierBenefits.map((benefit: QualifierBenefit) => {
            const Icon = iconMap[benefit.iconName] ?? AutoAwesomeRoundedIcon;

            return (
              <Grid
                size={{ xs: 12, sm: 6, md: 4 }}
                key={benefit.id}
                sx={{ display: 'flex' }}
              >
                <motion.div
                  variants={fadeInUp}
                  style={{ width: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <Tilt3DCard
                    maxTilt={7}
                    scale={1.02}
                    glareColor={benefit.borderTint}
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Card
                      sx={{
                        height: '100%',
                        borderRadius: '22px',
                        bgcolor: 'rgba(255, 255, 255, 0.92)',
                        backdropFilter: 'blur(20px)',
                        border: '1.5px solid rgba(226, 232, 240, 0.85)',
                        boxShadow: '0 8px 30px rgba(22, 58, 103, 0.05)',
                        position: 'relative',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                          borderColor: benefit.accentColor,
                          bgcolor: '#FFFFFF',
                          boxShadow: `0 14px 36px ${benefit.accentColor}20`,
                          transform: 'translateY(-5px)',
                        },
                      }}
                    >
                      {/* Top Accent Line */}
                      <Box
                        sx={{
                          height: 3.5,
                          width: '100%',
                          bgcolor: benefit.accentColor,
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
                            mb: 2.25,
                          }}
                        >
                          <Box
                            sx={{
                              width: 48,
                              height: 48,
                              borderRadius: '14px',
                              bgcolor: benefit.bgTint,
                              color: benefit.accentColor,
                              border: `1px solid ${benefit.borderTint}`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              boxShadow: `0 6px 16px ${benefit.accentColor}18`,
                            }}
                          >
                            <Icon sx={{ fontSize: 24 }} />
                          </Box>

                          <Box
                            sx={{
                              px: 1.25,
                              py: 0.35,
                              borderRadius: '999px',
                              bgcolor: benefit.bgTint,
                              color: benefit.accentColor,
                              fontWeight: 800,
                              fontSize: '0.725rem',
                              letterSpacing: '0.05em',
                              border: `1px solid ${benefit.borderTint}`,
                            }}
                          >
                            {benefit.step}
                          </Box>
                        </Box>

                        {/* Title */}
                        <Typography
                          sx={{
                            fontSize: { xs: '1.1rem', md: '1.18rem' },
                            fontWeight: 800,
                            color: piccColors.ink,
                            mb: 1,
                            lineHeight: 1.3,
                          }}
                        >
                          {benefit.title}
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
                          {benefit.description}
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
    </Box>
  );
};

export default BenefitsSection;
