import Button from '@/components/buttons/SampleButton';
import PrimaryLayout from '@/components/layouts/PrimaryLayout';
import SampleModal from '@/components/modals/SampleModal';
import { PageWithLayout } from '@/types/page';
import useAuth from 'hooks/useAuth';

export default function Home(_: PageWithLayout) {
  const { signup, login, logout } = useAuth();

  return (
    <>
      <section className="flex justify-center items-center h-screen w-screen">
        <Button onClick={() => signup('nick@example.com', 'Test123')} title="Sign Up" />
        <Button onClick={() => login('nick@example.com', 'Test123')} title="Log In" />
        <Button onClick={() => logout()} title="Log Out" />
      </section>
      <SampleModal />
    </>
  );
}

Home.getLayout = (page: React.ReactNode) => {
  return <PrimaryLayout title="Home Page">{page}</PrimaryLayout>;
};
