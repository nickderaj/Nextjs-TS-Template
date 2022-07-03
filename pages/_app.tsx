import type { AppProps } from 'next/app';
import { PageWithLayout } from 'types/page';
import '../styles/globals.css';
interface AppPropsWithLayout extends AppProps {
  Component: PageWithLayout;
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(<Component {...pageProps} />);
}
