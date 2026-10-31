import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { generateSEO } from '@/lib/seo';
import { AnalyseConcurrentsClient } from './AnalyseConcurrentsClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seoPages' });
  return generateSEO({
    title: t('analyseConcurrents.title'),
    description: t('analyseConcurrents.description'),
    path: `/${locale}/analyse-concurrents`,
    locale,
    alternatesPath: '/analyse-concurrents',
  });
}

export default function AnalyseConcurrentsPage() {
  return <AnalyseConcurrentsClient />;
}
