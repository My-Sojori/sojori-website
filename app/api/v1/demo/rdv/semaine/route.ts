import { NextRequest, NextResponse } from 'next/server';
import { refuserEnTest } from '@/lib/demoTestServeur';
import { normalizeDemoBackendResponse } from '@/lib/demoApiResponse';
import {
  getDemoServiceBaseUrl,
  getDemoProxyFailureMessage,
} from '@/lib/getDemoServiceBaseUrl';
import { demoProxyFetch, devFetchDetailForDemo } from '@/lib/demoProxyFetch';

/**
 * GET /api/v1/demo/rdv/semaine?t=… — proxy → srv-crm : les créneaux libres du commercial du prospect,
 * sans son nom (le jeton signé du lien envoyé par e-mail est la seule clé).
 */
export async function GET(request: NextRequest) {
  const enTest = refuserEnTest(request);
  if (enTest) return enTest;
  try {
    const backendBase = getDemoServiceBaseUrl();
    const t = request.nextUrl.searchParams.get('t') || '';
    const url = `${backendBase}/api/v1/demo/rdv/semaine?t=${encodeURIComponent(t)}`;
    const response = await demoProxyFetch(url, {
      method: 'GET',
      headers: {
        'cache-control': 'no-store',
        // L'adresse du visiteur : sans elle, le serveur compte une seule IP (celle de Vercel) pour tout le
        // site et sa limite de 120 requêtes par heure tombe sur tout le monde (revue de #12).
        'x-forwarded-for': request.headers.get('x-forwarded-for') || '',
      },
    });
    let raw: unknown;
    try {
      raw = await response.json();
    } catch {
      return NextResponse.json({ success: false, error: 'Invalid JSON from demo service' }, { status: 502 });
    }
    return NextResponse.json(normalizeDemoBackendResponse(raw), { status: response.status });
  } catch (error: unknown) {
    console.error('Error proxying rdv/semaine:', error);
    return NextResponse.json(
      { success: false, error: `${getDemoProxyFailureMessage()}${devFetchDetailForDemo(error)}` },
      { status: 500 },
    );
  }
}
