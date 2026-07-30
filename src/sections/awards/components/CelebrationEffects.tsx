import { useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';

interface CelebrationEffectsProps {
  sectionRef: React.RefObject<HTMLElement | null>;
}

export const CelebrationEffects = ({ sectionRef }: CelebrationEffectsProps) => {
  const hasEnteredRef = useRef(false);

  // Initial Entrance Celebration (Large confetti burst & gentle falling flakes)
  const runInitialCelebration = useCallback(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const isMobile = window.innerWidth < 768;
    const colors = ['#F5A623', '#15375F', '#367BEA', '#74839A', '#C96825', '#FFFFFF', '#93C5FD'];

    // Stage 1: Left & Right bursts towards Champion card center
    confetti({
      particleCount: isMobile ? 30 : 65,
      angle: 60,
      spread: 55,
      origin: { x: 0.15, y: 0.6 },
      colors,
      zIndex: 20,
      disableForReducedMotion: true,
    });

    confetti({
      particleCount: isMobile ? 30 : 65,
      angle: 120,
      spread: 55,
      origin: { x: 0.85, y: 0.6 },
      colors,
      zIndex: 20,
      disableForReducedMotion: true,
    });

    // Center Gold Sparkle burst for Champion
    setTimeout(() => {
      confetti({
        particleCount: isMobile ? 22 : 45,
        spread: 75,
        origin: { x: 0.5, y: 0.4 },
        colors: ['#F5A623', '#FBBF24', '#FFFDF2', '#FFFFFF'],
        zIndex: 20,
        disableForReducedMotion: true,
      });
    }, 220);

    // Stage 2: Gentle falling confetti for 2.5 seconds
    const duration = 2500;
    const end = Date.now() + duration;

    const fallTimer = setInterval(() => {
      if (Date.now() > end) {
        clearInterval(fallTimer);
        return;
      }

      confetti({
        particleCount: isMobile ? 3 : 5,
        startVelocity: 12,
        spread: 360,
        ticks: 160,
        origin: { x: Math.random(), y: Math.random() * 0.25 },
        colors,
        shapes: ['square', 'circle'],
        scalar: 0.85,
        zIndex: 20,
        disableForReducedMotion: true,
      });
    }, 240);
  }, []);

  useEffect(() => {
    const targetElement = sectionRef.current;
    if (!targetElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (entry.isIntersecting) {
          // First time entering viewport: run initial confetti celebration
          if (!hasEnteredRef.current) {
            hasEnteredRef.current = true;
            runInitialCelebration();
          }

        }
      },
      { threshold: 0.35 }
    );

    observer.observe(targetElement);

    return () => observer.disconnect();
  }, [sectionRef, runInitialCelebration]);

  return null;
};

export default CelebrationEffects;
