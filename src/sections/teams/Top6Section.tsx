import { Box, Typography, Grid, Chip } from '@mui/material';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import type { PublicTeamProfile } from '@/types/publicTeam';
import { TeamCard } from './TeamCard';

interface Props {
  finalists: PublicTeamProfile[];
}

export const Top6Section = ({ finalists }: Props) => {
  if (!finalists || finalists.length === 0) return null;

  return (
    <Box
      sx={{
        mb: 7,
        p: { xs: 3, sm: 4.5 },
        borderRadius: '28px',
        background:
          'linear-gradient(135deg, rgba(234, 242, 255, 0.9) 0%, rgba(240, 253, 244, 0.9) 100%)',
        border: '1.5px solid rgba(16, 185, 129, 0.3)',
        boxShadow: '0 12px 36px rgba(16, 185, 129, 0.08)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
        <Chip
          icon={<EmojiEventsRoundedIcon sx={{ fontSize: '16px !important', color: '#047857 !important' }} />}
          label="CHUNG KẾT PICC 2026"
          size="small"
          sx={{
            bgcolor: 'rgba(16, 185, 129, 0.15)',
            color: '#047857',
            fontWeight: 850,
            fontSize: '0.725rem',
            letterSpacing: '0.06em',
            border: '1px solid rgba(16, 185, 129, 0.3)',
          }}
        />
      </Box>

      <Typography
        variant="h2"
        component="h2"
        sx={{
          fontSize: { xs: '1.5rem', sm: '1.85rem' },
          fontWeight: 850,
          color: '#163A67',
          mb: 1,
          letterSpacing: '-0.02em',
        }}
      >
        06 Đội Chung Kết PICC 2026
      </Typography>

      <Typography
        sx={{
          color: '#475569',
          fontSize: '0.925rem',
          mb: 3.5,
          maxWidth: 680,
          lineHeight: 1.6,
        }}
      >
        Vượt qua hàng chục đội thi xuất sắc, 06 đội thi bản lĩnh đã tiến vào Vòng Chung kết Tranh tài.
      </Typography>

      <Grid container spacing={3}>
        {finalists.map((team) => (
          <Grid key={team.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <TeamCard team={team} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
