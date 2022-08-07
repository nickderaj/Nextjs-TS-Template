import Modal from '@/components/elements/modals/Modal';
import { setAuthModalOpen } from '@/redux/slices/modalSlice';
import { RootState } from '@/redux/store';
import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../buttons/Button';
import Input from '../forms/inputs/Input';
import Spinner from '../spinner/Spinner';

export interface IAuthModalBody {
  loginOrSignup: 'login' | 'signup';
  isSubmitting: boolean;
  setEmail: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
  handleSubmit: (_e: FormEvent) => void;
}

export default function AuthModalBody({ loginOrSignup, isSubmitting, setEmail, setPassword, handleSubmit }: IAuthModalBody) {
  const { user, authError } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  return (
    <Modal>
      <div className="bg-neutral-50 z-50 rounded-md flex flex-col min-w-[330px] w-min h-min relative">
        {isSubmitting && (
          // Block any interaction with a loading spinner
          <div className="w-full h-full absolute rounded-md flex justify-center items-center backdrop-blur-[1.5px]">
            <Spinner />
          </div>
        )}
        <h4 className="text-base border-b py-3 px-6 mb-4">{loginOrSignup === 'login' ? 'Log In' : 'Sign Up'}</h4>
        <form onSubmit={handleSubmit} className="px-6 pb-4 flex flex-col">
          <Input
            defaultValue={user == null ? '' : user}
            label="Email"
            name={loginOrSignup + ' email'}
            placeholder="nick@example.com"
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
            }}
          />
          <Input
            label="Password"
            name={loginOrSignup + ' password'}
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
          <div className="flex gap-2 my-4 justify-center items-center">
            <Button type="button" variant="secondary" title="CANCEL" onClick={() => dispatch(setAuthModalOpen(false))} />
            <Button type="submit" title={loginOrSignup === 'login' ? 'Log In' : 'Sign Up'} disabled={isSubmitting} />
          </div>
        </form>
      </div>
    </Modal>
  );
}
