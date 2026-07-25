import { useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';

interface CelebrationEffectsProps {
  sectionRef: React.RefObject<HTMLElement | null>;
}

export const CelebrationEffects = ({ sectionRef }: CelebrationEffectsProps) => {
  const hasEnteredRef = useRef(false);
  const loopIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Trigger clearly visible, energetic 3-second firework sparkle burst
  const triggerFireworkBurst = useCallback(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const isMobile = window.innerWidth < 768;
    const colors = ['#F5A623', '#FBBF24', '#FFFDF2', '#367BEA', '#E8599A', '#FFFFFF'];

    // Double-pulse firework burst centered over Champion Card
    confetti({
      particleCount: isMobile ? 20 : 40,
      startVelocity: 22,
      spread: 75,
      ticks: 150,
      origin: { x: 0.5, y: 0.45 },
      colors,
      shapes: ['circle', 'square'],
      scalar: 0.85,
      zIndex: 20,
      disableForReducedMotion: true,
    });

    setTimeout(() => {
      confetti({
        particleCount: isMobile ? 12 : 25,
        startVelocity: 18,
        spread: 90,
        ticks: 120,
        origin: { x: 0.5, y: 0.42 },
        colors: ['#F5A623', '#FBBF24', '#FFFFFF'],
        shapes: ['circle'],
        scalar: 0.75,
        zIndex: 20,
        disableForReducedMotion: true,
      });
    }, 180);
  }, []);

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

    const startFireworksLoop = () => {
      if (loopIntervalRef.current) return;

      // Trigger first burst right away
      triggerFireworkBurst();

      // Repeat burst every 3 seconds
      loopIntervalRef.current = setInterval(() => {
        triggerFireworkBurst();
      }, 3000);
    };

    const stopFireworksLoop = () => {
      if (loopIntervalRef.current) {
        clearInterval(loopIntervalRef.current);
        loopIntervalRef.current = null;
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (entry.isIntersecting) {
          // First time entering viewport: run initial confetti celebration
          if (!hasEnteredRef.current) {
            hasEnteredRef.current = true;
            runInitialCelebration();
          }

          // Start 3-second recurring fireworks loop
          startFireworksLoop();
        } else {
          // Left viewport: stop recurring 3-second fireworks loop
          stopFireworksLoop();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(targetElement);

    return () => {
      stopFireworksLoop();
      observer.disconnect();
    };
  }, [sectionRef, runInitialCelebration, triggerFireworkBurst]);

  return null;
};

export default CelebrationEffects;
