import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyASGWYHYCQpY5BAf9U8K9p98hHlc8t-Cio",
  authDomain: "distal-dev.firebaseapp.com",
  projectId: "distal-dev",
  storageBucket: "distal-dev.firebasestorage.app",
  messagingSenderId: "665853287435",
  appId: "1:665853287435:web:1936a6a6822d43473fbb0e",
  measurementId: "G-23LPQ2QPJV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export default app;