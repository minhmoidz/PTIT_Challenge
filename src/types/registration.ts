export type ApprovalStatus = 'unresolved' | 'draft' | 'approved';

export interface ApprovedValue<T> {
  value: T | null;
  status: ApprovalStatus;
  source: string;
  approvedBy?: string;
  approvedAt?: string;
}

export type RegistrationStatus =
  | 'not_configured'
  | 'not_open'
  | 'open'
  | 'closed'
  | 'manually_disabled';

export interface TeamMember {
  role: 'leader' | 'member';
  fullName: string;
  studentId: string;
  major: string;
  email: string;
  phone: string;
}

export interface PublicConsentValues {
  shareTeamProfile: boolean;
  shareMemberNames: boolean;
  shareLogoOrPhotos: boolean;
  shareProjectSummary: boolean;
}

export interface RegistrationFormValues {
  teamName: string;
  teamSize: number;
  challengeCategories: string[];
  otherChallengeCategory?: string;
  previousCompetitions?: string;
  featuredProject: string;
  expectations: string;
  companyExperience: 'none' | 'previous' | 'ongoing';
  members: TeamMember[];
  commitments: {
    truthfulInformation: boolean;
    mediaConsent: boolean;
    rulesAccepted: boolean;
    privacyAcknowledged: boolean;
  };
  publicConsent?: PublicConsentValues;
  honeypot: string;
  formStartedAt: string;
}

export interface RegistrationDraftEnvelope {
  version: 1;
  savedAt: string;
  expiresAt: string;
  values: RegistrationFormValues;
}

export interface TimelineItem {
  id: string;
  order: number;
  title: string;
  dateLabel: string;
  description: string[];
  status?: 'completed' | 'active' | 'upcoming';
  accent: 'blue' | 'pink' | 'yellow' | 'orange' | 'green';
}

export interface PublicPiccConfig {
  serverTime: string;
  environment: 'preview' | 'production';
  registration: {
    openAt: string | null;
    closeAt: string | null;
    allowSubmissions: boolean;
    explicitlyDisabled: boolean;
    statusMessage?: string;
  };
  teamSize: {
    min: number;
    max: number | null;
    approvalStatus: ApprovalStatus;
  };
  challengeSelection: {
    mode: 'single' | 'multiple' | null;
    maxSelections?: number;
  };
  timeline: TimelineItem[];
}

export interface PiccAsset {
  id: string;
  src: string;
  width?: number;
  height?: number;
  usage: 'production-candidate' | 'conditional' | 'reference-only' | 'deprecated';
  containsText: boolean;
  approvalStatus: ApprovalStatus;
  enabled?: boolean;
}

export type ErrorCode =
  | 'INVALID_TEAM_SIZE'
  | 'VALIDATION_ERROR'
  | 'REGISTRATION_NOT_OPEN'
  | 'REGISTRATION_CLOSED'
  | 'DUPLICATE_REGISTRATION'
  | 'RATE_LIMITED'
  | 'STORAGE_UNAVAILABLE'
  | 'INTERNAL_ERROR';

export interface ApiError {
  success: false;
  error: {
    code: ErrorCode;
    message: string;
    requestId: string;
    fieldErrors?: Record<string, string>;
  };
}

export interface ApiSuccess {
  success: true;
  data: {
    registrationCode: string;
    submissionId: string;
    submittedAt: string;
  };
}
