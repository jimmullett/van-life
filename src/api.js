import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc, query, where } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyA_MtmG-FxYDswyWnlOIIEd9GzjvEwcoqM",
  authDomain: "vanlife-scrimba-d070a.firebaseapp.com",
  projectId: "vanlife-scrimba-d070a",
  storageBucket: "vanlife-scrimba-d070a.firebasestorage.app",
  messagingSenderId: "495751074754",
  appId: "1:495751074754:web:ddafdd326e8fe3080bfc5b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const vansRef = collection(db, "vans");

export async function getVans() {
    const snapshot = await getDocs(vansRef);
    const vans = snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }));
    return vans;
}

export async function getVan(id) {
  const docRef = doc(db, "vans", id);
  const snapshot = await getDoc(docRef);
  return { ...snapshot.data(), id: snapshot.id };
}

export async function getHostVans() {
  const q = query(vansRef, where("hostId", "==", "123"));
  const snapshot = await getDocs(q);
  const vans = snapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id
  }));
  return vans;
}

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}
