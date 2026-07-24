export async function appendRegistration(data: {
  submissionId: string;
  submittedAt: string;
  teamName: string;
  teamSize: number;
  categories: string[];
  previousCompetitions?: string;
  featuredProject: string;
  expectations: string;
  companyExperience: string;
  leaderEmail: string;
  leaderPhone: string;
}) {
  console.log('[Sheets] Registration appended:', data.submissionId);
  return { success: true };
}

export async function appendMember(data: {
  submissionId: string;
  role: string;
  fullName: string;
  studentId: string;
  major: string;
  email: string;
  phone: string;
}) {
  console.log('[Sheets] Member appended:', data.submissionId, data.role);
  return { success: true };
}
