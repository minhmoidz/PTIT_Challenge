import { useRef, useEffect, useState } from 'react';
import { Container, Typography, Box, Chip, Paper } from '@mui/material';
import { motion } from 'motion/react';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import LockClockRoundedIcon from '@mui/icons-material/LockClockRounded';
import CampaignRoundedIcon from '@mui/icons-material/CampaignRounded';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import { staggerContainer } from '@/motion/variants';
import { piccColors } from '@/theme/palette';
import { QuickFacts } from './components/QuickFacts';
import { ForestDecor } from './components/ForestDecor';
import { SkyBackground, getSkyBackground } from '@/components/ui/SkyBackground';
import { ThreadCanvas } from './components/ThreadCanvas';
import { competitionData } from '@/data/competition';

/* ── Mapped Step Configuration ─────────────────────── */

interface JourneyStepData {
  id: string;
  order: number;
  phaseLabel: string;
  dateLabel: string;
  title: string;
  note: string;
  needsDateConfirmation?: boolean;
  accentColor: string;
  bgColor: string;
  icon: typeof RocketLaunchRoundedIcon;
  isFinale?: boolean;
}

const ACCENT_COLORS = ['#397CE8', '#E85B9F', '#D97706', '#059669'];
const BG_COLORS = ['#EAF2FF', '#FFF0F7', '#FEF3C7', '#ECFDF5'];
const ICONS = [RocketLaunchRoundedIcon, LockClockRoundedIcon, CampaignRoundedIcon, EmojiEventsRoundedIcon];

const JOURNEY_STEPS: JourneyStepData[] = competitionData.timeline.map((item, idx) => ({
  id: item.id,
  order: idx + 1,
  phaseLabel: `Giai đoạn 0${idx + 1}`,
  dateLabel: item.needsDateConfirmation ? `${item.period} (Dự kiến)` : item.period,
  title: item.title,
  note: item.note,
  needsDateConfirmation: item.needsDateConfirmation,
  accentColor: ACCENT_COLORS[idx] || '#397CE8',
  bgColor: BG_COLORS[idx] || '#EAF2FF',
  icon: ICONS[idx] || RocketLaunchRoundedIcon,
  isFinale: idx === competitionData.timeline.length - 1,
}));

/* ── Journey Card Component ────────────────────────── */

const JourneyCard = ({ step, index }: { step: JourneyStepData; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.45, delay: 0.12 + index * 0.08 }}
  >
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.25, sm: 2.75 },
        borderRadius: '20px',
        bgcolor: 'rgba(255, 255, 255, 0.96)',
        backdropFilter: 'blur(16px)',
        border: step.isFinale
          ? '2px solid #059669'
          : `1.5px solid ${step.accentColor}30`,
        boxShadow: step.isFinale
          ? '0 12px 36px rgba(5, 150, 105, 0.18)'
          : '0 4px 18px rgba(22, 58, 103, 0.05)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-3px)',
          boxShadow: step.isFinale
            ? '0 16px 44px rgba(5, 150, 105, 0.25)'
            : `0 10px 30px ${step.accentColor}24`,
          borderColor: step.accentColor,
        },
      }}
    >
      {/* Top Accent Stripe */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: step.isFinale ? 5 : 4,
          background: step.isFinale
            ? 'linear-gradient(90deg, #10B981 0%, #059669 50%, #F59E0B 100%)'
            : step.accentColor,
        }}
      />

      {/* Eyebrow Header Row */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 1.25,
          flexWrap: 'wrap',
          gap: 1,
        }}
      >
        <Typography
          sx={{
            fontSize: '0.725rem',
            fontWeight: 800,
            color: step.accentColor,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          {step.phaseLabel} • {step.dateLabel}
        </Typography>

        {step.isFinale ? (
          <Chip
            icon={
              <AutoAwesomeRoundedIcon
                sx={{ fontSize: '13px !important', color: '#FFFFFF !important' }}
              />
            }
            label="ĐÍCH ĐẾN VINH DANH"
            size="small"
            sx={{
              bgcolor: '#059669',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '0.65rem',
              letterSpacing: '0.05em',
              height: 22,
              px: 0.5,
            }}
          />
        ) : step.needsDateConfirmation ? (
          <Chip
            label="CHỜ BTC XÁC NHẬN MỐC"
            size="small"
            sx={{
              bgcolor: '#FEF3C7',
              color: '#D97706',
              fontWeight: 800,
              fontSize: '0.6rem',
              letterSpacing: '0.04em',
              height: 20,
              border: '1px solid rgba(217,119,6,0.3)',
            }}
          />
        ) : null}
      </Box>

      {/* Step Title */}
      <Typography
        sx={{
          fontSize: step.isFinale ? { xs: '1.2rem', sm: '1.35rem' } : '1.1rem',
          fontWeight: 800,
          color: '#163A67',
          mb: 1.25,
          lineHeight: 1.25,
        }}
      >
        {step.title}
      </Typography>

      {/* Description Text */}
      <Typography
        sx={{
          fontSize: '0.85rem',
          color: '#65758B',
          lineHeight: 1.6,
          fontWeight: 500,
        }}
      >
        {step.note}
      </Typography>
    </Paper>
  </motion.div>
);

/* ── Main Section ──────────────────────────────────── */

export const TimelineSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasEnteredViewport, setHasEnteredViewport] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const t = setTimeout(() => setHasEnteredViewport(true), 0);
      return () => clearTimeout(t);
    }
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setHasEnteredViewport(true);
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Box
      component="section"
      id="lo-trinh"
      ref={sectionRef}
      sx={{
        py: { xs: 9, md: 13 },
        background: getSkyBackground('journey'),
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <SkyBackground variant="journey" />
      <ForestDecor />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <QuickFacts />

        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Chip
            icon={
              <CalendarMonthRoundedIcon
                sx={{ fontSize: '15px !important', color: `${piccColors.indigo[600]} !important` }}
              />
            }
            label="Road to PICC 2026"
            sx={{
              bgcolor: piccColors.indigo[50],
              color: piccColors.indigo[700],
              fontWeight: 800,
              fontSize: '0.825rem',
              mb: 2,
              px: 1.5,
              py: 0.5,
              border: '1px solid rgba(79, 70, 229, 0.25)',
              boxShadow: '0 4px 12px rgba(79, 70, 229, 0.08)',
            }}
          />
          <Typography
            variant="h2"
            component="h2"
            sx={{
              mb: 1.75,
              color: piccColors.ink,
              fontWeight: 800,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
            }}
          >
            Hành Trình Chinh Phục Thử Thách
          </Typography>
          <Typography
            sx={{
              color: piccColors.slate[600],
              maxWidth: 640,
              mx: 'auto',
              fontSize: { xs: '0.95rem', md: '1.05rem' },
              lineHeight: 1.6,
            }}
          >
            Lộ trình 04 giai đoạn chính thức từ khi mở cổng đăng ký đến Đêm Chung kết trao giải.
          </Typography>
        </Box>

        {/* ═══ DESKTOP ROADMAP (04 Official Stages) ═══ */}
        <Box
          component={motion.div}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          sx={{
            display: { xs: 'none', md: 'block' },
            position: 'relative',
            maxWidth: 1080,
            minHeight: 840,
            mx: 'auto',
          }}
        >
          {/* Single continuous SVG Thread Path */}
          <ThreadCanvas hasEnteredViewport={hasEnteredViewport} />

          {/* ── STAGE 01 (Left Card X=0..360, Node X=410, Y=85) ── */}
          <Box sx={{ position: 'absolute', left: 0, top: 20, width: 360, zIndex: 2 }}>
            <JourneyCard step={JOURNEY_STEPS[0]} index={0} />
          </Box>
          <Box
            sx={{
              position: 'absolute',
              left: 410,
              top: 85,
              transform: 'translate(-50%, -50%)',
              zIndex: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Chip
              label="🚀 Bắt đầu"
              size="small"
              sx={{
                bgcolor: '#397CE8',
                color: '#FFFFFF',
                fontWeight: 800,
                fontSize: '0.625rem',
                height: 18,
                mb: 0.5,
                boxShadow: '0 2px 8px rgba(57, 124, 232, 0.3)',
              }}
            />
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                bgcolor: JOURNEY_STEPS[0].bgColor,
                border: `3px solid ${JOURNEY_STEPS[0].accentColor}`,
                color: JOURNEY_STEPS[0].accentColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 0 0 5px ${JOURNEY_STEPS[0].accentColor}25, 0 4px 14px ${JOURNEY_STEPS[0].accentColor}30`,
              }}
            >
              <RocketLaunchRoundedIcon sx={{ fontSize: 20 }} />
            </Box>
          </Box>

          {/* ── STAGE 02 (Right Card X=720..1080, Node X=670, Y=265) ── */}
          <Box sx={{ position: 'absolute', left: 720, top: 200, width: 360, zIndex: 2 }}>
            <JourneyCard step={JOURNEY_STEPS[1]} index={1} />
          </Box>
          <Box
            sx={{
              position: 'absolute',
              left: 670,
              top: 265,
              transform: 'translate(-50%, -50%)',
              zIndex: 3,
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                bgcolor: JOURNEY_STEPS[1].bgColor,
                border: `3px solid ${JOURNEY_STEPS[1].accentColor}`,
                color: JOURNEY_STEPS[1].accentColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(22, 58, 103, 0.1)',
              }}
            >
              <LockClockRoundedIcon sx={{ fontSize: 20 }} />
            </Box>
          </Box>

          {/* ── STAGE 03 (Left Card X=0..360, Node X=410, Y=445) ── */}
          <Box sx={{ position: 'absolute', left: 0, top: 380, width: 360, zIndex: 2 }}>
            <JourneyCard step={JOURNEY_STEPS[2]} index={2} />
          </Box>
          <Box
            sx={{
              position: 'absolute',
              left: 410,
              top: 445,
              transform: 'translate(-50%, -50%)',
              zIndex: 3,
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                bgcolor: JOURNEY_STEPS[2].bgColor,
                border: `3px solid ${JOURNEY_STEPS[2].accentColor}`,
                color: JOURNEY_STEPS[2].accentColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(22, 58, 103, 0.1)',
              }}
            >
              <CampaignRoundedIcon sx={{ fontSize: 20 }} />
            </Box>
          </Box>

          {/* ── STAGE 04 FINALE (Centered Card X=300..780, Node X=540, Y=625, Card top=640px) ── */}
          <Box
            sx={{
              position: 'absolute',
              left: '50%',
              top: 640,
              transform: 'translateX(-50%)',
              width: 480,
              zIndex: 2,
            }}
          >
            <JourneyCard step={JOURNEY_STEPS[3]} index={3} />
          </Box>
          <Box
            sx={{
              position: 'absolute',
              left: 540,
              top: 625,
              transform: 'translate(-50%, -50%)',
              zIndex: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Chip
              label="🏆 Về Đích"
              size="small"
              sx={{
                bgcolor: '#059669',
                color: '#FFFFFF',
                fontWeight: 800,
                fontSize: '0.625rem',
                height: 20,
                mb: 0.5,
                boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)',
              }}
            />
            <Box
              sx={{
                width: 50,
                height: 50,
                borderRadius: '50%',
                bgcolor: JOURNEY_STEPS[3].bgColor,
                border: '3px solid #059669',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow:
                  '0 0 0 6px rgba(5, 150, 105, 0.18), 0 6px 20px rgba(5, 150, 105, 0.3)',
              }}
            >
              <EmojiEventsRoundedIcon sx={{ fontSize: 24 }} />
            </Box>
          </Box>
        </Box>

        {/* ═══ MOBILE TIMELINE (1-Column Vertical Thread) ═══ */}
        <Box
          sx={{
            display: { xs: 'block', md: 'none' },
            position: 'relative',
            pl: 6,
          }}
        >
          {/* Vertical Continuous Thread Line */}
          <Box
            aria-hidden="true"
            sx={{
              position: 'absolute',
              left: 20,
              top: 10,
              bottom: 40,
              width: 3,
              background:
                'linear-gradient(180deg, #397CE8 0%, #E85B9F 33%, #D97706 66%, #059669 100%)',
              borderRadius: 2,
              zIndex: 0,
            }}
          />

          {JOURNEY_STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <Box key={step.id} sx={{ position: 'relative', mb: 3.5 }}>
                {/* Mobile Checkpoint Node */}
                <Box
                  sx={{
                    position: 'absolute',
                    left: -32,
                    top: 18,
                    zIndex: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      bgcolor: step.bgColor,
                      border: `2.5px solid ${step.accentColor}`,
                      color: step.accentColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 8px rgba(22, 58, 103, 0.1)',
                    }}
                  >
                    <Icon sx={{ fontSize: 16 }} />
                  </Box>
                </Box>

                <JourneyCard step={step} index={index} />
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default TimelineSection;
