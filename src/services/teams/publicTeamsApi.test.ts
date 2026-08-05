import { describe, expect, it } from 'vitest';
import { MOCK_PUBLIC_TEAMS_FIXTURE } from '@/fixtures/publicTeamsFixture';
import { sanitizeAndFilterPublicTeams } from './publicTeamsApi';

describe('sanitizeAndFilterPublicTeams', () => {
  it('preserves the five-member count of a published historical profile', () => {
    const legacyTeam = MOCK_PUBLIC_TEAMS_FIXTURE.find((team) => team.teamSize === 5);
    expect(legacyTeam).toBeDefined();

    const sanitized = sanitizeAndFilterPublicTeams(legacyTeam ? [legacyTeam] : []);

    expect(sanitized).toHaveLength(1);
    expect(sanitized[0]?.teamSize).toBe(5);
  });

  it('removes project data when showProjectSummary is false', () => {
    const team = {
      ...MOCK_PUBLIC_TEAMS_FIXTURE[0]!,
      publication: {
        ...MOCK_PUBLIC_TEAMS_FIXTURE[0]!.publication,
        showProjectSummary: false,
      },
    };

    const sanitized = sanitizeAndFilterPublicTeams([team]);

    expect(sanitized[0]?.project).toBeUndefined();
  });
});
