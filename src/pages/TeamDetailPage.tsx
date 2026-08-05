import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Container, Typography, Chip, Paper, Button, Grid, Breadcrumbs, Link as MuiLink, CircularProgress, Divider, Alert, Tooltip,
} from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { fetchPublicTeamBySlug } from '@/services/teams/publicTeamsApi';
import type { PublicTeamProfile } from '@/types/publicTeam';
import { TEAM_STATUS_MAP } from '@/types/publicTeam';
import { piccColors } from '@/theme/palette';
import { SkyBackground } from '@/components/ui/SkyBackground';
import { getSkyBackground } from '@/components/ui/skyBackgroundConfig';
import { appHash, appPath } from '@/config/paths';

export const TeamDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [team, setTeam] = useState<PublicTeamProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

useEffect(() => {
    if (!slug) {
      Promise.resolve().then(() => { setLoading(false); });
      return;
    }
    let cancelled = false;
    Promise.resolve().then(() => { if (!cancelled) setLoading(true); });
    fetchPublicTeamBySlug(slug)
      .then((res) => {
        if (!cancelled) setTeam(res);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [slug]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress size={44} sx={{ color: piccColors.blue[600] }} />
      </Box>
    );
  }

  if (!team) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          py: 12,
          background: getSkyBackground('clear'),
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={0}
            sx={{
              p: 5,
              textAlign: 'center',
              borderRadius: '24px',
              border: `1px solid ${piccColors.slate[200]}`,
            }}
          >
            <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 800, color: piccColors.ptitNavy, mb: 1.5 }}>
              Hồ sơ đội thi không tồn tại
            </Typography>
            <Typography sx={{ color: piccColors.slate[500], mb: 3, fontSize: '0.925rem' }}>
              Hồ sơ đội thi này có thể chưa được Ban Tổ chức duyệt xuất bản hoặc đường dẫn không đúng.
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/doi-thi')}
              startIcon={<ArrowBackRoundedIcon />}
              sx={{ borderRadius: 999, fontWeight: 750 }}
            >
              Quay lại danh sách đội thi
            </Button>
          </Paper>
        </Container>
      </Box>
    );
  }

  const statusMeta = TEAM_STATUS_MAP[team.competitionStatus] || { label: team.statusLabel, color: 'blue' };

  return (
    <Box
      component="main"
      id="team-detail-page"
      sx={{
        py: { xs: 10, md: 14 },
        background: getSkyBackground('clear'),
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
      }}
    >
      <SkyBackground variant="clear" />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Breadcrumb Navigation */}
        <Box sx={{ mb: 3 }}>
          <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{ fontSize: '0.875rem', fontWeight: 600 }}>
            <MuiLink underline="hover" color="inherit" href={appHash('hero')}>
              Trang chủ
            </MuiLink>
            <MuiLink underline="hover" color="inherit" href={appPath('/doi-thi')}>
              Đội thi
            </MuiLink>
            <Typography color="text.primary" sx={{ fontWeight: 700 }}>
              {team.teamName}
            </Typography>
          </Breadcrumbs>
        </Box>

        {/* Back & Share Action Bar */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
          <Button
            onClick={() => navigate('/doi-thi')}
            startIcon={<ArrowBackRoundedIcon />}
            sx={{
              color: piccColors.blue[800],
              fontWeight: 700,
              fontSize: '0.875rem',
              '&:hover': { bgcolor: 'rgba(56, 130, 241, 0.08)' },
            }}
          >
            Danh sách đội thi
          </Button>

          <Tooltip title={copied ? 'Đã sao chép liên kết!' : 'Chia sẻ liên kết đội thi'}>
            <Button
              variant="outlined"
              size="small"
              onClick={handleShare}
              startIcon={copied ? <CheckRoundedIcon /> : <ShareRoundedIcon />}
              sx={{
                borderRadius: 999,
                fontWeight: 700,
                fontSize: '0.825rem',
                borderColor: 'rgba(56, 130, 241, 0.3)',
              }}
            >
              {copied ? 'Đã chép link' : 'Chia sẻ'}
            </Button>
          </Tooltip>
        </Box>

        {/* ── Main Profile Glass Card ── */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3.5, sm: 6 },
            borderRadius: '28px',
            bgcolor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1.5px solid rgba(56, 130, 241, 0.25)',
            boxShadow: '0 16px 48px rgba(15, 42, 82, 0.08)',
            mb: 5,
          }}
        >
          {/* Hero Profile Header */}
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3, alignItems: 'flex-start', mb: 4 }}>
            <Box
              sx={{
                width: 72,
                height: 72,
                borderRadius: '20px',
                background: `linear-gradient(135deg, ${piccColors.blue[600]} 0%, ${piccColors.blue[900]} 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontWeight: 850,
                fontSize: '1.6rem',
                boxShadow: '0 8px 24px rgba(56, 130, 241, 0.25)',
                flexShrink: 0,
              }}
            >
              {team.teamName.slice(0, 2).toUpperCase()}
            </Box>

            <Box sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.25, alignItems: 'center', mb: 1 }}>
                <Typography
                  variant="h1"
                  component="h1"
                  sx={{
                    fontSize: { xs: '1.8rem', sm: '2.4rem' },
                    fontWeight: 850,
                    color: piccColors.ink,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {team.teamName}
                </Typography>
                <Chip
                  label={statusMeta.label}
                  sx={{
                    fontWeight: 800,
                    bgcolor: 'rgba(16, 185, 129, 0.12)',
                    color: piccColors.emerald[700],
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                  }}
                />
              </Box>

              {team.slogan && (
                <Typography sx={{ fontSize: '1.05rem', fontWeight: 600, color: piccColors.blue[700], italic: 'italic', mb: 2 }}>
                  “{team.slogan}”
                </Typography>
              )}

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                <Chip
                  icon={<CategoryRoundedIcon sx={{ fontSize: 16 }} />}
                  label={team.challengeCategoryLabel}
                  size="small"
                  sx={{ bgcolor: piccColors.blue[50], fontWeight: 700 }}
                />
                <Chip
                  icon={<GroupsRoundedIcon sx={{ fontSize: 16 }} />}
                  label={`Đội ${team.teamSize} thành viên`}
                  size="small"
                  sx={{ bgcolor: '#FFF1F5', fontWeight: 700 }}
                />
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 3.5 }} />

          {/* Short Description */}
          {team.shortDescription && (
            <Box sx={{ mb: 4.5 }}>
              <Typography variant="h3" component="h3" sx={{ fontSize: '1.15rem', fontWeight: 800, color: piccColors.ptitNavy, mb: 1.5 }}>
                Mô tả ngắn về đội thi
              </Typography>
              <Typography sx={{ fontSize: '0.975rem', color: piccColors.slate[700], lineHeight: 1.7 }}>
                {team.shortDescription}
              </Typography>
            </Box>
          )}

          {/* Public Members Section (Only if showMemberNames === true) */}
          {team.publication.showMemberNames && team.publicMembers && team.publicMembers.length > 0 && (
            <Box sx={{ mb: 4.5 }}>
              <Typography variant="h3" component="h3" sx={{ fontSize: '1.15rem', fontWeight: 800, color: piccColors.ptitNavy, mb: 2.5 }}>
                Thành viên đội thi
              </Typography>
              <Grid container spacing={2}>
                {team.publicMembers.map((member, i) => (
                  <Grid key={i} size={{ xs: 12, sm: 6 }}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        borderRadius: 3,
                        bgcolor: piccColors.slate[50],
                        border: `1px solid ${piccColors.slate[200]}`,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                      }}
                    >
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: '50%',
                          bgcolor: 'rgba(56, 130, 241, 0.12)',
                          color: piccColors.blue[700],
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <PersonRoundedIcon />
                      </Box>
                      <Box>
                        <Typography sx={{ fontWeight: 800, fontSize: '0.925rem', color: piccColors.slate[800] }}>
                          {member.displayName}
                        </Typography>
                        <Typography sx={{ fontSize: '0.775rem', color: piccColors.slate[500], fontWeight: 600 }}>
                          {member.role || 'Thành viên'} • {member.major || 'Sinh viên PTIT'}
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {/* Public Project Summary Section (Only if showProjectSummary === true) */}
          {team.publication.showProjectSummary && team.project && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="h3" component="h3" sx={{ fontSize: '1.15rem', fontWeight: 800, color: piccColors.ptitNavy, mb: 2 }}>
                Dự án / Giải pháp công khai
              </Typography>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  bgcolor: 'rgba(241, 246, 254, 0.5)',
                  border: '1px solid rgba(56, 130, 241, 0.2)',
                }}
              >
                {team.project.title && (
                  <Typography variant="h4" component="h4" sx={{ fontSize: '1.1rem', fontWeight: 800, color: piccColors.blue[800], mb: 1 }}>
                    {team.project.title}
                  </Typography>
                )}
                {team.project.summary && (
                  <Typography sx={{ fontSize: '0.925rem', color: piccColors.slate[700], lineHeight: 1.65, mb: 2 }}>
                    {team.project.summary}
                  </Typography>
                )}
                {team.project.tags && team.project.tags.length > 0 && (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {team.project.tags.map((tag, idx) => (
                      <Chip key={idx} label={`#${tag}`} size="small" sx={{ bgcolor: '#FFFFFF', fontWeight: 700, fontSize: '0.725rem' }} />
                    ))}
                  </Box>
                )}
              </Paper>
            </Box>
          )}

          {/* Privacy Note */}
          <Alert severity="info" sx={{ borderRadius: 3, bgcolor: piccColors.blue[50], fontSize: '0.8rem', mt: 4 }}>
            🔒 <strong>Bảo mật thông tin:</strong> Hồ sơ đội thi được công khai theo phạm vi quyền hiển thị do Ban Tổ chức phê duyệt và đội thi xác nhận. Mọi dữ liệu liên hệ cá nhân (email, số điện thoại, mã sinh viên) đều được bảo vệ nghiêm ngặt.
          </Alert>
        </Paper>
      </Container>
    </Box>
  );
};

export default TeamDetailPage;
