export interface QualifierBenefit {
  id: string;
  step: string;
  title: string;
  description: string;
  iconName: 'WorkHistory' | 'School' | 'RecordVoiceOver' | 'Science' | 'Psychology';
  accentColor: string;
  bgTint: string;
  borderTint: string;
}

export const awards = {
  disclaimer:
    'Giá trị và quyền lợi cụ thể của từng hạng mục sẽ được Ban Tổ chức cập nhật.',
  prizes: [
    { rank: '01 Quán quân', icon: 'EmojiEventsRounded' as const },
    { rank: '01 Á quân', icon: 'WorkspacePremiumRounded' as const },
    { rank: '01 Quý quân', icon: 'MilitaryTechRounded' as const },
    { rank: '03 Giải Khuyến khích', icon: 'StarsRounded' as const },
  ],
  benefits: [
    'Cơ hội thực tập và làm việc tại doanh nghiệp đồng hành.',
    'Học bổng và chương trình đào tạo.',
    'Mentoring trực tiếp bởi chuyên gia và đại diện doanh nghiệp.',
    'Cơ hội pilot giải pháp trong môi trường thực tế.',
    'Tiếp cận chương trình ươm tạo và phát triển dự án.',
  ],
  qualifierBenefits: [
    {
      id: 'career',
      step: '01',
      title: 'Cơ Hội Nghề Nghiệp',
      description: 'Thực tập và làm việc trực tiếp tại các doanh nghiệp công nghệ đồng hành.',
      iconName: 'WorkHistory',
      accentColor: '#245FA8',
      bgTint: 'rgba(57, 124, 232, 0.1)',
      borderTint: 'rgba(57, 124, 232, 0.25)',
    },
    {
      id: 'education',
      step: '02',
      title: 'Học Bổng & Đào Tạo',
      description: 'Tiếp cận các gói học bổng chuyên sâu và chương trình nâng cao năng lực.',
      iconName: 'School',
      accentColor: '#4F46E5',
      bgTint: 'rgba(99, 102, 241, 0.1)',
      borderTint: 'rgba(99, 102, 241, 0.25)',
    },
    {
      id: 'mentoring',
      step: '03',
      title: 'Mentoring Chuyên Sâu',
      description: 'Được tư vấn & hướng dẫn trực tiếp 1:1 bởi các chuyên gia và đại diện doanh nghiệp.',
      iconName: 'RecordVoiceOver',
      accentColor: '#0284C7',
      bgTint: 'rgba(14, 165, 233, 0.1)',
      borderTint: 'rgba(14, 165, 233, 0.25)',
    },
    {
      id: 'pilot',
      step: '04',
      title: 'Thử Nghiệm Thực Tế',
      description: 'Cơ hội pilot và thử nghiệm giải pháp trong môi trường doanh nghiệp thực tế.',
      iconName: 'Science',
      accentColor: '#D97706',
      bgTint: 'rgba(245, 158, 11, 0.12)',
      borderTint: 'rgba(245, 158, 11, 0.25)',
    },
    {
      id: 'incubation',
      step: '05',
      title: 'Ươm Tạo Dự Án',
      description: 'Kết nối trực tiếp vào chương trình ươm tạo và hệ sinh thái phát triển lâu dài.',
      iconName: 'Psychology',
      accentColor: '#059669',
      bgTint: 'rgba(16, 185, 129, 0.12)',
      borderTint: 'rgba(16, 185, 129, 0.25)',
    },
  ] as QualifierBenefit[],
};
