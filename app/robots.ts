import { SITE_URL } from '@/lib/siteUrl';
import { MetadataRoute } from 'next';

/**
 * robots.txt.
 *
 * 2026-09-12 — Les crawlers IA sont déclarés explicitement. Ils étaient déjà
 * couverts par la règle `*`, mais une autorisation nommée lève toute ambiguïté :
 * plusieurs de ces agents traitent l'absence de règle propre comme un signal
 * incertain, et c'est par eux que passe désormais une part des recherches
 * (ChatGPT, Perplexity, Google AI Overviews, Claude).
 *
 * Deux familles à ne pas confondre :
 *  - les crawlers d'INDEXATION pour la recherche (OAI-SearchBot, PerplexityBot)
 *    → à autoriser, ils amènent du trafic ;
 *  - les crawlers d'ENTRAÎNEMENT (GPTBot, Google-Extended, Applebot-Extended,
 *    meta-externalagent, ClaudeBot) → autorisés ici aussi, parce que le contenu
 *    est public et que leur blocage prive Sojori d'être cité dans les réponses.
 *    C'est un choix produit : si la position change, c'est ici qu'on l'inverse.
 */
const AI_AGENTS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'PerplexityBot',
  'Perplexity-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'Google-Extended',
  'Applebot-Extended',
  'meta-externalagent',
  'Bytespider',
  'CCBot',
  'cohere-ai',
  'Amazonbot',
  'YouBot',
];

export default function robots(): MetadataRoute.Robots {
  const disallow = ['/api/', '/admin/'];
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow },
      ...AI_AGENTS.map((userAgent) => ({ userAgent, allow: '/', disallow })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
