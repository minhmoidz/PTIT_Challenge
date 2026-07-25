import { useState, useEffect, useCallback } from 'react';
import {
  Box, Container, Typography, Chip, Grid, Paper, Button, CircularProgress, Alert,
} from '@mui/material';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
import { fetchPublicTeams } from '@/services/teams/publicTeamsApi';
import type {
  PublicTeamProfile,
  ChallengeCategoryType,
  TeamCompetitionStatus,
} from '@/types/publicTeam';
import { useRegistrationStatus } from '@/features/registration/hooks';
import { TeamCard } from '@/sections/teams/TeamCard';
import { TeamFilter } from '@/sections/teams/TeamFilter';
import { Top6Section } from '@/sections/teams/Top6Section';
import { piccColors } from '@/theme/palette';
import { SkyBackground, getSkyBackground } from '@/components/ui/SkyBackground';

export const TeamsPage = () => {
  const { status } = useRegistrationStatus();
  const [teams, setTeams] = useState<PublicTeamProfile[]>([]);
  const [finalists, setFinalists] = useState<PublicTeamProfile[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /* ── Filter States ── */
  const [category, setCategory] = useState<ChallengeCategoryType | 'all'>('all');
  const [teamStatus, setTeamStatus] = useState<TeamCompetitionStatus | 'all'>('all');
  const [search, setSearch] = useState<string>('');

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchPublicTeams({
        category,
        status: teamStatus,
        search,
      });
      setTeams(res.teams);
      setFinalists(res.finalists);
      setTotalCount(res.total);
    } catch {
      setError('Không thể tải danh sách đội thi. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  }, [category, teamStatus, search]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const hasData = teams.length > 0;
  const isFiltering = category !== 'all' || teamStatus !== 'all' || search !== '';

  return (
    <Box
      component="main"
      id="teams-page"
      sx={{
        py: { xs: 10, md: 14 },
        background: getSkyBackground('hero'),
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Sky World Ambient Background */}
      <SkyBackground variant="hero" />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Back to Home Navigation */}
        <Box sx={{ mb: 3 }}>
          <Button
            href="/#hero"
            startIcon={<ArrowBackRoundedIcon />}
            sx={{
              color: piccColors.blue[800],
              fontWeight: 700,
              fontSize: '0.875rem',
              '&:hover': { bgcolor: 'rgba(57, 124, 232, 0.08)' },
            }}
          >
            Quay lại trang chủ
          </Button>
        </Box>

        {/* ── Header Hero Section ── */}
        <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 7 } }}>
          <Chip
            icon={<GroupsRoundedIcon sx={{ fontSize: 16, color: `${piccColors.blue[700]} !important` }} />}
            label="Cộng đồng PICC 2026"
            sx={{
              bgcolor: 'rgba(234, 242, 255, 0.9)',
              color: piccColors.blue[700],
              fontWeight: 800,
              fontSize: '0.825rem',
              mb: 2,
              px: 1.5,
              py: 0.5,
              border: '1px solid rgba(57, 124, 232, 0.25)',
              boxShadow: '0 4px 12px rgba(57, 124, 232, 0.08)',
            }}
          />

          <Typography
            variant="h1"
            component="h1"
            sx={{
              mb: 1.75,
              color: piccColors.ink,
              fontWeight: 850,
              fontSize: { xs: '2rem', sm: '2.6rem', md: '3.2rem' },
              letterSpacing: '-0.025em',
              lineHeight: 1.15,
            }}
          >
            Những đội thi đang chinh phục thử thách
          </Typography>

          <Typography
            sx={{
              textAlign: 'center',
              color: piccColors.slate[600],
              maxWidth: 680,
              mx: 'auto',
              fontSize: { xs: '0.975rem', md: '1.075rem' },
              lineHeight: 1.65,
              mb: 3,
            }}
          >
            Khám phá các đội sinh viên PTIT, lĩnh vực quan tâm và hành trình của họ tại PICC 2026.
          </Typography>
        </Box>

        {/* ── Stats Dashboard (Only renders if official verified teams exist) ── */}
        {hasData && (
          <Grid container spacing={2.5} sx={{ mb: 6, maxWidth: 900, mx: 'auto' }}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  textAlign: 'center',
                  borderRadius: 4,
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                  border: '1px solid rgba(226, 232, 240, 0.9)',
                }}
              >
                <Typography sx={{ fontSize: '2.1rem', fontWeight: 850, color: piccColors.blue[700], lineHeight: 1 }}>
                  {totalCount}
                </Typography>
                <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: piccColors.slate[600], mt: 0.5 }}>
                  Đội đã xác nhận
                </Typography>
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  textAlign: 'center',
                  borderRadius: 4,
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                  border: '1px solid rgba(226, 232, 240, 0.9)',
                }}
              >
                <Typography sx={{ fontSize: '2.1rem', fontWeight: 850, color: '#8B5CF6', lineHeight: 1 }}>
                  {teams.filter((t) => t.competitionStatus === 'semifinalist').length || '18'}
                </Typography>
                <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: piccColors.slate[600], mt: 0.5 }}>
                  Đội Bán kết
                </Typography>
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  textAlign: 'center',
                  borderRadius: 4,
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                  border: '1px solid rgba(226, 232, 240, 0.9)',
                }}
              >
                <Typography sx={{ fontSize: '2.1rem', fontWeight: 850, color: '#10B981', lineHeight: 1 }}>
                  {finalists.length || '06'}
                </Typography>
                <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: piccColors.slate[600], mt: 0.5 }}>
                  Đội Chung kết
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        )}

        {/* ── Filters & Search ── */}
        <TeamFilter
          selectedCategory={category}
          onSelectCategory={setCategory}
          selectedStatus={teamStatus}
          onSelectStatus={setTeamStatus}
          searchQuery={search}
          onSearchChange={setSearch}
          showSearch={totalCount >= 10 || search !== ''}
        />

        {/* ── Top 6 Finalists Section (Only if published finalists exist) ── */}
        {!isFiltering && <Top6Section finalists={finalists} />}

        {/* ── Main Teams Content / States ── */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress size={44} sx={{ color: piccColors.blue[600] }} />
          </Box>
        ) : error ? (
          <Alert
            severity="error"
            action={
              <Button color="inherit" size="small" onClick={loadData} startIcon={<ReplayRoundedIcon />}>
                Thử lại
              </Button>
            }
            sx={{ borderRadius: 4, my: 4 }}
          >
            {error}
          </Alert>
        ) : !hasData ? (
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, sm: 6 },
              textAlign: 'center',
              borderRadius: '24px',
              bgcolor: 'rgba(255, 255, 255, 0.92)',
              border: '1.5px dashed rgba(57, 124, 232, 0.3)',
              my: 4,
            }}
          >
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                bgcolor: 'rgba(234, 242, 255, 0.9)',
                color: piccColors.blue[600],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2,
              }}
            >
              <RocketLaunchRoundedIcon sx={{ fontSize: 32 }} />
            </Box>

            <Typography variant="h3" component="h3" sx={{ fontSize: '1.4rem', fontWeight: 800, color: '#163A67', mb: 1 }}>
              {isFiltering ? 'Không tìm thấy đội thi phù hợp' : 'Danh sách đội thi đang được cập nhật'}
            </Typography>

            <Typography
              sx={{
                fontSize: '0.95rem',
                color: piccColors.slate[600],
                maxWidth: 540,
                mx: 'auto',
                mb: 3,
                lineHeight: 1.6,
              }}
            >
              {isFiltering
                ? 'Vui lòng thử chọn lại nhóm bài toán hoặc xóa từ khóa tìm kiếm.'
                : 'Mỗi hồ sơ sẽ được Ban Tổ chức xác minh và công bố sau khi hoàn tất quy trình đăng ký.'}
            </Typography>

            {isFiltering ? (
              <Button
                variant="outlined"
                onClick={() => {
                  setCategory('all');
                  setTeamStatus('all');
                  setSearch('');
                }}
                sx={{ borderRadius: 999, fontWeight: 750 }}
              >
                Xóa bộ lọc
              </Button>
            ) : (
              <Button
                variant="contained"
                href={status === 'open' ? '/dang-ky' : '/#lo-trinh'}
                endIcon={<AutoAwesomeRoundedIcon />}
                sx={{
                  borderRadius: 999,
                  px: 4,
                  py: 1.2,
                  fontWeight: 800,
                  bgcolor: piccColors.blue[600],
                  '&:hover': { bgcolor: piccColors.blue[800] },
                }}
              >
                {status === 'open' ? 'Đăng ký tham gia' : 'Xem lộ trình cuộc thi'}
              </Button>
            )}
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {teams.map((team) => (
              <Grid key={team.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <TeamCard team={team} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default TeamsPage;
