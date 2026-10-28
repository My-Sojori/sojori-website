import { NextRequest, NextResponse } from 'next/server';
import { getDemoServiceBaseUrl, getDemoProxyFailureMessage } from '@/lib/getDemoServiceBaseUrl';
import { demoProxyFetch, devFetchDetailForDemo } from '@/lib/demoProxyFetch';

/**
 * GET /api/v1/public/sign/contract/pdf?t=… — proxy public → srv-crm.
 *
 * Le contrat d'abonnement SIGNÉ en PDF (C3, 28/10/2026) : parties, conditions générales, bon de
 * commande, signatures et certificat de signature. srv-crm ne le sert qu'une fois le contrat signé.
 * Les octets passent tels quels.
 */
export async function GET(request: NextRequest) {
  try {
    const backendBase = getDemoServiceBaseUrl();
    const t = request.nextUrl.searchParams.get('t') ?? '';
    const response = await demoProxyFetch(
      `${backendBase}/api/v1/public/sign/contract/pdf?t=${encodeURIComponent(t)}`,
      { method: 'GET' },
    );
    if (!response.ok || response.headers.get('content-type') !== 'application/pdf') {
      return NextResponse.json(
        { success: false, error: 'Contrat signé introuvable' },
        { status: response.status === 200 ? 502 : response.status },
      );
    }
    return new NextResponse(await response.arrayBuffer(), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': response.headers.get('content-disposition') ?? 'attachment; filename="Contrat.pdf"',
        'Cache-Control': 'no-store',
      },
    });
  } catch (error: unknown) {
    console.error('Error proxying signed contract PDF:', error);
    return NextResponse.json(
      { success: false, error: `${getDemoProxyFailureMessage()}${devFetchDetailForDemo(error)}` },
      { status: 500 },
    );
  }
}
