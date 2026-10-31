import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

const metaByLocale: Record<string, { title: string }> = {
  fr: { title: 'CGU — Sojori' },
  en: { title: 'Terms of Service — Sojori' },
  es: { title: 'Términos de Servicio — Sojori' },
  pt: { title: 'Termos de Serviço — Sojori' },
  ar: { title: 'شروط الخدمة — Sojori' },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const meta = metaByLocale[locale] || metaByLocale.en;
  const t = await getTranslations({ locale, namespace: 'seoPages' });
  return {
    title: meta.title,
    description: t('terms.description'),
    alternates: { canonical: `/${locale}/terms` },
  };
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
