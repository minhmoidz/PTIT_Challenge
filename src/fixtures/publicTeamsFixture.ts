import type { PublicTeamProfile } from '@/types/publicTeam';

/**
 * ⚠️ DEVELOPMENT FIXTURE — MOCK_ONLY
 * Used strictly for local component testing and dev demonstration.
 * In production mode, teams are loaded exclusively via verified public API.
 */
export const MOCK_PUBLIC_TEAMS_FIXTURE: PublicTeamProfile[] = [
  {
    id: 'team-001',
    slug: 'catalyst-x',
    teamName: 'Catalyst X',
    teamSize: 4,
    challengeCategory: 'technology',
    challengeCategoryLabel: 'Công nghệ',
    slogan: 'Kiến tạo giải pháp chuyển đổi số cho doanh nghiệp vừa và nhỏ',
    shortDescription:
      'Đội ngũ gồm 4 sinh viên PTIT chuyên sâu về CNTT và Truyền thông, phát triển nền tảng phân tích hành vi khách hàng bằng AI.',
    competitionStatus: 'finalist',
    statusLabel: 'Top 6 Chung kết',
    publicMembers: [
      { displayName: 'Nguyễn Văn Minh', role: 'Đội trưởng & Lead Developer', major: 'Công nghệ thông tin' },
      { displayName: 'Trần Thị Thu Hà', role: 'AI & Data Specialist', major: 'Khoa học dữ liệu' },
      { displayName: 'Lê Hoàng Nam', role: 'UX/UI Designer', major: 'Thiết kế Đa phương tiện' },
      { displayName: 'Phạm Minh Anh', role: 'Business Strategist', major: 'Kinh tế số' },
    ],
    project: {
      title: 'SmartBiz AI — Nền tảng Tự động hóa Phân tích Khách hàng',
      summary:
        'Giải pháp giúp các doanh nghiệp chuỗi bán lẻ tối ưu hóa trải nghiệm khách hàng thông qua mô hình dự đoán xu hướng mua sắm.',
      problem: 'Doanh nghiệp bán lẻ vừa và nhỏ thiếu công cụ phân tích dữ liệu chuyên sâu với chi phí hợp lý.',
      solution: 'Hệ thống AI tích hợp POS sẵn có, phân tích dữ liệu giao dịch và gợi ý chiến dịch cá nhân hóa.',
      tags: ['AI/ML', 'RetailTech', 'Data Analytics', 'PTIT Innovation'],
    },
    publication: {
      status: 'published',
      showTeamProfile: true,
      showMemberNames: true,
      showMemberPhotos: false,
      showProjectSummary: true,
      approvedAt: '2026-07-20T10:00:00Z',
      publishedAt: '2026-07-21T08:00:00Z',
    },
    updatedAt: '2026-07-25T12:00:00Z',
  },
  {
    id: 'team-002',
    slug: 'eco-growth',
    teamName: 'Eco Growth Labs',
    teamSize: 3,
    challengeCategory: 'business',
    challengeCategoryLabel: 'Kinh tế & Kinh doanh',
    slogan: 'Mô hình kinh tế tuần hoàn ứng dụng trong logistics đô thị',
    shortDescription:
      'Nhóm nghiên cứu chiến lược kinh doanh số hướng tới giải pháp giảm dấu chân carbon trong chuỗi giao vận.',
    competitionStatus: 'finalist',
    statusLabel: 'Top 6 Chung kết',
    publicMembers: [
      { displayName: 'Vũ Đức Mạnh', role: 'Đội trưởng', major: 'Kinh doanh quốc tế' },
      { displayName: 'Đặng Ngọc Ánh', role: 'Marketing Lead', major: 'Marketing số' },
      { displayName: 'Hoàng Quốc Việt', role: 'Financial Analyst', major: 'Tài chính số' },
    ],
    project: {
      title: 'GreenTrack — Nền tảng Đo lường & Tối ưu hóa Thu gom Đóng gói',
      summary: 'Mô hình kinh doanh kết nối các đơn vị vận chuyển nhằm tối ưu tải trọng và tái sử dụng bao bì.',
      problem: 'Lượng rác thải bao bì thương mại điện tử gia tăng nhanh chóng gây lãng phí lớn.',
      solution: 'Ứng dụng quản lý điểm hoàn bao bì chuẩn hóa với cơ chế thưởng xu sinh thái cho người tiêu dùng.',
      tags: ['GreenTech', 'Logistics', 'Circular Economy'],
    },
    publication: {
      status: 'published',
      showTeamProfile: true,
      showMemberNames: true,
      showMemberPhotos: false,
      showProjectSummary: true,
      approvedAt: '2026-07-22T14:30:00Z',
      publishedAt: '2026-07-23T09:00:00Z',
    },
    updatedAt: '2026-07-25T14:00:00Z',
  },
  {
    id: 'team-003',
    slug: 'pulse-media',
    teamName: 'Pulse Media Studio',
    teamSize: 5,
    challengeCategory: 'communications',
    challengeCategoryLabel: 'Truyền thông',
    slogan: 'Chuyện kể thương hiệu qua nội dung tương tác đa tầng',
    shortDescription:
      'Đội ngũ sáng tạo nội dung đa phương tiện phát triển chiến dịch truyền thông tương tác cho các thương hiệu Việt.',
    competitionStatus: 'semifinalist',
    statusLabel: 'Top 18 Bán kết',
    publicMembers: [
      { displayName: 'Đỗ Hoàng Long', role: 'Đội trưởng & Creative Director', major: 'Truyền thông đa phương tiện' },
      { displayName: 'Bùi Thị Khánh Linh', role: 'Content Strategist', major: 'Marketing' },
      { displayName: 'Nguyễn Tiến Dũng', role: 'Video Producer', major: 'Công nghệ đa phương tiện' },
      { displayName: 'Trịnh Hoài Nam', role: 'Copywriter', major: 'Báo chí & Truyền thông' },
      { displayName: 'Phùng Bảo Ngọc', role: 'Social Media Specialist', major: 'Marketing' },
    ],
    project: {
      title: 'EchoStream — Chiến dịch Truyền thông Gen Z tương tác 3D',
      summary: 'Dự án truyền thông kết hợp không gian ảo 3D và gamification dành cho giới trẻ.',
      tags: ['MediaTech', 'Gen Z Campaign', 'Gamification'],
    },
    publication: {
      status: 'published',
      showTeamProfile: true,
      showMemberNames: true,
      showMemberPhotos: false,
      showProjectSummary: true,
      approvedAt: '2026-07-24T11:00:00Z',
      publishedAt: '2026-07-24T15:00:00Z',
    },
    updatedAt: '2026-07-25T15:30:00Z',
  },
];
