import { useState, useRef, ReactNode, MouseEvent } from 'react';
import { Box } from '@mui/material';
import { motion, useSpring } from 'motion/react';

interface Props {
  children: ReactNode;
  maxTilt?: number;
  scale?: number;
  perspective?: number;
  className?: string;
  sx?: object;
}

export const Tilt3DCard = ({
  children,
  maxTilt = 15,
  scale = 1.04,
  perspective = 1000,
  sx = {},
}: Props) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const rotateXSpring = useSpring(0, { stiffness: 300, damping: 20 });
  const rotateYSpring = useSpring(0, { stiffness: 300, damping: 20 });
  const scaleSpring = useSpring(1, { stiffness: 300, damping: 20 });

  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rotateXValue = ((mouseY - height / 2) / (height / 2)) * -maxTilt;
    const rotateYValue = ((mouseX - width / 2) / (width / 2)) * maxTilt;

    rotateXSpring.set(rotateXValue);
    rotateYSpring.set(rotateYValue);
    scaleSpring.set(scale);

    setGlarePos({
      x: (mouseX / width) * 100,
      y: (mouseY / height) * 100,
      opacity: 0.35,
    });
  };

  const handleMouseLeave = () => {
    rotateXSpring.set(0);
    rotateYSpring.set(0);
    scaleSpring.set(1);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <Box
      ref={cardRef}
      component={motion.div}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: `${perspective}px`,
        transformStyle: 'preserve-3d',
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        scale: scaleSpring,
      }}
      sx={{
        position: 'relative',
        cursor: 'pointer',
        willChange: 'transform',
        ...sx,
      }}
    >
      {children}

      {/* 3D Dynamic Glare Shimmer Layer */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          pointerEvents: 'none',
          zIndex: 10,
          transition: 'opacity 0.2s ease',
          opacity: glarePos.opacity,
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0) 70%)`,
        }}
      />
    </Box>
  );
};
