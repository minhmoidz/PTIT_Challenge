import { useMemo, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Box } from '@mui/material';

interface Particle {
  id: number;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  size: number; // px
  depth: number; // 0=far, 1=mid, 2=near
  color: string;
  opacity: number;
  blur: number;
  driftX: number;
  driftY: number;
  floatDuration: number;
  floatDelay: number;
}

interface ParticleFieldProps {
  /** Number of particles (default: 30) */
  count?: number;
  /** Mouse interaction intensity (default: 1) */
  intensity?: number;
  /** Colors array for particles (default: PICC palette) */
  colors?: string[];
  /** Show on mobile (default: false) */
  mobile?: boolean;
}

const DEFAULT_COLORS = [
  'rgba(56, 130, 241, 0.6)',  // PICC blue
  'rgba(214, 88, 144, 0.5)',  // PICC pink
  'rgba(253, 209, 102, 0.5)', // PICC yellow
  'rgba(56, 130, 241, 0.3)',  // light blue
  'rgba(214, 88, 144, 0.3)',  // light pink
  'rgba(165, 180, 252, 0.4)', // indigo
];

const generateParticles = (count: number, colors: string[]): Particle[] =>
  Array.from({ length: count }, (_, i) => {
    const depth = (i % 3) as 0 | 1 | 2;
    const baseSize = depth === 0 ? 2 : depth === 1 ? 4 : 6;
    const sizeVariation = Math.random() * (depth === 0 ? 2 : depth === 1 ? 3 : 5);
    return {
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: baseSize + sizeVariation,
      depth,
      color: colors[i % colors.length] ?? DEFAULT_COLORS[0],
      opacity: depth === 0 ? 0.15 + Math.random() * 0.2 : depth === 1 ? 0.2 + Math.random() * 0.3 : 0.3 + Math.random() * 0.4,
      blur: depth === 0 ? 1.5 : depth === 1 ? 0.5 : 0,
      driftX: (Math.random() - 0.5) * 4,
      driftY: (Math.random() - 0.5) * 4,
      floatDuration: 4 + Math.random() * 6,
      floatDelay: Math.random() * 5,
    };
  });

export const ParticleField = ({
  count = 30,
  intensity = 1,
  colors = DEFAULT_COLORS,
  mobile = false,
}: ParticleFieldProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const particles = useMemo(() => generateParticles(count, colors), [count, colors]);

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
        zIndex: 0,
        display: { xs: mobile ? 'block' : 'none', md: 'block' },
      }}
    >
      {particles.map((particle) => (
        <ParticleItem
          key={particle.id}
          particle={particle}
          mouseX={mouseX}
          mouseY={mouseY}
          intensity={intensity}
        />
      ))}
    </Box>
  );
};

interface ParticleItemProps {
  particle: Particle;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
  intensity: number;
}

const ParticleItem = ({ particle, mouseX, mouseY, intensity }: ParticleItemProps) => {
  const springConfig = { damping: 15, stiffness: 60, mass: 0.3 };

  const depthFactor = particle.depth === 0 ? 0.3 : particle.depth === 1 ? 0.6 : 1.2;

  const targetOffsetX = useTransform(mouseX, [0, 1], [
    -particle.driftX * depthFactor * intensity,
    particle.driftX * depthFactor * intensity,
  ]);
  const targetOffsetY = useTransform(mouseY, [0, 1], [
    -particle.driftY * depthFactor * intensity,
    particle.driftY * depthFactor * intensity,
  ]);

  const offsetX = useSpring(targetOffsetX, springConfig);
  const offsetY = useSpring(targetOffsetY, springConfig);

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: `${particle.x}%`,
        top: `${particle.y}%`,
        width: particle.size,
        height: particle.size,
        borderRadius: '50%',
        backgroundColor: particle.color,
        opacity: particle.opacity,
        filter: particle.blur > 0 ? `blur(${particle.blur}px)` : undefined,
        x: offsetX,
        y: offsetY,
        transform: `translate(-50%, -50%)`,
      }}
      animate={{
        y: [0, -8 * (particle.depth + 1) * 0.5, 0],
        scale: [1, 1 + particle.depth * 0.1, 1],
      }}
      transition={{
        duration: particle.floatDuration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: particle.floatDelay,
      }}
    />
  );
};

export default ParticleField;

