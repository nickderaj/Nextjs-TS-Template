import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import { NextPageWithLayout } from './page';

const Home: NextPageWithLayout = () => {
  return <section>Test</section>;
};

export default Home;

Home.getLayout = (page) => {
  return <PrimaryLayout title="Home Page">{page}</PrimaryLayout>;
};
