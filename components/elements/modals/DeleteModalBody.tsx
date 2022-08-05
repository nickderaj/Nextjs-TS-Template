import Modal from '@/components/elements/modals/Modal';
import { IFriend } from '@/db/friendsModel';
import { setDeleteModalOpen } from '@/redux/slices/modalSlice';
import { FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../buttons/Button';
import Spinner from '../spinner/Spinner';

export interface IDeleteModalBody {
  selectedFriend: IFriend;
  isSubmitting: boolean;
  handleSubmit: (_e: FormEvent) => void;
}

// JSX for the DELETE methods for the Friends table
export default function DeleteModalBody({ selectedFriend, isSubmitting, handleSubmit }: IDeleteModalBody) {
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
        <h4 className="text-base border-b py-3 px-6 mb-4">Delete Friend</h4>
        <form onSubmit={handleSubmit} className="px-6 pb-4 flex flex-col">
          <p>
            Are you sure you want to delete <span className="text-indigo-600 font-semibold">{selectedFriend.name}</span>? This
            action is irreversible
          </p>
          <div className="flex gap-2 my-4 justify-center items-center">
            <Button type="button" variant="secondary" title="CANCEL" onClick={() => dispatch(setDeleteModalOpen(false))} />
            <Button type="submit" title="DELETE" disabled={isSubmitting} />
          </div>
        </form>
      </div>
    </Modal>
  );
}
