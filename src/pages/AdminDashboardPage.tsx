import { useState, useEffect, useCallback } from 'react';
import {
  Box, Typography, Grid, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Chip, IconButton, Tooltip, TextField, FormControl,
  FormLabel, RadioGroup, FormControlLabel, Radio, Alert, Divider, Skeleton,
} from '@mui/material';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import HourglassTopRoundedIcon from '@mui/icons-material/HourglassTopRounded';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { adminColors, adminRadius, adminShadow } from '@/theme/adminTokens';
import { RegistrationDetailModal } from '@/components/admin/RegistrationDetailModal';

/* ── Types ── */
interface TeamMember {
  fullName: string;
  studentId: string;
  email: string;
  phone: string;
  major: string;
  role: string;
}

interface RegistrationItem {
  id: string;
  registrationCode: string;
  submittedAt: string;
  status: string;
  data: {
    teamName: string;
    teamSize: number;
    challengeCategories: string[];
    featuredProject: string;
    members: TeamMember[];
  };
}

/* ── Reusable Status Badge ── */
const StatusBadge = ({ status }: { status: string }) => {
  const map: Record<string, { label: string; cfg: { bg: string; text: string; border: string } }> = {
    SUBMITTED: { label: 'Đã nộp', cfg: adminColors.status.submitted },
    VERIFIED: { label: 'Đã xác minh', cfg: adminColors.status.verified },
    REJECTED: { label: 'Từ chối', cfg: adminColors.status.rejected },
    DRAFT: { label: 'Nháp', cfg: adminColors.status.draft },
    UNDER_REVIEW: { label: 'Đang xét', cfg: adminColors.status.under_review },
    NEEDS_REVISION: { label: 'Cần bổ sung', cfg: adminColors.status.needs_revision },
  };
  const entry = map[status] || { label: status, cfg: adminColors.status.draft };
  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        px: 1.25,
        py: 0.35,
        borderRadius: '6px',
        fontSize: '0.75rem',
        fontWeight: 700,
        bgcolor: entry.cfg.bg,
        color: entry.cfg.text,
        border: `1px solid ${entry.cfg.border}`,
        letterSpacing: '0.01em',
        whiteSpace: 'nowrap',
      }}
    >
      {entry.label}
    </Box>
  );
};

/* ── KPI Card ── */
const KpiCard = ({
  label, value, icon: Icon, color, loading, emptyLabel,
}: {
  label: string; value: number; icon: React.ElementType; color: string; loading: boolean; emptyLabel?: string;
}) => (
  <Box
    sx={{
      bgcolor: adminColors.surface,
      border: `1px solid ${adminColors.border}`,
      borderRadius: adminRadius.card,
      boxShadow: adminShadow.card,
      p: 2.5,
      display: 'flex',
      flexDirection: 'column',
      gap: 1.5,
      transition: 'box-shadow 0.15s',
      '&:hover': { boxShadow: adminShadow.cardHover },
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography sx={{ fontSize: '0.8125rem', fontWeight: 600, color: adminColors.textSecondary }}>{label}</Typography>
      <Box sx={{ width: 32, height: 32, borderRadius: '8px', bgcolor: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon sx={{ fontSize: 16, color }} />
      </Box>
    </Box>
    {loading ? (
      <Skeleton width={60} height={36} />
    ) : (
      <>
        <Typography sx={{ fontSize: '2rem', fontWeight: 800, color: adminColors.text, lineHeight: 1 }}>
          {value}
        </Typography>
        {value === 0 && emptyLabel && (
          <Typography sx={{ fontSize: '0.75rem', color: adminColors.textMuted }}>{emptyLabel}</Typography>
        )}
      </>
    )}
  </Box>
);

/* ── Page Header ── */
const PageHeader = ({
  title, description, actions,
}: {
  title: string; description?: string; actions?: React.ReactNode;
}) => (
  <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 3, gap: 2, flexWrap: 'wrap' }}>
    <Box>
      <Typography sx={{ fontSize: '1.5rem', fontWeight: 800, color: adminColors.text, letterSpacing: '-0.02em', mb: 0.25 }}>
        {title}
      </Typography>
      {description && (
        <Typography sx={{ fontSize: '0.875rem', color: adminColors.textMuted }}>{description}</Typography>
      )}
    </Box>
    {actions && <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>{actions}</Box>}
  </Box>
);

/* ════════════════════════════════════════════════════════════ */
export const AdminDashboardPage = () => {
  const [stats, setStats] = useState({ totalRegistrations: 0, submittedCount: 0, verifiedCount: 0, publicProfilesCount: 0, publishedTeamsCount: 0 });
  const [registrations, setRegistrations] = useState<RegistrationItem[]>([]);
  const [loadingRegs, setLoadingRegs] = useState(false);
  const [loadingStats, setLoadingStats] = useState(false);
  const [selectedReg, setSelectedReg] = useState<RegistrationItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [openAt, setOpenAt] = useState('2026-08-01T00:00');
  const [closeAt, setCloseAt] = useState('2026-08-15T23:59');
  const [statusOverride, setStatusOverride] = useState<'auto' | 'open' | 'paused' | 'closed'>('auto');
  const [configSaving, setConfigSaving] = useState(false);
  const [configSuccess, setConfigSuccess] = useState(false);
  const [configError, setConfigError] = useState('');
  const [activeSection, setActiveSection] = useState<'registrations' | 'settings'>('registrations');

  const fetchData = useCallback(async () => {
    setLoadingStats(true);
    setLoadingRegs(true);
    try {
      const [sumRes, regRes, cfgRes] = await Promise.all([
        fetch('/api/v1/admin/dashboard/summary'),
        fetch('/api/v1/admin/registrations'),
        fetch('/api/v1/admin/competition/config'),
      ]);

      const sumData = await sumRes.json();
      if (sumData.success) setStats(sumData.data);

      const regData = await regRes.json();
      if (regData.success) setRegistrations(regData.data);

      const cfgData = await cfgRes.json();
      if (cfgData.success && cfgData.data) {
        if (cfgData.data.openAt) setOpenAt(cfgData.data.openAt.slice(0, 16));
        if (cfgData.data.closeAt) setCloseAt(cfgData.data.closeAt.slice(0, 16));
        setStatusOverride(cfgData.data.statusOverride || 'auto');
      }
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoadingStats(false);
      setLoadingRegs(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleExport = () => {
    if (registrations.length === 0) return;
    window.open('/api/v1/admin/registrations/export', '_blank');
  };

  const handleVerify = (id: string) => {
    setRegistrations((prev) => prev.map((r) => r.id === id ? { ...r, status: 'VERIFIED' } : r));
    setStats((prev) => ({ ...prev, submittedCount: Math.max(0, prev.submittedCount - 1), verifiedCount: prev.verifiedCount + 1 }));
  };

  const handleReject = (id: string) => {
    setRegistrations((prev) => prev.map((r) => r.id === id ? { ...r, status: 'REJECTED' } : r));
  };

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setConfigError('');

    if (new Date(closeAt) <= new Date(openAt)) {
      setConfigError('Thời gian đóng phải sau thời gian mở đăng ký.');
      return;
    }

    setConfigSaving(true);
    try {
      const res = await fetch('/api/v1/admin/competition/config', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          openAt: new Date(openAt).toISOString(),
          closeAt: new Date(closeAt).toISOString(),
          statusOverride: statusOverride === 'auto' ? null : statusOverride,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setConfigSuccess(true);
        setTimeout(() => setConfigSuccess(false), 4000);
      } else {
        setConfigError('Lưu cấu hình thất bại. Vui lòng thử lại.');
      }
    } catch {
      setConfigError('Lỗi kết nối. Vui lòng thử lại.');
    } finally {
      setConfigSaving(false);
    }
  };

  const formatDate = (iso: string) => {
    try {
      return new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Ho_Chi_Minh' }).format(new Date(iso));
    } catch { return iso; }
  };

  const sectionBtnSx = (active: boolean) => ({
    textTransform: 'none',
    fontWeight: active ? 700 : 500,
    fontSize: '0.875rem',
    color: active ? adminColors.primary : adminColors.textMuted,
    bgcolor: active ? adminColors.primaryLight : 'transparent',
    border: `1px solid ${active ? adminColors.primaryBorder : adminColors.border}`,
    borderRadius: adminRadius.button,
    px: 2.25,
    py: 0.875,
    '&:hover': { bgcolor: adminColors.surfaceHover, color: adminColors.primary },
  });

  return (
    <Box>
      <PageHeader
        title="Tổng quan cuộc thi"
        description="Kiểm tra trạng thái đăng ký, hồ sơ cần xử lý và cấu hình hệ thống."
        actions={
          <>
            <Button
              variant="outlined"
              size="small"
              startIcon={<RefreshRoundedIcon sx={{ fontSize: '0.9rem !important' }} />}
              onClick={fetchData}
              sx={{ textTransform: 'none', fontSize: '0.8125rem', borderColor: adminColors.border, color: adminColors.textSecondary, borderRadius: adminRadius.button, '&:hover': { borderColor: adminColors.primary, color: adminColors.primary, bgcolor: adminColors.primaryLight } }}
            >
              Làm mới
            </Button>
            <Tooltip title={registrations.length === 0 ? 'Không có dữ liệu để xuất' : 'Xuất danh sách Excel'}>
              <span>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<FileDownloadRoundedIcon sx={{ fontSize: '0.9rem !important' }} />}
                  onClick={handleExport}
                  disabled={registrations.length === 0}
                  sx={{ textTransform: 'none', fontSize: '0.8125rem', bgcolor: adminColors.primary, borderRadius: adminRadius.button, boxShadow: 'none', '&:hover': { bgcolor: adminColors.primaryHover, boxShadow: 'none' } }}
                >
                  Xuất Excel
                </Button>
              </span>
            </Tooltip>
          </>
        }
      />

      {/* ── KPI Row ── */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Tổng hồ sơ', value: stats.totalRegistrations, icon: AssignmentRoundedIcon, color: adminColors.primary, emptyLabel: 'Chưa có hồ sơ' },
          { label: 'Chờ xét duyệt', value: stats.submittedCount, icon: HourglassTopRoundedIcon, color: adminColors.warning, emptyLabel: 'Không có mục chờ' },
          { label: 'Đã xác minh', value: stats.verifiedCount, icon: TaskAltRoundedIcon, color: adminColors.success, emptyLabel: 'Chưa có hồ sơ xác minh' },
          { label: 'Hồ sơ công khai', value: stats.publicProfilesCount, icon: PublicRoundedIcon, color: adminColors.info, emptyLabel: 'Chưa có hồ sơ công khai' },
          { label: 'Đội đã xuất bản', value: stats.publishedTeamsCount, icon: GroupsRoundedIcon, color: '#6E56CF', emptyLabel: 'Chưa có đội xuất bản' },
        ].map((kpi) => (
          <Grid key={kpi.label} size={{ xs: 6, sm: 4, md: 2.4 }}>
            <KpiCard {...kpi} loading={loadingStats} />
          </Grid>
        ))}
      </Grid>

      {/* ── Section Tabs ── */}
      <Box sx={{ display: 'flex', gap: 1, mb: 2.5 }}>
        <Button sx={sectionBtnSx(activeSection === 'registrations')} onClick={() => setActiveSection('registrations')}>
          Hồ sơ đăng ký
        </Button>
        <Button sx={sectionBtnSx(activeSection === 'settings')} onClick={() => setActiveSection('settings')}>
          Cấu hình thời gian
        </Button>
      </Box>

      {/* ═══ REGISTRATION TABLE ═══ */}
      {activeSection === 'registrations' && (
        <Box
          sx={{
            bgcolor: adminColors.surface,
            border: `1px solid ${adminColors.border}`,
            borderRadius: adminRadius.cardLg,
            boxShadow: adminShadow.card,
            overflow: 'hidden',
          }}
        >
          <Box sx={{ px: 3, py: 2.25, borderBottom: `1px solid ${adminColors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography sx={{ fontWeight: 700, fontSize: '0.9375rem', color: adminColors.text }}>
              Danh sách hồ sơ đăng ký
            </Typography>
            <Typography sx={{ fontSize: '0.8125rem', color: adminColors.textMuted }}>
              Dữ liệu thực từ database
            </Typography>
          </Box>

          {loadingRegs ? (
            <Box sx={{ p: 3 }}>
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} height={52} sx={{ mb: 1, borderRadius: '8px' }} />
              ))}
            </Box>
          ) : registrations.length === 0 ? (
            <Box sx={{ py: 8, textAlign: 'center' }}>
              <AssignmentRoundedIcon sx={{ fontSize: 40, color: adminColors.textDisabled, mb: 1.5 }} />
              <Typography sx={{ fontWeight: 700, fontSize: '0.9375rem', color: adminColors.textSecondary, mb: 0.5 }}>
                Chưa có hồ sơ đăng ký
              </Typography>
              <Typography sx={{ fontSize: '0.8125rem', color: adminColors.textMuted, maxWidth: 320, mx: 'auto' }}>
                Các hồ sơ mới sẽ xuất hiện tại đây khi cổng đăng ký mở và thí sinh nộp hồ sơ.
              </Typography>
            </Box>
          ) : (
            <Box sx={{ overflowX: 'auto' }}>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ '& .MuiTableCell-head': { bgcolor: adminColors.surfaceMuted, fontWeight: 700, fontSize: '0.75rem', color: adminColors.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em', py: 1.5, borderBottom: `1px solid ${adminColors.border}` } }}>
                    <TableCell>Mã hồ sơ</TableCell>
                    <TableCell>Tên đội</TableCell>
                    <TableCell align="center">Thành viên</TableCell>
                    <TableCell>Nhóm bài toán</TableCell>
                    <TableCell>Ngày nộp</TableCell>
                    <TableCell>Trạng thái</TableCell>
                    <TableCell align="center">Thao tác</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {registrations.map((reg) => (
                    <TableRow
                      key={reg.id}
                      hover
                      sx={{ cursor: 'pointer', '& .MuiTableCell-root': { fontSize: '0.8125rem', color: adminColors.text, py: 1.5, borderBottom: `1px solid ${adminColors.border}` }, '&:last-child .MuiTableCell-root': { borderBottom: 'none' }, '&:hover': { bgcolor: adminColors.surfaceHover } }}
                      onClick={() => { setSelectedReg(reg); setModalOpen(true); }}
                    >
                      <TableCell>
                        <Typography sx={{ fontSize: '0.8125rem', fontWeight: 700, color: adminColors.primary, fontFamily: 'monospace' }}>
                          {reg.registrationCode || reg.id.slice(0, 8).toUpperCase()}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>{reg.data.teamName}</TableCell>
                      <TableCell align="center">{reg.data.teamSize}</TableCell>
                      <TableCell>
                        <Typography sx={{ fontSize: '0.75rem', color: adminColors.textSecondary }}>
                          {reg.data.challengeCategories?.[0] || '—'}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ color: adminColors.textMuted, whiteSpace: 'nowrap' }}>{formatDate(reg.submittedAt)}</TableCell>
                      <TableCell><StatusBadge status={reg.status} /></TableCell>
                      <TableCell align="center" onClick={(e) => e.stopPropagation()}>
                        <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                          <Tooltip title="Xem chi tiết">
                            <IconButton size="small" onClick={() => { setSelectedReg(reg); setModalOpen(true); }} sx={{ color: adminColors.primary, '&:hover': { bgcolor: adminColors.primaryLight }, borderRadius: '6px' }}>
                              <VisibilityRoundedIcon sx={{ fontSize: 16 }} />
                            </IconButton>
                          </Tooltip>
                          {reg.status === 'SUBMITTED' && (
                            <>
                              <Tooltip title="Xác minh">
                                <IconButton size="small" onClick={() => handleVerify(reg.id)} sx={{ color: adminColors.success, '&:hover': { bgcolor: adminColors.successBg }, borderRadius: '6px' }}>
                                  <CheckCircleRoundedIcon sx={{ fontSize: 16 }} />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Từ chối">
                                <IconButton size="small" onClick={() => handleReject(reg.id)} sx={{ color: adminColors.danger, '&:hover': { bgcolor: adminColors.dangerBg }, borderRadius: '6px' }}>
                                  <CancelRoundedIcon sx={{ fontSize: 16 }} />
                                </IconButton>
                              </Tooltip>
                            </>
                          )}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          )}
        </Box>
      )}

      {/* ═══ COMPETITION SETTINGS ═══ */}
      {activeSection === 'settings' && (
        <Box
          sx={{
            bgcolor: adminColors.surface,
            border: `1px solid ${adminColors.border}`,
            borderRadius: adminRadius.cardLg,
            boxShadow: adminShadow.card,
            overflow: 'hidden',
          }}
        >
          <Box sx={{ px: 3, py: 2.25, borderBottom: `1px solid ${adminColors.border}` }}>
            <Typography sx={{ fontWeight: 700, fontSize: '0.9375rem', color: adminColors.text }}>
              Cấu hình thời gian đăng ký
            </Typography>
            <Typography sx={{ fontSize: '0.8125rem', color: adminColors.textMuted, mt: 0.25 }}>
              Thời gian được áp dụng theo giờ Việt Nam (Asia/Ho_Chi_Minh · UTC+07:00)
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSaveConfig} sx={{ p: 3 }}>
            {configError && (
              <Alert severity="error" sx={{ mb: 2.5, borderRadius: '10px', fontSize: '0.825rem', bgcolor: adminColors.dangerBg, '& .MuiAlert-icon': { color: adminColors.danger } }}>
                {configError}
              </Alert>
            )}
            {configSuccess && (
              <Alert severity="success" sx={{ mb: 2.5, borderRadius: '10px', fontSize: '0.825rem', bgcolor: adminColors.successBg, '& .MuiAlert-icon': { color: adminColors.success } }}>
                Cấu hình đã được lưu thành công.
              </Alert>
            )}

            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography sx={{ fontSize: '0.8125rem', fontWeight: 700, color: adminColors.textSecondary, mb: 1 }}>
                  Thời gian mở đăng ký
                </Typography>
                <TextField
                  type="datetime-local"
                  fullWidth
                  value={openAt}
                  onChange={(e) => { setOpenAt(e.target.value); setConfigError(''); }}
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': { borderRadius: adminRadius.input, '& fieldset': { borderColor: adminColors.border }, '&.Mui-focused fieldset': { borderColor: adminColors.primary } },
                    '& input': { fontSize: '0.875rem', color: adminColors.text },
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography sx={{ fontSize: '0.8125rem', fontWeight: 700, color: adminColors.textSecondary, mb: 1 }}>
                  Thời gian đóng đăng ký
                </Typography>
                <TextField
                  type="datetime-local"
                  fullWidth
                  value={closeAt}
                  onChange={(e) => { setCloseAt(e.target.value); setConfigError(''); }}
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': { borderRadius: adminRadius.input, '& fieldset': { borderColor: adminColors.border }, '&.Mui-focused fieldset': { borderColor: adminColors.primary } },
                    '& input': { fontSize: '0.875rem', color: adminColors.text },
                  }}
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 3, borderColor: adminColors.border }} />

            <FormControl component="fieldset">
              <FormLabel sx={{ fontSize: '0.8125rem', fontWeight: 700, color: adminColors.textSecondary, mb: 1.5, '&.Mui-focused': { color: adminColors.textSecondary } }}>
                Ghi đè trạng thái
              </FormLabel>
              <RadioGroup
                value={statusOverride}
                onChange={(e) => setStatusOverride(e.target.value as 'auto' | 'open' | 'paused' | 'closed')}
                sx={{ display: 'flex', flexDirection: 'row', gap: 2, flexWrap: 'wrap' }}
              >
                {[
                  { value: 'auto', label: 'Tự động theo thời gian' },
                  { value: 'open', label: 'Bắt buộc mở' },
                  { value: 'paused', label: 'Tạm dừng' },
                  { value: 'closed', label: 'Bắt buộc đóng' },
                ].map((opt) => (
                  <FormControlLabel
                    key={opt.value}
                    value={opt.value}
                    control={<Radio size="small" sx={{ color: adminColors.border, '&.Mui-checked': { color: adminColors.primary } }} />}
                    label={<Typography sx={{ fontSize: '0.875rem', color: adminColors.text }}>{opt.label}</Typography>}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            {/* Impact preview */}
            <Box sx={{ mt: 2.5, p: 2, bgcolor: adminColors.infoBg, border: `1px solid ${adminColors.infoBorder}`, borderRadius: '10px', display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
              <InfoOutlinedIcon sx={{ fontSize: 18, color: adminColors.info, flexShrink: 0, mt: 0.1 }} />
              <Typography sx={{ fontSize: '0.8125rem', color: adminColors.info, lineHeight: 1.6 }}>
                Thay đổi này sẽ ảnh hưởng tới: Countdown Hero, trang đăng ký, Navbar CTA, Quick Facts và Final CTA. Kiểm tra lại website sau khi lưu.
              </Typography>
            </Box>

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                type="submit"
                variant="contained"
                disabled={configSaving}
                startIcon={<SaveRoundedIcon sx={{ fontSize: '0.9rem !important' }} />}
                sx={{
                  textTransform: 'none',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  bgcolor: adminColors.primary,
                  color: '#FFFFFF',
                  borderRadius: adminRadius.button,
                  px: 3,
                  py: 1.125,
                  boxShadow: 'none',
                  '&:hover': { bgcolor: adminColors.primaryHover, boxShadow: 'none' },
                  '&:disabled': { opacity: 0.65 },
                }}
              >
                {configSaving ? 'Đang lưu...' : 'Lưu thay đổi'}
              </Button>
            </Box>
          </Box>
        </Box>
      )}

      {/* Detail Modal */}
      {selectedReg && (
        <RegistrationDetailModal
          open={modalOpen}
          registration={selectedReg}
          onClose={() => { setModalOpen(false); setSelectedReg(null); }}
        />
      )}
    </Box>
  );
};

export default AdminDashboardPage;
