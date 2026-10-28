import { NextRequest, NextResponse } from 'next/server';
import { normalizeDemoBackendResponse } from '@/lib/demoApiResponse';
import {
  getDemoServiceBaseUrl,
  getDemoProxyFailureMessage,
} from '@/lib/getDemoServiceBaseUrl';
import { demoProxyFetch, devFetchDetailForDemo } from '@/lib/demoProxyFetch';

/**
 * POST /api/v1/demo/rdv/reserver — proxy → srv-crm : réserve le créneau choisi ({ t, debut, fuseau }).
 */
export async function POST(request: NextRequest) {
  let body: { t?: unknown; debut?: unknown; fuseau?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Corps JSON invalide' }, { status: 400 });
  }
  try {
    const backendBase = getDemoServiceBaseUrl();
    const response = await demoProxyFetch(`${backendBase}/api/v1/demo/rdv/reserver`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': request.headers.get('x-forwarded-for') || '',
      },
      // Seuls ces trois champs sortent du site vers le serveur.
      body: JSON.stringify({
        t: String(body.t ?? ''),
        debut: String(body.debut ?? ''),
        fuseau: typeof body.fuseau === 'string' ? body.fuseau : undefined,
      }),
    });
    let raw: unknown;
    try {
      raw = await response.json();
    } catch {
      return NextResponse.json({ success: false, error: 'Invalid JSON from demo service' }, { status: 502 });
    }
    return NextResponse.json(normalizeDemoBackendResponse(raw), { status: response.status });
  } catch (error: unknown) {
    console.error('Error proxying rdv/reserver:', error);
    return NextResponse.json(
      { success: false, error: `${getDemoProxyFailureMessage()}${devFetchDetailForDemo(error)}` },
      { status: 500 },
    );
  }
}
