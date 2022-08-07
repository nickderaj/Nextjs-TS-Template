import { auth } from '@/config/firebase';
import { setAuthError, setToken, setUser } from '@/redux/slices/authSlice';
import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';

export default function useAuth() {
  const dispatch = useDispatch();

  const [cookies, setCookie, removeCookie] = useCookies(['userToken']);
  const { userToken } = cookies;

  useEffect(() => {
    dispatch(setToken(userToken));
  }, [userToken, dispatch]);

  const signup = async (email: string, password: string) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const { user } = res;

      updateUserCookie(await user.getIdToken());
      dispatch(setUser(user.email || ''));
    } catch (error) {
      clearUser();
      dispatch(setAuthError(mapErrors(error)));
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const { user } = res;

      updateUserCookie(await user.getIdToken());
      dispatch(setUser(user.email || ''));
    } catch (error) {
      clearUser();
      dispatch(setAuthError(mapErrors(error)));
    }
  };

  const logout = async () => {
    await signOut(auth);
    clearUser();
  };

  const updateUserCookie = (token: string, expiresIn: number = 3600) => {
    setCookie('userToken', token, {
      path: '/',
      maxAge: Number(expiresIn),
    });
  };

  const clearUser = () => {
    dispatch(setUser(''));
    removeCookie('userToken');
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

  return { signup, login, logout };
}
