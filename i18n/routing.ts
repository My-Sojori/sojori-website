import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  // Langues supportées
  locales: ['fr', 'en', 'es', 'pt', 'ar'],

  // Langue par défaut (Maroc = français)
  defaultLocale: 'fr',

  // Toujours afficher le préfixe de langue dans l'URL
  localePrefix: 'always',

  // Pathnames (tous identiques pour l'instant, pas de traduction d'URL)
  pathnames: {
    '/': '/',
    '/pricing': '/pricing',
    '/demo': '/demo',
    '/whatsapp': '/whatsapp',
    '/pms': '/pms',
    '/channel-manager': '/channel-manager',
    '/dynamic-pricing': '/dynamic-pricing',
    '/analytics': '/analytics',
    '/inbox': '/inbox',
    '/guest-experience': '/guest-experience',
    '/teamflow': '/teamflow',
    '/owner-portal': '/owner-portal',
    '/integrations': '/integrations',
    '/about': '/about',
    '/brand': '/brand',
    '/dashboard-app': '/dashboard-app',
    '/conciergerie-marrakech': '/conciergerie-marrakech',
    '/gestion-locative-marrakech': '/gestion-locative-marrakech'
  }
});

// Export navigation helpers
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
