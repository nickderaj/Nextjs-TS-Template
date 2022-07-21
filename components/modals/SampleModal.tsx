import Modal from 'components/modals/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { setSampleModalOpen } from 'redux/slices/modalSlice';
import { RootState } from 'redux/store';
import Button from '../buttons/SampleButton';

export default function SampleModal() {
  const dispatch = useDispatch();
  const { sampleModalOpen } = useSelector((state: RootState) => state.modal);

  return (
    <>
      {sampleModalOpen && (
        <Modal>
          <div className="bg-neutral-50 z-50 rounded-md p-12 flex flex-col px-16 max-w-[561px]">
            <h4 className="text-lg text-center py-2">Sample</h4>
            <Button onClick={() => dispatch(setSampleModalOpen(false))} title="CLOSE MODAL" />
          </div>
        </Modal>
      )}
    </>
  );
}
