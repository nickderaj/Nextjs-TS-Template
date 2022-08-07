import PrimaryLayout from '@/components/layouts/PrimaryLayout';
import { PageWithLayout } from '@/types/page';
import { FaRegSmileBeam } from 'react-icons/fa';

export default function Home(_: PageWithLayout) {
  return (
    <section className="flex justify-center items-center">
      <div className="flex justify-end items-center gap-1 w-full px-20 sm:px-48 text-indigo-500  animate-bounce">
        <FaRegSmileBeam className="text-2xl" />
        <span className="text-4xl">&#8605;</span>
      </div>
    </section>
  );
}

Home.getLayout = (page: React.ReactNode) => {
  return <PrimaryLayout title="Home Page">{page}</PrimaryLayout>;
};
