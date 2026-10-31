import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Shell } from '@/components/refonte/Shell';
import { CasProvider } from '@/components/refonte/CasProvider';
import { Faq } from '@/components/refonte/Faq';
import { JsonLd } from '@/components/refonte/JsonLd';
import { Hero } from '@/components/refonte/home/Hero';
import { Three } from '@/components/refonte/home/Three';
import { Socle } from '@/components/refonte/home/Socle';
import { Agents } from '@/components/refonte/home/Agents';
import { Modules } from '@/components/refonte/home/Modules';
import { Stay } from '@/components/refonte/home/Stay';
import { Control } from '@/components/refonte/home/Control';
import { OfferTeaser } from '@/components/refonte/home/OfferTeaser';
import { DemoCta } from '@/components/refonte/home/DemoCta';
import { generateSEO } from '@/lib/seo';
import { SITE_URL } from '@/lib/siteUrl';

const AGENTS = ['booking', 'service', 'operations', 'pricing', 'assistant', 'studio', 'site', 'commercial', 'prospecting', 'marketingFinance', 'calls'] as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'refonte.home.meta' });
  return generateSEO({ title: t('title'), description: t('description'), path: `/${locale}`, locale, alternatesPath: '' });
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'refonte.home' });
  const faq = t.raw('faq.items') as { q: string; a: string }[];

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
        <Faq id="sj2-faq-home" eyebrow={t('faq.eyebrow')} title={t('faq.title')} items={faq} />
        <DemoCta />
      </CasProvider>
      {/* Pas d'`offers` : aucun prix public. */}
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Sojori',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        url: `${SITE_URL}/${locale}`,
        inLanguage: locale,
        description: t('meta.description'),
        provider: { '@type': 'Organization', name: 'Sojori', url: SITE_URL },
        featureList: AGENTS.map((id) => t(`agents.list.${id}.name`)),
      }} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: t('agents.title'),
        itemListElement: AGENTS.map((id, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: t(`agents.list.${id}.name`),
          description: t(`agents.list.${id}.resume`),
        })),
      }} />
    </Shell>
  );
}
