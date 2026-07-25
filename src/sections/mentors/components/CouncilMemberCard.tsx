import { Card, CardContent, Box, Typography, Chip } from '@mui/material';
import { piccColors } from '@/theme/palette';
import { Tilt3DCard } from '@/components/ui/Tilt3DCard';
import { MemberPortraitFallback } from './MemberPortraitFallback';
import type { MentorData } from '@/content/vi/mentors';

interface CouncilMemberCardProps {
  member: MentorData;
}

export const CouncilMemberCard = ({ member }: CouncilMemberCardProps) => {
  return (
    <Tilt3DCard
      maxTilt={8}
      scale={1.02}
      glareColor="rgba(57, 124, 232, 0.12)"
      sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <Card
        sx={{
          height: '100%',
          borderRadius: '20px',
          bgcolor: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(18px)',
          border: '1.5px solid rgba(226, 232, 240, 0.85)',
          boxShadow: '0 8px 28px rgba(22, 58, 103, 0.04)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            borderColor: piccColors.blue[400],
            bgcolor: '#FFFFFF',
            boxShadow: '0 14px 36px rgba(22, 58, 103, 0.1)',
            transform: 'translateY(-4px)',
          },
        }}
      >
        {/* Top Accent Line */}
        <Box
          sx={{
            height: 3,
            width: '100%',
            background: 'linear-gradient(90deg, #397CE8 0%, #6366F1 100%)',
          }}
        />

        <CardContent
          sx={{
            p: { xs: 2.75, md: 3 },
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
          }}
        >
          {/* Portrait Container */}
          <Box sx={{ mb: 2 }}>
            <MemberPortraitFallback
              name={member.name}
              image={member.image}
              aspectRatio="4/5"
            />
          </Box>

          {/* Competition Role Pill */}
          <Box sx={{ mb: 1.5 }}>
            <Chip
              label={member.competitionRole}
              size="small"
              sx={{
                bgcolor: 'rgba(57, 124, 232, 0.1)',
                color: piccColors.blue[800],
                fontWeight: 750,
                fontSize: '0.725rem',
                letterSpacing: '0.02em',
                border: '1px solid rgba(57, 124, 232, 0.2)',
                height: 24,
              }}
            />
          </Box>

          {/* Name */}
          <Typography
            sx={{
              fontSize: { xs: '1.1rem', md: '1.15rem' },
              fontWeight: 800,
              color: piccColors.ink,
              lineHeight: 1.3,
              mb: 0.75,
            }}
          >
            {member.name}
          </Typography>

          {/* Professional Title */}
          <Typography
            sx={{
              fontSize: '0.885rem',
              fontWeight: 700,
              color: piccColors.blue[700],
              lineHeight: 1.35,
              mb: 0.5,
            }}
          >
            {member.professionalTitle}
          </Typography>

          {/* Organization */}
          <Typography
            sx={{
              fontSize: '0.825rem',
              color: piccColors.slate[500],
              lineHeight: 1.45,
              fontWeight: 450,
              mt: 'auto',
            }}
          >
            {member.organization}
          </Typography>
        </CardContent>
      </Card>
    </Tilt3DCard>
  );
};

export default CouncilMemberCard;
