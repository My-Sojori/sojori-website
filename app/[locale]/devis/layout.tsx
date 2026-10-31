import type { Metadata } from 'next';

/**
 * La page d'un devis (lien personnel par jeton) : jamais indexée, et le jeton qui est dans l'adresse ne part pas
 * dans l'en-tête Referer vers un site tiers (revue de sojori-production#2106).
 */
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Votre devis — Sojori',
    alternates: { canonical: `/${locale}/devis` },
    robots: { index: false, follow: false, nocache: true },
    referrer: 'no-referrer',
  };
}

export default function DevisLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
