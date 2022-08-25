import SampleModalBody from '@/elements/modals/SampleModalBody';
import { setSampleModalOpen } from '@/redux/slices/modalSlice';
import { RootState } from '@/redux/store';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function SampleModal() {
  const { sampleModalOpen } = useSelector((state: RootState) => state.modal);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setTimeout(() => {
      // dummy timeout to show loading spinner
      dispatch(setSampleModalOpen(false));
      setIsSubmitting(false);
    }, 500);
  };

  return <>{sampleModalOpen && <SampleModalBody handleSubmit={handleSubmit} isSubmitting={isSubmitting} />}</>;
}
