import { Container, Typography, Box, Grid, Card, CardContent, Chip } from '@mui/material';
import { motion } from 'motion/react';
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded';
import { fadeInUp, staggerContainer, cardHover } from '@/motion/variants';
import { piccColors } from '@/theme/palette';

interface Sponsor {
  name: string;
  logo: string;
  tier?: string;
}

interface Props {
  sponsors?: Sponsor[];
}

export const SponsorsSection = ({ sponsors = [] }: Props) => {
  if (!sponsors || sponsors.length === 0) return null;

  return (
    <Box
      component="section"
      id="nha-tai-tro"
      sx={{
        py: { xs: 9, md: 14 },
        bgcolor: piccColors.surface,
        position: 'relative',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Chip
            icon={<BusinessCenterRoundedIcon sx={{ color: `${piccColors.blue[700]} !important` }} />}
            label="Đối Tác Doanh Nghiệp"
            sx={{
              bgcolor: piccColors.sky[100],
              color: piccColors.blue[700],
              fontWeight: 700,
              mb: 2,
            }}
          />
          <Typography variant="h2" component="h2" sx={{ mb: 2, color: piccColors.ink, fontWeight: 800 }}>
            Nhà Tài Trợ & Đồng Hành
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 640, mx: 'auto' }}>
            Cảm ơn các tổ chức và doanh nghiệp đã tin tưởng đồng hành cùng mùa giải PICC 2026
          </Typography>
        </Box>

        <Box
          component={motion.div}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Grid container spacing={3} justifyContent="center" alignItems="center">
            {sponsors.map((sponsor, i) => (
              <Grid item xs={6} sm={4} md={3} key={i}>
                <motion.div variants={fadeInUp}>
                  <Card
                    component={motion.div}
                    variants={cardHover}
                    initial="rest"
                    whileHover="hover"
                    sx={{
                      borderRadius: 4,
                      border: `1.5px solid ${piccColors.sky[200]}`,
                    }}
                  >
                    <CardContent
                      sx={{
                        p: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: 120,
                      }}
                    >
                      <Box
                        component="img"
                        src={sponsor.logo}
                        alt={sponsor.name}
                        loading="lazy"
                        sx={{
                          width: '100%',
                          maxHeight: 80,
                          objectFit: 'contain',
                          filter: 'grayscale(0)',
                        }}
                      />
                      {sponsor.tier && (
                        <Chip
                          label={sponsor.tier}
                          size="small"
                          sx={{
                            mt: 1.5,
                            bgcolor: piccColors.sky[100],
                            color: piccColors.blue[700],
                            fontWeight: 700,
                            fontSize: '0.7rem',
                          }}
                        />
                      )}
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
