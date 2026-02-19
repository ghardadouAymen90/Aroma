import { NextRequest, NextResponse } from 'next/server';
import { createToken, setAuthCookie } from '@/lib/utils/jwt';
import { sanitizeInput, validateEmail, validatePassword, checkRateLimit, setSecurityHeaders } from '@/lib/utils/security';
import { mockDatabase, getUserByEmail } from '@/lib/infrastructure/mockDatabase';
import { ApiResponse, AuthResponse } from '@/types/domain';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIp = request.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(`login-${clientIp}`)) {
      const response = NextResponse.json(
        { success: false, error: 'Too many login attempts. Please try again later.' },
        { status: 429 }
      );
      return setSecurityHeaders(response);
    }

    const body = await request.json();
    const { email, password } = body;

    // Input validation
    if (!email || !password) {
      const response = NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
      return setSecurityHeaders(response);
    }

    const sanitizedEmail = sanitizeInput(email.toLowerCase());
    
    if (!validateEmail(sanitizedEmail)) {
      const response = NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
      return setSecurityHeaders(response);
    }

    // Find user
    const user = getUserByEmail(sanitizedEmail);
    if (!user || user.password !== password) {
      // Don't reveal if user exists
      const response = NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
      return setSecurityHeaders(response);
    }

    // Create JWT token
    const token = await createToken({
      userId: `user-${sanitizedEmail}`,
      email: sanitizedEmail,
    });

    // Set secure httpOnly cookie
    const response = NextResponse.json({
      success: true,
      data: {
        user: {
          id: `user-${sanitizedEmail}`,
          email: sanitizedEmail,
          firstName: user.firstName,
          lastName: user.lastName,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        token,
      },
    });

    // Set httpOnly secure cookie
    response.cookies.set({
      name: 'auth-token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    return setSecurityHeaders(response);
  } catch (error) {
    console.error('Login error:', error);
    const response = NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
    return setSecurityHeaders(response);
  }
}
