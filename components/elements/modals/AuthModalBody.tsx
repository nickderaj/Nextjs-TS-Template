import Modal from '@/components/elements/modals/Modal';
import { setAuthModalOpen, setAuthModalState } from '@/redux/slices/modalSlice';
import { RootState } from '@/redux/store';
import useAuth from 'hooks/useAuth';
import Image from 'next/image';
import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../buttons/Button';
import Input from '../forms/inputs/Input';
import Spinner from '../spinner/Spinner';

export interface IAuthModalBody {
  isSubmitting: boolean;
  setEmail: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
  handleSubmit: (_e: FormEvent) => void;
}

export default function AuthModalBody({ isSubmitting, setEmail, setPassword, handleSubmit }: IAuthModalBody) {
  const { user, authError } = useSelector((state: RootState) => state.auth);
  const { authModalState } = useSelector((state: RootState) => state.modal);
  const { googleSignIn } = useAuth();
  const dispatch = useDispatch();

  const changeModalState = () => {
    if (authModalState === 'login') dispatch(setAuthModalState('signup'));
    if (authModalState === 'signup') dispatch(setAuthModalState('login'));
  };

  return (
    <Modal>
      <div className="bg-neutral-50 z-50 rounded-md flex flex-col min-w-[330px] w-min h-min relative">
        {isSubmitting && (
          // Block any interaction with a loading spinner
          <div className="w-full h-full absolute rounded-md flex justify-center items-center backdrop-blur-[1.5px]">
            <Spinner />
          </div>
        )}
        <h4 className="text-base border-b py-3 px-6 mb-4">{authModalState === 'login' ? 'Log In' : 'Sign Up'}</h4>
        <div className="flex justify-center items-center w-full">
          {/* DESKTOP VERSION: */}
          <div
            onClick={() => googleSignIn(false)}
            className="hidden sm:flex mx-6 w-fit px-6 py-1 mb-4 bg-white justify-center items-center gap-2 border rounded-md 
            cursor-pointer text-sm text-neutral-500 hover:text-neutral-700 hover:shadow-md duration-300 transition-all"
          >
            <Image src="/google_logo.png" alt="google logo" height="16" width="16" />
            <span>Sign in with Google</span>
          </div>
          {/* MOBILE VERSION: */}
          <div
            onClick={() => googleSignIn(true)}
            className="flex sm:hidden mx-6 w-fit px-6 py-1 mb-4 bg-white justify-center items-center gap-2 border rounded-md 
            cursor-pointer text-sm text-neutral-500 hover:text-neutral-700 hover:shadow-md duration-300 transition-all"
          >
            <Image src="/google_logo.png" alt="google logo" height="16" width="16" />
            <span>Sign in with Google</span>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="px-6 pb-4 flex flex-col">
          <Input
            defaultValue={user.email == null ? '' : user.email}
            label="Email"
            name={authModalState + ' email'}
            placeholder="nick@example.com"
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
            }}
          />
          <Input
            label="Password"
            name={authModalState + ' password'}
            placeholder="•••••••••"
            type="password"
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
            }}
          />
          <div className="relative bottom-3">
            {authError && <div className="text-rose-600 text-sm w-full absolute">{authError}</div>}
          </div>
          <div className="flex gap-2 mt-4 justify-center items-center">
            <Button type="button" variant="secondary" title="Cancel" onClick={() => dispatch(setAuthModalOpen(false))} />
            <Button type="submit" title={authModalState === 'login' ? 'Log In' : 'Sign Up'} disabled={isSubmitting} />
          </div>
          <div className="my-2 flex justify-center items-center text-xs">
            <p>
              {authModalState === 'login' ? 'No account?' : 'Already have an account?'}{' '}
              <span
                onClick={changeModalState}
                className="text-indigo-500 hover:text-indigo-400 cursor-pointer transition-all duration-300"
              >
                {authModalState === 'login' ? 'Sign up' : 'Log In'}
              </span>{' '}
              instead.
            </p>
          </div>
        </form>
      </div>
    </Modal>
  );
}
