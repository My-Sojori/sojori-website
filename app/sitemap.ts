import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

const PATHS = [
  '/',
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
  '/terms',
  '/privacy',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://business.sojori.com';
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
