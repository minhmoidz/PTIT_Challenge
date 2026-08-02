import { Card, CardContent, Box, Typography, Chip } from '@mui/material';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
import MilitaryTechRoundedIcon from '@mui/icons-material/MilitaryTechRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import { Tilt3DCard } from '@/components/ui/Tilt3DCard';

export interface AwardCardProps {
  rankNumber: '01' | '02' | '03';
  title: string;
  badgeLabel: string;
  prizeAmount?: string;
  variant: 'champion' | 'runner-up' | 'third';
  perks: Array<{
    text: string;
    iconType?: 'check' | 'school' | 'business' | 'rocket';
  }>;
}

const variantStyles = {
  champion: {
    bg: '#FFFFFF',
    borderColor: 'rgba(231, 195, 77, 0.45)',
    borderGradient: 'linear-gradient(135deg, #E7C34D 0%, #E7C34D 50%, #7F6114 100%)',
    shadow: '0 20px 50px rgba(231, 195, 77, 0.22)',
    hoverShadow: '0 28px 60px rgba(231, 195, 77, 0.32)',
    badgeBg: 'linear-gradient(135deg, #E7C34D 0%, #7F6114 100%)',
    badgeColor: '#FFFFFF',
    iconColor: '#7F6114',
    iconBg: '#FFF8EC',
    iconBorder: '3px solid #E7C34D',
    prizeColor: '#7F6114',
    watermarkColor: 'rgba(231, 195, 77, 0.08)',
    iconComponent: EmojiEventsRoundedIcon,
    heightElevation: { lg: 'translateY(-30px)' },
    minHeight: { xs: 'auto', lg: 440 },
  },
  'runner-up': {
    bg: '#FFFFFF',
    borderColor: 'rgba(103, 120, 143, 0.3)',
    borderGradient: 'linear-gradient(135deg, #93A3B8 0%, #374961 100%)',
    shadow: '0 12px 32px rgba(103, 120, 143, 0.14)',
    hoverShadow: '0 20px 45px rgba(103, 120, 143, 0.22)',
    badgeBg: '#EFF3F8',
    badgeColor: '#374961',
    iconColor: '#374961',
    iconBg: '#F7F9FC',
    iconBorder: '3px solid #93A3B8',
    prizeColor: '#0F2A52',
    watermarkColor: 'rgba(103, 120, 143, 0.07)',
    iconComponent: WorkspacePremiumRoundedIcon,
    heightElevation: { md: 0 },
    minHeight: { xs: 'auto', lg: 440 },
  },
  third: {
    bg: '#FFFFFF',
    borderColor: 'rgba(158, 122, 25, 0.3)',
    borderGradient: 'linear-gradient(135deg, #9E7A19 0%, #7F6114 100%)',
    shadow: '0 12px 32px rgba(158, 122, 25, 0.12)',
    hoverShadow: '0 20px 45px rgba(158, 122, 25, 0.20)',
    badgeBg: '#FDF3CF',
    badgeColor: '#7F6114',
    iconColor: '#7F6114',
    iconBg: '#FFFBEB',
    iconBorder: '3px solid #9E7A19',
    prizeColor: '#7F6114',
    watermarkColor: 'rgba(158, 122, 25, 0.07)',
    iconComponent: MilitaryTechRoundedIcon,
    heightElevation: { md: 0 },
    minHeight: { xs: 'auto', lg: 440 },
  },
};

const getPerkIcon = (type?: string, color?: string) => {
  const iconProps = { sx: { fontSize: 18, color: color ?? '#E11414', flexShrink: 0, mt: 0.1 } };
  switch (type) {
    case 'school':
      return <SchoolRoundedIcon {...iconProps} />;
    case 'business':
      return <BusinessCenterRoundedIcon {...iconProps} />;
    case 'rocket':
      return <RocketLaunchRoundedIcon {...iconProps} />;
    default:
      return <CheckCircleRoundedIcon {...iconProps} />;
  }
};

export const AwardCard = ({
  rankNumber,
  title,
  badgeLabel,
  prizeAmount,
  variant,
  perks,
}: AwardCardProps) => {
  const style = variantStyles[variant];
  const MainIcon = style.iconComponent;
  const isChampion = variant === 'champion';

  return (
    <Tilt3DCard maxTilt={isChampion ? 8 : 6} scale={isChampion ? 1.03 : 1.01} glareColor={style.borderColor}>
      <Card
        sx={{
          height: '100%',
          minHeight: style.minHeight,
          borderRadius: 6,
          bgcolor: style.bg,
          border: '1px solid',
          borderColor: style.borderColor,
          boxShadow: style.shadow,
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: style.heightElevation,
          '&:hover': {
            boxShadow: style.hoverShadow,
            borderColor: isChampion ? '#E7C34D' : style.borderColor,
            transform: isChampion ? 'translateY(-35px)' : 'translateY(-6px)',
            '& .award-main-icon': {
              transform: 'scale(1.08) rotate(3deg)',
            },
          },
        }}
      >
        {/* Soft Radial Gold Aura behind Champion Card */}
        {isChampion && (
          <Box
            sx={{
              position: 'absolute',
              top: -40,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 220,
              height: 220,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(231, 195, 77, 0.18) 0%, transparent 70%)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />
        )}

        {/* Top Accent Stripe */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: isChampion ? 6 : 4,
            background: style.borderGradient,
          }}
        />

        {/* Semi-transparent Background Watermark Number */}
        <Typography
          aria-hidden="true"
          sx={{
            position: 'absolute',
            top: -10,
            right: -10,
            fontSize: '11rem',
            fontWeight: 900,
            color: style.watermarkColor,
            lineHeight: 1,
            userSelect: 'none',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        >
          {rankNumber}
        </Typography>

        <CardContent
          sx={{
            p: { xs: 3, sm: 4 },
            pt: 4,
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Eyebrow Rank Badge */}
          <Chip
            icon={isChampion ? <AutoAwesomeRoundedIcon sx={{ fontSize: '14px !important', color: '#FFFFFF !important' }} /> : undefined}
            label={badgeLabel}
            sx={{
              background: style.badgeBg,
              color: style.badgeColor,
              fontWeight: 800,
              fontSize: '0.725rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              height: 28,
              alignSelf: 'center',
              mb: 2.5,
              px: 1,
              border: isChampion ? 'none' : '1px solid rgba(0,0,0,0.06)',
            }}
          />

          {/* Trophy / Medal Main Icon */}
          <Box
            className="award-main-icon"
            sx={{
              width: isChampion ? 80 : 70,
              height: isChampion ? 80 : 70,
              borderRadius: '50%',
              bgcolor: style.iconBg,
              color: style.iconColor,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 2,
              boxShadow: `0 8px 24px ${style.watermarkColor}`,
              border: style.iconBorder,
              transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <MainIcon sx={{ fontSize: isChampion ? 44 : 36 }} />
          </Box>

          {/* Rank Title */}
          <Typography
            sx={{
              fontSize: isChampion ? '1.4rem' : '1.25rem',
              fontWeight: 800,
              color: '#0F2A52',
              mb: prizeAmount ? 0.5 : 2.5,
            }}
          >
            {title}
          </Typography>

          {/* Optional Prize Money Typography */}
          {prizeAmount && (
            <Typography
              sx={{
                fontSize: isChampion ? { xs: '1.5rem', sm: '1.75rem' } : { xs: '1.25rem', sm: '1.4rem' },
                fontWeight: 800,
                color: style.prizeColor,
                mb: 3,
                letterSpacing: '-0.01em',
              }}
            >
              {prizeAmount}
            </Typography>
          )}

          {/* Clean Perks Bullet List */}
          <Box sx={{ mt: 'auto', display: 'flex', flexDirection: 'column', gap: 1.5, textAlign: 'left' }}>
            {perks.map((perk, i) => (
              <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.25 }}>
                {getPerkIcon(perk.iconType, isChampion ? '#E7C34D' : undefined)}
                <Typography
                  sx={{
                    fontSize: '0.875rem',
                    color: '#0F2A52',
                    fontWeight: 600,
                    lineHeight: 1.45,
                  }}
                >
                  {perk.text}
                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Tilt3DCard>
  );
};

export default AwardCard;
