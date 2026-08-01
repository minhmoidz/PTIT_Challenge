import { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { gradientMesh } from '@/theme/palette';

export const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const { pathname } = useLocation();
  const lastPath = useRef(pathname);

  useEffect(() => {
    const onScroll = () => {
      if (lastPath.current !== pathname) {
        lastPath.current = pathname;
        setProgress(0);
        return;
      }
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? Math.min(el.scrollTop / max, 1) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  return (
    <Box
      aria-hidden="true"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: 3,
        width: '100%',
        zIndex: 1300,
        background: gradientMesh.ptitCta,
        boxShadow: '0 0 8px rgba(255, 31, 31, 0.4)',
        transform: `scaleX(${progress})`,
        transformOrigin: 'left',
        transition: 'transform 0.1s linear',
        pointerEvents: 'none',
      }}
    />
  );
};
