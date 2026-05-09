import { NextRequest, NextResponse } from 'next/server';

/**
 * PATCH /api/v1/demo/request/:id/qualify
 * Proxy to srv-user backend service
 * Updates demo request with Step 2 qualification data
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Get srv-user backend URL from environment
    const SRV_USER_URL = process.env.SRV_USER_URL || 'http://localhost:4005';

    // Forward request to srv-user backend
    const response = await fetch(`${SRV_USER_URL}/api/v1/demo/request/${id}/qualify`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    // Return backend response
    return NextResponse.json(data, { status: response.status });

  } catch (error: any) {
    console.error('Error proxying demo qualification:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to connect to backend service'
      },
      { status: 500 }
    );
  }
}
