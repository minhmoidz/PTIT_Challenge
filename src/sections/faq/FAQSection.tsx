import { useState } from 'react';
import { Container, Typography, Box, Button, Collapse } from '@mui/material';
import { motion, useReducedMotion } from 'motion/react';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import HeadsetMicRoundedIcon from '@mui/icons-material/HeadsetMicRounded';
import { fadeInUp, staggerContainer } from '@/motion/variants';
import { piccColors } from '@/theme/palette';
import { SkyBackground } from '@/components/ui/SkyBackground';
import { getSkyBackground } from '@/components/ui/skyBackgroundConfig';
import { competitionData } from '@/data/competition';

interface FAQItem {
  question: string;
  answer: string;
}

interface Props {
  items?: FAQItem[];
}

export const FAQSection = ({ items = competitionData.faq }: Props) => {
  const faqItems = items;
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const prefersReducedMotion = useReducedMotion();

  const handleToggle = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <Box
      component="section"
      id="faq"
      sx={{
        py: { xs: 8, sm: 10, md: 12 },
        background: getSkyBackground('calm'),
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <SkyBackground variant="calm" />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
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
              mb: 1.75,
              color: piccColors.ptitNavy,
              fontWeight: 800,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '2.8rem' },
              letterSpacing: '-0.025em',
              lineHeight: 1.15,
              fontFamily: '"Manrope", sans-serif',
            }}
          >
            Câu Hỏi Thường Gặp <Box component="span" sx={{ color: piccColors.ptitRed }}>(FAQ)</Box>
          </Typography>
          <Typography
            sx={{
              color: piccColors.slate[600],
              maxWidth: 680,
              mx: 'auto',
              fontSize: { xs: '1rem', md: '1.075rem' },
              lineHeight: 1.7,
              fontWeight: 450,
              fontFamily: '"Manrope", sans-serif',
            }}
          >
            Tìm câu trả lời nhanh cho những thắc mắc phổ biến về điều kiện tham gia, quy trình thi và quyền lợi thí sinh tại PICC 2026.
          </Typography>
        </Box>

        {/* Accordion List */}
        <Box
          component={motion.div}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          sx={{ maxWidth: 920, mx: 'auto' }}
        >
          {faqItems.map((item, index) => {
            const isExpanded = expandedIndex === index;
            const itemId = `faq-item-${index}`;
            const headerId = `faq-header-${index}`;
            const panelId = `faq-panel-${index}`;
            const stepNumber = String(index + 1).padStart(2, '0');

            return (
              <motion.div key={itemId} variants={fadeInUp}>
                <Box
                  sx={{
                    mb: 2,
                    borderRadius: '18px',
                    bgcolor: isExpanded ? '#FFFFFF' : 'rgba(255, 255, 255, 0.92)',
                    backdropFilter: 'blur(16px)',
                    border: isExpanded
                      ? '1.5px solid rgba(56, 130, 241, 0.45)'
                      : '1.5px solid rgba(223, 230, 239, 0.85)',
                    boxShadow: isExpanded
                      ? '0 10px 32px rgba(15, 42, 82, 0.07)'
                      : '0 4px 18px rgba(15, 42, 82, 0.03)',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      borderColor: 'rgba(56, 130, 241, 0.4)',
                      bgcolor: '#FFFFFF',
                    },
                  }}
                >
                  {isExpanded && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        width: 4,
                        bgcolor: piccColors.blue[600],
                      }}
                    />
                  )}

                  <Box
                    component="button"
                    id={headerId}
                    aria-expanded={isExpanded}
                    aria-controls={panelId}
                    onClick={() => handleToggle(index)}
                    sx={{
                      width: '100%',
                      background: 'none',
                      border: 'none',
                      outline: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      px: { xs: 2.75, sm: 3.5 },
                      py: { xs: 2.25, md: 2.5 },
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 2,
                      '&:focus-visible': {
                        outline: `2px solid ${piccColors.blue[600]}`,
                        outlineOffset: '-2px',
                        borderRadius: '18px',
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2 } }}>
                      <Typography
                        sx={{
                          fontSize: '0.825rem',
                          fontWeight: 800,
                          color: isExpanded ? piccColors.blue[700] : piccColors.slate[400],
                          bgcolor: isExpanded ? 'rgba(56, 130, 241, 0.1)' : 'rgba(223, 230, 239, 0.5)',
                          px: 1.25,
                          py: 0.35,
                          borderRadius: '8px',
                          fontVariantNumeric: 'tabular-nums',
                          flexShrink: 0,
                          transition: 'all 0.2s ease',
                        }}
                      >
                        {stepNumber}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: { xs: '1.025rem', md: '1.125rem' },
                          fontWeight: isExpanded ? 800 : 700,
                          color: piccColors.ink,
                          lineHeight: 1.45,
                        }}
                      >
                        {item.question}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        width: 34,
                        height: 34,
                        borderRadius: '50%',
                        bgcolor: isExpanded ? piccColors.blue[600] : 'rgba(223, 235, 253, 0.8)',
                        color: isExpanded ? '#FFFFFF' : piccColors.blue[700],
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        transition: 'all 0.25s ease',
                        boxShadow: isExpanded ? '0 4px 12px rgba(56, 130, 241, 0.3)' : 'none',
                      }}
                    >
                      {isExpanded ? (
                        <RemoveRoundedIcon sx={{ fontSize: 20 }} />
                      ) : (
                        <AddRoundedIcon sx={{ fontSize: 20 }} />
                      )}
                    </Box>
                  </Box>

                  <Collapse
                    in={isExpanded}
                    timeout={prefersReducedMotion ? 0 : 300}
                    unmountOnExit
                  >
                    <Box
                      id={panelId}
                      role="region"
                      aria-labelledby={headerId}
                      sx={{
                        px: { xs: 2.75, sm: 3.5 },
                        pb: { xs: 2.75, sm: 3 },
                        pt: 0.5,
                        pl: { xs: 2.75, sm: 7.25 },
                      }}
                    >
                      <Box
                        sx={{
                          pt: 1.5,
                          borderTop: '1px dashed rgba(223, 230, 239, 0.8)',
                        }}
                      >
                        <Typography
                          sx={{
                            color: piccColors.slate[600],
                            lineHeight: 1.725,
                            fontSize: { xs: '0.925rem', md: '0.975rem' },
                            fontWeight: 450,
                          }}
                        >
                          {item.answer}
                        </Typography>
                      </Box>
                    </Box>
                  </Collapse>
                </Box>
              </motion.div>
            );
          })}
        </Box>

        {/* Support Callout Card */}
        <Box
          component={motion.div}
          variants={fadeInUp}
          sx={{
            mt: { xs: 5, md: 6 },
            maxWidth: 920,
            mx: 'auto',
          }}
        >
          <Box
            sx={{
              p: { xs: 3, sm: 3.5 },
              borderRadius: '22px',
              bgcolor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1.5px solid rgba(56, 130, 241, 0.25)',
              boxShadow: '0 8px 30px rgba(15, 42, 82, 0.05)',
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'flex-start', sm: 'center' },
              justifyContent: 'space-between',
              gap: 2.5,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '14px',
                  bgcolor: 'rgba(56, 130, 241, 0.1)',
                  color: piccColors.blue[700],
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  border: '1px solid rgba(56, 130, 241, 0.2)',
                }}
              >
                <HeadsetMicRoundedIcon sx={{ fontSize: 24 }} />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: 800,
                    color: piccColors.ink,
                    fontSize: { xs: '1rem', md: '1.075rem' },
                    mb: 0.35,
                  }}
                >
                  Bạn chưa tìm thấy câu trả lời?
                </Typography>
                <Typography
                  sx={{
                    color: piccColors.slate[500],
                    fontSize: '0.875rem',
                    lineHeight: 1.45,
                  }}
                >
                  Đội ngũ tư vấn Ban Tổ chức luôn sẵn sàng giải đáp và hỗ trợ 24/7.
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                width: { xs: '100%', sm: 'auto' },
                flexShrink: 0,
              }}
            >
              <Button
                variant="contained"
                size="large"
                href={competitionData.contact.facebook}
                target="_blank"
                rel="noopener noreferrer"
                endIcon={<ArrowForwardRoundedIcon />}
                sx={{
                  borderRadius: '999px',
                  px: 3.25,
                  py: 1.15,
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  bgcolor: piccColors.blue[600],
                  color: '#FFFFFF',
                  boxShadow: '0 6px 20px rgba(56, 130, 241, 0.3)',
                  whiteSpace: 'nowrap',
                  width: { xs: '100%', sm: 'auto' },
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    bgcolor: piccColors.blue[800],
                    transform: 'translateY(-2px)',
                    boxShadow: '0 10px 28px rgba(15, 42, 82, 0.35)',
                  },
                }}
              >
                Fanpage Ban Tổ chức
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default FAQSection;
