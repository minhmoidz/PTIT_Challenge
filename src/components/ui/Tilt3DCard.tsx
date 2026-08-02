import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Box, useMediaQuery } from '@mui/material';
import type { BoxProps } from '@mui/material';

interface Tilt3DCardProps extends BoxProps {
  children: ReactNode;
  /** Maximum tilt angle in degrees (default: 10) */
  maxTilt?: number;
  /** Scale on hover (default: 1.02) */
  scale?: number;
  /** Glare/highlight color (default: rgba(255,255,255,0.15)) */
  glareColor?: string;
  /** Enable shimmer effect (default: true) */
  shimmer?: boolean;
  /** Enable depth shadow (default: true) */
  depthShadow?: boolean;
  /** Enable border glow highlight (default: true) */
  borderGlow?: boolean;
  /** Glow border color (default: primary blue) */
  borderGlowColor?: string;
  /** Enable the expensive pointer-following treatment on intentional focal cards only. */
  interactive?: boolean;
}

export const Tilt3DCard = ({
  children,
  maxTilt = 10,
  scale = 1.02,
  glareColor = 'rgba(255,255,255,0.15)',
  shimmer = true,
  depthShadow = true,
  borderGlow = true,
  borderGlowColor = 'rgba(225, 20, 20, 0.24)',
  interactive = false,
  sx,
  ...rest
}: Tilt3DCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const canHover = useMediaQuery('(hover: hover) and (pointer: fine)');
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const enableTilt = interactive && canHover && !prefersReducedMotion;
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const hoverIntensity = useMotionValue(0);

  // Smoother spring config for more organic feel
  const springConfig = { damping: 22, stiffness: 240, mass: 0.4 };
  const shineSpringConfig = { damping: 18, stiffness: 120, mass: 0.3 };

  // Core tilt rotations
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [maxTilt, -maxTilt]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-maxTilt, maxTilt]), springConfig);

  // Glare effect (follows mouse)
  const glareOpacity = useSpring(useTransform(mouseX, [-1, 1], [0, 0.6]), shineSpringConfig);
  const glarePosX = useSpring(useTransform(mouseX, [-1, 1], [0, 100]), springConfig);
  const glarePosY = useSpring(useTransform(mouseY, [-1, 1], [0, 100]), springConfig);

  // Depth shadow effect (moves opposite to tilt)
  const shadowX = useSpring(useTransform(x, [-0.5, 0.5], [4, -4]), springConfig);
  const shadowY = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), springConfig);
  const shadowBlur = useSpring(useTransform(hoverIntensity, [0, 1], [8, 20]), springConfig);
  const shadowOpacity = useSpring(useTransform(hoverIntensity, [0, 1], [0.08, 0.18]), springConfig);

  // Border glow position
  const borderGlowX = useSpring(useTransform(mouseX, [-1, 1], [0, 100]), springConfig);
  const borderGlowY = useSpring(useTransform(mouseY, [-1, 1], [0, 100]), springConfig);
  const borderGlowOpacity = useSpring(useTransform(hoverIntensity, [0, 1], [0, 0.8]), shineSpringConfig);
  const borderGlowSpreadVal = useSpring(useTransform(hoverIntensity, [0, 1], [0, 6]), shineSpringConfig);
  // Convert spread to string for gradient
  const borderGlowBackground = useTransform(
    [borderGlowX, borderGlowY, borderGlowSpreadVal] as const,
    ([gx, gy, spread]: number[]) =>
      `radial-gradient(circle at ${gx}% ${gy}%, ${borderGlowColor}, transparent ${60 + (spread ?? 0)}%)`
  );

  // Shimmer sweep position (background position uses string)
  const shimmerXBase = useSpring(useTransform(mouseX, [-1, 1], [-50, 150]), shineSpringConfig);
  const shimmerX = useTransform(shimmerXBase, (val) => `${val}%`);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mx = (e.clientX - rect.left) / rect.width;
    const my = (e.clientY - rect.top) / rect.height;
    x.set(mx - 0.5);
    y.set(my - 0.5);
    mouseX.set(mx * 2 - 1);
    mouseY.set(my * 2 - 1);
    hoverIntensity.set(1);
  };

  const handleMouseEnter = () => {
    hoverIntensity.set(1);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    mouseX.set(0);
    mouseY.set(0);
    hoverIntensity.set(0);
  };

  return (
    <Box
      ref={ref}
      onMouseMove={enableTilt ? handleMouseMove : undefined}
      onMouseEnter={enableTilt ? handleMouseEnter : undefined}
      onMouseLeave={enableTilt ? handleMouseLeave : undefined}
      sx={{
        perspective: '1200px',
        transformStyle: 'preserve-3d',
        position: 'relative',
        overflow: 'visible',
        cursor: enableTilt ? 'pointer' : 'inherit',
        borderRadius: 3,
        ...(enableTilt && {
          '&:hover': {
            '& .tilt-content': {
              transform: `scale(${scale})`,
            },
          },
        }),
        ...(sx as Record<string, unknown>),
      }}
      {...rest}
    >
      {/* Depth shadow (behind card) */}
      {enableTilt && depthShadow && (
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            background: `rgba(15, 42, 82, 0.08)`,
            x: shadowX,
            y: shadowY,
            filter: `blur(${shadowBlur}px)`,
            opacity: shadowOpacity,
            zIndex: -1,
          }}
        />
      )}

      {/* Main content */}
      <motion.div
        className="tilt-content"
        style={{
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          rotateX: enableTilt ? rotateX : 0,
          rotateY: enableTilt ? rotateY : 0,
          transition: 'transform 0.15s ease',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {children}
      </motion.div>

      {/* Border glow highlight */}
      {enableTilt && borderGlow && (
        <motion.div
          style={{
            position: 'absolute',
            inset: -2,
            borderRadius: 'inherit',
            padding: '2px',
            background: borderGlowBackground,
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            opacity: borderGlowOpacity,
            pointerEvents: 'none',
            zIndex: 11,
          }}
        />
      )}

      {/* Radial glare (follows mouse) */}
      {enableTilt && (
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            background: `radial-gradient(circle at ${glarePosX}% ${glarePosY}%, ${glareColor}, transparent 70%)`,
            opacity: glareOpacity,
            pointerEvents: 'none',
            zIndex: 12,
          }}
        />
      )}

      {/* Shimmer sweep effect */}
      {enableTilt && shimmer && (
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            background: `linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.08) 55%, transparent 70%)`,
            backgroundSize: '200% 100%',
            backgroundPositionX: shimmerX,
            opacity: 0.6,
            pointerEvents: 'none',
            zIndex: 13,
            mixBlendMode: 'overlay',
          }}
        />
      )}
    </Box>
  );
};

