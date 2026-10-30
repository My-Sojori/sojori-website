import { NextRequest, NextResponse } from 'next/server';
import { normalizeDemoBackendResponse } from '@/lib/demoApiResponse';
import { getDemoServiceBaseUrl, getDemoProxyFailureMessage } from '@/lib/getDemoServiceBaseUrl';
import { demoProxyFetch, devFetchDetailForDemo } from '@/lib/demoProxyFetch';

/**
 * GET /api/v1/demo/appointment/by-token — proxy public → srv-crm.
 */
export async function GET(request: NextRequest) {
  try {
    const backendBase = getDemoServiceBaseUrl();
    const q = request.nextUrl.searchParams.toString();
    const url = `${backendBase}/api/v1/demo/appointment/by-token${q ? `?${q}` : ''}`;
    const response = await demoProxyFetch(url, { method: 'GET' });
    let raw: unknown;
    try {
      raw = await response.json();
    } catch {
      return NextResponse.json({ success: false, error: 'Invalid JSON from demo service' }, { status: 502 });
    }
    const data = normalizeDemoBackendResponse(raw);
    return NextResponse.json(data, { status: response.status });
  } catch (error: unknown) {
    console.error('Error proxying appointment by-token:', error);
    return NextResponse.json(
      { success: false, error: `${getDemoProxyFailureMessage()}${devFetchDetailForDemo(error)}` },
      { status: 500 },
    );
  }
}
