import { Container, Typography, Grid, Card, CardMedia, CardContent, Box, Chip } from '@mui/material';
import { motion } from 'motion/react';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import { fadeInUp, staggerContainer, cardHover } from '@/motion/variants';
import { piccColors } from '@/theme/palette';

interface Mentor {
  name: string;
  title: string;
  organization: string;
  image?: string;
}

interface Props {
  mentors?: Mentor[];
}

export const MentorsSection = ({ mentors = [] }: Props) => {
  if (!mentors || mentors.length === 0) return null;

  return (
    <Box
      component="section"
      id="mentors"
      sx={{
        py: { xs: 9, md: 14 },
        bgcolor: piccColors.sky[50],
        position: 'relative',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Chip
            icon={<SchoolRoundedIcon sx={{ color: `${piccColors.blue[700]} !important` }} />}
            label="Đội Ngũ Chuyên Gia"
            sx={{
              bgcolor: piccColors.sky[100],
              color: piccColors.blue[700],
              fontWeight: 700,
              mb: 2,
            }}
          />
          <Typography variant="h2" component="h2" sx={{ mb: 2, color: piccColors.ink, fontWeight: 800 }}>
            Hội Đồng Cố Vấn & Giám Sát
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 640, mx: 'auto' }}>
            Đồng hành cùng thí sinh là đội ngũ chuyên gia giàu kinh nghiệm từ doanh nghiệp và Viện Y khoa/Công nghệ
          </Typography>
        </Box>

        <Box
          component={motion.div}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <Grid container spacing={3} justifyContent="center">
            {mentors.map((mentor, i) => (
              <Grid item xs={6} sm={4} md={3} key={i}>
                <motion.div variants={fadeInUp} style={{ height: '100%' }}>
                  <Card
                    component={motion.div}
                    variants={cardHover}
                    initial="rest"
                    whileHover="hover"
                    sx={{
                      height: '100%',
                      borderRadius: 5,
                      overflow: 'hidden',
                      border: `1.5px solid ${piccColors.sky[200]}`,
                    }}
                  >
                    {mentor.image && (
                      <CardMedia
                        component="img"
                        image={mentor.image}
                        alt={mentor.name}
                        sx={{ aspectRatio: '4/5', objectFit: 'cover' }}
                        loading="lazy"
                      />
                    )}
                    <CardContent sx={{ p: 2.5 }}>
                      <Typography variant="body1" sx={{ fontWeight: 800, color: piccColors.ink, mb: 0.5 }}>
                        {mentor.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: piccColors.blue[700], fontWeight: 600, mb: 0.5 }}>
                        {mentor.title}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                        {mentor.organization}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};
