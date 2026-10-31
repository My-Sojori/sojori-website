import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { generateSEO } from '@/lib/seo';
import { OffreConciergeriesClient } from './OffreConciergeriesClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seoPages' });
  return generateSEO({
    title: t('offreConciergeries.title'),
    description: t('offreConciergeries.description'),
    path: `/${locale}/offre-conciergeries`,
    locale,
    alternatesPath: '/offre-conciergeries',
  });
}

export default function OffreConciergeriesPage() {
  return <OffreConciergeriesClient />;
}
