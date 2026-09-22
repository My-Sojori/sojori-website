import { NextRequest, NextResponse } from 'next/server';
import { normalizeDemoBackendResponse } from '@/lib/demoApiResponse';
import { getDemoServiceBaseUrl } from '@/lib/getDemoServiceBaseUrl';
import { demoProxyFetch } from '@/lib/demoProxyFetch';

/**
 * POST /api/v1/demo/verdict-by-token?t=… — proxy → srv-crm.
 *
 * Déclenché juste après l'envoi du questionnaire. Le backend relit la demande
 * en base et y écrit la note que le commercial lira avant son rendez-vous :
 * rien ne revient au client, et rien ne lui est montré.
 *
 * D'où le silence en cas de panne — succès vide plutôt qu'erreur. Le prospect
 * a déjà vu son « merci » ; lui afficher un échec sur une note qui ne le
 * concerne pas serait absurde.
 */
export async function POST(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('t')?.trim() || '';
  if (!token) {
    return NextResponse.json({ success: true, data: { verdict: null } }, { status: 200 });
  }

  try {
    const backendBase = getDemoServiceBaseUrl();
    const response = await demoProxyFetch(
      `${backendBase}/api/v1/demo/request/verdict-by-token?t=${encodeURIComponent(token)}`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' } },
    );

    let raw: unknown;
    try {
      raw = await response.json();
    } catch {
      return NextResponse.json({ success: true, data: { verdict: null } }, { status: 200 });
    }
    return NextResponse.json(normalizeDemoBackendResponse(raw), { status: 200 });
  } catch (error: unknown) {
    console.error('Error proxying demo verdict:', error);
    return NextResponse.json({ success: true, data: { verdict: null } }, { status: 200 });
  }
}
