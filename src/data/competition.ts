export interface CompetitionData {
  meta: {
    fullName: string;
    shortName: string;
    theme: string;
    type: string;
    eligibility: string;
    description: string;
    fullDescription: string;
    secondParagraph: string;
    objectives: string[];
  };
  eligibility: {
    target: string;
    details: string[];
  };
  teamRules: {
    size: string;
    rules: string[];
    warning: string;
  };
  format: string;
  registrationPeriod: string;
  timeline: {
    id: string;
    title: string;
    period: string;
    note: string;
    needsDateConfirmation?: boolean;
  }[];
  judgingCriteria: string[];
  generalRules: string[];
  prizes: {
    rank: number;
    title: string;
    quantity: number;
    value: string;
    status: "confirmed" | "updating";
  }[];
  qualifierBenefits: {
    id: string;
    step: string;
    title: string;
    description: string;
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
  form: {
    parts: string[];
    team: {
      fields: string[];
    };
    member: {
      roles: string[];
      validation: string[];
    };
    commitment: {
      checkboxes: string[];
    };
  };
  contact: {
    email: string;
    facebook: string;
    facebookIec: string;
    facebookPtit: string;
    websitePtit: string;
    websiteIec: string;
    phone: string;
  };
  partners: any[];
  mentors: any[];
  councilMembers: any[];
}

export const competitionData: CompetitionData = {
  meta: {
    fullName: "PTIT Innovation Catalyst Challenge 2026",
    shortName: "PICC 2026",
    theme: "Rise Beyond Limits",
    type: "Cuộc thi giải Case Study cấp Học viện.",
    eligibility: "Sinh viên PTIT",
    description: "Giải quyết bài toán doanh nghiệp bằng tư duy công nghệ, kinh doanh, marketing và truyền thông.",
    fullDescription: "PTIT Innovation Catalyst Challenge 2026 (PICC) là cuộc thi giải Case Study cấp Học viện dành cho sinh viên Học viện Công nghệ Bưu chính Viễn thông, nơi các đội thi liên ngành cùng giải quyết những bài toán thực tiễn do doanh nghiệp đặt ra thông qua sự kết hợp giữa tư duy công nghệ, kinh doanh, marketing và truyền thông.",
    secondParagraph: "Với chủ đề ‘Rise Beyond Limits’, PICC 2026 hướng đến việc tạo ra một môi trường học tập gắn liền với thực tiễn, nơi sinh viên không chỉ đề xuất ý tưởng mà còn trực tiếp nghiên cứu, xây dựng và triển khai giải pháp cùng doanh nghiệp.",
    objectives: [
      "Phát triển tư duy chiến lược.",
      "Nâng cao năng lực giải quyết vấn đề.",
      "Phát triển kỹ năng làm việc nhóm.",
      "Tăng khả năng thích ứng với thách thức thực tế.",
      "Tạo giá trị thiết thực cho doanh nghiệp và cộng đồng."
    ]
  },
  eligibility: {
    target: "Sinh viên PTIT",
    details: ["Sinh viên đang học tập tại Học viện Công nghệ Bưu chính Viễn thông (PTIT)."]
  },
  teamRules: {
    size: "03–05 thành viên",
    rules: ["Có tối thiểu 02 thành viên thuộc khối kinh tế số, marketing, truyền thông đa phương tiện hoặc thiết kế."],
    warning: "Trong đội có tối thiểu 02 thành viên thuộc khối kinh tế số, marketing, truyền thông đa phương tiện hoặc thiết kế."
  },
  format: "Case Study doanh nghiệp",
  registrationPeriod: "01/08 – 15/08/2026",
  timeline: [
    {
      id: "stage1",
      title: "Đăng ký / Vòng đơn",
      period: "01/08 – 15/08/2026",
      note: "Các đội giải một đề bài chung do Ban Tổ chức công bố."
    },
    {
      id: "stage2",
      title: "Vòng Bán kết",
      period: "20/08 – 15/09/2026",
      note: "Top 18 đội làm việc cùng mentor. 18 đội được chia thành 06 tiểu ban. Mỗi tiểu ban gồm 03 đội cùng giải một đề bài. Các đội thuyết trình và trả lời câu hỏi. Doanh nghiệp trực tiếp đánh giá. Mỗi đề bài chọn 01 đội xuất sắc nhất."
    },
    {
      id: "stage3",
      title: "Chạy thử nghiệm",
      period: "07/09 – 01/10/2026",
      note: "Triển khai thử nghiệm giải pháp bằng nguồn lực doanh nghiệp cung cấp. Thu thập dữ liệu thực tế. Đánh giá tính khả thi. Hoàn thiện giải pháp. Chuẩn bị báo cáo và minh chứng.",
      needsDateConfirmation: true
    },
    {
      id: "stage4",
      title: "Vòng Chung kết",
      period: "02/10/2026",
      note: "06 đội xuất sắc nhất bước vào Chung kết. Vòng 1 — Thuyết trình: Trình bày kế hoạch và kết quả triển khai. Trả lời câu hỏi của Hội đồng Giám khảo. Đánh giá năng lực phân tích, tính khả thi và hiệu quả. Vòng 2 — Tranh biện đối kháng: Sáu đội được ghép thành 03 cặp. Phản biện và bảo vệ giải pháp. Thể hiện tư duy phản biện và khả năng xử lý tình huống."
    }
  ],
  judgingCriteria: [
    "Mức độ rõ ràng và ý nghĩa của vấn đề.",
    "Tính khả thi khi triển khai thực tế.",
    "Giá trị tạo ra cho doanh nghiệp.",
    "Năng lực đội thi và chất lượng trình bày, phản biện."
  ],
  generalRules: [
    "Mỗi sinh viên chỉ được tham gia 01 đội thi.",
    "Sản phẩm dự thi phải do chính đội thực hiện và chưa từng đạt giải tại các cuộc thi khác.",
    "Đội thi chịu trách nhiệm về tính trung thực của toàn bộ nội dung dự thi.",
    "Ban Tổ chức có quyền sử dụng hình ảnh, bài dự thi và các sản phẩm truyền thông cho mục đích quảng bá, đồng thời bảo mật thông tin thuộc doanh nghiệp theo quy định.",
    "Quyết định của Ban Tổ chức và Hội đồng Giám khảo là quyết định cuối cùng."
  ],
  prizes: [
    {
      rank: 1,
      title: "Quán quân",
      quantity: 1,
      value: "Tổng giá trị dự kiến lên tới 10.000.000 VNĐ",
      status: "confirmed"
    },
    {
      rank: 2,
      title: "Á quân",
      quantity: 1,
      value: "Giải thưởng và quyền lợi từ Ban Tổ chức và doanh nghiệp đồng hành",
      status: "updating"
    },
    {
      rank: 3,
      title: "Quý quân",
      quantity: 1,
      value: "Giải thưởng và quyền lợi từ Ban Tổ chức và doanh nghiệp đồng hành",
      status: "updating"
    },
    {
      rank: 4,
      title: "Giải Khuyến khích",
      quantity: 3,
      value: "Các phần thưởng và quyền lợi dành cho những đội thi nổi bật",
      status: "updating"
    }
  ],
  qualifierBenefits: [
    {
      id: "career",
      step: "01",
      title: "Cơ Hội Nghề Nghiệp",
      description: "Thực tập và làm việc trực tiếp tại các doanh nghiệp công nghệ đồng hành."
    },
    {
      id: "education",
      step: "02",
      title: "Học Bổng & Đào Tạo",
      description: "Tiếp cận các gói học bổng chuyên sâu và chương trình nâng cao năng lực."
    },
    {
      id: "mentoring",
      step: "03",
      title: "Mentoring Chuyên Sâu",
      description: "Được tư vấn & hướng dẫn trực tiếp 1:1 bởi các chuyên gia và đại diện doanh nghiệp."
    },
    {
      id: "pilot",
      step: "04",
      title: "Thử Nghiệm Thực Tế",
      description: "Cơ hội pilot và thử nghiệm giải pháp trong môi trường doanh nghiệp thực tế."
    },
    {
      id: "incubation",
      step: "05",
      title: "Ươm Tạo Dự Án",
      description: "Kết nối trực tiếp vào chương trình ươm tạo và hệ sinh thái phát triển lâu dài."
    }
  ],
  faq: [
    {
      question: "Ai có thể tham gia PICC 2026?",
      answer: "Sinh viên Học viện Công nghệ Bưu chính Viễn thông."
    },
    {
      question: "Một đội có bao nhiêu thành viên?",
      answer: "03–05 thành viên."
    },
    {
      question: "Đội thi có yêu cầu về cơ cấu ngành không?",
      answer: "Có, tối thiểu 02 thành viên thuộc các nhóm ngành được quy định."
    },
    {
      question: "Thời gian đăng ký là khi nào?",
      answer: "01/08–15/08/2026."
    },
    {
      question: "Cuộc thi gồm những giai đoạn nào?",
      answer: "04 giai đoạn chính."
    },
    {
      question: "Các đội giải quyết dạng bài toán nào?",
      answer: "Bài toán thực tế do doanh nghiệp đưa ra."
    },
    {
      question: "Tiêu chí đánh giá gồm những gì?",
      answer: "Hiển thị đúng 04 tiêu chí, không có phần trăm."
    },
    {
      question: "Cơ cấu giải thưởng như thế nào?",
      answer: "Hiển thị dữ liệu giải thưởng đang được xác nhận."
    },
    {
      question: "Có thể tham gia nhiều đội không?",
      answer: "Không, mỗi sinh viên chỉ tham gia 01 đội."
    },
    {
      question: "Liên hệ Ban Tổ chức bằng cách nào?",
      answer: "Facebook chính thức: https://www.facebook.com/PTITIEC"
    }
  ],
  form: {
    parts: [
      "I. THÔNG TIN ĐỘI THI",
      "II. THÔNG TIN THÀNH VIÊN",
      "III. CAM KẾT"
    ],
    team: {
      fields: [
        "Tên đội thi (bắt buộc)",
        "Số lượng thành viên (bắt buộc) - Chọn: 3, 4, 5",
        "Email liên hệ của đội trưởng (bắt buộc)",
        "Số điện thoại đội trưởng (bắt buộc)",
        "Nhóm bài toán muốn tham gia - Các lựa chọn: Kinh tế và Kinh doanh, Công nghệ, Marketing, Truyền thông, Khác"
      ]
    },
    member: {
      roles: [
        "Đội trưởng (bắt buộc)",
        "Thành viên 2 (bắt buộc)",
        "Thành viên 3 (bắt buộc)",
        "Thành viên 4 (hiển thị khi quy mô đội từ 4)",
        "Thành viên 5 (hiển thị khi quy mô đội là 5)"
      ],
      validation: [
        "Không cho trùng mã sinh viên",
        "Không cho trùng email",
        "Cảnh báo nếu trùng số điện thoại"
      ]
    },
    commitment: {
      checkboxes: [
        "Chúng tôi cam kết mọi thông tin cung cấp trong biểu mẫu là chính xác và trung thực.",
        "Chúng tôi đồng ý để Ban Tổ chức sử dụng hình ảnh, video và các tư liệu liên quan trong quá trình tham gia cuộc thi phục vụ cho mục đích truyền thông và quảng bá.",
        "Chúng tôi đã đọc, hiểu và đồng ý tuân thủ Thể lệ cuộc thi PTIT Innovation Catalyst Challenge 2026."
      ]
    }
  },
  contact: {
    email: "iec@ptit.edu.vn",
    facebook: "https://www.facebook.com/PTITIEC",
    facebookIec: "https://www.facebook.com/PTITIEC",
    facebookPtit: "https://www.facebook.com/HocvienPTIT",
    websitePtit: "https://ptit.edu.vn/",
    websiteIec: "https://iec.ptit.edu.vn/",
    phone: "(024) 3352-5741"
  },
  partners: [],
  mentors: [],
  councilMembers: []
};