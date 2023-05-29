import { store } from '@/redux/store';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { PageWithLayout } from 'src/types/page';

interface AppPropsWithLayout extends AppProps {
  Component: PageWithLayout;
}

const App: React.FC<AppPropsWithLayout> = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  return <Provider store={store}>{getLayout(<Component {...pageProps} />)}</Provider>;
};

export default App;
