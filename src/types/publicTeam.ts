export type ChallengeCategoryType =
  | 'business'
  | 'technology'
  | 'marketing'
  | 'communications'
  | 'other';

export type TeamCompetitionStatus =
  | 'verified'
  | 'round_one'
  | 'semifinalist'
  | 'pilot'
  | 'finalist'
  | 'winner'
  | 'completed';

export type PublicationStatus =
  | 'draft'
  | 'pending_review'
  | 'approved'
  | 'published'
  | 'hidden'
  | 'rejected';

export interface PublicMember {
  displayName: string;
  avatarUrl?: string;
  role?: string;
  major?: string;
}

export interface PublicProject {
  title?: string;
  summary?: string;
  problem?: string;
  solution?: string;
  tags?: string[];
}

export interface PublicationSettings {
  status: PublicationStatus;
  showTeamProfile: boolean;
  showMemberNames: boolean;
  showMemberPhotos: boolean;
  showProjectSummary: boolean;
  approvedAt?: string;
  publishedAt?: string;
}

export interface PublicTeamProfile {
  id: string;
  slug: string;
  teamName: string;
  /** Historical published profiles may retain the former five-member team size. */
  teamSize: 3 | 4 | 5;
  challengeCategory: ChallengeCategoryType;
  challengeCategoryLabel: string;
  slogan?: string;
  shortDescription?: string;
  logoUrl?: string;
  coverImageUrl?: string;
  competitionStatus: TeamCompetitionStatus;
  statusLabel: string;
  publicMembers?: PublicMember[];
  project?: PublicProject;
  publication: PublicationSettings;
  updatedAt: string;
}

export interface PublicTeamFilterParams {
  category?: ChallengeCategoryType | 'all';
  status?: TeamCompetitionStatus | 'all';
  search?: string;
  page?: number;
  limit?: number;
}

export interface PublicTeamListResult {
  teams: PublicTeamProfile[];
  total: number;
  hasMore: boolean;
  finalists: PublicTeamProfile[];
}

/* ── Status Label & Color Mapping Helpers ── */
export const TEAM_STATUS_MAP: Record<
  TeamCompetitionStatus,
  { label: string; color: 'blue' | 'purple' | 'amber' | 'emerald' | 'gold' | 'gray' }
> = {
  verified: { label: 'Đã xác nhận', color: 'blue' },
  round_one: { label: 'Vòng 1', color: 'blue' },
  semifinalist: { label: 'Top 18 Bán kết', color: 'purple' },
  pilot: { label: 'Thử nghiệm Pilot', color: 'amber' },
  finalist: { label: 'Top 6 Chung kết', color: 'emerald' },
  winner: { label: 'Đạt giải', color: 'gold' },
  completed: { label: 'Hoàn thành hành trình', color: 'gray' },
};

export const CATEGORY_LABEL_MAP: Record<ChallengeCategoryType, string> = {
  business: 'Kinh tế & Kinh doanh',
  technology: 'Công nghệ',
  marketing: 'Marketing',
  communications: 'Truyền thông',
  other: 'Khác',
};
