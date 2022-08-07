import { auth } from '@/config/firebase';
import { setAuthError, setUser } from '@/redux/slices/authSlice';
import { setAuthModalOpen } from '@/redux/slices/modalSlice';
import { FirebaseError } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from 'firebase/auth';
import { useRouter } from 'next/router';

import { useDispatch } from 'react-redux';

export default function useAuth() {
  const dispatch = useDispatch();
  const router = useRouter();

  const googleSignIn = async (withRedirect: boolean = false) => {
    try {
      const provider = new GoogleAuthProvider();
      if (withRedirect) await signInWithRedirect(auth, provider);
      if (!withRedirect) {
        await signInWithPopup(auth, provider);
        router.push('/dashboard');
        dispatch(setAuthModalOpen(false));
      }
    } catch (error) {
      clearUser();
      dispatch(setAuthError(mapErrors(error)));
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
      dispatch(setAuthModalOpen(false));
    } catch (error) {
      clearUser();
      dispatch(setAuthError(mapErrors(error)));
    }
  };

  const logout = async () => {
    await signOut(auth);
    router.push('/');
    dispatch(setAuthModalOpen(false));
    clearUser();
  };

  const signup = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
      dispatch(setAuthModalOpen(false));
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

  return { googleSignIn, signup, login, logout };
}
