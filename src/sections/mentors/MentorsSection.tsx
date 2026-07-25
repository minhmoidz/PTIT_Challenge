import { Container, Typography, Box, Grid, Card, CardContent, Chip } from '@mui/material';
import { motion } from 'motion/react';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import { fadeInUp, staggerContainer } from '@/motion/variants';
import { piccColors } from '@/theme/palette';
import { SkyBackground, getSkyBackground } from '@/components/ui/SkyBackground';
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
              <SchoolRoundedIcon
                sx={{ fontSize: 16, color: `${piccColors.blue[700]} !important` }}
              />
            }
            label="Hội Đồng &amp; Cố Vấn"
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
            Hội Đồng Giám Sát &amp; Cố Vấn Chuyên Môn
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
            Thông tin Hội đồng Giám khảo, Cố vấn chuyên môn và Mentors sẽ được Ban Tổ chức công bố trong thời gian tới.
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
                            <PersonOutlineRoundedIcon sx={{ fontSize: 24 }} />
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

export default MentorsSection;
