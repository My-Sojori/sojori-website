import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seoPages' });
  return {
    title: t('dynamicPricing.title'),
    description: t('dynamicPricing.description'),
  };
}

export default function DynamicPricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
