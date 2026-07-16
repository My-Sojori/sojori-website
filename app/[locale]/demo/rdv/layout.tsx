import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { generateSEO } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seoPages' });
  return generateSEO({
    title: t('demoRdv.title'),
    description: t('demoRdv.description'),
    path: `/${locale}/demo/rdv`,
    locale,
  });
}

export default function DemoRdvLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
