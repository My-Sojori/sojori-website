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
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sojori.com';
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
