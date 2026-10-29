import { NextRequest, NextResponse } from 'next/server';
import { normalizeDemoBackendResponse } from '@/lib/demoApiResponse';
import { getDemoServiceBaseUrl, getDemoProxyFailureMessage } from '@/lib/getDemoServiceBaseUrl';
import { demoProxyFetch, devFetchDetailForDemo } from '@/lib/demoProxyFetch';

/**
 * POST /api/v1/public/devis/accepter?t=… — proxy public → srv-crm.
 *
 * Le client accepte son devis. L'adresse d'origine est transmise (x-forwarded-for) : sans elle, srv-crm ne verrait
 * que celle du proxy.
 */
export async function POST(request: NextRequest) {
  let body: unknown = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }
  try {
    const backendBase = getDemoServiceBaseUrl();
    const t = request.nextUrl.searchParams.get('t') ?? '';
    const forwarded = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '';
    const response = await demoProxyFetch(
      `${backendBase}/api/v1/public/devis/accepter?t=${encodeURIComponent(t)}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(forwarded ? { 'x-forwarded-for': forwarded } : {}),
        },
        body: JSON.stringify(body),
      },
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
    console.error('Error proxying quote acceptance:', error);
    return NextResponse.json(
      { success: false, error: `${getDemoProxyFailureMessage()}${devFetchDetailForDemo(error)}` },
      { status: 500 },
    );
  }
}
