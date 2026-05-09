import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/v1/demo/booking-week — proxy vers srv-user (créneaux publics, 7 jours).
 */
export async function GET(request: NextRequest) {
  try {
    const SRV_USER_URL = process.env.SRV_USER_URL || 'http://localhost:4005';
    const q = request.nextUrl.searchParams.toString();
    const url = `${SRV_USER_URL}/api/v1/demo/booking-week${q ? `?${q}` : ''}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'cache-control': 'no-store' },
    });
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error: unknown) {
    console.error('Error proxying booking-week:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to connect to backend service' },
      { status: 500 },
    );
  }
}
