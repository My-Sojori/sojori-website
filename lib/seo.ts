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
}

export function generateSEO({
  title,
  description,
  keywords = [],
  path = '',
  image = '/og-image.jpg',
  locale = 'fr',
}: SEOProps): Metadata {
  const url = `https://sojori.com${path}`;
  const ogLocale = OG_LOCALE[locale] || OG_LOCALE.fr;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Sojori',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: ogLocale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
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
  'gestion locative Paris',
  'property manager Paris',
  'location courte durée France',
  'channel manager France',
  'logiciel location saisonnière',
];
