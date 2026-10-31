import { Shell } from '@/components/refonte/Shell';
import { CasProvider } from '@/components/refonte/CasProvider';
import { Hero } from '@/components/refonte/home/Hero';
import { Three } from '@/components/refonte/home/Three';
import { Socle } from '@/components/refonte/home/Socle';
import { Agents } from '@/components/refonte/home/Agents';
import { Modules } from '@/components/refonte/home/Modules';
import { Stay } from '@/components/refonte/home/Stay';
import { Control } from '@/components/refonte/home/Control';
import { OfferTeaser } from '@/components/refonte/home/OfferTeaser';
import { DemoCta } from '@/components/refonte/home/DemoCta';

export default function Home() {
  return (
    <Shell>
      <CasProvider>
        <Hero />
        <Three />
        <Socle />
        <Agents />
        <Modules />
        <Stay />
        <Control />
        <OfferTeaser />
        <DemoCta />
      </CasProvider>
    </Shell>
  );
}
