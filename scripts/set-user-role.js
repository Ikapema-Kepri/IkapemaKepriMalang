// scripts/set-user-role.js
const { initializeApp, cert } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');
const serviceAccount = require('../serviceAccountKey.json');

initializeApp({
  credential: cert(serviceAccount),
});

const auth = getAuth();
const db = getFirestore();

async function setUserRole(uid, role) {
  if (!['admin', 'superAdmin'].includes(role)) {
    throw new Error('Role harus admin atau superAdmin');
  }

  await auth.setCustomUserClaims(uid, { role });

  await db.collection('users').doc(uid).set(
    {
      role,
      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true }
  );

  console.log(`✅ UID ${uid} berhasil di-set sebagai ${role}`);
}

const [, , uid, role] = process.argv;

if (!uid || !role) {
  console.error('Usage: node scripts/set-user-role.js <uid> <admin|superAdmin>');
  process.exit(1);
}

setUserRole(uid, role)
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('❌ Error:', err.message);
    process.exit(1);
  });