import Modal from '@/components/elements/modals/Modal';
import { IFriend } from '@/db/friendsModel';
import { setCreateEditModalOpen } from '@/redux/slices/modalSlice';
import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../buttons/Button';
import Input from '../forms/inputs/Input';
import Select from '../forms/selects/Select';
import Spinner from '../spinner/Spinner';

export interface ICreateEditModalBody {
  selectedFriend: IFriend | null;
  createOrEdit?: 'create' | 'edit';
  setName: Dispatch<SetStateAction<string>>;
  setAge: Dispatch<SetStateAction<number>>;
  setGender: Dispatch<SetStateAction<string>>;
  isSubmitting: boolean;
  error: string;
  handleSubmit: (_e: FormEvent) => void;
}

// JSX for the POST + PATCH methods for the Friends table
// if createOrEdit = 'create', it will create a new friend otherwise it will edit an existing one
export default function CreateEditModalBody({
  selectedFriend,
  setName,
  setAge,
  setGender,
  isSubmitting,
  error,
  handleSubmit,
}: ICreateEditModalBody) {
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
        <h4 className="text-base border-b py-3 px-6 mb-4">{selectedFriend == null ? 'New Friend' : 'Edit Friend'}</h4>
        <form onSubmit={handleSubmit} className="px-6 pb-4 flex flex-col">
          <Input
            defaultValue={selectedFriend == null ? '' : selectedFriend.name}
            label="Name"
            name="name"
            placeholder="John Doe"
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setName(e.target.value);
            }}
          />
          <Input
            defaultValue={selectedFriend == null ? '' : String(selectedFriend.age)}
            label="Age"
            name="age"
            type="number"
            placeholder="18"
            min="1"
            max="113"
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setAge(+e.target.value);
            }}
          />
          <Select
            defaultValue={selectedFriend == null ? 'Male' : selectedFriend.gender}
            label="Gender"
            name="gender"
            options={['Male', 'Female', 'Other']}
            required
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              setGender(e.target.value);
            }}
          />
          <div className="relative bottom-3">{error && <div className="text-rose-600 text-sm w-full absolute">{error}</div>}</div>
          <div className="flex gap-2 my-4 justify-center items-center">
            <Button type="button" variant="secondary" title="CANCEL" onClick={() => dispatch(setCreateEditModalOpen(false))} />
            <Button type="submit" title={selectedFriend == null ? 'CREATE' : 'EDIT'} disabled={isSubmitting} />
          </div>
        </form>
      </div>
    </Modal>
  );
}
