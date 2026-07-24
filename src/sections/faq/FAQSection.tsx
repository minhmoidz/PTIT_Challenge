import { Container, Typography, Accordion, AccordionSummary, AccordionDetails, Box, Chip, Button } from '@mui/material';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import ContactSupportRoundedIcon from '@mui/icons-material/ContactSupportRounded';
import { motion } from 'motion/react';
import { fadeInUp } from '@/motion/variants';
import { piccColors } from '@/theme/palette';

interface FAQItem {
  question: string;
  answer: string;
}

interface Props {
  items?: FAQItem[];
}

export const FAQSection = ({ items = [] }: Props) => {
  if (!items || items.length === 0) return null;

  return (
    <Box
      component="section"
      id="faq"
      sx={{
        py: { xs: 9, md: 14 },
        bgcolor: piccColors.sky[50],
        position: 'relative',
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Chip
            icon={<HelpOutlineRoundedIcon sx={{ color: `${piccColors.blue[700]} !important` }} />}
            label="Hỗ Trợ Thí Sinh"
            sx={{
              bgcolor: piccColors.sky[100],
              color: piccColors.blue[700],
              fontWeight: 700,
              mb: 2,
            }}
          />
          <Typography variant="h2" component="h2" sx={{ mb: 2, color: piccColors.ink, fontWeight: 800 }}>
            Câu Hỏi Thường Gặp
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 640, mx: 'auto' }}>
            Giải đáp các thắc mắc phổ biến về cuộc thi, thể lệ đăng ký và quy trình nộp bài
          </Typography>
        </Box>

        <Box component={motion.div} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
          {items.map((item, index) => (
            <motion.div key={index} variants={fadeInUp} transition={{ delay: index * 0.06 }}>
              <Accordion defaultExpanded={index === 0}>
                <AccordionSummary
                  expandIcon={<ExpandMoreRoundedIcon sx={{ color: piccColors.blue[700] }} />}
                  sx={{ py: 1 }}
                >
                  <Typography variant="body1" sx={{ fontWeight: 750, color: piccColors.ink, fontSize: '1.05rem' }}>
                    {item.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 3, pb: 3, pt: 1 }}>
                  <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                    {item.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </motion.div>
          ))}
        </Box>

        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
            Bạn vẫn chưa tìm thấy câu trả lời?
          </Typography>
          <Button
            variant="outlined"
            size="medium"
            href="#footer"
            startIcon={<ContactSupportRoundedIcon />}
          >
            Liên hệ Ban Tổ chức
          </Button>
        </Box>
      </Container>
    </Box>
  );
};
