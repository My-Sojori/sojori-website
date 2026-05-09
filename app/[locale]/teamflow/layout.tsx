import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { generateSEO } from '@/lib/seo';
import { teamflowPageKeywords } from '@/lib/seo-layout-keywords';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seoPages' });
  return generateSEO({
    title: t('teamflow.title'),
    description: t('teamflow.description'),
    keywords: teamflowPageKeywords,
    path: `/${locale}/teamflow`,
    locale,
  });
}

export default function TeamFlowLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
