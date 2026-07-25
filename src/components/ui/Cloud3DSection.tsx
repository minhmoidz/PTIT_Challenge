import { useRef, useMemo } from 'react';
import { Box } from '@mui/material';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { piccColors } from '@/theme/palette';

interface CloudCluster {
  id: number;
  x: number; // percentage
  y: number; // percentage
  scale: number;
  speed: number;
  depth: number; // 0=far, 1=mid, 2=near
  puffs: Array<{
    offsetX: number;
    offsetY: number;
    size: number;
    opacity: number;
  }>;
}

interface Cloud3DSectionProps {
  density?: 'sparse' | 'normal' | 'dense';
  colorTheme?: 'sky' | 'blue' | 'indigo';
  opacityMultiplier?: number;
}

const generateClusters = (count: number): CloudCluster[] => {
  const clusters: CloudCluster[] = [];

  for (let i = 0; i < count; i++) {
    const depth = i % 3;
    const baseScale = depth === 0 ? 0.7 : depth === 1 ? 1.0 : 1.35;
    const speed = 0.5 + depth * 0.3;

    // Generate 4-7 overlapping puffs per cluster to form a soft fluffy volumetric cloud
    const puffCount = 5 + (i % 3);
    const puffs = [];
    for (let p = 0; p < puffCount; p++) {
      puffs.push({
        offsetX: (p - puffCount / 2) * 22 + (p % 2 === 0 ? 8 : -8),
        offsetY: Math.sin(p * 1.5) * 14 - (p % 3 === 0 ? 10 : 0),
        size: 70 + (p % 4) * 25,
        opacity: 0.18 + (depth * 0.08) - (p % 2) * 0.04,
      });
    }

    clusters.push({
      id: i,
      x: 10 + (i * 85) / count + ((i * 17) % 15) - 5,
      y: 15 + ((i * 37) % 65),
      scale: baseScale,
      speed,
      depth,
      puffs,
    });
  }

  return clusters;
};

export const Cloud3DSection = ({
  density = 'normal',
  colorTheme = 'sky',
  opacityMultiplier = 1,
}: Cloud3DSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const count = density === 'sparse' ? 3 : density === 'dense' ? 7 : 5;
  const clusters = useMemo(() => generateClusters(count), [count]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const smoothX = useSpring(mouseX, { damping: 30, stiffness: 90, mass: 0.5 });
  const smoothY = useSpring(mouseY, { damping: 30, stiffness: 90, mass: 0.5 });

  const moveXFar = useTransform(smoothX, [0, 1], [-12, 12]);
  const moveYFar = useTransform(smoothY, [0, 1], [-8, 8]);
  const moveXNear = useTransform(smoothX, [0, 1], [-30, 30]);
  const moveYNear = useTransform(smoothY, [0, 1], [-20, 20]);

  const cloudColor =
    colorTheme === 'blue'
      ? piccColors.blue[200]
      : colorTheme === 'indigo'
        ? piccColors.indigo[200]
        : piccColors.sky[200];

  return (
    <Box
      ref={containerRef}
      onMouseMove={handleMouseMove}
      sx={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {clusters.map((cluster) => {
        const moveX = cluster.depth === 2 ? moveXNear : moveXFar;
        const moveY = cluster.depth === 2 ? moveYNear : moveYFar;
        const floatDuration = 14 / cluster.speed;
        const driftDistance = (cluster.id % 2 === 0 ? 1 : -1) * (18 + cluster.depth * 8);

        return (
          <motion.div
            key={cluster.id}
            style={{
              position: 'absolute',
              top: `${cluster.y}%`,
              left: `${cluster.x}%`,
              x: moveX,
              y: moveY,
            }}
          >
            <Box
              component={motion.div as React.ElementType}
              animate={{
                x: [0, driftDistance, 0],
                y: [0, -10, 0],
                scale: [cluster.scale, cluster.scale * 1.05, cluster.scale],
              }}
              transition={{
                duration: floatDuration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: cluster.id * 1.2,
              }}
              sx={{
                position: 'relative',
                width: 1,
                height: 1,
                filter: cluster.depth === 0 ? 'blur(8px)' : cluster.depth === 1 ? 'blur(4px)' : 'none',
                opacity: opacityMultiplier,
              }}
            >
              {cluster.puffs.map((puff, pIdx) => (
                <Box
                  key={pIdx}
                  sx={{
                    position: 'absolute',
                    left: puff.offsetX,
                    top: puff.offsetY,
                    width: puff.size,
                    height: puff.size * 0.65,
                    borderRadius: '50%',
                    background: `radial-gradient(ellipse at 40% 40%, #FFFFFF 30%, ${cloudColor}80 80%, transparent 100%)`,
                    opacity: puff.opacity,
                    boxShadow: `0 8px 30px ${cloudColor}40`,
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              ))}
            </Box>
          </motion.div>
        );
      })}
    </Box>
  );
};

export default Cloud3DSection;
