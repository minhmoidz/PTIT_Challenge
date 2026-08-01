import { Card, CardContent, Box, Typography, Grid } from '@mui/material';
import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded';
import RecordVoiceOverRoundedIcon from '@mui/icons-material/RecordVoiceOverRounded';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import RouteRoundedIcon from '@mui/icons-material/RouteRounded';
import { motion } from 'motion/react';
import { fadeInUp } from '@/motion/variants';

const TIMELINE_STEPS = [
  {
    stepNumber: '01',
    label: 'Vòng 01',
    title: 'Nộp Hồ Sơ',
    desc: 'Đăng ký và gửi đề xuất sơ bộ.',
    icon: AssignmentTurnedInRoundedIcon,
    accentColor: '#3882F1',
    bgColor: '#DFEBFD',
  },
  {
    stepNumber: '02',
    label: 'Vòng 02',
    title: 'Chung Khảo',
    desc: 'Pitching và phản biện.',
    icon: RecordVoiceOverRoundedIcon,
    accentColor: '#6A73DC',
    bgColor: '#F0EDFF',
  },
  {
    stepNumber: '03',
    label: 'Vòng 03',
    title: 'Chung Kết',
    desc: 'Vinh danh và trao giải.',
    icon: EmojiEventsRoundedIcon,
    accentColor: '#D65890',
    bgColor: '#FFF0F7',
  },
];

export const CompetitionTimeline = () => {
  return (
    <motion.div variants={fadeInUp} style={{ height: '100%' }}>
      <Card
        sx={{
          height: '100%',
          borderRadius: 4,
          bgcolor: '#FFFFFF',
          border: '1px solid #DFE6EF',
          boxShadow: '0 8px 30px rgba(15, 42, 82, 0.05)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 14px 40px rgba(15, 42, 82, 0.1)',
            transform: 'translateY(-3px)',
          },
        }}
      >
        <CardContent sx={{ p: { xs: 2.5, sm: 3 }, pt: 3, pb: '24px !important', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {/* Card Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: '10px',
                bgcolor: '#DFEBFD',
                color: '#3882F1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <RouteRoundedIcon sx={{ fontSize: 19 }} />
            </Box>
            <Box>
              <Typography sx={{ fontSize: '0.675rem', fontWeight: 800, color: '#3882F1', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Bản Đồ Chinh Phục
              </Typography>
              <Typography sx={{ fontSize: { xs: '1.1rem', md: '1.2rem' }, fontWeight: 800, color: '#0F2A52', lineHeight: 1.2 }}>
                Lộ Trình Ba Vòng Thi
              </Typography>
            </Box>
          </Box>

          {/* Timeline Container */}
          <Box sx={{ position: 'relative' }}>
            {/* Desktop Connecting Line */}
            <Box
              component={motion.div}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.2 }}
              sx={{
                position: 'absolute',
                top: 34,
                left: '14%',
                right: '14%',
                height: 2.5,
                background: 'linear-gradient(90deg, #3882F1 0%, #6A73DC 50%, #D65890 100%)',
                transformOrigin: 'left',
                display: { xs: 'none', md: 'block' },
                zIndex: 0,
              }}
            />

            {/* Mobile Connecting Vertical Line */}
            <Box
              component={motion.div}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.2 }}
              sx={{
                position: 'absolute',
                top: 24,
                bottom: 24,
                left: 28,
                width: 2.5,
                background: 'linear-gradient(180deg, #3882F1 0%, #6A73DC 50%, #D65890 100%)',
                transformOrigin: 'top',
                display: { xs: 'block', md: 'none' },
                zIndex: 0,
              }}
            />

            {/* Timeline Nodes Grid */}
            <Grid container spacing={{ xs: 1.5, md: 1.75 }}>
              {TIMELINE_STEPS.map((node, idx) => {
                const Icon = node.icon;

                return (
                  <Grid size={{ xs: 12, md: 4 }} key={node.stepNumber}>
                    <Box
                      component={motion.div}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.25 + idx * 0.15 }}
                      sx={{
                        position: 'relative',
                        zIndex: 1,
                        p: 1.75,
                        pl: { xs: 6.5, md: 1.75 },
                        borderRadius: '12px',
                        bgcolor: '#F7F9FC',
                        border: '1px solid #DFE6EF',
                        transition: 'all 0.25s ease',
                        overflow: 'hidden',
                        '&:hover': {
                          bgcolor: '#FFFFFF',
                          borderColor: node.accentColor,
                          boxShadow: `0 6px 18px ${node.accentColor}14`,
                          '& .timeline-icon': {
                            transform: 'scale(1.08)',
                          },
                        },
                      }}
                    >
                      {/* Background Watermark Number */}
                      <Typography
                        aria-hidden="true"
                        sx={{
                          position: 'absolute',
                          bottom: -8,
                          right: 4,
                          fontSize: '3.25rem',
                          fontWeight: 900,
                          color: `${node.accentColor}12`,
                          userSelect: 'none',
                          pointerEvents: 'none',
                          lineHeight: 1,
                        }}
                      >
                        {node.stepNumber}
                      </Typography>

                      {/* Header Node Row */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 1 }}>
                        <Box
                          className="timeline-icon"
                          sx={{
                            width: 34,
                            height: 34,
                            borderRadius: '50%',
                            bgcolor: node.bgColor,
                            color: node.accentColor,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            border: `2px solid ${node.accentColor}30`,
                            boxShadow: `0 3px 8px ${node.accentColor}15`,
                            transition: 'transform 0.3s ease',
                          }}
                        >
                          <Icon sx={{ fontSize: 17 }} />
                        </Box>
                        <Box>
                          <Typography sx={{ fontSize: '0.675rem', fontWeight: 700, color: node.accentColor, textTransform: 'uppercase' }}>
                            {node.label}
                          </Typography>
                          <Typography sx={{ fontSize: '0.925rem', fontWeight: 700, color: '#0F2A52' }}>
                            {node.title}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Node Description */}
                      <Typography sx={{ fontSize: '0.8rem', color: '#67788F', lineHeight: 1.45, fontWeight: 500, position: 'relative', zIndex: 1 }}>
                        {node.desc}
                      </Typography>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CompetitionTimeline;
