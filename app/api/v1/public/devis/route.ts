import { NextRequest, NextResponse } from 'next/server';
import { normalizeDemoBackendResponse } from '@/lib/demoApiResponse';
import { getDemoServiceBaseUrl, getDemoProxyFailureMessage } from '@/lib/getDemoServiceBaseUrl';
import { demoProxyFetch, devFetchDetailForDemo } from '@/lib/demoProxyFetch';

/**
 * GET /api/v1/public/devis?t=… — proxy public → srv-crm.
 *
 * Le devis par lien (Tawfiq, 29/10/2026) : le client le lit sans compte, par son jeton. Jamais mis en cache :
 * la première ouverture est datée côté serveur, et le statut (accepté, expiré) doit être celui d'aujourd'hui.
 */
export async function GET(request: NextRequest) {
  try {
    const backendBase = getDemoServiceBaseUrl();
    const t = request.nextUrl.searchParams.get('t') ?? '';
    const response = await demoProxyFetch(
      `${backendBase}/api/v1/public/devis?t=${encodeURIComponent(t)}`,
      { method: 'GET' },
    );
    let raw: unknown;
    try {
      raw = await response.json();
    } catch {
      return NextResponse.json({ success: false, error: 'Réponse illisible du service' }, { status: 502 });
    }
    return NextResponse.json(normalizeDemoBackendResponse(raw), {
      status: response.status,
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (error: unknown) {
    console.error('Error proxying quote by-token:', error);
    return NextResponse.json(
      { success: false, error: `${getDemoProxyFailureMessage()}${devFetchDetailForDemo(error)}` },
      { status: 500 },
    );
  }
}
