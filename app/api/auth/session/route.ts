import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/utils/jwt';
import { setSecurityHeaders } from '@/lib/utils/security';
import type { User } from '@/types/domain';
import { mockDatabase } from '@/lib/infrastructure/mockDatabase';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value;

    if (!token) {
      const response = NextResponse.json(
        { success: true, data: null }
      );
      return setSecurityHeaders(response);
    }

    const payload = await verifyToken(token);
    if (!payload) {
      const response = NextResponse.json(
        { success: true, data: null }
      );
      return setSecurityHeaders(response);
    }

    // Get user from mock database
    const user = mockDatabase.users.get(payload.userId);
    if (!user) {
      const response = NextResponse.json(
        { success: true, data: null }
      );
      return setSecurityHeaders(response);
    }

    const response = NextResponse.json({
      success: true,
      data: {
        id: payload.userId,
        email: payload.email,
        firstName: user.firstName,
        lastName: user.lastName,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    return setSecurityHeaders(response);
  } catch (error) {
    console.error('Get session error:', error);
    const response = NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
    return setSecurityHeaders(response);
  }
}
