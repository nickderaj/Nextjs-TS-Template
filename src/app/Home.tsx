'use client';

import SampleModal from '@/components/modals/SampleModal';
import Button from '@/elements/buttons/Button';
import { useState } from 'react';

const Home = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      <main className="mx-auto w-auto px-4 pt-16 pb-8 sm:pt-24 lg:px-8 flex flex-col min-h-screen items-center justify-center bg-zinc-900">
        <h1 className="mx-auto text-center text-6xl font-extrabold tracking-tight text-white sm:text-7xl lg:text-8xl xl:text-8xl">
          Nextjs
          <span className="block bg-gradient-to-r from-primary to-neutral-500 bg-clip-text text-transparent px-2">
            Frontend Example
          </span>
        </h1>
        <div className="mx-auto mt-5 max-w-xl sm:flex sm:justify-center md:mt-8 scale-150">
          <Button onClick={toggleModal}>Click me</Button>
        </div>
      </main>
      <SampleModal isOpen={isOpen} toggleModal={toggleModal} />
    </>
  );
};

export default Home;
