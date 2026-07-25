import { motionTokens } from './tokens';

export const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: motionTokens.easingStandard },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: motionTokens.easingStandard },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
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
    transition: { duration: 0.2, ease: motionTokens.easingStandard },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: motionTokens.easingBounce },
  },
};

export const scrollReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: motionTokens.easingStandard },
  },
};

export const staggerGrid = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: motionTokens.easingStandard },
  },
};

export const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: motionTokens.easingStandard },
  },
};

export const zoomIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: motionTokens.easingBounce },
  },
};
