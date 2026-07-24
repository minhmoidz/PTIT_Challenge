import { motionTokens } from './tokens';

export const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: motionTokens.normal, ease: motionTokens.easingStandard },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: motionTokens.normal, ease: motionTokens.easingStandard },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

export const cardHover = {
  rest: {
    y: 0,
    scale: 1,
    boxShadow: 'inset -2px -2px 8px rgba(255,255,255,0.6), 8px 8px 24px rgba(23,59,102,0.1)',
  },
  hover: {
    y: -6,
    scale: 1.02,
    boxShadow: 'inset -2px -2px 8px rgba(255,255,255,0.6), 12px 12px 32px rgba(23,59,102,0.18)',
    transition: { duration: motionTokens.hoverFast, ease: motionTokens.easingStandard },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: motionTokens.normal, ease: motionTokens.easingBounce },
  },
};

export const scrollReveal = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: motionTokens.scrollReveal, ease: motionTokens.easingStandard },
  },
};

export const staggerGrid = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};
