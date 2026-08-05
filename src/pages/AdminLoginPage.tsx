import { useState } from 'react';
import { Card, Form, Input, Button, Alert, Typography, ConfigProvider } from 'antd';
import { UserOutlined, LockOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { env } from '@/config/env';

const { Title, Text } = Typography;

export const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: { email: string; password: string }) => {
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${env.apiBaseUrl}/v1/admin/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: values.email.trim().toLowerCase(), password: values.password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem('picc_admin_user', JSON.stringify(data.data.user));
        navigate('/admin/dashboard', { replace: true });
        return;
      }

      if (res.status === 401) {
        setError('Thông tin đăng nhập không chính xác. Vui lòng thử lại.');
      } else if (res.status === 403) {
        setError('Tài khoản không có quyền truy cập hệ thống quản trị.');
      } else if (res.status === 429) {
        setError('Quá nhiều lần thử. Vui lòng đợi vài phút và thử lại.');
      } else {
        setError('Có lỗi xảy ra. Vui lòng thử lại sau.');
      }
    } catch {
      setError('Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#D9232D',
          borderRadius: 10,
          fontFamily: 'Outfit, system-ui, -apple-system, sans-serif',
        },
      }}
    >
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0F2A52 0%, #1E3A8A 50%, #0F172A 100%)',
          padding: 24,
        }}
      >
        <Card
          style={{
            width: '100%',
            maxWidth: 420,
            borderRadius: 16,
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: '#D9232D',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontSize: 26,
                marginBottom: 12,
                boxShadow: '0 8px 20px rgba(217, 35, 45, 0.4)',
              }}
            >
              <SafetyCertificateOutlined />
            </div>
            <Title level={3} style={{ margin: 0, color: '#0F2A52', fontWeight: 800 }}>
              PICC 2026 Admin
            </Title>
            <Text type="secondary" style={{ fontSize: 13 }}>
              Đăng nhập trung tâm điều hành cuộc thi
            </Text>
          </div>

          {error && (
            <Alert message={error} type="error" showIcon style={{ marginBottom: 20, borderRadius: 8 }} />
          )}

          <Form layout="vertical" onFinish={handleSubmit} requiredMark={false}>
            <Form.Item
              label={<Text style={{ fontWeight: 700 }}>Email quản trị</Text>}
              name="email"
              rules={[
                { required: true, message: 'Vui lòng nhập email!' },
                { type: 'email', message: 'Email không hợp lệ!' },
              ]}
            >
              <Input
                size="large"
                prefix={<UserOutlined style={{ color: '#8C8C8C' }} />}
                placeholder="admin@ptit.edu.vn"
              />
            </Form.Item>

            <Form.Item
              label={<Text style={{ fontWeight: 700 }}>Mật khẩu</Text>}
              name="password"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
            >
              <Input.Password
                size="large"
                prefix={<LockOutlined style={{ color: '#8C8C8C' }} />}
                placeholder="••••••••"
              />
            </Form.Item>

            <Form.Item style={{ marginTop: 24 }}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                loading={loading}
                style={{
                  height: 46,
                  fontWeight: 800,
                  fontSize: 15,
                  borderRadius: 10,
                  background: 'linear-gradient(135deg, #D9232D 0%, #E11D48 100%)',
                  boxShadow: '0 6px 20px rgba(217, 35, 45, 0.35)',
                }}
              >
                Đăng Nhập Quản Trị
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </ConfigProvider>
  );
};

export default AdminLoginPage;
