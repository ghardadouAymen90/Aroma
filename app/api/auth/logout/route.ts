import { NextRequest, NextResponse } from 'next/server';
import { clearAuthCookie } from '@/lib/utils/jwt';
import { setSecurityHeaders } from '@/lib/utils/security';

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value;

    if (!token) {
      const response = NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
      return setSecurityHeaders(response);
    }

    const response = NextResponse.json({
      success: true,
      message: 'Logged out successfully',
    });

    response.cookies.delete('auth-token');
    return setSecurityHeaders(response);
  } catch (error) {
    console.error('Logout error:', error);
    const response = NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
    return setSecurityHeaders(response);
  }
}
