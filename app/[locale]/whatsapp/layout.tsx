import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { generateSEO } from '@/lib/seo';
import { whatsappPageKeywords } from '@/lib/seo-layout-keywords';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seoPages' });
  return generateSEO({
    title: t('whatsapp.title'),
    description: t('whatsapp.description'),
    keywords: whatsappPageKeywords,
    path: `/${locale}/whatsapp`,
    locale,
  });
}

export default function WhatsAppLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
