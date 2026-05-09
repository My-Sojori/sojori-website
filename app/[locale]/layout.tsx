import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import "../globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  // Metadata par langue
  const metadataByLocale: Record<string, { title: string; description: string; keywords: string[] }> = {
    fr: {
      title: "Sojori — PMS Location Courte Durée | Marrakech, Casablanca, Paris",
      description: "PMS et orchestrateur pour property managers à Marrakech, Casablanca et Paris. Channel Manager, WhatsApp IA, tarification dynamique par règles, analytics. Location courte durée Maroc & France.",
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
      ]
    },
    en: {
      title: "Sojori — Short-Term Rental PMS | Marrakech, Casablanca, Paris",
      description: "PMS and orchestrator for property managers in Marrakech, Casablanca and Paris. Channel Manager, WhatsApp AI, dynamic pricing, analytics. Short-term rentals Morocco & France.",
      keywords: [
        "PMS Marrakech",
        "PMS Morocco",
        "property management Marrakech",
        "vacation rental Marrakech",
        "PMS Casablanca",
        "channel manager Morocco",
        "short-term rental software",
        "property manager Paris",
        "Airbnb management Marrakech",
        "WhatsApp automation Morocco",
        "revenue management Marrakech"
      ]
    },
    es: {
      title: "Sojori — PMS Alquiler Vacacional | Marrakech, Casablanca, París",
      description: "PMS y orquestador para gestores de propiedades en Marrakech, Casablanca y París. Channel Manager, WhatsApp IA, precios dinámicos, analytics. Alquiler vacacional Marruecos y Francia.",
      keywords: [
        "PMS Marrakech",
        "PMS Marruecos",
        "gestión inmobiliaria Marrakech",
        "alquiler vacacional Marrakech",
        "PMS Casablanca",
        "channel manager Marruecos",
        "software alquiler vacacional",
        "gestor propiedades París",
        "gestión Airbnb Marrakech"
      ]
    },
    pt: {
      title: "Sojori — PMS Aluguel de Temporada | Marrakech, Casablanca, Paris",
      description: "PMS e orquestrador para gestores de propriedades em Marrakech, Casablanca e Paris. Channel Manager, WhatsApp IA, preços dinâmicos, analytics. Aluguel de temporada Marrocos & França.",
      keywords: [
        "PMS Marrakech",
        "PMS Marrocos",
        "gestão imobiliária Marrakech",
        "aluguel por temporada Marrakech",
        "PMS Casablanca",
        "channel manager Marrocos",
        "software aluguel temporada",
        "gestor propriedades Paris",
        "gestão Airbnb Marrakech"
      ]
    },
    ar: {
      title: "Sojori — نظام إدارة الإيجار قصير الأجل | مراكش، الدار البيضاء، باريس",
      description: "نظام إدارة وتنسيق للمديرين العقاريين في مراكش، الدار البيضاء وباريس. مدير القنوات، الذكاء الاصطناعي واتساب، التسعير الديناميكي، التحليلات. إيجار قصير الأجل المغرب وفرنسا.",
      keywords: [
        "نظام إدارة مراكش",
        "إدارة عقارية مراكش",
        "إيجار موسمي مراكش",
        "الدار البيضاء",
        "إدارة Airbnb مراكش",
        "واتساب المغرب"
      ]
    }
  };

  const meta = metadataByLocale[locale] || metadataByLocale.fr;

  const localeMap: Record<string, string> = {
    fr: 'fr_FR',
    en: 'en_US',
    es: 'es_ES',
    pt: 'pt_PT',
    ar: 'ar_MA'
  };

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    authors: [{ name: "Sojori" }],
    creator: "Sojori",
    publisher: "Sojori",
    metadataBase: new URL('https://sojori.com'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'fr': '/fr',
        'en': '/en',
        'es': '/es',
        'pt': '/pt',
        'ar': '/ar',
      },
    },
    openGraph: {
      type: 'website',
      locale: localeMap[locale] || 'fr_FR',
      url: `https://sojori.com/${locale}`,
      siteName: 'Sojori',
      title: meta.title,
      description: meta.description,
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
      title: meta.title,
      description: meta.description,
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
  };
}

export default async function LocaleLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client side is the easiest way to get started
  const messages = await getMessages();

  const featureListByLocale: Record<string, string[]> = {
    fr: [
      'PMS location courte durée',
      'Channel Manager',
      'Assistant WhatsApp IA',
      'Tarification dynamique',
      'Analytics et reporting',
      'Gestion d’équipe',
      'Expérience voyageur',
    ],
    en: [
      'Short-term rental PMS',
      'Channel Manager',
      'WhatsApp AI assistant',
      'Dynamic pricing',
      'Analytics & reporting',
      'Team management',
      'Guest experience',
    ],
    es: [
      'PMS alquiler turístico',
      'Channel Manager',
      'Asistente WhatsApp IA',
      'Precios dinámicos',
      'Analytics e informes',
      'Gestión de equipos',
      'Experiencia del huésped',
    ],
    pt: [
      'PMS alojamento local',
      'Channel Manager',
      'Assistente WhatsApp IA',
      'Preços dinâmicos',
      'Analytics e relatórios',
      'Gestão de equipas',
      'Experiência do hóspede',
    ],
    ar: [
      'نظام إدارة الإيجار قصير المدى',
      'Channel Manager',
      'مساعد واتساب بالذكاء الاصطناعي',
      'تسعير ديناميكي',
      'تحليلات وتقارير',
      'إدارة الفريق',
      'تجربة الضيف',
    ],
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Sojori',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
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
        availableLanguage: ['French', 'Arabic', 'English', 'Spanish', 'Portuguese'],
      },
    },
    description: locale === 'en'
      ? 'PMS and orchestrator for property managers in Marrakech, Casablanca and Paris. Channel Manager, WhatsApp AI, dynamic pricing, analytics.'
      : locale === 'es'
      ? 'PMS y orquestador para gestores de propiedades en Marrakech, Casablanca y París. Channel Manager, WhatsApp IA, precios dinámicos, analytics.'
      : locale === 'pt'
      ? 'PMS e orquestrador para gestores de propriedades em Marrakech, Casablanca e Paris. Channel Manager, WhatsApp IA, preços dinâmicos, analytics.'
      : locale === 'ar'
      ? 'نظام إدارة وتنسيق للمديرين العقاريين في مراكش، الدار البيضاء وباريس'
      : 'PMS et orchestrateur pour property managers à Marrakech, Casablanca et Paris. Channel Manager, WhatsApp IA, tarification dynamique par règles, analytics.',
    featureList: featureListByLocale[locale] ?? featureListByLocale.fr,
  };

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      {/* Aurora Soft — light theme. NE PAS mettre bg-bg-0 ni text-white ici. */}
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
