import { Container, Typography, Grid, Card, CardContent, Chip, Box } from '@mui/material';
import { motion } from 'motion/react';
import GroupsRounded from '@mui/icons-material/GroupsRounded';
import SchoolRounded from '@mui/icons-material/SchoolRounded';
import AssignmentRounded from '@mui/icons-material/AssignmentRounded';
import CalendarMonthRounded from '@mui/icons-material/CalendarMonthRounded';
import { useRegistrationStatus } from '@/features/registration/hooks';
import { fadeInUp, staggerContainer, cardHover } from '@/motion/variants';
import { piccColors } from '@/theme/palette';
import { env } from '@/config/env';

const iconMap: Record<string, React.ElementType> = {
  SchoolRounded,
  GroupsRounded,
  AssignmentRounded,
  CalendarMonthRounded,
};

const facts = [
  { label: 'Đối tượng tham gia', icon: 'SchoolRounded' as const, valueKey: 'audience' as const, accent: piccColors.blue[500] },
  { label: 'Quy mô đội thi', icon: 'GroupsRounded' as const, valueKey: 'teamSize' as const, accent: piccColors.pink[500] },
  { label: 'Hình thức thi', icon: 'AssignmentRounded' as const, valueKey: 'format' as const, accent: piccColors.yellow[700] },
  { label: 'Thời gian đăng ký', icon: 'CalendarMonthRounded' as const, valueKey: 'registrationTime' as const, accent: piccColors.blue[700] },
];

const getValue = (key: string, config: ReturnType<typeof useRegistrationStatus>['config']) => {
  switch (key) {
    case 'audience':
      return 'Sinh viên PTIT';
    case 'teamSize':
      return config.teamSize.max
        ? `${config.teamSize.min}–${config.teamSize.max} thành viên`
        : `${config.teamSize.min} thành viên`;
    case 'format':
      return 'Giải Case Study';
    case 'registrationTime':
      if (!config.registration.openAt || !config.registration.closeAt)
        return 'Đang cập nhật';
      return `${new Date(config.registration.openAt).toLocaleDateString('vi-VN')} – ${new Date(config.registration.closeAt).toLocaleDateString('vi-VN')}`;
    default:
      return '';
  }
};

export const QuickFactsSection = () => {
  const { config } = useRegistrationStatus();

  return (
    <Box
      component="section"
      id="thong-tin-nhanh"
      sx={{
        py: { xs: 8, md: 12 },
        background: `linear-gradient(180deg, ${piccColors.sky[50]} 0%, ${piccColors.sky[100]} 100%)`,
        position: 'relative',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 7 } }}>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              color: piccColors.ink,
              fontWeight: 800,
              mb: 1.5,
            }}
          >
            Thông Tin Nhanh
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
            Tổng quan những điều quan trọng thí sinh cần biết trước khi nộp hồ sơ
          </Typography>
        </Box>

        <Box
          component={motion.div}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Grid container spacing={3}>
            {facts.map((fact) => {
              const Icon = iconMap[fact.icon];
              const value = getValue(fact.valueKey, config);
              const isUnresolved = value === 'Đang cập nhật';

              return (
                <Grid item xs={12} sm={6} md={3} key={fact.label}>
                  <motion.div variants={fadeInUp} style={{ height: '100%' }}>
                    <Card
                      component={motion.div}
                      variants={cardHover}
                      initial="rest"
                      whileHover="hover"
                      sx={{
                        height: '100%',
                        borderRadius: 5,
                        bgcolor: '#FFFFFF',
                        border: `1.5px solid ${piccColors.sky[200]}`,
                      }}
                    >
                      <CardContent
                        sx={{
                          p: 3,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2.5,
                        }}
                      >
                        <Box
                          sx={{
                            width: 52,
                            height: 52,
                            borderRadius: '14px',
                            bgcolor: `${fact.accent}15`,
                            color: fact.accent,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          <Icon sx={{ fontSize: 28 }} />
                        </Box>
                        <Box sx={{ minWidth: 0, flexGrow: 1 }}>
                          <Typography
                            variant="caption"
                            sx={{
                              fontWeight: 600,
                              color: 'text.secondary',
                              display: 'block',
                              textTransform: 'uppercase',
                              letterSpacing: 0.5,
                              mb: 0.5,
                            }}
                          >
                            {fact.label}
                          </Typography>
                          {isUnresolved && !env.isProduction ? (
                            <Chip label="Chờ xác nhận" size="small" color="warning" variant="outlined" />
                          ) : (
                            <Typography
                              variant="body1"
                              sx={{
                                fontWeight: 800,
                                color: piccColors.ink,
                                fontSize: '1.05rem',
                                lineHeight: 1.3,
                                wordBreak: 'break-word',
                              }}
                            >
                              {value}
                            </Typography>
                          )}
                        </Box>
                      </CardContent>
                    </Card>
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
