import Modal from '@/components/elements/modals/Modal';
import { setAuthModalOpen } from '@/redux/slices/modalSlice';
import { FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../buttons/Button';
import Spinner from '../spinner/Spinner';

export interface ILogoutModalBody {
  isSubmitting: boolean;
  handleSubmit: (_e: FormEvent) => void;
}

export default function LogoutModalBody({ isSubmitting, handleSubmit }: ILogoutModalBody) {
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
        <h4 className="text-base border-b py-3 px-6 mb-4">Log Out</h4>
        <form onSubmit={handleSubmit} className="px-6 pb-4 flex flex-col">
          <span>Are you sure you want to log out?</span>
          <div className="flex gap-2 my-4 justify-center items-center">
            <Button type="button" variant="secondary" title="CANCEL" onClick={() => dispatch(setAuthModalOpen(false))} />
            <Button type="submit" title="Log Out" disabled={isSubmitting} />
          </div>
        </form>
      </div>
    </Modal>
  );
}
