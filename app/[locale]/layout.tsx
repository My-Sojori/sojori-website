import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { AnalyticsBootstrap } from '@/components/AnalyticsBootstrap';
import "../globals.css";
import { SITE_URL } from '@/lib/siteUrl';

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
      title: "Sojori — Orchestration hôtelière | Marrakech, Casablanca, Paris",
      description: "Moteur d'orchestration pour hôtels, riads et résidences à Marrakech, Casablanca et Paris. Channel Manager, WhatsApp IA, tarification dynamique par règles, analytics. Housekeeping, maintenance et communication client orchestrés.",
      keywords: [
        "PMS Marrakech",
        "PMS Maroc",
        "gestion locative Marrakech",
        "logiciel hôtelier Marrakech",
        "gestion hôtel Marrakech",
        "PMS Casablanca",
        "channel manager Maroc",
        "logiciel gestion hôtelière Maroc",
        "housekeeping hôtel",
        "PMS France",
        "logiciel hôtelier Paris",
        "gestion Airbnb Marrakech",
        "WhatsApp automatisation Maroc",
        "yield management Marrakech"
      ]
    },
    en: {
      title: "Sojori — Hospitality Orchestration | Marrakech, Casablanca, Paris",
      description: "Hospitality orchestration engine for hotels, riads and residences in Marrakech, Casablanca and Paris. Channel Manager, WhatsApp AI, dynamic pricing, analytics. Housekeeping, maintenance and guest communication orchestrated.",
      keywords: [
        "PMS Marrakech",
        "PMS Morocco",
        "hotel software Marrakech",
        "hotel management Marrakech",
        "PMS Casablanca",
        "channel manager Morocco",
        "hotel management software Morocco",
        "hotel housekeeping software",
        "hotel software Paris",
        "Airbnb management Marrakech",
        "WhatsApp automation Morocco",
        "revenue management Marrakech"
      ]
    },
    es: {
      title: "Sojori — Orquestación Hotelera | Marrakech, Casablanca, París",
      description: "Motor de orquestación para hoteles, riads y residencias en Marrakech, Casablanca y París. Channel Manager, WhatsApp IA, precios dinámicos, analytics. Alquiler vacacional Marruecos y Francia.",
      keywords: [
        "PMS Marrakech",
        "PMS Marruecos",
        "gestión inmobiliaria Marrakech",
        "gestión hotelera Marrakech",
        "PMS Casablanca",
        "channel manager Marruecos",
        "software hotelero Marruecos",
        "software limpieza hotel",
        "gestor propiedades París",
        "gestión Airbnb Marrakech"
      ]
    },
    pt: {
      title: "Sojori — Orquestração Hoteleira | Marrakech, Casablanca, Paris",
      description: "Motor de orquestração para hotéis, riads e residências em Marrakech, Casablanca e Paris. Channel Manager, WhatsApp IA, preços dinâmicos, analytics. Aluguel de temporada Marrocos & França.",
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
    metadataBase: new URL(SITE_URL),
    icons: {
      icon: [
        { url: '/favicon.svg', type: 'image/svg+xml' },
        { url: '/icon.png', type: 'image/png', sizes: '32x32' },
      ],
      apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
      shortcut: '/favicon.svg',
    },
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
    // 2026-09-12 : signale /llms.txt aux moteurs de réponse (ChatGPT,
    // Perplexity, Claude). Le fichier existe dans public/ mais rien ne le
    // déclarait : un crawler ne le trouve que s'il le devine.
    other: {
      'llms-txt': `${SITE_URL}/llms.txt`,
    },
    openGraph: {
      type: 'website',
      locale: localeMap[locale] || 'fr_FR',
      url: `${SITE_URL}/${locale}`,
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
      'PMS hôtelier',
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
      'PMS hoteleiro',
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

  // Résumé ~50 mots pensé pour les assistants IA (ChatGPT, Perplexity, Gemini) qui
  // cherchent "qu'est-ce que Sojori" — sojori.com est l'entité canonique
  // de l'entreprise (le logiciel) ; book.sojori.com, la marketplace grand
  // public, n'en est qu'un produit. 2026-09-11 : corrigé après la bascule
  // des domaines, ce commentaire décrivait encore l'ancienne architecture.
  const organizationDescriptionByLocale: Record<string, string> = {
    fr: "Sojori est une entreprise technologique qui développe le moteur d'orchestration de l'hospitalité : PMS hôtelier, channel manager, conciergerie WhatsApp IA trilingue, housekeeping et maintenance, tarification dynamique et gestion des équipes terrain. Sojori inclut son propre PMS et se connecte aux PMS existants, dont Mews. Basée à Marrakech, Casablanca et Paris, Sojori équipe hôtels, riads et résidences au Maroc et en France, et édite aussi book.sojori.com, sa marketplace grand public de riads, villas et appartements.",
    en: 'Sojori is a technology company building the hospitality orchestration engine: hotel PMS, channel manager, trilingual WhatsApp AI concierge, housekeeping and maintenance, dynamic pricing and field-team workflows. Sojori includes its own PMS and connects to existing ones, including Mews. Based in Marrakech, Casablanca and Paris, Sojori equips hotels, riads and residences across Morocco and France, and also runs book.sojori.com, its consumer marketplace for riads, villas and apartments.',
    es: 'Sojori es una empresa tecnológica que desarrolla el motor de orquestación de la hostelería: PMS hotelero, channel manager, conserjería WhatsApp con IA, limpieza y mantenimiento, precios dinámicos y gestión de equipos. Sojori incluye su propio PMS y se conecta a los existentes, incluido Mews. Con sede en Marrakech, Casablanca y París, Sojori equipa hoteles, riads y residencias en Marruecos y Francia, y también opera book.sojori.com, su marketplace para riads, villas y apartamentos.',
    pt: 'A Sojori é uma empresa de tecnologia que desenvolve o motor de orquestração da hotelaria: PMS hoteleiro, channel manager, conciergerie WhatsApp com IA, limpeza e manutenção, preços dinâmicos e gestão de equipas. A Sojori inclui o seu próprio PMS e liga-se aos existentes, incluindo o Mews. Sediada em Marraquexe, Casablanca e Paris, a Sojori equipa hotéis, riads e residências em Marrocos e França, e também opera o book.sojori.com, o seu marketplace de riads, villas e apartamentos.',
    ar: 'Sojori شركة تقنية تطور برمجيات تنسيق للإيجار قصير الأجل: نظام إدارة الممتلكات، مدير القنوات، كونسييرج واتساب بالذكاء الاصطناعي، تسعير ديناميكي وإدارة الفرق الميدانية. ومقرها مراكش والدار البيضاء وباريس، وتزوّد Sojori مديري العقارات المحترفين في المغرب وفرنسا، كما تدير sojori.com، سوقها المخصص للرياض والفيلل والشقق.',
  };

  // Organization en bloc JSON-LD top-level indépendant — plus facilement
  // extractible par les crawlers/LLM qu'imbriquée dans un SoftwareApplication.
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Sojori',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    slogan:
      locale === 'en'
        ? 'The hospitality orchestration engine'
        : "Moteur d'orchestration de l'hospitalité",
    description: organizationDescriptionByLocale[locale] ?? organizationDescriptionByLocale.fr,
    sameAs: [
      'https://sojori.com',
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
  };

  const softwareApplicationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Sojori',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    // Référence légère vers l'Organization — le détail complet (adresse, contact,
    // sameAs) vit uniquement dans le bloc Organization ci-dessus, pas dupliqué ici.
    provider: {
      '@type': 'Organization',
      name: 'Sojori',
      url: SITE_URL,
    },
    description: locale === 'en'
      ? 'Hospitality orchestration engine for hotels, riads and residences in Marrakech, Casablanca and Paris. Channel Manager, WhatsApp AI, dynamic pricing, analytics.'
      : locale === 'es'
      ? 'Motor de orquestación para hoteles, riads y residencias en Marrakech, Casablanca y París. Channel Manager, WhatsApp IA, precios dinámicos, analytics.'
      : locale === 'pt'
      ? 'Motor de orquestração para hotéis, riads e residências em Marrakech, Casablanca e Paris. Channel Manager, WhatsApp IA, preços dinâmicos, analytics.'
      : locale === 'ar'
      ? 'نظام إدارة وتنسيق للمديرين العقاريين في مراكش، الدار البيضاء وباريس'
      : 'Moteur d’orchestration pour hôtels, riads et résidences à Marrakech, Casablanca et Paris. Channel Manager, WhatsApp IA, tarification dynamique par règles, analytics.',
    featureList: featureListByLocale[locale] ?? featureListByLocale.fr,
  };

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationJsonLd) }}
        />
        {/* Pixel Meta (retargeting ads) — PageView sur toutes les pages */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','1039671441788657');fbq('track','PageView');`,
          }}
        />
        <noscript>
          <img height="1" width="1" style={{ display: 'none' }} alt=""
            src="https://www.facebook.com/tr?id=1039671441788657&ev=PageView&noscript=1" />
        </noscript>
        {/* Google Analytics 4 — pageview + dataLayer pour tous les événements custom */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-KCVTT735EZ" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-KCVTT735EZ');`,
          }}
        />
      </head>
      {/* Aurora Soft — light theme. NE PAS mettre bg-bg-0 ni text-white ici. */}
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          <AnalyticsBootstrap />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
