import { 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where,
  addDoc,
  updateDoc 
} from 'firebase/firestore';
import { repositoriesCollection } from './collections';

export interface Repository {
  id: string;
  name: string;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  description: string;
  contact: {
    address: string;
    email: string;
    phone: string;
    website: string;
  };
  hours: {
    weekday: string;
    weekend: string;
  };
}

export const getRepositories = async () => {
  const snapshot = await getDocs(repositoriesCollection);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Repository[];
};

export const getRepository = async (id: string) => {
  const docRef = doc(repositoriesCollection, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Repository;
  }
  return null;
};

export const searchRepositories = async (searchTerm: string) => {
  const q = query(
    repositoriesCollection,
    where('name', '>=', searchTerm),
    where('name', '<=', searchTerm + '\uf8ff')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Repository[];
};