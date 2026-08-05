import { useRef, useCallback, useEffect, useState, useMemo } from 'react';
import { Box, Typography, Link, Chip } from '@mui/material';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'motion/react';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import FlagRoundedIcon from '@mui/icons-material/FlagRounded';
import { assetManifest } from '@/config/asset-manifest';
import { piccColors } from '@/theme/palette';
import {
  getNextEventMilestone,
  buildEffectiveMilestones,
} from '@/config/milestones';

/* ─── Real-Time Countdown State ─── */
interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

const computeTimeDiff = (targetDate: Date | null): CountdownState => {
  if (!targetDate) return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  const diffMs = targetDate.getTime() - Date.now();
  if (diffMs <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  return {
    days: Math.floor(diffMs / 86_400_000),
    hours: Math.floor((diffMs / 3_600_000) % 24),
    minutes: Math.floor((diffMs / 60_000) % 60),
    seconds: Math.floor((diffMs / 1000) % 60),
    isExpired: false,
  };
};
const DigitBlock = ({
  value,
  label,
  isLast,
}: {
  value: number;
  label: string;
  isLast?: boolean;
}) => (
  <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0 }}>
    <Box
      sx={{
        flex: 1,
        minWidth: 0,
        textAlign: 'center',
        py: { xs: 1.1, sm: 1.35 },
        px: { xs: 0.25, sm: 0.5 },
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F4F7FB 100%)',
        border: '1.5px solid rgba(210, 221, 237, 0.9)',
        borderRadius: '14px',
        boxShadow:
          '0 4px 14px -2px rgba(15, 42, 82, 0.08), 0 2px 4px rgba(15, 42, 82, 0.04), inset 0 1.5px 0 #FFFFFF',
        transition: 'all 0.25s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          background: 'linear-gradient(180deg, #FFFFFF 0%, #EEF4FD 100%)',
          borderColor: 'rgba(225, 20, 20, 0.4)',
          boxShadow:
            '0 8px 20px -2px rgba(225, 20, 20, 0.18), 0 3px 8px rgba(15, 42, 82, 0.06), inset 0 1.5px 0 #FFFFFF',
        },
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: '1.35rem', sm: '1.65rem', md: '1.75rem', lg: '1.9rem' },
          fontWeight: 900,
          color: '#0F2A52',
          lineHeight: 1,
          fontVariantNumeric: 'tabular-nums',
          letterSpacing: '-0.035em',
        }}
      >
        <motion.span
          key={value}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          style={{ display: 'block' }}
          aria-live="off"
        >
          {String(value).padStart(2, '0')}
        </motion.span>
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: '0.62rem', sm: '0.68rem' },
          fontWeight: 800,
          color: piccColors.slate[500],
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          mt: 0.4,
        }}
      >
        {label}
      </Typography>
    </Box>

    {!isLast && (
      <Typography
        aria-hidden="true"
        sx={{
          fontSize: { xs: '1rem', sm: '1.25rem' },
          fontWeight: 900,
          color: 'rgba(15, 42, 82, 0.28)',
          mx: { xs: 0.1, sm: 0.25 },
          alignSelf: 'center',
          userSelect: 'none',
          flexShrink: 0,
        }}
      >
        :
      </Typography>
    )}
  </Box>
);

/* ─── Main Time Portal Hero Visual Component ─── */
export const HeroVisual = ({
  registrationTimes,
}: {
  registrationTimes?: { openAt?: string | null; closeAt?: string | null };
}) => {
  const logoSrc = assetManifest.heroAvatar?.src ?? '';
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  /* Real-time Countdown Sync (uses live registration window from server config) */
  const milestones = useMemo(() => buildEffectiveMilestones(registrationTimes), [registrationTimes]);
  const [milestoneInfo, setMilestoneInfo] = useState(() => getNextEventMilestone(milestones));
  const [countdown, setCountdown] = useState<CountdownState>(() =>
    computeTimeDiff(milestoneInfo.targetDate),
  );

  useEffect(() => {
    const updateCountdown = () => {
      const info = getNextEventMilestone(milestones);
      setMilestoneInfo(info);
      setCountdown(computeTimeDiff(info.targetDate));
    };

    updateCountdown();
    const timerId = setInterval(updateCountdown, 1000);
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') updateCountdown();
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      clearInterval(timerId);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [milestones]);

  /* Mouse Parallax Effect */
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!cardRef.current || prefersReducedMotion) return;
      const r = cardRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - r.left) / r.width);
      mouseY.set((e.clientY - r.top) / r.height);
    },
    [mouseX, mouseY, prefersReducedMotion],
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [mouseX, mouseY]);

  const smoothX = useSpring(mouseX, { damping: 28, stiffness: 90 });
  const smoothY = useSpring(mouseY, { damping: 28, stiffness: 90 });
  const rotateX = useTransform(smoothY, [0, 1], [4, -4]);
  const rotateY = useTransform(smoothX, [0, 1], [-4, 4]);

  const activeMilestone = milestoneInfo.nextMilestone ?? milestoneInfo.currentMilestone;

  return (
    <Box
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      sx={{
        width: '100%',
        maxWidth: { xs: 440, sm: 520, md: 660, lg: 700 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        perspective: '1000px',
      }}
    >
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          rotateX: prefersReducedMotion ? 0 : rotateX,
          rotateY: prefersReducedMotion ? 0 : rotateY,
          transformStyle: 'preserve-3d',
        }}
        sx={{
          width: '100%',
          position: 'relative',
          zIndex: 5,
          borderRadius: '28px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          background: '#FFFFFF',
          boxShadow: '0 24px 60px -12px rgba(15, 42, 82, 0.2), 0 0 0 1px rgba(15, 42, 82, 0.08)',
        }}
      >
        {/* Left Side: Logo & Brand Area */}
        <Box
          sx={{
            width: { xs: '100%', md: '38%' },
            position: 'relative',
            background: `radial-gradient(ellipse at 50% 40%, rgba(225, 20, 20, 0.12) 0%, rgba(216, 229, 245, 0) 70%), linear-gradient(150deg, #EBF2FA 0%, #D8E5F5 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: { xs: 2.5, sm: 3, md: 2.5 },
            borderRight: { md: '1px solid rgba(15, 42, 82, 0.08)' },
            borderBottom: { xs: '1px solid rgba(15, 42, 82, 0.08)', md: 'none' },
          }}
        >
          {/* Decorative Grid Overlay */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              opacity: 0.12,
              backgroundImage: 'radial-gradient(rgba(15, 42, 82, 0.4) 1px, transparent 0)',
              backgroundSize: '14px 14px',
              pointerEvents: 'none',
            }}
          />

          <Box
            component={motion.div}
            animate={prefersReducedMotion ? {} : { y: [0, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            sx={{ width: { xs: 160, sm: 190, md: 200 }, display: 'flex', position: 'relative', zIndex: 1 }}
          >
            {logoSrc ? (
              <Box
                component="img"
                src={logoSrc}
                alt="PICC 2026"
                sx={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 8px 24px rgba(15, 42, 82, 0.15))',
                }}
              />
            ) : (
              <LogoFallback />
            )}
          </Box>
        </Box>

        {/* Right Side: Countdown & Event Status Details */}
        <Box
          sx={{
            width: { xs: '100%', md: '62%' },
            p: { xs: 2.25, sm: 2.75, md: 2.75 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            bgcolor: '#FFFFFF',
            minWidth: 0,
          }}
        >
          {milestoneInfo.isAllCompleted ? (
            <CompletedPanel />
          ) : (
            <CountdownCard
              countdown={countdown}
              activeMilestone={activeMilestone}
              activeStepIndex={milestoneInfo.activeStepIndex}
              totalMilestones={milestones.length}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

/* ─── Logo Fallback Component ─── */
const LogoFallback = () => (
  <Box
    sx={{
      width: 170,
      height: 170,
      borderRadius: '24px',
      background: 'linear-gradient(135deg, #0F2A52 0%, #1F3C63 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 12px 32px rgba(15, 42, 82,0.3)',
    }}
  >
    <Typography sx={{ color: '#fff', fontWeight: 900, fontSize: '2.2rem', letterSpacing: '-0.04em' }}>
      PICC
    </Typography>
  </Box>
);

/* ─── Redesigned 4-Tier Countdown Dashboard Card ─── */
const CountdownCard = ({
  countdown,
  activeMilestone,
  activeStepIndex,
  totalMilestones,
}: {
  countdown: CountdownState;
  activeMilestone: ReturnType<typeof getNextEventMilestone>['nextMilestone'];
  activeStepIndex: number;
  totalMilestones: number;
}) => (
  <Box
    sx={{
      bgcolor: '#FFFFFF',
      position: 'relative',
    }}
  >
    {/* ── TIER 1: Header Row (Eyebrow Badge & Date Timestamp) ── */}
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
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
        <Chip
          icon={<AutoAwesomeRoundedIcon sx={{ fontSize: '13px !important', color: `${piccColors.ptitRed} !important` }} />}
          label="MỐC SỰ KIỆN TIẾP THEO"
          size="small"
          sx={{
            background: 'linear-gradient(135deg, rgba(255, 241, 241, 0.95) 0%, rgba(255, 226, 226, 0.8) 100%)',
            color: piccColors.ptitRed,
            fontWeight: 800,
            fontSize: '0.65rem',
            letterSpacing: '0.08em',
            height: 23,
            px: 0.75,
            border: '1px solid rgba(225, 20, 20, 0.2)',
            boxShadow: '0 2px 6px rgba(225, 20, 20, 0.08)',
          }}
        />
      </Box>

      {activeMilestone?.dateStr && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: piccColors.slate[500] }}>
          <AccessTimeRoundedIcon sx={{ fontSize: 13, color: piccColors.ptitRed }} />
          <Typography
            sx={{
              fontSize: '0.75rem',
              fontWeight: 750,
              color: piccColors.slate[600],
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {activeMilestone.dateStr}
          </Typography>
        </Box>
      )}
    </Box>

    {/* ── TIER 2: Milestone Title ── */}
    <Typography
      variant="h3"
      component="h3"
      sx={{
        fontSize: { xs: '1.2rem', sm: '1.35rem', md: '1.4rem' },
        fontWeight: 850,
        color: '#0F2A52',
        lineHeight: 1.25,
        mb: 2,
        letterSpacing: '-0.015em',
      }}
    >
      {activeMilestone?.title ?? 'Sắp diễn ra'}
    </Typography>

    {/* ── TIER 3: Countdown Digit Blocks (4 Distinct Blocks) ── */}
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: { xs: 0.4, sm: 0.75 },
        mb: 2.25,
      }}
      role="timer"
      aria-label={`Đếm ngược mốc sự kiện: ${countdown.days} ngày ${countdown.hours} giờ ${countdown.minutes} phút ${countdown.seconds} giây`}
    >
      <DigitBlock value={countdown.days} label="Ngày" />
      <DigitBlock value={countdown.hours} label="Giờ" />
      <DigitBlock value={countdown.minutes} label="Phút" />
      <DigitBlock value={countdown.seconds} label="Giây" isLast />
    </Box>

    {/* ── TIER 4: Footer Progress & Action ── */}
    <MilestoneProgress activeIndex={activeStepIndex} total={totalMilestones} />
  </Box>
);

/* ─── Footer Progress & Action Link Component ─── */
const MilestoneProgress = ({
  activeIndex,
  total,
}: {
  activeIndex: number;
  total: number;
}) => {
  const displayStep = Math.min(activeIndex + 1, total);
  const pct = Math.min((activeIndex / total) * 100, 100);

  return (
    <Box
      sx={{
        pt: 1.75,
        borderTop: '1px dashed rgba(210, 221, 237, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 1.5,
      }}
    >
      {/* Progress Indicator */}
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 1.25 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexShrink: 0 }}>
          <FlagRoundedIcon sx={{ fontSize: 14, color: piccColors.ptitRed }} />
          <Typography
            sx={{
              fontSize: '0.7rem',
              fontWeight: 800,
              color: piccColors.slate[700],
              letterSpacing: '0.03em',
            }}
          >
            Mốc {displayStep} / {total}
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            height: 5,
            bgcolor: 'rgba(15, 42, 82, 0.06)',
            borderRadius: 3,
            overflow: 'hidden',
            maxWidth: 120,
          }}
        >
          <Box
            component={motion.div}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
            sx={{
              height: '100%',
              background: `linear-gradient(90deg, ${piccColors.ptitRed} 0%, ${piccColors.ptitNavy} 100%)`,
              borderRadius: 3,
            }}
          />
        </Box>
      </Box>

      {/* CTA Action Link */}
      <Link
        href="#lo-trinh"
        underline="none"
        sx={{
          fontSize: '0.775rem',
          fontWeight: 800,
          color: piccColors.ptitRed,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 0.3,
          whiteSpace: 'nowrap',
          transition: 'all 0.2s ease',
          '&:hover': {
            color: piccColors.ptitDarkRed,
            transform: 'translateX(3px)',
          },
        }}
      >
        Xem hành trình
        <ArrowForwardRoundedIcon sx={{ fontSize: 13 }} />
      </Link>
    </Box>
  );
};

/* ─── Completed Panel ─── */
const CompletedPanel = () => (
  <Box
    sx={{
      bgcolor: '#FFFFFF',
      p: 3.5,
      textAlign: 'center',
    }}
  >
    <Typography
      sx={{ fontWeight: 850, fontSize: '1.15rem', color: '#0F2A52', mb: 0.5 }}
    >
      PICC 2026 đã khép lại
    </Typography>
    <Typography
      sx={{ fontSize: '0.875rem', color: piccColors.slate[500], mb: 2 }}
    >
      Cảm ơn các đội thi đã tham gia và bứt phá cùng cuộc thi!
    </Typography>
    <Link
      href="#lo-trinh"
      underline="none"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.5,
        px: 3,
        py: 1,
        borderRadius: 999,
        bgcolor: piccColors.ptitRed,
        color: '#FFFFFF',
        fontWeight: 800,
        fontSize: '0.85rem',
        boxShadow: '0 4px 14px rgba(225, 20, 20, 0.22)',
        transition: 'all 0.2s ease',
        '&:hover': {
          bgcolor: piccColors.ptitDarkRed,
          transform: 'translateY(-2px)',
        },
      }}
    >
      Xem kết quả <ArrowForwardRoundedIcon sx={{ fontSize: 15 }} />
    </Link>
  </Box>
);

export default HeroVisual;
