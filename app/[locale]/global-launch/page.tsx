import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { generateSEO } from '@/lib/seo';
import { GlobalLaunchClient } from './GlobalLaunchClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seoPages' });
  return generateSEO({
    title: t('globalLaunch.title'),
    description: t('globalLaunch.description'),
    path: `/${locale}/global-launch`,
    locale,
    alternatesPath: '/global-launch',
  });
}

export default function GlobalLaunchPage() {
  return <GlobalLaunchClient />;
}
