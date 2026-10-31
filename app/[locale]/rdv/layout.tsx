import type { Metadata } from 'next';

/**
 * Page à lien personnel (jeton dans l'adresse) : jamais indexée, canonical sur sa propre adresse, et le jeton ne part
 * pas dans l'en-tête Referer vers un site tiers (même règle que /devis).
 */
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Votre rendez-vous — Sojori',
    alternates: { canonical: `/${locale}/rdv` },
    robots: { index: false, follow: false, nocache: true },
    referrer: 'no-referrer',
  };
}

export default function RdvLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
