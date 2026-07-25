import { useRef, useCallback } from 'react';
import { Box } from '@mui/material';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import LightbulbRounded from '@mui/icons-material/LightbulbRounded';
import RocketLaunchRounded from '@mui/icons-material/RocketLaunchRounded';
import AutoAwesomeRounded from '@mui/icons-material/AutoAwesomeRounded';
import TrendingUpRounded from '@mui/icons-material/TrendingUpRounded';
import GroupsRounded from '@mui/icons-material/GroupsRounded';
import EmojiObjectsRounded from '@mui/icons-material/EmojiObjectsRounded';
import { piccColors } from '@/theme/palette';

interface Icon3DConfig {
  Icon: React.ElementType;
  x: number;
  y: number;
  color: string;
  /** Depth layer: 0=far, 1=mid, 2=near (default: 1) */
  depth?: number;
  /** Additional rotation animation */
  rotate?: boolean;
  /** Additional scale animation */
  scale?: boolean;
  /** Additional translate animation */
  translate?: boolean;
  /** Size multiplier */
  size?: number;
}

const icons: Icon3DConfig[] = [
  { Icon: LightbulbRounded, x: 70, y: 25, color: piccColors.yellow[300], depth: 1, rotate: true, size: 1.0 },
  { Icon: RocketLaunchRounded, x: 80, y: 60, color: piccColors.pink[300], depth: 2, scale: true, size: 1.1 },
  { Icon: AutoAwesomeRounded, x: 65, y: 40, color: piccColors.blue[300], depth: 0, rotate: true, size: 0.9 },
  { Icon: TrendingUpRounded, x: 85, y: 75, color: piccColors.blue[300], depth: 2, scale: true, size: 1.0 },
  { Icon: GroupsRounded, x: 15, y: 35, color: piccColors.emerald[300], depth: 1, translate: true, size: 1.1 },
  { Icon: EmojiObjectsRounded, x: 20, y: 70, color: piccColors.pink[200], depth: 2, rotate: true, size: 0.9 },
];

const particles = [
  { x: 55, y: 18, size: 7, color: piccColors.yellow[200], delay: 0, depth: 0 },
  { x: 90, y: 45, size: 5, color: piccColors.pink[200], delay: 1.2, depth: 2 },
  { x: 40, y: 80, size: 6, color: piccColors.blue[200], delay: 2.4, depth: 1 },
  { x: 72, y: 90, size: 5, color: piccColors.emerald[300], delay: 0.8, depth: 2 },
  { x: 30, y: 20, size: 6, color: piccColors.sky[200], delay: 3.6, depth: 0 },
];

const FloatIcon = ({ config }: { config: Icon3DConfig }) => {
  const { Icon, x, y, color, depth = 1, rotate, scale, translate, size = 1 } = config;

  const animate: Record<string, unknown> = {};
  const floatY = [0, -6 * (depth + 1) * 0.4, 0];
  const floatX = [0, 3 + depth * 1.5, -2 - depth, 4 + depth, -3 - depth * 0.5];

  if (rotate) {
    animate.rotate = [0, 10 + depth * 3, -6 - depth * 2, 8 + depth, 0];
  }
  if (scale) {
    animate.scale = [1, 1.15 + depth * 0.05, 0.94 - depth * 0.02, 1.1 + depth * 0.03, 1];
  }
  if (translate) {
    animate.y = floatY;
    animate.x = floatX;
  } else {
    animate.y = floatY;
  }

  // Depth-based effects
  const opacity = depth === 0 ? 0.35 : depth === 1 ? 0.5 : 0.65;
  const baseSize = 28 + depth * 4;
  const zOffset = depth === 0 ? -30 : depth === 1 ? 0 : 30;
  const blurAmount = depth === 0 ? 'blur(0.5px)' : 'none';

  return (
    <Box
      component={motion.div as React.ElementType}
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={animate}
      transition={{
        duration: 7 + depth * 1.5,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
        delay: depth * 0.5,
      }}
      sx={{
        position: 'absolute',
        top: `${y}%`,
        left: `${x}%`,
        zIndex: 1,
        display: { xs: 'none', md: 'block' },
        pointerEvents: 'none',
        transformStyle: 'preserve-3d',
        transform: `translateZ(${zOffset}px)`,
        filter: blurAmount,
      }}
    >
      <Icon
        sx={{
          fontSize: `${baseSize * size}px`,
          color,
          opacity,
          filter: `drop-shadow(0 2px 8px ${color}40)`,
        }}
      />
    </Box>
  );
};

export const FloatingIdeaIcons = () => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [mouseX, mouseY]);

  const smoothX = useSpring(mouseX, { damping: 30, stiffness: 120, mass: 0.5 });
  const smoothY = useSpring(mouseY, { damping: 30, stiffness: 120, mass: 0.5 });

  // Depth-based parallax groups
  const farMoveX = useTransform(smoothX, [0, 1], [-6, 6]);
  const farMoveY = useTransform(smoothY, [0, 1], [-6, 6]);
  const midMoveX = useTransform(smoothX, [0, 1], [-12, 12]);
  const midMoveY = useTransform(smoothY, [0, 1], [-12, 12]);
  const nearMoveX = useTransform(smoothX, [0, 1], [-20, 20]);
  const nearMoveY = useTransform(smoothY, [0, 1], [-20, 20]);

  const farSpringX = useSpring(farMoveX, { damping: 20, stiffness: 60 });
  const farSpringY = useSpring(farMoveY, { damping: 20, stiffness: 60 });
  const midSpringX = useSpring(midMoveX, { damping: 20, stiffness: 60 });
  const midSpringY = useSpring(midMoveY, { damping: 20, stiffness: 60 });
  const nearSpringX = useSpring(nearMoveX, { damping: 20, stiffness: 60 });
  const nearSpringY = useSpring(nearMoveY, { damping: 20, stiffness: 60 });

  return (
    <Box
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      sx={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 1,
        perspective: '800px',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Background particles group - depth 0 (far) */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          x: farSpringX,
          y: farSpringY,
        }}
      >
        {particles.filter(p => p.depth === 0).map(({ x, y, size, color, delay }, i) => (
          <Box
            component={motion.div as React.ElementType}
            key={`p-far-${i}`}
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: [0, 0.3, 0.15, 0.35, 0.1],
              scale: [0.5, 0.9, 0.7, 1, 0.6],
              y: [0, -8, 3, -6, 0],
            }}
            transition={{
              duration: 8 + i * 1.5,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
              delay,
            }}
            sx={{
              position: 'absolute',
              top: `${y}%`,
              left: `${x}%`,
              width: size,
              height: size,
              borderRadius: i % 2 === 0 ? '50%' : '3px',
              bgcolor: color,
              opacity: 0.3,
              filter: 'blur(1px)',
              transform: 'translateZ(-40px)',
            }}
          />
        ))}
      </motion.div>

      {/* Mid-depth icons - depth 1 (mid) */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          x: midSpringX,
          y: midSpringY,
        }}
      >
        {icons.filter(c => c.depth === 1).map((config, i) => (
          <FloatIcon key={`icon-mid-${i}`} config={config} />
        ))}
      </motion.div>

      {/* Foreground icons - depth 2 (near) */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          x: nearSpringX,
          y: nearSpringY,
        }}
      >
        {icons.filter(c => c.depth === 2).map((config, i) => (
          <FloatIcon key={`icon-near-${i}`} config={config} />
        ))}
      </motion.div>

      {/* Far-depth icons - depth 0 (far) */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          x: farSpringX,
          y: farSpringY,
        }}
      >
        {icons.filter(c => c.depth === 0).map((config, i) => (
          <FloatIcon key={`icon-far-${i}`} config={config} />
        ))}
      </motion.div>

      {/* Foreground particles */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          x: nearSpringX,
          y: nearSpringY,
        }}
      >
        {particles.filter(p => p.depth === 2).map(({ x, y, size, color, delay }, i) => (
          <Box
            component={motion.div as React.ElementType}
            key={`p-near-${i}`}
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{
              opacity: [0, 0.5, 0.3, 0.6, 0.2],
              scale: [0.6, 1.1, 0.8, 1.2, 0.7],
              y: [0, -12, 5, -10, 0],
            }}
            transition={{
              duration: 6 + i * 1.2,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
              delay,
            }}
            sx={{
              position: 'absolute',
              top: `${y}%`,
              left: `${x}%`,
              width: size + 2,
              height: size + 2,
              borderRadius: '50%',
              bgcolor: color,
              opacity: 0.5,
              boxShadow: `0 0 10px ${color}60`,
              transform: 'translateZ(40px)',
            }}
          />
        ))}
      </motion.div>

      {/* Mid-depth particles */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          x: midSpringX,
          y: midSpringY,
        }}
      >
        {particles.filter(p => p.depth === 1).map(({ x, y, size, color, delay }, i) => (
          <Box
            component={motion.div as React.ElementType}
            key={`p-mid-${i}`}
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{
              opacity: [0, 0.4, 0.2, 0.45, 0.15],
              scale: [0.6, 1, 0.8, 1.05, 0.7],
              y: [0, -10, 4, -8, 0],
            }}
            transition={{
              duration: 7 + i * 1.2,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
              delay,
            }}
            sx={{
              position: 'absolute',
              top: `${y}%`,
              left: `${x}%`,
              width: size,
              height: size,
              borderRadius: '50%',
              bgcolor: color,
              opacity: 0.4,
            }}
          />
        ))}
      </motion.div>
    </Box>
  );
};

