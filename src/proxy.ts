import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Proxy function for Next.js 16.
 * Implements media protection and referer checks.
 */
export default function proxy(request: NextRequest) {
  const referer = request.headers.get('referer');
  const host = request.headers.get('host')?.split(':')[0]; 
  const { pathname } = request.nextUrl;

  // 1. ALLOW direct access to the OG image and favicons
  if (pathname === '/img/og-image.png' || pathname.startsWith('/favicons/')) {
    return NextResponse.next();
  }

  // 2. Protection logic for images and media APIs
  const isProtectedPath = pathname.startsWith('/img/') || pathname.startsWith('/api/media/');

  if (isProtectedPath) {
    // Development environment bypass
    if (process.env.NODE_ENV === 'development') {
      return NextResponse.next();
    }

    // Production check
    if (!referer || !referer.includes(host || '')) {
      return new NextResponse('Direct access restricted.', { 
        status: 403,
        headers: { 'Content-Type': 'text/plain' }
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/img/:path*',
    '/api/media/:path*',
    '/favicons/:path*',
  ],
};
