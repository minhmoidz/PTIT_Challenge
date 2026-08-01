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

/* ─── Premium Glass Countdown Digit Block ─── */
const DigitBlock = ({
  value,
  label,
  isLast,
}: {
  value: number;
  label: string;
  isLast?: boolean;
}) => (
  <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
    <Box
      sx={{
        flex: 1,
        textAlign: 'center',
        py: { xs: 1.25, sm: 1.5 },
        px: { xs: 0.75, sm: 1 },
        bgcolor: 'rgba(244, 248, 253, 0.85)',
        border: '1px solid rgba(56, 130, 241, 0.18)',
        borderRadius: '16px',
        boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.8), 0 2px 8px rgba(15, 42, 82, 0.04)',
        transition: 'all 0.25s ease',
        '&:hover': {
          bgcolor: '#FFFFFF',
          borderColor: 'rgba(56, 130, 241, 0.35)',
          boxShadow: '0 4px 14px rgba(56, 130, 241, 0.12)',
        },
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.4rem' },
          fontWeight: 850,
          color: '#0F2A52',
          lineHeight: 1,
          fontVariantNumeric: 'tabular-nums',
          letterSpacing: '-0.03em',
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
          fontSize: { xs: '0.625rem', sm: '0.6875rem' },
          fontWeight: 750,
          color: '#67788F',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          mt: 0.5,
        }}
      >
        {label}
      </Typography>
    </Box>

    {!isLast && (
      <Typography
        aria-hidden="true"
        sx={{
          fontSize: { xs: '1.25rem', sm: '1.5rem' },
          fontWeight: 800,
          color: 'rgba(56, 130, 241, 0.35)',
          mx: { xs: 0.25, sm: 0.5 },
          alignSelf: 'center',
          userSelect: 'none',
        }}
      >
        :
      </Typography>
    )}
  </Box>
);

/* ─── Main Time Portal Hero Visual Component ─── */
export const HeroVisual = ({ registrationTimes }: { registrationTimes?: { openAt?: string; closeAt?: string } }) => {
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
  const logoX = useTransform(smoothX, [0, 1], [-6, 6]);
  const logoY = useTransform(smoothY, [0, 1], [-6, 6]);

  const activeMilestone = milestoneInfo.nextMilestone ?? milestoneInfo.currentMilestone;

  return (
    <Box
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      sx={{
        width: '100%',
        maxWidth: { xs: 440, sm: 500, md: 540 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        perspective: '1000px',
      }}
    >
      {/* ══ 1. TIME PORTAL 3D CORE (Logo & Orbital Rings) ══ */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        style={{
          rotateX: prefersReducedMotion ? 0 : rotateX,
          rotateY: prefersReducedMotion ? 0 : rotateY,
          transformStyle: 'preserve-3d',
        }}
        sx={{
          position: 'relative',
          width: { xs: 'min(78vw, 270px)', sm: 320, md: 360 },
          height: { xs: 250, sm: 295, md: 320 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {/* Soft Radial Ambient Aura Glow */}
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            inset: '-15%',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(56, 130, 241,0.32) 0%, rgba(106, 115, 220,0.18) 40%, rgba(214, 88, 144,0.12) 65%, transparent 78%)',
            filter: 'blur(32px)',
            zIndex: 0,
          }}
        />

        {/* Outer Orbit Ring 1 (Indigo/Blue 3D Tilt) */}
        <OrbitalRing
          size={350}
          color="rgba(56, 130, 241, 0.38)"
          tiltX={64}
          tiltY={10}
          duration={26}
          nodeColor="#3882F1"
          nodeTop
          zIndex={1}
          prefersReducedMotion={prefersReducedMotion}
        />

        {/* Secondary campaign orbit */}
        <OrbitalRing
          size={300}
          color="rgba(106, 115, 220, 0.22)"
          tiltX={52}
          tiltY={-20}
          duration={34}
          reverse
          zIndex={1}
          prefersReducedMotion={prefersReducedMotion}
        />

        {/* Specular Platform Shadow under Logo */}
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            bottom: '14%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '48%',
            height: 12,
            background:
              'linear-gradient(180deg, rgba(56, 130, 241,0.22) 0%, rgba(56, 130, 241,0.02) 100%)',
            borderRadius: '50%',
            filter: 'blur(5px)',
            zIndex: 2,
          }}
        />

        {/* PICC 2026 Brand Logo Centerpiece */}
        <Box
          component={motion.div}
          animate={prefersReducedMotion ? {} : { y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            x: prefersReducedMotion ? 0 : logoX,
            y: prefersReducedMotion ? 0 : logoY,
          }}
          sx={{
            position: 'relative',
            zIndex: 4,
            width: { xs: 150, sm: 180, md: 200 },
            filter: 'drop-shadow(0 16px 36px rgba(15, 42, 82,0.24))',
          }}
        >
          {logoSrc ? (
            <Box
              component="img"
              src={logoSrc}
              alt="PICC 2026 Logo"
              sx={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }}
            />
          ) : (
            <LogoFallback />
          )}
        </Box>

        <FloatingGem size={12} top="15%" right="12%" color1="#E7C34D" color2="#D65890" duration={5} delay={0} shape="circle" prefersReducedMotion={prefersReducedMotion} />
      </Box>

      {/* ══ 2. STACKED COUNTDOWN CARD (Overlapping Unified Composition) ══ */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
        sx={{
          width: '100%',
          mt: { xs: -2.5, sm: -3.5, md: -4 },
          position: 'relative',
          zIndex: 5,
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
  );
};

/* ─── 3D Orbital Ring Component ─── */
const OrbitalRing = ({
  size,
  color,
  tiltX,
  tiltY,
  duration,
  reverse,
  nodeColor,
  nodeTop,
  zIndex,
  prefersReducedMotion,
}: {
  size: number;
  color: string;
  tiltX: number;
  tiltY: number;
  duration: number;
  reverse?: boolean;
  nodeColor?: string;
  nodeTop?: boolean;
  zIndex: number;
  prefersReducedMotion?: boolean | null;
}) => (
  <Box
    aria-hidden="true"
    sx={{
      position: 'absolute',
      width: size,
      height: size,
      zIndex,
      pointerEvents: 'none',
      transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
    }}
  >
    <Box
      component={motion.div}
      animate={prefersReducedMotion ? {} : { rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
      sx={{
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        border: `1.5px solid ${color}`,
        position: 'relative',
      }}
    >
      {nodeColor && (
        <Box
          sx={{
            position: 'absolute',
            top: nodeTop ? -4 : 'auto',
            bottom: nodeTop ? 'auto' : -4,
            left: '50%',
            width: 8,
            height: 8,
            borderRadius: '50%',
            bgcolor: nodeColor,
            boxShadow: `0 0 10px ${nodeColor}`,
            transform: 'translateX(-50%)',
          }}
        />
      )}
    </Box>
  </Box>
);

/* ─── Floating Accent Gem Component ─── */
const FloatingGem = ({
  size,
  top,
  bottom,
  left,
  right,
  color1,
  color2,
  duration,
  delay,
  shape,
  prefersReducedMotion,
}: {
  size: number;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  color1: string;
  color2: string;
  duration: number;
  delay: number;
  shape: 'circle' | 'square';
  prefersReducedMotion?: boolean | null;
}) => (
  <Box
    component={motion.div}
    aria-hidden="true"
    animate={prefersReducedMotion ? {} : { y: [0, -(size * 0.6), 0] }}
    transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
    sx={{
      position: 'absolute',
      top,
      bottom,
      left,
      right,
      width: size,
      height: size,
      borderRadius: shape === 'circle' ? '50%' : '4px',
      background: `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`,
      opacity: 0.8,
      boxShadow: `0 4px 12px ${color1}44`,
      zIndex: 3,
      pointerEvents: 'none',
      transform: shape === 'square' ? 'rotate(20deg)' : undefined,
    }}
  />
);

/* ─── Logo Fallback Component ─── */
const LogoFallback = () => (
  <Box
    sx={{
      width: 170,
      height: 170,
      borderRadius: '24px',
      background: 'linear-gradient(135deg, #0F2A52 0%, #3882F1 100%)',
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
      bgcolor: 'rgba(255, 255, 255, 0.95)',
      border: '1.5px solid rgba(56, 130, 241, 0.28)',
      borderRadius: '26px',
      boxShadow:
        '0 20px 50px rgba(15, 42, 82, 0.12), 0 4px 16px rgba(56, 130, 241, 0.08)',
      backdropFilter: 'blur(20px)',
      overflow: 'hidden',
      position: 'relative',
      p: { xs: 2.75, sm: 3.25, md: 3.5 },
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': {
        borderColor: 'rgba(56, 130, 241, 0.45)',
        boxShadow:
          '0 26px 60px rgba(15, 42, 82, 0.16), 0 6px 20px rgba(56, 130, 241, 0.14)',
      },
    }}
  >
    {/* Holographic Top Gradient Accent Bar */}
    <Box
      aria-hidden="true"
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 4,
        background: 'linear-gradient(90deg, #1C52A6 0%, #3882F1 100%)',
      }}
    />

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
          icon={<AutoAwesomeRoundedIcon sx={{ fontSize: '13px !important', color: '#3882F1 !important' }} />}
          label="MỐC SỰ KIỆN TIẾP THEO"
          size="small"
          sx={{
            bgcolor: 'rgba(56, 130, 241, 0.1)',
            color: piccColors.blue[700],
            fontWeight: 800,
            fontSize: '0.675rem',
            letterSpacing: '0.08em',
            height: 22,
            px: 0.5,
            border: '1px solid rgba(56, 130, 241, 0.2)',
          }}
        />
      </Box>

      {activeMilestone?.dateStr && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6, color: piccColors.slate[500] }}>
          <AccessTimeRoundedIcon sx={{ fontSize: 14, color: piccColors.blue[600] }} />
          <Typography
            sx={{
              fontSize: '0.775rem',
              fontWeight: 700,
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
        fontSize: { xs: '1.25rem', sm: '1.45rem', md: '1.55rem' },
        fontWeight: 850,
        color: '#0F2A52',
        lineHeight: 1.25,
        mb: 2.25,
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
        gap: { xs: 0.5, sm: 1 },
        mb: 2.5,
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
        borderTop: '1px dashed rgba(223, 230, 239, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
      }}
    >
      {/* Progress Indicator */}
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexShrink: 0 }}>
          <FlagRoundedIcon sx={{ fontSize: 15, color: piccColors.blue[600] }} />
          <Typography
            sx={{
              fontSize: '0.725rem',
              fontWeight: 800,
              color: piccColors.slate[700],
              letterSpacing: '0.04em',
            }}
          >
            Mốc {displayStep} / {total}
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            height: 5,
            bgcolor: 'rgba(56, 130, 241, 0.12)',
            borderRadius: 3,
            overflow: 'hidden',
            maxWidth: 140,
          }}
        >
          <Box
            component={motion.div}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
            sx={{
              height: '100%',
              background: 'linear-gradient(90deg, #3882F1 0%, #6366F1 100%)',
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
          fontSize: '0.8rem',
          fontWeight: 800,
          color: piccColors.blue[700],
          display: 'inline-flex',
          alignItems: 'center',
          gap: 0.4,
          whiteSpace: 'nowrap',
          transition: 'all 0.2s ease',
          '&:hover': {
            color: piccColors.blue[900],
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
      bgcolor: 'rgba(255, 255, 255, 0.95)',
      border: '1.5px solid rgba(56, 130, 241, 0.28)',
      borderRadius: '26px',
      p: 3.5,
      textAlign: 'center',
      boxShadow: '0 20px 50px rgba(15, 42, 82, 0.12)',
      backdropFilter: 'blur(20px)',
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
        bgcolor: piccColors.blue[600],
        color: '#FFFFFF',
        fontWeight: 800,
        fontSize: '0.85rem',
        boxShadow: '0 4px 14px rgba(56, 130, 241, 0.3)',
        transition: 'all 0.2s ease',
        '&:hover': {
          bgcolor: piccColors.blue[800],
          transform: 'translateY(-2px)',
        },
      }}
    >
      Xem kết quả <ArrowForwardRoundedIcon sx={{ fontSize: 15 }} />
    </Link>
  </Box>
);

export default HeroVisual;
