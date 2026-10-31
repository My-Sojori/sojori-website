import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { useLocale, useTranslations } from 'next-intl';
import { Shell } from '@/components/refonte/Shell';
import { OffreComposer } from '@/components/refonte/offre/OffreComposer';
import { Faq } from '@/components/refonte/Faq';
import { JsonLd } from '@/components/refonte/JsonLd';
import { generateSEO } from '@/lib/seo';
import { SITE_URL } from '@/lib/siteUrl';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'refonte.offre.meta' });
  return generateSEO({ title: t('title'), description: t('description'), path: `/${locale}/offre`, locale, alternatesPath: '/offre' });
}

export default function OffrePage() {
  const t = useTranslations('refonte.offre');
  const locale = useLocale();
  const tn = useTranslations('refonte.nav');
  const faq = t.raw('faq.items') as { q: string; a: string }[];
  return (
    <Shell>
      <section className="sj2-hero sj2-hero--offre">
        <div className="sj2-wrap sj2-offre__tete">
          <span className="sj2-eyebrow">{t('hero.eyebrow')}</span>
          <h1 className="sj2-h1 sj2-h1--offre">{t('hero.title')}</h1>
          <p className="sj2-hero__sub">{t('hero.lead')}</p>
        </div>
      </section>
      <div className="sj2-wrap sj2-offre__corps">
        <OffreComposer />
      </div>
      <Faq id="sj2-faq-h" title={t('faq.title')} items={faq} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Sojori', item: `${SITE_URL}/${locale}` },
          { '@type': 'ListItem', position: 2, name: tn('offer'), item: `${SITE_URL}/${locale}/offre` },
        ],
      }} />
    </Shell>
  );
}
