import { store } from '@/redux/store';
import Head from 'next/head';
import { Provider } from 'react-redux';
import Navbar from './Navbar';
export interface IPrimaryLayout {
  title: string;
  children: React.ReactNode;
}

export default function PrimaryLayout({ title, children }: IPrimaryLayout) {
  return (
    <Provider store={store}>
      <Head>
        <title>{title}</title>
      </Head>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex flex-col">{children}</main>
        <div className="m-auto" />
        {/* Footer here */}
      </div>
    </Provider>
  );
}
