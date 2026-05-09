import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seoPages' });
  return {
    title: t('guestExperience.title'),
    description: t('guestExperience.description'),
  };
}

export default function GuestExperienceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
