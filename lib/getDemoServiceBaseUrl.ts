const LOOPBACK_RE = /^(https?:\/\/)?(127\.0\.0\.1|localhost)(:\d+)?\/?$/i;

function isLoopbackBase(url: string): boolean {
  try {
    const u = new URL(url.startsWith('http') ? url : `http://${url}`);
    return u.hostname === '127.0.0.1' || u.hostname === 'localhost';
  } catch {
    return LOOPBACK_RE.test(url);
  }
}

/** CRM distant utilisé en `next dev` si `SRV_CRM_URL` est absent (évite fetch failed sans srv-crm local). */
const DEV_PUBLIC_CRM_FALLBACK = 'https://dev.sojori.com';

let loggedDevFallback = false;

/**
 * Base URL for Next.js `/api/v1/demo/*` proxies → **srv-crm** only (`/api/v1/demo/...`).
 * Production: `SRV_CRM_URL` is required (URL publique — jamais 127.0.0.1 sur Vercel).
 * `next dev` sans env : défaut **https://dev.sojori.com** (pas besoin de lancer srv-crm en local).
 * Stack 100 % local : `.env.local` → `SRV_CRM_URL=http://127.0.0.1:4013` (ou `host.docker.internal:4013` dans Docker).
 */
export function getDemoServiceBaseUrl(): string {
  const fromEnv = (process.env.SRV_CRM_URL || '').trim();
  if (fromEnv) {
    const base = fromEnv.replace(/\/$/, '');
    if (process.env.VERCEL && isLoopbackBase(base)) {
      throw new Error(
        'SRV_CRM_URL ne peut pas pointer vers localhost sur Vercel. Définissez une URL publique (ex. https://dev.sojori.com ou https://www.sojori.com).',
      );
    }
    return base;
  }
  if (process.env.NODE_ENV === 'production') {
    throw new Error(
      'SRV_CRM_URL must be set (demo proxies target srv-crm only; no fallback to srv-user).',
    );
  }
  if (!loggedDevFallback) {
    loggedDevFallback = true;
    console.warn(
      `[sojori-website] SRV_CRM_URL absent — proxy démo → ${DEV_PUBLIC_CRM_FALLBACK}. Pour srv-crm local uniquement : SRV_CRM_URL=http://127.0.0.1:4013 dans .env.local`,
    );
  }
  return DEV_PUBLIC_CRM_FALLBACK;
}

/** Message utilisateur quand le proxy démo échoue (évite de rappeler 127.0.0.1 seul sur l’hébergé). */
export function getDemoProxyFailureMessage(): string {
  try {
    const backendBase = getDemoServiceBaseUrl();
    if (isLoopbackBase(backendBase)) {
      return (
        `Connexion au service démo impossible (${backendBase}). ` +
        'Lancez `srv-crm` (`pnpm --filter srv-crm dev` sur le port 4013) ou utilisez `SRV_CRM_URL=https://dev.sojori.com` dans `.env.local`. ' +
        'Sur Vercel : `SRV_CRM_URL` doit être une URL HTTPS publique (pas 127.0.0.1).'
      );
    }
    return (
      `Connexion au service démo impossible (${backendBase}). ` +
      'Vérifiez réseau / VPN / pare-feu, et depuis le terminal : `curl -sS ' +
      backendBase +
      '/health`. En `next dev`, la console du serveur Next affiche le détail technique si NODE_ENV=development.'
    );
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return `Configuration démo : ${msg}`;
  }
}
