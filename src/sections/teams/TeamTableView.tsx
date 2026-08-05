import {
  Box,
  Typography,
  Chip,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import type { PublicTeamProfile } from '@/types/publicTeam';
import { TEAM_STATUS_MAP } from '@/types/publicTeam';
import { piccColors } from '@/theme/palette';
import { appPath } from '@/config/paths';

interface Props {
  teams: PublicTeamProfile[];
}

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

const getBadgeStyles = (color: string) => {
  switch (color) {
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

export const TeamTableView = ({ teams }: Props) => {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: '24px',
        bgcolor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(223, 230, 239, 0.9)',
        boxShadow: '0 12px 36px rgba(15, 42, 82, 0.06)',
        overflow: 'hidden',
      }}
    >
      <TableContainer sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow
              sx={{
                bgcolor: 'rgba(244, 247, 251, 0.85)',
                borderBottom: '1.5px solid rgba(223, 230, 239, 0.9)',
              }}
            >
              <TableCell
                sx={{
                  py: 2,
                  px: 3,
                  fontWeight: 800,
                  fontSize: '0.75rem',
                  color: piccColors.slate[600],
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                Đội thi
              </TableCell>
              <TableCell
                sx={{
                  py: 2,
                  px: 2,
                  fontWeight: 800,
                  fontSize: '0.75rem',
                  color: piccColors.slate[600],
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                Nhóm bài toán
              </TableCell>
              <TableCell
                sx={{
                  py: 2,
                  px: 2,
                  fontWeight: 800,
                  fontSize: '0.75rem',
                  color: piccColors.slate[600],
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  textAlign: 'center',
                }}
              >
                Số thành viên
              </TableCell>
              <TableCell
                sx={{
                  py: 2,
                  px: 2,
                  fontWeight: 800,
                  fontSize: '0.75rem',
                  color: piccColors.slate[600],
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                Trạng thái
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  py: 2,
                  px: 3,
                  fontWeight: 800,
                  fontSize: '0.75rem',
                  color: piccColors.slate[600],
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                Thao tác
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {teams.map((team, idx) => {
              const statusMeta = TEAM_STATUS_MAP[team.competitionStatus] || {
                label: team.statusLabel,
                color: 'blue',
              };
              const badgeStyle = getBadgeStyles(statusMeta.color);
              const isLast = idx === teams.length - 1;

              return (
                <TableRow
                  key={team.id}
                  sx={{
                    borderBottom: isLast ? 'none' : '1px solid rgba(235, 240, 247, 0.8)',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: 'rgba(56, 130, 241, 0.035)',
                      '& .team-row-action-icon': {
                        transform: 'translateX(4px)',
                      },
                    },
                  }}
                >
                  {/* Column 1: Team Logo/Avatar & Name & Slogan */}
                  <TableCell sx={{ py: 2.25, px: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      {team.logoUrl ? (
                        <Box
                          component="img"
                          src={team.logoUrl}
                          alt={`Logo ${team.teamName}`}
                          sx={{
                            width: 44,
                            height: 44,
                            borderRadius: '12px',
                            objectFit: 'contain',
                            bgcolor: piccColors.slate[50],
                            p: 0.5,
                            border: `1px solid ${piccColors.slate[200]}`,
                            flexShrink: 0,
                          }}
                        />
                      ) : (
                        <Box
                          sx={{
                            width: 44,
                            height: 44,
                            borderRadius: '12px',
                            background: getDeterministicGradient(team.slug || team.teamName),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#FFFFFF',
                            fontWeight: 850,
                            fontSize: '0.95rem',
                            letterSpacing: '0.04em',
                            boxShadow: '0 3px 8px rgba(15, 42, 82, 0.12)',
                            flexShrink: 0,
                          }}
                        >
                          {getInitials(team.teamName)}
                        </Box>
                      )}

                      <Box sx={{ minWidth: 0 }}>
                        <Typography
                          sx={{
                            fontWeight: 800,
                            fontSize: '1rem',
                            color: piccColors.ink,
                            lineHeight: 1.25,
                          }}
                        >
                          {team.teamName}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: '0.825rem',
                            color: piccColors.slate[500],
                            mt: 0.4,
                            lineHeight: 1.35,
                            display: '-webkit-box',
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            maxWidth: 360,
                          }}
                        >
                          {team.slogan || team.shortDescription || 'Đội thi sáng tạo tài năng tại PICC 2026.'}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  {/* Column 2: Challenge Category */}
                  <TableCell sx={{ py: 2.25, px: 2 }}>
                    <Chip
                      icon={
                        <CategoryRoundedIcon
                          sx={{ fontSize: '13px !important', color: `${piccColors.blue[600]} !important` }}
                        />
                      }
                      label={team.challengeCategoryLabel}
                      size="small"
                      sx={{
                        bgcolor: 'rgba(241, 246, 254, 0.85)',
                        color: piccColors.blue[800],
                        fontWeight: 700,
                        fontSize: '0.75rem',
                        border: '1px solid rgba(56, 130, 241, 0.2)',
                      }}
                    />
                  </TableCell>

                  {/* Column 3: Team Members Count */}
                  <TableCell sx={{ py: 2.25, px: 2, textAlign: 'center' }}>
                    <Chip
                      icon={
                        <GroupsRoundedIcon
                          sx={{ fontSize: '14px !important', color: `${piccColors.pink[500]} !important` }}
                        />
                      }
                      label={`${team.teamSize} người`}
                      size="small"
                      sx={{
                        bgcolor: 'rgba(255, 241, 245, 0.85)',
                        color: piccColors.pink[700],
                        fontWeight: 700,
                        fontSize: '0.75rem',
                        border: '1px solid rgba(214, 88, 144, 0.2)',
                      }}
                    />
                  </TableCell>

                  {/* Column 4: Competition Status */}
                  <TableCell sx={{ py: 2.25, px: 2 }}>
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
                  </TableCell>

                  {/* Column 5: Action Button */}
                  <TableCell align="right" sx={{ py: 2.25, px: 3 }}>
                    <Button
                      component="a"
                      href={appPath(`/doi-thi/${team.slug}`)}
                      size="small"
                      endIcon={
                        <ArrowForwardRoundedIcon
                          className="team-row-action-icon"
                          sx={{ fontSize: '15px !important', transition: 'transform 0.2s ease' }}
                        />
                      }
                      sx={{
                        color: piccColors.blue[700],
                        fontWeight: 800,
                        fontSize: '0.8rem',
                        px: 1.5,
                        py: 0.6,
                        borderRadius: '10px',
                        bgcolor: 'rgba(56, 130, 241, 0.08)',
                        '&:hover': {
                          bgcolor: piccColors.blue[600],
                          color: '#FFFFFF',
                          '& .team-row-action-icon': {
                            color: '#FFFFFF',
                          },
                        },
                      }}
                    >
                      Hồ sơ
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
