import { createFriend, getAllFriendsWithLimit, updateFriend } from '@/db/friendsModel';
import { setFriendList, setNumAllFriends } from '@/redux/slices/friendSlice';
import { setCreateEditModalOpen } from '@/redux/slices/modalSlice';
import { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import CreateEditModalBody from '../elements/modals/CreateEditModalBody';

// Modal for Creating & Editing a Friend document
export default function CreateEditModal() {
  // Validation and submission state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Input state
  const { selectedFriend, currentLimit } = useSelector((state: RootState) => state.friend); // will be null if creating a new friend
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<number>(0);
  const [gender, setGender] = useState<string>('Male');

  useEffect(() => {
    if (selectedFriend) {
      // set default values if editing existing record
      setName(selectedFriend.name);
      setAge(selectedFriend.age);
      setGender(selectedFriend.gender);
    } else {
      // otherwise clear if going from edit modal -> create modal
      setName('');
      setAge(0);
      setGender('Male');
    }
  }, [selectedFriend]);

  const dispatch = useDispatch();
  const { createEditModalOpen } = useSelector((state: RootState) => state.modal);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name) return setError('Please input a name.');
    if (age < 0 && age > 113) return setError('Age must be between 1 & 113.');
    if (gender !== 'Male' && gender !== 'Female' && gender !== 'Other') return setError('Please select a gender.');

    setIsSubmitting(true);
    if (selectedFriend) {
      await updateFriend(selectedFriend.id, name, age, gender);
    } else {
      await createFriend(name, age, gender);
    }
    setIsSubmitting(false);
    dispatch(setCreateEditModalOpen(false));
    const data = await getAllFriendsWithLimit(currentLimit);
    dispatch(setNumAllFriends(data.numFriends));
    dispatch(setFriendList(data.friends));
  };

  return (
    <>
      {createEditModalOpen && (
        <CreateEditModalBody
          selectedFriend={selectedFriend}
          setName={setName}
          setAge={setAge}
          setGender={setGender}
          isSubmitting={isSubmitting}
          error={error}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
}
