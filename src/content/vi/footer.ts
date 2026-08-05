/**
 * Footer content, mirroring the layout of the official PTIT portals:
 * institution lockup, campus/contact grid, a link directory, then a copyright
 * bar. Addresses are the Academy's published ones.
 */

export const footer = {
  institution: 'Học viện Công nghệ Bưu chính Viễn thông',
  portalName: 'PTIT Innovation Catalyst Challenge 2026',
  organiser: 'Trung tâm Đổi mới Sáng tạo & Khởi nghiệp PTIT (IEC)',

  /** Rendered as label/value pairs across three columns. */
  contacts: [
    { label: 'Trụ sở chính', value: 'Số 122 Hoàng Quốc Việt, P. Nghĩa Đô, TP. Hà Nội' },
    { label: 'Học viện cơ sở tại TP. Hồ Chí Minh', value: 'Số 11 Nguyễn Đình Chiểu, P. Sài Gòn, TP. Hồ Chí Minh' },
    { label: 'Email liên hệ', value: 'iec@ptit.edu.vn', href: 'mailto:iec@ptit.edu.vn' },
    { label: 'Cơ sở đào tạo tại Hà Nội', value: 'Số 96A Trần Phú, P. Hà Đông, TP. Hà Nội' },
    { label: 'Cơ sở đào tạo tại TP. Hồ Chí Minh', value: 'Số 97 Man Thiện, P. Tăng Nhơn Phú, TP. Hồ Chí Minh' },
    { label: 'Hotline Ban Tổ chức', value: '(024) 3352-5741', href: 'tel:+842433525741' },
  ],

  linksHeading: 'Đường dẫn liên kết',

  /** Three columns: the competition's own sections, then official PTIT portals. */
  linkColumns: [
    [
      { label: 'Giới thiệu cuộc thi', href: '#gioi-thieu' },
      { label: 'Lộ trình 04 giai đoạn', href: '#lo-trinh' },
      { label: 'Thể lệ & Quy định', href: '#the-le' },
      { label: 'Cơ cấu giải thưởng', href: '#giai-thuong' },
    ],
    [
      { label: 'Danh sách đội thi', href: '/doi-thi' },
      { label: 'Cổng đăng ký', href: '/dang-ky' },
      { label: 'Câu hỏi thường gặp', href: '#faq' },
    ],
    [
      { label: 'Học viện Công nghệ BCVT', href: 'https://ptit.edu.vn/', external: true },
      { label: 'Trung tâm IEC PTIT', href: 'https://iec.ptit.edu.vn/', external: true },
      { label: 'Cổng thông tin đào tạo', href: 'https://daotao.ptit.edu.vn/', external: true },
      { label: 'Fanpage PTIT IEC', href: 'https://www.facebook.com/PTITIEC', external: true },
    ],
  ],

  socials: [
    { label: 'Fanpage PTIT IEC', href: 'https://www.facebook.com/PTITIEC', icon: 'facebook' as const },
    { label: 'Fanpage Học viện PTIT', href: 'https://www.facebook.com/HocvienPTIT', icon: 'facebook' as const },
    { label: 'Website Học viện', href: 'https://ptit.edu.vn/', icon: 'web' as const },
  ],

  copyright:
    'Học viện Công nghệ Bưu chính Viễn thông giữ bản quyền nội dung trên website này.',
};
