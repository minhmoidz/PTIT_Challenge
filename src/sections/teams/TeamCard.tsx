import { Box, Typography, Chip, Paper, Button } from '@mui/material';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import type { PublicTeamProfile } from '@/types/publicTeam';
import { TEAM_STATUS_MAP } from '@/types/publicTeam';
import { piccColors } from '@/theme/palette';

interface Props {
  team: PublicTeamProfile;
}

/* ── Deterministic Avatar Gradient ──
   Picks from a fixed brand set rather than the full hue wheel, so a wall of
   team cards reads as one palette. Every pair clears 4.5:1 against white. */
const AVATAR_GRADIENTS = [
  `linear-gradient(135deg, ${piccColors.blue[600]} 0%, ${piccColors.blue[800]} 100%)`,
  `linear-gradient(135deg, ${piccColors.pink[600]} 0%, ${piccColors.pink[800]} 100%)`,
  `linear-gradient(135deg, ${piccColors.indigo[600]} 0%, ${piccColors.indigo[800]} 100%)`,
  `linear-gradient(135deg, ${piccColors.sky[700]} 0%, ${piccColors.blue[800]} 100%)`,
  `linear-gradient(135deg, ${piccColors.emerald[700]} 0%, ${piccColors.emerald[900]} 100%)`,
];

const getDeterministicGradient = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_GRADIENTS[Math.abs(hash) % AVATAR_GRADIENTS.length]!;
};

const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return ((parts[0]?.[0] ?? '') + (parts[parts.length - 1]?.[0] ?? '')).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

export const TeamCard = ({ team }: Props) => {
  const statusMeta = TEAM_STATUS_MAP[team.competitionStatus] || {
    label: team.statusLabel,
    color: 'blue',
  };

  const getBadgeStyles = () => {
    switch (statusMeta.color) {
      case 'gold':
        return {
          bgcolor: piccColors.amber[50],
          color: piccColors.amber[700],
          border: `1px solid ${piccColors.amber[200]}`,
        };
      case 'emerald':
        return {
          bgcolor: piccColors.emerald[50],
          color: piccColors.emerald[700],
          border: `1px solid ${piccColors.emerald[200]}`,
        };
      case 'purple':
        return {
          bgcolor: piccColors.indigo[50],
          color: piccColors.indigo[700],
          border: `1px solid ${piccColors.indigo[200]}`,
        };
      case 'amber':
        return {
          bgcolor: piccColors.yellow[50],
          color: piccColors.yellow[700],
          border: `1px solid ${piccColors.yellow[300]}`,
        };
      case 'gray':
        return {
          bgcolor: piccColors.slate[50],
          color: piccColors.slate[600],
          border: `1px solid ${piccColors.slate[200]}`,
        };
      default:
        return {
          bgcolor: piccColors.blue[50],
          color: piccColors.blue[800],
          border: `1px solid ${piccColors.blue[200]}`,
        };
    }
  };

  const badgeStyle = getBadgeStyles();

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: '22px',
        bgcolor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(223, 230, 239, 0.9)',
        boxShadow: '0 8px 24px rgba(15, 42, 82, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        transition: 'all 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-5px)',
          borderColor: piccColors.blue[400],
          boxShadow: '0 16px 40px rgba(56, 130, 241, 0.15)',
          '& .team-card-cta-icon': {
            transform: 'translateX(4px)',
          },
        },
      }}
    >
      <Box>
        {/* Top Row: Logo / Avatar & Status Badge */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.25 }}>
          {team.logoUrl ? (
            <Box
              component="img"
              src={team.logoUrl}
              alt={`Logo đội ${team.teamName}`}
              sx={{
                width: 48,
                height: 48,
                borderRadius: '14px',
                objectFit: 'contain',
                bgcolor: piccColors.slate[50],
                p: 0.75,
                border: `1px solid ${piccColors.slate[200]}`,
              }}
            />
          ) : (
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '14px',
                background: getDeterministicGradient(team.slug || team.teamName),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontWeight: 850,
                fontSize: '1.05rem',
                letterSpacing: '0.04em',
                boxShadow: '0 4px 12px rgba(15, 42, 82, 0.15)',
              }}
            >
              {getInitials(team.teamName)}
            </Box>
          )}

          <Chip
            label={statusMeta.label}
            size="small"
            sx={{
              fontWeight: 800,
              fontSize: '0.725rem',
              px: 1,
              py: 0.2,
              borderRadius: '999px',
              ...badgeStyle,
            }}
          />
        </Box>

        {/* Team Name */}
        <Typography
          variant="h3"
          component="h3"
          sx={{
            fontSize: '1.25rem',
            fontWeight: 800,
            color: piccColors.ink,
            mb: 1,
            lineHeight: 1.25,
            letterSpacing: '-0.015em',
          }}
        >
          {team.teamName}
        </Typography>

        {/* Slogan / Short Description */}
        <Typography
          sx={{
            fontSize: '0.875rem',
            color: piccColors.slate[600],
            mb: 2.5,
            lineHeight: 1.55,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: '2.7em',
          }}
        >
          {team.slogan || team.shortDescription || 'Đội thi sáng tạo tài năng tại PICC 2026.'}
        </Typography>

        {/* Category & Member Count Meta */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.25, mb: 3 }}>
          <Chip
            icon={<CategoryRoundedIcon sx={{ fontSize: '13px !important', color: `${piccColors.blue[600]} !important` }} />}
            label={team.challengeCategoryLabel}
            size="small"
            sx={{
              bgcolor: 'rgba(241, 246, 254, 0.8)',
              color: piccColors.blue[800],
              fontWeight: 700,
              fontSize: '0.75rem',
              border: '1px solid rgba(56, 130, 241, 0.2)',
            }}
          />
          <Chip
            icon={<GroupsRoundedIcon sx={{ fontSize: '14px !important', color: `${piccColors.pink[500]} !important` }} />}
            label={`${team.teamSize} thành viên`}
            size="small"
            sx={{
              bgcolor: 'rgba(255, 241, 245, 0.8)',
              color: piccColors.pink[700],
              fontWeight: 700,
              fontSize: '0.75rem',
              border: '1px solid rgba(214, 88, 144, 0.2)',
            }}
          />
        </Box>
      </Box>

      {/* CTA Button Link */}
      <Box sx={{ pt: 1.5, borderTop: '1px solid rgba(223, 230, 239, 0.7)' }}>
        <Button
          component="a"
          href={`/doi-thi/${team.slug}`}
          fullWidth
          endIcon={<ArrowForwardRoundedIcon className="team-card-cta-icon" sx={{ transition: 'transform 0.2s ease' }} />}
          sx={{
            justifyContent: 'space-between',
            color: piccColors.blue[800],
            fontWeight: 800,
            fontSize: '0.875rem',
            py: 0.75,
            px: 1,
            borderRadius: 3,
            '&:hover': {
              bgcolor: 'rgba(56, 130, 241, 0.08)',
            },
          }}
        >
          Xem hồ sơ đội thi
        </Button>
      </Box>
    </Paper>
  );
};
