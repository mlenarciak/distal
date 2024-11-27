import { 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc,
  query,
  where
} from 'firebase/firestore';
import { datasetsCollection } from './collections';

export interface Dataset {
  id: string;
  title: string;
  creator: string;
  dates: string;
  quantity: string;
  collectionNumber: string;
  url: string;
  summary: string;
  repositoryId: string;
  accessRestrictions: string;
  languages: string[];
  historicalNote: string;
  contentDescription: string;
  useOfCollection: string;
  administrativeInfo: string;
  detailedDescription: string;
  mainContent: string;
  tags: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export const saveDataset = async (data: Omit<Dataset, 'id'>) => {
  const docRef = await addDoc(datasetsCollection, data);
  return docRef.id;
};

export const updateDataset = async (id: string, data: Partial<Dataset>) => {
  const docRef = doc(datasetsCollection, id);
  await updateDoc(docRef, data);
};

export const getDataset = async (id: string) => {
  const docRef = doc(datasetsCollection, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Dataset;
  }
  return null;
};

export const getDatasetsByRepository = async (repositoryId: string) => {
  const q = query(datasetsCollection, where('repositoryId', '==', repositoryId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Dataset[];
};