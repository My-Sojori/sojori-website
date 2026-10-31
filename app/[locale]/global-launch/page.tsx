import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { GlobalLaunchClient } from './GlobalLaunchClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seoPages' });
  return {
    title: 'Sojori — Launch offer for short-term rental hosts',
    description: t('globalLaunch.description'),
  };
}

export default function GlobalLaunchPage() {
  return <GlobalLaunchClient />;
}
