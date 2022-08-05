import { store } from '@/redux/store';
import Head from 'next/head';
import { Provider } from 'react-redux';
import Navbar from './Navbar';
export interface IPrimaryLayout {
  title: string;
  children: React.ReactNode;
}

// This uses Next.js' getLayout method so it won't re-render every time you visit another page
// Doesn't make a difference in this case however, as it's a simple one page app
export default function PrimaryLayout({ title, children }: IPrimaryLayout) {
  return (
    <Provider store={store}>
      <Head>
        <title>{title}</title>
      </Head>

      <Navbar />
      <main>{children}</main>
      <div className="m-auto" />
      {/* Footer here */}
    </Provider>
  );
}
