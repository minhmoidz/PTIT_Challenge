import { Container, Grid, Box, Button } from '@mui/material';
import PictureAsPdfRoundedIcon from '@mui/icons-material/PictureAsPdfRounded';
import { motion } from 'motion/react';
import { staggerContainer } from '@/motion/variants';
import { getApprovedAsset } from '@/config/asset-manifest';
import { SkyBackground } from '@/components/ui/SkyBackground';
import { getSkyBackground } from '@/components/ui/skyBackgroundConfig';
import { RulesHeader } from './components/RulesHeader';
import { CompetitionTimeline } from './components/CompetitionTimeline';
import { ParticipantCard } from './components/ParticipantCard';
import { SubmissionRequirements } from './components/SubmissionRequirements';
import { JudgingCriteria } from './components/JudgingCriteria';
import { RulesNotice } from './components/RulesNotice';

export const RulesSection = () => {
  const pdfAsset = getApprovedAsset('rulesPdf' as unknown as Parameters<typeof getApprovedAsset>[0]);

  return (
    <Box
      component="section"
      id="the-le"
      sx={{
        py: { xs: 8, sm: 10, md: 12 },
        background: getSkyBackground('clear'),
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Sky World Background — clear/structured variant */}
      <SkyBackground variant="clear" />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header & 3 Summary Metrics Bar (No Gray Bars!) */}
        <RulesHeader />

        {/* Competition Blueprint Balanced Bento Grid (Zero White Space Gaps!) */}
        <Box
          component={motion.div}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <Grid container spacing={{ xs: 2.5, md: 3 }} alignItems="stretch">
            {/* ROW 1: Timeline (8 cols ~ 66%) + Participant (4 cols ~ 34%) */}
            <Grid size={{ xs: 12, md: 8 }}>
              <CompetitionTimeline />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <ParticipantCard />
            </Grid>

            {/* ROW 2: Submission Requirements (6 cols ~ 50%) + Judging Criteria (6 cols ~ 50%) */}
            <Grid size={{ xs: 12, md: 6 }}>
              <SubmissionRequirements />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <JudgingCriteria />
            </Grid>
          </Grid>

          {/* Full Width Rules Notice Callout (No Gray Bars!) */}
          <RulesNotice />

          {/* Direct PDF Download Button */}
          {pdfAsset && (
            <Box sx={{ textAlign: 'center', mt: 4.5 }}>
              <Button
                variant="contained"
                size="large"
                href={pdfAsset.src}
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<PictureAsPdfRoundedIcon />}
                sx={{
                  borderRadius: '999px',
                  px: 4.5,
                  py: 1.5,
                  fontWeight: 800,
                  fontSize: '0.95rem',
                  bgcolor: '#3882F1',
                  color: '#FFFFFF',
                  boxShadow: '0 8px 24px rgba(56, 130, 241, 0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: '#0F2A52',
                    transform: 'translateY(-2px) scale(1.02)',
                    boxShadow: '0 12px 32px rgba(15, 42, 82, 0.4)',
                  },
                }}
              >
                Tải Bộ Thể Lệ Cuộc Thi Đầy Đủ (File PDF Trực Tiếp)
              </Button>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default RulesSection;