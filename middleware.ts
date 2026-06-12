import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  // Only protect routes that start with /admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    
    // Allow access to the login page itself
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next();
    }

    // Get the token from the cookies
    const token = request.cookies.get('admin_token')?.value;

    // If no token, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      // Verify the token
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secret);
      
      // If verification passes, let them into the dashboard
      return NextResponse.next();
    } catch (error) {
      // If token is expired or tampered with, redirect to login
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  
  return NextResponse.next();
}

// Configure which paths the middleware runs on to optimize performance
export const config = {
  matcher: ['/admin/:path*'],
};