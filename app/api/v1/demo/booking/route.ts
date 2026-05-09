import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/v1/demo/booking — proxy vers srv-user (réserver un créneau démo).
 */
export async function POST(request: NextRequest) {
  try {
    const SRV_USER_URL = process.env.SRV_USER_URL || 'http://localhost:4005';
    const body = await request.json();
    const response = await fetch(`${SRV_USER_URL}/api/v1/demo/booking`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error: unknown) {
    console.error('Error proxying demo booking:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to connect to backend service' },
      { status: 500 },
    );
  }
}
