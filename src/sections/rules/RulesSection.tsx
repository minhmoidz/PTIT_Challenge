import { Container, Box, Button, Grid, Typography, Link, Chip } from '@mui/material';
import PictureAsPdfRoundedIcon from '@mui/icons-material/PictureAsPdfRounded';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import { motion } from 'motion/react';
import { staggerContainer } from '@/motion/variants';
import { getApprovedAsset } from '@/config/asset-manifest';
import { SkyBackground } from '@/components/ui/SkyBackground';
import { getSkyBackground } from '@/components/ui/skyBackgroundConfig';
import { RulesHeader } from './components/RulesHeader';
import { piccColors } from '@/theme/palette';
import { rules } from '@/content/vi/rules';

const scrollToRuleGroup = (e: React.MouseEvent, id: string) => {
  e.preventDefault();
  const element = document.getElementById(id);
  if (!element) return;
  element.scrollIntoView({ block: 'start', behavior: 'smooth' });
  window.history.pushState(null, '', `#${id}`);
};

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
      <SkyBackground variant="clear" />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <RulesHeader />

        <Box
          component={motion.div}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          sx={{ maxWidth: 1160, mx: 'auto' }}
        >
          <Box
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.95)',
              border: `1px solid ${piccColors.slate[200]}`,
              boxShadow: '0 12px 36px rgba(15, 42, 82, 0.06)',
              borderRadius: '28px',
              backdropFilter: 'blur(18px)',
              overflow: 'hidden',
            }}
          >
            <Grid container>
              {/* Desktop / tablet toc */}
              <Grid
                size={{ xs: 12, lg: 3.2 }}
                sx={{
                  borderRight: { lg: `1px solid ${piccColors.slate[200]}` },
                  borderBottom: { xs: `1px solid ${piccColors.slate[200]}`, lg: 'none' },
                  bgcolor: { xs: 'rgba(248, 249, 251, 0.85)', lg: 'rgba(247, 249, 252, 0.92)' },
                }}
              >
                <Box
                  sx={{
                    p: { xs: 2.5, md: 3, lg: 3.25 },
                    position: { lg: 'sticky' },
                    top: { lg: 'calc(var(--site-anchor-offset) + 2px)' },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      color: piccColors.ptitRed,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      mb: 1.25,
                    }}
                  >
                    Mục lục thể lệ
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '0.9rem',
                      lineHeight: 1.65,
                      color: piccColors.slate[600],
                      mb: 2.25,
                    }}
                  >
                    Theo dõi 6 nhóm nội dung chính để nắm nhanh điều kiện tham gia, cấu trúc 04 giai đoạn chính và các quy định quan trọng của PICC 2026.
                  </Typography>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.9 }}>
                    {rules.sections.map((section) => (
                      <Link
                        key={section.id}
                        href={`#${section.id}`}
                        underline="none"
                        onClick={(e) => scrollToRuleGroup(e, section.id)}
                        sx={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 1,
                          px: 1.25,
                          py: 1,
                          borderRadius: '14px',
                          color: piccColors.ptitNavy,
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            bgcolor: piccColors.red[50],
                            color: piccColors.ptitRed,
                            transform: 'translateX(2px)',
                          },
                        }}
                      >
                        <Box
                          sx={{
                            minWidth: 26,
                            height: 26,
                            borderRadius: '50%',
                            bgcolor: piccColors.red[50],
                            color: piccColors.ptitRed,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.72rem',
                            fontWeight: 800,
                            flexShrink: 0,
                            mt: 0.2,
                          }}
                        >
                          {section.number}
                        </Box>
                        <Typography sx={{ fontSize: '0.9rem', fontWeight: 700, lineHeight: 1.45 }}>
                          {section.title}
                        </Typography>
                      </Link>
                    ))}
                  </Box>
                </Box>
              </Grid>

              {/* Main content */}
              <Grid size={{ xs: 12, lg: 8.8 }}>
                <Box sx={{ p: { xs: 2.5, sm: 3.5, md: 4, lg: 4.5 } }}>
                  <Typography
                    sx={{
                      fontSize: { xs: '0.96rem', md: '1.02rem' },
                      lineHeight: 1.75,
                      color: piccColors.slate[600],
                      maxWidth: 880,
                      mb: { xs: 3.5, md: 4.5 },
                    }}
                  >
                    {rules.intro}
                  </Typography>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 3.5, md: 4 } }}>
                    {rules.sections.map((section) => (
                      <Box
                        component={motion.div}
                        key={section.id}
                        id={section.id}
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        sx={{
                          scrollMarginTop: 'var(--site-anchor-offset)',
                          borderTop: `1px solid ${piccColors.slate[200]}`,
                          pt: { xs: 2.5, md: 3 },
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.25, mb: 1.5 }}>
                          <Box
                            sx={{
                              minWidth: 34,
                              height: 34,
                              borderRadius: '50%',
                              bgcolor: piccColors.red[50],
                              color: piccColors.ptitRed,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '0.8rem',
                              fontWeight: 800,
                              flexShrink: 0,
                              mt: 0.15,
                            }}
                          >
                            {section.number}
                          </Box>
                          <Box sx={{ minWidth: 0 }}>
                            <Typography
                              sx={{
                                fontSize: { xs: '1.2rem', md: '1.35rem' },
                                fontWeight: 800,
                                color: piccColors.ptitNavy,
                                lineHeight: 1.3,
                              }}
                            >
                              {section.title}
                            </Typography>
                            <Typography
                              sx={{
                                mt: 0.6,
                                fontSize: { xs: '0.94rem', md: '0.98rem' },
                                lineHeight: 1.75,
                                color: piccColors.slate[600],
                              }}
                            >
                              {section.intro}
                            </Typography>
                          </Box>
                        </Box>

                        {'rounds' in section && section.rounds ? (
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {section.rounds.map((round) => (
                              <Box
                                key={round.title}
                                sx={{
                                  p: { xs: 2, md: 2.25 },
                                  borderRadius: '18px',
                                  bgcolor: piccColors.semantic.surfaceSubtle,
                                  border: `1px solid ${piccColors.slate[200]}`,
                                  transition: 'all 0.25s ease',
                                  '&:hover': {
                                    borderColor: piccColors.red[300],
                                    boxShadow: '0 10px 24px rgba(15, 42, 82, 0.08)',
                                    transform: 'translateY(-2px)',
                                  },
                                }}
                              >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.6, flexWrap: 'wrap' }}>
                                  <Typography sx={{ fontSize: '0.78rem', fontWeight: 800, color: piccColors.ptitRed, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                                    {round.period}
                                  </Typography>
                                  {'tentative' in round && round.tentative ? (
                                    <Chip
                                      label="Dự kiến"
                                      size="small"
                                      sx={{
                                        height: 20,
                                        fontSize: '0.64rem',
                                        fontWeight: 800,
                                        bgcolor: piccColors.amber[100],
                                        color: piccColors.amber[700],
                                        '& .MuiChip-label': { px: 1 },
                                      }}
                                    />
                                  ) : null}
                                </Box>
                                <Typography sx={{ fontSize: { xs: '1rem', md: '1.05rem' }, fontWeight: 750, color: piccColors.ptitNavy, lineHeight: 1.4 }}>
                                  {round.title}
                                </Typography>
                              </Box>
                            ))}
                          </Box>
                        ) : 'blocks' in section && section.blocks ? (
                          <Grid container spacing={2}>
                            {section.blocks.map((block) => (
                              <Grid size={{ xs: 12, md: 6 }} key={block.title}>
                                <Box
                                  sx={{
                                    height: '100%',
                                    p: { xs: 2, md: 2.25 },
                                    borderRadius: '18px',
                                    bgcolor: piccColors.semantic.surfaceSubtle,
                                    border: `1px solid ${piccColors.slate[200]}`,
                                    transition: 'all 0.25s ease',
                                    '&:hover': {
                                      borderColor: piccColors.red[300],
                                      boxShadow: '0 10px 24px rgba(15, 42, 82, 0.08)',
                                      transform: 'translateY(-2px)',
                                    },
                                  }}
                                >
                                  <Typography sx={{ fontSize: '0.96rem', fontWeight: 750, color: piccColors.ptitNavy, mb: 1 }}>
                                    {block.title}
                                  </Typography>
                                  <Box component="ul" sx={{ m: 0, pl: 2.2, display: 'flex', flexDirection: 'column', gap: 0.8 }}>
                                    {block.items.map((item) => (
                                      <Box component="li" key={item} sx={{ color: piccColors.slate[600], lineHeight: 1.7, fontSize: { xs: '0.9rem', md: '0.95rem' }, '&::marker': { color: piccColors.ptitRed } }}>
                                        {item}
                                      </Box>
                                    ))}
                                  </Box>
                                </Box>
                              </Grid>
                            ))}
                          </Grid>
                        ) : (
                          <Box component="ul" sx={{ m: 0, pl: 2.25, display: 'flex', flexDirection: 'column', gap: 0.9 }}>
                            {section.bullets?.map((item) => (
                              <Box component="li" key={item} sx={{ color: piccColors.slate[600], lineHeight: 1.75, fontSize: { xs: '0.92rem', md: '0.96rem' }, '&::marker': { color: piccColors.ptitRed } }}>
                                {item}
                              </Box>
                            ))}
                          </Box>
                        )}
                      </Box>
                    ))}
                  </Box>

                  {pdfAsset && (
                    <Box sx={{ textAlign: 'center', mt: 4.5 }}>
                      <Button
                        variant="contained"
                        size="large"
                        href={pdfAsset.src}
                        target="_blank"
                        rel="noopener noreferrer"
                        startIcon={<PictureAsPdfRoundedIcon />}
                        endIcon={<ArrowOutwardRoundedIcon />}
                        sx={{
                          borderRadius: '999px',
                          px: 4.5,
                          py: 1.5,
                          fontWeight: 800,
                          fontSize: '0.95rem',
                          bgcolor: piccColors.ptitRed,
                          color: '#FFFFFF',
                          boxShadow: '0 8px 24px rgba(225, 20, 20, 0.24)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            bgcolor: piccColors.ptitDarkRed,
                            transform: 'translateY(-2px) scale(1.02)',
                            boxShadow: '0 12px 32px rgba(15, 42, 82, 0.16)',
                          },
                        }}
                      >
                        Tải Bộ Thể Lệ Cuộc Thi Đầy Đủ (PDF)
                      </Button>
                    </Box>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default RulesSection;
