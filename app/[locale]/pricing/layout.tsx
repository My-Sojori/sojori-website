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
    title: t('pricing.title'),
    description: t('pricing.description'),
    path: `/${locale}/pricing`,
    locale,
  });
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
