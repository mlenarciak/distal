import { collection } from 'firebase/firestore';
import { db } from './index';

export const datasetsCollection = collection(db, 'datasets');
export const repositoriesCollection = collection(db, 'repositories');
export const usersCollection = collection(db, 'users');