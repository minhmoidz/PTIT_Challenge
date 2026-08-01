import type { RegistrationStatus } from '@/types/registration';

export interface CtaConfig {
  heroLabel: string;
  navbarLabel: string;
  mobileLabel: string;
  href: string;
  helperText: string;
  dotColor: string;
  showMobileSticky: boolean;
}

export const REGISTRATION_CTA_CONFIG: Record<string, CtaConfig> = {
  open: {
    heroLabel: 'Đăng ký tham gia',
    navbarLabel: 'Đăng ký ngay',
    mobileLabel: 'Đăng ký tham gia PICC 2026',
    href: '/dang-ky',
    helperText: 'Cổng đăng ký mở đến 15/08/2026.',
    dotColor: '#10B981', // emerald green pulse
    showMobileSticky: true,
  },
  not_open: {
    heroLabel: 'Xem trước biểu mẫu',
    navbarLabel: 'Xem biểu mẫu',
    mobileLabel: 'Xem trước biểu mẫu',
    href: '/dang-ky',
    helperText: 'Mở đăng ký từ 01/08/2026.',
    dotColor: '#3B82F6', // blue
    showMobileSticky: true,
  },
  manually_disabled: {
    heroLabel: 'Xem thông báo đăng ký',
    navbarLabel: 'Xem thông báo',
    mobileLabel: 'Xem thông báo đăng ký',
    href: '/dang-ky',
    helperText: 'Cổng đăng ký đang tạm dừng.',
    dotColor: '#F59E0B', // amber
    showMobileSticky: true,
  },
  closed: {
    heroLabel: 'Theo dõi hành trình',
    navbarLabel: 'Xem lộ trình',
    mobileLabel: 'Theo dõi hành trình',
    href: '/#lo-trinh',
    helperText: 'Đăng ký đã đóng vào 15/08/2026.',
    dotColor: '#67788F', // slate
    showMobileSticky: false,
  },
  live: {
    heroLabel: 'Theo dõi cuộc thi',
    navbarLabel: 'Xem hành trình',
    mobileLabel: 'Theo dõi cuộc thi',
    href: '/#lo-trinh',
    helperText: 'Cuộc thi đang diễn ra.',
    dotColor: '#8B5CF6', // purple
    showMobileSticky: false,
  },
  completed: {
    heroLabel: 'Xem kết quả',
    navbarLabel: 'Xem kết quả',
    mobileLabel: 'Xem kết quả',
    href: '/#lo-trinh', // fallback anchor as /ket-qua route doesn't exist
    helperText: 'Cuộc thi PICC 2026 đã khép lại thành công.',
    dotColor: '#0EA5E9', // sky blue
    showMobileSticky: false,
  },
};

export const getCtaConfig = (status: RegistrationStatus): CtaConfig => {
  return REGISTRATION_CTA_CONFIG[status] || REGISTRATION_CTA_CONFIG.not_open;
};
