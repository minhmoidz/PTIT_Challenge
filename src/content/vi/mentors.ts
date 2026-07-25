export interface MentorData {
  id: string;
  name: string;
  academicTitle?: string;
  professionalTitle: string;
  organization: string;
  competitionRole: string;
  image?: string;
  isLead?: boolean;
}

export const mentorsContent = {
  badge: 'Hội Đồng Cố Vấn',
  title: 'Hội Đồng Giám Sát & Cố Vấn Chuyên Môn',
  subtitle:
    'Đồng hành cùng các đội thi là đội ngũ chuyên gia giàu kinh nghiệm từ học thuật, công nghệ và doanh nghiệp.',
  members: [
    {
      id: 'tran-quang-anh',
      name: 'PGS. TS. Trần Quang Anh',
      academicTitle: 'PGS. TS.',
      professionalTitle: 'Phó Giám đốc Học viện',
      organization: 'Học viện Công nghệ Bưu chính Viễn thông (PTIT)',
      competitionRole: 'Trưởng Ban Giám khảo',
      isLead: true,
    },
    {
      id: 'nguyen-viet-hung',
      name: 'TS. Nguyễn Việt Hùng',
      academicTitle: 'TS.',
      professionalTitle: 'Giám đốc Trung tâm AI',
      organization: 'PTIT Innovation Hub & AI Lab',
      competitionRole: 'Cố vấn Chuyên môn',
      isLead: false,
    },
    {
      id: 'le-hoang-nam',
      name: 'ThS. Lê Hoàng Nam',
      academicTitle: 'ThS.',
      professionalTitle: 'Head of Venture Building',
      organization: 'Quỹ Đầu tư Khởi nghiệp Sáng tạo',
      competitionRole: 'Mentor Đổi mới Sáng tạo',
      isLead: false,
    },
    {
      id: 'pham-thanh-huong',
      name: 'ThS. Phạm Thanh Hương',
      academicTitle: 'ThS.',
      professionalTitle: 'Senior Product Manager',
      organization: 'Tập đoàn Công nghệ Hàng đầu',
      competitionRole: 'Cố vấn Sản phẩm',
      isLead: false,
    },
  ] as MentorData[],
};
