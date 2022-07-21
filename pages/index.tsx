import BaseTemplate from '@/components/templates/base/BaseTemplate';
import { PageWithLayout } from '@/types/page';
import PrimaryLayout from '@/components/layouts/primary/PrimaryLayout';

export default function Home(_: PageWithLayout) {
  return (
    <section>
      <BaseTemplate sampleTextProp="hello" />
    </section>
  );
}

Home.getLayout = (page: React.ReactNode) => {
  return <PrimaryLayout title="Home Page">{page}</PrimaryLayout>;
};
