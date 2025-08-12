import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Validasi konfigurasi Firebase
const validateFirebaseConfig = () => {
  const requiredKeys = [
    'apiKey',
    'authDomain', 
    'projectId',
    'storageBucket',
    'messagingSenderId',
    'appId'
  ];

  const missingKeys = requiredKeys.filter(key => !firebaseConfig[key as keyof typeof firebaseConfig]);
  
  if (missingKeys.length > 0) {
    console.error('Missing Firebase configuration keys:', missingKeys);
    console.error('Current config:', firebaseConfig);
    throw new Error(`Missing Firebase configuration: ${missingKeys.join(', ')}`);
  }

  // Validasi format API key
  if (firebaseConfig.apiKey && !firebaseConfig.apiKey.startsWith('AIza')) {
    console.error('Invalid API key format. Firebase API keys should start with "AIza"');
    throw new Error('Invalid Firebase API key format');
  }
};

// Validasi hanya di development atau jika ada masalah
if (process.env.NODE_ENV === 'development') {
  try {
    validateFirebaseConfig();
    console.log('✅ Firebase configuration validated successfully');
  } catch (error) {
    console.error('❌ Firebase configuration validation failed:', error);
  }
}

let app;
let db;
let auth;

try {
  // Pastikan konfigurasi valid sebelum inisialisasi
  validateFirebaseConfig();
  
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  db = getFirestore(app);
  auth = getAuth(app);
  
  console.log('🔥 Firebase initialized successfully');
} catch (error) {
  console.error('🚨 Firebase initialization error:', error);
  
  // Jangan throw error di production untuk menghindari crash
  if (process.env.NODE_ENV === 'development') {
    throw error;
  }
}

export { db, auth };