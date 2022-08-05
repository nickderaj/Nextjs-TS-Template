import Button from '@/components/elements/buttons/Button';
import CreateEditModal from '@/components/modals/CreateEditModal';
import { clearSelectedFriend } from '@/redux/slices/friendSlice';
import { setCreateEditModalOpen, setDevModalOpen } from '@/redux/slices/modalSlice';
import { FaUserFriends } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import DeleteModal from '../modals/DeleteModal';
import DevModal from '../modals/DevModal';

// Navbar with a fake branding (used a simple image from react-icons) & the button to create users
export default function Navbar() {
  const dispatch = useDispatch();

  const handleDevTools = async () => {
    dispatch(setDevModalOpen(true));
  };

  const handleAddFriend = () => {
    dispatch(clearSelectedFriend());
    dispatch(setCreateEditModalOpen(true));
  };

  return (
    <div className="flex justify-between items-center bg-gradient-to-r from-neutral-50 to-neutral-100 shadow-sm py-2 px-6 sm:px-36">
      <h1 className="flex items-center gap-2 font-semibold text-sm">
        <FaUserFriends />
        My Friends
      </h1>
      <div className="flex gap-2 sm:gap-3">
        <Button title={'Dev'} variant="secondary" onClick={handleDevTools} />
        <Button title={'Add Friend'} onClick={handleAddFriend} />
      </div>
      <CreateEditModal /> <DeleteModal /> <DevModal />
    </div>
  );
}
