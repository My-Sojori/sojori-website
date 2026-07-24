import { NextRequest, NextResponse } from 'next/server';
import { normalizeDemoBackendResponse } from '@/lib/demoApiResponse';
import {
  getDemoServiceBaseUrl,
  getDemoProxyFailureMessage,
} from '@/lib/getDemoServiceBaseUrl';
import { demoProxyFetch, devFetchDetailForDemo } from '@/lib/demoProxyFetch';

/**
 * POST /api/v1/competitor-analysis/preview
 * Lab privé → srv-crm /preview (secret).
 * ⚠️ TEMPORAIRE — à supprimer après QA design.
 */
export async function POST(request: NextRequest) {
  let body: { airbnbUrl?: string; previewSecret?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Corps JSON invalide' }, { status: 400 });
  }

  const secret = String(body.previewSecret || '').trim();
  const expected = (process.env.COMPETITOR_ANALYSIS_PREVIEW_SECRET || 'sj-lab-tg-7f3a9c2e').trim();
  if (!secret || secret !== expected) {
    return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
  }

  try {
    const backendBase = getDemoServiceBaseUrl();
    const response = await demoProxyFetch(`${backendBase}/api/v1/competitor-analysis/preview`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-preview-secret': secret,
      },
      body: JSON.stringify({ airbnbUrl: body.airbnbUrl }),
      signal: AbortSignal.timeout(180_000),
    });

    let raw: unknown;
    try {
      raw = await response.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON from competitor-analysis service' },
        { status: 502 },
      );
    }
    const data = normalizeDemoBackendResponse(raw);
    return NextResponse.json(data, { status: response.status });
  } catch (error: unknown) {
    console.error('Error proxying competitor-analysis preview:', error);
    return NextResponse.json(
      {
        success: false,
        error: `${getDemoProxyFailureMessage()}${devFetchDetailForDemo(error)}`,
      },
      { status: 500 },
    );
  }
}
