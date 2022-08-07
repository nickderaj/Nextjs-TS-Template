import PrimaryLayout from '@/components/layouts/PrimaryLayout';
import { RootState } from '@/redux/store';
import { PageWithLayout } from '@/types/page';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function Dashboard(_: PageWithLayout) {
  const { user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push('/');
  }, [router, user]);

  return <section className="flex justify-center items-center flex-grow">{user && <div>This is a protected page</div>}</section>;
}

Dashboard.getLayout = (page: React.ReactNode) => {
  return <PrimaryLayout title="Dashboard">{page}</PrimaryLayout>;
};
