import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const session = request.cookies.get('admin_session');

  const isAdminPage = pathname.startsWith('/admin');

  const isLoginPage = pathname === '/admin/login';

  // если пытаются открыть админку без входа

  if (isAdminPage && !isLoginPage && !session) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // если уже вошёл и открывает login

  if (isLoginPage && session) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
