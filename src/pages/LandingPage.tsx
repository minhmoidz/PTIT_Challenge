import { HeroSection } from '@/sections/hero/HeroSection';
import { IntroductionSection } from '@/sections/introduction/IntroductionSection';
import { TimelineSection } from '@/sections/timeline/TimelineSection';
import { RulesSection } from '@/sections/rules/RulesSection';
import { AwardsSection } from '@/sections/awards/AwardsSection';
import { MentorsSection } from '@/sections/mentors/MentorsSection';
import { SponsorsSection } from '@/sections/sponsors/SponsorsSection';
import { FAQSection } from '@/sections/faq/FAQSection';
import { CTASection } from '@/sections/cta/CTASection';
import { RegistrationSection } from '@/sections/registration/RegistrationSection';
import { competitionData } from '@/data/competition';

export const LandingPage = () => (
  <>
    <HeroSection />
    <IntroductionSection />
    <TimelineSection />
    <RulesSection />
    <AwardsSection />
    {competitionData.mentors.length > 0 && <MentorsSection />}
    {competitionData.partners.length > 0 && <SponsorsSection />}
    <FAQSection />
    <CTASection />
    <RegistrationSection />
  </>
);

export default LandingPage;
