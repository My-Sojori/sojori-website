/**
 * URL canonique du site SaaS.
 *
 * 2026-09-11 : le SaaS déménage de business.sojori.com vers sojori.com
 * (domaine principal), et le site de location part sur book.sojori.com.
 *
 * Cette valeur était codée en dur à 10 endroits — dont metadataBase, le
 * sitemap, robots.txt et le JSON-LD. Tant qu'elle pointait sur l'ancien
 * domaine, Google aurait continué à l'indexer comme URL canonique, même
 * une fois le site servi depuis sojori.com.
 *
 * Surchargeable par NEXT_PUBLIC_SITE_URL pour les préproductions.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://sojori.com'
).replace(/\/$/, '')

/** URL absolue pour un chemin donné. */
export function absoluteUrl(path = ''): string {
  return `${SITE_URL}${path.startsWith('/') || !path ? path : `/${path}`}`
}
