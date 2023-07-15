import Spinner from '@/elements/loaders/Spinner';

const loading = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-zinc-900">
      <Spinner />
    </div>
  );
};

export default loading;
