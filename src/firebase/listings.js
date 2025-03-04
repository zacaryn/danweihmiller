import { db } from './config';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs,
  getDoc 
} from 'firebase/firestore';

// Get all listings
export const getListings = async () => {
  const querySnapshot = await getDocs(collection(db, 'listings'));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

// Get single listing
export const getListing = async (id) => {
  const docRef = doc(db, 'listings', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  }
  return null;
};

// Add new listing
export const addListing = async (listing) => {
  const docRef = await addDoc(collection(db, 'listings'), {
    ...listing,
    datePosted: new Date().toISOString()
  });
  return docRef.id;
};

// Update listing
export const updateListing = async (id, listing) => {
  await updateDoc(doc(db, 'listings', id), listing);
};

// Delete listing
export const deleteListing = async (id) => {
  await deleteDoc(doc(db, 'listings', id));
}; 