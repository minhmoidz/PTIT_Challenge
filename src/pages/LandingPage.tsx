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

export const LandingPage = () => (
  <>
    <HeroSection />
    <IntroductionSection />
    <TimelineSection />
    <RulesSection />
    <AwardsSection />
    <MentorsSection />
    <SponsorsSection />
    <FAQSection />
    <CTASection />
    <RegistrationSection />
  </>
);

export default LandingPage;
