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

export const metadata: Metadata = {
  title: `Sojori — L'Orchestrateur Intelligent des Locations Courte Durée`,
  description: 'PMS complet + Channel Manager + Orchestration AI. Automatisez 23 tâches de la réservation au checkout. WhatsApp AI 24/7, Staff Management, Analytics.',
};

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
