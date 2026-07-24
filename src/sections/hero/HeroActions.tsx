import { Box, Button } from '@mui/material';
import RocketLaunchRounded from '@mui/icons-material/RocketLaunchRounded';
import type { RegistrationStatus } from '@/types/registration';
import { hero } from '@/content/vi/hero';

interface Props {
  status: RegistrationStatus;
}

export const HeroActions = ({ status }: Props) => {
  const getPrimaryCta = () => {
    switch (status) {
      case 'open':
        return { label: hero.cta.open, href: '#dang-ky' };
      case 'not_open':
        return { label: hero.cta.notOpen, href: '#gioi-thieu' };
      case 'closed':
        return { label: hero.cta.closed, href: '#footer' };
      default:
        return { label: hero.cta.disabled, href: '#footer' };
    }
  };

  const primary = getPrimaryCta();

  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <Button
        variant="contained"
        size="large"
        href={primary.href}
        endIcon={status === 'open' ? <RocketLaunchRounded /> : undefined}
      >
        {primary.label}
      </Button>
      <Button variant="outlined" size="large" href="#the-le">
        {hero.cta.secondary}
      </Button>
    </Box>
  );
};
