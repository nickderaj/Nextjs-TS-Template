import { store } from '@/redux/store';
import { PageWithLayout } from '@/types/page';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import '../styles/globals.css';
interface AppPropsWithLayout extends AppProps {
  Component: PageWithLayout;
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
