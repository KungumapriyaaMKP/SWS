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

export default function Home() {
  useSmoothScroll();

  return (
    <div className="relative w-full overflow-hidden bg-[#F6F0FA] dark:bg-[#0B0813] text-purple-950 dark:text-white transition-colors duration-500">
      <HeroSection />
      <ServicesSection />
      <IdeaToImpactSection />
      <PortfolioSection />
      <WhySumyaSection />
      <ProcessSection />
      <AboutSection />
      <SocialProofSection />
      <FinalCTASection />
      <ContactSection />
    </div>
  );
}
