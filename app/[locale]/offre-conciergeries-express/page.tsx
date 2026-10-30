import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

/**
 * Variante A/B de la landing pub : saute directement le formulaire de démo
 * (déjà en haut de /demo) au lieu de l'argumentaire long de /offre-conciergeries.
 * "Découvrir" reste accessible depuis /demo lui-même (lien retour vers l'offre).
 */
export const metadata: Metadata = {
  title: 'Réservez votre démo — Sojori',
};

export default async function OffreConciergeriesExpressPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  const qs = new URLSearchParams();
  qs.set('source', 'offre-conciergeries-express');
  for (const [k, v] of Object.entries(sp)) {
    if (k === 'source') continue;
    if (typeof v === 'string') qs.set(k, v);
  }
  redirect(`/${locale}/demo?${qs.toString()}`);
}
