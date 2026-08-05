import { useState, useEffect } from 'react';
import { Layout, Menu, Avatar, Dropdown, Button, Space, Typography, Tag, Spin, ConfigProvider, type MenuProps } from 'antd';
import {
  DashboardOutlined,
  FileTextOutlined,
  TeamOutlined,
  SettingOutlined,
  LogoutOutlined,
  UserOutlined,
  BellOutlined,
  SafetyCertificateOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { AdminContext } from './AdminContext';
import { env } from '@/config/env';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

interface AdminUser {
  id: string;
  email: string;
  displayName: string;
  role: string;
  permissions?: string[];
}

const ROLE_LABELS: Record<string, string> = {
  SUPER_ADMIN: 'Super Admin',
  ORGANIZER: 'Ban Tổ chức',
  REVIEWER: 'Người xét duyệt',
  CONTENT_EDITOR: 'Biên tập nội dung',
  VIEWER: 'Chỉ xem',
};

export const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    localStorage.removeItem('picc_admin_token');
    let cancelled = false;

    const validateSession = async () => {
      try {
        const res = await fetch(`${env.apiBaseUrl}/v1/admin/auth/me`, { credentials: 'include' });
        if (!cancelled) {
          if (res.ok) {
            const data = await res.json();
            const u = data?.data?.user;
            if (u?.id && u?.email) {
              setUser({ ...u, permissions: Array.isArray(u.permissions) ? u.permissions : [] });
              return;
            }
          }
          navigate('/admin', { replace: true });
        }
      } catch {
        if (!cancelled) navigate('/admin', { replace: true });
      }
    };

    validateSession();
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await fetch(`${env.apiBaseUrl}/v1/admin/auth/logout`, { method: 'POST', credentials: 'include' });
    } catch {
      // Ignore network errors on logout
    }
    localStorage.removeItem('picc_admin_user');
    navigate('/admin', { replace: true });
  };

  const hasPermission = (permission: string) => Boolean(user?.permissions?.includes(permission));

  if (!user) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC' }}>
        <Space direction="vertical" align="center">
          <Spin size="large" />
          <Text type="secondary" style={{ fontSize: 14 }}>
            Đang xác thực hệ thống Admin...
          </Text>
        </Space>
      </div>
    );
  }

  // Ant Design Menu Items
  const menuItems = [
    {
      key: 'group-operation',
      label: 'ĐIỀU HÀNH',
      type: 'group' as const,
      children: [
        hasPermission('dashboard.read') && {
          key: '/admin/dashboard',
          icon: <DashboardOutlined />,
          label: 'Tổng quan',
          onClick: () => navigate('/admin/dashboard'),
        },
        hasPermission('registration.read') && {
          key: '/admin/registrations',
          icon: <FileTextOutlined />,
          label: 'Hồ sơ đăng ký',
          onClick: () => navigate('/admin/registrations'),
        },
        hasPermission('publicTeam.read') && {
          key: '/admin/teams',
          icon: <TeamOutlined />,
          label: 'Đội thi công khai',
          onClick: () => navigate('/admin/teams'),
        },
      ].filter(Boolean),
    },
    {
      key: 'group-system',
      label: 'HỆ THỐNG',
      type: 'group' as const,
      children: [
        hasPermission('competition.read') && {
          key: '/admin/settings',
          icon: <SettingOutlined />,
          label: 'Cấu hình cuộc thi',
          onClick: () => navigate('/admin/settings'),
        },
      ].filter(Boolean),
    },
  ];

  const userMenuItems = [
    {
      key: 'user-info',
      label: (
        <div style={{ padding: '4px 8px' }}>
          <Text style={{ fontWeight: 700, display: 'block' }}>{user.displayName}</Text>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {user.email}
          </Text>
          <div style={{ marginTop: 4 }}>
            <Tag color="red" style={{ fontWeight: 700 }}>
              {ROLE_LABELS[user.role] || user.role}
            </Tag>
          </div>
        </div>
      ),
    },
    { type: 'divider' as const },
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Hồ sơ cá nhân',
    },
    { type: 'divider' as const },
    {
      key: 'logout',
      icon: <LogoutOutlined style={{ color: '#FF4D4F' }} />,
      label: <Text type="danger">Đăng xuất</Text>,
      onClick: () => void handleLogout(),
    },
  ];

  const currentKey = location.pathname;

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#D9232D',
          borderRadius: 8,
          fontFamily: 'Outfit, system-ui, -apple-system, sans-serif',
        },
      }}
    >
      <AdminContext.Provider value={{ user }}>
        <Layout style={{ minHeight: '100vh' }}>
          {/* Sidebar */}
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            width={240}
            style={{
              background: '#0F2A52',
              boxShadow: '2px 0 8px rgba(0,0,0,0.15)',
              zIndex: 100,
            }}
          >
            {/* Sidebar Logo */}
            <div
              style={{
                height: 64,
                display: 'flex',
                alignItems: 'center',
                padding: collapsed ? '0 16px' : '0 20px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 8,
                  background: '#D9232D',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontSize: 18,
                  fontWeight: 800,
                  flexShrink: 0,
                }}
              >
                <SafetyCertificateOutlined />
              </div>
              {!collapsed && (
                <div>
                  <Text style={{ color: '#FFFFFF', fontWeight: 800, fontSize: 16, display: 'block', lineHeight: 1.2 }}>
                    PICC Admin
                  </Text>
                  <Text style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: 11, letterSpacing: '0.05em' }}>
                    Command Center
                  </Text>
                </div>
              )}
            </div>

            {/* Menu */}
            <Menu
              theme="dark"
              mode="inline"
              selectedKeys={[currentKey]}
              items={menuItems as MenuProps['items']}
              style={{ background: '#0F2A52', marginTop: 12, borderRight: 0 }}
            />
          </Sider>

          {/* Main Layout */}
          <Layout>
            {/* Header */}
            <Header
              style={{
                background: '#FFFFFF',
                padding: '0 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 1px 4px rgba(0,21,41,0.08)',
                zIndex: 99,
                height: 64,
              }}
            >
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{ fontSize: 16, width: 40, height: 40 }}
              />

              <Space size="large">
                <Button type="text" icon={<BellOutlined style={{ fontSize: 18, color: '#64748B' }} />} />

                <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" trigger={['click']}>
                  <Space style={{ cursor: 'pointer', padding: '4px 10px', borderRadius: 8, background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                    <Avatar style={{ backgroundColor: '#D9232D', fontWeight: 700 }}>
                      {user.displayName?.[0] || 'A'}
                    </Avatar>
                    <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
                      <Text style={{ fontWeight: 700, fontSize: 13, display: 'block', color: '#0F172A' }}>
                        {user.displayName}
                      </Text>
                      <Text type="secondary" style={{ fontSize: 11 }}>
                        {ROLE_LABELS[user.role] || user.role}
                      </Text>
                    </div>
                    <DownOutlined style={{ fontSize: 10, color: '#94A3B8' }} />
                  </Space>
                </Dropdown>
              </Space>
            </Header>

            {/* Content */}
            <Content style={{ margin: 24, minHeight: 280 }}>
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </AdminContext.Provider>
    </ConfigProvider>
  );
};

export default AdminLayout;
