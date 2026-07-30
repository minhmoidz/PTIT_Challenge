import { describe, expect, it } from 'vitest';
import { MOCK_PUBLIC_TEAMS_FIXTURE } from '@/fixtures/publicTeamsFixture';
import { sanitizeAndFilterPublicTeams } from './publicTeamsApi';

describe('sanitizeAndFilterPublicTeams', () => {
  it('preserves the five-member count of a published historical profile', () => {
    const legacyTeam = MOCK_PUBLIC_TEAMS_FIXTURE.find((team) => team.teamSize === 5);
    expect(legacyTeam).toBeDefined();

    const sanitized = sanitizeAndFilterPublicTeams(legacyTeam ? [legacyTeam] : []);

    expect(sanitized).toHaveLength(1);
    expect(sanitized[0].teamSize).toBe(5);
  });
});
