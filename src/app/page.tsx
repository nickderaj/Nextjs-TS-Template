'use client';

import Button from '@/components/Button';
import { incrementCount } from '@/redux/slices/counterSlice';
import { RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';

export default function Home() {
  const { count } = useSelector((state: RootState) => state.counter);
  const dispatch = useDispatch();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <p className="mb-2"> Clicked {count} times</p>
      <Button onClick={() => dispatch(incrementCount())}>Click me</Button>
    </main>
  );
}
