import { Box } from '@mui/material';
import { motion } from 'motion/react';
import LightbulbRounded from '@mui/icons-material/LightbulbRounded';
import RocketLaunchRounded from '@mui/icons-material/RocketLaunchRounded';
import AutoAwesomeRounded from '@mui/icons-material/AutoAwesomeRounded';
import TrendingUpRounded from '@mui/icons-material/TrendingUpRounded';
import GroupsRounded from '@mui/icons-material/GroupsRounded';
import EmojiObjectsRounded from '@mui/icons-material/EmojiObjectsRounded';
import { piccColors } from '@/theme/palette';

const icons = [
  { Icon: LightbulbRounded, x: 70, y: 25, color: piccColors.yellow[300], rotate: true },
  { Icon: RocketLaunchRounded, x: 80, y: 60, color: piccColors.pink[300], scale: true },
  { Icon: AutoAwesomeRounded, x: 65, y: 40, color: piccColors.blue[300], rotate: true },
  { Icon: TrendingUpRounded, x: 85, y: 75, color: piccColors.blue[300], scale: true },
  { Icon: GroupsRounded, x: 15, y: 35, color: piccColors.green[300], translate: true },
  { Icon: EmojiObjectsRounded, x: 20, y: 70, color: piccColors.pink[200], rotate: true },
];

const particles = [
  { x: 55, y: 18, size: 6, color: piccColors.yellow[200], delay: 0 },
  { x: 90, y: 45, size: 4, color: piccColors.pink[200], delay: 1.2 },
  { x: 40, y: 80, size: 5, color: piccColors.blue[200], delay: 2.4 },
  { x: 72, y: 90, size: 4, color: piccColors.green[200], delay: 0.8 },
  { x: 30, y: 20, size: 5, color: piccColors.sky[200], delay: 3.6 },
];

export const FloatingIdeaIcons = () => (
  <>
    {icons.map(({ Icon, x, y, color, rotate, scale, translate }, i) => {
      const animate: Record<string, unknown> = {
        opacity: [0, 0.6, 0.4, 0.7, 0.3],
        y: [0, -5, 3, -2, 0],
        x: [0, 3, -2, 4, -3],
      };
      if (rotate) animate.rotate = [0, 8, -4, 6, 0];
      if (scale) animate.scale = [1, 1.12, 0.96, 1.08, 1];
      if (translate) {
        animate.y = [0, -8, 4, -6, 0];
        animate.x = [0, 5, -3, 6, -4];
      }

      return (
        <Box
          component={motion.div}
          key={i}
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={animate}
          transition={{
            duration: 6 + i * 1.5,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay: i * 0.8,
          }}
          sx={{
            position: 'absolute',
            top: `${y}%`,
            left: `${x}%`,
            zIndex: 1,
            display: { xs: 'none', md: 'block' },
            pointerEvents: 'none',
          }}
        >
          <Icon
            sx={{
              fontSize: `${28 + i * 4}px`,
              color,
              opacity: 0.5,
            }}
          />
        </Box>
      );
    })}
    {particles.map(({ x, y, size, color, delay }, i) => (
      <Box
        component={motion.div}
        key={`p-${i}`}
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{
          opacity: [0, 0.5, 0.3, 0.6, 0.2],
          scale: [0.6, 1, 0.8, 1.1, 0.7],
          y: [0, -10, 5, -8, 0],
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
          zIndex: 1,
          display: { xs: 'none', md: 'block' },
          pointerEvents: 'none',
          width: size,
          height: size,
          borderRadius: i % 2 === 0 ? '50%' : '3px',
          bgcolor: color,
          opacity: 0.5,
        }}
      />
    ))}
  </>
);
