import FriendCard from '@/components/cards/FriendCard';
import Button from '@/components/elements/buttons/Button';
import PrimaryLayout from '@/components/layouts/PrimaryLayout';
import { getAllFriendsWithLimit, IFriend } from '@/db/friendsModel';
import { setCurrentLimit, setFriendList, setNumAllFriends } from '@/redux/slices/friendSlice';
import { RootState } from '@/redux/store';
import { PageWithLayout } from '@/types/page';
import { useEffect } from 'react';
import { FaRegSmileBeam } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

export async function getServerSideProps() {
  // GET ALL friends from the firebase backend on the server side before page load
  // This will be changed to user-specific friends list in a more realistic app
  const friends = await getAllFriendsWithLimit(12);

  return {
    props: { loadedFriends: friends }, // will be passed to the page component as props
  };
}

interface HomeProps {
  loadedFriends: { friends: IFriend[]; numFriends: number };
}
export default function Home(props: PageWithLayout & HomeProps) {
  const { createEditModalOpen } = useSelector((state: RootState) => state.modal);
  const { friendList, currentLimit, numAllFriends } = useSelector((state: RootState) => state.friend);
  const dispatch = useDispatch();

  useEffect(() => {
    // On load, populate the global state with friends list
    const { loadedFriends } = props;
    dispatch(setNumAllFriends(loadedFriends.numFriends));
    dispatch(setFriendList(loadedFriends.friends));
  }, [dispatch, props]);

  const loadMoreFriends = async () => {
    if (currentLimit >= numAllFriends) return;

    if (currentLimit + 12 > numAllFriends) {
      const data = await getAllFriendsWithLimit(numAllFriends);
      dispatch(setFriendList(data.friends));
      dispatch(setCurrentLimit(numAllFriends));
    }
    if (currentLimit + 12 < numAllFriends) {
      const data = await getAllFriendsWithLimit(currentLimit + 12);
      dispatch(setFriendList(data.friends));
      dispatch(setCurrentLimit(currentLimit + 12));
    }
  };

  return (
    <section className="justify-center items-center flex flex-col">
      {friendList.length == 0 && !createEditModalOpen && (
        <>
          <div className="flex justify-end items-center gap-1 w-full mr-36 px-12 sm:px-36 text-indigo-500  animate-bounce">
            <FaRegSmileBeam className="text-2xl" />
            <span className="text-4xl">&#8605;</span>
          </div>
          <div className="w-full justify-center flex items-center">No friends found!</div>
        </>
      )}
      {friendList.length > 0 && (
        <>
          <div className="my-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {friendList.map((friend) => (
              <FriendCard friend={friend} key={friend.id} />
            ))}
          </div>
          {numAllFriends > currentLimit && (
            <div className="flex justify-center items-center mb-12">
              <Button title="Load More" onClick={loadMoreFriends} />
            </div>
          )}
        </>
      )}
    </section>
  );
}

Home.getLayout = (page: React.ReactNode) => {
  return <PrimaryLayout title="My Friends">{page}</PrimaryLayout>;
};
