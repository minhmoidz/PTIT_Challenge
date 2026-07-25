import { httpClient } from '@/services/http/client';
import type {
  PublicTeamProfile,
  PublicTeamFilterParams,
  PublicTeamListResult,
} from '@/types/publicTeam';
import { MOCK_PUBLIC_TEAMS_FIXTURE } from '@/fixtures/publicTeamsFixture';

/**
 * Privacy Enforcement Guard:
 * Filters out any team profile that is NOT explicitly approved and published.
 * Ensures NO sensitive internal fields (student ID, emails, phone numbers, judge notes) exist in output.
 */
const sanitizeAndFilterPublicTeams = (teams: PublicTeamProfile[]): PublicTeamProfile[] => {
  if (!Array.isArray(teams)) return [];

  return teams
    .filter((team) => {
      if (!team || typeof team !== 'object') return false;
      const pub = team.publication;
      if (!pub) return false;
      return pub.status === 'published' && pub.showTeamProfile === true;
    })
    .map((team) => {
      const pub = team.publication;
      return {
        id: String(team.id),
        slug: String(team.slug),
        teamName: String(team.teamName),
        teamSize: (team.teamSize >= 3 && team.teamSize <= 5 ? team.teamSize : 3) as 3 | 4 | 5,
        challengeCategory: team.challengeCategory,
        challengeCategoryLabel: team.challengeCategoryLabel,
        slogan: team.slogan ? String(team.slogan) : undefined,
        shortDescription: team.shortDescription ? String(team.shortDescription) : undefined,
        logoUrl: team.logoUrl ? String(team.logoUrl) : undefined,
        coverImageUrl: team.coverImageUrl ? String(team.coverImageUrl) : undefined,
        competitionStatus: team.competitionStatus,
        statusLabel: team.statusLabel,
        publicMembers: pub.showMemberNames && Array.isArray(team.publicMembers)
          ? team.publicMembers.map((m) => ({
              displayName: String(m.displayName),
              role: m.role ? String(m.role) : undefined,
              major: m.major ? String(m.major) : undefined,
              avatarUrl: pub.showMemberPhotos && m.avatarUrl ? String(m.avatarUrl) : undefined,
            }))
          : undefined,
        project: pub.showProjectSummary && team.project
          ? {
              title: team.project.title ? String(team.project.title) : undefined,
              summary: team.project.summary ? String(team.project.summary) : undefined,
              problem: team.project.problem ? String(team.project.problem) : undefined,
              solution: team.project.solution ? String(team.project.solution) : undefined,
              tags: Array.isArray(team.project.tags) ? team.project.tags.map(String) : undefined,
            }
          : undefined,
        publication: {
          status: pub.status,
          showTeamProfile: pub.showTeamProfile,
          showMemberNames: pub.showMemberNames,
          showMemberPhotos: pub.showMemberPhotos,
          showProjectSummary: pub.showProjectSummary,
          approvedAt: pub.approvedAt,
          publishedAt: pub.publishedAt,
        },
        updatedAt: team.updatedAt,
      };
    });
};

export const fetchPublicTeams = async (
  params?: PublicTeamFilterParams,
): Promise<PublicTeamListResult> => {
  let sourceTeams: PublicTeamProfile[] = [];

  try {
    const { data } = await httpClient.get<PublicTeamProfile[]>('/public/teams', {
      params,
    });
    if (Array.isArray(data)) {
      sourceTeams = data;
    }
  } catch {
    // In production, if backend API is not available yet, return empty list
    // In local development, fallback to MOCK_PUBLIC_TEAMS_FIXTURE for dev testing
    if (import.meta.env.DEV) {
      sourceTeams = MOCK_PUBLIC_TEAMS_FIXTURE;
    } else {
      sourceTeams = [];
    }
  }

  const sanitized = sanitizeAndFilterPublicTeams(sourceTeams);

  // Client-side filtering & search
  let filtered = [...sanitized];

  if (params?.category && params.category !== 'all') {
    filtered = filtered.filter((t) => t.challengeCategory === params.category);
  }

  if (params?.status && params.status !== 'all') {
    filtered = filtered.filter((t) => t.competitionStatus === params.status);
  }

  if (params?.search && params.search.trim() !== '') {
    const query = params.search.trim().toLowerCase();
    filtered = filtered.filter(
      (t) =>
        t.teamName.toLowerCase().includes(query) ||
        (t.slogan && t.slogan.toLowerCase().includes(query)) ||
        (t.shortDescription && t.shortDescription.toLowerCase().includes(query)) ||
        (t.project?.title && t.project.title.toLowerCase().includes(query)) ||
        (t.project?.summary && t.project.summary.toLowerCase().includes(query)),
    );
  }

  const finalists = filtered.filter((t) => t.competitionStatus === 'finalist' || t.competitionStatus === 'winner');

  return {
    teams: filtered,
    total: filtered.length,
    hasMore: false,
    finalists,
  };
};

export const fetchPublicTeamBySlug = async (
  slug: string,
): Promise<PublicTeamProfile | null> => {
  try {
    const { data } = await httpClient.get<PublicTeamProfile>(`/public/teams/${slug}`);
    if (data && data.publication?.status === 'published' && data.publication?.showTeamProfile) {
      const sanitized = sanitizeAndFilterPublicTeams([data]);
      return sanitized[0] || null;
    }
  } catch {
    if (import.meta.env.DEV) {
      const match = MOCK_PUBLIC_TEAMS_FIXTURE.find((t) => t.slug === slug);
      if (match) {
        const sanitized = sanitizeAndFilterPublicTeams([match]);
        return sanitized[0] || null;
      }
    }
  }
  return null;
};
