import { NextResponse } from 'next/server';
import { testDisponible } from '@/lib/demoTestServeur';

/** GET /api/v1/demo/test-mode : le mode test (`?test=1`) est-il disponible ici ? Faux en production. */
export async function GET() {
  return NextResponse.json({ success: true, data: { test: testDisponible() } }, { headers: { 'Cache-Control': 'no-store' } });
}
