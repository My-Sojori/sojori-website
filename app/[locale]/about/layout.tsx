import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { generateSEO } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'refonte.about.meta' });
  return generateSEO({
    title: t('title'),
    description: t('description'),
    path: `/${locale}/about`,
    locale,
  });
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
