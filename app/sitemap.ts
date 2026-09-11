import { SITE_URL } from '@/lib/siteUrl';
import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

const PATHS = [
  '/',
  // 2026-09-11 : ces 4 landings existaient mais n'étaient pas déclarées —
  // Google ne les découvrait que par les liens internes, ce qui retarde
  // l'indexation. reel-capture reste exclue : elle porte un noindex.
  '/analyse-concurrents',
  '/global-launch',
  '/global-launch-express',
  '/offre-conciergeries-express',
  '/pms',
  '/channel-manager',
  '/whatsapp',
  '/dynamic-pricing',
  '/analytics',
  '/inbox',
  '/teamflow',
  '/owner-portal',
  '/dashboard-app',
  '/guest-experience',
  '/pricing',
  '/integrations',
  '/about',
  '/demo',
  '/demo/rdv',
  '/offre-conciergeries',
  '/brand',
  '/gestion-locative-marrakech',
  '/conciergerie-marrakech',
  '/gestion-locative-casablanca',
  '/conciergerie-casablanca',
  '/gestion-locative-agadir',
  '/conciergerie-agadir',
  '/gestion-locative-tanger',
  '/conciergerie-tanger',
  '/gestion-locative-rabat',
  '/conciergerie-rabat',
  // 2026-09-11 : pages « PMS + ville ». Elles ciblent la requête que le
  // concurrent direct (welcomax.com) occupe déjà sur les 5 villes.
  '/pms-marrakech',
  '/pms-casablanca',
  '/pms-rabat',
  '/pms-tanger',
  '/pms-agadir',
  '/terms',
  '/privacy',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of PATHS) {
      const suffix = path === '/' ? '' : path;
      entries.push({
        url: `${baseUrl}/${locale}${suffix}`,
        lastModified: new Date(),
        changeFrequency: path === '/' || path === '/pricing' ? 'weekly' : 'weekly',
        priority: path === '/' ? 1 : path === '/pricing' || path === '/demo' ? 0.95 : 0.85,
      });
    }
  }

  return entries;
}
