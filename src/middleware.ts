import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { MAINTENANCE_MODE } from './lib/maintenance';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  if (MAINTENANCE_MODE && pathname !== '/maintenance') {
    const url = request.nextUrl.clone();
    url.pathname = '/maintenance';
    return NextResponse.redirect(url);
  }

  if (!MAINTENANCE_MODE && pathname === '/maintenance') {
    const url = request.nextUrl.clone();
    url.pathname = '/beranda';
    return NextResponse.redirect(url);
  }

  // Proteksi route adminaccess
  const isAdminRoute = pathname.startsWith('/adminaccess');
  const isLoginPage = pathname.startsWith('/adminaccess/login');
  const isAuthenticated = request.cookies.get('admin_auth')?.value === '1';

  // Jika akses admin route (kecuali login) tanpa autentikasi, redirect ke login
  if (isAdminRoute && !isLoginPage && !isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = '/adminaccess/login';
    return NextResponse.redirect(url);
  }

  // Jika sudah login dan mencoba akses halaman login, redirect ke dashboard
  if (isLoginPage && isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = '/adminaccess/dashboard';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
