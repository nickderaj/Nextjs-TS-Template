import { auth } from '@/config/firebase';
import { setAuthError, setUser } from '@/redux/slices/authSlice';
import { setAuthModalOpen } from '@/redux/slices/modalSlice';
import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

export default function useAuth() {
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoading(false);
      dispatch(setUser(user?.email || ''));
    });

    return unsubscribe;
  }, [dispatch]);

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      dispatch(setAuthModalOpen(false));
      router.push('/dashboard');
    } catch (error) {
      dispatch(setUser(''));
      dispatch(setAuthError(mapErrors(error)));
    }
  };

  const logout = async () => {
    await signOut(auth);
    dispatch(setUser(''));
    dispatch(setAuthModalOpen(false));
    router.push('/');
  };

  const signup = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      dispatch(setAuthModalOpen(false));
      router.push('/dashboard');
    } catch (error) {
      dispatch(setUser(''));
      dispatch(setAuthError(mapErrors(error)));
    }
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
        default:
          return 'Something went wrong.';
      }
    }
    return 'Something went wrong.';
  };

  return { signup, login, logout, loading };
}
