import useAuth from 'hooks/useAuth';
import Head from 'next/head';
import Navbar from './Navbar';
export interface IPrimaryLayout {
  title: string;
  children: React.ReactNode;
}

export default function PrimaryLayout({ title, children }: IPrimaryLayout) {
  const { loading } = useAuth();

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
