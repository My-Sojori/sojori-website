import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/v1/demo/request
 * Proxy to srv-user backend service
 * Creates a new demo request in MongoDB via srv-user service
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Get srv-user backend URL from environment
    const SRV_USER_URL = process.env.SRV_USER_URL || 'http://localhost:4005';

    // Forward request to srv-user backend
    const response = await fetch(`${SRV_USER_URL}/api/v1/demo/request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Forward client IP for tracking
        'x-forwarded-for': request.headers.get('x-forwarded-for') || '',
        'user-agent': request.headers.get('user-agent') || '',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    // Return backend response
    return NextResponse.json(data, { status: response.status });

  } catch (error: unknown) {
    console.error('Error proxying demo request:', error);
    const SRV_USER_URL = process.env.SRV_USER_URL || 'http://localhost:4005';
    return NextResponse.json(
      {
        success: false,
        error: `Connexion au service démo impossible (${SRV_USER_URL}). En local : démarrez srv-user et vérifiez SRV_USER_URL dans .env.local.`,
      },
      { status: 500 },
    );
  }
}
