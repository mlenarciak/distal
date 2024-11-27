import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '../lib/firebase';

interface UserProfile {
  uid: string;
  email: string;
  firstName: string;
  lastName?: string;
  photoURL?: string;
  role: 'user' | 'provider' | 'admin';
  savedSearches?: string[];
  favorites?: string[];
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  register: (email: string, password: string, firstName: string, lastName?: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async (uid: string) => {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      setUserProfile(userDoc.data() as UserProfile);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        await fetchUserProfile(user.uid);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Check if user profile exists
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    
    if (!userDoc.exists()) {
      // Create new user profile if first time login
      const newProfile: UserProfile = {
        uid: user.uid,
        email: user.email!,
        firstName: user.displayName?.split(' ')[0] || '',
        lastName: user.displayName?.split(' ').slice(1).join(' '),
        photoURL: user.photoURL || undefined,
        role: 'user',
        createdAt: new Date().toISOString(),
        savedSearches: [],
        favorites: []
      };
      
      await setDoc(doc(db, 'users', user.uid), newProfile);
      setUserProfile(newProfile);
    }
  };

  const register = async (email: string, password: string, firstName: string, lastName?: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    const newProfile: UserProfile = {
      uid: userCredential.user.uid,
      email,
      firstName,
      lastName,
      role: 'user',
      createdAt: new Date().toISOString(),
      savedSearches: [],
      favorites: []
    };
    
    await setDoc(doc(db, 'users', userCredential.user.uid), newProfile);
    setUserProfile(newProfile);
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user) throw new Error('No user logged in');
    
    await setDoc(doc(db, 'users', user.uid), {
      ...userProfile,
      ...data
    }, { merge: true });
    
    await fetchUserProfile(user.uid);
  };

  const logout = async () => {
    await signOut(auth);
    setUserProfile(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      userProfile, 
      loading, 
      login, 
      loginWithGoogle, 
      register, 
      logout,
      updateProfile 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};