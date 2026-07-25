import { Card, CardContent, Box, Typography, Chip, Grid } from '@mui/material';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import { piccColors } from '@/theme/palette';
import { Tilt3DCard } from '@/components/ui/Tilt3DCard';
import { MemberPortraitFallback } from './MemberPortraitFallback';
import type { MentorData } from '@/content/vi/mentors';

interface FeaturedLeadCardProps {
  member: MentorData;
}

export const FeaturedLeadCard = ({ member }: FeaturedLeadCardProps) => {
  return (
    <Tilt3DCard
      maxTilt={6}
      scale={1.01}
      glareColor="rgba(57, 124, 232, 0.15)"
      sx={{ width: '100%', mb: 4 }}
    >
      <Card
        sx={{
          borderRadius: '24px',
          bgcolor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1.5px solid rgba(57, 124, 232, 0.3)',
          boxShadow: '0 12px 40px rgba(22, 58, 103, 0.08)',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            borderColor: piccColors.blue[500],
            boxShadow: '0 18px 48px rgba(36, 95, 168, 0.15)',
          },
        }}
      >
        {/* Top Accent Gradient Line */}
        <Box
          sx={{
            height: 4,
            width: '100%',
            background: 'linear-gradient(90deg, #173B66 0%, #397CE8 50%, #F5BE4A 100%)',
          }}
        />

        <CardContent sx={{ p: { xs: 3, sm: 4, md: 4.5 } }}>
          <Grid container spacing={{ xs: 3, md: 4 }} alignItems="center">
            {/* Left Column: Portrait */}
            <Grid size={{ xs: 12, sm: 4, md: 3.5 }}>
              <MemberPortraitFallback
                name={member.name}
                image={member.image}
                aspectRatio="4/5"
              />
            </Grid>

            {/* Right Column: Lead Information & Roles */}
            <Grid size={{ xs: 12, sm: 8, md: 8.5 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                {/* Role Eyebrow Badge */}
                <Box sx={{ mb: 1.5 }}>
                  <Chip
                    icon={
                      <AutoAwesomeRoundedIcon
                        sx={{ fontSize: '14px !important', color: '#173B66 !important' }}
                      />
                    }
                    label={member.competitionRole}
                    sx={{
                      bgcolor: 'rgba(245, 190, 74, 0.18)',
                      color: '#173B66',
                      fontWeight: 800,
                      fontSize: '0.775rem',
                      letterSpacing: '0.04em',
                      px: 1,
                      py: 0.5,
                      border: '1px solid rgba(245, 190, 74, 0.4)',
                    }}
                  />
                </Box>

                {/* Name */}
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: { xs: '1.4rem', sm: '1.65rem', md: '1.85rem' },
                    fontWeight: 800,
                    color: piccColors.ink,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.25,
                    mb: 1,
                  }}
                >
                  {member.name}
                </Typography>

                {/* Professional Title */}
                <Typography
                  sx={{
                    fontSize: { xs: '1.05rem', md: '1.15rem' },
                    fontWeight: 700,
                    color: piccColors.blue[700],
                    mb: 0.5,
                  }}
                >
                  {member.professionalTitle}
                </Typography>

                {/* Organization */}
                <Typography
                  sx={{
                    fontSize: { xs: '0.925rem', md: '0.975rem' },
                    color: piccColors.slate[600],
                    fontWeight: 500,
                    lineHeight: 1.5,
                  }}
                >
                  {member.organization}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Tilt3DCard>
  );
};

export default FeaturedLeadCard;
