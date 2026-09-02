'use client';

import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { HeroSection } from '@/components/hero/HeroSection';
import { ServicesSection } from '@/components/services/ServicesSection';
import { IdeaToImpactSection } from '@/components/process/IdeaToImpactSection';
import { PortfolioSection } from '@/components/portfolio/PortfolioSection';
import { ProcessSection } from '@/components/timeline/ProcessSection';
import { AboutSection } from '@/components/about/AboutSection';
import { SocialProofSection } from '@/components/proof/SocialProofSection';
import { FinalCTASection } from '@/components/cta/FinalCTASection';
import { ContactSection } from '@/components/contact/ContactSection';
import { FAQSection } from '@/components/faq/FAQSection';
import { BotanicalFlourish } from '@/components/botanical/BotanicalFlourish';

export default function Home() {
  useSmoothScroll();

  return (
    <div className="relative w-full overflow-hidden bg-white dark:bg-[#0A0810] text-ebony dark:text-silk-100 transition-colors duration-500">
      <HeroSection />
      <BotanicalFlourish variant="divider" />
      <ServicesSection />
      <BotanicalFlourish variant="divider" />
      <IdeaToImpactSection />
      <BotanicalFlourish variant="divider" />
      <PortfolioSection />
      <BotanicalFlourish variant="divider" />
      <ProcessSection />
      <BotanicalFlourish variant="divider" />
      <AboutSection />
      <BotanicalFlourish variant="divider" />
      <SocialProofSection />
      <BotanicalFlourish variant="divider" />
      <FAQSection />
      <BotanicalFlourish variant="divider" />
      <FinalCTASection />
      <ContactSection />
    </div>
  );
}
