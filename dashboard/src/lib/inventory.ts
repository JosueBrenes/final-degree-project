import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  stock: number;
  minStock: number;
  maxStock: number;
  unit: string;
  location: string;
  supplier: string;
  status: string;
  lastUsed: string;
  expiryDate?: string | null;
}

export const addInventoryItem = async (item: InventoryItem) => {
  const itemRef = doc(db, "inventory", item.id);
  const existingDoc = await getDoc(itemRef);

  if (existingDoc.exists()) {
    throw new Error("El ítem ya existe.");
  }

  await setDoc(itemRef, item);
  return item;
};

export const getInventoryItems = async (): Promise<InventoryItem[]> => {
  const snapshot = await getDocs(collection(db, "inventory"));
  return snapshot.docs.map((doc) => doc.data() as InventoryItem);
};

export const updateInventoryItem = async (item: InventoryItem) => {
  const itemRef = doc(db, "inventory", item.id);
  await updateDoc(itemRef, { ...item });
};

export const deleteInventoryItem = async (id: string) => {
  const itemRef = doc(db, "inventory", id);
  await deleteDoc(itemRef);
};
