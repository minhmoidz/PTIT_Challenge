import { useRef, useMemo, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Box } from '@mui/material';
import { piccColors } from '@/theme/palette';

interface CloudPuff {
  id: number;
  /** Center X position (%) */
  cx: number;
  /** Center Y position (%) */
  cy: number;
  /** Width of the puff (px) */
  width: number;
  /** Height of the puff (px) */
  height: number;
  /** Depth layer: 0=far, 1=mid, 2=near, 3=closest */
  depth: number;
  /** Color with alpha */
  color: string;
  /** Border radius shape variation */
  shape: number[];
  /** Float animation offset */
  floatOffset: number;
  /** Float animation speed multiplier */
  floatSpeed: number;
  /** Initial rotation */
  rotate: number;
  /** Blur for depth perception */
  blur: number;
  /** Opacity */
  opacity: number;
}

interface Cloud3DProps {
  /** Number of cloud puffs (default: 20) */
  count?: number;
  /** Show on mobile (default: false) */
  mobile?: boolean;
  /** Color scheme: 'sky' | 'blue' | 'pink' (default: 'sky') */
  colorScheme?: 'sky' | 'blue' | 'pink';
}

const COLOR_SCHEMES: Record<string, { colors: string[]; bgColors: string[] }> = {
  sky: {
    colors: [
      piccColors.sky[100],
      piccColors.sky[200],
      piccColors.sky[300],
      piccColors.blue[100],
      piccColors.blue[200],
    ],
    bgColors: [
      piccColors.sky[50],
      piccColors.sky[100],
      piccColors.blue[50],
      '#FFFFFF',
    ],
  },
  blue: {
    colors: [
      piccColors.blue[100],
      piccColors.blue[200],
      piccColors.blue[300],
      piccColors.indigo[100],
      piccColors.indigo[200],
    ],
    bgColors: [
      piccColors.blue[50],
      piccColors.indigo[50],
      piccColors.sky[50],
      '#FFFFFF',
    ],
  },
  pink: {
    colors: [
      piccColors.pink[100],
      piccColors.pink[200],
      piccColors.pink[300],
      piccColors.blue[100],
      '#FFFFFF',
    ],
    bgColors: [
      piccColors.pink[50],
      piccColors.sky[50],
      '#FFFFFF',
    ],
  },
};

const generateClouds = (count: number, scheme: string): CloudPuff[] => {
  const schemeColors = COLOR_SCHEMES[scheme] ?? COLOR_SCHEMES['sky'];
  const colors = schemeColors.colors;
  const puffs: CloudPuff[] = [];
  const attemptsPerPuff = 10;

  for (let i = 0; i < count; i++) {
    const depth = (i % 4) as 0 | 1 | 2 | 3;
    let cx = Math.random() * 100;
    let cy = Math.random() * 100;

    // Cluster some puffs together to form cloud-like shapes
    if (i > 0 && Math.random() > 0.4) {
      const ref = puffs[Math.max(0, i - 1 - Math.floor(Math.random() * 3))];
      if (ref) {
        for (let a = 0; a < attemptsPerPuff; a++) {
          const testCx = ref.cx + (Math.random() - 0.5) * 18;
          const testCy = ref.cy + (Math.random() - 0.5) * 12;
          if (testCx >= 0 && testCx <= 100 && testCy >= 0 && testCy <= 100) {
            cx = testCx;
            cy = testCy;
            break;
          }
        }
      }
    }

    const baseWidth = 40 + Math.random() * 120;
    const baseHeight = 20 + Math.random() * 60;
    const depthScale = 1 + depth * 0.4;

    puffs.push({
      id: i,
      cx,
      cy,
      width: baseWidth * depthScale,
      height: baseHeight * depthScale,
      depth,
      color: colors[i % colors.length] ?? '#FFFFFF',
      shape: [
        30 + Math.random() * 40,
        20 + Math.random() * 30,
        40 + Math.random() * 30,
        25 + Math.random() * 35,
      ],
      floatOffset: Math.random() * 100,
      floatSpeed: 0.6 + Math.random() * 0.8 + depth * 0.2,
      rotate: (Math.random() - 0.5) * 6,
      blur: depth === 0 ? 3 : depth === 1 ? 1.5 : depth === 2 ? 0.5 : 0,
      opacity:
        depth === 0
          ? 0.15 + Math.random() * 0.15
          : depth === 1
            ? 0.2 + Math.random() * 0.2
            : depth === 2
              ? 0.25 + Math.random() * 0.25
              : 0.15 + Math.random() * 0.2,
    });
  }
  return puffs;
};

export const Cloud3D = ({
  count = 24,
  mobile = false,
  colorScheme = 'sky',
}: Cloud3DProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const clouds = useMemo(() => generateClouds(count, colorScheme), [count, colorScheme]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [mouseX, mouseY]);

  const smoothX = useSpring(mouseX, { damping: 30, stiffness: 80, mass: 0.6 });
  const smoothY = useSpring(mouseY, { damping: 30, stiffness: 80, mass: 0.6 });

  // Depth-based parallax groups
  const farX = useTransform(smoothX, [0, 1], [-5, 5]);
  const farY = useTransform(smoothY, [0, 1], [-5, 5]);
  const midX = useTransform(smoothX, [0, 1], [-12, 12]);
  const midY = useTransform(smoothY, [0, 1], [-12, 12]);
  const nearX = useTransform(smoothX, [0, 1], [-22, 22]);
  const nearY = useTransform(smoothY, [0, 1], [-22, 22]);
  const closestX = useTransform(smoothX, [0, 1], [-35, 35]);
  const closestY = useTransform(smoothY, [0, 1], [-35, 35]);

  const parallaxGroups = [
    { depth: 0, springX: useSpring(farX, { damping: 20, stiffness: 50 }), springY: useSpring(farY, { damping: 20, stiffness: 50 }) },
    { depth: 1, springX: useSpring(midX, { damping: 20, stiffness: 50 }), springY: useSpring(midY, { damping: 20, stiffness: 50 }) },
    { depth: 2, springX: useSpring(nearX, { damping: 20, stiffness: 50 }), springY: useSpring(nearY, { damping: 20, stiffness: 50 }) },
    { depth: 3, springX: useSpring(closestX, { damping: 20, stiffness: 50 }), springY: useSpring(closestY, { damping: 20, stiffness: 50 }) },
  ];

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
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        display: { xs: mobile ? 'block' : 'none', md: 'block' },
      }}
    >
      {parallaxGroups.map((group) => (
        <motion.div
          key={group.depth}
          style={{
            position: 'absolute',
            inset: 0,
            x: group.springX,
            y: group.springY,
          }}
        >
          {clouds
            .filter((c) => c.depth === group.depth)
            .map((puff) => (
              <CloudPuffItem key={puff.id} puff={puff} />
            ))}
        </motion.div>
      ))}
    </Box>
  );
};

interface CloudPuffItemProps {
  puff: CloudPuff;
}

const CloudPuffItem = ({ puff }: CloudPuffItemProps) => {
  return (
    <Box
      component={motion.div as React.ElementType}
      aria-hidden="true"
      animate={{
        y: [0, -6 - puff.depth * 4, 0],
        x: [0, (puff.id % 2 === 0 ? 1 : -1) * (2 + puff.depth * 2), 0],
        scale: [1, 1 + puff.depth * 0.03, 1],
      }}
      transition={{
        duration: 8 / puff.floatSpeed + puff.floatOffset * 0.02,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: puff.floatOffset * 0.05,
      }}
      sx={{
        position: 'absolute',
        left: `${puff.cx}%`,
        top: `${puff.cy}%`,
        width: puff.width,
        height: puff.height,
        borderRadius: `${puff.shape[0]}% ${puff.shape[1]}% ${puff.shape[2]}% ${puff.shape[3]}% / ${puff.shape[1]}% ${puff.shape[0]}% ${puff.shape[3]}% ${puff.shape[2]}%`,
        background: `radial-gradient(ellipse at 30% 40%, ${puff.color}CC, ${puff.color}40 70%, transparent)`,
        opacity: puff.opacity,
        filter: puff.blur > 0 ? `blur(${puff.blur}px)` : undefined,
        transform: `translate(-50%, -50%) rotate(${puff.rotate}deg)`,
        boxShadow: puff.depth >= 2
          ? `0 4px 20px ${puff.color}30`
          : undefined,
        willChange: 'transform',
      }}
    />
  );
};

export default Cloud3D;

