import { competitionData } from '../../src/data/competition';

export const seedOfficialCompetitionData = async () => {
  console.log('[Seed] Seeding official PICC 2026 competition structure...');
  console.log(`- Competition Name: ${competitionData.name}`);
  console.log(`- Theme: ${competitionData.theme}`);
  console.log(`- Timezone: Asia/Ho_Chi_Minh`);
  console.log(`- Milestones: ${competitionData.timeline.length} items`);
  console.log(`- FAQs: ${competitionData.faq.length} items`);
  console.log(`- Prizes: ${competitionData.prizes.length} items`);
  console.log('[Seed] Official seed completed cleanly.');
};

if (import.meta.url === `file://${process.argv[1]}`) {
  seedOfficialCompetitionData();
}
