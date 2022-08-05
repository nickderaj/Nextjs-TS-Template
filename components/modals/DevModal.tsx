import { deleteAllFriends, getAllFriendsWithLimit, seedFriends } from '@/db/friendsModel';
import { setFriendList, setNumAllFriends } from '@/redux/slices/friendSlice';
import { setDevModalOpen } from '@/redux/slices/modalSlice';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import DevModalBody from '../elements/modals/DevModalBody';

// Modal for Dev commands - not to be used in a production app
export default function DevModal() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { devModalOpen } = useSelector((state: RootState) => state.modal);
  const { currentLimit } = useSelector((state: RootState) => state.friend);
  const dispatch = useDispatch();

  const handleSeed = async () => {
    setIsSubmitting(true);
    await seedFriends();
    setIsSubmitting(false);

    const data = await getAllFriendsWithLimit(currentLimit);
    dispatch(setNumAllFriends(data.numFriends));
    dispatch(setFriendList(data.friends));
    dispatch(setDevModalOpen(false));
  };

  const handleDeleteAll = async () => {
    setIsSubmitting(true);
    await deleteAllFriends();
    setIsSubmitting(false);

    const data = await getAllFriendsWithLimit(currentLimit);
    dispatch(setNumAllFriends(data.numFriends));
    dispatch(setFriendList(data.friends));
    dispatch(setDevModalOpen(false));
  };

  return (
    <>{devModalOpen && <DevModalBody handleSeed={handleSeed} handleDeleteAll={handleDeleteAll} isSubmitting={isSubmitting} />}</>
  );
}
