import { useState } from 'react';
import {
  Modal,
  Tag,
  Badge,
  Card,
  Row,
  Col,
  Button,
  Typography,
  Space,
  Popconfirm,
  Descriptions,
  Tabs,
  Steps,
  message,
} from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  UserOutlined,
  IdcardOutlined,
  MailOutlined,
  PhoneOutlined,
  CrownOutlined,
  CopyOutlined,
  SafetyCertificateOutlined,
  ProjectOutlined,
  GlobalOutlined,
  BulbOutlined,
  BookOutlined,
  SolutionOutlined,
  FileDoneOutlined,
} from '@ant-design/icons';

const { Text, Title, Paragraph } = Typography;

interface TeamMember {
  fullName: string;
  studentId: string;
  email: string;
  phone: string;
  major: string;
  role: string;
}

interface Commitments {
  truthfulInformation?: boolean;
  mediaConsent?: boolean;
  rulesAccepted?: boolean;
  privacyAcknowledged?: boolean;
}

interface PublicConsent {
  shareTeamProfile?: boolean;
  shareMemberNames?: boolean;
  shareLogoOrPhotos?: boolean;
  shareProjectSummary?: boolean;
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
    previousCompetitions?: string;
    featuredProject: string;
    expectations?: string;
    companyExperience?: string;
    members: TeamMember[];
    commitments?: Commitments;
    publicConsent?: PublicConsent;
  };
}

interface Props {
  open: boolean;
  registration: RegistrationItem | null;
  onClose: () => void;
  onVerify?: (id: string) => void;
  onReject?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const CATEGORY_MAP: Record<string, { label: string; color: string }> = {
  business: { label: 'Kinh tế & Kinh doanh', color: 'blue' },
  technology: { label: 'Công nghệ', color: 'cyan' },
  marketing: { label: 'Marketing', color: 'gold' },
  media: { label: 'Truyền thông', color: 'purple' },
  communications: { label: 'Truyền thông', color: 'purple' },
  other: { label: 'Khác', color: 'default' },
};

const EXPERIENCE_MAP: Record<string, string> = {
  none: 'Chưa từng tham gia cuộc thi',
  previous: 'Đã có kinh nghiệm tham gia cuộc thi tương tự',
  ongoing: 'Đang tham gia dự án/dự thi khác',
};

const STATUS_TAG_MAP: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  VERIFIED: { label: 'Đã Xác Minh / Duyệt', color: 'success', icon: <CheckCircleOutlined /> },
  SUBMITTED: { label: 'Mới Nộp — Chờ Duyệt', color: 'warning', icon: <BulbOutlined /> },
  UNDER_REVIEW: { label: 'Đang Xem Xét', color: 'processing', icon: <BookOutlined /> },
  NEEDS_REVISION: { label: 'Cần Bổ Sung', color: 'warning', icon: <BulbOutlined /> },
  REJECTED: { label: 'Đã Từ Chối', color: 'error', icon: <CloseCircleOutlined /> },
  WITHDRAWN: { label: 'Đã Rút Đơn', color: 'default', icon: <CloseCircleOutlined /> },
};

export const RegistrationDetailModal = ({ open, registration, onClose, onVerify, onReject, onDelete }: Props) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!registration) return null;
  const { registrationCode, status, submittedAt, data } = registration;

  const statusConfig = STATUS_TAG_MAP[status] ?? STATUS_TAG_MAP.SUBMITTED!;

  const handleCopyCode = () => {
    void navigator.clipboard.writeText(registrationCode);
    message.success('Đã sao chép mã đơn!');
  };

  const formattedDate = (() => {
    try {
      return new Date(submittedAt).toLocaleString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    } catch {
      return submittedAt;
    }
  })();

  const currentStep = status === 'VERIFIED' ? 2 : status === 'REJECTED' ? 1 : 1;
  const stepStatus = status === 'REJECTED' ? 'error' : status === 'VERIFIED' ? 'finish' : 'process';

  return (
    <Modal
      open={open}
      onCancel={onClose}
      width={880}
      centered
      title={
        <Space direction="vertical" size={4} style={{ width: '100%' }}>
          <Space align="center" style={{ flexWrap: 'wrap' }}>
            <Title level={4} style={{ margin: 0, color: '#0F2A52', fontWeight: 800 }}>
              {data.teamName}
            </Title>
            <Tag icon={statusConfig.icon} color={statusConfig.color} style={{ fontWeight: 700, padding: '2px 10px', borderRadius: '12px' }}>
              {statusConfig.label}
            </Tag>
          </Space>
          <Space size="middle">
            <Text
              type="secondary"
              style={{
                fontSize: 12,
                fontFamily: 'monospace',
                cursor: 'pointer',
                background: '#F1F5F9',
                padding: '2px 8px',
                borderRadius: '6px',
              }}
              onClick={handleCopyCode}
            >
              Mã Đơn: <strong>{registrationCode}</strong> <CopyOutlined />
            </Text>
            <Text type="secondary" style={{ fontSize: 12 }}>
              • Nộp lúc: {formattedDate}
            </Text>
          </Space>
        </Space>
      }
      footer={[
        <Button key="close" onClick={onClose} shape="round">
          Đóng
        </Button>,
        onDelete && (
          <Popconfirm
            key="delete"
            title="Xác nhận xóa vĩnh viễn hồ sơ?"
            description={`Bạn có chắc chắn muốn xóa hồ sơ của đội "${data.teamName}"? Thao tác không thể khôi phục.`}
            onConfirm={() => {
              onDelete(registration.id);
              onClose();
            }}
            okText="Xóa Vĩnh Viễn"
            cancelText="Hủy"
            okButtonProps={{ danger: true }}
          >
            <Button danger icon={<DeleteOutlined />} shape="round">
              Xóa Vĩnh Viễn
            </Button>
          </Popconfirm>
        ),
        status !== 'VERIFIED' && onReject && (
          <Button key="reject" danger variant="outlined" icon={<CloseCircleOutlined />} onClick={() => { onReject(registration.id); onClose(); }} shape="round">
            Từ Chối Hồ Sơ
          </Button>
        ),
        status === 'VERIFIED' && onReject && (
          <Button key="re-reject" danger variant="outlined" icon={<CloseCircleOutlined />} onClick={() => { onReject(registration.id); onClose(); }} shape="round">
            Từ Chối Lại
          </Button>
        ),
        status !== 'VERIFIED' && onVerify && (
          <Button key="verify" type="primary" icon={<CheckCircleOutlined />} onClick={() => { onVerify(registration.id); onClose(); }} shape="round" style={{ background: '#059669', borderColor: '#059669', fontWeight: 700 }}>
            Duyệt Hồ Sơ Thành Công
          </Button>
        ),
      ]}
    >
      {/* Steps Lifecycle Progress */}
      <Card size="small" style={{ marginBottom: 16, background: '#F8FAFC', borderRadius: 12, border: '1px solid #E2E8F0' }}>
        <Steps
          current={currentStep}
          status={stepStatus}
          size="small"
          items={[
            { title: 'Nộp Hồ Sơ', icon: <SolutionOutlined /> },
            { title: 'Thẩm Định', icon: <BookOutlined /> },
            { title: 'Duyệt & Xuất Bản', icon: <FileDoneOutlined /> },
          ]}
        />
      </Card>

      {/* Tabs Navigation */}
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        type="card"
        items={[
          {
            key: 'overview',
            label: (
              <span>
                <ProjectOutlined /> Tổng Quan &amp; Dự Án
              </span>
            ),
            children: (
              <Card size="small" style={{ borderRadius: 12, background: '#FAFCFF', border: '1px solid #E6F4FF' }}>
                <Descriptions column={{ xs: 1, sm: 2, md: 3 }} bordered size="small" style={{ background: '#FFFFFF', borderRadius: 8 }}>
                  <Descriptions.Item label="Tên đội thi">
                    <Text style={{ fontWeight: 700, color: '#0F2A52' }}>{data.teamName}</Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="Quy mô đội">
                    <Badge count={`${data.teamSize} Thành viên`} style={{ backgroundColor: '#1677ff', fontWeight: 700 }} />
                  </Descriptions.Item>
                  <Descriptions.Item label="Nhóm bài toán">
                    <Space wrap>
                      {data.challengeCategories?.map((catKey) => {
                        const info = CATEGORY_MAP[catKey.toLowerCase()] ?? CATEGORY_MAP.other!;
                        return (
                          <Tag key={catKey} color={info.color} style={{ fontWeight: 700 }}>
                            {info.label}
                          </Tag>
                        );
                      })}
                      {data.otherChallengeCategory && <Tag color="default">Khác: {data.otherChallengeCategory}</Tag>}
                    </Space>
                  </Descriptions.Item>
                  <Descriptions.Item label="Kinh nghiệm thi đấu" span={3}>
                    <Text style={{ fontWeight: 600 }}>{EXPERIENCE_MAP[data.companyExperience || 'none'] || 'Chưa từng tham gia'}</Text>
                  </Descriptions.Item>
                </Descriptions>

                <div style={{ marginTop: 16 }}>
                  <Text type="secondary" style={{ fontSize: 12, fontWeight: 700, display: 'block', marginBottom: 6 }}>
                    MÔ TẢ DỰ ÁN NỔI BẬT / Ý TƯỞNG GIẢI PHÁP
                  </Text>
                  <Card size="small" style={{ background: '#E6F4FF', borderLeft: '4px solid #1677ff', borderRadius: '0 8px 8px 0' }}>
                    <Paragraph style={{ margin: 0, fontWeight: 600, color: '#1E293B', whiteSpace: 'pre-line' }}>
                      {data.featuredProject || 'Chưa có thông tin mô tả dự án.'}
                    </Paragraph>
                  </Card>
                </div>

                {data.expectations && (
                  <div style={{ marginTop: 14 }}>
                    <Text type="secondary" style={{ fontSize: 12, fontWeight: 700, display: 'block', marginBottom: 6 }}>
                      KỲ VỌNG KHI THAM GIA PICC 2026
                    </Text>
                    <Card size="small" style={{ background: '#F6FFED', borderLeft: '4px solid #52C41A', borderRadius: '0 8px 8px 0' }}>
                      <Paragraph style={{ margin: 0, fontWeight: 600, color: '#135200', whiteSpace: 'pre-line' }}>
                        {data.expectations}
                      </Paragraph>
                    </Card>
                  </div>
                )}
              </Card>
            ),
          },
          {
            key: 'members',
            label: (
              <span>
                <UserOutlined /> Thành Viên ({data.members?.length || 0})
              </span>
            ),
            children: (
              <Row gutter={[16, 16]}>
                {data.members?.map((m, i) => {
                  const isLeader = m.role === 'leader' || i === 0;
                  return (
                    <Col xs={24} sm={12} key={i}>
                      <Badge.Ribbon
                        text={isLeader ? 'Đội Trưởng' : `Thành viên ${i + 1}`}
                        color={isLeader ? '#D9232D' : '#8C8C8C'}
                      >
                        <Card
                          size="small"
                          style={{
                            borderRadius: 10,
                            borderColor: isLeader ? '#0F2A52' : '#F0F0F0',
                            background: isLeader ? '#FAFCFF' : '#FFFFFF',
                          }}
                        >
                          <Space direction="vertical" size={6} style={{ width: '100%' }}>
                            <Space align="center">
                              {isLeader ? (
                                <CrownOutlined style={{ color: '#FAAD14', fontSize: 18 }} />
                              ) : (
                                <UserOutlined style={{ color: '#8C8C8C' }} />
                              )}
                              <Text style={{ fontWeight: 800, fontSize: 15, color: '#0F172A' }}>{m.fullName}</Text>
                            </Space>

                            <Space size={6} wrap style={{ fontSize: 12 }}>
                              <IdcardOutlined style={{ color: '#8C8C8C' }} />
                              <Text type="secondary">Mã SV:</Text>
                              <Text code style={{ fontWeight: 700 }}>
                                {m.studentId}
                              </Text>
                              <Text type="secondary">• Ngành:</Text>
                              <Text style={{ fontWeight: 700 }}>{m.major || 'PTIT'}</Text>
                            </Space>

                            <Space size={6} style={{ fontSize: 12 }}>
                              <MailOutlined style={{ color: '#8C8C8C' }} />
                              <Text style={{ fontWeight: 500 }}>{m.email}</Text>
                            </Space>

                            <Space size={6} style={{ fontSize: 12 }}>
                              <PhoneOutlined style={{ color: '#8C8C8C' }} />
                              <Text style={{ fontWeight: 500, fontFamily: 'monospace' }}>{m.phone}</Text>
                            </Space>
                          </Space>
                        </Card>
                      </Badge.Ribbon>
                    </Col>
                  );
                })}
              </Row>
            ),
          },
          {
            key: 'compliance',
            label: (
              <span>
                <SafetyCertificateOutlined /> Cam Kết &amp; Quyền Riêng Tư
              </span>
            ),
            children: (
              <Card size="small" style={{ borderRadius: 12, background: '#F8FAFC' }}>
                <Row gutter={[12, 12]}>
                  <Col xs={24} sm={12}>
                    <Space>
                      <CheckCircleOutlined style={{ color: '#52C41A' }} />
                      <Text style={{ fontSize: 13, fontWeight: 600 }}>Khai báo thông tin chính xác &amp; trung thực</Text>
                    </Space>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Space>
                      <CheckCircleOutlined style={{ color: '#52C41A' }} />
                      <Text style={{ fontSize: 13, fontWeight: 600 }}>Đồng ý tư liệu truyền thông BTC</Text>
                    </Space>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Space>
                      <CheckCircleOutlined style={{ color: '#52C41A' }} />
                      <Text style={{ fontSize: 13, fontWeight: 600 }}>Chấp nhận Thể lệ cuộc thi PICC 2026</Text>
                    </Space>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Space>
                      <CheckCircleOutlined style={{ color: '#52C41A' }} />
                      <Text style={{ fontSize: 13, fontWeight: 600 }}>Xác nhận Chính sách bảo mật dữ liệu</Text>
                    </Space>
                  </Col>
                </Row>

                {data.publicConsent && (
                  <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px dashed #E2E8F0' }}>
                    <Space align="center" style={{ marginBottom: 8 }}>
                      <GlobalOutlined style={{ color: '#1677ff' }} />
                      <Text type="secondary" style={{ fontSize: 13, fontWeight: 700 }}>
                        Hiển thị công khai trên website (/doi-thi):
                      </Text>
                    </Space>
                    <Space wrap>
                      <Tag color={data.publicConsent.shareTeamProfile ? 'blue' : 'default'}>
                        {data.publicConsent.shareTeamProfile ? '✓ Tên đội' : '✗ Ẩn tên đội'}
                      </Tag>
                      <Tag color={data.publicConsent.shareMemberNames ? 'blue' : 'default'}>
                        {data.publicConsent.shareMemberNames ? '✓ Tên thành viên' : '✗ Ẩn tên thành viên'}
                      </Tag>
                      <Tag color={data.publicConsent.shareProjectSummary ? 'blue' : 'default'}>
                        {data.publicConsent.shareProjectSummary ? '✓ Mô tả dự án' : '✗ Ẩn mô tả dự án'}
                      </Tag>
                    </Space>
                  </div>
                )}
              </Card>
            ),
          },
        ]}
      />
    </Modal>
  );
};
