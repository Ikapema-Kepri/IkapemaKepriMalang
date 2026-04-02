import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Proteksi route adminaccess
  const isAdminRoute = pathname.startsWith('/adminaccess');
  const isLoginPage = pathname.startsWith('/adminaccess/login');
  const isAuthenticated = request.cookies.get('admin_auth')?.value === '1';

  // 1. Validasi Autentikasi Admin (Jika akses admin tanpa autentikasi, redirect ke login)
  if (isAdminRoute && !isLoginPage && !isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = '/adminaccess/login';
    return NextResponse.redirect(url);
  }

  // 2. Redirect jika Admin sudah login dan mencoba akses halaman login
  if (isLoginPage && isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = '/adminaccess/dashboard';
    return NextResponse.redirect(url);
  }

  // 3. Kebal Maintenance: Jika yang mengakses adalah routing admin, biarkan lewat sepenuhnya
  if (isAdminRoute) {
    return NextResponse.next();
  }

  // 4. Periksa Pemeliharaan Website via REST Fetch
  let isMaintenanceMode = false;
  try {
     const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
     if (projectId) {
       // Melakukan caching selama 30 detik untuk menghindari latency query real-time
       const res = await fetch(`https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/settings/maintenance`, { next: { revalidate: 30 } });
       if (res.ok) {
          const data = await res.json();
          // API Firestore HTTP mengembalikan format data berjenjang: { fields: { enabled: { booleanValue: true } } }
          isMaintenanceMode = data.fields?.enabled?.booleanValue === true;
       }
     }
  } catch(e) {
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
