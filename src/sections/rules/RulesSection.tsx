import { Container, Typography, Accordion, AccordionSummary, AccordionDetails, Box, Chip, Button } from '@mui/material';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import PictureAsPdfRoundedIcon from '@mui/icons-material/PictureAsPdfRounded';
import { motion } from 'motion/react';
import { rules } from '@/content/vi/rules';
import { fadeInUp } from '@/motion/variants';
import { piccColors } from '@/theme/palette';
import { getApprovedAsset } from '@/config/asset-manifest';

export const RulesSection = () => {
  const pdfAsset = getApprovedAsset('rulesPdf' as unknown as Parameters<typeof getApprovedAsset>[0]);

  return (
    <Box
      component="section"
      id="the-le"
      sx={{
        py: { xs: 9, md: 14 },
        bgcolor: piccColors.sky[50],
        position: 'relative',
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Chip
            icon={<MenuBookRoundedIcon sx={{ color: `${piccColors.blue[700]} !important` }} />}
            label="Quy định & Thể lệ"
            sx={{
              bgcolor: piccColors.sky[100],
              color: piccColors.blue[700],
              fontWeight: 700,
              mb: 2,
            }}
          />
          <Typography variant="h2" component="h2" sx={{ mb: 2, color: piccColors.ink, fontWeight: 800 }}>
            Thể Lệ Cuộc Thi
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 640, mx: 'auto' }}>
            Thông tin chi tiết về đối tượng, hình thức, tiêu chí đánh giá và quy định chung của cuộc thi PICC 2026
          </Typography>
        </Box>

        <Box component={motion.div} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
          {rules.sections.map((section, index) => (
            <motion.div key={section.id} variants={fadeInUp} transition={{ delay: index * 0.06 }}>
              <Accordion defaultExpanded={index === 0}>
                <AccordionSummary
                  expandIcon={<ExpandMoreRoundedIcon sx={{ color: piccColors.blue[700] }} />}
                  aria-controls={`${section.id}-content`}
                  id={`${section.id}-header`}
                  sx={{ py: 1 }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '10px',
                        bgcolor: piccColors.blue[100],
                        color: piccColors.blue[700],
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '0.875rem',
                        flexShrink: 0,
                      }}
                    >
                      0{index + 1}
                    </Box>
                    <Typography variant="h3" component="h3" sx={{ fontSize: '1.1rem', fontWeight: 750, color: piccColors.ink }}>
                      {section.title}
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 3, pb: 3, pt: 1 }}>
                  {section.content.map((paragraph, i) => (
                    <Typography
                      key={i}
                      variant="body1"
                      sx={{
                        mb: i < section.content.length - 1 ? 2 : 0,
                        color: 'text.secondary',
                        lineHeight: 1.7,
                      }}
                    >
                      {paragraph}
                    </Typography>
                  ))}
                </AccordionDetails>
              </Accordion>
            </motion.div>
          ))}
        </Box>

        {pdfAsset && (
          <Box sx={{ textAlign: 'center', mt: 5 }}>
            <Button
              variant="outlined"
              size="large"
              href={pdfAsset.src}
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<PictureAsPdfRoundedIcon />}
            >
              Tải Thể Lệ Đầy Đủ (PDF)
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};
