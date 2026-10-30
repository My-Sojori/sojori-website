import { NextRequest, NextResponse } from 'next/server';
import { normalizeDemoBackendResponse } from '@/lib/demoApiResponse';
import { getDemoServiceBaseUrl, getDemoProxyFailureMessage } from '@/lib/getDemoServiceBaseUrl';
import { demoProxyFetch, devFetchDetailForDemo } from '@/lib/demoProxyFetch';

/**
 * GET /api/v1/public/sign/contract?t=… — proxy public → srv-crm.
 *
 * Le contrat à signer, lu par son jeton. Aucune session : le signataire n'a
 * pas de compte Sojori, et lui en demander un ferait perdre des contrats à la
 * dernière étape.
 */
export async function GET(request: NextRequest) {
  try {
    const backendBase = getDemoServiceBaseUrl();
    const q = request.nextUrl.searchParams.toString();
    const url = `${backendBase}/api/v1/public/sign/contract${q ? `?${q}` : ''}`;
    const response = await demoProxyFetch(url, { method: 'GET' });
    let raw: unknown;
    try {
      raw = await response.json();
    } catch {
      return NextResponse.json({ success: false, error: 'Réponse illisible du service' }, { status: 502 });
    }
    return NextResponse.json(normalizeDemoBackendResponse(raw), { status: response.status });
  } catch (error: unknown) {
    console.error('Error proxying contract by-token:', error);
    return NextResponse.json(
      { success: false, error: `${getDemoProxyFailureMessage()}${devFetchDetailForDemo(error)}` },
      { status: 500 },
    );
  }
}
