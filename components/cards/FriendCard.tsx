import { IFriend } from '@/db/friendsModel';
import { setSelectedFriend } from '@/redux/slices/friendSlice';
import { setCreateEditModalOpen, setDeleteModalOpen } from '@/redux/slices/modalSlice';
import { TiDeleteOutline, TiEdit } from 'react-icons/ti';
import { useDispatch } from 'react-redux';

interface IFriendCard {
  friend: IFriend;
}

// Simple Component to display each of the Friends in the database
export default function FriendCard({ friend }: IFriendCard) {
  const dispatch = useDispatch();

  const handleEditFriend = () => {
    dispatch(setSelectedFriend(friend));
    dispatch(setCreateEditModalOpen(true));
  };

  const handleDeleteFriend = () => {
    dispatch(setSelectedFriend(friend));
    dispatch(setDeleteModalOpen(true));
  };

  return (
    <div className="flex flex-col border rounded-md border-neutral-500 min-w-[220px] justify-center items-center">
      <div className="border-b border-indigo-500 w-full p-2 font-semibold flex justify-between">
        <h5 className="text-indigo-500 capitalize">
          {friend.name.length > 15 ? friend.name.substring(0, 15).toLowerCase() + '...' : friend.name.toLowerCase()}
        </h5>
        <div className="flex gap-1">
          <button onClick={handleEditFriend}>
            <TiEdit />
          </button>
          <button onClick={handleDeleteFriend}>
            <TiDeleteOutline />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 w-full p-2">
        <div>Age:</div>
        <div>{friend.age}</div>
        <div>Gender:</div>
        <div>{friend.gender}</div>
      </div>
    </div>
  );
}
