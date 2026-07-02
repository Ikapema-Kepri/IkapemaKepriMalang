/**
 * Firebase Admin SDK — Server-side only
 * Digunakan di API routes, JANGAN diimpor di client components
 */
import { getApps, initializeApp, cert, App } from 'firebase-admin/app';
import { getAuth, Auth } from 'firebase-admin/auth';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

// ── Tipe Role ──────────────────────────────────────────────────────────
export type UserRole = 'admin' | 'superAdmin';
export const VALID_ROLES: UserRole[] = ['admin', 'superAdmin'];

// ── Singleton ──────────────────────────────────────────────────────────
let adminApp: App;
let adminAuth: Auth;
let adminDb: Firestore;

function getAdminApp(): App {
  if (adminApp) return adminApp;

  const existingApps = getApps();
  if (existingApps.length > 0) {
    adminApp = existingApps[0];
    return adminApp;
  }

  const projectId     = process.env.FIREBASE_ADMIN_PROJECT_ID;
  const clientEmail   = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKeyRaw = process.env.FIREBASE_ADMIN_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKeyRaw) {
    throw new Error(
      'Firebase Admin SDK: env vars belum diset. ' +
      'Pastikan FIREBASE_ADMIN_PROJECT_ID, FIREBASE_ADMIN_CLIENT_EMAIL, ' +
      'dan FIREBASE_ADMIN_PRIVATE_KEY ada di .env.local'
    );
  }

  // Env var menyimpan \n sebagai literal string — perlu di-replace
  const privateKey = privateKeyRaw.replace(/\\n/g, '\n');

  adminApp = initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
  });

  return adminApp;
}

export function getAdminAuth(): Auth {
  if (!adminAuth) {
    adminAuth = getAuth(getAdminApp());
  }
  return adminAuth;
}

export function getAdminDb(): Firestore {
  if (!adminDb) {
    adminDb = getFirestore(getAdminApp());
  }
  return adminDb;
}

// ── Helper: Verifikasi ID Token dari header Authorization ──────────────
export async function verifyIdToken(authHeader: string | null) {
  if (!authHeader?.startsWith('Bearer ')) {
    throw new Error('Missing or invalid Authorization header');
  }
  const idToken = authHeader.split('Bearer ')[1];
  return getAdminAuth().verifyIdToken(idToken);
}

// ── Helper: Assign role ke user ────────────────────────────────────────
export async function assignRole(targetUid: string, role: UserRole) {
  // Set custom claim
  await getAdminAuth().setCustomUserClaims(targetUid, { role });

  // Sync ke Firestore /users/{uid}
  await getAdminDb().collection('users').doc(targetUid).set(
    { role, updatedAt: new Date().toISOString() },
    { merge: true }
  );
}
