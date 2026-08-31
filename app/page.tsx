'use client';

import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { HeroSection } from '@/components/hero/HeroSection';
import { ServicesSection } from '@/components/services/ServicesSection';
import { IdeaToImpactSection } from '@/components/process/IdeaToImpactSection';
import { PortfolioSection } from '@/components/portfolio/PortfolioSection';
import { WhySumyaSection } from '@/components/why-sumya/WhySumyaSection';
import { ProcessSection } from '@/components/timeline/ProcessSection';
import { AboutSection } from '@/components/about/AboutSection';
import { SocialProofSection } from '@/components/proof/SocialProofSection';
import { FinalCTASection } from '@/components/cta/FinalCTASection';
import { ContactSection } from '@/components/contact/ContactSection';
import { BotanicalFlourish } from '@/components/botanical/BotanicalFlourish';

export default function Home() {
  useSmoothScroll();

  return (
    <div className="relative w-full overflow-hidden bg-[#FAF8F5] dark:bg-[#0A0810] text-ebony dark:text-silk-100 transition-colors duration-500">
      <HeroSection />
      <BotanicalFlourish variant="divider" />
      <ServicesSection />
      <BotanicalFlourish variant="divider" />
      <IdeaToImpactSection />
      <BotanicalFlourish variant="divider" />
      <PortfolioSection />
      <BotanicalFlourish variant="divider" />
      <WhySumyaSection />
      <BotanicalFlourish variant="divider" />
      <ProcessSection />
      <BotanicalFlourish variant="divider" />
      <AboutSection />
      <BotanicalFlourish variant="divider" />
      <SocialProofSection />
      <BotanicalFlourish variant="divider" />
      <FinalCTASection />
      <ContactSection />
    </div>
  );
}
