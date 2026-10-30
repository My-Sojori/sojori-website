import { NextRequest, NextResponse } from 'next/server';
import { normalizeDemoBackendResponse } from '@/lib/demoApiResponse';
import { getDemoServiceBaseUrl, getDemoProxyFailureMessage } from '@/lib/getDemoServiceBaseUrl';
import { demoProxyFetch, devFetchDetailForDemo } from '@/lib/demoProxyFetch';

/**
 * PATCH /api/v1/demo/qualify-by-token?t=… — proxy → srv-crm.
 *
 * Le questionnaire rempli par le client après sa prise de rendez-vous. Le
 * jeton est celui de son rendez-vous, reçu par courriel : pas de compte à
 * créer. Côté backend, une liste blanche limite ce qu'il peut écrire.
 */
export async function PATCH(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('t')?.trim() || '';
  if (!token) {
    return NextResponse.json({ success: false, error: 'Lien incomplet' }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Corps JSON invalide' }, { status: 400 });
  }

  try {
    const backendBase = getDemoServiceBaseUrl();
    const response = await demoProxyFetch(
      `${backendBase}/api/v1/demo/request/qualify-by-token?t=${encodeURIComponent(token)}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      },
    );

    let raw: unknown;
    try {
      raw = await response.json();
    } catch {
      return NextResponse.json({ success: false, error: 'Réponse illisible du service' }, { status: 502 });
    }
    return NextResponse.json(normalizeDemoBackendResponse(raw), { status: response.status });
  } catch (error: unknown) {
    console.error('Error proxying demo qualification:', error);
    return NextResponse.json(
      { success: false, error: `${getDemoProxyFailureMessage()}${devFetchDetailForDemo(error)}` },
      { status: 500 },
    );
  }
}
