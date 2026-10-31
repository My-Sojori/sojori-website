import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Shell } from '@/components/refonte/Shell';
import { OffreComposer } from '@/components/refonte/offre/OffreComposer';
import { generateSEO } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'refonte.offre.meta' });
  return generateSEO({ title: t('title'), description: t('description'), path: `/${locale}/offre`, locale });
}

export default function OffrePage() {
  const t = useTranslations('refonte.offre');
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
      <section className="sj2-wrap sj2-faq" aria-labelledby="sj2-faq-h">
        <h2 id="sj2-faq-h" className="sj2-h2 sj2-h2--faq">{t('faq.title')}</h2>
        <dl>
          {faq.map((x) => (
            <div key={x.q} className="sj2-faq__item"><dt>{x.q}</dt><dd>{x.a}</dd></div>
          ))}
        </dl>
      </section>
    </Shell>
  );
}
