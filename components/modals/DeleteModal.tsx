import { deleteFriend, getAllFriendsWithLimit } from '@/db/friendsModel';
import { setFriendList, setNumAllFriends } from '@/redux/slices/friendSlice';
import { setDeleteModalOpen } from '@/redux/slices/modalSlice';
import { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import DeleteModalBody from '../elements/modals/DeleteModalBody';

// Modal for Deleting a Friend document
export default function DeleteModal() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { selectedFriend, currentLimit } = useSelector((state: RootState) => state.friend);
  const { deleteModalOpen } = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedFriend || !selectedFriend.id) return;

    setIsSubmitting(true);
    await deleteFriend(selectedFriend.id);
    setIsSubmitting(false);

    dispatch(setDeleteModalOpen(false));
    const data = await getAllFriendsWithLimit(currentLimit);
    dispatch(setNumAllFriends(data.numFriends));
    dispatch(setFriendList(data.friends));
  };

  return (
    <>
      {deleteModalOpen && selectedFriend && (
        <DeleteModalBody selectedFriend={selectedFriend} isSubmitting={isSubmitting} handleSubmit={handleSubmit} />
      )}
    </>
  );
}
