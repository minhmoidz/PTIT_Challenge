import { Container, Typography, Box, Grid, Card, CardContent, Chip } from '@mui/material';
import { motion } from 'motion/react';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import { fadeInUp, staggerContainer } from '@/motion/variants';
import { piccColors } from '@/theme/palette';
import { Tilt3DCard } from '@/components/ui/Tilt3DCard';
import { SkyBackground } from '@/components/ui/SkyBackground';
import { getSkyBackground } from '@/components/ui/skyBackgroundConfig';
import { competitionData } from '@/data/competition';

export interface Sponsor {
  name: string;
  logo?: string;
  tier?: string;
  website?: string;
}

interface Props {
  sponsors?: Sponsor[];
}

export const SponsorsSection = ({ sponsors = competitionData.partners }: Props) => {
  const hasPartners = sponsors && sponsors.length > 0;

  return (
    <Box
      component="section"
      id="sponsors"
      sx={{
        py: { xs: 8, sm: 10, md: 12 },
        background: getSkyBackground('clear'),
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <SkyBackground variant="clear" />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 7 }, fontFamily: '"Manrope", sans-serif' }}>
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
              fontSize: { xs: '2rem', sm: '2.5rem', md: '2.8rem' },
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              fontFamily: '"Manrope", sans-serif',
            }}
          >
            Doanh Nghiệp &amp; <Box component="span" sx={{ color: piccColors.ptitRed }}>Đối Tác Đồng Hành</Box>
          </Typography>
          <Typography
            sx={{
              color: piccColors.slate[600],
              maxWidth: 680,
              mx: 'auto',
              fontSize: { xs: '1rem', md: '1.075rem' },
              lineHeight: 1.7,
              fontWeight: 450,
              fontFamily: '"Manrope", sans-serif',
            }}
          >
            Cùng Trung tâm PTIT IEC và các tập đoàn công nghệ kết nối tri thức, hỗ trợ phát triển các giải pháp sáng tạo của sinh viên.
          </Typography>
        </Box>

        {hasPartners ? (
          /* Real Partner Grid */
          <Box
            component={motion.div}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            sx={{ maxWidth: 1060, mx: 'auto' }}
          >
            <Grid container spacing={{ xs: 2.5, md: 3 }} justifyContent="center">
              {sponsors.map((sponsor, i) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
                  <Card sx={{ p: 3, textAlign: 'center' }}>
                    <Typography variant="h6">{sponsor.name}</Typography>
                    {sponsor.tier && <Chip label={sponsor.tier} size="small" />}
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : (
          /* Neutral Placeholder Cards showing "Đang cập nhật" */
          <Box
            component={motion.div}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            sx={{ maxWidth: 960, mx: 'auto' }}
          >
            <Grid container spacing={3} justifyContent="center">
              {[
                { title: 'Nhà Tài Trợ Kim Cương', sub: 'Đang cập nhật' },
                { title: 'Nhà Tài Trợ Vàng', sub: 'Đang cập nhật' },
                { title: 'Đối Tác Đồng Hành', sub: 'Đang cập nhật' },
              ].map((item, idx) => (
                <Grid size={{ xs: 12, sm: 4 }} key={idx}>
                  <motion.div variants={fadeInUp}>
                    <Tilt3DCard maxTilt={5} scale={1.01} glareColor="rgba(225, 20, 20,0.08)">
                      <Card
                        sx={{
                          p: 3,
                          borderRadius: '20px',
                          border: '1.5px dashed rgba(225, 20, 20, 0.18)',
                          bgcolor: 'rgba(255, 255, 255, 0.85)',
                          backdropFilter: 'blur(12px)',
                          textAlign: 'center',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            borderColor: piccColors.ptitRed,
                            bgcolor: '#FFFFFF',
                          },
                        }}
                      >
                        <CardContent sx={{ p: '16px !important' }}>
                          <Box
                            sx={{
                              width: 48,
                              height: 48,
                              borderRadius: '50%',
                              bgcolor: 'rgba(225, 20, 20, 0.08)',
                              color: piccColors.ptitRed,
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              mb: 1.5,
                            }}
                          >
                            <BusinessRoundedIcon sx={{ fontSize: 24 }} />
                          </Box>
                          <Typography sx={{ fontWeight: 750, color: piccColors.ptitNavy, fontSize: '0.95rem', mb: 0.5 }}>
                            {item.title}
                          </Typography>
                          <Chip
                            label={item.sub}
                            size="small"
                            sx={{
                              bgcolor: piccColors.slate[100],
                              color: piccColors.slate[500],
                              fontWeight: 700,
                              fontSize: '0.675rem',
                            }}
                          />
                        </CardContent>
                      </Card>
                    </Tilt3DCard>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default SponsorsSection;
