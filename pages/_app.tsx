import '@/styles/globals.css';
import { PageWithLayout } from '@/types/page';
import type { AppProps } from 'next/app';
interface AppPropsWithLayout extends AppProps {
  Component: PageWithLayout;
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);
  return getLayout(<Component {...pageProps} />);
}
