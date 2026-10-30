import { NextRequest, NextResponse } from 'next/server';
import { normalizeDemoBackendResponse } from '@/lib/demoApiResponse';
import {
  getDemoServiceBaseUrl,
  getDemoProxyFailureMessage,
} from '@/lib/getDemoServiceBaseUrl';
import { demoProxyFetch, devFetchDetailForDemo } from '@/lib/demoProxyFetch';

/**
 * POST /api/v1/demo/rdv/annuler — proxy → srv-crm : annule ou change le RDV déjà pris ({ t, action }).
 */
export async function POST(request: NextRequest) {
  let body: { t?: unknown; action?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Corps JSON invalide' }, { status: 400 });
  }
  try {
    const backendBase = getDemoServiceBaseUrl();
    const action = body.action === 'changer' ? 'changer' : 'annuler';
    const response = await demoProxyFetch(`${backendBase}/api/v1/demo/rdv/annuler`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': request.headers.get('x-forwarded-for') || '',
      },
      body: JSON.stringify({
        t: String(body.t ?? ''),
        action,
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
    console.error('Error proxying rdv/annuler:', error);
    return NextResponse.json(
      { success: false, error: `${getDemoProxyFailureMessage()}${devFetchDetailForDemo(error)}` },
      { status: 500 },
    );
  }
}
