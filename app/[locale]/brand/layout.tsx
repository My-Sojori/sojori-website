import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seoPages' });
  return {
    title: t('brand.title'),
    description: t('brand.description'),
    alternates: { canonical: `/${locale}/brand` },
    // Document interne (charte) : ni indexé, ni dans le sitemap.
    robots: { index: false, follow: false },
  };
}

export default function BrandLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
