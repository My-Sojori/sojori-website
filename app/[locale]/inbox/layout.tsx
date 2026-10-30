import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { generateSEO } from '@/lib/seo';
import { inboxPageKeywords } from '@/lib/seo-layout-keywords';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seoPages' });
  return generateSEO({
    title: t('inbox.title'),
    description: t('inbox.description'),
    keywords: inboxPageKeywords,
    path: `/${locale}/inbox`,
    locale,
  });
}

export default function InboxLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
