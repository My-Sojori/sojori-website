import { NextRequest, NextResponse } from 'next/server';
import { normalizeDemoBackendResponse } from '@/lib/demoApiResponse';
import { getDemoServiceBaseUrl, getDemoProxyFailureMessage } from '@/lib/getDemoServiceBaseUrl';
import { demoProxyFetch, devFetchDetailForDemo } from '@/lib/demoProxyFetch';

/**
 * POST /api/v1/public/sign/contract/sign — proxy public → srv-crm.
 *
 * L'adresse d'origine du signataire est transmise : sans trace, une signature
 * contestée est indéfendable. Le proxy Next étant intercalé, l'IP réelle se lit
 * dans `x-forwarded-for` — sans ce passage, srv-crm n'enregistrerait que l'IP
 * du proxy, identique pour tout le monde.
 */
export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Corps JSON invalide' }, { status: 400 });
  }

  try {
    const backendBase = getDemoServiceBaseUrl();
    const forwarded =
      request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '';

    const response = await demoProxyFetch(`${backendBase}/api/v1/public/sign/contract/sign`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(forwarded ? { 'x-forwarded-for': forwarded } : {}),
      },
      body: JSON.stringify(body),
    });

    let raw: unknown;
    try {
      raw = await response.json();
    } catch {
      return NextResponse.json({ success: false, error: 'Réponse illisible du service' }, { status: 502 });
    }
    return NextResponse.json(normalizeDemoBackendResponse(raw), { status: response.status });
  } catch (error: unknown) {
    console.error('Error proxying contract signature:', error);
    return NextResponse.json(
      { success: false, error: `${getDemoProxyFailureMessage()}${devFetchDetailForDemo(error)}` },
      { status: 500 },
    );
  }
}
