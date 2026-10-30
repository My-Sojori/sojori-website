# 🌍 Plan d'Implémentation i18n - Sojori Website

**Objectif:** Support de 5 langues avec SEO optimisé
**Stack:** Next.js 16 + next-intl 4.11
**Langues:** FR (défaut), EN, ES, PT, AR

---

## 📋 ÉTAT D'AVANCEMENT

- [x] Installation next-intl
- [ ] Configuration next-intl
- [ ] Structure de dossiers [locale]
- [ ] Fichiers de traduction
- [ ] Migration des pages
- [ ] SEO (hreflang, sitemap)
- [ ] Language switcher
- [ ] Tests

---

## 🏗️ ARCHITECTURE

### Structure de dossiers (après migration)

```
app/
├── [locale]/                    # Dynamic route segment
│   ├── layout.tsx              # Root layout avec next-intl
│   ├── page.tsx                # Homepage
│   ├── pricing/
│   │   └── page.tsx
│   ├── demo/
│   │   └── page.tsx
│   ├── whatsapp/
│   │   └── page.tsx
│   └── ... (toutes les pages)
├── api/                        # API routes (pas de i18n)
│   └── v1/
│       └── demo/
├── layout.tsx                  # Layout racine (minimal)
└── not-found.tsx

messages/                       # Fichiers de traduction
├── fr.json
├── en.json
├── es.json
├── pt.json
└── ar.json

middleware.ts                   # Middleware next-intl (routing)
next.config.ts                  # Config i18n
```

### URLs finales

```
https://sojori.com/          → Redirige vers /fr (défaut Maroc)
https://sojori.com/fr        → Français
https://sojori.com/en        → English
https://sojori.com/es        → Español
https://sojori.com/pt        → Português
https://sojori.com/ar        → العربية

https://sojori.com/fr/pricing
https://sojori.com/en/pricing
https://sojori.com/es/pricing
https://sojori.com/pt/pricing
https://sojori.com/ar/pricing
```

---

## 🌐 LANGUES & MARCHÉS

### Français (FR) - Défaut
**Marché:** Maroc, France, Afrique francophone
**Priorité:** ⭐⭐⭐⭐⭐
**Statut:** Actuel (déjà fait)

### Anglais (EN)
**Marché:** International, expats Maroc, Europe du Nord
**Priorité:** ⭐⭐⭐⭐⭐
**Statut:** À faire

### Espagnol (ES)
**Marché:** Espagne (Málaga, Barcelona, Valencia STR hubs), Amérique Latine
**Priorité:** ⭐⭐⭐⭐
**Statut:** À faire

### Portugais (PT)
**Marché:** Portugal (Lisbonne, Porto, Algarve STR boom), Brésil
**Priorité:** ⭐⭐⭐⭐
**Statut:** À faire

### Arabe (AR)
**Marché:** Maroc local, Golfe (UAE, Saudi), Égypte
**Priorité:** ⭐⭐⭐⭐⭐
**Direction:** RTL (right-to-left)
**Statut:** À faire (complexité RTL)

---

## 📝 CONTENU À TRADUIRE

### Priorité 1 (Landing & Conversion)
- [x] Homepage (/)
- [ ] Pricing (/pricing)
- [ ] Demo form (/demo)
- [ ] WhatsApp page (/whatsapp)

### Priorité 2 (Features)
- [ ] PMS (/pms)
- [ ] Channel Manager (/channel-manager)
- [ ] Dynamic Pricing (/dynamic-pricing)
- [ ] Guest Experience (/guest-experience)
- [ ] TeamFlow (/teamflow)
- [ ] Owner Portal (/owner-portal)

### Priorité 3 (Informationnel)
- [ ] Integrations (/integrations)
- [ ] About (/about)
- [ ] Brand (/brand)
- [ ] Analytics (/analytics)
- [ ] Inbox (/inbox)

### NE PAS TRADUIRE
- ❌ Noms de témoignages (personnes)
- ❌ URLs API (/api/*)
- ❌ Slugs techniques

### ADAPTER (pas traduire littéralement)
- ✅ Noms de studios/entreprises selon contexte
- ✅ Exemples de villes (Marrakech → Dubai pour AR/Gulf, Málaga pour ES, etc.)
- ✅ Devises (€ par défaut, mais $ pour EN si contexte US)
- ✅ Numéros de téléphone exemples

---

## 🔧 IMPLÉMENTATION TECHNIQUE

### 1. Configuration next-intl

**File:** `next.config.ts`
```typescript
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... existing config
};

export default withNextIntl(nextConfig);
```

**File:** `middleware.ts`
```typescript
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/', '/(fr|en|es|pt|ar)/:path*']
};
```

**File:** `i18n/routing.ts`
```typescript
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['fr', 'en', 'es', 'pt', 'ar'],
  defaultLocale: 'fr',
  localePrefix: 'always',
  pathnames: {
    '/': '/',
    '/pricing': '/pricing',
    '/demo': '/demo',
    // ... autres routes
  }
});
```

**File:** `i18n/request.ts`
```typescript
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
```

### 2. Layout racine avec i18n

**File:** `app/[locale]/layout.tsx`
```typescript
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

### 3. Fichiers de traduction

**Structure JSON:**
```json
{
  "common": {
    "pricing": "Tarifs",
    "demo": "Demander une démo",
    "features": "Fonctionnalités"
  },
  "pricing": {
    "hero": {
      "badge": "● Pricing simple · par listing",
      "title": "Trois tiers.",
      "titleGradient": "Un seul prix par bien.",
      "subtitle": "Solo pour démarrer..."
    },
    "tiers": {
      "solo": {
        "name": "Solo",
        "tagline": "Pour démarrer.",
        "description": "Le PMS qui digitalise...",
        "features": [
          "PMS multi-bien (calendrier, résas, paiements)",
          "Channel Manager — 5 OTAs"
        ]
      }
    },
    "faq": {
      "engagement": {
        "q": "Y a-t-il un engagement ?",
        "a": "Mensuel : aucun engagement..."
      }
    }
  }
}
```

### 4. Usage dans les composants

```typescript
import { useTranslations } from 'next-intl';

export default function PricingPage() {
  const t = useTranslations('pricing');

  return (
    <PageHero
      badge={t('hero.badge')}
      title={<>{t('hero.title')}<br /><span className="gradient-text">{t('hero.titleGradient')}</span></>}
      subtitle={t('hero.subtitle')}
    />
  );
}
```

---

## 🎯 SEO OPTIMISATION

### 1. Hreflang Tags

**Automatique dans layout.tsx:**
```typescript
export async function generateMetadata({ params: { locale } }) {
  return {
    alternates: {
      canonical: `https://sojori.com/${locale}`,
      languages: {
        'fr': 'https://sojori.com/fr',
        'en': 'https://sojori.com/en',
        'es': 'https://sojori.com/es',
        'pt': 'https://sojori.com/pt',
        'ar': 'https://sojori.com/ar',
        'x-default': 'https://sojori.com/fr'
      }
    }
  };
}
```

### 2. Sitemap Multilingue

**File:** `app/sitemap.ts`
```typescript
import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sojori.com';
  const pages = ['', '/pricing', '/demo', '/whatsapp', '/pms'];

  return pages.flatMap((page) =>
    routing.locales.map((locale) => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: page === '' ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${baseUrl}/${l}${page}`])
        )
      }
    }))
  );
}
```

### 3. Metadata par langue

**messages/fr.json (metadata section):**
```json
{
  "metadata": {
    "home": {
      "title": "Sojori — L'orchestrateur de la location courte durée",
      "description": "Software d'orchestration pour gestionnaires...",
      "keywords": "PMS Marrakech, PMS Maroc, gestion locative..."
    },
    "pricing": {
      "title": "Tarifs Sojori — PMS Location Courte Durée",
      "description": "Pricing transparent par listing..."
    }
  }
}
```

**messages/en.json:**
```json
{
  "metadata": {
    "home": {
      "title": "Sojori — The Short-Term Rental Orchestrator",
      "description": "Orchestration software for property managers...",
      "keywords": "PMS Morocco, property management software, Airbnb management..."
    },
    "pricing": {
      "title": "Sojori Pricing — Short-Term Rental PMS",
      "description": "Transparent per-listing pricing..."
    }
  }
}
```

### 4. Structured Data par langue

```typescript
export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'metadata.home' });

  return {
    title: t('title'),
    description: t('description'),
    other: {
      'application/ld+json': JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Sojori',
        description: t('description'),
        availableLanguage: ['fr', 'en', 'es', 'pt', 'ar'],
        // ...
      })
    }
  };
}
```

---

## 🔄 Language Switcher

### Dans SharedComponents.tsx

```typescript
'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { routing } from '@/i18n/routing';

const LANGUAGES = [
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'pt', label: 'Português', flag: '🇵🇹' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
];

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <div className="language-switcher">
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          onClick={() => switchLanguage(lang.code)}
          className={locale === lang.code ? 'active' : ''}
        >
          {lang.flag} {lang.label}
        </button>
      ))}
    </div>
  );
}
```

---

## 🌍 PARTICULARITÉS PAR LANGUE

### Arabe (AR) - RTL

**Challenges:**
- Direction RTL (right-to-left)
- Flip layout (flexbox, grid)
- Mirror icons/images
- Numbers restent LTR

**Solutions:**
```css
[dir="rtl"] {
  direction: rtl;
}

[dir="rtl"] .flex {
  flex-direction: row-reverse;
}

[dir="rtl"] .text-left {
  text-align: right;
}
```

**Tailwind RTL support:**
```typescript
// tailwind.config.ts
export default {
  plugins: [
    require('tailwindcss-rtl'),
  ],
}
```

### Espagnol (ES) - Marchés multiples

**Variantes:**
- ES-ES (Espagne): "piso", "apartamento"
- ES-MX (Mexique): "departamento"
- ES-AR (Argentine): "depto"

**Solution:** Utiliser ES-ES (neutre, international)

### Portugais (PT) - Portugal vs Brésil

**Variantes:**
- PT-PT (Portugal): "telemóvel", "gestor"
- PT-BR (Brésil): "celular", "gerente"

**Solution:** Utiliser PT-PT (marché Portugal > Brésil pour STR)

---

## 📦 FICHIERS DE TRADUCTION - STRUCTURE DÉTAILLÉE

### messages/fr.json (MASTER - source de vérité)

```json
{
  "metadata": {
    "home": { ... },
    "pricing": { ... }
  },
  "common": {
    "nav": {
      "product": "Produit",
      "pricing": "Tarifs",
      "integrations": "Intégrations",
      "about": "À propos",
      "login": "Connexion",
      "getDemo": "Demander une démo"
    },
    "cta": {
      "getStarted": "Démarrer",
      "learnMore": "En savoir plus",
      "watchDemo": "Voir la démo",
      "bookDemo": "Réserver une démo"
    },
    "footer": {
      "product": "Produit",
      "company": "Entreprise",
      "support": "Support",
      "legal": "Légal"
    }
  },
  "pricing": {
    "hero": { ... },
    "tiers": {
      "solo": { ... },
      "orchestre": { ... },
      "symphonie": { ... }
    },
    "toggles": {
      "monthly": "Mensuel",
      "annual": "Annuel",
      "save": "−20%",
      "foundingMember": "🇲🇦 Founding Member Maroc",
      "foundingDiscount": "−30% / 24 mois"
    },
    "calculator": {
      "yourProperties": "Vos biens",
      "listings": "listings",
      "perListing": "/listing/mois",
      "forListings": "Pour {count} listing(s)",
      "perMonth": "€ / mois",
      "perYear": "€ / an"
    },
    "onboarding": {
      "fee": "Onboarding €300 one-time",
      "description": "migration depuis votre outil actuel + setup WhatsApp + training Zoom 2h",
      "foundingFree": "offert pour les Founding Members 🇲🇦"
    },
    "faq": { ... }
  },
  "home": {
    "hero": {
      "badge": "● Orchestrateur · Location courte durée",
      "title": "Pas un logiciel qu'on opère.",
      "titleGradient": "Un logiciel qui orchestre.",
      "subtitle": "Sojori coordonne votre activité...",
      "ctaPrimary": "Voir l'orchestration →",
      "ctaSecondary": "Demander une démo"
    },
    "trustBar": {
      "title": "Intégré avec les meilleures plateformes"
    },
    "valueProp": { ... },
    "whatsappCase": { ... }
  }
}
```

---

## 🚀 PLAN D'EXÉCUTION

### Phase 1: Setup (Aujourd'hui)
- [x] Installer next-intl
- [ ] Créer structure i18n/
- [ ] Créer middleware.ts
- [ ] Créer messages/fr.json (extraction du contenu actuel)
- [ ] Migrer app/ vers app/[locale]/

### Phase 2: Traduction FR → EN (Jour 1-2)
- [ ] messages/en.json complet
- [ ] Tester toutes les pages en EN
- [ ] Vérifier SEO (hreflang, sitemap)

### Phase 3: ES + PT (Jour 3-4)
- [ ] messages/es.json
- [ ] messages/pt.json
- [ ] Adapter exemples de villes/devises

### Phase 4: Arabe RTL (Jour 5-7)
- [ ] messages/ar.json
- [ ] Implémenter RTL CSS
- [ ] Tester layout RTL
- [ ] Fix bugs visuels

### Phase 5: Polish & SEO (Jour 8-10)
- [ ] Language switcher design
- [ ] Google Search Console (hreflang verify)
- [ ] Tests complets toutes langues
- [ ] Documentation

---

## ✅ CHECKLIST QUALITÉ

### Pour chaque langue:
- [ ] Metadata title/description traduits
- [ ] Toutes les pages traduites
- [ ] FAQ traduite
- [ ] CTA buttons traduits
- [ ] Footer traduit
- [ ] Formulaire demo traduit
- [ ] URLs fonctionnelles
- [ ] Hreflang tags présents
- [ ] Sitemap inclut la langue
- [ ] Language switcher fonctionne
- [ ] Mobile responsive
- [ ] SEO score >90 (Lighthouse)

### Spécifique Arabe:
- [ ] Direction RTL appliquée
- [ ] Layout flip correct
- [ ] Icons/images non-mirrored
- [ ] Font lisible (Noto Sans Arabic)
- [ ] Numbers LTR dans texte RTL

---

## 📚 RESSOURCES

**next-intl docs:**
- https://next-intl-docs.vercel.app/

**SEO i18n:**
- https://developers.google.com/search/docs/specialty/international/localized-versions

**Traduction:**
- DeepL API (meilleure qualité que Google Translate)
- Validation native speaker pour chaque langue

**RTL CSS:**
- https://rtlcss.com/
- https://www.npmjs.com/package/tailwindcss-rtl

---

**Next Step:** Commencer Phase 1 - Setup
**ETA:** 2-3h pour setup complet + FR extraction
**Questions:** OK pour commencer?
