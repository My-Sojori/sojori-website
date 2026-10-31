import type { Metadata } from 'next';
import { withShare } from '@/lib/seo';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seoPages' });
  return withShare({
    title: t('guestExperience.title'),
    description: t('guestExperience.description'),
    alternates: { canonical: `/${locale}/guest-experience` },
  }, locale);
}

export default function GuestExperienceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
