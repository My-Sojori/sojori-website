import type { Metadata } from 'next';
import { AnalyseResultatClient } from './AnalyseResultatClient';

export const metadata: Metadata = {
  title: 'Votre analyse concurrentielle | Sojori',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

type PageProps = {
  searchParams: Promise<{ token?: string | string[] }>;
};

function pickToken(raw: string | string[] | undefined): string {
  if (Array.isArray(raw)) return String(raw[0] ?? '').trim();
  // Cas lien mal encodé : ?token%3Dxxx → une seule clé "token=xxx"
  if (typeof raw === 'string' && raw.startsWith('token=')) {
    return raw.slice('token='.length).trim();
  }
  return String(raw ?? '').trim();
}

export default async function AnalyseResultatPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  let token = pickToken(sp.token);
  // Filet si Next a parsé ?token%3Dxxx comme clé bizarre
  if (!token) {
    const weirdKey = Object.keys(sp).find((k) => k.startsWith('token='));
    if (weirdKey) token = weirdKey.slice('token='.length).trim();
  }

  // On NE pré-charge PAS le résultat côté serveur : le client fait le fetch et
  // affiche l'écran de chargement animé (les 5 étapes) pendant l'analyse. Sans
  // token, on rend directement l'état d'erreur.
  if (!token) {
    return (
      <AnalyseResultatClient initialToken="" initialState="error" initialError="Lien invalide — token manquant." />
    );
  }
  return <AnalyseResultatClient initialToken={token} initialState="loading" />;
}
