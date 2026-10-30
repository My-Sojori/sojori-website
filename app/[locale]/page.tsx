import { Metadata } from 'next';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { PageHeader, PageFooter } from '@/components/SharedComponents';
import { Hero, TrustBar } from '@/components/homepage/Hero';
import { ValueProp } from '@/components/homepage/ValueProp';
import { WhatsAppCase } from '@/components/homepage/WhatsAppCase';
import { FeaturesAccordion } from '@/components/homepage/FeaturesAccordion';
import { SocialProof } from '@/components/homepage/SocialProof';
import { Pricing } from '@/components/homepage/Pricing';
import { FinalCTA } from '@/components/homepage/FinalCTA';

// Metadata will be handled by the layout
export default function Home() {
  return (
    <>
      <BackgroundEffects />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <PageHeader />
        <main>
          <Hero />
          <TrustBar />
          <ValueProp />
          <WhatsAppCase />
          <FeaturesAccordion />
          <SocialProof />
          <Pricing />
          <FinalCTA />
        </main>
        <PageFooter />
      </div>
    </>
  );
}
