import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:813276364648:web:default",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Validation hanya di development
if (process.env.NODE_ENV === 'development') {
  const requiredEnvVars = [
    'NEXT_PUBLIC_FIREBASE_API_KEY',
    'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
    'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
    'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
    'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID'
  ];

  const missingVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

  if (missingVars.length > 0) {
    console.error('Missing environment variables:', missingVars);
    console.error('Please check your .env file in the root directory');
    console.error('Current working directory:', process.cwd());
  }
}

let app;
let db;
let auth;

try {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  db = getFirestore(app);
  auth = getAuth(app);
} catch (error) {
  console.error('Firebase initialization error:', error);
  // Fallback untuk development
  if (process.env.NODE_ENV === 'development') {
    throw error;
  }
}

export { db, auth };