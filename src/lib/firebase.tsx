
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB625Z0ZUXSNbuHjFdhUY5p5yNPA7scQTI",
  authDomain: "ikapema-db.firebaseapp.com",
  projectId: "ikapema-db",
  storageBucket: "ikapema-db.firebasestorage.app",
  messagingSenderId: "561627029495",
  appId: "1:561627029495:web:52181d5a16114a562798f2",
  measurementId: "G-71H08J4KRL"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db }