/**
 * bootstrap-superadmin.js
 * ────────────────────────────────────────────────────────────────
 * Script sekali-jalan untuk assign role superAdmin ke akun pertama.
 * Jalankan dengan: node scripts/bootstrap-superadmin.js
 *
 * SYARAT:
 * 1. File .env.local berisi FIREBASE_ADMIN_PROJECT_ID, 
 *    FIREBASE_ADMIN_CLIENT_EMAIL, FIREBASE_ADMIN_PRIVATE_KEY
 * 2. Akun target sudah terdaftar di Firebase Authentication
 *
 * JANGAN jalankan lebih dari sekali untuk akun yang sama.
 * ────────────────────────────────────────────────────────────────
 */

'use strict';

// Load .env.local secara manual (tidak pakai dotenv agar dependensi minimal)
const fs   = require('fs');
const path = require('path');

function loadEnvLocal() {
  const envPath = path.resolve(__dirname, '..', '.env.local');
  if (!fs.existsSync(envPath)) {
    // Coba .env sebagai fallback
    const envFallback = path.resolve(__dirname, '..', '.env');
    if (!fs.existsSync(envFallback)) {
      throw new Error('.env.local tidak ditemukan. Buat file tersebut dahulu.');
    }
    parseEnvFile(envFallback);
    return;
  }
  parseEnvFile(envPath);
}

function parseEnvFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  content.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const eqIndex = trimmed.indexOf('=');
    if (eqIndex === -1) return;
    const key   = trimmed.slice(0, eqIndex).trim();
    const value = trimmed.slice(eqIndex + 1).trim();
    if (!process.env[key]) {
      process.env[key] = value;
    }
  });
}

async function main() {
  loadEnvLocal();

  // ── Target email — ganti sesuai akun yang ingin dijadikan superAdmin
  const TARGET_EMAIL = process.argv[2];
  if (!TARGET_EMAIL) {
    console.error('❌ Penggunaan: node scripts/bootstrap-superadmin.js <email>');
    console.error('   Contoh: node scripts/bootstrap-superadmin.js admin@ikapema.com');
    process.exit(1);
  }

  const { initializeApp, cert, getApps } = require('firebase-admin/app');
  const { getAuth }      = require('firebase-admin/auth');
  const { getFirestore } = require('firebase-admin/firestore');

  // Init Admin SDK
  if (!getApps().length) {
    const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n');
    if (!process.env.FIREBASE_ADMIN_PROJECT_ID || !process.env.FIREBASE_ADMIN_CLIENT_EMAIL || !privateKey) {
      throw new Error(
        'Firebase Admin env vars tidak lengkap.\n' +
        'Pastikan FIREBASE_ADMIN_PROJECT_ID, FIREBASE_ADMIN_CLIENT_EMAIL, ' +
        'FIREBASE_ADMIN_PRIVATE_KEY ada di .env.local'
      );
    }
    initializeApp({
      credential: cert({
        projectId:   process.env.FIREBASE_ADMIN_PROJECT_ID,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey,
      }),
    });
  }

  const adminAuth = getAuth();
  const adminDb   = getFirestore();

  console.log(`\n🔍 Mencari user dengan email: ${TARGET_EMAIL}`);

  // Cari user berdasarkan email
  let userRecord;
  try {
    userRecord = await adminAuth.getUserByEmail(TARGET_EMAIL);
  } catch {
    console.error(`❌ User dengan email "${TARGET_EMAIL}" tidak ditemukan di Firebase Authentication.`);
    console.error('   Pastikan akun sudah dibuat terlebih dahulu.');
    process.exit(1);
  }

  const uid = userRecord.uid;
  console.log(`✅ User ditemukan: uid=${uid}`);

  // Cek apakah sudah punya role
  const existingClaims = userRecord.customClaims ?? {};
  if (existingClaims.role) {
    console.log(`⚠️  User sudah memiliki role: "${existingClaims.role}"`);
    console.log('   Lanjutkan? (script akan override ke superAdmin)');
  }

  // Set custom claim
  console.log('\n📝 Setting custom claim role=superAdmin...');
  await adminAuth.setCustomUserClaims(uid, { role: 'superAdmin' });

  // Sync ke Firestore /users/{uid}
  console.log('📝 Sync ke Firestore /users/{uid}...');
  await adminDb.collection('users').doc(uid).set(
    {
      email:     TARGET_EMAIL,
      role:      'superAdmin',
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );

  console.log(`\n✅ Selesai! User ${TARGET_EMAIL} sekarang adalah superAdmin.`);
  console.log('');
  console.log('📌 Langkah selanjutnya:');
  console.log('   1. User harus logout lalu login ulang agar token baru (dengan claim) didapat');
  console.log('   2. Atau panggil getIdTokenResult(user, true) untuk force refresh token');
  console.log('');

  process.exit(0);
}

main().catch(err => {
  console.error('\n❌ Error:', err.message);
  process.exit(1);
});
