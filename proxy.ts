import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/utils/jwt';

export async function proxy(request: NextRequest) {
  // Only check protected routes
  const protectedRoutes = ['/checkout', '/orders', '/account'];
  const pathname = request.nextUrl.pathname;
  
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  
  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  // Check for valid JWT token in cookies
  const token = request.cookies.get('auth-token')?.value;

  if (!token) {
    // Create response for login redirect
    const response = NextResponse.redirect(new URL('/auth/login', request.url));
    // Set a cookie with the return URL
    response.cookies.set('returnUrl', pathname, {
      maxAge: 60 * 10, // 10 minutes
      path: '/',
    });
    return response;
  }

  try {
    const payload = await verifyToken(token);
    if (!payload) {
      const response = NextResponse.redirect(new URL('/auth/login', request.url));
      response.cookies.set('returnUrl', pathname, {
        maxAge: 60 * 10,
        path: '/',
      });
      return response;
    }
  } catch (error) {
    const response = NextResponse.redirect(new URL('/auth/login', request.url));
    response.cookies.set('returnUrl', pathname, {
      maxAge: 60 * 10,
      path: '/',
    });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api|static|favicon.ico).)*'],
};
