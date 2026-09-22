import { NextRequest, NextResponse } from 'next/server';
import { normalizeDemoBackendResponse } from '@/lib/demoApiResponse';
import { getDemoServiceBaseUrl } from '@/lib/getDemoServiceBaseUrl';
import { demoProxyFetch } from '@/lib/demoProxyFetch';

/**
 * POST /api/v1/demo/follow-up-by-token?t=… — proxy → srv-crm.
 *
 * Deux ou trois questions de plus, choisies d'après ce que le client vient de
 * répondre. Le backend sert un jeu écrit à l'avance quand son IA n'aboutit
 * pas ; ici, toute panne rend une liste vide plutôt qu'une erreur : ces
 * questions enrichissent le questionnaire, elles ne doivent jamais le bloquer.
 */
export async function POST(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('t')?.trim() || '';
  if (!token) {
    return NextResponse.json({ success: true, data: { questions: [] } }, { status: 200 });
  }

  let body: unknown = {};
  try {
    body = await request.json();
  } catch {
    // Un corps absent n'est pas un problème : le backend lit la demande en base.
  }

  try {
    const backendBase = getDemoServiceBaseUrl();
    const response = await demoProxyFetch(
      `${backendBase}/api/v1/demo/request/follow-up-by-token?t=${encodeURIComponent(token)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      },
    );

    let raw: unknown;
    try {
      raw = await response.json();
    } catch {
      return NextResponse.json({ success: true, data: { questions: [] } }, { status: 200 });
    }
    return NextResponse.json(normalizeDemoBackendResponse(raw), { status: 200 });
  } catch (error: unknown) {
    console.error('Error proxying demo follow-up:', error);
    return NextResponse.json({ success: true, data: { questions: [] } }, { status: 200 });
  }
}
