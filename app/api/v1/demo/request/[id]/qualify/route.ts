import { NextRequest, NextResponse } from 'next/server';
import { normalizeDemoBackendResponse } from '@/lib/demoApiResponse';
import {
  getDemoServiceBaseUrl,
  getDemoProxyFailureMessage,
} from '@/lib/getDemoServiceBaseUrl';
import { demoProxyFetch, devFetchDetailForDemo } from '@/lib/demoProxyFetch';
import { modeTest } from '@/lib/demoTestServeur';

/**
 * PATCH /api/v1/demo/request/:id/qualify — proxy → srv-crm.
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Corps JSON invalide' }, { status: 400 });
  }

  // Mode test (aperçus et local, jamais en production) : on répond sans appeler le CRM.
  if (modeTest(request)) {
    return NextResponse.json({ success: true, message: 'test', data: { test: true } });
  }

  try {
    const backendBase = getDemoServiceBaseUrl();

    const response = await demoProxyFetch(`${backendBase}/api/v1/demo/request/${id}/qualify`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    let raw: unknown;
    try {
      raw = await response.json();
    } catch {
      return NextResponse.json({ success: false, error: 'Invalid JSON from demo service' }, { status: 502 });
    }
    const data = normalizeDemoBackendResponse(raw);
    return NextResponse.json(data, { status: response.status });

  } catch (error: unknown) {
    console.error('Error proxying demo qualification:', error);
    return NextResponse.json(
      {
        success: false,
        error: `${getDemoProxyFailureMessage()}${devFetchDetailForDemo(error)}`,
      },
      { status: 500 },
    );
  }
}
