import type { Metadata } from 'next';

const metaByLocale: Record<string, { title: string; description: string }> = {
  fr: { title: 'Politique de Confidentialité — Sojori', description: 'Politique de confidentialité Sojori. Collecte, utilisation, partage et sécurité de vos données personnelles.' },
  en: { title: 'Privacy Policy — Sojori', description: 'Sojori Privacy Policy. How we collect, use, share and protect your personal data.' },
  es: { title: 'Política de Privacidad — Sojori', description: 'Política de Privacidad de Sojori. Cómo recopilamos, usamos, compartimos y protegemos sus datos personales.' },
  pt: { title: 'Política de Privacidade — Sojori', description: 'Política de Privacidade da Sojori. Como recolhemos, utilizamos, partilhamos e protegemos os seus dados pessoais.' },
  ar: { title: 'سياسة الخصوصية — Sojori', description: 'سياسة خصوصية Sojori. كيف نجمع بياناتك الشخصية ونستخدمها ونشاركها ونحميها.' },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const meta = metaByLocale[locale] || metaByLocale.en;
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/${locale}/privacy` },
  };
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
