import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

const metaByLocale: Record<string, { title: string }> = {
  fr: { title: 'Politique de Confidentialité — Sojori' },
  en: { title: 'Privacy Policy — Sojori' },
  es: { title: 'Política de Privacidad — Sojori' },
  pt: { title: 'Política de Privacidade — Sojori' },
  ar: { title: 'سياسة الخصوصية — Sojori' },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const meta = metaByLocale[locale] || metaByLocale.en;
  const t = await getTranslations({ locale, namespace: 'seoPages' });
  return {
    title: meta.title,
    description: t('privacy.description'),
    alternates: { canonical: `/${locale}/privacy` },
  };
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
