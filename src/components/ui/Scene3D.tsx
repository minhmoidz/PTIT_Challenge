import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Box } from '@mui/material';
import type { BoxProps } from '@mui/material';

interface Scene3DProps extends BoxProps {
  children: ReactNode;
  /** Number of depth layers to create parallax effect (default: 3) */
  layers?: number;
  /** Maximum tilt angle in degrees (default: 8) */
  maxTilt?: number;
  /** Scale factor on hover (default: 1.0 - no scale) */
  scale?: number;
  /** Show depth fog effect (default: true) */
  fog?: boolean;
  /** Intensity of the parallax movement per layer (default: 10) */
  depthIntensity?: number;
}

/**
 * Scene3D - A 3D perspective wrapper that creates multi-layer depth parallax
 * and mouse-driven tilt effects for immersive 3D experiences.
 *
 * Usage:
 * <Scene3D maxTilt={12} depthIntensity={15}>
 *   <Layer depth={0}><div>Background</div></Layer>
 *   <Layer depth={1}><div>Midground</div></Layer>
 *   <Layer depth={2}><div>Foreground</div></Layer>
 * </Scene3D>
 */

interface LayerProps extends BoxProps {
  children: ReactNode;
  /** Depth level: 0=farthest, 3=closest (default: 1) */
  depth?: number;
}

export const Layer = ({ children, depth = 1, sx, ...rest }: LayerProps) => (
  <Box
    className={`scene-layer layer-depth-${depth}`}
    data-depth={depth}
    sx={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      willChange: 'transform',
      pointerEvents: 'none',
      ...(sx as Record<string, unknown>),
    }}
    {...rest}
  >
    {children}
  </Box>
);

export const Scene3D = ({
  children,
  maxTilt = 8,
  scale = 1.0,
  fog = true,
  _depthIntensity = 12,
  sx,
  ...rest
}: Scene3DProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const mouseXSpring = useMotionValue(0);
  const mouseYSpring = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 180, mass: 0.4 };

  const smoothMouseX = useSpring(mouseXSpring, springConfig);
  const smoothMouseY = useSpring(mouseYSpring, springConfig);

  // Tilt rotations
  const rotateX = useTransform(smoothMouseY, [-1, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(smoothMouseX, [-1, 1], [-maxTilt, maxTilt]);

  // Fog/blur effect for depth perception
  const fogOpacity = useTransform(
    smoothMouseX,
    [-1, -0.3, 0, 0.3, 1],
    [0.4, 0.15, 0, 0.15, 0.4]
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mx = (e.clientX - rect.left) / rect.width;
    const my = (e.clientY - rect.top) / rect.height;
    // Normalize to [-1, 1]
    mouseX.set(mx);
    mouseY.set(my);
    mouseXSpring.set(mx * 2 - 1);
    mouseYSpring.set(my * 2 - 1);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    mouseXSpring.set(0);
    mouseYSpring.set(0);
  };

  return (
    <Box
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchMove={(e) => {
        if (!ref.current || !e.touches[0]) return;
        const rect = ref.current.getBoundingClientRect();
        const mx = (e.touches[0].clientX - rect.left) / rect.width;
        const my = (e.touches[0].clientY - rect.top) / rect.height;
        mouseX.set(mx);
        mouseY.set(my);
        mouseXSpring.set(mx * 2 - 1);
        mouseYSpring.set(my * 2 - 1);
      }}
      onTouchEnd={() => {
        mouseX.set(0.5);
        mouseY.set(0.5);
        mouseXSpring.set(0);
        mouseYSpring.set(0);
      }}
      sx={{
        perspective: '1200px',
        perspectiveOrigin: '50% 50%',
        transformStyle: 'preserve-3d',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
        ...(sx as Record<string, unknown>),
      }}
      {...rest}
    >
      <motion.div
        className="scene-rotate"
        style={{
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          rotateX,
          rotateY,
          scale,
          transition: 'transform 0.3s ease',
        }}
      >
        {/* Render children with layer depth awareness */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '100%',
            transformStyle: 'preserve-3d',
            '& .scene-layer': {
              transition: 'filter 0.3s ease',
            },
            '& .layer-depth-0': {
              transform: `translateZ(-60px)`,
              filter: 'blur(0.5px)',
            },
            '& .layer-depth-1': {
              transform: `translateZ(-20px)`,
            },
            '& .layer-depth-2': {
              transform: `translateZ(20px)`,
            },
            '& .layer-depth-3': {
              transform: `translateZ(60px)`,
              filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.08))',
            },
          }}
        >
          {/* Apply per-layer mouse-driven transforms */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              transformStyle: 'preserve-3d',
              '& .layer-depth-0': {
                transform: `translateZ(-60px)`,
              },
              '& .layer-depth-1': {
                transform: `translateZ(-20px)`,
              },
              '& .layer-depth-2': {
                transform: `translateZ(20px)`,
              },
              '& .layer-depth-3': {
                transform: `translateZ(60px)`,
              },
            }}
          >
            {children}
          </Box>
        </Box>
      </motion.div>

      {/* Depth fog overlay */}
      {fog && (
        <motion.div
          style={{
            position: 'absolute',
            inset: '-20%',
            borderRadius: '50%',
            background: `radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(23, 59, 102, 0.06) 100%)`,
            opacity: fogOpacity,
            pointerEvents: 'none',
            zIndex: 20,
            mixBlendMode: 'multiply',
          }}
        />
      )}
    </Box>
  );
};

export default Scene3D;

