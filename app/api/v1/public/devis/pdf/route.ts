import { NextRequest, NextResponse } from 'next/server';
import { getDemoServiceBaseUrl, getDemoProxyFailureMessage } from '@/lib/getDemoServiceBaseUrl';
import { demoProxyFetch, devFetchDetailForDemo } from '@/lib/demoProxyFetch';

/**
 * GET /api/v1/public/devis/pdf?t=… — proxy public → srv-crm.
 *
 * Le devis en PDF, généré à la demande (jamais joint à l'e-mail). Les octets passent tels quels.
 */
export async function GET(request: NextRequest) {
  try {
    const backendBase = getDemoServiceBaseUrl();
    const t = request.nextUrl.searchParams.get('t') ?? '';
    const response = await demoProxyFetch(
      `${backendBase}/api/v1/public/devis/pdf?t=${encodeURIComponent(t)}`,
      { method: 'GET' },
    );
    if (!response.ok || response.headers.get('content-type') !== 'application/pdf') {
      return NextResponse.json(
        { success: false, error: 'Devis introuvable ou lien expiré' },
        { status: response.status === 200 ? 502 : response.status },
      );
    }
    return new NextResponse(await response.arrayBuffer(), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': response.headers.get('content-disposition') ?? 'attachment; filename="Devis.pdf"',
        'Cache-Control': 'no-store',
      },
    });
  } catch (error: unknown) {
    console.error('Error proxying quote PDF:', error);
    return NextResponse.json(
      { success: false, error: `${getDemoProxyFailureMessage()}${devFetchDetailForDemo(error)}` },
      { status: 500 },
    );
  }
}
