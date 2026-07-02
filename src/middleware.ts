import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ADMIN_ROLES = ['admin', 'superAdmin'];

const ADMIN_ALLOWED_PATHS = [
  '/adminaccess',
  '/adminaccess/dashboard',
  '/adminaccess/berita-kegiatan',
];

function canAccessPath(role: string | null, pathname: string): boolean {
  if (role === 'superAdmin') return true;
  if (role === 'admin') {
    return ADMIN_ALLOWED_PATHS.some(
      (allowed) => pathname === allowed || pathname.startsWith(allowed + '/')
    );
  }
  return false;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Bypass untuk static assets dan API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const isAdminRoute       = pathname.startsWith('/adminaccess');
  const isLoginPage        = pathname === '/adminaccess/login';
  const isUnauthorizedPage = pathname === '/adminaccess/unauthorized';

  // Baca role dari cookie (set oleh AuthContext saat login)
  const cookieRole = request.cookies.get('admin_auth')?.value ?? null;
  const isLoggedIn = cookieRole !== null && ADMIN_ROLES.includes(cookieRole);

  // ── Admin Route Protection ─────────────────────────────────────────
  if (isAdminRoute && !isLoginPage && !isUnauthorizedPage) {
    // Belum login → redirect ke login
    if (!isLoggedIn) {
      const url = request.nextUrl.clone();
      url.pathname = '/adminaccess/login';
      return NextResponse.redirect(url);
    }

    // Login tapi role tidak punya akses ke path ini → redirect unauthorized
    if (!canAccessPath(cookieRole, pathname)) {
      const url = request.nextUrl.clone();
      url.pathname = '/adminaccess/unauthorized';
      return NextResponse.redirect(url);
    }
  }

  // ── Redirect jika sudah login dan ke halaman login ─────────────────
  if (isLoginPage && isLoggedIn) {
    const url = request.nextUrl.clone();
    // Admin biasa langsung diarahkan ke satu-satunya halaman yang boleh diakses
    url.pathname =
      cookieRole === 'admin' ? '/adminaccess/berita-kegiatan' : '/adminaccess/dashboard';
    return NextResponse.redirect(url);
  }

  // ── Admin route → lewat sepenuhnya (kebal maintenance) ────────────
  if (isAdminRoute) {
    return NextResponse.next();
  }

  // ── Maintenance Mode Check ─────────────────────────────────────────
  let isMaintenanceMode = false;
  try {
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    if (projectId) {
      const res = await fetch(
        `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/settings/maintenance`,
        { next: { revalidate: 30 } }
      );
      if (res.ok) {
        const data = await res.json();
        isMaintenanceMode = data.fields?.enabled?.booleanValue === true;
      }
    }
  } catch (e) {
    console.error('Middleware maintenance fetch error:', e);
  }

  if (isMaintenanceMode && pathname !== '/maintenance') {
    const url = request.nextUrl.clone();
    url.pathname = '/maintenance';
    return NextResponse.redirect(url);
  }

  if (!isMaintenanceMode && pathname === '/maintenance') {
    const url = request.nextUrl.clone();
    url.pathname = '/beranda';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};