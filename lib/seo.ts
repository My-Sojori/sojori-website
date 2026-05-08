import { Metadata } from 'next';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  path?: string;
  image?: string;
}

export function generateSEO({
  title,
  description,
  keywords = [],
  path = '',
  image = '/og-image.jpg',
}: SEOProps): Metadata {
  const url = `https://sojori.com${path}`;

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
      locale: 'fr_FR',
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
