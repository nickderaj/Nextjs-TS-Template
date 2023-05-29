import { setSampleModalOpen } from '@/redux/slices/modalSlice';
import { useDispatch } from 'react-redux';
import PrimaryLayout from 'src/components/layouts/PrimaryLayout';
import SampleModal from 'src/components/modals/SampleModal';
import Button from 'src/elements/buttons/Button';
import { PageWithLayout } from 'src/types/page';

const Home: PageWithLayout = () => {
  const dispatch = useDispatch();

  return (
    <>
      <section className="flex justify-center items-center h-screen w-screen">
        <Button onClick={() => dispatch(setSampleModalOpen(true))} title="OPEN MODAL" />
      </section>
      <SampleModal />
    </>
  );
};

Home.getLayout = (page: React.ReactNode) => <PrimaryLayout title="Home Page">{page}</PrimaryLayout>;
export default Home;
