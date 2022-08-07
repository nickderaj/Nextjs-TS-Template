import { setAuthError } from '@/redux/slices/authSlice';
import useAuth from 'hooks/useAuth';
import { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import AuthModalBody from '../elements/modals/AuthModalBody';
import LogoutModalBody from '../elements/modals/LogoutModalBody';

export default function AuthModal() {
  const { signup, login, logout } = useAuth();
  const { authModalOpen, authModalState } = useSelector((state: RootState) => state.modal);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const dispatch = useDispatch();

  // Input state
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(setAuthError(''));
    setIsSubmitting(true);

    switch (authModalState) {
      case 'login':
        await login(email, password);
        break;
      case 'logout':
        await logout();
        break;
      case 'signup':
        await signup(email, password);
        break;
    }

    setIsSubmitting(false);
  };

  return (
    <>
      {authModalOpen && authModalState !== 'logout' && (
        <AuthModalBody
          loginOrSignup={authModalState}
          setEmail={setEmail}
          setPassword={setPassword}
          isSubmitting={isSubmitting}
          handleSubmit={handleSubmit}
        />
      )}
      {authModalOpen && authModalState === 'logout' && (
        <LogoutModalBody isSubmitting={isSubmitting} handleSubmit={handleSubmit} />
      )}
    </>
  );
}
