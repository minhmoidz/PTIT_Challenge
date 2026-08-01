import { Container, Typography, Box, Grid, Card, CardContent, Chip } from '@mui/material';
import { motion } from 'motion/react';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import { fadeInUp, staggerContainer } from '@/motion/variants';
import { piccColors } from '@/theme/palette';
import { SkyBackground } from '@/components/ui/SkyBackground';
import { getSkyBackground } from '@/components/ui/skyBackgroundConfig';
import { Tilt3DCard } from '@/components/ui/Tilt3DCard';
import { competitionData } from '@/data/competition';

export interface Mentor {
  id: string;
  name: string;
  professionalTitle: string;
  organization: string;
  competitionRole: string;
}

interface Props {
  mentors?: Mentor[];
}

export const MentorsSection = ({ mentors = competitionData.mentors }: Props) => {
  const hasMentors = mentors && mentors.length > 0;

  return (
    <Box
      component="section"
      id="mentors"
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
            Hội Đồng Giám Sát &amp; <Box component="span" sx={{ color: piccColors.ptitRed }}>Cố Vấn Chuyên Môn</Box>
          </Typography>
          <Typography
            sx={{
              color: piccColors.slate[600],
              maxWidth: 720,
              mx: 'auto',
              fontSize: { xs: '1rem', md: '1.075rem' },
              lineHeight: 1.7,
              fontWeight: 450,
              fontFamily: '"Manrope", sans-serif',
            }}
          >
            Đội ngũ giảng viên, chuyên gia hàng đầu từ Học viện PTIT và doanh nghiệp đồng hành cùng các đội thi trong suốt quá trình giải Case Study.
          </Typography>
        </Box>

        {hasMentors ? (
          /* Real Mentors Grid */
          <Box sx={{ maxWidth: 1080, mx: 'auto' }}>
            <Grid container spacing={3}>
              {mentors.map((m) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={m.id}>
                  <Card sx={{ p: 3, textAlign: 'center' }}>
                    <Typography variant="h6">{m.name}</Typography>
                    <Typography variant="body2">{m.professionalTitle}</Typography>
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
                { title: 'Hội Đồng Giám Khảo', sub: 'Đang cập nhật' },
                { title: 'Cố Vấn Chuyên Môn', sub: 'Đang cập nhật' },
                { title: 'Đội Nữ Mentors', sub: 'Đang cập nhật' },
              ].map((item, idx) => (
                <Grid size={{ xs: 12, sm: 4 }} key={idx}>
                  <motion.div variants={fadeInUp}>
                    <Tilt3DCard maxTilt={5} scale={1.01} glareColor="rgba(56, 130, 241,0.1)">
                      <Card
                        sx={{
                          p: 3,
                          borderRadius: '20px',
                          border: '1.5px dashed rgba(56, 130, 241, 0.3)',
                          bgcolor: 'rgba(255, 255, 255, 0.85)',
                          backdropFilter: 'blur(12px)',
                          textAlign: 'center',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            borderColor: '#3882F1',
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
                              bgcolor: 'rgba(56, 130, 241, 0.08)',
                              color: '#3882F1',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              mb: 1.5,
                            }}
                          >
                            <PersonOutlineRoundedIcon sx={{ fontSize: 24 }} />
                          </Box>
                          <Typography sx={{ fontWeight: 750, color: '#0F2A52', fontSize: '0.95rem', mb: 0.5 }}>
                            {item.title}
                          </Typography>
                          <Chip
                            label={item.sub}
                            size="small"
                            sx={{
                              bgcolor: '#EFF3F8',
                              color: '#67788F',
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

export default MentorsSection;
