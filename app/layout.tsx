import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sojori — PMS Location Courte Durée | Marrakech, Casablanca, Paris",
  description:
    "Logiciel PMS pour property managers à Marrakech, Casablanca et Paris. Channel Manager, WhatsApp AI 24/7, Dynamic Pricing, Analytics. Solution complète gestion locative saisonnière Maroc & France.",
  keywords: [
    "PMS Marrakech",
    "PMS Maroc",
    "gestion locative Marrakech",
    "property management Marrakech",
    "location saisonnière Marrakech",
    "PMS Casablanca",
    "channel manager Maroc",
    "logiciel gestion location courte durée",
    "PMS France",
    "property manager Paris",
    "gestion Airbnb Marrakech",
    "WhatsApp automatisation Maroc",
    "yield management Marrakech"
  ],
  authors: [{ name: "Sojori" }],
  creator: "Sojori",
  publisher: "Sojori",
  metadataBase: new URL('https://sojori.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://sojori.com',
    siteName: 'Sojori',
    title: 'Sojori — PMS Location Courte Durée | Marrakech, Casablanca, Paris',
    description: 'Logiciel PMS pour property managers à Marrakech, Casablanca et Paris. Channel Manager, WhatsApp AI, Dynamic Pricing.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Sojori - PMS Property Management',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sojori — PMS Location Courte Durée | Marrakech, Casablanca, Paris',
    description: 'Logiciel PMS pour property managers à Marrakech, Casablanca et Paris',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Sojori',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '127',
    },
    provider: {
      '@type': 'Organization',
      name: 'Sojori',
      url: 'https://sojori.com',
      logo: 'https://sojori.com/logo.png',
      sameAs: [
        'https://www.linkedin.com/company/108488739',
        'https://instagram.com/sojoriapp',
      ],
      address: [
        {
          '@type': 'PostalAddress',
          addressLocality: 'Marrakech',
          addressCountry: 'MA',
        },
        {
          '@type': 'PostalAddress',
          addressLocality: 'Casablanca',
          addressCountry: 'MA',
        },
        {
          '@type': 'PostalAddress',
          addressLocality: 'Paris',
          addressCountry: 'FR',
        },
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Sales',
        areaServed: ['MA', 'FR', 'ES', 'PT'],
        availableLanguage: ['French', 'Arabic', 'English'],
      },
    },
    description: 'Logiciel PMS pour property managers à Marrakech, Casablanca et Paris. Channel Manager, WhatsApp AI 24/7, Dynamic Pricing, Analytics.',
    featureList: [
      'Property Management System',
      'Channel Manager',
      'WhatsApp AI Assistant',
      'Dynamic Pricing',
      'Analytics & Reporting',
      'Team Management',
      'Guest Experience',
    ],
  };

  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      {/* Aurora Soft — light theme. NE PAS mettre bg-bg-0 ni text-white ici. */}
      <body className="antialiased">{children}</body>
    </html>
  );
}
