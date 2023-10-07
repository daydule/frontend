import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: '/((?!maintenance|_next).*)',
};

export function middleware(req: NextRequest) {
  if (process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true') {
    return NextResponse.redirect(new URL('/maintenance', req.url));
  }
}
