import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import { NextPageWithLayout } from './page';

const About: NextPageWithLayout = () => {
  return <section>TesAboutt</section>;
};

export default About;

About.getLayout = (page) => {
  return <PrimaryLayout title="About Page">{page}</PrimaryLayout>;
};
