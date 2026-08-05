import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Row,
  Col,
  Statistic,
  Table,
  Button,
  Input,
  Select,
  Tag,
  Space,
  Typography,
  Popconfirm,
  Segmented,
  Form,
  Input as AntInput,
  Radio,
  Tooltip,
  Badge,
  message,
} from 'antd';
import {
  FileTextOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  GlobalOutlined,
  TeamOutlined,
  ReloadOutlined,
  DownloadOutlined,
  EyeOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  SearchOutlined,
  SettingOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';
import { RegistrationDetailModal } from '@/components/admin/RegistrationDetailModal';
import { env } from '@/config/env';
import { useAdminUser } from '@/layouts/AdminContext';
import type { PublicTeamProfile } from '@/types/publicTeam';

const { Title, Text } = Typography;

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
    otherChallengeCategory?: string;
    featuredProject: string;
    members: TeamMember[];
  };
}

export type AdminSection = 'overview' | 'registrations' | 'teams' | 'settings';

const SECTION_ROUTES: Record<AdminSection, string> = {
  overview: '/admin/dashboard',
  registrations: '/admin/registrations',
  teams: '/admin/teams',
  settings: '/admin/settings',
};

const CATEGORY_LABEL_MAP: Record<string, string> = {
  business: 'Kinh tế & Kinh doanh',
  technology: 'Công nghệ',
  marketing: 'Marketing',
  media: 'Truyền thông',
  communications: 'Truyền thông',
  other: 'Khác',
};

const STATUS_TAG_MAP: Record<string, { label: string; color: string }> = {
  SUBMITTED: { label: 'Mới Nộp', color: 'warning' },
  VERIFIED: { label: 'Đã Duyệt', color: 'success' },
  REJECTED: { label: 'Từ Chối', color: 'error' },
  UNDER_REVIEW: { label: 'Đang Xét', color: 'processing' },
  NEEDS_REVISION: { label: 'Cần Bổ Sung', color: 'warning' },
  DRAFT: { label: 'Nháp', color: 'default' },
};

const authFetch = (path: string, init?: RequestInit) =>
  fetch(path, { ...init, credentials: 'include' });

export const AdminDashboardPage = ({ section = 'overview' }: { section?: AdminSection } = {}) => {
  const navigate = useNavigate();
  const contentSection: 'registrations' | 'teams' | 'settings' = section === 'overview' ? 'registrations' : section;
  const { user } = useAdminUser();

  const [stats, setStats] = useState({
    totalRegistrations: 0,
    submittedCount: 0,
    verifiedCount: 0,
    publicProfilesCount: 0,
    publishedTeamsCount: 0,
  });
  const [registrations, setRegistrations] = useState<RegistrationItem[]>([]);
  const [teams, setTeams] = useState<PublicTeamProfile[]>([]);
  const [loadingRegs, setLoadingRegs] = useState(false);
  const [loadingStats, setLoadingStats] = useState(false);
  const [loadingTeams, setLoadingTeams] = useState(false);
  const [selectedReg, setSelectedReg] = useState<RegistrationItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [openAt, setOpenAt] = useState('2026-08-01T00:00');
  const [closeAt, setCloseAt] = useState('2026-08-15T23:59');
  const [statusOverride, setStatusOverride] = useState<'auto' | 'open' | 'paused' | 'closed' | 'live' | 'completed'>('auto');
  const [configSaving, setConfigSaving] = useState(false);
  const [reviewingId, setReviewingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Filters
  const [regSearch, setRegSearch] = useState('');
  const [regStatusFilter, setRegStatusFilter] = useState<string>('ALL');
  const [regCategoryFilter, setRegCategoryFilter] = useState<string>('ALL');

  const hasPermission = useCallback((permission: string) => Boolean(user?.permissions?.includes(permission)), [user]);

  const formatToLocalDatetime = useCallback((iso: string): string => {
    try {
      const d = new Date(iso);
      const pad = (n: number) => String(n).padStart(2, '0');
      return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
    } catch {
      return iso.slice(0, 16);
    }
  }, []);

  const fetchData = useCallback(async () => {
    setLoadingStats(true);
    setLoadingRegs(true);
    setLoadingTeams(true);
    try {
      const requests = [
        authFetch(`${env.apiBaseUrl}/v1/admin/dashboard/summary`),
        authFetch(`${env.apiBaseUrl}/v1/admin/registrations`),
        hasPermission('competition.read')
          ? authFetch(`${env.apiBaseUrl}/v1/admin/competition/config`)
          : Promise.resolve(null),
        authFetch(`${env.apiBaseUrl}/v1/admin/teams`),
      ] as const;

      const [sumRes, regRes, cfgRes, teamsRes] = await Promise.all(requests);

      if (sumRes?.status === 401 || regRes?.status === 401 || cfgRes?.status === 401 || teamsRes?.status === 401) {
        localStorage.removeItem('picc_admin_user');
        navigate('/admin', { replace: true });
        return;
      }

      const sumData = await sumRes!.json();
      if (sumData.success) setStats(sumData.data);

      const regData = await regRes!.json();
      if (regData.success) setRegistrations(regData.data);

      if (cfgRes) {
        const cfgData = await cfgRes.json();
        if (cfgData.success && cfgData.data) {
          if (cfgData.data.openAt) setOpenAt(formatToLocalDatetime(cfgData.data.openAt));
          if (cfgData.data.closeAt) setCloseAt(formatToLocalDatetime(cfgData.data.closeAt));
          if (cfgData.data.statusOverride) setStatusOverride(cfgData.data.statusOverride);
        }
      }

      const teamsData = await teamsRes!.json();
      if (teamsData.success) setTeams(teamsData.data.teams || []);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoadingStats(false);
      setLoadingRegs(false);
      setLoadingTeams(false);
    }
  }, [formatToLocalDatetime, hasPermission, navigate]);

  useEffect(() => {
    // Initial load on mount; the loading flags are flipped inside fetchData.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchData();
  }, [fetchData]);

  const handleExport = async () => {
    if (registrations.length === 0) return;
    try {
      const res = await authFetch(`${env.apiBaseUrl}/v1/admin/registrations/export`);
      if (!res.ok) {
        message.error('Không thể xuất dữ liệu.');
        return;
      }
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `PICC_Registrations_${new Date().toISOString().slice(0, 10)}.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      message.success('Đã xuất tập tin Excel thành công!');
    } catch (err) {
      console.error('Export error:', err);
      message.error('Có lỗi xảy ra khi xuất Excel.');
    }
  };

  const reviewRegistration = useCallback(
    async (id: string, status: 'VERIFIED' | 'REJECTED', rejectionReason?: string) => {
      setReviewingId(id);
      try {
        const res = await authFetch(`${env.apiBaseUrl}/v1/admin/registrations/${id}/status`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status, rejectionReason }),
        });

        if (res.status === 401) {
          localStorage.removeItem('picc_admin_user');
          navigate('/admin', { replace: true });
          return;
        }

        const body = await res.json();
        if (!res.ok || !body.success) {
          message.error(body?.error?.message ?? 'Không thể cập nhật trạng thái.');
          return;
        }

        message.success(status === 'VERIFIED' ? 'Đã duyệt hồ sơ thành công!' : 'Đã từ chối hồ sơ.');
        await fetchData();
      } catch {
        message.error('Không thể kết nối máy chủ.');
      } finally {
        setReviewingId(null);
      }
    },
    [fetchData, navigate],
  );

  const handleVerify = (id: string) => {
    void reviewRegistration(id, 'VERIFIED');
  };

  const handleReject = (id: string) => {
    const reason = window.prompt('Lý do từ chối hồ sơ (bắt buộc):')?.trim();
    if (!reason) return;
    void reviewRegistration(id, 'REJECTED', reason);
  };

  const handleDeleteRegistration = useCallback(
    async (id: string) => {
      setDeletingId(id);
      try {
        const res = await authFetch(`${env.apiBaseUrl}/v1/admin/registrations/${id}`, {
          method: 'DELETE',
        });
        const body = await res.json();
        if (!res.ok || !body.success) {
          message.error(body?.error?.message ?? 'Không thể xóa hồ sơ.');
          return;
        }
        message.success('Đã xóa vĩnh viễn hồ sơ đăng ký!');
        if (selectedReg?.id === id) {
          setModalOpen(false);
          setSelectedReg(null);
        }
        await fetchData();
      } catch {
        message.error('Không thể kết nối máy chủ để xóa hồ sơ.');
      } finally {
        setDeletingId(null);
      }
    },
    [fetchData, selectedReg],
  );

  const handleSaveConfig = async () => {
    if (new Date(closeAt) <= new Date(openAt)) {
      message.error('Thời gian đóng phải sau thời gian mở đăng ký.');
      return;
    }

    setConfigSaving(true);
    try {
      const res = await authFetch(`${env.apiBaseUrl}/v1/admin/competition/config`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          openAt: new Date(openAt).toISOString(),
          closeAt: new Date(closeAt).toISOString(),
          statusOverride,
        }),
      });

      if (res.status === 401) {
        localStorage.removeItem('picc_admin_user');
        navigate('/admin', { replace: true });
        return;
      }

      const body = await res.json();
      if (!res.ok || !body.success) {
        message.error(body?.error?.message ?? 'Lưu cấu hình thất bại.');
        return;
      }

      message.success('Đã cập nhật cấu hình cuộc thi thành công!');
      await fetchData();
    } catch {
      message.error('Không thể kết nối máy chủ.');
    } finally {
      setConfigSaving(false);
    }
  };

  const filteredRegistrations = useMemo(() => {
    return registrations.filter((reg) => {
      if (regStatusFilter !== 'ALL' && reg.status !== regStatusFilter) return false;

      if (regCategoryFilter !== 'ALL') {
        const cats = reg.data.challengeCategories?.map((c) => c.toLowerCase()) || [];
        if (!cats.includes(regCategoryFilter.toLowerCase())) return false;
      }

      const q = regSearch.trim().toLowerCase();
      if (!q) return true;

      const code = (reg.registrationCode || reg.id).toLowerCase();
      const teamName = (reg.data.teamName || '').toLowerCase();
      const catText = (reg.data.challengeCategories?.join(' ') || '').toLowerCase();

      const memberMatch = reg.data.members?.some((m) => {
        return (
          (m.fullName || '').toLowerCase().includes(q) ||
          (m.studentId || '').toLowerCase().includes(q) ||
          (m.email || '').toLowerCase().includes(q) ||
          (m.phone || '').toLowerCase().includes(q) ||
          (m.major || '').toLowerCase().includes(q)
        );
      });

      return code.includes(q) || teamName.includes(q) || catText.includes(q) || memberMatch;
    });
  }, [registrations, regSearch, regStatusFilter, regCategoryFilter]);

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return iso;
    }
  };

  // Ant Design Table Columns for Registrations
  const regColumns = [
    {
      title: 'MÃ HỒ SƠ',
      dataIndex: 'registrationCode',
      key: 'code',
      render: (_: string, record: RegistrationItem) => (
        <Text code style={{ fontWeight: 700, color: '#1677ff', fontSize: 13 }}>
          {record.registrationCode || record.id.slice(0, 8).toUpperCase()}
        </Text>
      ),
    },
    {
      title: 'TÊN ĐỘI THI',
      dataIndex: ['data', 'teamName'],
      key: 'teamName',
      render: (text: string) => <Text style={{ fontWeight: 700, color: '#0F2A52' }}>{text}</Text>,
    },
    {
      title: 'THÀNH VIÊN',
      dataIndex: ['data', 'teamSize'],
      key: 'teamSize',
      align: 'center' as const,
      render: (size: number) => <Badge count={`${size} người`} style={{ backgroundColor: '#52C41A', fontWeight: 700 }} />,
    },
    {
      title: 'NHÓM BÀI TOÁN',
      dataIndex: ['data', 'challengeCategories'],
      key: 'category',
      render: (cats: string[], record: RegistrationItem) => {
        const cat = cats?.[0];
        const label = cat ? CATEGORY_LABEL_MAP[cat.toLowerCase()] || cat : '—';
        return (
          <Tag color="blue" style={{ fontWeight: 600 }}>
            {cat?.toLowerCase() === 'other' && record.data.otherChallengeCategory ? `Khác: ${record.data.otherChallengeCategory}` : label}
          </Tag>
        );
      },
    },
    {
      title: 'NGÀY NỘP',
      dataIndex: 'submittedAt',
      key: 'submittedAt',
      render: (date: string) => <Text type="secondary" style={{ fontSize: 12 }}>{formatDate(date)}</Text>,
    },
    {
      title: 'TRẠNG THÁI',
      dataIndex: 'status',
      key: 'status',
      render: (st: string) => {
        const cfg = STATUS_TAG_MAP[st] ?? STATUS_TAG_MAP.SUBMITTED!;
        return <Tag color={cfg.color} style={{ fontWeight: 700 }}>{cfg.label}</Tag>;
      },
    },
    {
      title: 'THAO TÁC',
      key: 'actions',
      align: 'center' as const,
      render: (_: unknown, record: RegistrationItem) => (
        <Space size="small" onClick={(e) => e.stopPropagation()}>
          <Tooltip title="Xem chi tiết">
            <Button
              type="text"
              icon={<EyeOutlined style={{ color: '#1677ff' }} />}
              onClick={() => {
                setSelectedReg(record);
                setModalOpen(true);
              }}
            />
          </Tooltip>

          {hasPermission('registration.review') && record.status === 'SUBMITTED' && (
            <>
              <Tooltip title="Duyệt hồ sơ">
                <Button
                  type="text"
                  loading={reviewingId === record.id}
                  icon={<CheckCircleOutlined style={{ color: '#52C41A' }} />}
                  onClick={() => handleVerify(record.id)}
                />
              </Tooltip>
              <Tooltip title="Từ chối">
                <Button
                  type="text"
                  loading={reviewingId === record.id}
                  icon={<CloseCircleOutlined style={{ color: '#FF4D4F' }} />}
                  onClick={() => handleReject(record.id)}
                />
              </Tooltip>
            </>
          )}

          {hasPermission('registration.review') && (
            <Popconfirm
              title="Xóa vĩnh viễn hồ sơ?"
              description={`Bạn có chắc chắn muốn xóa hồ sơ đội "${record.data.teamName}"?`}
              onConfirm={() => void handleDeleteRegistration(record.id)}
              okText="Xóa"
              cancelText="Hủy"
              okButtonProps={{ danger: true }}
            >
              <Tooltip title="Xóa vĩnh viễn">
                <Button type="text" danger icon={<DeleteOutlined />} loading={deletingId === record.id} />
              </Tooltip>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  // Ant Design Table Columns for Public Teams
  const teamColumns = [
    {
      title: 'TÊN ĐỘI THI',
      dataIndex: 'teamName',
      key: 'teamName',
      render: (text: string) => <Text style={{ fontWeight: 700, color: '#0F2A52' }}>{text}</Text>,
    },
    {
      title: 'NHÓM BÀI TOÁN',
      dataIndex: 'challengeCategoryLabel',
      key: 'category',
      render: (cat: string, record: PublicTeamProfile) => (
        <Tag color="cyan" style={{ fontWeight: 600 }}>{cat || record.challengeCategory}</Tag>
      ),
    },
    {
      title: 'QUY MÔ',
      dataIndex: 'teamSize',
      key: 'teamSize',
      align: 'center' as const,
      render: (size: number) => <Badge count={`${size} người`} style={{ backgroundColor: '#1677ff' }} />,
    },
    {
      title: 'VÒNG THI',
      dataIndex: 'statusLabel',
      key: 'round',
      render: (label: string, record: PublicTeamProfile) => (
        <Tag color="green" style={{ fontWeight: 700 }}>{label || record.competitionStatus}</Tag>
      ),
    },
    {
      title: 'XUẤT BẢN',
      dataIndex: ['publication', 'status'],
      key: 'pubStatus',
      render: (st: string) => <Tag color="purple">{st}</Tag>,
    },
    {
      title: 'NGÀY CẬP NHẬT',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (date: string) => <Text type="secondary" style={{ fontSize: 12 }}>{formatDate(date)}</Text>,
    },
  ];

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto' }}>
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <Title level={3} style={{ margin: 0, color: '#0F2A52', fontWeight: 800 }}>
            Quản Trị Cuộc Thi PICC 2026
          </Title>
          <Text type="secondary">Bảng điều khiển thực hiện tác vụ xét duyệt hồ sơ và xuất bản đội thi.</Text>
        </div>

        <Space wrap>
          <Button icon={<ReloadOutlined />} onClick={() => void fetchData()} loading={loadingStats}>
            Làm mới
          </Button>

          {contentSection === 'registrations' && hasPermission('registration.export') && (
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              onClick={handleExport}
              disabled={registrations.length === 0}
              style={{ background: '#0F2A52', borderColor: '#0F2A52' }}
            >
              Xuất Excel
            </Button>
          )}
        </Space>
      </div>

      {/* KPI Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <Card size="small" hoverable style={{ borderRadius: 12, borderColor: '#E2E8F0' }}>
            <Statistic
              title={<Text type="secondary" style={{ fontSize: 12, fontWeight: 700 }}>TỔNG HỒ SƠ NỘP</Text>}
              value={stats.totalRegistrations}
              valueStyle={{ fontWeight: 800, color: '#0F2A52' }}
              prefix={<FileTextOutlined style={{ color: '#1677ff', marginRight: 8 }} />}
              loading={loadingStats}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card size="small" hoverable style={{ borderRadius: 12, borderColor: '#E2E8F0' }}>
            <Statistic
              title={<Text type="secondary" style={{ fontSize: 12, fontWeight: 700 }}>MỚI NỘP - CHỜ DUYỆT</Text>}
              value={stats.submittedCount}
              valueStyle={{ fontWeight: 800, color: '#D97706' }}
              prefix={<ClockCircleOutlined style={{ color: '#FAAD14', marginRight: 8 }} />}
              loading={loadingStats}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card size="small" hoverable style={{ borderRadius: 12, borderColor: '#E2E8F0' }}>
            <Statistic
              title={<Text type="secondary" style={{ fontSize: 12, fontWeight: 700 }}>ĐÃ XÁC MINH / DUYỆT</Text>}
              value={stats.verifiedCount}
              valueStyle={{ fontWeight: 800, color: '#059669' }}
              prefix={<CheckCircleOutlined style={{ color: '#52C41A', marginRight: 8 }} />}
              loading={loadingStats}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card size="small" hoverable style={{ borderRadius: 12, borderColor: '#E2E8F0' }}>
            <Statistic
              title={<Text type="secondary" style={{ fontSize: 12, fontWeight: 700 }}>ĐỘI XUẤT BẢN CÔNG KHAI</Text>}
              value={stats.publishedTeamsCount}
              valueStyle={{ fontWeight: 800, color: '#7C3AED' }}
              prefix={<GlobalOutlined style={{ color: '#722ED1', marginRight: 8 }} />}
              loading={loadingStats}
            />
          </Card>
        </Col>
      </Row>

      {/* Segmented Section Navigation */}
      <Segmented
        size="large"
        value={section}
        options={[
          { label: 'Hồ Sơ Đăng Ký', value: 'registrations', icon: <FileTextOutlined /> },
          { label: 'Đội Thi Công Khai', value: 'teams', icon: <TeamOutlined /> },
          ...(hasPermission('competition.read') ? [{ label: 'Cấu Hình Cuộc Thi', value: 'settings', icon: <SettingOutlined /> }] : []),
        ]}
        onChange={(val) => navigate(SECTION_ROUTES[val as AdminSection])}
        style={{ marginBottom: 20, padding: 4, background: '#FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', borderRadius: 10 }}
      />

      {/* ═══ REGISTRATION TABLE SECTION ═══ */}
      {contentSection === 'registrations' && (
        <Card
          title={
            <Space>
              <SafetyCertificateOutlined style={{ color: '#D9232D' }} />
              <Text style={{ fontWeight: 800 }}>Danh Sách Hồ Sơ Đăng Ký</Text>
            </Space>
          }
          extra={
            <Text type="secondary" style={{ fontSize: 12 }}>
              Tổng: <strong>{registrations.length}</strong> | Hiển thị: <strong>{filteredRegistrations.length}</strong>
            </Text>
          }
          style={{ borderRadius: 12, boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}
        >
          {/* Filters Bar */}
          <Card size="small" style={{ marginBottom: 16, background: '#F8FAFC', borderRadius: 10 }}>
            <Row gutter={[12, 12]} align="middle">
              <Col xs={24} md={10}>
                <Input
                  placeholder="Tìm theo Mã đơn, Tên đội, Thí sinh, MSV, Email, SĐT..."
                  prefix={<SearchOutlined style={{ color: '#8C8C8C' }} />}
                  value={regSearch}
                  onChange={(e) => setRegSearch(e.target.value)}
                  allowClear
                />
              </Col>

              <Col xs={12} md={7}>
                <Select
                  style={{ width: '100%' }}
                  value={regStatusFilter}
                  onChange={setRegStatusFilter}
                  options={[
                    { label: `Tất cả trạng thái (${registrations.length})`, value: 'ALL' },
                    { label: `Mới nộp — Chờ duyệt (${registrations.filter((r) => r.status === 'SUBMITTED').length})`, value: 'SUBMITTED' },
                    { label: `Đã xác minh / Duyệt (${registrations.filter((r) => r.status === 'VERIFIED').length})`, value: 'VERIFIED' },
                    { label: `Từ chối (${registrations.filter((r) => r.status === 'REJECTED').length})`, value: 'REJECTED' },
                    { label: `Đang xem xét (${registrations.filter((r) => r.status === 'UNDER_REVIEW').length})`, value: 'UNDER_REVIEW' },
                  ]}
                />
              </Col>

              <Col xs={12} md={7}>
                <Select
                  style={{ width: '100%' }}
                  value={regCategoryFilter}
                  onChange={setRegCategoryFilter}
                  options={[
                    { label: 'Tất cả nhóm bài toán', value: 'ALL' },
                    { label: 'Công nghệ', value: 'technology' },
                    { label: 'Kinh tế & Kinh doanh', value: 'business' },
                    { label: 'Marketing', value: 'marketing' },
                    { label: 'Truyền thông', value: 'communications' },
                    { label: 'Khác', value: 'other' },
                  ]}
                />
              </Col>
            </Row>

            {(regSearch || regStatusFilter !== 'ALL' || regCategoryFilter !== 'ALL') && (
              <div style={{ marginTop: 12, paddingTop: 10, borderTop: '1px dashed #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text type="secondary" style={{ fontSize: 12, fontWeight: 600 }}>
                  🔍 Tìm thấy <strong>{filteredRegistrations.length}</strong> / {registrations.length} kết quả phù hợp.
                </Text>
                <Button
                  type="link"
                  size="small"
                  onClick={() => {
                    setRegSearch('');
                    setRegStatusFilter('ALL');
                    setRegCategoryFilter('ALL');
                  }}
                >
                  Xóa bộ lọc
                </Button>
              </div>
            )}
          </Card>

          <Table
            columns={regColumns}
            dataSource={filteredRegistrations}
            rowKey="id"
            loading={loadingRegs}
            onRow={(record) => ({
              onClick: () => {
                setSelectedReg(record);
                setModalOpen(true);
              },
              style: { cursor: 'pointer' },
            })}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} / ${total} hồ sơ`,
            }}
          />
        </Card>
      )}

      {/* ═══ PUBLIC TEAMS SECTION ═══ */}
      {contentSection === 'teams' && (
        <Card
          title={
            <Space>
              <TeamOutlined style={{ color: '#1677ff' }} />
              <Text style={{ fontWeight: 800 }}>Danh Sách Đội Thi Công Khai</Text>
            </Space>
          }
          extra={<Text type="secondary">Tổng: {teams.length} đội thi đã xuất bản</Text>}
          style={{ borderRadius: 12 }}
        >
          <Table
            columns={teamColumns}
            dataSource={teams}
            rowKey="id"
            loading={loadingTeams}
            pagination={{ pageSize: 10, showSizeChanger: true }}
          />
        </Card>
      )}

      {/* ═══ SETTINGS SECTION ═══ */}
      {contentSection === 'settings' && hasPermission('competition.read') && (
        <Card
          title={
            <Space>
              <SettingOutlined style={{ color: '#722ED1' }} />
              <Text style={{ fontWeight: 800 }}>Cấu Hình Thời Gian &amp; Trạng Thái Cuộc Thi</Text>
            </Space>
          }
          style={{ borderRadius: 12, maxWidth: 800 }}
        >
          <Form layout="vertical" onFinish={handleSaveConfig}>
            <Form.Item label={<Text style={{ fontWeight: 700 }}>Thời gian mở cổng đăng ký (Giờ &amp; Ngày)</Text>}>
              <AntInput type="datetime-local" value={openAt} onChange={(e) => setOpenAt(e.target.value)} />
            </Form.Item>

            <Form.Item label={<Text style={{ fontWeight: 700 }}>Thời gian đóng cổng đăng ký (Giờ &amp; Ngày)</Text>}>
              <AntInput type="datetime-local" value={closeAt} onChange={(e) => setCloseAt(e.target.value)} />
            </Form.Item>

            <Form.Item label={<Text style={{ fontWeight: 700 }}>Ghi đè trạng thái hệ thống (Status Override)</Text>}>
              <Radio.Group value={statusOverride} onChange={(e) => setStatusOverride(e.target.value)}>
                <Space direction="vertical">
                  <Radio value="auto">
                    <strong>Tự động (Auto)</strong> — Hệ thống tự tính theo mốc thời gian mở / đóng
                  </Radio>
                  <Radio value="open">
                    <strong>Bắt buộc mở (Force Open)</strong> — Cho phép nộp đơn bất kể thời gian
                  </Radio>
                  <Radio value="paused">
                    <strong>Tạm dừng (Paused)</strong> — Tạm thời dừng tiếp nhận đơn đăng ký
                  </Radio>
                  <Radio value="closed">
                    <strong>Đóng cổng (Closed)</strong> — Đã hết hạn đăng ký
                  </Radio>
                </Space>
              </Radio.Group>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={configSaving} shape="round" size="large" style={{ background: '#0F2A52', borderColor: '#0F2A52' }}>
                Lưu Thay Đổi Cấu Hình
              </Button>
            </Form.Item>
          </Form>
        </Card>
      )}

      {/* Registration Detail Modal */}
      {selectedReg && (
        <RegistrationDetailModal
          open={modalOpen}
          registration={selectedReg}
          onClose={() => {
            setModalOpen(false);
            setSelectedReg(null);
          }}
          onVerify={hasPermission('registration.review') ? handleVerify : undefined}
          onReject={hasPermission('registration.review') ? handleReject : undefined}
          onDelete={hasPermission('registration.review') ? (id) => void handleDeleteRegistration(id) : undefined}
        />
      )}
    </div>
  );
};

export default AdminDashboardPage;
