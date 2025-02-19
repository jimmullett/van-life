import { getFirestore, collection, getDocs, doc, getDoc, query, where } from "firebase/firestore/lite";
import { auth } from "./lib/firebase";

interface Van {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  type: string;
  hostId: string;
}

// interface LoginCredentials {
//   email: string;
//   password: string;
// }

const db = getFirestore(auth.app);
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