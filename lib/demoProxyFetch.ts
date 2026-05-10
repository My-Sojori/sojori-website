/**
 * fetch vers srv-crm depuis les route handlers Next — pas de cache, timeout long, UA explicite.
 * (Évite comportements bizarres du fetch App Router + WAF qui bloquent les UA vides.)
 */
const DEMO_PROXY_UA = 'SojoriWebsiteDemoProxy/1.0';

/** Suffixe d’erreur réseau en `next dev` pour déboguer (TLS, DNS, timeout…). */
export function devFetchDetailForDemo(error: unknown): string {
  if (process.env.NODE_ENV !== 'development' || !(error instanceof Error)) return '';
  const c = error.cause != null ? ` cause=${String(error.cause)}` : '';
  return ` [${error.message}${c}]`;
}

export function demoProxyFetch(
  input: string,
  init?: RequestInit,
): Promise<Response> {
  const headers = new Headers(init?.headers);
  if (!headers.has('user-agent')) {
    headers.set('user-agent', DEMO_PROXY_UA);
  }

  return fetch(input, {
    ...init,
    headers,
    cache: 'no-store',
    signal: init?.signal ?? AbortSignal.timeout(60_000),
  });
}
