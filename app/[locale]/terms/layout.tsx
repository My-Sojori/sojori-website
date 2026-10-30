import type { Metadata } from 'next';

const metaByLocale: Record<string, { title: string; description: string }> = {
  fr: { title: 'CGU — Sojori', description: "Conditions Générales d'Utilisation de la plateforme Sojori. Service, abonnement, données, propriété intellectuelle." },
  en: { title: 'Terms of Service — Sojori', description: 'Sojori Terms of Service. Service scope, subscription, data protection, intellectual property.' },
  es: { title: 'Términos de Servicio — Sojori', description: 'Términos de Servicio de Sojori. Alcance, suscripción, protección de datos, propiedad intelectual.' },
  pt: { title: 'Termos de Serviço — Sojori', description: 'Termos de Serviço da Sojori. Âmbito, subscrição, proteção de dados, propriedade intelectual.' },
  ar: { title: 'شروط الخدمة — Sojori', description: 'شروط خدمة Sojori. نطاق الخدمة، الاشتراك، حماية البيانات، الملكية الفكرية.' },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const meta = metaByLocale[locale] || metaByLocale.en;
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/${locale}/terms` },
  };
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
