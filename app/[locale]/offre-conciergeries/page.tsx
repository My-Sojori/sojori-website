import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { OffreConciergeriesClient } from './OffreConciergeriesClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seoPages' });
  return {
    title: 'Logiciel de gestion Airbnb pour conciergeries | Sojori',
    description: t('offreConciergeries.description'),
  };
}

export default function OffreConciergeriesPage() {
  return <OffreConciergeriesClient />;
}
