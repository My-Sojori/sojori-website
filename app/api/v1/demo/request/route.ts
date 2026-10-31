import { NextRequest, NextResponse } from 'next/server';
import { normalizeDemoBackendResponse } from '@/lib/demoApiResponse';
import {
  getDemoServiceBaseUrl,
  getDemoProxyFailureMessage,
} from '@/lib/getDemoServiceBaseUrl';
import { demoProxyFetch, devFetchDetailForDemo } from '@/lib/demoProxyFetch';
import { modeTest } from '@/lib/demoTestServeur';

/**
 * POST /api/v1/demo/request
 * Proxy → srv-crm (`/api/v1/demo/request`).
 */
export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Corps JSON invalide' }, { status: 400 });
  }

  // Mode test (aperçus et local, jamais en production) : on répond sans appeler le CRM.
  if (modeTest(request)) {
    return NextResponse.json({ success: true, message: 'test', data: { id: 'f'.repeat(24), qualificationToken: 'test', test: true } }, { status: 201 });
  }

  try {
    const backendBase = getDemoServiceBaseUrl();

    const response = await demoProxyFetch(`${backendBase}/api/v1/demo/request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Forward client IP for tracking
        'x-forwarded-for': request.headers.get('x-forwarded-for') || '',
        'user-agent': request.headers.get('user-agent') || '',
      },
      body: JSON.stringify(body),
    });

    let raw: unknown;
    try {
      raw = await response.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON from demo service' },
        { status: 502 },
      );
    }
    const data = normalizeDemoBackendResponse(raw);
    return NextResponse.json(data, { status: response.status });

  } catch (error: unknown) {
    console.error('Error proxying demo request:', error);
    return NextResponse.json(
      {
        success: false,
        error: `${getDemoProxyFailureMessage()}${devFetchDetailForDemo(error)}`,
      },
      { status: 500 },
    );
  }
}
