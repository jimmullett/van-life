import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc, query, where } from "firebase/firestore/lite";

interface Van {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  type: string;
  hostId: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginError {
  message: string;
  statusText: string;
  status: number;
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRESTORE_API_KEY,
  authDomain: import.meta.env.VITE_FIRESTORE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIRESTORE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIRESTORE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIRESTORE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIRESTORE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const vansRef = collection(db, "vans");

export async function getVans(): Promise<Van[]> {
    const snapshot = await getDocs(vansRef);
    const vans = snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    })) as Van[];
    return vans;
}

export async function getVan(id: string): Promise<Van> {
  const docRef = doc(db, "vans", id);
  const snapshot = await getDoc(docRef);
  return { ...snapshot.data(), id: snapshot.id } as Van;
}

export async function getHostVans(): Promise<Van[]> {
  const q = query(vansRef, where("hostId", "==", "123"));
  const snapshot = await getDocs(q);
  const vans = snapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id
  })) as Van[];
  return vans;
}

export async function loginUser(creds: LoginCredentials): Promise<{ token: string }> {
    const res = await fetch("/api/login",
        { 
          method: "post", 
          body: JSON.stringify(creds) 
        }
    );
    const data = await res.json();

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        } as LoginError;
    }

    return data;
} 