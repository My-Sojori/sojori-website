import type { Metadata } from 'next';
import { withShare } from '@/lib/seo';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seoPages' });
  return withShare({
    title: t('brand.title'),
    description: t('brand.description'),
    alternates: { canonical: `/${locale}/brand` },
    // Document interne (charte) : ni indexé, ni dans le sitemap.
    robots: { index: false, follow: false },
  }, locale);
}

export default function BrandLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
