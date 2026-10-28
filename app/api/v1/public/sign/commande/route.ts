import { NextRequest, NextResponse } from 'next/server';
import { normalizeDemoBackendResponse } from '@/lib/demoApiResponse';
import { getDemoServiceBaseUrl, getDemoProxyFailureMessage } from '@/lib/getDemoServiceBaseUrl';
import { demoProxyFetch, devFetchDetailForDemo } from '@/lib/demoProxyFetch';

/**
 * GET /api/v1/public/sign/commande?t=… — proxy public → srv-crm (C4, 28/10/2026).
 *
 * Une commande suivante d'un contrat d'abonnement, lue par son jeton : ce qui change, le prorata,
 * les frais. Aucune session : le client arrive par le lien de l'e-mail.
 */
export async function GET(request: NextRequest) {
  try {
    const backendBase = getDemoServiceBaseUrl();
    const t = request.nextUrl.searchParams.get('t') ?? '';
    const response = await demoProxyFetch(
      `${backendBase}/api/v1/public/sign/commande?t=${encodeURIComponent(t)}`,
      { method: 'GET' },
    );
    let raw: unknown;
    try {
      raw = await response.json();
    } catch {
      return NextResponse.json({ success: false, error: 'Réponse illisible du service' }, { status: 502 });
    }
    return NextResponse.json(normalizeDemoBackendResponse(raw), { status: response.status });
  } catch (error: unknown) {
    console.error('Error proxying commande by-token:', error);
    return NextResponse.json(
      { success: false, error: `${getDemoProxyFailureMessage()}${devFetchDetailForDemo(error)}` },
      { status: 500 },
    );
  }
}
