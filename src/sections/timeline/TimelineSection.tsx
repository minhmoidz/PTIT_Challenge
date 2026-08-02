


import { useRef, useEffect, useState } from 'react';
import { Container, Typography, Box, Chip, Paper } from '@mui/material';
import { motion, useReducedMotion } from 'motion/react';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import CoPresentRoundedIcon from '@mui/icons-material/CoPresentRounded';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import { piccColors } from '@/theme/palette';
import { SkyBackground } from '@/components/ui/SkyBackground';
import { getSkyBackground } from '@/components/ui/skyBackgroundConfig';

/* ── Stage Data Definition ─────────────────────────── */

interface StageBullet {
  title?: string;
  text: string;
}

interface StageSubCard {
  title: string;
  text: string;
  tag?: string;
}

interface StageData {
  id: string;
  order: number;
  stageNumber: string;
  stageLabel: string;
  period: string;
  title: string;
  statusText: string;
  statusType: 'completed' | 'active' | 'estimated' | 'finale';
  accentColor: string;
  lightBg: string;
  borderColor: string;
  icon: typeof AssignmentRoundedIcon;
  description?: string;
  bullets?: StageBullet[];
  subCards?: StageSubCard[];
}

const STAGES: StageData[] = [
  {
    id: 'stage1',
    order: 1,
    stageNumber: '01',
    stageLabel: 'GIAI ĐOẠN 01',
    period: '01/08 – 15/08/2026',
    title: 'Đăng ký / Vòng đơn',
    statusText: 'Đã kết thúc',
    statusType: 'completed',
    accentColor: piccColors.blue[600],
    lightBg: piccColors.blue[50],
    borderColor: 'rgba(53, 84, 126, 0.22)',
    icon: AssignmentRoundedIcon,
    description: 'Các đội giải một đề bài chung do Ban Tổ chức công bố.',
    bullets: [
      { text: 'Công bố đề bài chung chính thức cho tất cả các đội thi' },
      { text: 'Đăng ký đội thi (03–04 thành viên) & nộp bài giải vòng đơn' },
    ],
  },
  {
    id: 'stage2',
    order: 2,
    stageNumber: '02',
    stageLabel: 'GIAI ĐOẠN 02',
    period: '20/08 – 15/09/2026',
    title: 'Vòng Bán kết',
    statusText: 'Đang diễn ra',
    statusType: 'active',
    accentColor: piccColors.indigo[600],
    lightBg: piccColors.indigo[50],
    borderColor: 'rgba(83, 90, 196, 0.25)',
    icon: CoPresentRoundedIcon,
    bullets: [
      {
        title: 'Top 18 đội xuất sắc',
        text: 'Chia làm 06 tiểu ban (03 đội/tiểu ban) cùng giải 01 đề bài.',
      },
      {
        title: '18 ngày làm việc',
        text: 'Đồng hành & nhận tư vấn chuyên sâu 1:1 từ Mentor.',
      },
      {
        title: 'Thuyết trình trước Hội đồng',
        text: 'Trình bày giải pháp và trả lời chất vấn từ giám khảo.',
      },
      {
        title: 'Doanh nghiệp đánh giá',
        text: 'Lựa chọn 01 đội xuất sắc nhất mỗi tiểu ban bước vào Chung kết.',
      },
    ],
  },
  {
    id: 'stage3',
    order: 3,
    stageNumber: '03',
    stageLabel: 'GIAI ĐOẠN 03',
    period: '07/09 – 01/10/2026 (Dự kiến)',
    title: 'Chạy thử nghiệm',
    statusText: 'Dự kiến',
    statusType: 'estimated',
    accentColor: piccColors.pink[600],
    lightBg: piccColors.pink[50],
    borderColor: 'rgba(190, 64, 119, 0.25)',
    icon: RocketLaunchRoundedIcon,
    description:
      'Triển khai thử nghiệm giải pháp bằng nguồn lực doanh nghiệp cung cấp. Thu thập dữ liệu thực tế, đánh giá tính khả thi và hoàn thiện giải pháp.',
    bullets: [
      {
        title: 'Prototype & Thử nghiệm',
        text: 'Triển khai thử nghiệm bằng nguồn lực doanh nghiệp hỗ trợ.',
      },
      {
        title: 'Đo lường & Dữ liệu',
        text: 'Thu thập dữ liệu thực tế & đánh giá tính khả thi.',
      },
      {
        title: 'Hoàn thiện báo cáo',
        text: 'Tổng kết kết quả và chuẩn bị hồ sơ minh chứng.',
      },
    ],
  },
  {
    id: 'stage4',
    order: 4,
    stageNumber: '04',
    stageLabel: 'GIAI ĐOẠN 04',
    period: '02/10/2026',
    title: 'Vòng Chung kết',
    statusText: 'Chung kết',
    statusType: 'finale',
    accentColor: piccColors.amber[600],
    lightBg: piccColors.amber[50],
    borderColor: 'rgba(158, 122, 25, 0.3)',
    icon: EmojiEventsRoundedIcon,
    description: '06 đội xuất sắc nhất bước vào Đêm Chung kết tranh tài qua 02 vòng thi:',
    subCards: [
      {
        tag: 'Vòng 1',
        title: 'Vòng 1 – Thuyết trình',
        text: 'Trình bày kế hoạch & kết quả triển khai; trả lời câu hỏi của Hội đồng Giám khảo; đánh giá năng lực phân tích, tính khả thi & hiệu quả.',
      },
      {
        tag: 'Vòng 2',
        title: 'Vòng 2 – Tranh biện đối kháng',
        text: '06 đội được ghép thành 03 cặp; trình bày phản biện, bảo vệ giải pháp & xử lý tình huống thực tế.',
      },
    ],
  },
];

/* ── Status Badge Component ────────────────────────── */

const StatusBadge = ({ type, text }: { type: StageData['statusType']; text: string }) => {
  switch (type) {
    case 'completed':
      return (
        <Chip
          icon={<CheckCircleRoundedIcon sx={{ fontSize: '13px !important', color: `${piccColors.blue[600]} !important` }} />}
          label={text}
          size="small"
          sx={{
            bgcolor: piccColors.blue[50],
            color: piccColors.blue[700],
            fontWeight: 750,
            fontSize: '0.6875rem',
            letterSpacing: '0.04em',
            height: 22,
            border: `1px solid ${piccColors.blue[200]}`,
          }}
        />
      );
    case 'active':
      return (
        <Chip
          icon={<PlayCircleFilledRoundedIcon sx={{ fontSize: '13px !important', color: `${piccColors.pink[500]} !important` }} />}
          label={text}
          size="small"
          sx={{
            bgcolor: piccColors.pink[50],
            color: piccColors.pink[600],
            fontWeight: 800,
            fontSize: '0.6875rem',
            letterSpacing: '0.04em',
            height: 22,
            border: `1px solid ${piccColors.pink[200]}`,
          }}
        />
      );
    case 'estimated':
      return (
        <Chip
          icon={<AccessTimeFilledRoundedIcon sx={{ fontSize: '13px !important', color: `${piccColors.amber[600]} !important` }} />}
          label={text}
          size="small"
          sx={{
            bgcolor: piccColors.amber[100],
            color: piccColors.amber[700],
            fontWeight: 750,
            fontSize: '0.6875rem',
            letterSpacing: '0.04em',
            height: 22,
            border: `1px solid ${piccColors.amber[300]}`,
          }}
        />
      );
    case 'finale':
    default:
      return (
        <Chip
          icon={<AutoAwesomeRoundedIcon sx={{ fontSize: '13px !important', color: '#FFFFFF !important' }} />}
          label={text}
          size="small"
          sx={{
            bgcolor: piccColors.amber[600],
            color: '#FFFFFF',
            fontWeight: 800,
            fontSize: '0.6875rem',
            letterSpacing: '0.05em',
            height: 22,
            px: 0.5,
            boxShadow: '0 2px 8px rgba(158, 122, 25, 0.3)',
          }}
        />
      );
  }
};

/* ── Stage Card Component ──────────────────────────── */

const StageCard = ({ stage, index }: { stage: StageData; index: number }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.45,
        delay: prefersReducedMotion ? 0 : index * 0.08,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, sm: 3 },
          borderRadius: '20px',
          bgcolor: '#FFFFFF',
          border: `1px solid ${stage.borderColor}`,
          boxShadow: '0 8px 24px rgba(15, 42, 82, 0.05)',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: prefersReducedMotion ? 'none' : 'translateY(-4px)',
            boxShadow: `0 16px 36px ${stage.accentColor}18`,
            borderColor: stage.accentColor,
            '& .stage-card-stripe': {
              height: 5,
            },
          },
        }}
      >
        {/* Top Accent Stripe */}
        <Box
          className="stage-card-stripe"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            bgcolor: stage.accentColor,
            transition: 'height 0.2s ease',
          }}
        />

        {/* Header Row: Eyebrow + Badge */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1.5,
            mb: 1.5,
            flexWrap: 'wrap',
          }}
        >
          <Typography
            sx={{
              fontSize: '0.75rem',
              fontWeight: 800,
              color: stage.accentColor,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontFamily: '"Manrope", sans-serif',
            }}
          >
            {stage.stageLabel}
          </Typography>

          <StatusBadge type={stage.statusType} text={stage.statusText} />
        </Box>

        {/* Stage Title */}
        <Typography
          variant="h3"
          component="h3"
          sx={{
            fontSize: { xs: '1.2rem', sm: '1.35rem' },
            fontWeight: 800,
            color: piccColors.ptitNavy,
            mb: 1,
            lineHeight: 1.3,
            fontFamily: '"Manrope", sans-serif',
          }}
        >
          {stage.title}
        </Typography>

        {/* Date Row */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.75,
            mb: 2,
            color: piccColors.slate[600],
          }}
        >
          <CalendarTodayRoundedIcon sx={{ fontSize: 15, color: stage.accentColor }} aria-hidden="true" />
          <Typography
            sx={{
              fontSize: '0.85rem',
              fontWeight: 650,
              color: piccColors.slate[600],
              fontFamily: '"Manrope", sans-serif',
            }}
          >
            {stage.period}
          </Typography>
        </Box>

        {/* Optional Description */}
        {stage.description && (
          <Typography
            sx={{
              fontSize: '0.925rem',
              color: piccColors.slate[600],
              lineHeight: 1.65,
              mb: stage.bullets || stage.subCards ? 2 : 0,
              fontFamily: '"Manrope", sans-serif',
            }}
          >
            {stage.description}
          </Typography>
        )}

        {/* Bullet Points */}
        {stage.bullets && stage.bullets.length > 0 && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1.25,
            }}
          >
            {stage.bullets.map((b, idx) => (
              <Box
                key={idx}
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 1.25,
                }}
              >
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    bgcolor: stage.accentColor,
                    mt: 1,
                    flexShrink: 0,
                  }}
                />
                <Typography
                  sx={{
                    fontSize: '0.9rem',
                    color: piccColors.slate[700],
                    lineHeight: 1.55,
                    fontFamily: '"Manrope", sans-serif',
                  }}
                >
                  {b.title && (
                    <Box
                      component="span"
                      sx={{ fontWeight: 750, color: piccColors.ptitNavy, mr: 0.75 }}
                    >
                      {b.title}:
                    </Box>
                  )}
                  {b.text}
                </Typography>
              </Box>
            ))}
          </Box>
        )}

        {/* Sub Cards (For Stage 04 - Finale Rounds) */}
        {stage.subCards && stage.subCards.length > 0 && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5,
              mt: 1.5,
            }}
          >
            {stage.subCards.map((card, idx) => (
              <Box
                key={idx}
                sx={{
                  p: 2,
                  borderRadius: '14px',
                  bgcolor: stage.lightBg,
                  border: `1px solid ${stage.borderColor}`,
                }}
              >
                <Typography
                  sx={{
                    fontSize: '0.925rem',
                    fontWeight: 750,
                    color: piccColors.ptitNavy,
                    mb: 0.5,
                    fontFamily: '"Manrope", sans-serif',
                  }}
                >
                  {card.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '0.875rem',
                    color: piccColors.slate[600],
                    lineHeight: 1.6,
                    fontFamily: '"Manrope", sans-serif',
                  }}
                >
                  {card.text}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </Paper>
    </motion.div>
  );
};

/* ── Main Timeline Section ──────────────────────────── */

export const TimelineSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [, setHasEnteredViewport] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const t = setTimeout(() => setHasEnteredViewport(true), 0);
      return () => clearTimeout(t);
    }
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) setHasEnteredViewport(true);
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Box
      component="section"
      id="lo-trinh"
      ref={sectionRef}
      aria-labelledby="timeline-heading"
      sx={{
        py: { xs: 8, sm: 10, md: 12 },
        background: getSkyBackground('journey'),
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Sky World Atmospheric Design System Background */}
      <SkyBackground variant="journey" />

      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 1,
          px: { xs: 2, sm: 2.5, md: 3 },
        }}
      >
        {/* Header Lộ trình cuộc thi */}
        <Box
          sx={{
            textAlign: 'center',
            mb: { xs: 5, md: 7 },
            maxWidth: 720,
            mx: 'auto',
            fontFamily: '"Manrope", sans-serif',
          }}
        >
          {/* Top Accent Line */}
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
            sx={{
              fontSize: '0.75rem',
              fontWeight: 800,
              color: piccColors.blue[600],
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              mb: 1,
              fontFamily: '"Manrope", sans-serif',
            }}
          >
            LỘ TRÌNH CUỘC THI
          </Typography>

          <Typography
            variant="h2"
            id="timeline-heading"
            sx={{
              fontSize: { xs: '2rem', sm: '2.5rem', md: '2.8rem' },
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-0.025em',
              mb: 1.75,
              fontFamily: '"Manrope", sans-serif',
            }}
          >
            <Box component="span" sx={{ color: piccColors.ptitRed }}>
              04 Giai Đoạn
            </Box>{' '}
            <Box component="span" sx={{ color: piccColors.ptitNavy }}>
              Chinh Phục PICC 2026
            </Box>
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: '1rem', md: '1.075rem' },
              color: piccColors.slate[600],
              lineHeight: 1.7,
              maxWidth: 680,
              mx: 'auto',
              fontFamily: '"Manrope", sans-serif',
            }}
          >
            Khám phá hành trình từ đăng ký ý tưởng đến vòng Chung kết và chinh phục ngôi vị cao nhất tại PICC 2026.
          </Typography>
        </Box>

        {/* ═══ DESKTOP ALTERNATING TIMELINE (lg breakpoint >= 1024px) ═══ */}
        <Box
          sx={{
            display: { xs: 'none', lg: 'block' },
            position: 'relative',
            maxWidth: 1140,
            mx: 'auto',
          }}
        >
          {/* Continuous Center Gradient Track Line */}
          <Box
            aria-hidden="true"
            sx={{
              position: 'absolute',
              left: '50%',
              top: 32,
              bottom: 40,
              width: 4,
              transform: 'translateX(-50%)',
              background: `linear-gradient(180deg, ${piccColors.blue[600]} 0%, ${piccColors.indigo[600]} 33%, ${piccColors.pink[600]} 66%, ${piccColors.amber[600]} 100%)`,
              borderRadius: 2,
              zIndex: 0,
            }}
          />

          {STAGES.map((stage, idx) => {
            const isLeft = idx % 2 === 0;
            const Icon = stage.icon;

            return (
              <Box
                key={stage.id}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 80px 1fr',
                  alignItems: 'center',
                  mb: idx === STAGES.length - 1 ? 0 : 6,
                  position: 'relative',
                }}
              >
                {/* Left Column */}
                <Box sx={{ pr: isLeft ? 3 : 0 }}>
                  {isLeft ? <StageCard stage={stage} index={idx} /> : null}
                </Box>

                {/* Center Column — Stage Node */}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    zIndex: 2,
                  }}
                >
                  {/* Tether Line to Card */}
                  <Box
                    aria-hidden="true"
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      [isLeft ? 'right' : 'left']: '50%',
                      width: 40,
                      height: 2,
                      bgcolor: stage.accentColor,
                      opacity: 0.6,
                      transform: 'translateY(-50%)',
                      zIndex: -1,
                    }}
                  />

                  {/* Node Circle */}
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      bgcolor: '#FFFFFF',
                      border: `3px solid ${stage.accentColor}`,
                      color: stage.accentColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 0 0 4px ${stage.lightBg}, 0 4px 14px ${stage.accentColor}30`,
                      fontWeight: 800,
                      fontSize: '0.875rem',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.1)',
                        boxShadow: `0 0 0 6px ${stage.lightBg}, 0 6px 20px ${stage.accentColor}40`,
                      },
                    }}
                  >
                    <Icon sx={{ fontSize: 22 }} />
                  </Box>
                </Box>

                {/* Right Column */}
                <Box sx={{ pl: !isLeft ? 3 : 0 }}>
                  {!isLeft ? <StageCard stage={stage} index={idx} /> : null}
                </Box>
              </Box>
            );
          })}
        </Box>

        {/* ═══ TABLET & MOBILE SINGLE-COLUMN TIMELINE (< 1024px) ═══ */}
        <Box
          sx={{
            display: { xs: 'block', lg: 'none' },
            position: 'relative',
            pl: { xs: 4, sm: 6 },
          }}
        >
          {/* Continuous Left Vertical Track Line */}
          <Box
            aria-hidden="true"
            sx={{
              position: 'absolute',
              left: { xs: 14, sm: 22 },
              top: 24,
              bottom: 40,
              width: 3,
              background: `linear-gradient(180deg, ${piccColors.blue[600]} 0%, ${piccColors.indigo[600]} 33%, ${piccColors.pink[600]} 66%, ${piccColors.amber[600]} 100%)`,
              borderRadius: 2,
              zIndex: 0,
            }}
          />

          {STAGES.map((stage, idx) => {
            const Icon = stage.icon;

            return (
              <Box
                key={stage.id}
                sx={{
                  position: 'relative',
                  mb: idx === STAGES.length - 1 ? 0 : 4,
                }}
              >
                {/* Node Circle on Vertical Line */}
                <Box
                  sx={{
                    position: 'absolute',
                    left: { xs: -26, sm: -38 },
                    top: 18,
                    zIndex: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: 28, sm: 34 },
                      height: { xs: 28, sm: 34 },
                      borderRadius: '50%',
                      bgcolor: '#FFFFFF',
                      border: `2.5px solid ${stage.accentColor}`,
                      color: stage.accentColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 0 0 3px ${stage.lightBg}, 0 2px 8px ${stage.accentColor}30`,
                    }}
                  >
                    <Icon sx={{ fontSize: { xs: 15, sm: 18 } }} />
                  </Box>
                </Box>

                <StageCard stage={stage} index={idx} />
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default TimelineSection;

