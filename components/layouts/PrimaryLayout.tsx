import { auth } from '@/config/firebase';
import { setUser } from '@/redux/slices/authSlice';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Navbar from './Navbar';
export interface IPrimaryLayout {
  title: string;
  children: React.ReactNode;
}

export default function PrimaryLayout({ title, children }: IPrimaryLayout) {
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log(user);
      const email = user?.email || '';
      const photoURL = user?.photoURL || '';
      const displayName = user?.displayName || '';
      dispatch(setUser({ email, photoURL, displayName }));

      setLoading(false);
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      {!loading && (
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow flex flex-col">{children}</main>
          <div className="m-auto" />
          {/* Footer here */}
        </div>
      )}
    </>
  );
}
