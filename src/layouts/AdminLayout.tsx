import { useState, useEffect } from 'react';
import { Box, Typography, Avatar, Tooltip, Button, Menu, MenuItem, Divider, IconButton } from '@mui/material';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import ShieldRoundedIcon from '@mui/icons-material/ShieldRounded';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { adminColors, adminRadius, adminShadow } from '@/theme/adminTokens';
import { AdminContext } from './AdminContext';

interface AdminUser {
  id: string;
  email: string;
  displayName: string;
  role: string;
}

const NAV_GROUPS = [
  {
    label: 'Điều hành',
    items: [
      { label: 'Tổng quan', icon: DashboardRoundedIcon, href: '/admin/dashboard' },
      { label: 'Hồ sơ đăng ký', icon: AssignmentRoundedIcon, href: '/admin/registrations' },
      { label: 'Đội thi công khai', icon: GroupsRoundedIcon, href: '/admin/teams' },
    ],
  },
  {
    label: 'Hệ thống',
    items: [
      { label: 'Cấu hình cuộc thi', icon: SettingsRoundedIcon, href: '/admin/settings' },
    ],
  },
];

const ROLE_LABELS: Record<string, string> = {
  SUPER_ADMIN: 'Super Admin',
  ORGANIZER: 'Ban Tổ chức',
  REVIEWER: 'Người xét duyệt',
  CONTENT_EDITOR: 'Biên tập nội dung',
  VIEWER: 'Chỉ xem',
};

const SIDEBAR_WIDTH = 256;
const SIDEBAR_COLLAPSED_WIDTH = 64;

export const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  useEffect(() => {
    const userStr = localStorage.getItem('picc_admin_user');
    const token = localStorage.getItem('picc_admin_token');
    if (!userStr || !token || token.length < 16) {
      navigate('/admin', { replace: true });
      return;
    }
    try {
      const parsed = JSON.parse(userStr);
      if (!parsed?.id || !parsed?.email) throw new Error('Invalid user data');
      queueMicrotask(() => setUser(parsed));
    } catch {
      localStorage.removeItem('picc_admin_user');
      localStorage.removeItem('picc_admin_token');
      navigate('/admin', { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    setAnchorEl(null);
    localStorage.removeItem('picc_admin_token');
    localStorage.removeItem('picc_admin_user');
    navigate('/admin', { replace: true });
  };

  const isActive = (href: string) => {
    if (href === '/admin/dashboard') return location.pathname === '/admin/dashboard';
    return location.pathname.startsWith(href);
  };

  // Auth guard loading state
  if (!user) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: adminColors.bg }}>
        <Box sx={{ textAlign: 'center' }}>
          <Box sx={{ width: 40, height: 40, border: '3px solid', borderColor: `${adminColors.primary} transparent`, borderRadius: '50%', animation: 'spin 0.8s linear infinite', mx: 'auto', mb: 2, '@keyframes spin': { '0%': { transform: 'rotate(0deg)' }, '100%': { transform: 'rotate(360deg)' } } }} />
          <Typography sx={{ color: adminColors.textMuted, fontSize: '0.875rem' }}>Đang xác thực...</Typography>
        </Box>
      </Box>
    );
  }

  const sidebarW = collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH;

  return (
    <AdminContext.Provider value={{ user }}>
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: adminColors.bg }}>
        {mobileOpen && (
          <Box
            onClick={() => setMobileOpen(false)}
            sx={{
              display: { xs: 'block', md: 'none' },
              position: 'fixed',
              inset: 0,
              zIndex: 1199,
              bgcolor: 'rgba(15, 30, 60, 0.42)',
            }}
          />
        )}
        {/* ═══ SIDEBAR ═══ */}
        <Box
          component="nav"
          aria-label="Điều hướng quản trị"
          sx={{
            width: { xs: SIDEBAR_WIDTH, md: sidebarW },
            minHeight: '100vh',
            bgcolor: adminColors.sidebar,
            display: 'flex',
            flexDirection: 'column',
            position: 'fixed',
            top: 0,
            left: { xs: mobileOpen ? 0 : `-${SIDEBAR_WIDTH}px`, md: 0 },
            zIndex: 1200,
            transition: 'width 0.22s cubic-bezier(0.4, 0, 0.2, 1), left 0.22s cubic-bezier(0.4, 0, 0.2, 1)',
            overflow: 'hidden',
            boxShadow: '2px 0 12px rgba(15, 30, 60, 0.2)',
          }}
        >
          {/* Sidebar Header */}
          <Box
            sx={{
              height: 64,
              display: 'flex',
              alignItems: 'center',
              px: collapsed ? 1.5 : 2.5,
              borderBottom: `1px solid ${adminColors.sidebarBorder}`,
              flexShrink: 0,
              gap: 1.5,
            }}
          >
            <Box
              sx={{
                width: 34,
                height: 34,
                borderRadius: '10px',
                bgcolor: adminColors.primary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <ShieldRoundedIcon sx={{ fontSize: 18, color: '#FFFFFF' }} />
            </Box>
            {!collapsed && (
              <Box sx={{ overflow: 'hidden' }}>
                <Typography sx={{ fontWeight: 800, fontSize: '0.9375rem', color: '#FFFFFF', letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>
                  PICC Admin
                </Typography>
                <Typography sx={{ fontSize: '0.6875rem', color: adminColors.sidebarText, letterSpacing: '0.03em', whiteSpace: 'nowrap' }}>
                  Command Center
                </Typography>
              </Box>
            )}
          </Box>

          {/* Navigation Groups */}
          <Box sx={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', py: 2, px: collapsed ? 1 : 1.5 }}>
            {NAV_GROUPS.map((group) => (
              <Box key={group.label} sx={{ mb: 3 }}>
                {!collapsed && (
                  <Typography
                    sx={{
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      color: adminColors.sidebarText,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      px: 1,
                      mb: 1,
                    }}
                  >
                    {group.label}
                  </Typography>
                )}
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  const navItem = (
                    <Box
                      key={item.href}
                      component="a"
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(item.href);
                        setMobileOpen(false);
                      }}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: collapsed ? 0 : 1.5,
                        px: collapsed ? 0 : 1.5,
                        py: 1.125,
                        borderRadius: '8px',
                        cursor: 'pointer',
                        textDecoration: 'none',
                        mb: 0.5,
                        justifyContent: collapsed ? 'center' : 'flex-start',
                        bgcolor: active ? adminColors.sidebarActive : 'transparent',
                        color: active ? adminColors.sidebarTextActive : adminColors.sidebarText,
                        transition: 'all 0.15s ease',
                        '&:hover': {
                          bgcolor: active ? adminColors.sidebarActive : adminColors.sidebarHover,
                          color: '#FFFFFF',
                        },
                      }}
                    >
                      <Icon sx={{ fontSize: 18, flexShrink: 0 }} />
                      {!collapsed && (
                        <Typography sx={{ fontSize: '0.875rem', fontWeight: active ? 700 : 500, color: 'inherit', whiteSpace: 'nowrap' }}>
                          {item.label}
                        </Typography>
                      )}
                    </Box>
                  );

                  return collapsed ? (
                    <Tooltip key={item.href} title={item.label} placement="right">
                      {navItem as React.ReactElement}
                    </Tooltip>
                  ) : (
                    navItem
                  );
                })}
              </Box>
            ))}
          </Box>

          {/* Collapse Toggle */}
          <Box sx={{ p: collapsed ? 1 : 1.5, borderTop: `1px solid ${adminColors.sidebarBorder}` }}>
            <Tooltip title={collapsed ? 'Mở rộng menu' : 'Thu gọn menu'} placement="right">
              <IconButton
                onClick={() => setCollapsed(!collapsed)}
                size="small"
                sx={{
                  width: collapsed ? 40 : '100%',
                  height: 36,
                  borderRadius: '8px',
                  color: adminColors.sidebarText,
                  bgcolor: adminColors.sidebarHover,
                  '&:hover': { bgcolor: adminColors.sidebarActive, color: '#FFFFFF' },
                  justifyContent: 'center',
                }}
              >
                {collapsed ? <MenuRoundedIcon sx={{ fontSize: 18 }} /> : <ChevronLeftRoundedIcon sx={{ fontSize: 18 }} />}
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* ═══ MAIN CONTENT AREA ═══ */}
        <Box sx={{ flex: 1, ml: { xs: 0, md: `${sidebarW}px` }, transition: 'margin-left 0.22s cubic-bezier(0.4, 0, 0.2, 1)', display: 'flex', flexDirection: 'column', minHeight: '100vh', minWidth: 0 }}>
          {/* ── TOPBAR ── */}
          <Box
            component="header"
            sx={{
              height: 64,
              bgcolor: adminColors.topbar,
              borderBottom: `1px solid ${adminColors.topbarBorder}`,
              display: 'flex',
              alignItems: 'center',
              px: { xs: 2, md: 3 },
              gap: 2,
              position: 'sticky',
              top: 0,
              zIndex: 1100,
              boxShadow: adminShadow.topbar,
            }}
          >
            <IconButton
              onClick={() => setMobileOpen(true)}
              aria-label="Mở điều hướng quản trị"
              sx={{
                display: { xs: 'inline-flex', md: 'none' },
                color: adminColors.text,
                borderRadius: adminRadius.button,
                '&:hover': { bgcolor: adminColors.surfaceHover },
              }}
            >
              <MenuRoundedIcon />
            </IconButton>
            <Box sx={{ flex: 1 }} />

            {/* Notification icon */}
            <Tooltip title="Thông báo">
              <IconButton size="small" sx={{ color: adminColors.textMuted, '&:hover': { color: adminColors.text, bgcolor: adminColors.surfaceHover }, borderRadius: '8px' }}>
                <NotificationsNoneRoundedIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Tooltip>

            {/* User Menu */}
            <Button
              id="admin-user-menu-btn"
              aria-controls={menuOpen ? 'admin-user-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={menuOpen ? 'true' : undefined}
              onClick={(e) => setAnchorEl(e.currentTarget)}
              endIcon={<KeyboardArrowDownRoundedIcon sx={{ fontSize: '1rem !important' }} />}
              sx={{
                textTransform: 'none',
                color: adminColors.text,
                fontWeight: 600,
                fontSize: '0.875rem',
                px: 1.5,
                py: 0.75,
                borderRadius: '10px',
                border: `1px solid ${adminColors.border}`,
                bgcolor: adminColors.surface,
                gap: 1,
                '&:hover': { bgcolor: adminColors.surfaceHover },
              }}
            >
              <Avatar sx={{ width: 28, height: 28, bgcolor: adminColors.primary, fontSize: '0.75rem', fontWeight: 800 }}>
                {user.displayName?.[0] || 'A'}
              </Avatar>
              <Box sx={{ textAlign: 'left', display: { xs: 'none', sm: 'block' } }}>
                <Typography sx={{ fontSize: '0.8125rem', fontWeight: 700, lineHeight: 1.2, color: adminColors.text }}>{user.displayName}</Typography>
                <Typography sx={{ fontSize: '0.6875rem', color: adminColors.textMuted, lineHeight: 1.2 }}>{ROLE_LABELS[user.role] || user.role}</Typography>
              </Box>
            </Button>

            <Menu
              id="admin-user-menu"
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={() => setAnchorEl(null)}
              PaperProps={{
                sx: {
                  mt: 1,
                  minWidth: 220,
                  borderRadius: adminRadius.cardLg,
                  border: `1px solid ${adminColors.border}`,
                  boxShadow: adminShadow.modal,
                  '& .MuiList-root': { py: 0.75 },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <Box sx={{ px: 2, py: 1.5 }}>
                <Typography sx={{ fontWeight: 700, fontSize: '0.875rem', color: adminColors.text }}>{user.displayName}</Typography>
                <Typography sx={{ fontSize: '0.75rem', color: adminColors.textMuted }}>{user.email}</Typography>
                <Box sx={{ mt: 0.75, display: 'inline-block', bgcolor: adminColors.primaryLight, color: adminColors.primary, fontSize: '0.6875rem', fontWeight: 700, px: 1, py: 0.25, borderRadius: '6px', border: `1px solid ${adminColors.primaryBorder}` }}>
                  {ROLE_LABELS[user.role] || user.role}
                </Box>
              </Box>
              <Divider sx={{ borderColor: adminColors.border }} />
              <MenuItem onClick={() => setAnchorEl(null)} sx={{ gap: 1.5, fontSize: '0.875rem', py: 1, px: 2, color: adminColors.text, '&:hover': { bgcolor: adminColors.surfaceHover } }}>
                <PersonRoundedIcon sx={{ fontSize: 18, color: adminColors.textMuted }} />
                Hồ sơ cá nhân
              </MenuItem>
              <Divider sx={{ borderColor: adminColors.border }} />
              <MenuItem
                onClick={handleLogout}
                sx={{ gap: 1.5, fontSize: '0.875rem', py: 1, px: 2, color: adminColors.danger, '&:hover': { bgcolor: adminColors.dangerBg } }}
              >
                <LogoutRoundedIcon sx={{ fontSize: 18 }} />
                Đăng xuất
              </MenuItem>
            </Menu>
          </Box>

          {/* ── PAGE CONTENT ── */}
          <Box sx={{ flex: 1, p: { xs: 2, md: 3 } }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </AdminContext.Provider>
  );
};

export default AdminLayout;
