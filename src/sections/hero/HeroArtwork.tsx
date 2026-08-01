import { useRef, useCallback, useEffect, useState } from 'react';
import { Box, Typography, Chip, Link, Paper } from '@mui/material';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { assetManifest } from '@/config/asset-manifest';
import { piccColors } from '@/theme/palette';
import { EVENT_MILESTONES, getNextEventMilestone } from '@/config/milestones';

interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

const computeDiff = (targetDate: Date | null): CountdownState => {
  if (!targetDate) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }
  const diffMs = targetDate.getTime() - Date.now();
  if (diffMs <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
  const seconds = Math.floor((diffMs / 1000) % 60);

  return { days, hours, minutes, seconds, isExpired: false };
};

export const HeroArtwork = () => {
  const avatarAsset = assetManifest.heroAvatar;
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse Parallax values
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [mouseX, mouseY]);

  const smoothX = useSpring(mouseX, { damping: 24, stiffness: 90 });
  const smoothY = useSpring(mouseY, { damping: 24, stiffness: 90 });

  const rotateX = useTransform(smoothY, [0, 1], [4, -4]);
  const rotateY = useTransform(smoothX, [0, 1], [-4, 4]);

  // Dynamic Countdown State & Auto-Advance Milestone Logic
  const [milestoneInfo, setMilestoneInfo] = useState(() => getNextEventMilestone());
  const [countdown, setCountdown] = useState<CountdownState>(() => computeDiff(milestoneInfo.targetDate));

  const updateCountdown = useCallback(() => {
    const info = getNextEventMilestone();
    setMilestoneInfo(info);
    const diff = computeDiff(info.targetDate);
    setCountdown(diff);
  }, []);

  useEffect(() => {
    const intervalTimer = setInterval(() => {
      const info = getNextEventMilestone();
      const diff = computeDiff(info.targetDate);

      if (diff.isExpired && !info.isAllCompleted) {
        updateCountdown();
      } else {
        setMilestoneInfo(info);
        setCountdown(diff);
      }
    }, 1000);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        updateCountdown();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(intervalTimer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [updateCountdown]);

  const activeMilestone = milestoneInfo.nextMilestone || milestoneInfo.currentMilestone;

  return (
    <Box
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      sx={{
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '1000px',
      }}
    >
      {/* 3D HOLOGRAPHIC LAUNCHPAD VISUAL CORE */}
      <Box
        component={motion.div}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: 480,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 1,
        }}
      >
        {/* Holographic Core & Orbital Rings Area */}
        <Box
          sx={{
            position: 'relative',
            width: { xs: 260, md: 320 },
            height: { xs: 240, md: 280 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: -4,
          }}
        >
          {/* Holographic Energy Core Radial Glow */}
          <Box
            component={motion.div}
            animate={{ scale: [1, 1.06, 1], rotate: [0, 5, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(56, 130, 241, 0.22) 0%, rgba(214, 88, 144, 0.14) 45%, transparent 70%)',
              filter: 'blur(35px)',
              zIndex: 0,
            }}
          />

          {/* 3D Orbital Rings 1 (Blue) */}
          <Box
            component={motion.div}
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            sx={{
              position: 'absolute',
              width: 240,
              height: 240,
              borderRadius: '50%',
              border: '1.5px stroke rgba(56, 130, 241, 0.4)',
              boxShadow: '0 0 16px rgba(56, 130, 241, 0.25)',
              transform: 'rotateX(65deg) rotateY(15deg)',
              zIndex: 1,
              pointerEvents: 'none',
            }}
          >
            {/* Orbiting Star Node */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: '50%',
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: '#3882F1',
                boxShadow: '0 0 10px #3882F1',
              }}
            />
          </Box>

          {/* 3D Orbital Rings 2 (Pink) */}
          <Box
            component={motion.div}
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            sx={{
              position: 'absolute',
              width: 260,
              height: 260,
              borderRadius: '50%',
              border: '1.5px stroke rgba(214, 88, 144, 0.35)',
              transform: 'rotateX(55deg) rotateY(-25deg)',
              zIndex: 1,
              pointerEvents: 'none',
            }}
          >
            {/* Orbiting Star Node */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                right: '50%',
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: '#D65890',
                boxShadow: '0 0 10px #D65890',
              }}
            />
          </Box>

          {/* Floating 3D Geometric Shards */}
          <Box
            component={motion.div}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            sx={{
              position: 'absolute',
              top: 20,
              right: 20,
              width: 22,
              height: 22,
              borderRadius: '6px',
              background: 'linear-gradient(135deg, rgba(231, 195, 77, 0.8) 0%, rgba(232, 89, 154, 0.8) 100%)',
              transform: 'rotate(25deg)',
              boxShadow: '0 4px 12px rgba(231, 195, 77, 0.3)',
              zIndex: 2,
            }}
          />

          <Box
            component={motion.div}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            sx={{
              position: 'absolute',
              bottom: 30,
              left: 20,
              width: 18,
              height: 18,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(56, 130, 241, 0.8) 0%, rgba(79, 70, 229, 0.8) 100%)',
              boxShadow: '0 4px 12px rgba(56, 130, 241, 0.3)',
              zIndex: 2,
            }}
          />

          {/* PICC Core Logo in Holographic Center */}
          {avatarAsset && (
            <Box
              sx={{
                position: 'relative',
                zIndex: 3,
                width: { xs: 150, md: 180 },
                height: 'auto',
                filter: 'drop-shadow(0 12px 24px rgba(15, 42, 82, 0.2))',
              }}
            >
              <Box
                component={motion.img}
                src={avatarAsset.src}
                alt="PICC 2026 Logo"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                sx={{
                  display: 'block',
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                }}
              />
            </Box>
          )}
        </Box>

        {/* 3D HOLOGRAPHIC COUNTDOWN & MINI ROADMAP GLASS CARD */}
        <Paper
          elevation={0}
          sx={{
            width: '100%',
            p: { xs: 2.5, sm: 3 },
            borderRadius: 6,
            background: 'rgba(255, 255, 255, 0.92)',
            border: '1.5px solid rgba(56, 130, 241, 0.25)',
            boxShadow: '0 16px 40px rgba(15, 42, 82, 0.12), 0 4px 12px rgba(56, 130, 241, 0.08)',
            backdropFilter: 'blur(20px) saturate(180%)',
            position: 'relative',
            zIndex: 4,
            overflow: 'hidden',
          }}
        >
          {/* Top Holographic Glass Highlight */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              background: 'linear-gradient(90deg, #3882F1 0%, #D65890 50%, #10B981 100%)',
            }}
          />

          {/* Status Label & Active Milestone Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5, flexWrap: 'wrap', gap: 1 }}>
            <Chip
              icon={<AutoAwesomeRoundedIcon sx={{ fontSize: '13px !important', color: `${piccColors.blue[600]} !important` }} />}
              label="MỐC SỰ KIỆN GẦN NHẤT"
              size="small"
              sx={{
                bgcolor: '#DFEBFD',
                color: piccColors.blue[700],
                fontWeight: 800,
                fontSize: '0.675rem',
                letterSpacing: '0.06em',
                height: 22,
                px: 0.5,
                border: '1px solid rgba(56, 130, 241, 0.2)',
              }}
            />

            <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#67788F' }}>
              {activeMilestone?.dateStr}
            </Typography>
          </Box>

          <Typography
            sx={{
              fontSize: { xs: '1.1rem', sm: '1.25rem' },
              fontWeight: 800,
              color: '#0F2A52',
              lineHeight: 1.25,
              mb: 2,
            }}
          >
            {milestoneInfo.isAllCompleted
              ? 'Cuộc thi PICC 2026 đã diễn ra thành công!'
              : activeMilestone?.title ?? 'Sắp diễn ra'}
          </Typography>

          {/* 4 TABULAR COUNTDOWN UNITS */}
          {!milestoneInfo.isAllCompleted && (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: { xs: 1, sm: 1.25 },
                mb: 2.5,
              }}
              role="timer"
              aria-label={`Đồng hồ đếm ngược ${countdown.days} ngày ${countdown.hours} giờ ${countdown.minutes} phút ${countdown.seconds} giây`}
            >
              {[
                { val: countdown.days, label: 'Ngày' },
                { val: countdown.hours, label: 'Giờ' },
                { val: countdown.minutes, label: 'Phút' },
                { val: countdown.seconds, label: 'Giây' },
              ].map((unit, i) => (
                <Box
                  key={i}
                  sx={{
                    textAlign: 'center',
                    p: 1,
                    py: 1.25,
                    bgcolor: '#F7F9FC',
                    borderRadius: 3,
                    border: '1px solid #DFE6EF',
                    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.02)',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: '1.35rem', sm: '1.6rem' },
                      fontWeight: 900,
                      color: '#3882F1',
                      lineHeight: 1.1,
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    <motion.span
                      key={unit.val}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {String(unit.val).padStart(2, '0')}
                    </motion.span>
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '0.675rem',
                      fontWeight: 700,
                      color: '#67788F',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      mt: 0.25,
                    }}
                  >
                    {unit.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}

          {/* MINI MILESTONE ROADMAP */}
          <Box sx={{ pt: 1.5, borderTop: '1px solid #DFE6EF' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.25 }}>
              <Typography sx={{ fontSize: '0.725rem', fontWeight: 800, color: '#67788F', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Tiến trình mốc thời gian
              </Typography>
              <Link
                href="#lo-trinh"
                underline="none"
                sx={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#3882F1',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  '&:hover': { color: '#0F2A52' },
                }}
              >
                <span>Xem toàn bộ lộ trình</span>
                <ArrowForwardRoundedIcon sx={{ fontSize: 13 }} />
              </Link>
            </Box>

            {/* Mini Roadmap Timeline Bar */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', px: 0.5 }}>
              {/* Horizontal Line */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: 12,
                  right: 12,
                  height: 2,
                  bgcolor: '#DFE6EF',
                  transform: 'translateY(-50%)',
                  zIndex: 0,
                }}
              />

              {EVENT_MILESTONES.map((ms, idx) => {
                const isCompleted = idx < milestoneInfo.activeStepIndex;
                const isCurrent = idx === milestoneInfo.activeStepIndex;
                const isFinale = ms.statusType === 'final';

                return (
                  <Box
                    key={ms.id}
                    sx={{
                      position: 'relative',
                      zIndex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      sx={{
                        width: isCurrent ? 20 : 14,
                        height: isCurrent ? 20 : 14,
                        borderRadius: '50%',
                        bgcolor: isCompleted ? '#3882F1' : isCurrent ? '#059669' : '#FFFFFF',
                        border: isCompleted
                          ? '2px solid #3882F1'
                          : isCurrent
                            ? '3px solid #059669'
                            : '2px solid #C8CDD4',
                        boxShadow: isCurrent ? '0 0 0 4px rgba(5, 150, 105, 0.25)' : 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFFFFF',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {isFinale && <StarRoundedIcon sx={{ fontSize: isCurrent ? 12 : 9, color: isCurrent ? '#FFFFFF' : '#9E7A19' }} />}
                    </Box>

                    <Typography
                      sx={{
                        fontSize: '0.625rem',
                        fontWeight: isCurrent ? 800 : 600,
                        color: isCurrent ? '#0F2A52' : isCompleted ? '#3882F1' : '#67788F',
                        mt: 0.5,
                        whiteSpace: 'nowrap',
                        display: { xs: isCurrent || isFinale ? 'block' : 'none', sm: 'block' },
                      }}
                    >
                      {ms.shortTitle}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default HeroArtwork;
