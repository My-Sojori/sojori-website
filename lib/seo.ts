import { SITE_URL } from './siteUrl';
import { Metadata } from 'next';

const OG_LOCALE: Record<string, string> = {
  fr: 'fr_FR',
  en: 'en_US',
  es: 'es_ES',
  pt: 'pt_PT',
  ar: 'ar_MA',
};

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  path?: string;
  image?: string;
  /** Langue pour Open Graph (défaut : français) */
  locale?: string;
  /** Chemin SANS langue (« » pour l'accueil, « /offre ») : ajoute hreflang des 5 langues + x-default → fr. */
  alternatesPath?: string;
}

const LANGUES = ['fr', 'en', 'es', 'pt', 'ar'];

export function generateSEO({
  title,
  description,
  keywords = [],
  path = '',
  image,
  locale = 'fr',
  alternatesPath,
}: SEOProps): Metadata {
  const url = `${SITE_URL}${path}`;
  const ogLocale = OG_LOCALE[locale] || OG_LOCALE.fr;
  // Sans `alternatesPath`, on le déduit du chemin (« /fr/pms » → « /pms ») : toute page a ses hreflang.
  const altPath = alternatesPath ?? (/^\/(fr|en|es|pt|ar)(\/|$)/.test(path) ? path.replace(/^\/(fr|en|es|pt|ar)/, '') : undefined);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
      ...(altPath !== undefined
        ? {
            languages: {
              ...Object.fromEntries(LANGUES.map((l) => [l, `${SITE_URL}/${l}${altPath}`])),
              'x-default': `${SITE_URL}/fr${altPath}`,
            },
          }
        : {}),
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Sojori',
      // Par défaut : l'image de partage de la langue (app/[locale]/opengraph-image.tsx).
      images: [{ url: image ?? `/${locale}/opengraph-image`, width: 1200, height: 630, alt: title }],
      locale: ogLocale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image ?? `/${locale}/twitter-image`],
    },
  };
}

/**
 * Complète un `metadata` de page (title, description, canonical) avec ses balises de partage : og:title,
 * og:description, og:url, twitter:*, et ses hreflang (5 langues + x-default) ; sans quoi la page hérite de l'accueil
 * ou n'en déclare pas.
 */
export function withShare(meta: Metadata, locale: string): Metadata {
  const canonical = typeof meta.alternates?.canonical === 'string' ? meta.alternates.canonical : '';
  const { alternates, openGraph, twitter } = generateSEO({
    title: typeof meta.title === 'string' ? meta.title : '',
    description: meta.description ?? '',
    path: canonical,
    locale,
  });
  return { ...meta, alternates: canonical ? alternates : meta.alternates, openGraph, twitter };
}

// Mots-clés locaux pour le Maroc (Marrakech focus)
export const moroccanKeywords = [
  'PMS Marrakech',
  'PMS Maroc',
  'gestion locative Marrakech',
  'property management Marrakech',
  'location saisonnière Marrakech',
  'PMS Casablanca',
  'gestion Airbnb Marrakech',
  'logiciel gestion riad Marrakech',
  'channel manager Maroc',
  'yield management Marrakech',
  'WhatsApp automatisation Maroc',
];

// Mots-clés locaux pour la France
export const frenchKeywords = [
  'PMS France',
  'PMS Paris',
  'PMS hôtel Paris',
  'logiciel hôtelier Paris',
  'gestion hôtelière France',
  'channel manager France',
  'logiciel hôtel indépendant',
];
