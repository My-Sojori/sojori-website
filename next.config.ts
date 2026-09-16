import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  // Next 16 bloque HMR si on ouvre 127.0.0.1 alors que le serveur annonce localhost
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
  /**
   * Redirections 301 — bascule de domaines du 2026-09-11.
   *
   * sojori.com servait le site de LOCATION, il sert désormais le SaaS.
   * La location déménage sur book.sojori.com.
   *
   * Sans ces règles, les URLs indexées depuis des mois (fiches logement,
   * recherche, checkout) renverraient du contenu SaaS ou un 404 : le
   * référencement acquis serait perdu, et les campagnes Meta Ads en cours
   * atterriraient sur la mauvaise page.
   *
   * `permanent: true` = 301 : Google transfère le positionnement vers la
   * nouvelle adresse au lieu de le dissoudre.
   */
  async redirects() {
    const BOOK = 'https://book.sojori.com'
    // Chemins du site de location, relevés sur sojori-vente le 2026-09-11.
    // Aucun n'entre en collision avec une route du SaaS (vérifié).
    // 2026-09-16 : réduit de 18 à 3 chemins. book.sojori.com est servi depuis
    // le 14/09 par le projet sojori-app, une refonte du site de réservation qui
    // n'a pas repris toutes les routes de l'ancien (sojori-vente). Testés un à
    // un : 15 des 18 chemins renvoyaient 404 — on envoyait donc visiteurs et
    // robots dans le vide, ce qui est pire que ne pas rediriger du tout.
    // Les trois qui restent ont été vérifiés en production.
    // À ré-ajouter au fur et à mesure que les pages réapparaissent.
    const rentalPaths = [
      'checkout/:path*',
      'listings/:path*',
      'search',
    ]

    // business.sojori.com servait le SaaS avant la bascule. Le laisser
    // répondre en parallèle de sojori.com créerait du contenu dupliqué :
    // Google verrait deux adresses pour les mêmes 35 pages et diluerait le
    // positionnement. On le redirige vers le domaine canonique.
    const businessRedirect = {
      source: '/:path*',
      has: [{ type: 'host' as const, value: 'business.sojori.com' }],
      destination: 'https://sojori.com/:path*',
      permanent: true,
    }

    return [
      businessRedirect,
      ...rentalPaths.map((p) => ({
        source: `/${p}`,
        destination: `${BOOK}/${p}`,
        permanent: true,
      })),
    ]
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
