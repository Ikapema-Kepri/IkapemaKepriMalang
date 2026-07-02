// lib/rbacConfig.js
export const ADMIN_ALLOWED_PATHS = [
  '/adminaccess/dashboard',
  '/adminaccess/berita-kegiatan',
];

export function canAccessPath(role, pathname) {
  if (role === 'superAdmin') return true;
  if (role === 'admin') {
    return ADMIN_ALLOWED_PATHS.some(
      (allowed) => pathname === allowed || pathname.startsWith(allowed + '/')
    );
  }
  return false;
}