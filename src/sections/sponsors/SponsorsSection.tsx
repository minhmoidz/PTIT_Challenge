import { Container, Typography, Box, Grid, Card, CardContent, Chip } from '@mui/material';
import { motion } from 'motion/react';
import HandshakeRoundedIcon from '@mui/icons-material/HandshakeRounded';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import { fadeInUp, staggerContainer } from '@/motion/variants';
import { piccColors } from '@/theme/palette';
import { Tilt3DCard } from '@/components/ui/Tilt3DCard';
import { SkyBackground, getSkyBackground } from '@/components/ui/SkyBackground';
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
        py: { xs: 9, md: 14 },
        background: getSkyBackground('clear'),
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <SkyBackground variant="clear" />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 7 } }}>
          <Chip
            icon={
              <HandshakeRoundedIcon
                sx={{ fontSize: 16, color: `${piccColors.blue[700]} !important` }}
              />
            }
            label="Hệ Sinh Thái Đồng Hành"
            sx={{
              bgcolor: 'rgba(234, 242, 255, 0.9)',
              backdropFilter: 'blur(8px)',
              color: piccColors.blue[700],
              fontWeight: 800,
              fontSize: '0.825rem',
              mb: 2.25,
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
              mb: 1.75,
              color: piccColors.ink,
              fontWeight: 800,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              letterSpacing: '-0.025em',
              lineHeight: 1.15,
            }}
          >
            Nhà Tài Trợ &amp; Đối Tác Đồng Hành
          </Typography>
          <Typography
            sx={{
              color: piccColors.slate[600],
              maxWidth: 680,
              mx: 'auto',
              fontSize: { xs: '0.95rem', md: '1.05rem' },
              lineHeight: 1.65,
              fontWeight: 400,
            }}
          >
            Danh sách Nhà tài trợ &amp; Đối tác đồng hành chính thức đang được Ban Tổ chức cập nhật.
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
                    <Tilt3DCard maxTilt={5} scale={1.01} glareColor="rgba(57,124,232,0.1)">
                      <Card
                        sx={{
                          p: 3,
                          borderRadius: '20px',
                          border: '1.5px dashed rgba(57, 124, 232, 0.3)',
                          bgcolor: 'rgba(255, 255, 255, 0.85)',
                          backdropFilter: 'blur(12px)',
                          textAlign: 'center',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            borderColor: '#397CE8',
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
                              bgcolor: 'rgba(57, 124, 232, 0.08)',
                              color: '#397CE8',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              mb: 1.5,
                            }}
                          >
                            <BusinessRoundedIcon sx={{ fontSize: 24 }} />
                          </Box>
                          <Typography sx={{ fontWeight: 750, color: '#163A67', fontSize: '0.95rem', mb: 0.5 }}>
                            {item.title}
                          </Typography>
                          <Chip
                            label={item.sub}
                            size="small"
                            sx={{
                              bgcolor: '#F1F5F9',
                              color: '#64748B',
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
