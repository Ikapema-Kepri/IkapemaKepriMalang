/**
 * POST /api/auth/assign-role
 * Assign role ke user. Hanya bisa dipanggil oleh superAdmin.
 *
 * Request body: { targetUid: string, role: 'admin' | 'superAdmin' }
 * Header: Authorization: Bearer <idToken>
 */
import { NextRequest, NextResponse } from 'next/server';
import { assignRole, verifyIdToken, VALID_ROLES, type UserRole } from '@/lib/firebaseAdmin';

export async function POST(request: NextRequest) {
  try {
    // 1. Verifikasi caller — WAJIB punya token valid
    const decodedToken = await verifyIdToken(
      request.headers.get('Authorization')
    ).catch(() => null);

    if (!decodedToken) {
      return NextResponse.json(
        { error: 'Unauthorized: token tidak valid atau tidak ada' },
        { status: 401 }
      );
    }

    // 2. Validasi role caller — harus superAdmin
    if (decodedToken.role !== 'superAdmin') {
      return NextResponse.json(
        { error: 'Forbidden: hanya superAdmin yang bisa assign role' },
        { status: 403 }
      );
    }

    // 3. Parse request body
    const body = await request.json().catch(() => null);
    const { targetUid, role } = body ?? {};

    if (!targetUid || typeof targetUid !== 'string') {
      return NextResponse.json(
        { error: 'targetUid wajib diisi dan harus string' },
        { status: 400 }
      );
    }

    if (!role || !VALID_ROLES.includes(role as UserRole)) {
      return NextResponse.json(
        { error: `role tidak valid. Nilai yang diizinkan: ${VALID_ROLES.join(', ')}` },
        { status: 400 }
      );
    }

    // 4. Assign role
    await assignRole(targetUid, role as UserRole);

    return NextResponse.json({
      success: true,
      message: `Role '${role}' berhasil di-assign ke user ${targetUid}`,
    });

  } catch (error) {
    console.error('[assign-role] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
