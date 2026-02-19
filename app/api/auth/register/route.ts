import { NextRequest, NextResponse } from 'next/server';
import { createToken } from '@/lib/utils/jwt';
import { sanitizeInput, validateEmail, validatePassword, checkRateLimit, setSecurityHeaders } from '@/lib/utils/security';
import { mockDatabase } from '@/lib/infrastructure/mockDatabase';
import { ApiResponse, AuthResponse } from '@/types/domain';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIp = request.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(`register-${clientIp}`)) {
      const response = NextResponse.json(
        { success: false, error: 'Too many registration attempts. Please try again later.' },
        { status: 429 }
      );
      return setSecurityHeaders(response);
    }

    const body = await request.json();
    const { email, password, firstName, lastName } = body;

    // Input validation
    if (!email || !password || !firstName || !lastName) {
      const response = NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
      return setSecurityHeaders(response);
    }

    const sanitizedEmail = sanitizeInput(email.toLowerCase());
    const sanitizedFirstName = sanitizeInput(firstName);
    const sanitizedLastName = sanitizeInput(lastName);

    // Email validation
    if (!validateEmail(sanitizedEmail)) {
      const response = NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
      return setSecurityHeaders(response);
    }

    // Password validation
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      const response = NextResponse.json(
        { success: false, error: passwordValidation.errors.join(', ') },
        { status: 400 }
      );
      return setSecurityHeaders(response);
    }

    // Check if user already exists
    for (const user of mockDatabase.users.values()) {
      if (user.email === sanitizedEmail) {
        const response = NextResponse.json(
          { success: false, error: 'User already exists' },
          { status: 409 }
        );
        return setSecurityHeaders(response);
      }
    }

    // Create new user (in real app, hash password)
    const userId = `user-${Date.now()}`;
    mockDatabase.users.set(userId, {
      email: sanitizedEmail,
      password, // In production, use bcrypt
      firstName: sanitizedFirstName,
      lastName: sanitizedLastName,
    });

    // Create JWT token
    const token = await createToken({
      userId,
      email: sanitizedEmail,
    });

    const response = NextResponse.json({
      success: true,
      data: {
        user: {
          id: userId,
          email: sanitizedEmail,
          firstName: sanitizedFirstName,
          lastName: sanitizedLastName,
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
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    return setSecurityHeaders(response);
  } catch (error) {
    console.error('Registration error:', error);
    const response = NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
    return setSecurityHeaders(response);
  }
}
