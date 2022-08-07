import { auth } from '@/config/firebase';
import { setAuthError, setUser } from '@/redux/slices/authSlice';
import { setAuthModalOpen } from '@/redux/slices/modalSlice';
import { FirebaseError } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

export default function useAuth() {
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      const email = user?.email || '';
      const photoURL = user?.photoURL || '';
      const displayName = user?.displayName || '';

      dispatch(setUser({ email, photoURL, displayName }));
      setLoading(false);
    });

    return unsubscribe;
  }, [dispatch]);

  const googleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      dispatch(setAuthModalOpen(false));
      router.push('/dashboard');
    } catch (error) {
      console.log(error);
      clearUser();
      dispatch(setAuthError(mapErrors(error)));
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      dispatch(setAuthModalOpen(false));
      router.push('/dashboard');
    } catch (error) {
      clearUser();
      dispatch(setAuthError(mapErrors(error)));
    }
  };

  const logout = async () => {
    await signOut(auth);
    clearUser();
    dispatch(setAuthModalOpen(false));
    router.push('/');
  };

  const signup = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      dispatch(setAuthModalOpen(false));
      router.push('/dashboard');
    } catch (error) {
      clearUser();
      dispatch(setAuthError(mapErrors(error)));
    }
  };

  const clearUser = () => {
    dispatch(setUser({ email: '', photoURL: '', displayName: '' }));
  };

  const mapErrors = (error: unknown) => {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          return 'Email in use.';
        case 'auth/wrong-password':
          return 'Incorrect password.';
        case 'auth/user-not-found':
          return 'User not found.';
        case 'auth/popup-closed-by-user':
          return '';
        default:
          return 'Something went wrong.';
      }
    }
    return 'Something went wrong.';
  };

  return { googleSignIn, signup, login, logout, loading };
}
