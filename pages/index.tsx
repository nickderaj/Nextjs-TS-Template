import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import { NextPageWithLayout } from './page';

export default function Home(_: NextPageWithLayout) {
  return <section>Test</section>;
}

Home.getLayout = (page: React.ReactNode) => {
  return <PrimaryLayout title="Home Page">{page}</PrimaryLayout>;
};
