import { NextRequest, NextResponse } from 'next/server';
import { normalizeDemoBackendResponse } from '@/lib/demoApiResponse';
import {
  getDemoServiceBaseUrl,
  getDemoProxyFailureMessage,
} from '@/lib/getDemoServiceBaseUrl';
import { demoProxyFetch, devFetchDetailForDemo } from '@/lib/demoProxyFetch';

/**
 * POST /api/v1/demo/request/:id/follow-up — proxy → srv-crm.
 *
 * Renvoie deux à trois questions choisies d'après ce que le prospect vient de
 * répondre. Le backend sert un jeu écrit à l'avance dès que l'IA n'aboutit
 * pas : cette route ne doit donc jamais faire échouer le questionnaire, même
 * lorsqu'elle-même échoue — d'où le 200 avec une liste vide en dernier
 * recours, que le formulaire interprète comme « pas de question de plus ».
 */
export async function POST(
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

  try {
    const backendBase = getDemoServiceBaseUrl();

    const response = await demoProxyFetch(`${backendBase}/api/v1/demo/request/${id}/follow-up`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    let raw: unknown;
    try {
      raw = await response.json();
    } catch {
      return NextResponse.json({ success: true, data: { questions: [] } }, { status: 200 });
    }
    const data = normalizeDemoBackendResponse(raw);
    return NextResponse.json(data, { status: response.status });

  } catch (error: unknown) {
    console.error('Error proxying demo follow-up:', error);
    // Le questionnaire continue sans questions supplémentaires plutôt que de
    // s'arrêter sur une panne qui ne concerne pas le prospect.
    return NextResponse.json(
      {
        success: true,
        data: { questions: [] },
        error: `${getDemoProxyFailureMessage()}${devFetchDetailForDemo(error)}`,
      },
      { status: 200 },
    );
  }
}
