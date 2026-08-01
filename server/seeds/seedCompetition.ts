import { competitionData } from '../../src/data/competition';
import { assertDatabaseReachable, prisma } from '../db/prisma';
import { dbStore } from '../db/store';
import { CompetitionStatusService } from '../services/competitionStatus';

/**
 * Ensures the competition row that every registration is foreign-keyed to, and
 * persists the registration window from the environment as the initial value.
 * Idempotent — safe to re-run.
 *
 * Scope note: the public content endpoints (milestones, FAQs, prizes, benefits,
 * partners, mentors) still serve from `src/data/competition.ts`. Seeding those
 * tables would create a second source of truth with no reader, so this seed
 * deliberately leaves them alone. Migrating content into the database is a
 * separate piece of work.
 */
export const seedOfficialCompetitionData = async () => {
  console.log('[Seed] Ensuring PICC 2026 competition record...');

  const competitionId = await dbStore.ensureCompetition();
  await CompetitionStatusService.hydrate();

  const row = await prisma.competition.findUnique({ where: { id: competitionId } });

  console.log(`- Competition: ${competitionData.meta.fullName}`);
  console.log(`- Id:          ${competitionId}`);
  console.log(`- Open at:     ${row?.registrationOpenAt?.toISOString() ?? '(chưa đặt)'}`);
  console.log(`- Close at:    ${row?.registrationCloseAt?.toISOString() ?? '(chưa đặt)'}`);
  console.log(`- Registrations in database: ${await prisma.registration.count()}`);
  console.log('[Seed] Done.');
};

if (import.meta.url === `file://${process.argv[1]}`) {
  assertDatabaseReachable()
    .then(seedOfficialCompetitionData)
    .catch((err) => {
      console.error('[Seed] Failed:', err instanceof Error ? err.message : err);
      process.exitCode = 1;
    })
    .finally(() => prisma.$disconnect());
}
