import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDaeRjHfa6Azf49hyu6feW40dTaHbQ1iTg",
  authDomain: "ikapema-db-7655e.firebaseapp.com",
  projectId: "ikapema-db-7655e",
  storageBucket: "ikapema-db-7655e.firebasestorage.app",
  messagingSenderId: "813276364648",
  appId: "1:813276364648:web:1747b4e46bb75d2d71a0dd",
  measurementId: "G-KR6QBGSD4H"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };