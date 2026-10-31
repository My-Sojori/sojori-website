import type { Metadata } from "next";
import { Geist, Geist_Mono, IBM_Plex_Sans_Arabic } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { AnalyticsBootstrap } from '@/components/AnalyticsBootstrap';
import "../globals.css";
import { SITE_URL } from '@/lib/siteUrl';

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const plexArabic = IBM_Plex_Sans_Arabic({ variable: "--font-plex-arabic", subsets: ["arabic"], weight: ["400", "500", "600"], display: "swap" });

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

  const base = metadataByLocale[locale] || metadataByLocale.fr;
  // Titre et description par défaut : ceux de l'accueil (version nuit, 31/10/2026). Les pages qui ont les leurs les gardent.
  const tm = routing.locales.includes(locale as never) ? await getTranslations({ locale, namespace: 'refonte.home.meta' }) : null;
  const meta = tm ? { ...base, title: tm('title'), description: tm('description') } : base;

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
    // 2026-09-15 : favicon.ico était un PNG renommé (MD5 identique à
    // icon.png) et n'était déclaré nulle part — shortcut pointait sur le SVG.
    // Les agrégateurs et navigateurs anciens demandent /favicon.ico en
    // premier : ils recevaient un fichier au mauvais format, non annoncé, et
    // retombaient sur l'icône générique de globe.
    icons: {
      icon: [
        { url: '/favicon.ico', type: 'image/x-icon', sizes: '16x16 32x32' },
        { url: '/favicon.svg', type: 'image/svg+xml' },
        { url: '/icon.png', type: 'image/png', sizes: '32x32' },
      ],
      apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
      shortcut: '/favicon.ico',
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

  // Résumé ~50 mots pensé pour les assistants IA (ChatGPT, Perplexity, Gemini) qui
  // cherchent "qu'est-ce que Sojori" — sojori.com est l'entité canonique
  // de l'entreprise (le logiciel) ; book.sojori.com, la marketplace grand
  // public, n'en est qu'un produit. 2026-09-11 : corrigé après la bascule
  // des domaines, ce commentaire décrivait encore l'ancienne architecture.
  const organizationDescriptionByLocale: Record<string, string> = {
    fr: "Sojori est un PMS et un ensemble d'agents qui travaillent sur WhatsApp pour les locations courte durée, les conciergeries, les riads et les hôtels : réservation, service client, opérations, tarification dynamique, modules WhatsApp pour le voyageur, le staff, l'admin et le propriétaire. Sojori propose son propre PMS ou travaille avec celui du client. Basée à Marrakech, Casablanca et Paris, Sojori est pensée pour le Maroc.",
    en: "Sojori is a PMS and a set of agents that work on WhatsApp for short-term rentals, concierge companies, riads and hotels: booking, guest service, operations, dynamic pricing, and WhatsApp modules for the guest, the staff, the admin and the owner. Sojori offers its own PMS or works with the customer's. Based in Marrakech, Casablanca and Paris, Sojori is built for Morocco.",
    es: "Sojori es un PMS y un conjunto de agentes que trabajan en WhatsApp para alquileres de corta estancia, empresas de conserjería, riads y hoteles: reservas, atención al cliente, operaciones, precios dinámicos y módulos de WhatsApp para el huésped, el equipo, el administrador y el propietario. Sojori ofrece su propio PMS o trabaja con el del cliente. Con sede en Marrakech, Casablanca y París, Sojori está pensada para Marruecos.",
    pt: "A Sojori é um PMS e um conjunto de agentes que trabalham no WhatsApp para arrendamentos de curta duração, empresas de concierge, riads e hotéis: reservas, apoio ao cliente, operações, preços dinâmicos e módulos de WhatsApp para o hóspede, a equipa, o administrador e o proprietário. A Sojori oferece o seu próprio PMS ou trabalha com o do cliente. Sediada em Marraquexe, Casablanca e Paris, a Sojori foi pensada para Marrocos.",
    ar: "Sojori نظام إدارة وعدد من الوكلاء يعملون عبر واتساب للإيجار قصير الأجل وشركات الكونسييرج والرياض والفنادق: الحجوزات وخدمة العملاء والعمليات والتسعير الديناميكي ووحدات واتساب للنزيل والفريق والمسؤول والمالك. تقدّم Sojori نظامها الخاص أو تعمل مع نظام العميل. ومقرها مراكش والدار البيضاء وباريس، وقد صُمّمت للمغرب.",
  };

  // Organization en bloc JSON-LD top-level indépendant — plus facilement
  // extractible par les crawlers/LLM qu'imbriquée dans un SoftwareApplication.
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Sojori',
    url: SITE_URL,
    logo: `${SITE_URL}/apple-icon.png`,
    slogan: 'AI workforce for hospitality',
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

  // WebSite : nom, adresse et langues. Le SoftwareApplication (agents, FAQ) vit sur l'accueil.
  const webSiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Sojori',
    url: SITE_URL,
    inLanguage: ['fr', 'en', 'es', 'pt', 'ar'],
    publisher: { '@type': 'Organization', name: 'Sojori', url: SITE_URL },
  };

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} className={`${geistSans.variable} ${geistMono.variable} ${plexArabic.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
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
