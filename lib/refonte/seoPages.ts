import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { generateSEO } from '@/lib/seo';

/** Les six pages de recherche du lot 6 : identifiant des messages (refonte.pages.<id>) et chemin sans langue. */
export const SEO_PAGES = {
  pmsMaroc: '/pms-maroc',
  conciergerieMaroc: '/conciergerie-maroc',
  agents: '/agents',
  checkin: '/check-in-whatsapp',
  fichePolice: '/fiche-de-police-maroc',
  taxeSejour: '/taxe-de-sejour-maroc',
} as const;
export type SeoPageId = keyof typeof SEO_PAGES;

/**
 * Les deux guides réglementaires restent dans le code mais ne sortent pas (ni sitemap, ni lien, ni llms) tant que
 * leurs champs « [à confirmer] » ne sont pas remplis : aucune page publique ne sort avec un « à confirmer » visible.
 * Pour les publier d'un seul coup : passer ces deux valeurs à true.
 */
export const PUBLIE: Record<SeoPageId, boolean> = {
  pmsMaroc: true, conciergerieMaroc: true, agents: true, checkin: true, fichePolice: false, taxeSejour: false,
};

export async function seoMetadata(id: SeoPageId, locale: string): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: `refonte.pages.${id}.meta` });
  const meta = generateSEO({ title: t('title'), description: t('description'), path: `/${locale}${SEO_PAGES[id]}`, locale, alternatesPath: SEO_PAGES[id] });
  return PUBLIE[id] ? meta : { ...meta, robots: { index: false, follow: false } };
}
