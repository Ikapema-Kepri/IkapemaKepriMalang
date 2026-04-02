import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../lib/firebase"; // src/lib/firebase
import { doc, getDoc, setDoc } from "firebase/firestore";

export async function GET() {
  try {
     const docRef = doc(db, 'settings', 'maintenance');
     const docSnap = await getDoc(docRef);
     let enabled = false;
     if (docSnap.exists()) {
       enabled = docSnap.data().enabled || false;
     } else {
       await setDoc(docRef, { enabled: false });
     }
     return NextResponse.json({ enabled });
  } catch(e) {
     console.error('GET Maintenance settings error:', e);
     return NextResponse.json({ enabled: false }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
     const body = await req.json();
     const enabled = !!body.enabled;
     const docRef = doc(db, 'settings', 'maintenance');
     await setDoc(docRef, { enabled }, { merge: true });
     return NextResponse.json({ success: true, enabled });
  } catch(e) {
     console.error('POST Maintenance settings error:', e);
     return NextResponse.json({ success: false, message: 'Gagal' }, { status: 500 });
  }
}
