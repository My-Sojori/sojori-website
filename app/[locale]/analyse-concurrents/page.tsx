import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { AnalyseConcurrentsClient } from './AnalyseConcurrentsClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seoPages' });
  return {
    title: 'Analyse gratuite de vos concurrents Airbnb | Sojori',
    description: t('analyseConcurrents.description'),
  };
}

export default function AnalyseConcurrentsPage() {
  return <AnalyseConcurrentsClient />;
}
