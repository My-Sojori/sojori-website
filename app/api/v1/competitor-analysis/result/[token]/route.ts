import { NextRequest, NextResponse } from 'next/server';
import { normalizeDemoBackendResponse } from '@/lib/demoApiResponse';
import {
  getDemoServiceBaseUrl,
  getDemoProxyFailureMessage,
} from '@/lib/getDemoServiceBaseUrl';
import { demoProxyFetch, devFetchDetailForDemo } from '@/lib/demoProxyFetch';

/**
 * GET /api/v1/competitor-analysis/result/[token]
 * Proxy → srv-crm (`/api/v1/competitor-analysis/result/:token`).
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;

  try {
    const backendBase = getDemoServiceBaseUrl();

    const response = await demoProxyFetch(
      `${backendBase}/api/v1/competitor-analysis/result/${encodeURIComponent(token)}`,
      { method: 'GET' },
    );

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
    console.error('Error proxying competitor-analysis result:', error);
    return NextResponse.json(
      {
        success: false,
        error: `${getDemoProxyFailureMessage()}${devFetchDetailForDemo(error)}`,
      },
      { status: 500 },
    );
  }
}
